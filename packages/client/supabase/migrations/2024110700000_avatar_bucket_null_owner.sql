begin;  -- Start transaction

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to insert their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to update their own avatar" ON storage.objects;

-- Create updated policies that allow actions when owner is null
CREATE POLICY "Allow users to delete their own avatar or null owner"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (owner IS NULL OR auth.uid() = owner)
);

CREATE POLICY "Allow users to insert their own avatar or null owner"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (owner IS NULL OR owner = auth.uid())
);

CREATE POLICY "Allow users to update their own avatar or null owner"
ON storage.objects
FOR UPDATE
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (owner IS NULL OR owner = auth.uid())
);

commit;  -- End transaction 