/*
  # Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `ip_address` (text, optional)
      - `user_agent` (text, optional)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public to insert new submissions
    - Add policy for authenticated users to read submissions

  3. Performance
    - Index on created_at for sorting
    - Index on email for lookups
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public (anyone) to insert contact submissions
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read submissions
CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_email_idx 
  ON contact_submissions(email);