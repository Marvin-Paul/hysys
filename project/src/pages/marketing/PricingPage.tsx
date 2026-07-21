import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PricingCard } from '../../components/ui/PricingCard';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { trackEvent } from '../../lib/analytics/track';
import { faqJsonLd, breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { mergeCmsList, toCmsArray } from '../../lib/cms/cmsContent';
import { DEFAULT_PRICING_FAQS, DEFAULT_PRICING_TIERS } from '../../lib/cms/resourceDefaults';

type PricingTier = (typeof DEFAULT_PRICING_TIERS)[number];

function resolveTiers(raw: unknown[] | null): PricingTier[] {
  const withIds = DEFAULT_PRICING_TIERS.map((t) => ({ ...t, id: t.id }));
  return mergeCmsList(raw, withIds).map((tier) => {
    const row = tier as Record<string, unknown>;
    return {
      id: String(row.id || ''),
      name: String(row.name || ''),
      price: String(row.price || 'Quote'),
      period: String(row.period || ''),
      desc: String(row.desc || ''),
      features: toCmsArray(row.features),
      cta: String(row.cta || 'Request a Demo'),
      highlight: row.highlight === true || String(row.tier_highlight ?? row.highlight).toLowerCase() === 'true',
    };
  });
}

function resolveFaqs(raw: unknown[] | null) {
  return mergeCmsList(raw, DEFAULT_PRICING_FAQS).map((f) => ({
    question: String(f.question || ''),
    answer: String(f.answer || ''),
  })).filter((f) => f.question);
}

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const content = useSiteContent('pricing');
  const tiers = resolveTiers(content.getContentRaw('pricing_tiers') as unknown[] | null);
  const faqs = resolveFaqs(content.getContentRaw('pricing_faqs') as unknown[] | null);

  useEffect(() => {
    trackEvent('pricing_view');
  }, []);

  const pricingJsonLd = useMemo(
    () => [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
      ]),
      faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    ],
    [faqs]
  );

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.pricing.title} description={PAGE_META.pricing.description} jsonLd={pricingJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Pricing' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {content.getContent('pricing_hero_badge', 'Pricing')}
          </span>
        }
        title={content.getContent('pricing_title', 'ERP pricing that scales with you')}
        description={content.getContent('pricing_desc', 'Choose the modules and deployment model you need. Every plan starts with a personalised demo and quote.')}
      >
        <Link
          to="/request-a-demo"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
        >
          {content.getContent('pricing_hero_cta', 'Request a Demo')} <ArrowRight className="w-4 h-4" />
        </Link>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <ScrollReveal key={tier.id}>
                <PricingCard
                  tier={tier}
                  popularLabel={content.getContent('pricing_popular_label', 'Most Popular')}
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200">
            <p className="text-lg font-semibold text-slate-900">{content.getContent('pricing_enterprise_title', 'Need a custom solution?')}</p>
            <p className="mt-2 text-sm text-slate-600">{content.getContent('pricing_enterprise_desc', 'Talk to our team about volume discounts, custom integrations, and dedicated support.')}</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#08407a]">
              {content.getContent('pricing_contact_cta', 'Contact Sales')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><HelpCircle className="w-4 h-4" /> FAQs</span>}
            title={content.getContent('pricing_faq_title', 'Frequently asked questions')}
            description={content.getContent('pricing_faq_desc', 'Everything you need to know about our pricing and plans.')}
          />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  {faq.question}
                  <ChevronDown className={`ml-2 h-4 w-4 shrink-0 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to get started?')}
        description={content.getContent('cta_desc', 'Request a personalised demo and quote for the modules you need.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
