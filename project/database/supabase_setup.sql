-- ═══════════════════════════════════════════════════════════════════════════
-- HYSYS CRM — Complete Supabase Setup
-- Run this once in: https://supabase.com/dashboard/project/xamswlfdezppetmxpgnd/sql/new
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Extensions ──
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Ticket sequence ──
CREATE SEQUENCE IF NOT EXISTS ticket_seq START 1;

-- ── PROFILES (extends auth.users) ──
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name  TEXT,
  last_name   TEXT,
  company     TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  role        TEXT DEFAULT 'user',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── COMPANIES ──
CREATE TABLE IF NOT EXISTS companies (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  industry        TEXT,
  website         TEXT,
  phone           TEXT,
  address         TEXT,
  city            TEXT,
  state           TEXT,
  country         TEXT,
  postal_code     TEXT,
  employees_count INTEGER,
  annual_revenue  DECIMAL(15,2),
  description     TEXT,
  owner_id        UUID REFERENCES auth.users(id),
  type            TEXT,
  rating          TEXT,
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── CONTACTS ──
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT,
  phone        TEXT,
  mobile       TEXT,
  title        TEXT,
  company_id   UUID REFERENCES companies(id) ON DELETE SET NULL,
  owner_id     UUID REFERENCES auth.users(id),
  status       TEXT DEFAULT 'lead',
  lead_source  TEXT,
  lead_score   INTEGER DEFAULT 0,
  value        DECIMAL(15,2) DEFAULT 0,
  notes        TEXT,
  department   TEXT,
  email_opt_out   BOOLEAN DEFAULT FALSE,
  do_not_call     BOOLEAN DEFAULT FALSE,
  active          BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEADS ──
CREATE TABLE IF NOT EXISTS leads (
  id                   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name           TEXT,
  last_name            TEXT NOT NULL,
  company              TEXT NOT NULL,
  title                TEXT,
  email                TEXT,
  phone                TEXT,
  status               TEXT DEFAULT 'New',
  rating               TEXT,
  lead_source          TEXT,
  industry             TEXT,
  is_converted         BOOLEAN DEFAULT FALSE,
  converted_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  converted_date       TEXT,
  owner_id             UUID REFERENCES auth.users(id),
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ── DEALS ──
CREATE TABLE IF NOT EXISTS deals (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  company_id  UUID REFERENCES companies(id) ON DELETE SET NULL,
  contact_id  UUID REFERENCES contacts(id) ON DELETE SET NULL,
  owner_id    UUID REFERENCES auth.users(id),
  stage       TEXT DEFAULT 'Prospecting',
  amount      DECIMAL(15,2) DEFAULT 0,
  probability INTEGER DEFAULT 10,
  close_date  DATE,
  description TEXT,
  is_closed   BOOLEAN DEFAULT FALSE,
  is_won      BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ACTIVITIES ──
CREATE TABLE IF NOT EXISTS activities (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type         TEXT NOT NULL DEFAULT 'task',
  title        TEXT,
  description  TEXT,
  contact_id   UUID REFERENCES contacts(id) ON DELETE CASCADE,
  company_id   UUID REFERENCES companies(id) ON DELETE CASCADE,
  deal_id      UUID REFERENCES deals(id) ON DELETE CASCADE,
  owner_id     UUID REFERENCES auth.users(id),
  status       TEXT DEFAULT 'pending',
  priority     TEXT DEFAULT 'normal',
  due_date     TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── SUPPORT TICKETS ──
CREATE TABLE IF NOT EXISTS support_tickets (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ticket_number TEXT UNIQUE,
  subject       TEXT NOT NULL,
  description   TEXT,
  user_id       UUID REFERENCES auth.users(id),
  status        TEXT DEFAULT 'open',
  priority      TEXT DEFAULT 'medium',
  category      TEXT,
  assigned_to   UUID REFERENCES auth.users(id),
  resolved_at   TIMESTAMPTZ,
  is_closed     BOOLEAN DEFAULT FALSE,
  is_escalated  BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── REPORTS ──
CREATE TABLE IF NOT EXISTS reports (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,
  config      JSONB,
  owner_id    UUID REFERENCES auth.users(id),
  last_run_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ──
CREATE INDEX IF NOT EXISTS idx_companies_owner     ON companies(owner_id);
CREATE INDEX IF NOT EXISTS idx_contacts_owner      ON contacts(owner_id);
CREATE INDEX IF NOT EXISTS idx_contacts_company    ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_leads_owner         ON leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_deals_owner         ON deals(owner_id);
CREATE INDEX IF NOT EXISTS idx_activities_owner    ON activities(owner_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user        ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_owner       ON reports(owner_id);

-- ── updated_at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_updated_at    BEFORE UPDATE ON profiles        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_companies_updated_at   BEFORE UPDATE ON companies       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_contacts_updated_at    BEFORE UPDATE ON contacts        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_leads_updated_at       BEFORE UPDATE ON leads           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_deals_updated_at       BEFORE UPDATE ON deals           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_activities_updated_at  BEFORE UPDATE ON activities      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_tickets_updated_at     BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE OR REPLACE TRIGGER update_reports_updated_at     BEFORE UPDATE ON reports         FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Ticket auto-number ──
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
DECLARE seq_val INTEGER; BEGIN
  seq_val := nextval('ticket_seq');
  RETURN 'TKT-' || to_char(NOW(), 'YYYYMMDD') || '-' || LPAD(seq_val::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN NEW.ticket_number := generate_ticket_number(); END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_support_tickets_number ON support_tickets;
CREATE TRIGGER set_support_tickets_number BEFORE INSERT ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION set_ticket_number();

-- ── Auto-create profile on signup ──
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, company, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'company',
    'user'
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════════════
-- RLS — Enable on all tables
-- ═══════════════════════════════════════════════════════════════════════════
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies       ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals           ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities      ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports         ENABLE ROW LEVEL SECURITY;

-- ── Admin helper function ──
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- ── PROFILES policies ──
DROP POLICY IF EXISTS "users_read_own_profile"   ON profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_insert_own_profile" ON profiles;
DROP POLICY IF EXISTS "profiles_select"          ON profiles;

CREATE POLICY "profiles_select" ON profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ── CONTACTS policies ──
DROP POLICY IF EXISTS "users_read_own_contacts"   ON contacts;
DROP POLICY IF EXISTS "users_insert_contacts"     ON contacts;
DROP POLICY IF EXISTS "users_update_own_contacts" ON contacts;
DROP POLICY IF EXISTS "users_delete_own_contacts" ON contacts;
DROP POLICY IF EXISTS "contacts_select"           ON contacts;
DROP POLICY IF EXISTS "contacts_insert"           ON contacts;
DROP POLICY IF EXISTS "contacts_update"           ON contacts;
DROP POLICY IF EXISTS "contacts_delete"           ON contacts;

CREATE POLICY "contacts_select" ON contacts FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "contacts_insert" ON contacts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "contacts_update" ON contacts FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "contacts_delete" ON contacts FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ── LEADS policies ──
DROP POLICY IF EXISTS "public_read_leads"  ON leads;
DROP POLICY IF EXISTS "users_insert_leads" ON leads;
DROP POLICY IF EXISTS "users_update_leads" ON leads;
DROP POLICY IF EXISTS "users_delete_leads" ON leads;
DROP POLICY IF EXISTS "leads_select"       ON leads;
DROP POLICY IF EXISTS "leads_insert"       ON leads;
DROP POLICY IF EXISTS "leads_update"       ON leads;
DROP POLICY IF EXISTS "leads_delete"       ON leads;

CREATE POLICY "leads_select" ON leads FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "leads_insert" ON leads FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "leads_update" ON leads FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "leads_delete" ON leads FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ── COMPANIES policies ──
DROP POLICY IF EXISTS "users_read_own_companies"   ON companies;
DROP POLICY IF EXISTS "users_insert_companies"     ON companies;
DROP POLICY IF EXISTS "users_update_own_companies" ON companies;
DROP POLICY IF EXISTS "users_delete_own_companies" ON companies;
DROP POLICY IF EXISTS "companies_select"           ON companies;
DROP POLICY IF EXISTS "companies_insert"           ON companies;
DROP POLICY IF EXISTS "companies_update"           ON companies;
DROP POLICY IF EXISTS "companies_delete"           ON companies;

CREATE POLICY "companies_select" ON companies FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "companies_insert" ON companies FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "companies_update" ON companies FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "companies_delete" ON companies FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ── DEALS policies ──
DROP POLICY IF EXISTS "users_read_own_deals"   ON deals;
DROP POLICY IF EXISTS "users_insert_deals"     ON deals;
DROP POLICY IF EXISTS "users_update_own_deals" ON deals;
DROP POLICY IF EXISTS "users_delete_own_deals" ON deals;
DROP POLICY IF EXISTS "deals_select"           ON deals;
DROP POLICY IF EXISTS "deals_insert"           ON deals;
DROP POLICY IF EXISTS "deals_update"           ON deals;
DROP POLICY IF EXISTS "deals_delete"           ON deals;

CREATE POLICY "deals_select" ON deals FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "deals_insert" ON deals FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "deals_update" ON deals FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "deals_delete" ON deals FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ── ACTIVITIES policies ──
DROP POLICY IF EXISTS "users_read_own_activities"   ON activities;
DROP POLICY IF EXISTS "users_insert_activities"     ON activities;
DROP POLICY IF EXISTS "users_update_own_activities" ON activities;
DROP POLICY IF EXISTS "users_delete_own_activities" ON activities;
DROP POLICY IF EXISTS "activities_select"           ON activities;
DROP POLICY IF EXISTS "activities_insert"           ON activities;
DROP POLICY IF EXISTS "activities_update"           ON activities;
DROP POLICY IF EXISTS "activities_delete"           ON activities;

CREATE POLICY "activities_select" ON activities FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "activities_insert" ON activities FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "activities_update" ON activities FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "activities_delete" ON activities FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ── SUPPORT TICKETS policies ──
DROP POLICY IF EXISTS "users_read_own_tickets"   ON support_tickets;
DROP POLICY IF EXISTS "users_insert_tickets"     ON support_tickets;
DROP POLICY IF EXISTS "users_update_own_tickets" ON support_tickets;
DROP POLICY IF EXISTS "tickets_select"           ON support_tickets;
DROP POLICY IF EXISTS "tickets_insert"           ON support_tickets;
DROP POLICY IF EXISTS "tickets_update"           ON support_tickets;
DROP POLICY IF EXISTS "tickets_delete"           ON support_tickets;

CREATE POLICY "tickets_select" ON support_tickets FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin());
CREATE POLICY "tickets_insert" ON support_tickets FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "tickets_update" ON support_tickets FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR auth.uid() = assigned_to OR public.is_admin());
CREATE POLICY "tickets_delete" ON support_tickets FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.is_admin());

-- ── REPORTS policies ──
DROP POLICY IF EXISTS "users_read_own_reports"   ON reports;
DROP POLICY IF EXISTS "users_insert_reports"     ON reports;
DROP POLICY IF EXISTS "users_update_own_reports" ON reports;
DROP POLICY IF EXISTS "users_delete_own_reports" ON reports;
DROP POLICY IF EXISTS "reports_select"           ON reports;
DROP POLICY IF EXISTS "reports_insert"           ON reports;
DROP POLICY IF EXISTS "reports_update"           ON reports;
DROP POLICY IF EXISTS "reports_delete"           ON reports;

CREATE POLICY "reports_select" ON reports FOR SELECT TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "reports_insert" ON reports FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "reports_update" ON reports FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin())
  WITH CHECK (auth.uid() = owner_id OR public.is_admin());
CREATE POLICY "reports_delete" ON reports FOR DELETE TO authenticated
  USING (auth.uid() = owner_id OR public.is_admin());

-- ═══════════════════════════════════════════════════════════════════════════
-- Set admin role — replace email with yours
-- ═══════════════════════════════════════════════════════════════════════════
-- UPDATE public.profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'info@hysysglobal.com' LIMIT 1);
