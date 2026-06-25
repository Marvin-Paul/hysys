-- Insert sample companies (with null owner for demo access)
INSERT INTO companies (name, industry, website, phone, city, state, country, employees_count, annual_revenue) VALUES
  ('TechCorp', 'Technology', 'https://techcorp.com', '+1 555-0100', 'San Francisco', 'CA', 'USA', 250, 50000000),
  ('Innovate Inc', 'Software', 'https://innovate.io', '+1 555-0200', 'Austin', 'TX', 'USA', 100, 25000000),
  ('GlobalCo', 'Manufacturing', 'https://globalco.com', '+1 555-0300', 'Chicago', 'IL', 'USA', 500, 120000000),
  ('FinanceHub', 'Financial Services', 'https://financehub.com', '+1 555-0400', 'New York', 'NY', 'USA', 75, 35000000),
  ('RetailMax', 'Retail', 'https://retailmax.com', '+1 555-0500', 'Seattle', 'WA', 'USA', 300, 85000000);

-- Insert sample contacts (with null owner for demo access)
INSERT INTO contacts (first_name, last_name, email, phone, title, company_id, status, lead_score, value, lead_source) VALUES
  ('Sarah', 'Chen', 'sarah@techcorp.com', '+1 555-0101', 'VP of Engineering', (SELECT id FROM companies WHERE name = 'TechCorp'), 'active', 85, 125000, 'Website'),
  ('Michael', 'Rodriguez', 'michael@innovate.io', '+1 555-0201', 'CTO', (SELECT id FROM companies WHERE name = 'Innovate Inc'), 'lead', 72, 85000, 'Referral'),
  ('Emily', 'Watson', 'emily@globalco.com', '+1 555-0301', 'Director of Operations', (SELECT id FROM companies WHERE name = 'GlobalCo'), 'active', 90, 210000, 'Trade Show'),
  ('James', 'Park', 'james@financehub.com', '+1 555-0401', 'CFO', (SELECT id FROM companies WHERE name = 'FinanceHub'), 'inactive', 45, 45000, 'Cold Outreach'),
  ('Lisa', 'Thompson', 'lisa@retailmax.com', '+1 555-0501', 'Head of Digital', (SELECT id FROM companies WHERE name = 'RetailMax'), 'lead', 68, 95000, 'LinkedIn');

-- Insert sample deals (with null owner for demo access)
INSERT INTO deals (name, company_id, contact_id, stage, amount, probability, close_date, description) VALUES
  ('TechCorp Enterprise Deal', (SELECT id FROM companies WHERE name = 'TechCorp'), (SELECT id FROM contacts WHERE email = 'sarah@techcorp.com'), 'negotiation', 125000, 75, '2026-07-15', 'Enterprise license for 50 seats'),
  ('Innovate Inc Platform', (SELECT id FROM companies WHERE name = 'Innovate Inc'), (SELECT id FROM contacts WHERE email = 'michael@innovate.io'), 'proposal', 85000, 50, '2026-08-01', 'Platform subscription'),
  ('GlobalCo Expansion', (SELECT id FROM companies WHERE name = 'GlobalCo'), (SELECT id FROM contacts WHERE email = 'emily@globalco.com'), 'qualification', 210000, 30, '2026-09-01', 'Multi-year enterprise agreement'),
  ('FinanceHub Integration', (SELECT id FROM companies WHERE name = 'FinanceHub'), (SELECT id FROM contacts WHERE email = 'james@financehub.com'), 'prospecting', 45000, 15, '2026-10-01', 'CRM integration project'),
  ('RetailMax Commerce', (SELECT id FROM companies WHERE name = 'RetailMax'), (SELECT id FROM contacts WHERE email = 'lisa@retailmax.com'), 'proposal', 95000, 60, '2026-07-30', 'Commerce Cloud implementation');

-- Insert sample activities (with null owner for demo access)
INSERT INTO activities (type, title, description, contact_id, company_id, deal_id, status, due_date, completed_at) VALUES
  ('call', 'Follow-up call with Sarah', 'Discussed enterprise pricing options', (SELECT id FROM contacts WHERE email = 'sarah@techcorp.com'), NULL, NULL, 'completed', NULL, NOW() - INTERVAL '2 hours'),
  ('email', 'Proposal sent to Michael', 'Sent detailed proposal document', (SELECT id FROM contacts WHERE email = 'michael@innovate.io'), NULL, NULL, 'completed', NULL, NOW() - INTERVAL '5 hours'),
  ('meeting', 'Demo scheduled with Emily', 'Product demo at GlobalCo HQ', (SELECT id FROM contacts WHERE email = 'emily@globalco.com'), (SELECT id FROM companies WHERE name = 'GlobalCo'), NULL, 'pending', NOW() + INTERVAL '2 days', NULL),
  ('task', 'Prepare ROI analysis', 'Create ROI calculator for FinanceHub', NULL, (SELECT id FROM companies WHERE name = 'FinanceHub'), NULL, 'in_progress', NOW() + INTERVAL '1 day', NULL),
  ('note', 'Meeting notes from RetailMax', 'Key stakeholders identified', (SELECT id FROM contacts WHERE email = 'lisa@retailmax.com'), NULL, NULL, 'completed', NULL, NOW() - INTERVAL '1 day');
