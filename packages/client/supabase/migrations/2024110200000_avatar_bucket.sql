-- Create the Avatars Bucket
-- Create a new bucket named 'avatars' with public access set to true
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']);

-- Enable Row Level Security (RLS) on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow all users (including unauthenticated) to view any avatar
CREATE POLICY "Allow public users to view avatars"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'avatars'
);

-- Policy to allow users to delete their own avatar
CREATE POLICY "Allow users to delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid() = owner
);

-- Policy to allow users to insert their own avatar
CREATE POLICY "Allow users to insert their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);

-- Policy to allow users to update their own avatar
CREATE POLICY "Allow users to update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  owner = auth.uid()
);