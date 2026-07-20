-- Replace legacy homepage card sections with Marmidon ERP content + images

UPDATE site_content SET content_value = '"Featured proof from Marmidon customers"'::jsonb
WHERE section = 'homepage' AND content_key = 'analyst_section_title';

UPDATE site_content SET content_value = $json$[
  {"id":"efficiency","tag":"Outcome","title":"35% faster month-end close after unifying finance and inventory","stat1_value":"35%","stat1_label":"faster close","stat2_value":"11","stat2_label":"modules integrated","link":"/products/financials","image":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"},
  {"id":"inventory","tag":"Outcome","title":"Retailers report 32% higher sell-through with connected POS and stock","stat1_value":"32%","stat1_label":"sell-through","stat2_value":"28%","stat2_label":"less shrinkage","link":"/solutions/retail","image":"https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"},
  {"id":"manufacturing","tag":"Outcome","title":"Manufacturers cut planning cycles with integrated production and procurement","stat1_value":"40%","stat1_label":"planning time saved","stat2_value":"25%","stat2_label":"cost visibility","link":"/solutions/manufacturing","image":"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"}
]$json$::jsonb
WHERE section = 'homepage' AND content_key = 'analyst_reports';

UPDATE site_content SET content_value = '"Resources to help you evaluate and implement ERP"'::jsonb
WHERE section = 'homepage' AND content_key = 'ai_success_title';

UPDATE site_content SET content_value = '"Explore"'::jsonb
WHERE section = 'homepage' AND content_key = 'ai_success_card_link_label';

UPDATE site_content SET content_value = $json$[
  {"id":"blog","tag":"Blog","title":"ERP insights & product updates","desc":"Practical guides on finance, inventory, and sector best practices from the Marmidon team.","link":"/resources/blog","image":"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"},
  {"id":"guides","tag":"Guides","title":"Whitepapers & playbooks","desc":"In-depth resources for evaluating and implementing enterprise ERP in your industry.","link":"/resources/guides","image":"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"},
  {"id":"docs","tag":"Documentation","title":"Technical documentation","desc":"Module references, setup guides, and integration notes for your IT team.","link":"/documentation","image":"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"}
]$json$::jsonb
WHERE section = 'homepage' AND content_key = 'ai_success_cards';

UPDATE site_content SET content_value = '"Built on trust, innovation, and customer success"'::jsonb
WHERE section = 'homepage' AND content_key = 'core_values_title';

UPDATE site_content SET content_value = '"Marmidon is committed to helping organisations run better — with secure ERP, local expertise, and long-term partnerships that grow with your business."'::jsonb
WHERE section = 'homepage' AND content_key = 'core_values_desc';

UPDATE site_content SET content_value = '"Our story"'::jsonb
WHERE section = 'homepage' AND content_key = 'core_values_cta_primary';

UPDATE site_content SET content_value = '"Meet the team"'::jsonb
WHERE section = 'homepage' AND content_key = 'core_values_cta_secondary';

UPDATE site_content SET content_value = '["TRUST","CUSTOMER SUCCESS","INNOVATION","INTEGRITY","SUSTAINABILITY"]'::jsonb
WHERE section = 'homepage' AND content_key = 'core_values_tags';
