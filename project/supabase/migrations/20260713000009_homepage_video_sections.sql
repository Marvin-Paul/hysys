-- Marmidon homepage video sections: real YouTube URLs and ERP copy (replaces Salesforce placeholders)

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('homepage', 'ai_business_title', '"Real-time visibility across every department"'),
  ('homepage', 'ai_business_desc', '"Marmidon ERP connects finance, inventory, sales, and operations on one platform — giving leaders dashboards and reports they can trust without exporting spreadsheets."'),
  ('homepage', 'ai_business_video_url', '"https://www.youtube.com/watch?v=RLn756ttsrg"'),
  ('homepage', 'ai_business_cta_primary', '"Request a Demo"'),
  ('homepage', 'ai_business_cta_secondary', '"Watch overview"'),
  ('homepage', 'customer_proof_video_url', '"https://www.youtube.com/watch?v=DMv_LuaCm48"'),
  ('homepage', 'agentforce_cta_secondary', '"Watch customer demo"'),
  ('homepage', 'video_url', '"https://www.youtube.com/watch?v=RLn756ttsrg"')
ON CONFLICT (section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
