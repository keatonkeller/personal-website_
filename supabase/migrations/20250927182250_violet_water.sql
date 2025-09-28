/*
  # Fix RLS policy for contact form submissions

  1. Security Updates
    - Add policy for anonymous users to insert contact submissions
    - Keep existing policies for authenticated users to read submissions
    - Maintain service role insert permissions

  This allows the public contact form to work while maintaining security.
*/

-- Allow anonymous users to insert contact submissions (for public contact form)
CREATE POLICY "Allow anonymous users to submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);