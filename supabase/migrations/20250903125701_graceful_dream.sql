/*
  # Add App Metadata Admin Function

  1. New Functions
    - `is_admin()` - Checks if current user has admin role in JWT app_metadata
    
  2. Purpose
    - Allows admin role assignment via Supabase Dashboard app_metadata
    - Provides fallback when profiles table isn't properly synced
    - Enables manual admin promotion through Supabase UI
*/

-- Create function to check admin status from JWT app metadata
create or replace function public.is_admin() 
returns boolean
language sql stable as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Grant execute permission to authenticated users
grant execute on function public.is_admin() to authenticated;