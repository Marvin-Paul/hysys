-- HYSYS CRM Database Schema
-- PostgreSQL 17

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── USERS (replaces Supabase auth.users) ──
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name    VARCHAR(100),
  last_name     VARCHAR(100),
  company       VARCHAR(255),
  role          VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── COMPANIES ──
CREATE TABLE companies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  industry      VARCHAR(100),
  website       VARCHAR(255),
  phone         VARCHAR(50),
  address       TEXT,
  city          VARCHAR(100),
  country       VARCHAR(100),
  owner_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── CONTACTS ──
CREATE TABLE contacts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255),
  phone         VARCHAR(50),
  mobile        VARCHAR(50),
  title         VARCHAR(100),
  company_id    UUID REFERENCES companies(id) ON DELETE SET NULL,
  company       VARCHAR(255),
  status        VARCHAR(50) DEFAULT 'lead',
  owner_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEADS ──
CREATE TABLE leads (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name        VARCHAR(100),
  last_name         VARCHAR(100) NOT NULL,
  company           VARCHAR(255) NOT NULL,
  title             VARCHAR(100),
  email             VARCHAR(255),
  phone             VARCHAR(50),
  status            VARCHAR(50) DEFAULT 'New',
  rating            VARCHAR(20),
  lead_source       VARCHAR(100),
  industry          VARCHAR(100),
  is_converted      BOOLEAN DEFAULT FALSE,
  converted_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  owner_id          UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── DEALS (Opportunities) ──
CREATE TABLE deals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  company_id    UUID REFERENCES companies(id) ON DELETE SET NULL,
  contact_id    UUID REFERENCES contacts(id) ON DELETE SET NULL,
  owner_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  stage         VARCHAR(100) DEFAULT 'Prospecting',
  amount        NUMERIC(15,2) DEFAULT 0,
  probability   INTEGER DEFAULT 10,
  close_date    DATE,
  description   TEXT,
  is_closed     BOOLEAN DEFAULT FALSE,
  is_won        BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── ACTIVITIES ──
CREATE TABLE activities (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          VARCHAR(50) NOT NULL DEFAULT 'task',
  title         VARCHAR(255),
  description   TEXT,
  contact_id    UUID REFERENCES contacts(id) ON DELETE SET NULL,
  company_id    UUID REFERENCES companies(id) ON DELETE SET NULL,
  deal_id       UUID REFERENCES deals(id) ON DELETE SET NULL,
  owner_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  status        VARCHAR(50) DEFAULT 'open',
  priority      VARCHAR(20) DEFAULT 'normal',
  due_date      TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SUPPORT TICKETS ──
CREATE TABLE support_tickets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject       VARCHAR(255) NOT NULL,
  description   TEXT,
  user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  status        VARCHAR(50) DEFAULT 'open',
  priority      VARCHAR(20) DEFAULT 'medium',
  category      VARCHAR(100),
  assigned_to   UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── REFRESH TOKENS ──
CREATE TABLE refresh_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  token         VARCHAR(512) UNIQUE NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ──
CREATE INDEX idx_contacts_owner   ON contacts(owner_id);
CREATE INDEX idx_leads_owner      ON leads(owner_id);
CREATE INDEX idx_deals_owner      ON deals(owner_id);
CREATE INDEX idx_activities_owner ON activities(owner_id);
CREATE INDEX idx_companies_owner  ON companies(owner_id);
CREATE INDEX idx_tickets_user     ON support_tickets(user_id);
CREATE INDEX idx_users_email      ON users(email);
CREATE INDEX idx_refresh_tokens   ON refresh_tokens(token);

-- ── updated_at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated      BEFORE UPDATE ON users           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_companies_updated  BEFORE UPDATE ON companies       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_contacts_updated   BEFORE UPDATE ON contacts        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_leads_updated      BEFORE UPDATE ON leads           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_deals_updated      BEFORE UPDATE ON deals           FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_activities_updated BEFORE UPDATE ON activities      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_tickets_updated    BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
