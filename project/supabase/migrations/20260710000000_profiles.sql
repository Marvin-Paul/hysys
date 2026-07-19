-- Profiles table for admin role checks (used by RLS on CMS tables)

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Grant admin by email (safe to re-run)
INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'marmidon@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
