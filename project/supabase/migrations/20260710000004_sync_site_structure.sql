-- Sync site_content with current site structure (Jul 2026)
-- Removed: Solutions section, Learning section, Pricing plans
-- Added/updated: Events (from Pricing), Support/Contact copy, Documentation seed

-- ── 1. Remove retired sections (idempotent) ─────────────────────────────────

DELETE FROM public.content_versions
WHERE section IN ('solutions', 'learning', 'pricing');

DELETE FROM public.site_content
WHERE section IN ('solutions', 'learning');

DELETE FROM public.site_content
WHERE section = 'pricing';

DELETE FROM public.site_content
WHERE content_key IN (
  'solutions_list',
  'learning_items',
  'trails',
  'pricing_plans',
  'pricingTitle',
  'pricingDesc'
);

-- ── 2. Ensure pricing rows were migrated to events (safe if already done) ───

UPDATE public.site_content SET section = 'events' WHERE section = 'pricing';

UPDATE public.site_content SET content_key = 'eventsTitle'
WHERE section = 'events' AND content_key = 'pricingTitle';

UPDATE public.site_content SET content_key = 'eventsDesc'
WHERE section = 'events' AND content_key = 'pricingDesc';

-- ── 3. Events section — current page content ────────────────────────────────

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('events', 'eventsTitle', '"Events & Experiences"'::jsonb),
  ('events', 'eventsDesc', '"Participate in live summits, workshops, and partner forums designed to help your organisation grow with Marmidon."'::jsonb),
  ('events', 'events_section_title', '"Learn, network, and lead change"'::jsonb),
  ('events', 'events_section_desc', '"Experience Marmidon events tailored for customers, partners, and IT teams who want to modernize faster."'::jsonb),
  ('events', 'events_list', '[
    {"id":"summit","date":"June 12, 2026","title":"Marmidon Global Summit","description":"Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.","highlight":"Live keynotes + panel discussions"},
    {"id":"forum","date":"September 4, 2026","title":"Customer Success Forum","description":"Explore customer stories, best practices, and success strategies for CRM and AI-powered operations.","highlight":"Case study deep dives"},
    {"id":"workshop","date":"November 18, 2026","title":"Cloud Transformation Workshop","description":"Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.","highlight":"Architecture and security workshops"}
  ]'::jsonb),
  ('events', 'faqs', '[
    {"question":"Who should attend?","answer":"IT leaders, operations teams, customer success managers, and anyone evaluating digital transformation solutions."},
    {"question":"How do I register?","answer":"Click the registration button or contact our team to reserve your place and ask about group registration."},
    {"question":"Can I attend remotely?","answer":"Yes — most events include virtual sessions, live Q&A, and on-demand recordings."},
    {"question":"What will I learn?","answer":"You will learn how to use Marmidon to improve customer experience, automate workflows, and scale with confidence."}
  ]'::jsonb),
  ('events', 'cta_title', '"Reserve your seat"'::jsonb),
  ('events', 'cta_desc', '"Spaces are limited for our flagship events. Contact our team to register early."'::jsonb),
  ('events', 'cta_button', '"Contact Events Team"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE
SET content_value = EXCLUDED.content_value,
    updated_at = now();

-- ── 4. Contact / Support section — nav Support links here ─────────────────

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('contact', 'contactTitle', '"Support & Contact"'::jsonb),
  ('contact', 'contactDesc', '"Find help, documentation, and direct access to our support team for every product and request."'::jsonb),
  ('contact', 'hero_title', '"Support & Contact"'::jsonb),
  ('contact', 'hero_desc', '"Find help, documentation, and direct access to our support team for every product and request."'::jsonb),
  ('contact', 'getInTouch', '"Get in Touch"'::jsonb),
  ('contact', 'sendUsMessage', '"Send Us a Message"'::jsonb),
  ('contact', 'phone_numbers', '"0782-602854\n0752-602857\n0757-602854\nMon–Fri 8am–6pm EAT"'::jsonb),
  ('contact', 'email_address', '"info@hysysglobal.com"'::jsonb),
  ('contact', 'office_address', '"Plot 19 Sir Albert Cook Road, Mengo — Kampala\nP.O. Box 16435 K''la"'::jsonb),
  ('contact', 'business_hours', '"Mon–Fri: 8:00 AM – 6:00 PM EAT\nSat: 9:00 AM – 1:00 PM EAT"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE
SET content_value = EXCLUDED.content_value,
    updated_at = now();

-- ── 5. Documentation section (standalone /documentation route) ─────────────

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('documentation', 'hero_title', '"Product Documentation"'::jsonb),
  ('documentation', 'hero_desc', '"Browse technical guides, setup instructions, and best practices for every Marmidon product."'::jsonb),
  ('documentation', 'cta_title', '"Need help finding something?"'::jsonb),
  ('documentation', 'cta_desc', '"Our support team can provide detailed documentation and guided assistance."'::jsonb),
  ('documentation', 'cta_button', '"Contact Support"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE
SET content_value = EXCLUDED.content_value,
    updated_at = now();

-- ── 6. Global footer / support keys ─────────────────────────────────────────

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('global', 'footer_tagline', '"Empowering businesses with intelligent CRM solutions."'::jsonb),
  ('global', 'support_email', '"support@hysysglobal.com"'::jsonb),
  ('global', 'support_phone', '"0782-602854"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE
SET content_value = EXCLUDED.content_value,
    updated_at = now();
