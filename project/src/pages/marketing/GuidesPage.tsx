import { useState } from 'react';
import { BookOpen, Download, X, Loader2 } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { FormHoneypot } from '../../components/ui/FormHoneypot';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { TurnstileWidget } from '../../components/ui/TurnstileWidget';
import { submitLead } from '../../lib/forms/leadSubmission';
import { trackEvent } from '../../lib/analytics/track';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_GUIDES } from '../../lib/cms/resourceDefaults';
import { guideImages } from '../../lib/cms/cardDefaults';

type Guide = (typeof DEFAULT_GUIDES)[number];

export function GuidesPage() {
  const content = useSiteContent('guides');
  const guides = (mergeCmsList(
    content.getContentRaw('guides_list') as (Guide & { image?: string })[] | null,
    DEFAULT_GUIDES
  ) as (Guide & { image?: string })[]).map((g) => ({
    ...g,
    image: g.image || guideImages[g.id as string] || '',
  }));

  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openDownload = (guide: Guide) => {
    setActiveGuide(guide);
    setEmail('');
    setDone(false);
    setError(null);
  };

  const handleDownloadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeGuide) return;
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const honeypot = String(data.get('website_url') ?? '');

    const result = await submitLead({
      formType: 'contact',
      firstName: 'Resource',
      lastName: 'Download',
      email: String(data.get('email')),
      message: `Guide download request: ${activeGuide.title}`,
      interest: `guide-${activeGuide.id}`,
      honeypot,
      turnstileToken: String(data.get('cf-turnstile-response') ?? ''),
    });

    if (result.ok) {
      trackEvent('resource_download', { resource_name: activeGuide.title, resource_type: 'guide' });
      setDone(true);
    } else {
      setError(result.error ?? 'Could not process your request.');
    }
    setSending(false);
  };

  const guidesJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Guides', path: '/resources/guides' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.guides.title} description={PAGE_META.guides.description} jsonLd={guidesJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Resources', path: '/resources' }, { label: 'Guides' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <BookOpen className="w-4 h-4" /> {content.getContent('guides_hero_badge', 'Guides')}
          </span>
        }
        title={content.getContent('guides_title', 'Guides & whitepapers')}
        description={content.getContent('guides_desc', 'In-depth resources to help you make informed decisions about your technology strategy.')}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {guides.map((guide) => (
              <ScrollReveal key={guide.id || guide.title}>
                <div className="group relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                  <OptimizedImage
                    src={guide.image || guideImages[guide.id as string]}
                    alt={guide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="relative p-6 min-h-[220px] flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="inline-flex rounded-xl bg-white/20 backdrop-blur p-2.5 ring-1 ring-white/30 text-white">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-xs font-medium text-white">{guide.type}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{guide.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{guide.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-white/60">{guide.pages}</span>
                        <button
                          type="button"
                          onClick={() => openDownload(guide)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--color-primary)] transition hover:bg-slate-100"
                        >
                          <Download className="w-3 h-3" /> {content.getContent('guides_download_label', 'Download')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {activeGuide && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveGuide(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            {done ? (
              <div className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-900">{content.getContent('download_success_title', 'Download link sent')}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {content.getContent('download_success_desc', 'Check your inbox for the guide. Our team will follow up with the PDF shortly.').replace('the guide', activeGuide.title)}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-slate-900 pr-8">Download {activeGuide.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{content.getContent('download_modal_desc', 'Enter your work email to receive this guide.')}</p>
                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                <form onSubmit={handleDownloadSubmit} className="relative mt-4 space-y-4">
                  <FormHoneypot />
                  <div>
                    <label htmlFor="guide-email" className="form-label">Work email *</label>
                    <input
                      id="guide-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <TurnstileWidget />
                  <button type="submit" disabled={sending} className="btn-marmidon btn-marmidon--primary w-full">
                    {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : content.getContent('download_button_label', 'Get the guide')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={content.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
