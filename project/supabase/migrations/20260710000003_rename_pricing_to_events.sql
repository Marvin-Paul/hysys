-- Rename pricing CMS section to events; remove learning section entirely

UPDATE public.site_content SET section = 'events' WHERE section = 'pricing';

UPDATE public.site_content SET content_key = 'eventsTitle'
WHERE section = 'events' AND content_key = 'pricingTitle';

UPDATE public.site_content SET content_key = 'eventsDesc'
WHERE section = 'events' AND content_key = 'pricingDesc';

DELETE FROM public.site_content WHERE section = 'learning';
DELETE FROM public.site_content WHERE content_key = 'pricing_plans';

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('events', 'eventsTitle', '"Events & Experiences"'::jsonb),
  ('events', 'eventsDesc', '"Participate in live summits, workshops, and partner forums designed to help your organisation grow with HYSYS."'::jsonb),
  ('events', 'events_section_title', '"Learn, network, and lead change"'::jsonb),
  ('events', 'events_section_desc', '"Experience HYSYS events tailored for customers, partners, and IT teams."'::jsonb),
  ('events', 'events_list', '[
    {"id":"summit","date":"June 12, 2026","title":"HYSYS Global Summit","description":"Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.","highlight":"Live keynotes + panel discussions"},
    {"id":"forum","date":"September 4, 2026","title":"Customer Success Forum","description":"Explore customer stories, best practices, and success strategies for CRM and AI-powered operations.","highlight":"Case study deep dives"},
    {"id":"workshop","date":"November 18, 2026","title":"Cloud Transformation Workshop","description":"Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.","highlight":"Architecture and security workshops"}
  ]'::jsonb)
ON CONFLICT (section, content_key) DO NOTHING;
