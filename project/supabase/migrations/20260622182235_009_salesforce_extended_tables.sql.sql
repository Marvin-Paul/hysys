-- Add missing Salesforce tables and features

-- ============================================
-- CAMPAIGN MEMBERS
-- ============================================

CREATE TABLE campaign_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'Sent',
  has_responded BOOLEAN DEFAULT false,
  first_response_date TIMESTAMPTZ,
  response_type TEXT,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK ((lead_id IS NOT NULL AND contact_id IS NULL) OR (lead_id IS NULL AND contact_id IS NOT NULL))
);

ALTER TABLE campaign_members ADD CONSTRAINT campaign_members_status_check 
  CHECK (status IN ('Sent', 'Received', 'Open', 'Click-through', 'Unsubscribed', 'Bounced', 'Completed', 'Responded'));

ALTER TABLE campaign_members ADD CONSTRAINT campaign_members_response_type_check 
  CHECK (response_type IS NULL OR response_type IN ('Responded', 'Click-through', 'Open'));

CREATE INDEX idx_campaign_members_campaign ON campaign_members(campaign_id);
CREATE INDEX idx_campaign_members_lead ON campaign_members(lead_id);
CREATE INDEX idx_campaign_members_contact ON campaign_members(contact_id);

-- ============================================
-- OPPORTUNITY CONTACT ROLES
-- ============================================

CREATE TABLE opportunity_contact_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  opportunity_id UUID REFERENCES deals(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'Other',
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(opportunity_id, contact_id)
);

ALTER TABLE opportunity_contact_roles ADD CONSTRAINT contact_roles_role_check 
  CHECK (role IN ('Business User', 'Decision Maker', 'Economic Buyer', 'Economic Decision Maker', 
                   'Evaluator', 'Executive Sponsor', 'Influencer', 'Other', 'Technical Buyer'));

CREATE INDEX idx_contact_roles_opportunity ON opportunity_contact_roles(opportunity_id);
CREATE INDEX idx_contact_roles_contact ON opportunity_contact_roles(contact_id);

-- ============================================
-- QUOTES
-- ============================================

CREATE TABLE quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_number TEXT UNIQUE,
  name TEXT NOT NULL,
  opportunity_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  owner_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'Draft',
  expiration_date DATE,
  subtotal DECIMAL(18,2) DEFAULT 0 CHECK (subtotal >= 0),
  discount DECIMAL(18,2) DEFAULT 0 CHECK (discount >= 0),
  tax DECIMAL(18,2) DEFAULT 0 CHECK (tax >= 0),
  shipping DECIMAL(18,2) DEFAULT 0 CHECK (shipping >= 0),
  total DECIMAL(18,2) GENERATED ALWAYS AS (subtotal - discount + tax + shipping) STORED,
  billing_name TEXT,
  billing_address TEXT,
  billing_city TEXT,
  billing_state TEXT,
  billing_postal_code TEXT,
  billing_country TEXT,
  shipping_name TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_postal_code TEXT,
  shipping_country TEXT,
  description TEXT,
  terms_conditions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quotes ADD CONSTRAINT quotes_status_check 
  CHECK (status IN ('Draft', 'Needs Review', 'Presented', 'Accepted', 'Denied', 'Expired'));

CREATE INDEX idx_quotes_opportunity ON quotes(opportunity_id);
CREATE INDEX idx_quotes_company ON quotes(company_id);
CREATE INDEX idx_quotes_owner ON quotes(owner_id);

-- Quote Line Items
CREATE TABLE quote_line_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id),
  product_name TEXT,
  description TEXT,
  quantity DECIMAL(18,4) NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(18,2) NOT NULL CHECK (unit_price >= 0),
  line_total DECIMAL(18,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  discount DECIMAL(5,2) DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  service_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quote_line_items_quote ON quote_line_items(quote_id);

-- ============================================
-- CONTRACTS
-- ============================================

CREATE TABLE contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_number TEXT UNIQUE,
  name TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  owner_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'Draft',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  contract_term_months INTEGER CHECK (contract_term_months > 0),
  activation_date DATE,
  description TEXT,
  company_signed_date DATE,
  company_signed_by UUID REFERENCES auth.users(id),
  customer_signed_date DATE,
  customer_signed_by TEXT,
  price_book_id UUID REFERENCES price_books(id),
  total_contract_value DECIMAL(18,2) CHECK (total_contract_value >= 0),
  special_terms TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contracts ADD CONSTRAINT contracts_status_check 
  CHECK (status IN ('Draft', 'Activated', 'Active', 'Expired', 'Cancelled'));

CREATE INDEX idx_contracts_company ON contracts(company_id);
CREATE INDEX idx_contracts_contact ON contracts(contact_id);
CREATE INDEX idx_contracts_owner ON contracts(owner_id);

-- ============================================
-- ASSETS (Products sold to customers)
-- ============================================

CREATE TABLE assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  serial_number TEXT,
  product_id UUID REFERENCES products(id),
  product_code TEXT,
  company_id UUID REFERENCES companies(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  contract_id UUID REFERENCES contracts(id),
  status TEXT DEFAULT 'Active',
  purchase_date DATE,
  install_date DATE,
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  usage TEXT,
  price DECIMAL(18,2) CHECK (price >= 0),
  quantity DECIMAL(18,4) DEFAULT 1,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE assets ADD CONSTRAINT assets_status_check 
  CHECK (status IN ('Active', 'Cancelled', 'Inactive', 'Purchased', 'Registered', 'Shipped'));

CREATE INDEX idx_assets_company ON assets(company_id);
CREATE INDEX idx_assets_contact ON assets(contact_id);
CREATE INDEX idx_assets_product ON assets(product_id);

-- ============================================
-- ATTACHMENTS (File uploads)
-- ============================================

CREATE TABLE attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  parent_id UUID NOT NULL,
  parent_type TEXT NOT NULL CHECK (parent_type IN ('Account', 'Contact', 'Opportunity', 'Lead', 'Case', 'Contract', 'Quote')),
  description TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_attachments_parent ON attachments(parent_id, parent_type);

-- ============================================
-- SERVICE CONTRACTS (Support entitlements)
-- ============================================

CREATE TABLE service_contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_number TEXT UNIQUE,
  name TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  owner_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'Draft',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  activation_date DATE,
  total_cases_allowed INTEGER,
  total_cases_used INTEGER DEFAULT 0,
  description TEXT,
  price_book_id UUID REFERENCES price_books(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_contracts ADD CONSTRAINT service_contracts_status_check 
  CHECK (status IN ('Draft', 'Activated', 'Active', 'Completed', 'Expired', 'Cancelled'));

CREATE INDEX idx_service_contracts_company ON service_contracts(company_id);

-- ============================================
-- ENTITLEMENTS (Specific support rights)
-- ============================================

CREATE TABLE entitlements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  service_contract_id UUID REFERENCES service_contracts(id),
  asset_id UUID REFERENCES assets(id),
  owner_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'Active',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cases_per_entitlement INTEGER,
  remaining_cases INTEGER,
  type TEXT DEFAULT 'Support',
  terms TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE entitlements ADD CONSTRAINT entitlements_status_check 
  CHECK (status IN ('Active', 'Inactive', 'Expired', 'Cancelled'));
ALTER TABLE entitlements ADD CONSTRAINT entitlements_type_check 
  CHECK (type IN ('Support', 'Consulting', 'Training'));

CREATE INDEX idx_entitlements_company ON entitlements(company_id);

-- ============================================
-- AUTO-NUMBER GENERATION
-- ============================================

-- Sequence tables for auto-numbering
CREATE SEQUENCE case_number_seq START 1000;
CREATE SEQUENCE contract_number_seq START 1000;
CREATE SEQUENCE quote_number_seq START 1000;

-- Function to generate case numbers
CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'CAS-' || LPAD(nextval('case_number_seq')::TEXT, 8, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to generate contract numbers
CREATE OR REPLACE FUNCTION generate_contract_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'CNT-' || LPAD(nextval('contract_number_seq')::TEXT, 8, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to generate quote numbers
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'QUO-' || LPAD(nextval('quote_number_seq')::TEXT, 8, '0');
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-number generation
CREATE OR REPLACE FUNCTION auto_case_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.case_number := COALESCE(NEW.case_number, generate_case_number());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER support_tickets_auto_number
  BEFORE INSERT ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION auto_case_number();

CREATE OR REPLACE FUNCTION auto_contract_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.contract_number := COALESCE(NEW.contract_number, generate_contract_number());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contracts_auto_number
  BEFORE INSERT ON contracts
  FOR EACH ROW EXECUTE FUNCTION auto_contract_number();

CREATE OR REPLACE FUNCTION auto_service_contract_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.contract_number := COALESCE(NEW.contract_number, generate_contract_number());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER service_contracts_auto_number
  BEFORE INSERT ON service_contracts
  FOR EACH ROW EXECUTE FUNCTION auto_service_contract_number();

CREATE OR REPLACE FUNCTION auto_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.quote_number := COALESCE(NEW.quote_number, generate_quote_number());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quotes_auto_number
  BEFORE INSERT ON quotes
  FOR EACH ROW EXECUTE FUNCTION auto_quote_number();

-- ============================================
-- LEAD CONVERSION FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION convert_lead(
  p_lead_id UUID,
  p_create_company BOOLEAN DEFAULT true,
  p_create_opportunity BOOLEAN DEFAULT true,
  p_opportunity_name TEXT DEFAULT NULL,
  p_owner_id UUID DEFAULT NULL
)
RETURNS TABLE (
  contact_id UUID,
  company_id UUID,
  opportunity_id UUID
) AS $$
DECLARE
  v_lead RECORD;
  v_new_company_id UUID;
  v_new_contact_id UUID;
  v_new_opportunity_id UUID;
  v_name TEXT;
BEGIN
  -- Get lead data
  SELECT * INTO v_lead FROM leads WHERE id = p_lead_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Lead not found';
  END IF;
  
  IF v_lead.is_converted THEN
    RAISE EXCEPTION 'Lead already converted';
  END IF;
  
  -- Create company if requested
  IF p_create_company THEN
    INSERT INTO companies (name, industry, address, city, state, postal_code, country, phone, website, owner_id)
    VALUES (
      v_lead.company,
      v_lead.industry,
      v_lead.street,
      v_lead.city,
      v_lead.state,
      v_lead.postal_code,
      v_lead.country,
      v_lead.phone,
      NULL,
      COALESCE(p_owner_id, v_lead.owner_id)
    )
    RETURNING id INTO v_new_company_id;
  END IF;
  
  -- Create contact
  INSERT INTO contacts (first_name, last_name, email, phone, mobile, title, company_id, owner_id, status, lead_source)
  VALUES (
    v_lead.first_name,
    v_lead.last_name,
    v_lead.email,
    v_lead.phone,
    v_lead.mobile,
    v_lead.title,
    v_new_company_id,
    COALESCE(p_owner_id, v_lead.owner_id),
    'active',
    v_lead.lead_source
  )
  RETURNING id INTO v_new_contact_id;
  
  -- Create opportunity if requested
  IF p_create_opportunity THEN
    v_name := COALESCE(p_opportunity_name, v_lead.company || ' Opportunity');
    INSERT INTO deals (name, company_id, contact_id, owner_id, stage, amount)
    VALUES (
      v_name,
      v_new_company_id,
      v_new_contact_id,
      COALESCE(p_owner_id, v_lead.owner_id),
      'Qualification',
      v_lead.annual_revenue
    )
    RETURNING id INTO v_new_opportunity_id;
  END IF;
  
  -- Mark lead as converted
  UPDATE leads SET
    is_converted = true,
    converted_contact_id = v_new_contact_id,
    converted_company_id = v_new_company_id,
    converted_deal_id = v_new_opportunity_id,
    converted_date = NOW(),
    status = 'Closed - Converted'
  WHERE id = p_lead_id;
  
  RETURN QUERY SELECT v_new_contact_id, v_new_company_id, v_new_opportunity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- LAST ACTIVITY DATE UPDATE
-- ============================================

CREATE OR REPLACE FUNCTION update_last_activity_date()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update contact last activity
    IF NEW.contact_id IS NOT NULL THEN
      UPDATE contacts SET updated_at = NOW() WHERE id = NEW.contact_id;
    END IF;
    -- Update company last activity
    IF NEW.company_id IS NOT NULL THEN
      UPDATE companies SET updated_at = NOW() WHERE id = NEW.company_id;
    END IF;
    -- Update deal last activity
    IF NEW.deal_id IS NOT NULL THEN
      UPDATE deals SET updated_at = NOW() WHERE id = NEW.deal_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER activities_last_activity_update
  AFTER INSERT ON activities
  FOR EACH ROW EXECUTE FUNCTION update_last_activity_date();

-- ============================================
-- ADD UPDATED_AT TRIGGERS FOR NEW TABLES
-- ============================================

CREATE TRIGGER update_campaign_members_updated_at BEFORE UPDATE ON campaign_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_opportunity_contact_roles_updated_at BEFORE UPDATE ON opportunity_contact_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_quote_line_items_updated_at BEFORE UPDATE ON quote_line_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_service_contracts_updated_at BEFORE UPDATE ON service_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_entitlements_updated_at BEFORE UPDATE ON entitlements FOR EACH ROW EXECUTE FUNCTION update_updated_at();