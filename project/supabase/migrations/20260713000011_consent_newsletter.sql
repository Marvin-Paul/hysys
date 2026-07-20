-- Add consent_given to contact_submissions (CPM-005 §7.4, TSR-004 §8)
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN DEFAULT false;

COMMENT ON COLUMN public.contact_submissions.consent_given IS 'User agreed to privacy policy on submit';

-- Create newsletter_subscriptions table (FR-RES-05)
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.newsletter_subscriptions IS 'Newsletter email signups';

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Admins can view subscriptions
CREATE POLICY "Admins can view subscriptions"
  ON public.newsletter_subscriptions
  FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );
