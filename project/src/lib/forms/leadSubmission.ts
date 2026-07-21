import { supabase } from '../db/supabase';
import { trackEvent, type AnalyticsEvent } from '../analytics/track';
import { getUtmForForm } from '../analytics/utmCapture';
import { checkRateLimit, getRateLimitRemaining } from './rateLimiter';

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
  challenge?: string;
  turnstileToken?: string;
  consent?: boolean;
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
  // Honeypot check (FR-CONV-03)
  if (payload.honeypot?.trim()) {
    return { ok: true };
  }

  // Timing challenge check (TSR-004 §5.3, §8.1)
  if (payload.challenge !== 'verified') {
    return { ok: true };
  }

  // Turnstile CAPTCHA check (TSR-004 §5.3, §8.1)
  if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !payload.turnstileToken) {
    return { ok: false, error: 'Please complete the security check.' };
  }

  // Consent check (CPM-005 §7.4, TSR-004 §8)
  if (!payload.consent) {
    return { ok: false, error: 'You must agree to the privacy policy to submit this form.' };
  }

  // Client-side rate limit (TSR-004 §5.3)
  if (!checkRateLimit(payload.formType, 3, 60_000)) {
    const remaining = getRateLimitRemaining(payload.formType, 60_000);
    const secs = Math.ceil(remaining / 1000);
    return { ok: false, error: `You can submit this form again in ${secs} seconds.` };
  }

  const subjectByType: Record<LeadFormType, string> = {
    contact: 'New contact form submission from Marmidon website',
    demo: 'New demo request from Marmidon website',
    partner: 'New partner application from Marmidon website',
  };

  const utmParams = getUtmForForm();

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
    ...utmParams,
  });

  if (!supabase) {
    return { ok: false, error: 'Form storage is not configured. Please contact us directly.' };
  }

  // Server-side rate check — same email within 5 min (TSR-004 §5.3)
  const fiveMinAgo = new Date(Date.now() - 300_000).toISOString();
  const { count: recentCount, error: countError } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('email', payload.email)
    .eq('form_type', payload.formType)
    .gte('created_at', fiveMinAgo);

  if (!countError && recentCount && recentCount >= 2) {
    return { ok: false, error: 'You have already submitted this form recently. Please try again later.' };
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
    consent_given: payload.consent ?? false,
    utm_source: utmParams.utm_source ?? null,
    utm_medium: utmParams.utm_medium ?? null,
    utm_campaign: utmParams.utm_campaign ?? null,
    utm_term: utmParams.utm_term ?? null,
    utm_content: utmParams.utm_content ?? null,
  });

  if (dbError) {
    console.error('contact_submissions insert failed:', dbError);
    return { ok: false, error: `Failed to save your request. Please email us at ${FORM_SUBMIT_EMAIL}.` };
  }

  // Admin email notification via formsubmit.co
  fetch(`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`, {
    method: 'POST',
    body: formBody,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).catch(() => {
    /* non-blocking */
  });

  // Autoresponder — confirmation email to the user (TSR-004 §8.1)
  const autoBody = new URLSearchParams({
    _subject: `Thank you for contacting Marmidon`,
    _autoresponse: `Hello ${payload.firstName},\n\nThank you for reaching out to Marmidon Enterprise Software.\n\n${
      payload.formType === 'demo'
        ? 'We have received your demo request. A member of our team will contact you within 24 hours to schedule a personalised demonstration tailored to your modules and industry.'
        : 'We have received your message. Our team will get back to you within one business day.'
    }\n\nIn the meantime, feel free to explore our resources at https://www.marmidon.com/resources\n\nBest regards,\nThe Marmidon Team`,
    email: payload.email,
    name: `${payload.firstName} ${payload.lastName}`.trim(),
  });

  fetch(`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`, {
    method: 'POST',
    body: autoBody,
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
