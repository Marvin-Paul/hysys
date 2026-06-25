-- Add performance indexes for frequently queried fields
-- This migration improves query performance for common CRM operations

-- ============================================
-- CONTACTS INDEXES
-- ============================================

-- Index for email lookups (login, search)
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email) WHERE email IS NOT NULL;

-- Index for full name searches
CREATE INDEX IF NOT EXISTS idx_contacts_full_name ON contacts(
  lower(first_name), 
  lower(last_name)
);

-- Index for lead score filtering
CREATE INDEX IF NOT EXISTS idx_contacts_lead_score ON contacts(lead_score) WHERE lead_score > 50;

-- Index for lead source analysis
CREATE INDEX IF NOT EXISTS idx_contacts_lead_source ON contacts(lead_source) WHERE lead_source IS NOT NULL;

-- ============================================
-- COMPANIES INDEXES
-- ============================================

-- Index for company name searches
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(lower(name));

-- Index for industry filtering
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry) WHERE industry IS NOT NULL;

-- Index for active companies
CREATE INDEX IF NOT EXISTS idx_companies_active ON companies(active) WHERE active = true;

-- Index for type filtering (Prospect, Customer, etc.)
CREATE INDEX IF NOT EXISTS idx_companies_type ON companies(type) WHERE type IS NOT NULL;

-- ============================================
-- DEALS INDEXES
-- ============================================

-- Index for close date filtering (pipeline forecasting)
CREATE INDEX IF NOT EXISTS idx_deals_close_date ON deals(close_date) WHERE close_date IS NOT NULL;

-- Index for amount filtering (revenue analysis)
CREATE INDEX IF NOT EXISTS idx_deals_amount ON deals(amount) WHERE amount > 0;

-- Index for open deals (pipeline)
CREATE INDEX IF NOT EXISTS idx_deals_open ON deals(stage) WHERE stage NOT IN ('Closed Won', 'Closed Lost');

-- Index for forecast category
CREATE INDEX IF NOT EXISTS idx_deals_forecast_category ON deals(forecast_category) WHERE forecast_category IS NOT NULL;

-- Index for fiscal year/quarter reporting
CREATE INDEX IF NOT EXISTS idx_deals_fiscal ON deals(fiscal_year, fiscal_quarter) WHERE fiscal_year IS NOT NULL;

-- ============================================
-- ACTIVITIES INDEXES
-- ============================================

-- Index for due date filtering (task management)
CREATE INDEX IF NOT EXISTS idx_activities_due_date ON activities(due_date) WHERE due_date IS NOT NULL;

-- Index for pending/incomplete tasks
CREATE INDEX IF NOT EXISTS idx_activities_pending ON activities(status) WHERE status != 'completed';

-- Index for activity type filtering
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type) WHERE type IS NOT NULL;

-- Index for activity date (reporting)
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date) WHERE activity_date IS NOT NULL;

-- ============================================
-- SUPPORT TICKETS INDEXES
-- ============================================

-- Index for ticket number lookups
CREATE INDEX IF NOT EXISTS idx_support_tickets_number ON support_tickets(ticket_number) WHERE ticket_number IS NOT NULL;

-- Index for case number lookups (Salesforce style)
CREATE INDEX IF NOT EXISTS idx_support_tickets_case_number ON support_tickets(case_number) WHERE case_number IS NOT NULL;

-- Index for open tickets
CREATE INDEX IF NOT EXISTS idx_support_tickets_open ON support_tickets(status) WHERE status NOT IN ('resolved', 'closed');

-- Index for priority filtering
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority) WHERE priority IN ('high', 'urgent', 'High', 'Critical');

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category) WHERE category IS NOT NULL;

-- ============================================
-- LEADS INDEXES
-- ============================================

-- Index for lead status filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status) WHERE status != 'Closed - Converted';

-- Index for unconverted leads
CREATE INDEX IF NOT EXISTS idx_leads_unconverted ON leads(is_converted) WHERE is_converted = false;

-- Index for lead rating (Hot/Warm/Cold)
CREATE INDEX IF NOT EXISTS idx_leads_rating ON leads(rating) WHERE rating = 'Hot';

-- Index for lead company searches
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(lower(company));

-- ============================================
-- CAMPAIGNS INDEXES
-- ============================================

-- Index for campaign status
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status) WHERE status != 'completed';

-- Index for active campaigns (date range)
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date) WHERE status = 'in_progress';

-- Index for campaign type
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON campaigns(type) WHERE type IS NOT NULL;

-- ============================================
-- PRODUCTS INDEXES
-- ============================================

-- Index for product code lookups
CREATE INDEX IF NOT EXISTS idx_products_code ON products(product_code) WHERE product_code IS NOT NULL;

-- Index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active) WHERE active = true;

-- Index for product family
CREATE INDEX IF NOT EXISTS idx_products_family ON products(family) WHERE family IS NOT NULL;

-- ============================================
-- OPPORTUNITY LINE ITEMS INDEXES
-- ============================================

-- Index for opportunity lookups
CREATE INDEX IF NOT EXISTS idx_opp_items_opportunity ON opportunity_line_items(opportunity_id);

-- Index for product lookups in line items
CREATE INDEX IF NOT EXISTS idx_opp_items_product ON opportunity_line_items(price_book_entry_id);

-- ============================================
-- QUOTES INDEXES
-- ============================================

-- Index for quote status
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status) WHERE status IN ('Draft', 'Needs Review', 'Presented');

-- Index for expiration date
CREATE INDEX IF NOT EXISTS idx_quotes_expiration ON quotes(expiration_date) WHERE expiration_date > CURRENT_DATE;

-- Index for quote number
CREATE INDEX IF NOT EXISTS idx_quotes_number ON quotes(quote_number) WHERE quote_number IS NOT NULL;

-- ============================================
-- CONTRACTS INDEXES
-- ============================================

-- Index for contract status
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status) WHERE status IN ('Draft', 'Activated', 'Active');

-- Index for contract dates
CREATE INDEX IF NOT EXISTS idx_contracts_dates ON contracts(start_date, end_date) WHERE status = 'Active';

-- Index for contract number
CREATE INDEX IF NOT EXISTS idx_contracts_number ON contracts(contract_number) WHERE contract_number IS NOT NULL;

-- ============================================
-- ASSETS INDEXES
-- ============================================

-- Index for asset status
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status) WHERE status = 'Active';

-- Index for serial number
CREATE INDEX IF NOT EXISTS idx_assets_serial ON assets(serial_number) WHERE serial_number IS NOT NULL;

-- Index for product in assets
CREATE INDEX IF NOT EXISTS idx_assets_product ON assets(product_id) WHERE product_id IS NOT NULL;

-- ============================================
-- COMPOSITE INDEXES FOR COMMON QUERIES
-- ============================================

-- Contacts: Owner + Status (common dashboard query)
CREATE INDEX IF NOT EXISTS idx_contacts_owner_status ON contacts(owner_id, status) WHERE owner_id IS NOT NULL;

-- Deals: Owner + Stage (pipeline view)
CREATE INDEX IF NOT EXISTS idx_deals_owner_stage ON deals(owner_id, stage) WHERE owner_id IS NOT NULL;

-- Activities: Owner + Due Date (task list)
CREATE INDEX IF NOT EXISTS idx_activities_owner_due ON activities(owner_id, due_date) WHERE owner_id IS NOT NULL AND due_date IS NOT NULL;

-- Support Tickets: User + Status (user's tickets)
CREATE INDEX IF NOT EXISTS idx_tickets_user_status ON support_tickets(user_id, status) WHERE user_id IS NOT NULL;

-- Leads: Owner + Status (lead management)
CREATE INDEX IF NOT EXISTS idx_leads_owner_status ON leads(owner_id, status) WHERE owner_id IS NOT NULL;
