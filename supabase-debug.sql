-- Run this in your Supabase SQL Editor to check and fix permissions

-- First, let's check if the table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables
   WHERE table_name = 'temperature_readings'
);

-- Check current policies
SELECT * FROM pg_policies WHERE tablename = 'temperature_readings';

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Allow all operations" ON temperature_readings;

-- Create a new policy that allows all operations
CREATE POLICY "Enable all access for all users"
ON temperature_readings
FOR ALL
USING (true)
WITH CHECK (true);

-- Test insert manually
INSERT INTO temperature_readings (user_name, temperature_celsius)
VALUES ('Test User', 22.5);

-- Check if it worked
SELECT * FROM temperature_readings ORDER BY created_at DESC LIMIT 5;
