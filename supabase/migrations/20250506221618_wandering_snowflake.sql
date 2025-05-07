/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `created_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `subscribers` table
    - Add policies for authenticated users to read and insert data
*/

-- Create the subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert subscribers"
  ON subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anon users to insert subscribers"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);