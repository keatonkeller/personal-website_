/*
  # Update contact submission policy to public

  1. Policy Changes
    - Drop the existing anonymous-only policy
    - Add new policy allowing public (anyone) to insert contact submissions
    - Keep existing policies for authenticated users to read submissions
    - Maintain service role permissions

  This allows both authenticated and anonymous users to submit contact forms.
*/

-- Drop the existing anonymous-only policy
DROP POLICY IF EXISTS "Allow anonymous users to submit contact forms" ON contact_submissions;

-- Allow public (anyone) to insert contact submissions
CREATE POLICY "Allow public to submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);