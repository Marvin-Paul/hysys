-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 015: Assign admin role to the owner account
-- Replace the email below with your actual admin email address
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users
  WHERE email = 'info@hysysglobal.com'
  LIMIT 1
);
