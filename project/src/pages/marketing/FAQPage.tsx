import { useState, useMemo } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { faqJsonLd, breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_FAQ_PAGE_ITEMS, groupFaqItems } from '../../lib/cms/resourceDefaults';

export function FAQPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<{ category: number; question: number } | null>(null);
  const content = useSiteContent('faq_page');
  const rawFaqItems = content.getContentRaw('faq_items');

  const faqCategories = useMemo(() => {
    const items = mergeCmsList(
      rawFaqItems as typeof DEFAULT_FAQ_PAGE_ITEMS | null,
      DEFAULT_FAQ_PAGE_ITEMS
    );
    return groupFaqItems(items);
  }, [rawFaqItems]);

  const filtered = faqCategories.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  const faqJsonLdData = useMemo(
    () => [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Resources', path: '/resources' },
        { name: 'FAQs', path: '/resources/faqs' },
      ]),
      faqJsonLd(
        faqCategories.flatMap((cat) =>
          cat.questions.map((item) => ({ question: item.q, answer: item.a }))
        )
      ),
    ],
    [faqCategories]
  );

  return (
    <div className="pt-16">
      <SEO
        title={PAGE_META.faq.title}
        description={PAGE_META.faq.description}
        jsonLd={faqJsonLdData}
        fullTitle
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Resources', path: '/resources' }, { label: 'FAQs' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <MessageCircle className="w-4 h-4" /> {content.getContent('faq_hero_badge', 'FAQs')}
          </span>
        }
        title={content.getContent('faq_title', 'Frequently asked questions')}
        description={content.getContent('faq_desc', 'Quick answers about Marmidon ERP modules, demos, pricing, and support.')}
      >
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={content.getContent('faq_search_placeholder', 'Search FAQs…')}
            className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {filtered.map((cat, ci) => (
              <ScrollReveal key={cat.category}>
                <h2 className="text-lg font-semibold text-slate-900">{cat.category}</h2>
                <div className="mt-4 space-y-2">
                  {cat.questions.map((item, qi) => {
                    const isOpen = openIndex?.category === ci && openIndex?.question === qi;
                    return (
                      <div key={`${cat.category}-${item.q}`} className="rounded-xl border border-slate-200 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? null : { category: ci, question: qi })}
                          className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-slate-900 hover:bg-slate-50"
                        >
                          {item.q}
                          <span className={`ml-2 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-sm text-slate-600">{item.a}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={content.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
