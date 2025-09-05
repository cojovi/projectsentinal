/*
  # Ensure codyv@cmacroofing.com has admin privileges

  1. Updates
    - Set codyv@cmacroofing.com to admin role
    - Create profile if it doesn't exist
    - Ensure admin access
*/

-- First, ensure the profile exists and update role to admin
INSERT INTO profiles (
  id, 
  email, 
  full_name, 
  role, 
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'codyv@cmacroofing.com',
  'Cody Viveiros',
  'admin',
  '8177512041',
  now(),
  now()
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  updated_at = now();

-- Also ensure this user appears in admin_profiles view by updating any existing record
UPDATE profiles 
SET role = 'admin', updated_at = now()
WHERE email = 'codyv@cmacroofing.com';