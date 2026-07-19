-- Detail page bottom CTAs for products and industries

INSERT INTO site_content (section, content_key, content_value) VALUES
  ('products', 'detail_cta_title', '"Ready to get started?"'::jsonb),
  ('products', 'detail_cta_desc', '"Join thousands of companies using {{name}}."'::jsonb),
  ('products', 'detail_cta_button', '"Start Free Trial"'::jsonb),
  ('products', 'detail_cta_secondary', '"View All Products"'::jsonb),
  ('industries', 'detail_cta_title', '"Ready for {{name}}?"'::jsonb),
  ('industries', 'detail_cta_desc', '"Start your free 14-day trial. No credit card required."'::jsonb),
  ('industries', 'detail_cta_button', '"Get Started"'::jsonb),
  ('industries', 'detail_cta_secondary', '"View All Industries"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
