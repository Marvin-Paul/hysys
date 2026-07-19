import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarCheck, ArrowLeft, Send, CheckCircle, Loader2 } from 'lucide-react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { FormHoneypot } from '../../components/ui/FormHoneypot';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { MARMIDON_MODULES, MARMIDON_SECTORS, resolveModuleSlug, resolveSectorSlug } from '../../lib/marmidonCatalog';
import { trackEvent } from '../../lib/analytics/track';
import { submitLead } from '../../lib/forms/leadSubmission';

export function DemoRequestPage() {
  const [searchParams] = useSearchParams();
  const preModule = resolveModuleSlug(searchParams.get('module') ?? '');
  const preSector = resolveSectorSlug(searchParams.get('sector') ?? '');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const content = useSiteContent('demo_request');

  useEffect(() => {
    if (preModule && MARMIDON_MODULES.some((m) => m.slug === preModule)) {
      setSelectedModules((prev) => (prev.includes(preModule) ? prev : [...prev, preModule]));
    }
  }, [preModule]);

  const toggleModule = (slug: string) => {
    setSelectedModules((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const modules = selectedModules.length
      ? selectedModules
      : MARMIDON_MODULES.filter((m) => data.get(`module-${m.slug}`)).map((m) => m.slug);

    if (modules.length === 0) {
      setError('Please select at least one module of interest.');
      setSending(false);
      return;
    }

    const sectorSlug = String(data.get('industry') ?? preSector ?? '');
    const message = String(data.get('message') ?? '').trim()
      || `Demo request for modules: ${modules.join(', ')}${sectorSlug ? `; industry: ${sectorSlug}` : ''}`;

    const result = await submitLead({
      formType: 'demo',
      firstName: String(data.get('firstName')),
      lastName: String(data.get('lastName')),
      email: String(data.get('email')),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company')),
      message,
      modulesInterest: modules,
      sectorSlug: sectorSlug || undefined,
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
        <SEO title="Demo Requested" />
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="mt-6 text-2xl font-bold text-slate-900">{content.getContent('success_title', 'Demo request received')}</h1>
          <p className="mt-3 text-slate-600">{content.getContent('success_desc', 'A member of our team will contact you within 24 hours to schedule your personalised demo.')}</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {content.getContent('success_back_label', 'Back to home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.demo.title} description={PAGE_META.demo.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Request a Demo' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <CalendarCheck className="w-4 h-4" /> {content.getContent('demo_hero_badge', 'Demo')}
          </span>
        }
        title={content.getContent('demo_title', 'Request a personalised demo')}
        description={content.getContent('demo_desc', 'See how Marmidon ERP fits your organisation. Our team will tailor a demo to your modules and industry.')}
      />

      <section className="page-section page-section--white">
        <div className="page-container page-container--reading">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}
          <form onSubmit={handleSubmit} onFocus={() => trackEvent('lead_form_start', { form_name: 'request_a_demo' })} className="relative space-y-6">
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
              <label htmlFor="phone" className="form-label">{content.getContent('form_phone_label', 'Phone number')}</label>
              <input id="phone" name="phone" type="tel" className="form-control" />
            </div>
            <div>
              <span className="form-label">{content.getContent('form_modules_label', 'Modules of interest *')}</span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MARMIDON_MODULES.map((m) => (
                  <label key={m.slug} className="flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] border border-slate-200 px-3 py-2 text-sm cursor-pointer hover:border-[var(--color-primary)] has-checked:border-[var(--color-primary)] has-checked:bg-[var(--color-primary)]/5">
                    <input
                      type="checkbox"
                      name={`module-${m.slug}`}
                      checked={selectedModules.includes(m.slug)}
                      onChange={() => toggleModule(m.slug)}
                      className="rounded accent-[var(--color-primary)]"
                    />
                    {m.shortName}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="industry" className="form-label">{content.getContent('form_industry_label', 'Industry')}</label>
              <select id="industry" name="industry" defaultValue={preSector && MARMIDON_SECTORS.some((s) => s.slug === preSector) ? preSector : ''} className="form-control">
                <option value="">Select your industry</option>
                {MARMIDON_SECTORS.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="form-label">{content.getContent('form_message_label', 'Tell us about your needs')}</label>
              <textarea id="message" name="message" rows={4} className="form-control form-control--textarea" />
            </div>
            <button type="submit" disabled={sending} className="btn-marmidon btn-marmidon--primary w-full">
              {sending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {content.getContent('form_submitting_label', 'Submitting…')}</>
              ) : (
                <><Send className="w-4 h-4" /> {content.getContent('form_submit_label', 'Request a Demo')}</>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
