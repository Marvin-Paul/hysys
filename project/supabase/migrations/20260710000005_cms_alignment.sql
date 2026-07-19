-- CMS alignment: stories stats, contact sidebar, events highlights, documentation categories

INSERT INTO site_content (section, content_key, content_value) VALUES
  ('stories', 'featured_section_title', '"Trusted by industry leaders"'::jsonb),
  ('stories', 'featured_section_desc', '"See how organisations like yours are achieving remarkable results with HYSYS."'::jsonb),
  ('stories', 'stories_stats', '[
    {"id":"customers","value":"150K+","label":"Customers worldwide","iconName":"Users"},
    {"id":"productivity","value":"35%","label":"Avg. productivity boost","iconName":"TrendingUp"},
    {"id":"rating","value":"4.8★","label":"Average customer rating","iconName":"Star"},
    {"id":"retention","value":"99.9%","label":"Customer retention rate","iconName":"Shield"}
  ]'::jsonb),
  ('contact', 'sidebar_title', '"Ready to transform your business?"'::jsonb),
  ('contact', 'sidebar_desc', '"Fill in the form and our team will get back to you within 24 hours. Or reach us directly using the contacts below."'::jsonb),
  ('contact', 'trial_title', '"Free 14-Day Trial"'::jsonb),
  ('contact', 'trial_desc', '"No credit card needed. Full platform access from day one."'::jsonb),
  ('contact', 'trial_button', '"Get Started"'::jsonb),
  ('events', 'events_highlights_title', '"Why attend HYSYS events?"'::jsonb),
  ('events', 'faq_section_title', '"Everything you need to know"'::jsonb),
  ('events', 'events_highlights', '[
    {"id":"roadmaps","text":"Discover product roadmaps and feature plans directly from our team."},
    {"id":"practices","text":"Learn best practices for CRM, automation, and digital transformation."},
    {"id":"network","text":"Connect with peers, partners, and solution experts."},
    {"id":"deploy","text":"Get actionable guidance for secure deployments and scaling."}
  ]'::jsonb),
  ('events', 'cta_desc', '"Spaces are limited for our flagship events. Reserve early to ensure your team gets the best experience and dedicated time with our experts."'::jsonb),
  ('documentation', 'hero_badge', '"Documentation"'::jsonb),
  ('documentation', 'hero_subtitle', '"Guides & tutorials"'::jsonb),
  ('documentation', 'hero_cta', '"Contact Support"'::jsonb),
  ('documentation', 'hero_cta_secondary', '"Start Free Trial"'::jsonb),
  ('documentation', 'search_placeholder', '"Search documentation..."'::jsonb),
  ('documentation', 'doc_categories', '[
    {"id":"getting-started","title":"Getting Started","description":"Quick-start guides, account setup, and first steps with HYSYS CRM.","iconName":"Sparkles","articles":"Platform overview, Creating your first account, Importing contacts, Setting up your pipeline"},
    {"id":"products","title":"Products","description":"Documentation for Sales Cloud, Service Cloud, Marketing Cloud, and more.","iconName":"FileText","articles":"Sales Cloud user guide, Service Cloud case management, Marketing Cloud campaigns, Data Cloud setup"},
    {"id":"administration","title":"Administration","description":"User management, security settings, and platform configuration.","iconName":"BookOpen","articles":"User roles and permissions, Security best practices, Custom fields and objects, Integration setup"},
    {"id":"video-tutorials","title":"Video Tutorials","description":"Step-by-step video walkthroughs for common tasks and workflows.","iconName":"Video","articles":"Dashboard walkthrough, Building automations, Creating reports, Mobile app setup"}
  ]'::jsonb),
  ('products', 'cta_title', '"Ready to get started?"'::jsonb),
  ('products', 'cta_desc', '"Try any HYSYS product free for 14 days. No credit card required."'::jsonb),
  ('products', 'cta_button', '"Start Free Trial"'::jsonb),
  ('industries', 'cta_title', '"Don''t see your industry?"'::jsonb),
  ('industries', 'cta_desc', '"HYSYS adapts to any sector. Talk to our team for a custom solution."'::jsonb),
  ('industries', 'cta_button', '"Contact Sales"'::jsonb)
ON CONFLICT (section, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
