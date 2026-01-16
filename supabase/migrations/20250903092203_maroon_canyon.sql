/*
  # Add sample data for testing

  1. Sample Data
    - Sample communities with builder information
    - Sample floorplans for different house types
    - Sample materials inventory
    - Sample jobs with different statuses
    - Sample crew assignments

  2. Demo Users
    - Manager demo account
    - Crew member demo account

  This migration provides realistic test data to demonstrate platform functionality.
*/

-- Insert sample communities
INSERT INTO communities (name, address, city, state, zip_code, builder_name) VALUES
  ('Sunset Hills', '1000 Community Drive', 'Austin', 'TX', '78701', 'DR Horton'),
  ('Oak Grove Estates', '2500 Oak Grove Blvd', 'Plano', 'TX', '75024', 'Lennar Homes'),
  ('Meadowbrook Village', '500 Meadow Lane', 'Frisco', 'TX', '75035', 'KB Home'),
  ('Riverside Commons', '1200 River Road', 'McKinney', 'TX', '75070', 'Pulte Homes')
ON CONFLICT DO NOTHING;

-- Insert sample floorplans
INSERT INTO floorplans (name, community_id, sqft, bedrooms, bathrooms, image_url) VALUES
  ('The Madison', (SELECT id FROM communities WHERE name = 'Sunset Hills'), 2450, 3, 2, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'),
  ('The Charleston', (SELECT id FROM communities WHERE name = 'Sunset Hills'), 3200, 4, 3, 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'),
  ('The Oakwood', (SELECT id FROM communities WHERE name = 'Oak Grove Estates'), 2800, 3, 2, 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'),
  ('The Riverside', (SELECT id FROM communities WHERE name = 'Riverside Commons'), 3500, 4, 3, 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg')
ON CONFLICT DO NOTHING;

-- Insert sample materials
INSERT INTO materials (name, category, unit, cost_per_unit, current_stock, minimum_stock, supplier) VALUES
  ('26 Gauge Metal Roofing Panel', 'Roofing', 'sq ft', 4.25, 2500, 500, 'ABC Metal Supply'),
  ('Ridge Cap Flashing', 'Flashing', 'linear ft', 8.50, 800, 200, 'ABC Metal Supply'),
  ('Self-Drilling Screws #12', 'Fasteners', 'box', 45.00, 120, 20, 'Fastener Plus'),
  ('Ice & Water Shield', 'Building Paper', 'roll', 85.00, 45, 10, 'Building Materials Inc'),
  ('Synthetic Underlayment', 'Building Paper', 'roll', 65.00, 60, 15, 'Building Materials Inc'),
  ('OSB Roof Decking 7/16"', 'Decking', 'sheet', 32.50, 200, 50, 'Lumber Yard Pro'),
  ('Vinyl Window - Double Hung', 'Windows', 'each', 285.00, 25, 5, 'Window World'),
  ('Aluminum U-Channel', 'Flashing', 'linear ft', 3.75, 1200, 300, 'ABC Metal Supply')
ON CONFLICT DO NOTHING;

-- Insert sample jobs (only if communities exist)
DO $$
DECLARE
    sunset_hills_id UUID;
    oak_grove_id UUID;
    madison_id UUID;
    oakwood_id UUID;
BEGIN
    -- Get community IDs
    SELECT id INTO sunset_hills_id FROM communities WHERE name = 'Sunset Hills';
    SELECT id INTO oak_grove_id FROM communities WHERE name = 'Oak Grove Estates';
    
    -- Get floorplan IDs
    SELECT id INTO madison_id FROM floorplans WHERE name = 'The Madison';
    SELECT id INTO oakwood_id FROM floorplans WHERE name = 'The Oakwood';
    
    -- Insert sample jobs only if we have communities
    IF sunset_hills_id IS NOT NULL THEN
        INSERT INTO jobs (job_number, community_id, floorplan_id, lot_address, work_order_type, status, priority, estimated_start_date, estimated_end_date, estimated_cost) VALUES
          ('JOB-2025-001', sunset_hills_id, madison_id, '123 Maple Street', 'Metal Roof - Accent', 'in_progress', 'high', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', 8500.00),
          ('JOB-2025-002', sunset_hills_id, madison_id, '125 Maple Street', 'Roof Final-must take pictures', 'completed', 'medium', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '5 days', 12750.00),
          ('JOB-2025-003', oak_grove_id, oakwood_id, '456 Oak Avenue', 'U Channel/Z Flashing', 'scheduled', 'medium', CURRENT_DATE + INTERVAL '3 days', CURRENT_DATE + INTERVAL '7 days', 3200.00),
          ('JOB-2025-004', sunset_hills_id, madison_id, '789 Pine Road', 'Counter Flashing', 'scheduled', 'low', CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '10 days', 2800.00),
          ('JOB-2025-005', oak_grove_id, oakwood_id, '321 Elm Street', 'Shingles', 'on_hold', 'urgent', CURRENT_DATE + INTERVAL '1 day', CURRENT_DATE + INTERVAL '4 days', 15500.00)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;