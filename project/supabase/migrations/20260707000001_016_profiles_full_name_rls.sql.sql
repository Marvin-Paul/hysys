-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 016: Add full_name & email to profiles, fix trigger, tighten RLS
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add new columns (keeping old ones for backward compat)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Backfill full_name from first_name + last_name
UPDATE public.profiles
SET full_name = TRIM(
    COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')
  ),
  email = (SELECT email FROM auth.users WHERE auth.users.id = profiles.id)
WHERE full_name IS NULL OR full_name = '';

-- 3. Recreate the trigger function to use full_name and email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    TRIM(
      COALESCE(NEW.raw_user_meta_data->>'first_name', '') || ' ' ||
      COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    ),
    NEW.email,
    'user'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Tighten RLS: drop overly permissive policies
DROP POLICY IF EXISTS "users_insert_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_delete_own_profile" ON profiles;

-- Profiles select: users see own, admins see all (already exists, keep it)
-- Already exists: profiles_select

-- Profiles insert: only via trigger (auth users should not insert directly)
-- We allow the authenticated user to insert their own row as a fallback
-- but they can NEVER set role to anything other than 'user'
CREATE POLICY "profiles_insert_self" ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND COALESCE(role, 'user') = 'user'
  );

-- Profiles update: users can update their own non-role fields; admins can update anything
CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (
    -- Non-admins cannot change their role
    (public.is_admin() OR COALESCE(role, 'user') = (SELECT COALESCE(role, 'user') FROM public.profiles WHERE id = auth.uid()))
  );

-- Profiles delete: only admins can delete profiles
CREATE POLICY "profiles_delete_admin" ON profiles FOR DELETE
  TO authenticated
  USING (public.is_admin());
