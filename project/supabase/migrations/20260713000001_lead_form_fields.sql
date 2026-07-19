-- Extend contact_submissions for demo and partner lead forms (Doc 1 PRD)

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS form_type TEXT DEFAULT 'contact',
  ADD COLUMN IF NOT EXISTS modules_interest TEXT,
  ADD COLUMN IF NOT EXISTS sector_slug TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT;

COMMENT ON COLUMN public.contact_submissions.form_type IS 'contact | demo | partner';
COMMENT ON COLUMN public.contact_submissions.modules_interest IS 'Comma-separated module slugs from demo requests';
COMMENT ON COLUMN public.contact_submissions.sector_slug IS 'Industry sector slug from demo or contact forms';
COMMENT ON COLUMN public.contact_submissions.website IS 'Partner applicant company website';
