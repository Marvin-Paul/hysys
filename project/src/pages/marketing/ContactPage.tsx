import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, Sparkles, ArrowRight, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { useTranslation } from '../../lib/i18n';
import { useSiteContent } from '../../hooks/useSiteContent';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { trackEvent } from '../../lib/analytics/track';
import { FormHoneypot } from '../../components/ui/FormHoneypot';
import { InvisibleChallenge } from '../../components/ui/InvisibleChallenge';
import { PrivacyConsent } from '../../components/ui/PrivacyConsent';
import { TurnstileWidget } from '../../components/ui/TurnstileWidget';
import { submitLead } from '../../lib/forms/leadSubmission';
import { MARMIDON_MODULES, MARMIDON_SECTORS } from '../../lib/marmidonCatalog';
import { useFieldValidation } from '../../lib/forms/validation';

export function ContactPage() {
  const { t } = useTranslation();
  const content = useSiteContent('contact');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const { errors, validate, markTouched, clearError, ariaProps, reset: resetValidation } = useFieldValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    resetValidation();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get('firstName'));
    const lastName = String(data.get('lastName'));
    const email = String(data.get('email'));
    const phone = String(data.get('phone') ?? '');
    const company = String(data.get('company') ?? '');
    const jobTitle = String(data.get('jobTitle') ?? '');
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message'));

    const valid = validate({
      firstName: { value: firstName, label: 'First name' },
      lastName: { value: lastName, label: 'Last name' },
      email: { value: email, label: 'Email' },
      company: { value: company, label: 'Company name' },
      message: { value: message, label: 'Message' },
    });

    if (!valid) {
      setSending(false);
      return;
    }

    if (!consent) {
      setError('Please agree to the privacy policy to continue.');
      setSending(false);
      return;
    }

    setSending(true);

    const result = await submitLead({
      formType: 'contact',
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      interest,
      message,
      honeypot: String(data.get('website_url') ?? ''),
      challenge: String(data.get('_challenge') ?? ''),
      turnstileToken: String(data.get('cf-turnstile-response') ?? ''),
      consent,
    });

    if (result.ok) {
      trackEvent('contact_submit', { interest });
      setSent(true);
    } else {
      setError(result.error ?? 'Failed to send. Please email us directly at info@marmidon.com.');
    }
    setSending(false);
  };

  const contactCards = [
    { icon: Phone,  title: t('phoneLabel'),        lines: (content.getContent('phone_numbers', '') || t('phoneNumbers')).split('\n').filter(Boolean).length ? content.getContent('phone_numbers', '').split('\n') : [t('phoneNumbers'), t('phoneHours')] },
    { icon: Mail,   title: t('emailLabel'),         lines: [content.getContent('email_address', 'info@marmidon.com'), t('emailResponse')] },
    { icon: MapPin, title: t('headquartersLabel'),  lines: (content.getContent('office_address', '') || t('headquartersAddress')).split('\n').filter(Boolean).length ? content.getContent('office_address', '').split('\n') : [t('headquartersAddress'), t('poBox')] },
    { icon: Clock,  title: t('businessHoursLabel'), lines: (content.getContent('business_hours', '') || `${t('hoursWeekdays')}\n${t('hoursWeekend')}`).split('\n').filter(Boolean) },
  ];

  const phoneLines = (content.getContent('phone_numbers', '0782-602854') || '0782-602854').split('\n').filter(Boolean);
  const primaryPhone = phoneLines[0]?.replace(/[^\d+]/g, '') || '+256782602854';
  const email = content.getContent('email_address', 'info@marmidon.com');
  const addressLine = (content.getContent('office_address', '') || 'Plot 19 Sir Albert Cook Road, Mengo, Kampala').split('\n')[0];

  const [showMap, setShowMap] = useState(false);
  const [loadMap, setLoadMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setLoadMap(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  const contactJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.contact.title} description={PAGE_META.contact.description} jsonLd={contactJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {content.getContent('contact_hero_badge', 'Support & Help')}
          </span>
        }
        title={content.getContentAny(['contactTitle', 'hero_title'], t('contactTitle'))}
        description={content.getContentAny(['contactDesc', 'hero_desc'], t('contactDesc'))}
      >
        <a
          href="#contact-form"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]"
        >
          {content.getContent('contact_hero_cta_primary', 'Send a Message')} <ArrowRight className="w-4 h-4" />
        </a>
        <Link
          to="/request-a-demo"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]"
        >
          {content.getContent('contact_hero_cta_secondary', 'Request a Demo')}
        </Link>
      </LightPageHeader>

      <section className="products-catalog">
        <div className="products-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactCards.map((card, idx) => (
              <ScrollReveal key={idx}>
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                  {card.lines.map((line, li) => (
                    <p key={li} className={`text-xs ${li === 0 ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{line}</p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Map — lazy-loaded, consent-aware (TSR-004 §8.1) */}
          <div ref={mapRef} className="mb-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {loadMap ? (
              showMap ? (
                <iframe
                  title="Marmidon office location"
                  width="100%"
                  height="320"
                  className="w-full"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.757098857833!2d32.577328!3d0.313630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbb5b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sPlot+19+Sir+Albert+Cook+Road%2C+Mengo%2C+Kampala!5e0!3m2!1sen!2sug!4v1"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-80 bg-slate-50 text-center p-8">
                  <MapPin className="w-10 h-10 text-[var(--color-primary)] mb-3" />
                  <p className="font-semibold text-slate-900 mb-1">Show office location</p>
                  <p className="text-sm text-slate-500 mb-4">Loading the map may set cookies from Google.</p>
                  <button
                    onClick={() => setShowMap(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--color-secondary)] transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Load map
                  </button>
                </div>
              )
            ) : (
              <div className="h-80 bg-slate-50 animate-pulse flex items-center justify-center">
                <MapPin className="w-8 h-8 text-slate-300" />
              </div>
            )}
          </div>

          <div id="contact-form" className="grid lg:grid-cols-5 gap-12">

            {/* Left — info panel */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="sticky top-24">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-5">
                    <Sparkles className="w-4 h-4" /> {content.getContent('getInTouch', t('getInTouch'))}
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-secondary)] mb-4 leading-tight">
                    {content.getContent('sidebar_title', 'Ready to transform your business?')}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {content.getContent('sidebar_desc', 'Fill in the form and our team will get back to you within 24 hours. Or reach us directly using the contacts below.')}
                  </p>

                  <div className="space-y-5">
                    {[
                      { icon: Phone, label: 'Call Us', value: phoneLines.slice(0, 3).join(' · '), href: `tel:${primaryPhone.startsWith('+') ? primaryPhone : `+256${primaryPhone.replace(/^0/, '')}`}` },
                      { icon: Mail,  label: 'Email Us', value: email, href: `mailto:${email}` },
                      { icon: MapPin, label: 'Visit Us', value: addressLine, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}` },
                    ].map((item) => (
                      <a key={item.label} href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                          <div className="text-sm font-medium text-gray-800">{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Demo CTA box */}
                  <div className="mt-8 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative">
                      <CalendarCheck className="w-6 h-6 text-cyan-300 mb-3" />
                      <h3 className="font-bold text-lg mb-2">{content.getContent('trial_title', 'See Marmidon in action')}</h3>
                      <p className="text-white/70 text-sm mb-4">{content.getContent('trial_desc', 'Book a personalised demo tailored to your modules and industry.')}</p>
                      <Link to="/request-a-demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--color-secondary)] rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:-translate-y-0.5">
                        {content.getContent('trial_button', 'Request a Demo')} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{content.getContent('success_title', 'Message Sent!')}</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">{content.getContent('success_desc', 'Thank you for reaching out. Our team will get back to you within 24 hours.')}</p>
                    <button onClick={() => { setSent(false); resetValidation(); }} className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-colors">
                      {content.getContent('success_again_label', 'Send Another Message')}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-extrabold text-[var(--color-secondary)]">{content.getContent('sendUsMessage', t('sendUsMessage'))}</h2>
                      <p className="text-gray-500 mt-1 text-sm">{content.getContent('form_required_note', 'All fields marked * are required.')}</p>
                    </div>
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} onFocus={() => trackEvent('lead_form_start', { form_name: 'contact' })} className="relative space-y-5">
                      <FormHoneypot />
                      <InvisibleChallenge />
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_first_name_label', `${t('firstNameLabel')} *`)}</label>
                          <input id="firstName" type="text" name="firstName" required placeholder="John"
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm${errors.firstName ? ' border-red-400' : ' border-gray-200'}`}
                            onBlur={() => markTouched('firstName')} onFocus={() => clearError('firstName')} {...ariaProps('firstName')} />
                          {errors.firstName && <p id="firstName-error" role="alert" className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_last_name_label', `${t('lastNameLabel')} *`)}</label>
                          <input id="lastName" type="text" name="lastName" required placeholder="Doe"
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm${errors.lastName ? ' border-red-400' : ' border-gray-200'}`}
                            onBlur={() => markTouched('lastName')} onFocus={() => clearError('lastName')} {...ariaProps('lastName')} />
                          {errors.lastName && <p id="lastName-error" role="alert" className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_email_label', `${t('workEmailLabel')} *`)}</label>
                          <input id="email" type="email" name="email" required placeholder="john@company.com"
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm${errors.email ? ' border-red-400' : ' border-gray-200'}`}
                            onBlur={() => markTouched('email')} onFocus={() => clearError('email')} {...ariaProps('email')} />
                          {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_phone_label', t('phoneInputLabel'))}</label>
                          <input id="phone" type="tel" name="phone" placeholder="+256 700 000 000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_company_label', `${t('companyLabel')} *`)}</label>
                          <input id="company" type="text" name="company" required placeholder="Company Inc."
                            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm${errors.company ? ' border-red-400' : ' border-gray-200'}`}
                            onBlur={() => markTouched('company')} onFocus={() => clearError('company')} {...ariaProps('company')} />
                          {errors.company && <p id="company-error" role="alert" className="mt-1 text-sm text-red-600">{errors.company}</p>}
                        </div>
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_job_title_label', t('jobTitleLabel'))}</label>
                          <input id="jobTitle" type="text" name="jobTitle" placeholder="VP of Sales"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_interest_label', `${t('interestedInLabel')} *`)}</label>
                        <select id="interest" name="interest" required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm bg-white">
                          <option value="">Select an option...</option>
                          <optgroup label="Request a demo">
                            {MARMIDON_MODULES.map((m) => (
                              <option key={m.slug} value={`demo-${m.slug}`}>Demo: {m.shortName}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Industry">
                            {MARMIDON_SECTORS.map((s) => (
                              <option key={s.slug} value={`sector-${s.slug}`}>{s.title}</option>
                            ))}
                          </optgroup>
                          <option value="pricing">Pricing & licensing</option>
                          <option value="partnership">Partnership</option>
                          <option value="support">Technical support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">{content.getContent('form_message_label', `${t('messageLabel')} *`)}</label>
                        <textarea id="message" name="message" required rows={4} placeholder="Tell us how we can help..."
                          className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all resize-none text-sm${errors.message ? ' border-red-400' : ' border-gray-200'}`}
                          onBlur={() => markTouched('message')} onFocus={() => clearError('message')} {...ariaProps('message')} />
                        {errors.message && <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">{errors.message}</p>}
                      </div>
                      <TurnstileWidget />
                      <PrivacyConsent checked={consent} onChange={setConsent} error={!consent && error?.includes('privacy') ? 'You must agree to continue.' : undefined} />
                      <button type="submit" disabled={sending}
                        className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold hover:bg-[var(--color-secondary)] transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base">
                        {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> {content.getContent('form_submitting_label', 'Sending...')}</> : <><Send className="w-5 h-5" /> {content.getContent('form_submit_label', 'Send Message')}</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
