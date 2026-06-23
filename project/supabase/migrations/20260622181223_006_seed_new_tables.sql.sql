-- Seed data for new Salesforce-style tables

-- Insert products
INSERT INTO products (name, product_code, description, family, unit_price, subscription_type) VALUES
  ('Sales Cloud Professional', 'SCP-001', 'Full-featured CRM for sales teams', 'Software', 75.00, 'Monthly'),
  ('Sales Cloud Enterprise', 'SCE-001', 'Enterprise CRM with advanced features', 'Software', 150.00, 'Monthly'),
  ('Service Cloud', 'SCC-001', 'Customer service and support platform', 'Software', 100.00, 'Monthly'),
  ('Marketing Cloud', 'MCC-001', 'Digital marketing automation', 'Software', 125.00, 'Monthly'),
  ('Implementation Services', 'IMP-001', 'Professional implementation services', 'Service', 5000.00, 'One-time'),
  ('Training Package', 'TRN-001', 'User training program', 'Training', 2500.00, 'One-time'),
  ('Premium Support', 'SUP-001', '24/7 premium support package', 'Support', 500.00, 'Monthly');

-- Insert price books
INSERT INTO price_books (name, description, is_standard, is_active) VALUES
  ('Standard Price Book', 'Standard pricing for all products', true, true),
  ('Enterprise Price Book', 'Discounted pricing for enterprise customers', false, true),
  ('Nonprofit Price Book', 'Special pricing for nonprofit organizations', false, true);

-- Insert price book entries
INSERT INTO price_book_entries (price_book_id, product_id, unit_price)
SELECT pb.id, p.id, 
  CASE 
    WHEN pb.name = 'Standard Price Book' THEN p.unit_price
    WHEN pb.name = 'Enterprise Price Book' THEN p.unit_price * 0.8
    WHEN pb.name = 'Nonprofit Price Book' THEN p.unit_price * 0.5
  END
FROM price_books pb
CROSS JOIN products p;

-- Insert campaigns
INSERT INTO campaigns (name, type, status, start_date, end_date, expected_revenue, budgeted_cost, owner_id)
VALUES
  ('Q1 Product Launch', 'Email', 'completed', '2026-01-01'::date, '2026-03-31'::date, 150000, 15000, NULL),
  ('Annual Conference 2026', 'Conference', 'in_progress', '2026-06-01'::date, '2026-06-30'::date, 500000, 75000, NULL),
  ('Summer Webinar Series', 'Webinar', 'planned', '2026-07-01'::date, '2026-09-30'::date, 100000, 5000, NULL),
  ('Partner Recruitment', 'Direct Mail', 'in_progress', '2026-05-01'::date, '2026-08-31'::date, 200000, 10000, NULL);

-- Insert leads
INSERT INTO leads (first_name, last_name, company, title, email, phone, status, rating, lead_source, industry, owner_id)
VALUES
  ('Alice', 'Johnson', 'TechStart Inc', 'CEO', 'alice@techstart.com', '+1 555-1001', 'Open - Not Contacted', 'Hot', 'Trade Show', 'Technology', NULL),
  ('Bob', 'Williams', 'DataFlow Systems', 'CTO', 'bob@dataflow.com', '+1 555-1002', 'Working - Contacted', 'Warm', 'Web', 'Technology', NULL),
  ('Carol', 'Davis', 'RetailPro', 'VP Sales', 'carol@retailpro.com', '+1 555-1003', 'Open - Not Contacted', 'Cold', 'Advertisement', 'Retail', NULL),
  ('Daniel', 'Martinez', 'HealthFirst Solutions', 'Director IT', 'daniel@healthfirst.com', '+1 555-1004', 'Working - Contacted', 'Hot', 'Partner', 'Healthcare', NULL),
  ('Eva', 'Anderson', 'FinanceHub', 'CFO', 'eva@financehub.com', '+1 555-1005', 'Open - Not Contacted', 'Warm', 'Employee Referral', 'Finance', NULL);

-- Update existing deals to have close dates
UPDATE deals SET close_date = COALESCE(close_date, CURRENT_DATE + INTERVAL '30 days') WHERE close_date IS NULL;

-- Update deal probabilities based on current stages
UPDATE deals SET probability = 
  CASE 
    WHEN stage = 'Prospecting' THEN 10
    WHEN stage = 'Qualification' THEN 20
    WHEN stage = 'Proposal/Price Quote' THEN 75
    WHEN stage = 'Negotiation/Review' THEN 90
    ELSE probability
  END;