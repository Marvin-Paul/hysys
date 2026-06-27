-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 014: Fix RLS for proper per-user data isolation
-- 
-- Goals:
--   1. Remove "OR owner_id IS NULL" loopholes so users only see their own data
--   2. Add admin-bypass helper function so admins can see all data
--   3. Re-create clean policies on contacts, deals, activities, leads,
--      companies, support_tickets, reports
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Helper: check if current user is admin ──
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- CONTACTS
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_contacts"   ON contacts;
DROP POLICY IF EXISTS "users_insert_contacts"     ON contacts;
DROP POLICY IF EXISTS "users_update_own_contacts" ON contacts;
DROP POLICY IF EXISTS "users_delete_own_contacts" ON contacts;

-- Users see only their own; admins see all
CREATE POLICY "contacts_select" ON contacts FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- Users insert only with their own id; admins can insert freely
CREATE POLICY "contacts_insert" ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "contacts_update" ON contacts FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "contacts_delete" ON contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- COMPANIES
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_companies"   ON companies;
DROP POLICY IF EXISTS "users_insert_companies"     ON companies;
DROP POLICY IF EXISTS "users_update_own_companies" ON companies;
DROP POLICY IF EXISTS "users_delete_own_companies" ON companies;

CREATE POLICY "companies_select" ON companies FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "companies_insert" ON companies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "companies_update" ON companies FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "companies_delete" ON companies FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- DEALS
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_deals"   ON deals;
DROP POLICY IF EXISTS "users_insert_deals"     ON deals;
DROP POLICY IF EXISTS "users_update_own_deals" ON deals;
DROP POLICY IF EXISTS "users_delete_own_deals" ON deals;

CREATE POLICY "deals_select" ON deals FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "deals_insert" ON deals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "deals_update" ON deals FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "deals_delete" ON deals FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- ACTIVITIES
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_activities"   ON activities;
DROP POLICY IF EXISTS "users_insert_activities"     ON activities;
DROP POLICY IF EXISTS "users_update_own_activities" ON activities;
DROP POLICY IF EXISTS "users_delete_own_activities" ON activities;

CREATE POLICY "activities_select" ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "activities_insert" ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "activities_update" ON activities FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "activities_delete" ON activities FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- LEADS
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public_read_leads"   ON leads;
DROP POLICY IF EXISTS "users_insert_leads"  ON leads;
DROP POLICY IF EXISTS "users_update_leads"  ON leads;
DROP POLICY IF EXISTS "users_delete_leads"  ON leads;

CREATE POLICY "leads_select" ON leads FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "leads_insert" ON leads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "leads_update" ON leads FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "leads_delete" ON leads FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- SUPPORT TICKETS
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_tickets"   ON support_tickets;
DROP POLICY IF EXISTS "users_insert_tickets"     ON support_tickets;
DROP POLICY IF EXISTS "users_update_own_tickets" ON support_tickets;

CREATE POLICY "tickets_select" ON support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin());

CREATE POLICY "tickets_insert" ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "tickets_update" ON support_tickets FOR UPDATE
  TO authenticated
  USING  (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin());

CREATE POLICY "tickets_delete" ON support_tickets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- REPORTS
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_reports"   ON reports;
DROP POLICY IF EXISTS "users_insert_reports"     ON reports;
DROP POLICY IF EXISTS "users_update_own_reports" ON reports;
DROP POLICY IF EXISTS "users_delete_own_reports" ON reports;

CREATE POLICY "reports_select" ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "reports_insert" ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "reports_update" ON reports FOR UPDATE
  TO authenticated
  USING  (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());

CREATE POLICY "reports_delete" ON reports FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────────
-- PROFILES — admins can read all profiles
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;

CREATE POLICY "profiles_select" ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());
