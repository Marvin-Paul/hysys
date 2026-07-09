import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

export function ContactPage() {
  const { t } = useTranslation();
  const content = useSiteContent('contact');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = data.get('firstName') as string;
    const lastName  = data.get('lastName')  as string;
    const email     = data.get('email')     as string;
    const phone     = data.get('phone')     as string;
    const company   = data.get('company')   as string;
    const jobTitle  = data.get('jobTitle')  as string;
    const interest  = data.get('interest')  as string;
    const message   = data.get('message')   as string;
    try {
      await fetch('https://formsubmit.co/info@hysysglobal.com', {
        method: 'POST',
        body: new URLSearchParams({ _subject: 'New contact form submission from HYSYS website', name: `${firstName} ${lastName}`, email, phone, company, jobTitle, interest, message }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (supabase) {
        supabase.from('contact_submissions').insert({ first_name: firstName, last_name: lastName, email, phone, company, job_title: jobTitle, interest, message }).then();
      }
      setSent(true);
    } catch {
      setError('Failed to send. Please email us directly at info@hysysglobal.com.');
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    { icon: Phone,  title: t('phoneLabel'),        lines: [t('phoneNumbers'), t('phoneHours')] },
    { icon: Mail,   title: t('emailLabel'),         lines: ['info@hysysglobal.com', t('emailResponse')] },
    { icon: MapPin, title: t('headquartersLabel'),  lines: [t('headquartersAddress'), t('poBox')] },
    { icon: Clock,  title: t('businessHoursLabel'), lines: [t('hoursWeekdays'), t('hoursWeekend')] },
  ];

  return (
    <div className="pt-16">
      <SEO title="Contact" />

      <PageHero
        badge="Contact"
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title={content.getContent('contactTitle', t('contactTitle'))}
        subtitle="Get In Touch"
        description={content.getContent('contactDesc', t('contactDesc'))}
        primaryCta={{ label: 'Send a Message', to: '/contact' }}
        secondaryCta={{ label: 'Request a Demo', to: '/register' }}
      />

      {/* ── Contact Info Cards ── */}
      <section className="bg-gray-50 pt-8 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 -mt-8">
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
        </div>
      </section>

      {/* ── Main Form Section ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left — info panel */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="sticky top-24">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-5">
                    <Sparkles className="w-4 h-4" /> {content.getContent('getInTouch', t('getInTouch'))}
                  </span>
                  <h2 className="text-3xl font-extrabold text-[var(--color-secondary)] mb-4 leading-tight">
                    Ready to transform your business?
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Fill in the form and our team will get back to you within 24 hours. Or reach us directly using the contacts below.
                  </p>

                  <div className="space-y-5">
                    {[
                      { icon: Phone, label: 'Call Us', value: '0782-602854 · 0752-602857', href: 'tel:+256782602854' },
                      { icon: Mail,  label: 'Email Us', value: 'info@hysysglobal.com', href: 'mailto:info@hysysglobal.com' },
                      { icon: MapPin,label: 'Visit Us', value: 'Plot 19 Sir Albert Cook Road, Mengo, Kampala', href: '#' },
                    ].map((item) => (
                      <a key={item.label} href={item.href}
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

                  {/* Premium CTA box */}
                  <div className="mt-8 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative">
                      <Sparkles className="w-6 h-6 text-cyan-300 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Free 14-Day Trial</h3>
                      <p className="text-white/70 text-sm mb-4">No credit card needed. Full platform access from day one.</p>
                      <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[var(--color-secondary)] rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:-translate-y-0.5">
                        Get Started <ArrowRight className="w-4 h-4" />
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
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-colors">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-extrabold text-[var(--color-secondary)]">{content.getContent('sendUsMessage', t('sendUsMessage'))}</h2>
                      <p className="text-gray-500 mt-1 text-sm">All fields marked * are required.</p>
                    </div>
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">{t('firstNameLabel')} *</label>
                          <input id="firstName" type="text" name="firstName" required placeholder="John"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">{t('lastNameLabel')} *</label>
                          <input id="lastName" type="text" name="lastName" required placeholder="Doe"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">{t('workEmailLabel')} *</label>
                          <input id="email" type="email" name="email" required placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">{t('phoneInputLabel')}</label>
                          <input id="phone" type="tel" name="phone" placeholder="+256 700 000 000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">{t('companyLabel')} *</label>
                          <input id="company" type="text" name="company" required placeholder="Company Inc."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-2">{t('jobTitleLabel')}</label>
                          <input id="jobTitle" type="text" name="jobTitle" placeholder="VP of Sales"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">{t('interestedInLabel')} *</label>
                        <select id="interest" name="interest" required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-sm bg-white">
                          <option value="">Select an option...</option>
                          <option value="demo">Product Demo</option>
                          <option value="pricing">Pricing Information</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">{t('messageLabel')} *</label>
                        <textarea id="message" name="message" required rows={4} placeholder="Tell us how we can help..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all resize-none text-sm" />
                      </div>
                      <button type="submit" disabled={sending}
                        className="w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold hover:bg-[var(--color-secondary)] transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base">
                        {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Send Message</>}
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
