/*
  # Authentication Triggers and Enhanced Security

  1. New Functions
    - `handle_new_user()` - Automatically creates profile when user signs up
    - `update_updated_at()` - Updates timestamp on record changes

  2. Security Enhancements
    - Auto-profile creation trigger on auth.users
    - Enhanced RLS policies for admin/regular user distinction
    - Updated policies to support the two-tier access model

  3. Default Role Assignment
    - New users automatically assigned 'crew_member' role
    - Admin users can promote others to higher roles
*/

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    'crew_member'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_floorplans_updated_at
  BEFORE UPDATE ON floorplans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_estimates_updated_at
  BEFORE UPDATE ON estimates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_crew_assignments_updated_at
  BEFORE UPDATE ON crew_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enhanced RLS Policies for Two-Tier Access Model

-- Drop existing policies to recreate with clearer admin/regular user distinction
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Profiles: Admin vs Regular User Access
CREATE POLICY "Regular users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin users can manage all profiles"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Enhanced policies for other tables following admin/regular pattern
DROP POLICY IF EXISTS "Authenticated users can read communities" ON communities;
DROP POLICY IF EXISTS "Managers can manage communities" ON communities;

CREATE POLICY "Regular users can read communities"
  ON communities
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can manage communities"
  ON communities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

-- Enhanced job access policies
DROP POLICY IF EXISTS "Users can read assigned jobs" ON jobs;
DROP POLICY IF EXISTS "Managers can manage jobs" ON jobs;

CREATE POLICY "Regular users can read assigned jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (
    -- Admin/Manager can see all
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
    OR
    -- Crew lead can see their assigned jobs
    crew_lead_id = auth.uid()
    OR
    -- Crew member can see jobs they're assigned to
    EXISTS (
      SELECT 1 FROM crew_assignments
      WHERE job_id = jobs.id 
      AND crew_member_id = auth.uid()
    )
  );

CREATE POLICY "Admin users can manage jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role IN ('admin', 'manager')
    )
  );

-- Function to check if user is admin (helper for policies)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id 
    AND role IN ('admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can access job (helper for policies)
CREATE OR REPLACE FUNCTION public.can_access_job(job_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    -- Admin/Manager access
    public.is_admin(user_id)
    OR
    -- Crew lead access
    EXISTS (
      SELECT 1 FROM jobs
      WHERE id = job_id AND crew_lead_id = user_id
    )
    OR
    -- Crew member access
    EXISTS (
      SELECT 1 FROM crew_assignments
      WHERE job_id = job_id AND crew_member_id = user_id
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;