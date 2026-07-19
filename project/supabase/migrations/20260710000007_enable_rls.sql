-- Fix Supabase linter warnings: policies exist but RLS was not enabled.
-- Safe to re-run (idempotent).

-- Admin role table (required by all admin policies)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'marvinpaulmuwereza@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ── site_content ──
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;
CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert site content" ON public.site_content;
CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update site content" ON public.site_content;
CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete site content" ON public.site_content;
CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ── contact_submissions ──
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update submissions" ON public.contact_submissions;
CREATE POLICY "Admins can update submissions"
  ON public.contact_submissions FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete submissions" ON public.contact_submissions;
CREATE POLICY "Admins can delete submissions"
  ON public.contact_submissions FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ── content_versions ──
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read versions" ON public.content_versions;
CREATE POLICY "Admins can read versions"
  ON public.content_versions FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can insert versions" ON public.content_versions;
CREATE POLICY "Admins can insert versions"
  ON public.content_versions FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update versions" ON public.content_versions;
CREATE POLICY "Admins can update versions"
  ON public.content_versions FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete versions" ON public.content_versions;
CREATE POLICY "Admins can delete versions"
  ON public.content_versions FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ── design_settings ──
ALTER TABLE public.design_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read design settings" ON public.design_settings;
CREATE POLICY "Anyone can read design settings"
  ON public.design_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert design settings" ON public.design_settings;
CREATE POLICY "Admins can insert design settings"
  ON public.design_settings FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update design settings" ON public.design_settings;
CREATE POLICY "Admins can update design settings"
  ON public.design_settings FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete design settings" ON public.design_settings;
CREATE POLICY "Admins can delete design settings"
  ON public.design_settings FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ── media_library ──
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read media" ON public.media_library;
CREATE POLICY "Anyone can read media"
  ON public.media_library FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert media" ON public.media_library;
CREATE POLICY "Admins can insert media"
  ON public.media_library FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update media" ON public.media_library;
CREATE POLICY "Admins can update media"
  ON public.media_library FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete media" ON public.media_library;
CREATE POLICY "Admins can delete media"
  ON public.media_library FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
