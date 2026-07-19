CREATE TABLE IF NOT EXISTS public.design_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.design_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read design settings"
  ON public.design_settings FOR SELECT USING (true);

CREATE POLICY "Admins can insert design settings"
  ON public.design_settings FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can update design settings"
  ON public.design_settings FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete design settings"
  ON public.design_settings FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE OR REPLACE FUNCTION public.update_design_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_design_settings_timestamp
  BEFORE UPDATE ON public.design_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_design_settings_timestamp();

INSERT INTO public.design_settings (setting_key, setting_value) VALUES
('theme', jsonb_build_object(
  'colors', jsonb_build_object(
    'primary', '#0b5394',
    'secondary', '#032d60',
    'accent', '#00a3e0',
    'background', '#ffffff',
    'card', '#f8fafc',
    'nav', '#032d60',
    'footer', '#032d60',
    'text', '#111827',
    'textMuted', '#6b7280',
    'border', '#e5e7eb'
  ),
  'typography', jsonb_build_object(
    'fontFamily', 'Inter, system-ui, sans-serif',
    'headingH1', 48,
    'headingH2', 36,
    'headingH3', 24,
    'headingH4', 20,
    'bodySize', 16,
    'fontWeightHeading', '700',
    'fontWeightBody', '400',
    'lineSpacing', 1.6
  ),
  'buttons', jsonb_build_object(
    'borderRadius', 8,
    'style', 'filled',
    'hoverEffect', 'lift',
    'shadow', '0 1px 3px rgba(0,0,0,0.12)',
    'paddingX', 24,
    'paddingY', 12
  ),
  'cards', jsonb_build_object(
    'borderRadius', 12,
    'shadow', '0 1px 3px rgba(0,0,0,0.08)',
    'border', '1px solid #e5e7eb',
    'hoverAnimation', 'lift',
    'spacing', 24
  ),
  'layout', jsonb_build_object(
    'containerWidth', 1200,
    'pageSpacing', 80,
    'gridGap', 32,
    'sectionSpacing', 96
  ),
  'navigation', jsonb_build_object(
    'sticky', true,
    'transparent', false,
    'logoSize', 80,
    'height', 72
  ),
  'animations', jsonb_build_object(
    'enabled', true,
    'speed', 'normal',
    'scrollEffects', true,
    'hoverEffects', true
  )
))
ON CONFLICT (setting_key) DO NOTHING;
