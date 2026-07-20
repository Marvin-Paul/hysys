-- Product polish labels for CMS Content Manager

INSERT INTO site_content (section, content_key, content_value) VALUES
  ('global', 'page_eyebrow', '"Marmidon Global Solutions Limited"'::jsonb),
  ('global', 'page_subtitle_suffix', '"by Marmidon"'::jsonb),
  ('global', 'card_footer_label', '"Learn more"'::jsonb),
  ('products', 'products_hero_cta_primary', '"Start Free Trial"'::jsonb),
  ('products', 'products_hero_cta_secondary', '"Contact Sales"'::jsonb),
  ('products', 'spotlight_featured_label', '"Featured product"'::jsonb),
  ('products', 'detail_hero_secondary_cta', '"View all products"'::jsonb),
  ('industries', 'industries_hero_cta_primary', '"Contact Sales"'::jsonb),
  ('industries', 'industries_hero_cta_secondary', '"Explore Industries"'::jsonb),
  ('industries', 'industries_list_cta_secondary', '"Start Free Trial"'::jsonb),
  ('industries', 'detail_hero_primary_cta', '"Get Industry Solution"'::jsonb),
  ('industries', 'detail_hero_secondary_cta', '"Contact Sales"'::jsonb),
  ('homepage', 'explore_all_products_label', '"Explore all products"'::jsonb),
  ('homepage', 'homepage_industries_link_label', '"Learn more"'::jsonb),
  ('homepage', 'homepage_industries_cta', '"Explore all industries"'::jsonb),
  ('homepage', 'ai_success_card_link_label', '"Learn more"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
