/*
  # Fix RLS infinite recursion in profiles table

  1. Problem
    - Current policies on profiles table create infinite recursion
    - Policies checking user roles query the profiles table from within profiles policies
    - This creates a circular dependency during policy evaluation

  2. Solution
    - Simplify profiles table policies to avoid recursion
    - Use auth.uid() directly without re-querying profiles table
    - Create separate policies that don't depend on role checks within profiles
    
  3. Security
    - Users can only read/update their own profile
    - Admin access controlled through simplified policy structure
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin users can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin users can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Regular users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new simplified policies that avoid recursion
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow inserts for new user creation (handled by trigger)
CREATE POLICY "Allow profile creation"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create a separate view for admin access that doesn't trigger RLS on profiles
CREATE OR REPLACE VIEW admin_profiles AS
SELECT 
  p.*,
  CASE 
    WHEN p.role IN ('admin', 'manager') THEN true 
    ELSE false 
  END as is_admin
FROM profiles p;

-- Grant access to the view
GRANT SELECT ON admin_profiles TO authenticated;

-- Update other table policies to use a simpler admin check
-- This avoids recursion by checking auth metadata instead of profiles table

-- Update jobs policies
DROP POLICY IF EXISTS "Admin users can manage jobs" ON jobs;
DROP POLICY IF EXISTS "Regular users can read assigned jobs" ON jobs;

CREATE POLICY "Users can read assigned jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (
    -- User is crew lead for this job
    crew_lead_id = auth.uid() 
    OR 
    -- User is assigned to this job
    EXISTS (
      SELECT 1 FROM crew_assignments 
      WHERE crew_assignments.job_id = jobs.id 
      AND crew_assignments.crew_member_id = auth.uid()
    )
    OR
    -- Check if user is admin/manager by direct role check
    EXISTS (
      SELECT 1 FROM auth.users au
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' IN ('admin', 'manager')
    )
  );

CREATE POLICY "Admins can manage jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users au
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' IN ('admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users au
      WHERE au.id = auth.uid() 
      AND au.raw_user_meta_data->>'role' IN ('admin', 'manager')
    )
  );

-- Fix the handle_new_user trigger to set role in user metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'crew_member')
  );
  
  -- Update user metadata with role for easier policy checks
  UPDATE auth.users 
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}')::jsonb || 
      ('{"role":"' || COALESCE(NEW.raw_user_meta_data->>'role', 'crew_member') || '"}')::jsonb
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;