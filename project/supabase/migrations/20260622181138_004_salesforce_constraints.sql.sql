-- Salesforce-style constraints migration
-- This adds proper validation, picklists, and business rules matching Salesforce data model

-- ============================================
-- COMPANIES (Salesforce Accounts equivalent)
-- ============================================

-- Add Salesforce-style columns to companies
ALTER TABLE companies ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS rating TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_address TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_city TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_state TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_postal_code TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_country TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS shipping_city TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS shipping_state TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS shipping_country TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS sic_code TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS ownership TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS tickersymbol TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add NOT NULL constraints
ALTER TABLE companies ALTER COLUMN name SET NOT NULL;

-- Add check constraints for picklist fields
ALTER TABLE companies ADD CONSTRAINT companies_type_check 
  CHECK (type IS NULL OR type IN ('Prospect', 'Customer - Direct', 'Customer - Channel', 'Partner', 'Competitor', 'Investor', 'Reseller', 'Other'));

ALTER TABLE companies ADD CONSTRAINT companies_industry_check 
  CHECK (industry IS NULL OR industry IN (
    'Agriculture', 'Apparel', 'Banking', 'Biotechnology', 'Chemicals', 'Communications',
    'Construction', 'Consulting', 'Education', 'Electronics', 'Energy', 'Engineering',
    'Entertainment', 'Environmental', 'Finance', 'Food & Beverage', 'Government',
    'Healthcare', 'Hospitality', 'Insurance', 'Machinery', 'Manufacturing', 'Media',
    'Not For Profit', 'Recreation', 'Retail', 'Shipping', 'Technology', 'Telecommunications',
    'Transportation', 'Utilities', 'Other'
  ));

ALTER TABLE companies ADD CONSTRAINT companies_rating_check 
  CHECK (rating IS NULL OR rating IN ('Hot', 'Warm', 'Cold'));

ALTER TABLE companies ADD CONSTRAINT companies_ownership_check 
  CHECK (ownership IS NULL OR ownership IN ('Public', 'Private', 'Subsidiary', 'Government', 'Other'));

ALTER TABLE companies ADD CONSTRAINT companies_employees_check 
  CHECK (employees_count IS NULL OR employees_count >= 0);

ALTER TABLE companies ADD CONSTRAINT companies_revenue_check 
  CHECK (annual_revenue IS NULL OR annual_revenue >= 0);

-- ============================================
-- CONTACTS
-- ============================================

-- Add Salesforce-style columns to contacts
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mailing_address TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mailing_city TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mailing_state TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mailing_postal_code TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS mailing_country TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_address TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_city TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_state TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_postal_code TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_country TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS fax TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS assistant_name TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS assistant_phone TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS reports_to_id UUID REFERENCES contacts(id);
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS email_opt_out BOOLEAN DEFAULT false;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS do_not_call BOOLEAN DEFAULT false;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS birthdate DATE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Add NOT NULL constraints
ALTER TABLE contacts ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE contacts ALTER COLUMN last_name SET NOT NULL;

-- Add unique constraint on email
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_email_unique;
ALTER TABLE contacts ADD CONSTRAINT contacts_email_unique UNIQUE (email);

-- Add check constraints
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_lead_source_check;
ALTER TABLE contacts ADD CONSTRAINT contacts_lead_source_check 
  CHECK (lead_source IS NULL OR lead_source IN (
    'Advertisement', 'Employee Referral', 'External Referral', 'Partner', 'Public Relations',
    'Seminar - Internal', 'Seminar - Partner', 'Trade Show', 'Web', 'Word of Mouth', 'Other',
    'Website', 'LinkedIn', 'Referral', 'Cold Outreach'
  ));

ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_lead_score_check;
ALTER TABLE contacts ADD CONSTRAINT contacts_lead_score_check 
  CHECK (lead_score >= 0 AND lead_score <= 100);

ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_value_check;
ALTER TABLE contacts ADD CONSTRAINT contacts_value_check 
  CHECK (value >= 0);

-- ============================================
-- DEALS (Salesforce Opportunities equivalent)
-- ============================================

-- Add Salesforce-style columns
ALTER TABLE deals ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS next_step TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS probability_history JSONB;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS lead_source TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS campaign_id UUID;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS is_closed BOOLEAN DEFAULT false;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS is_won BOOLEAN DEFAULT false;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS forecast_category TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS fiscal_year INTEGER;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS fiscal_quarter INTEGER;

-- Add check constraints
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_type_check;
ALTER TABLE deals ADD CONSTRAINT deals_type_check 
  CHECK (type IS NULL OR type IN ('Existing Customer', 'Existing Customer - Upgrade', 'New Customer'));

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_stage_check;
ALTER TABLE deals ADD CONSTRAINT deals_stage_check 
  CHECK (stage IN ('Prospecting', 'Qualification', 'Needs Analysis', 'Value Proposition', 'Id. Decision Makers', 'Perception Analysis', 'Proposal/Price Quote', 'Negotiation/Review', 'Closed Won', 'Closed Lost'));

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_probability_check;
ALTER TABLE deals ADD CONSTRAINT deals_probability_check 
  CHECK (probability >= 0 AND probability <= 100);

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_amount_check;
ALTER TABLE deals ADD CONSTRAINT deals_amount_check 
  CHECK (amount >= 0);

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_forecast_category_check;
ALTER TABLE deals ADD CONSTRAINT deals_forecast_category_check 
  CHECK (forecast_category IS NULL OR forecast_category IN ('Pipeline', 'Best Case', 'Commit', 'Closed', 'Omitted'));

ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_fiscal_quarter_check;
ALTER TABLE deals ADD CONSTRAINT deals_fiscal_quarter_check 
  CHECK (fiscal_quarter IS NULL OR (fiscal_quarter >= 1 AND fiscal_quarter <= 4));

-- Stage-probability trigger
CREATE OR REPLACE FUNCTION update_deal_stage_probability()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-set probability based on stage
  IF NEW.stage = 'Prospecting' THEN NEW.probability := 10;
  ELSIF NEW.stage = 'Qualification' THEN NEW.probability := 20;
  ELSIF NEW.stage = 'Needs Analysis' THEN NEW.probability := 30;
  ELSIF NEW.stage = 'Value Proposition' THEN NEW.probability := 50;
  ELSIF NEW.stage = 'Id. Decision Makers' THEN NEW.probability := 60;
  ELSIF NEW.stage = 'Perception Analysis' THEN NEW.probability := 70;
  ELSIF NEW.stage = 'Proposal/Price Quote' THEN NEW.probability := 75;
  ELSIF NEW.stage = 'Negotiation/Review' THEN NEW.probability := 90;
  ELSIF NEW.stage = 'Closed Won' THEN
    NEW.probability := 100;
    NEW.is_closed := true;
    NEW.is_won := true;
  ELSIF NEW.stage = 'Closed Lost' THEN
    NEW.probability := 0;
    NEW.is_closed := true;
    NEW.is_won := false;
  END IF;
  
  -- Set fiscal year and quarter based on close date
  IF NEW.close_date IS NOT NULL THEN
    NEW.fiscal_year := EXTRACT(YEAR FROM NEW.close_date)::INTEGER;
    NEW.fiscal_quarter := EXTRACT(QUARTER FROM NEW.close_date)::INTEGER;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS deals_stage_probability_trigger ON deals;
CREATE TRIGGER deals_stage_probability_trigger
  BEFORE INSERT OR UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_deal_stage_probability();

-- ============================================
-- ACTIVITIES (Salesforce Tasks/Events)
-- ============================================

-- Add Salesforce-style columns
ALTER TABLE activities ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Normal';
ALTER TABLE activities ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS is_all_day_event BOOLEAN DEFAULT false;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS duration_minutes INTEGER;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS activity_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS recurrence_type TEXT;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS recurrence_interval INTEGER;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS recurrence_start_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS recurrence_end_date DATE;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS who_id UUID REFERENCES contacts(id);
ALTER TABLE activities ADD COLUMN IF NOT EXISTS what_id UUID;

-- Add check constraints
ALTER TABLE activities ADD CONSTRAINT activities_task_priority_check 
  CHECK (priority IN ('High', 'Normal', 'Low'));

ALTER TABLE activities ADD CONSTRAINT activities_type_check 
  CHECK (type IN ('Call', 'Email', 'Meeting', 'Note', 'Task', 'Other'));

ALTER TABLE activities ADD CONSTRAINT activities_status_check 
  CHECK (status IN ('Not Started', 'In Progress', 'Completed', 'Waiting on someone else', 'Deferred'));

ALTER TABLE activities ADD CONSTRAINT activities_duration_check 
  CHECK (duration_minutes IS NULL OR duration_minutes >= 0);

-- ============================================
-- SUPPORT_TICKETS (Salesforce Cases equivalent)
-- ============================================

-- Add Salesforce-style columns
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS case_number TEXT UNIQUE;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS origin TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS internal_comments TEXT;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS product_id UUID;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id);
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS is_closed BOOLEAN DEFAULT false;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS is_escalated BOOLEAN DEFAULT false;
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS closed_date TIMESTAMPTZ;

-- Add check constraints
ALTER TABLE support_tickets DROP CONSTRAINT IF EXISTS tickets_status_check;
ALTER TABLE support_tickets ADD CONSTRAINT tickets_status_check 
  CHECK (status IN ('New', 'Working', 'Escalated', 'On Hold', 'Closed', 'open', 'in_progress', 'waiting_customer', 'resolved'));

ALTER TABLE support_tickets DROP CONSTRAINT IF EXISTS tickets_priority_check;
ALTER TABLE support_tickets ADD CONSTRAINT tickets_priority_check 
  CHECK (priority IN ('Low', 'Medium', 'High', 'Critical', 'low', 'medium', 'high', 'urgent'));

ALTER TABLE support_tickets ADD CONSTRAINT tickets_origin_check 
  CHECK (origin IS NULL OR origin IN ('Phone', 'Email', 'Web', 'Social Media', 'Chat', 'Internal'));

ALTER TABLE support_tickets ADD CONSTRAINT tickets_type_check 
  CHECK (type IS NULL OR type IN ('Question', 'Incident', 'Problem', 'Feature Request', 'Other'));

ALTER TABLE support_tickets ADD CONSTRAINT tickets_reason_check 
  CHECK (reason IS NULL OR reason IN (
    'Installation', 'Equipment', 'Initial Configuration', 'User Error', 
    'Complexity', 'New Feature Request', 'Performance', 'Other', 'Training'
  ));

-- ============================================
-- PRODUCTS (for opportunity line items)
-- ============================================

CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  product_code TEXT UNIQUE,
  description TEXT,
  family TEXT,
  active BOOLEAN DEFAULT true,
  msrp DECIMAL(18,2) CHECK (msrp IS NULL OR msrp >= 0),
  unit_price DECIMAL(18,2) CHECK (unit_price IS NULL OR unit_price >= 0),
  subscription_type TEXT CHECK (subscription_type IS NULL OR subscription_type IN ('One-time', 'Monthly', 'Quarterly', 'Yearly')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ADD CONSTRAINT products_family_check 
  CHECK (family IS NULL OR family IN ('Hardware', 'Software', 'Service', 'Consulting', 'Support', 'Training'));

-- ============================================
-- PRICE BOOKS (Salesforce Price Books)
-- ============================================

CREATE TABLE price_books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_standard BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRICE BOOK ENTRIES
-- ============================================

CREATE TABLE price_book_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  price_book_id UUID REFERENCES price_books(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  unit_price DECIMAL(18,2) NOT NULL CHECK (unit_price >= 0),
  use_standard_price BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(price_book_id, product_id)
);

-- ============================================
-- OPPORTUNITY LINE ITEMS
-- ============================================

CREATE TABLE opportunity_line_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  opportunity_id UUID REFERENCES deals(id) ON DELETE CASCADE NOT NULL,
  price_book_entry_id UUID REFERENCES price_book_entries(id) NOT NULL,
  quantity DECIMAL(18,4) NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(18,2) NOT NULL CHECK (unit_price >= 0),
  total_price DECIMAL(18,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  discount DECIMAL(5,2) DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  service_date DATE,
  service_period TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAMPAIGNS (Salesforce Campaigns)
-- ============================================

CREATE TABLE campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  status TEXT DEFAULT 'planned',
  start_date DATE,
  end_date DATE,
  expected_revenue DECIMAL(18,2) CHECK (expected_revenue IS NULL OR expected_revenue >= 0),
  budgeted_cost DECIMAL(18,2) CHECK (budgeted_cost IS NULL OR budgeted_cost >= 0),
  actual_cost DECIMAL(18,2) CHECK (actual_cost IS NULL OR actual_cost >= 0),
  expected_response DECIMAL(5,2) CHECK (expected_response IS NULL OR (expected_response >= 0 AND expected_response <= 100)),
  number_sent INTEGER CHECK (number_sent IS NULL OR number_sent >= 0),
  owner_id UUID REFERENCES auth.users(id),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE campaigns ADD CONSTRAINT campaigns_type_check 
  CHECK (type IS NULL OR type IN ('Conference', 'Direct Mail', 'Email', 'Print Advertisement', 'Radio', 'Television', 'Web', 'Webinar', 'Other'));

ALTER TABLE campaigns ADD CONSTRAINT campaigns_status_check 
  CHECK (status IN ('planned', 'in_progress', 'completed', 'aborted'));

-- ============================================
-- LEADS (separate from contacts - Salesforce model)
-- ============================================

CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT,
  last_name TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  fax TEXT,
  street TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  status TEXT DEFAULT 'Open - Not Contacted',
  rating TEXT,
  lead_source TEXT,
  industry TEXT,
  annual_revenue DECIMAL(18,2),
  employees INTEGER CHECK (employees IS NULL OR employees >= 0),
  owner_id UUID REFERENCES auth.users(id),
  is_converted BOOLEAN DEFAULT false,
  converted_contact_id UUID REFERENCES contacts(id),
  converted_company_id UUID REFERENCES companies(id),
  converted_deal_id UUID REFERENCES deals(id),
  converted_date TIMESTAMPTZ,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead constraints
ALTER TABLE leads ADD CONSTRAINT leads_status_check 
  CHECK (status IN ('Open - Not Contacted', 'Working - Contacted', 'Closed - Converted', 'Closed - Not Converted'));

ALTER TABLE leads ADD CONSTRAINT leads_rating_check 
  CHECK (rating IS NULL OR rating IN ('Hot', 'Warm', 'Cold'));

ALTER TABLE leads ADD CONSTRAINT leads_lead_source_check 
  CHECK (lead_source IS NULL OR lead_source IN (
    'Advertisement', 'Employee Referral', 'External Referral', 'Partner', 'Public Relations',
    'Seminar - Internal', 'Seminar - Partner', 'Trade Show', 'Web', 'Word of Mouth', 'Other'
  ));

ALTER TABLE leads ADD CONSTRAINT leads_industry_check 
  CHECK (industry IS NULL OR industry IN (
    'Agriculture', 'Apparel', 'Banking', 'Biotechnology', 'Chemicals', 'Communications',
    'Construction', 'Consulting', 'Education', 'Electronics', 'Energy', 'Engineering',
    'Entertainment', 'Environmental', 'Finance', 'Food & Beverage', 'Government',
    'Healthcare', 'Hospitality', 'Insurance', 'Machinery', 'Manufacturing', 'Media',
    'Not For Profit', 'Recreation', 'Retail', 'Shipping', 'Technology', 'Telecommunications',
    'Transportation', 'Utilities', 'Other'
  ));

-- ============================================
-- NOTES & ATTACHMENTS
-- ============================================

CREATE TABLE notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT,
  body TEXT NOT NULL,
  parent_id UUID NOT NULL,
  parent_type TEXT NOT NULL CHECK (parent_type IN ('Account', 'Contact', 'Opportunity', 'Lead', 'Case')),
  owner_id UUID REFERENCES auth.users(id),
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add updated_at triggers for new tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_price_books_updated_at BEFORE UPDATE ON price_books FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create indexes
CREATE INDEX idx_products_family ON products(family);
CREATE INDEX idx_price_books_standard ON price_books(is_standard);
CREATE INDEX idx_campaigns_owner ON campaigns(owner_id);
CREATE INDEX idx_leads_owner ON leads(owner_id);
CREATE INDEX idx_converted_leads ON leads(is_converted);
CREATE INDEX idx_notes_parent ON notes(parent_id, parent_type);