import { Link } from 'react-router-dom';
import { BookOpen, MessageCircle, FileText, ArrowRight, Newspaper, type LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { NewsletterSignup } from '../../components/ui/NewsletterSignup';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_RESOURCE_CARDS } from '../../lib/cms/resourceDefaults';
import { resourceHubImages } from '../../lib/cms/cardDefaults';

const iconMap: Record<string, LucideIcon> = {
  Newspaper, BookOpen, MessageCircle, FileText,
};

export function ResourcesPage() {
  const content = useSiteContent('resources');
  const cards = mergeCmsList(
    content.getContentRaw('resources_cards') as typeof DEFAULT_RESOURCE_CARDS | null,
    DEFAULT_RESOURCE_CARDS
  ).map((card) => ({
    ...card,
    icon: iconMap[String(card.iconName)] || BookOpen,
    image: String(card.image || resourceHubImages[String(card.id)] || ''),
  }));

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.resources.title} description={PAGE_META.resources.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Resources' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <BookOpen className="w-4 h-4" /> {content.getContent('resources_hero_badge', 'Resources')}
          </span>
        }
        title={content.getContent('resources_title', 'Learn, explore, and grow')}
        description={content.getContent('resources_desc', 'Access a wealth of knowledge to help you get the most out of the Marmidon platform.')}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((s) => {
              const Icon = s.icon || BookOpen;
              return (
                <ScrollReveal key={s.id || s.path}>
                  <Link to={String(s.path || '/resources')} className="group relative block rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                    <img
                      src={s.image || resourceHubImages[s.id as string] || resourceHubImages.blog}
                      alt={String(s.title || '')}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                    <div className="relative p-6 min-h-[200px] flex flex-col justify-end">
                      <div className={`inline-flex rounded-xl p-2.5 ring-1 backdrop-blur-sm ${String(s.accent || 'bg-white/20 text-white ring-white/30')}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white group-hover:text-[var(--color-accent)]">{s.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{s.description}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/90 group-hover:text-white">
                        {content.getContent('resources_card_link_label', 'Explore')} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <NewsletterSignup
              title={content.getContent('newsletter_title', 'Stay informed')}
              description={content.getContent('newsletter_desc', 'Get ERP insights and updates delivered to your inbox.')}
            />
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
