-- Align legacy CMS stat keys with Marmidon homepage stats (Content Manager ↔ live site)

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_modules', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_companies'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_modules_label', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_companies_label'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_sectors', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_users'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_sectors_label', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_users_label'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_platform', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_countries'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value)
SELECT 'homepage', 'stats_platform_label', content_value
FROM public.site_content
WHERE section = 'homepage' AND content_key = 'stats_countries_label'
ON CONFLICT (section, content_key) DO NOTHING;

INSERT INTO public.site_content (section, content_key, content_value) VALUES
  ('products', 'detail_hero_primary_cta', '"Request a Demo"')
ON CONFLICT (section, content_key) DO NOTHING;
