-- Fix: authenticated users need EXECUTE on is_admin() for RLS policies that call it.
-- Migration 20260710000008 revoked this grant, causing "permission denied for function is_admin".

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Ensure contact_submissions admin policies use is_admin() consistently
DROP POLICY IF EXISTS "Admins can view submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update submissions" ON public.contact_submissions;
CREATE POLICY "Admins can update submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete submissions" ON public.contact_submissions;
CREATE POLICY "Admins can delete submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Re-assert admin role for known admin accounts
INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email IN ('marmidon@gmail.com', 'marvinpaulmuwereza@gmail.com')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
