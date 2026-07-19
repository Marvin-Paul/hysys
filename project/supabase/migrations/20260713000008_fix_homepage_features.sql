-- Replace legacy Salesforce-style homepage features with Marmidon ERP highlights

UPDATE public.site_content
SET content_value = '[
  {"id":"integrated","title":"Fully integrated","description":"Eleven modules on one database — finance, inventory, sales, and operations stay in sync without duplicate entry.","iconName":"Zap"},
  {"id":"sectors","title":"Sector-fit configurations","description":"Preconfigured workflows for manufacturing, retail, healthcare, construction, and eight more industries.","iconName":"Globe"},
  {"id":"security","title":"Enterprise security","description":"Role-based access, audit trails, and compliance controls built for regulated and growing businesses.","iconName":"Shield"},
  {"id":"support","title":"Proven & supported","description":"Local implementation, training, and ongoing support from the Marmidon team across Africa and beyond.","iconName":"Award"}
]'::jsonb
WHERE section = 'homepage' AND content_key = 'features';
