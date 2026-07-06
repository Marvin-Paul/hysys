import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
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
    const lastName = data.get('lastName') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const company = data.get('company') as string;
    const jobTitle = data.get('jobTitle') as string;
    const interest = data.get('interest') as string;
    const message = data.get('message') as string;

    try {
      await Promise.all([
        supabase.from('contact_submissions').insert({
          first_name: firstName, last_name: lastName, email,
          phone, company, job_title: jobTitle, interest, message,
        }),
        fetch('https://formsubmit.co/info@hysysglobal.com', {
          method: 'POST',
          body: new URLSearchParams({
            _subject: 'New contact form submission from HYSYS website',
            name: `${firstName} ${lastName}`, email, phone, company, jobTitle, interest, message,
          } as any),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      ]);
      setSent(true);
    } catch {
      setError('Failed to send. Please email us directly at info@hysysglobal.com.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-16">
      <SEO title="Contact" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{content.getContent('contactTitle', t('contactTitle'))}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.getContent('contactDesc', t('contactDesc'))}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">{content.getContent('getInTouch', t('getInTouch'))}</h2>
              </ScrollReveal>
              <div className="space-y-6 stagger-children">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b5394] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{content.getContent('phoneLabel', t('phoneLabel'))}</h3>
                    <p className="text-gray-600">{content.getContent('phoneNumbers', t('phoneNumbers'))}</p>
                    <p className="text-sm text-gray-500">{content.getContent('phoneHours', t('phoneHours'))}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b5394] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{content.getContent('emailLabel', t('emailLabel'))}</h3>
                    <p className="text-gray-600">{content.getContent('emailAddress', t('emailAddress'))}</p>
                    <p className="text-sm text-gray-500">{content.getContent('emailResponse', t('emailResponse'))}</p>
                    <p className="text-sm text-gray-500 mt-1">{content.getContent('websiteLabel', t('websiteLabel'))} <a href="https://www.hysysglobal.com" className="text-[#0b5394] hover:underline">www.hysysglobal.com</a></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b5394] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{content.getContent('headquartersLabel', t('headquartersLabel'))}</h3>
                    <p className="text-gray-600">{content.getContent('headquartersAddress', t('headquartersAddress'))}</p>
                    <p className="text-gray-600">{content.getContent('poBox', t('poBox'))}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0b5394] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{content.getContent('businessHoursLabel', t('businessHoursLabel'))}</h3>
                    <p className="text-gray-600">{content.getContent('hoursWeekdays', t('hoursWeekdays'))}</p>
                    <p className="text-gray-600">{content.getContent('hoursWeekend', t('hoursWeekend'))}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-600">Your message has been sent. Our team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.getContent('sendUsMessage', t('sendUsMessage'))}</h2>
                </ScrollReveal>
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
                )}
                <ScrollReveal>
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('firstNameLabel', t('firstNameLabel'))}</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('lastNameLabel', t('lastNameLabel'))}</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('workEmailLabel', t('workEmailLabel'))}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('phoneInputLabel', t('phoneInputLabel'))}</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('companyLabel', t('companyLabel'))}</label>
                      <input
                        type="text"
                        name="company"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('jobTitleLabel', t('jobTitleLabel'))}</label>
                      <input
                        type="text"
                        name="jobTitle"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                        placeholder="VP of Sales"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('interestedInLabel', t('interestedInLabel'))}</label>
                    <select
                      name="interest"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">{content.getContent('selectOption', t('selectOption'))}</option>
                      <option value="demo">{content.getContent('productDemoOption', t('productDemoOption'))}</option>
                      <option value="pricing">{content.getContent('pricingInfoOption', t('pricingInfoOption'))}</option>
                      <option value="support">{content.getContent('technicalSupportOption', t('technicalSupportOption'))}</option>
                      <option value="partnership">{content.getContent('partnershipOption', t('partnershipOption'))}</option>
                      <option value="other">{content.getContent('otherOption', t('otherOption'))}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{content.getContent('messageLabel', t('messageLabel'))}</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all resize-none"
                      placeholder={content.getContent('messagePlaceholder', t('messagePlaceholder'))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {sending ? 'Sending...' : content.getContent('sendMessageBtn', t('sendMessageBtn'))}
                  </button>
                </form>
                </ScrollReveal>
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
