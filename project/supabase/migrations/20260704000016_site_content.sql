-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 016: Create site_content table for CMS
-- Admin-editable content for all marketing pages
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value JSONB NOT NULL DEFAULT '""'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(section, content_key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert site content"
  ON public.site_content
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can update site content"
  ON public.site_content
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can delete site content"
  ON public.site_content
  FOR DELETE
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE OR REPLACE FUNCTION public.update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_site_content_timestamp
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_content_timestamp();

-- Seed default content for all marketing pages
INSERT INTO public.site_content (section, content_key, content_value) VALUES
  -- Homepage
  ('homepage', 'hero_title', '"AI-Powered CRM That Transforms Your Business"'),
  ('homepage', 'hero_subtitle', '"From lead management to customer success — Marmidon delivers enterprise-grade ERP with intelligent automation, real-time analytics, and seamless integrations."'),
  ('homepage', 'hero_cta', '"Get Started Free"'),
  ('homepage', 'hero_cta_secondary', '"Watch Demo"'),
  ('homepage', 'stats_companies', '"150K+"'),
  ('homepage', 'stats_companies_label', '"Companies Trust Us"'),
  ('homepage', 'stats_users', '"40M+"'),
  ('homepage', 'stats_users_label', '"Active Users"'),
  ('homepage', 'stats_countries', '"60+"'),
  ('homepage', 'stats_countries_label', '"Countries"'),
  ('homepage', 'stats_integrations', '"200+"'),
  ('homepage', 'stats_integrations_label', '"Integrations"'),
  
  -- About
  ('about', 'hero_title', '"About Marmidon Global Solutions"'),
  ('about', 'hero_desc', '"Empowering businesses with intelligent CRM solutions since 2010."'),
  ('about', 'mission_title', '"Our Mission"'),
  ('about', 'mission_text_1', '"To democratize enterprise-grade CRM technology, making it accessible and affordable for businesses of all sizes across the globe."'),
  ('about', 'mission_text_2', '"We believe every business deserves powerful tools to manage customer relationships, drive sales, and deliver exceptional service — without the complexity and cost of traditional enterprise software."'),
  ('about', 'stats_badge', '"Companies trust Marmidon Global Solutions Limited"'),
  ('about', 'values_title', '"Our Values"'),
  ('about', 'leadership_title', '"Leadership Team"'),
  ('about', 'journey_title', '"Our Journey"'),
  ('about', 'cta_title', '"Join Our Team"'),
  ('about', 'cta_desc', '"Help us shape the future of CRM. We are looking for passionate people to join our growing global team."'),
  ('about', 'cta_button', '"View Open Positions"'),
  
  -- Products
  ('products', 'hero_title', '"Our Products"'),
  ('products', 'hero_desc', '"Discover the full Marmidon ecosystem — from ERP fundamentals to AI-powered analytics."'),
  ('products', 'cta_title', '"Ready to Transform Your Business?"'),
  ('products', 'cta_desc', '"Get started with Marmidon today and see why thousands of companies trust our platform."'),
  ('products', 'cta_button', '"Start Free Trial"'),

  -- Solutions
  ('solutions', 'hero_title', '"Solutions for Every Challenge"'),
  ('solutions', 'hero_desc', '"Tailored approaches to transform your sales, service, and marketing operations."'),
  ('solutions', 'cta_title', '"Need a Custom Solution?"'),
  ('solutions', 'cta_desc', '"Our team of experts can design a solution tailored to your specific business needs."'),
  ('solutions', 'cta_button', '"Contact Us"'),

  -- Industries
  ('industries', 'hero_title', '"Industries We Serve"'),
  ('industries', 'hero_desc', '"Specialized CRM solutions designed for the unique challenges of your industry."'),

  -- Pricing
  ('pricing', 'hero_title', '"Simple, Transparent Pricing"'),
  ('pricing', 'hero_desc', '"Choose the plan that fits your business. Upgrade or downgrade at any time."'),
  ('pricing', 'cta_title', '"Need a Custom Plan?"'),
  ('pricing', 'cta_desc', '"Contact our sales team for enterprise pricing and custom requirements."'),
  ('pricing', 'cta_button', '"Contact Sales"'),

  -- Contact
  ('contact', 'hero_title', '"Get In Touch"'),
  ('contact', 'hero_desc', '"Have a question, feedback, or want to learn more? We would love to hear from you."'),

  -- Learning
  ('learning', 'hero_title', '"Learn & Grow"'),
  ('learning', 'hero_desc', '"Master Marmidon with our comprehensive library of guides, tutorials, and best practices."'),

  -- Customer Stories
  ('stories', 'hero_title', '"Customer Success Stories"'),
  ('stories', 'hero_desc', '"See how businesses like yours achieve remarkable results with Marmidon."'),
  ('stories', 'cta_title', '"Share Your Story"'),
  ('stories', 'cta_desc', '"We love hearing from our customers. Share how Marmidon has helped your business grow."'),
  ('stories', 'cta_button', '"Submit Your Story"')
ON CONFLICT (section, content_key) DO NOTHING;
