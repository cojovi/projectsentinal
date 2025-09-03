/*
  # BoltTech Construction Management Schema

  1. New Tables
    - `profiles` - User profiles with roles (admin, manager, crew_lead, crew_member)
    - `communities` - Construction neighborhoods/developments
    - `floorplans` - House plans associated with communities
    - `jobs` - Work orders and projects
    - `estimates` - Job estimates with line items
    - `crew_assignments` - Crew member assignments to jobs
    - `materials` - Material inventory management
    - `job_photos` - Photos taken during job execution

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Users can only see data relevant to their role and assignments

  3. Features
    - Comprehensive job management workflow
    - Material tracking and inventory
    - Estimate generation with profit margins
    - Photo documentation system
    - Community and floorplan organization
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'crew_member' CHECK (role IN ('admin', 'manager', 'crew_lead', 'crew_member')),
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  builder_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create floorplans table
CREATE TABLE IF NOT EXISTS floorplans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  sqft integer NOT NULL DEFAULT 0,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_number text UNIQUE NOT NULL,
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE,
  floorplan_id uuid REFERENCES floorplans(id) ON DELETE SET NULL,
  lot_address text NOT NULL,
  work_order_type text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_start_date date NOT NULL,
  estimated_end_date date NOT NULL,
  actual_start_date date,
  actual_end_date date,
  crew_lead_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  estimated_cost numeric(10,2) NOT NULL DEFAULT 0,
  actual_cost numeric(10,2) DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create estimates table
CREATE TABLE IF NOT EXISTS estimates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  estimate_number text UNIQUE NOT NULL,
  line_items jsonb NOT NULL DEFAULT '[]',
  total_labor_cost numeric(10,2) NOT NULL DEFAULT 0,
  total_material_cost numeric(10,2) NOT NULL DEFAULT 0,
  profit_margin numeric(5,2) NOT NULL DEFAULT 15.00,
  final_price numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
  created_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create crew_assignments table
CREATE TABLE IF NOT EXISTS crew_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  crew_member_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_date date NOT NULL,
  role text NOT NULL DEFAULT 'laborer',
  hours_worked numeric(4,2) DEFAULT 0,
  hourly_rate numeric(8,2) NOT NULL DEFAULT 25.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  unit text NOT NULL,
  cost_per_unit numeric(10,2) NOT NULL DEFAULT 0,
  current_stock integer DEFAULT 0,
  minimum_stock integer DEFAULT 0,
  supplier text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_photos table
CREATE TABLE IF NOT EXISTS job_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  caption text,
  taken_by uuid REFERENCES profiles(id) ON DELETE CASCADE,
  taken_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE floorplans ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crew_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for communities
CREATE POLICY "Authenticated users can read communities"
  ON communities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage communities"
  ON communities FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for floorplans
CREATE POLICY "Authenticated users can read floorplans"
  ON floorplans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage floorplans"
  ON floorplans FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for jobs
CREATE POLICY "Users can read assigned jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() 
      AND (profiles.role IN ('admin', 'manager') OR jobs.crew_lead_id = auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM crew_assignments
      WHERE crew_assignments.job_id = jobs.id AND crew_assignments.crew_member_id = auth.uid()
    )
  );

CREATE POLICY "Managers can manage jobs"
  ON jobs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for estimates
CREATE POLICY "Users can read job estimates"
  ON estimates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      JOIN profiles ON profiles.id = auth.uid()
      WHERE jobs.id = estimates.job_id
      AND (profiles.role IN ('admin', 'manager') OR jobs.crew_lead_id = auth.uid())
    )
  );

CREATE POLICY "Managers can manage estimates"
  ON estimates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for crew_assignments
CREATE POLICY "Users can read own assignments"
  ON crew_assignments FOR SELECT
  TO authenticated
  USING (
    crew_member_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Managers can manage assignments"
  ON crew_assignments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for materials
CREATE POLICY "Authenticated users can read materials"
  ON materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage materials"
  ON materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'manager')
    )
  );

-- RLS Policies for job_photos
CREATE POLICY "Users can read job photos"
  ON job_photos FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      JOIN profiles ON profiles.id = auth.uid()
      WHERE jobs.id = job_photos.job_id
      AND (profiles.role IN ('admin', 'manager') OR jobs.crew_lead_id = auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM crew_assignments
      WHERE crew_assignments.job_id = job_photos.job_id AND crew_assignments.crew_member_id = auth.uid()
    )
  );

CREATE POLICY "Crew can add job photos"
  ON job_photos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM jobs
      JOIN profiles ON profiles.id = auth.uid()
      WHERE jobs.id = job_photos.job_id
      AND (profiles.role IN ('admin', 'manager') OR jobs.crew_lead_id = auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM crew_assignments
      WHERE crew_assignments.job_id = job_photos.job_id AND crew_assignments.crew_member_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_crew_lead ON jobs(crew_lead_id);
CREATE INDEX IF NOT EXISTS idx_jobs_community ON jobs(community_id);
CREATE INDEX IF NOT EXISTS idx_crew_assignments_job ON crew_assignments(job_id);
CREATE INDEX IF NOT EXISTS idx_crew_assignments_member ON crew_assignments(crew_member_id);
CREATE INDEX IF NOT EXISTS idx_job_photos_job ON job_photos(job_id);
CREATE INDEX IF NOT EXISTS idx_estimates_job ON estimates(job_id);

-- Insert sample work order types
INSERT INTO materials (name, category, unit, cost_per_unit, current_stock, minimum_stock, supplier)
VALUES 
  ('Metal Roofing Panel - 26 gauge', 'Roofing', 'sq ft', 4.25, 500, 100, 'ABC Metal Supply'),
  ('Roofing Nails - 1.5"', 'Fasteners', 'lb', 2.50, 200, 50, 'Fastener Pro'),
  ('U-Channel Flashing', 'Flashing', 'linear ft', 3.75, 150, 30, 'ABC Metal Supply'),
  ('Z-Bar Flashing', 'Flashing', 'linear ft', 4.00, 100, 25, 'ABC Metal Supply'),
  ('Roof Deck Sheathing 7/16"', 'Decking', 'sheet', 28.50, 75, 20, 'Lumber World'),
  ('Window Flashing Tape', 'Flashing', 'roll', 45.00, 25, 10, 'Window Pro Supply'),
  ('Framing Lumber 2x4x8', 'Lumber', 'each', 6.75, 300, 100, 'Lumber World'),
  ('Framing Lumber 2x6x10', 'Lumber', 'each', 12.25, 200, 75, 'Lumber World'),
  ('House Wrap', 'Building Paper', 'roll', 65.00, 40, 15, 'Building Supply Co'),
  ('Shingle Starter Strip', 'Roofing', 'linear ft', 1.85, 250, 50, 'Roofing Supply Inc')
ON CONFLICT DO NOTHING;