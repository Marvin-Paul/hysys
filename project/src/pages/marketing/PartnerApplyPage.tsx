import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { FormHoneypot } from '../../components/ui/FormHoneypot';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { trackEvent } from '../../lib/analytics/track';
import { submitLead } from '../../lib/forms/leadSubmission';
import { useSiteContent } from '../../hooks/useSiteContent';

export function PartnerApplyPage() {
  const content = useSiteContent('partner_apply');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const program = String(data.get('program'));

    const result = await submitLead({
      formType: 'partner',
      firstName: String(data.get('firstName')),
      lastName: String(data.get('lastName')),
      email: String(data.get('email')),
      company: String(data.get('company')),
      website: String(data.get('website') ?? ''),
      interest: program,
      message: String(data.get('message')),
      honeypot: String(data.get('website_url') ?? ''),
    });

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error ?? 'Failed to submit. Please try again.');
    }
    setSending(false);
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <SEO title="Application Submitted" description="Your Marmidon partner application has been received." />
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="mt-6 text-2xl font-bold text-slate-900">{content.getContent('success_title', 'Application submitted')}</h1>
          <p className="mt-3 text-slate-600">{content.getContent('success_desc', 'Thank you for your interest in partnering with Marmidon. Our partnerships team will review your application and get back to you within 5 business days.')}</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {content.getContent('success_back_label', 'Back to home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.partnerApply.title} description={PAGE_META.partnerApply.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Partners', path: '/partners' }, { label: 'Apply' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {content.getContent('apply_hero_badge', 'Partner Application')}
          </span>
        }
        title={content.getContent('apply_title', 'Become a Marmidon partner')}
        description={content.getContent('apply_desc', 'Fill out the form below and our partnerships team will reach out within 5 business days.')}
      />

      <section className="page-section page-section--white">
        <div className="page-container page-container--reading">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}
          <form onSubmit={handleSubmit} onFocus={() => trackEvent('lead_form_start', { form_name: 'partner_apply' })} className="relative space-y-6">
            <FormHoneypot />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="form-label">{content.getContent('form_first_name_label', 'First name *')}</label>
                <input id="firstName" name="firstName" required className="form-control" />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">{content.getContent('form_last_name_label', 'Last name *')}</label>
                <input id="lastName" name="lastName" required className="form-control" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="form-label">{content.getContent('form_email_label', 'Work email *')}</label>
              <input id="email" name="email" type="email" required className="form-control" />
            </div>
            <div>
              <label htmlFor="company" className="form-label">{content.getContent('form_company_label', 'Company name *')}</label>
              <input id="company" name="company" required className="form-control" />
            </div>
            <div>
              <label htmlFor="website" className="form-label">{content.getContent('form_website_label', 'Company website')}</label>
              <input id="website" name="website" type="url" className="form-control" />
            </div>
            <div>
              <label htmlFor="program" className="form-label">{content.getContent('form_program_label', 'Partner programme *')}</label>
              <select id="program" name="program" required className="form-control">
                <option value="">Select a programme</option>
                <option value="consulting">Consulting Partner</option>
                <option value="technology">Technology Partner</option>
                <option value="reseller">Reseller Partner</option>
                <option value="isv">ISV Partner</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="form-label">{content.getContent('form_message_label', 'Tell us about your business *')}</label>
              <textarea id="message" name="message" rows={4} required className="form-control form-control--textarea" />
            </div>
            <button type="submit" disabled={sending} className="btn-marmidon btn-marmidon--primary w-full">
              {sending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {content.getContent('form_submitting_label', 'Submitting…')}</>
              ) : (
                <><Send className="w-4 h-4" /> {content.getContent('form_submit_label', 'Submit application')}</>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
