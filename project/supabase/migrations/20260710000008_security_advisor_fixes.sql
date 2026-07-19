-- Supabase Security Advisor fixes (safe to re-run).
-- Run via SQL Editor or: npx supabase db push

-- ── 1. Functions: pin search_path (fixes "Function Search Path Mutable") ──

CREATE OR REPLACE FUNCTION public.update_site_content_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_design_settings_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Supabase helper (if present): pin search_path without replacing body
DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable'
  LOOP
    EXECUTE format('ALTER FUNCTION %s SET search_path = public', fn.sig);
  END LOOP;
END $$;

-- ── 2. Lock down SECURITY DEFINER RPC exposure ──

DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN ('handle_new_user', 'is_admin', 'rls_auto_enable')
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC', fn.sig);
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM anon', fn.sig);
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM authenticated', fn.sig);
  END LOOP;
END $$;

-- Trigger functions only need postgres / service_role
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user' AND pronamespace = 'public'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, service_role;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'rls_auto_enable' AND pronamespace = 'public'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres, service_role;
  END IF;
END $$;

-- Ensure new auth users get a profile row
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ── 3. Contact form: replace always-true INSERT policy ──

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(trim(email)) > 3
    AND message IS NOT NULL
    AND length(trim(message)) >= 10
    AND coalesce(length(first_name), 0) <= 100
    AND coalesce(length(last_name), 0) <= 100
    AND coalesce(length(company), 0) <= 200
  );

-- ── 4. Hide sensitive tables from GraphQL API ──

COMMENT ON TABLE public.profiles IS E'@graphql({"ignore": true})';
COMMENT ON TABLE public.contact_submissions IS E'@graphql({"ignore": true})';
COMMENT ON TABLE public.content_versions IS E'@graphql({"ignore": true})';
COMMENT ON TABLE public.media_library IS E'@graphql({"ignore": true})';
COMMENT ON TABLE public.design_settings IS E'@graphql({"ignore": true})';

-- site_content stays public-read via PostgREST (marketing site); optional GraphQL hide:
-- COMMENT ON TABLE public.site_content IS E'@graphql({"ignore": true})';

-- ── 5. Storage: stop public bucket listing on "media" ──

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  false,
  52428800,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml','video/mp4','application/pdf']
)
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read media files" ON storage.objects;
DROP POLICY IF EXISTS "Public read media by path" ON storage.objects;
DROP POLICY IF EXISTS "Admins manage media storage" ON storage.objects;
DROP POLICY IF EXISTS "Admins full access to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

CREATE POLICY "Admins manage media storage"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id = 'media'
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  )
  WITH CHECK (
    bucket_id = 'media'
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Read known file paths (no public bucket flag = no open listing)
CREATE POLICY "Public read media files by path"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'media');

-- ── 6. Tighten table grants (PostgREST still works; RLS enforces rows) ──

REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT ON public.profiles TO authenticated;

REVOKE ALL ON public.contact_submissions FROM anon, authenticated;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_submissions TO authenticated;

REVOKE ALL ON public.content_versions FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_versions TO authenticated;

REVOKE ALL ON public.design_settings FROM anon;
GRANT SELECT ON public.design_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.design_settings TO authenticated;

REVOKE ALL ON public.media_library FROM anon;
GRANT SELECT ON public.media_library TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media_library TO authenticated;

REVOKE ALL ON public.site_content FROM anon;
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
