-- Create the 'media' storage bucket (idempotent)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
SELECT 'media', 'media', true, false, 52428800, NULL
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'media');

-- Allow public access to objects in the 'media' bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');

-- Disable RLS on remaining tables (needed because auth was removed)
ALTER TABLE site_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE design_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE media_library DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions DISABLE ROW LEVEL SECURITY;
