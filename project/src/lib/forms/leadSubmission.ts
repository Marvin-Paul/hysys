import { supabase } from '../db/supabase';
import { trackEvent, type AnalyticsEvent } from '../analytics/track';

export type LeadFormType = 'contact' | 'demo' | 'partner';

export interface LeadSubmissionPayload {
  formType: LeadFormType;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  interest?: string;
  modulesInterest?: string[];
  sectorSlug?: string;
  website?: string;
  honeypot?: string;
}

const FORM_SUBMIT_EMAIL = 'info@marmidon.com';

const ANALYTICS_BY_FORM: Record<LeadFormType, AnalyticsEvent> = {
  contact: 'contact_submit',
  demo: 'demo_request_submit',
  partner: 'contact_submit',
};

export async function submitLead(
  payload: LeadSubmissionPayload
): Promise<{ ok: boolean; error?: string }> {
  if (payload.honeypot?.trim()) {
    return { ok: true };
  }

  const subjectByType: Record<LeadFormType, string> = {
    contact: 'New contact form submission from Marmidon website',
    demo: 'New demo request from Marmidon website',
    partner: 'New partner application from Marmidon website',
  };

  const formBody = new URLSearchParams({
    _subject: subjectByType[payload.formType],
    name: `${payload.firstName} ${payload.lastName}`.trim(),
    email: payload.email,
    phone: payload.phone ?? '',
    company: payload.company ?? '',
    jobTitle: payload.jobTitle ?? '',
    interest: payload.interest ?? '',
    formType: payload.formType,
    modules: payload.modulesInterest?.join(', ') ?? '',
    sector: payload.sectorSlug ?? '',
    website: payload.website ?? '',
    message: payload.message,
  });

  if (!supabase) {
    return { ok: false, error: 'Form storage is not configured. Please contact us directly.' };
  }

  const { error: dbError } = await supabase.from('contact_submissions').insert({
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    phone: payload.phone ?? null,
    company: payload.company ?? null,
    job_title: payload.jobTitle ?? null,
    interest: payload.interest ?? null,
    message: payload.message,
    form_type: payload.formType,
    modules_interest: payload.modulesInterest?.length ? payload.modulesInterest.join(', ') : null,
    sector_slug: payload.sectorSlug ?? null,
    website: payload.website ?? null,
  });

  if (dbError) {
    console.error('contact_submissions insert failed:', dbError);
    return { ok: false, error: `Failed to save your request. Please email us at ${FORM_SUBMIT_EMAIL}.` };
  }

  // Email notification is best-effort; admin inbox is Supabase submissions.
  fetch(`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`, {
    method: 'POST',
    body: formBody,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).catch(() => {
    /* non-blocking */
  });

  trackEvent(ANALYTICS_BY_FORM[payload.formType], {
    form_name: payload.formType,
    ...(payload.sectorSlug ? { sector_slug: payload.sectorSlug } : {}),
    ...(payload.modulesInterest?.length ? { modules: payload.modulesInterest.join(',') } : {}),
  });

  return { ok: true };
}
