import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. ' +
    'Auth features will not work until configured.'
  );
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  website: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  employees_count: number | null;
  annual_revenue: number | null;
  description: string | null;
  owner_id: string | null;
  type: string | null;
  rating: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  title: string | null;
  company_id: string | null;
  owner_id: string | null;
  status: 'lead' | 'active' | 'inactive' | 'churned';
  lead_source: string | null;
  lead_score: number;
  value: number;
  notes: string | null;
  department: string | null;
  email_opt_out: boolean;
  do_not_call: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  company?: Company;
}

export interface Deal {
  id: string;
  name: string;
  company_id: string | null;
  contact_id: string | null;
  owner_id: string | null;
  stage: string;
  amount: number;
  probability: number;
  close_date: string | null;
  description: string | null;
  type: string | null;
  next_step: string | null;
  is_closed: boolean;
  is_won: boolean;
  campaign_id: string | null;
  created_at: string;
  updated_at: string;
  company?: Company;
  contact?: Contact;
}

export interface Activity {
  id: string;
  type: string;
  title: string | null;
  description: string | null;
  contact_id: string | null;
  company_id: string | null;
  deal_id: string | null;
  owner_id: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  contact?: Contact;
  company?: Company;
}

export interface SupportTicket {
  id: string;
  ticket_number: string | null;
  subject: string;
  description: string | null;
  user_id: string | null;
  status: string;
  priority: string;
  category: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  case_number: string | null;
  origin: string | null;
  type: string | null;
  contact_id: string | null;
  company_id: string | null;
  is_closed: boolean;
  is_escalated: boolean;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  owner_id: string | null;
  last_run_at: string | null;
  created_at: string;
  updated_at: string;
}

// New Salesforce-like types
export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string;
  company: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  rating: string | null;
  lead_source: string | null;
  industry: string | null;
  is_converted: boolean;
  converted_contact_id: string | null;
  converted_company_id: string | null;
  converted_deal_id: string | null;
  converted_date: string | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  product_code: string | null;
  description: string | null;
  family: string | null;
  active: boolean;
  msrp: number | null;
  unit_price: number | null;
  subscription_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface PriceBook {
  id: string;
  name: string;
  description: string | null;
  is_standard: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  expected_revenue: number | null;
  budgeted_cost: number | null;
  actual_cost: number | null;
  owner_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignMember {
  id: string;
  campaign_id: string;
  lead_id: string | null;
  contact_id: string | null;
  status: string;
  has_responded: boolean;
  first_response_date: string | null;
  response_type: string | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OpportunityContactRole {
  id: string;
  opportunity_id: string;
  contact_id: string;
  role: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  quote_number: string | null;
  name: string;
  opportunity_id: string | null;
  company_id: string;
  contact_id: string | null;
  owner_id: string | null;
  status: string;
  expiration_date: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface QuoteLineItem {
  id: string;
  quote_id: string;
  product_id: string | null;
  product_name: string | null;
  description: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  contract_number: string | null;
  name: string;
  company_id: string;
  contact_id: string | null;
  owner_id: string | null;
  status: string;
  start_date: string;
  end_date: string;
  activation_date: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  name: string;
  serial_number: string | null;
  product_id: string | null;
  company_id: string;
  contact_id: string | null;
  contract_id: string | null;
  status: string;
  purchase_date: string | null;
  install_date: string | null;
  price: number | null;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceContract {
  id: string;
  contract_number: string | null;
  name: string;
  company_id: string;
  contact_id: string | null;
  owner_id: string | null;
  status: string;
  start_date: string;
  end_date: string;
  activation_date: string | null;
  total_cases_allowed: number | null;
  total_cases_used: number;
  created_at: string;
  updated_at: string;
}

export interface Entitlement {
  id: string;
  name: string;
  company_id: string;
  contact_id: string | null;
  service_contract_id: string | null;
  asset_id: string | null;
  owner_id: string | null;
  status: string;
  start_date: string;
  end_date: string;
  cases_per_entitlement: number | null;
  remaining_cases: number | null;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Attachment {
  id: string;
  name: string;
  file_url: string;
  file_size: number | null;
  file_type: string | null;
  parent_id: string;
  parent_type: string;
  description: string | null;
  owner_id: string | null;
  created_at: string;
}

export interface Note {
  id: string;
  title: string | null;
  body: string;
  parent_id: string;
  parent_type: string;
  owner_id: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  content_key: string;
  content_value: unknown;
  updated_at: string;
  updated_by: string | null;
}

export interface OpportunityLineItem {
  id: string;
  opportunity_id: string;
  price_book_entry_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  discount: number;
  service_date: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}
