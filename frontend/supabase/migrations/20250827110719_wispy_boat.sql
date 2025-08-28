/*
  # Co-Ride Database Schema

  1. New Tables
    - `rides`
      - `id` (uuid, primary key)
      - `direction` (text) - "62_to_128" or "128_to_62"
      - `time_slot` (text) - time in HH:MM format
      - `vehicle_type` (text) - "cab" or "auto"
      - `action_type` (text) - "offer" or "request"
      - `name` (text)
      - `contact` (text)
      - `status` (text) - "pending", "matched", "grouped"
      - `group_id` (uuid, nullable) - for grouping matched users
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `groups`
      - `id` (uuid, primary key)
      - `direction` (text)
      - `time_slot` (text)
      - `vehicle_type` (text)
      - `status` (text) - "forming", "complete"
      - `member_count` (integer)
      - `max_members` (integer) - 4 for cab, 3 for auto
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (since this is a public ride-sharing platform)

  3. Indexes
    - Add indexes for efficient querying by direction, time_slot, and vehicle_type
*/

-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  direction text NOT NULL CHECK (direction IN ('62_to_128', '128_to_62')),
  time_slot text NOT NULL,
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('cab', 'auto')),
  action_type text NOT NULL CHECK (action_type IN ('offer', 'request')),
  name text NOT NULL,
  contact text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'grouped')),
  group_id uuid REFERENCES groups(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  direction text NOT NULL CHECK (direction IN ('62_to_128', '128_to_62')),
  time_slot text NOT NULL,
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('cab', 'auto')),
  status text NOT NULL DEFAULT 'forming' CHECK (status IN ('forming', 'complete')),
  member_count integer NOT NULL DEFAULT 0,
  max_members integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_rides_matching ON rides(direction, time_slot, vehicle_type, action_type, status);
CREATE INDEX IF NOT EXISTS idx_rides_group ON rides(group_id);
CREATE INDEX IF NOT EXISTS idx_groups_lookup ON groups(direction, time_slot, vehicle_type, status);

-- Enable Row Level Security
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (ride-sharing is public)
CREATE POLICY "Anyone can read rides"
  ON rides
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert rides"
  ON rides
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update rides"
  ON rides
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read groups"
  ON groups
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert groups"
  ON groups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update groups"
  ON groups
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON rides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();