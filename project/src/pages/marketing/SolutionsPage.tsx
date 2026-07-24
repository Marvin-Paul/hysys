import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ArrowRight, ArrowLeft, Building2, Factory, Cog, Truck, ShoppingBag, Network,
  Briefcase, GraduationCap, HeartPulse, UtensilsCrossed, Heart, HardHat, Newspaper,
  Landmark, Users, Package, ShoppingCart, TrendingUp, Settings, Store, BarChart3,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PageHero } from '../../components/ui/PageHero';
import { Testimonial } from '../../components/ui/Testimonial';
import { SectorCard } from '../../components/ui/SectorCard';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { sectorSeoTitle, PAGE_META } from '../../lib/seo/pageMeta';
import { useSiteContent } from '../../hooks/useSiteContent';
import { cmsTemplate, mergeCmsRecord } from '../../lib/cms/cmsContent';
import { MARMIDON_SECTORS, getModule, resolveSectorSlug } from '../../lib/marmidonCatalog';
import { getSectorDetail } from '../../lib/sectorDetailContent';
import { demoRequestUrl } from '../../lib/forms/demoUrl';
import { breadcrumbJsonLd, reviewJsonLd } from '../../lib/seo/structuredData';
import { trackEvent } from '../../lib/analytics/track';
import { sectorImages } from '../../lib/cms/cardDefaults';

const sectorIconMap: Record<string, LucideIcon> = {
  Factory, Cog, Truck, ShoppingBag, Network, Briefcase, GraduationCap, HeartPulse,
  UtensilsCrossed, Heart, HardHat, Newspaper,
};

const moduleIconMap: Record<string, LucideIcon> = {
  financials: Landmark,
  'hr-payroll': Users,
  inventory: Package,
  procurement: ShoppingCart,
  'sales-crm': TrendingUp,
  operations: Settings,
  fleet: Truck,
  manufacturing: Factory,
  'pos-retail': Store,
  'business-intelligence': BarChart3,
  projects: Briefcase,
};

const defaultCta = {
  title: 'Ready to see Marmidon in action?',
  description: 'Book a personalised demo and discover how Marmidon ERP fits your industry.',
  primaryLabel: 'Request a Demo',
  primaryTo: '/request-a-demo',
  secondaryLabel: 'Contact Sales',
  secondaryTo: '/contact',
};

const sectorDefaults = Object.fromEntries(
  MARMIDON_SECTORS.map((sector) => [
    sector.slug,
    { title: sector.title, description: sector.description, iconName: sector.iconName },
  ])
);

export function SolutionsPage() {
  const content = useSiteContent('industries');
  const global = useSiteContent('global');
  const rawSectors = content.getContentRaw('industries_list') as Record<string, unknown>[] | null;
  const sectors = mergeCmsRecord(rawSectors, sectorDefaults, (item, slug, fallback) => ({
    title: String(item.title || fallback.title || slug),
    description: String(item.description || fallback.description || ''),
    iconName: String(item.iconName || fallback.iconName || 'Building2'),
    image: String(item.image || sectorImages[slug] || ''),
  }));

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.solutions.title} description={PAGE_META.solutions.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Solutions' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Building2 className="w-4 h-4" /> {content.getContent('industries_hero_badge', 'Solutions')}
          </span>
        }
        title={content.getContentAny(['industriesTitle', 'solutions_title'], 'Solutions by industry')}
        description={content.getContentAny(
          ['industriesDesc', 'solutions_desc'],
          'Tailored Marmidon ERP for every sector. Discover how we help organisations like yours transform operations.'
        )}
      >
        <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#1E66C4]">
          {content.getContent('industries_hero_cta_primary', 'Request a Demo')} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
          {content.getContent('industries_hero_cta_secondary', 'Contact Sales')}
        </Link>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={
              <span className="type-badge type-badge--light">
                {content.getContent('industries_grid_badge', 'By industry')}
              </span>
            }
            title={content.getContent('industries_grid_title', 'Purpose-built for your sector')}
            description={content.getContent('industries_grid_desc', 'Sector-fit module configurations for twelve industries.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MARMIDON_SECTORS.map((sector) => {
              const cmsSector = sectors[sector.slug] ?? sectorDefaults[sector.slug];
              return (
              <ScrollReveal key={sector.slug}>
                <SectorCard
                  id={sector.slug}
                  title={cmsSector.title}
                  description={cmsSector.description}
                  link={`/solutions/${sector.slug}`}
                  image={cmsSector.image || sectorImages[sector.slug]}
                  linkLabel={global.getContent('card_footer_label', 'Learn more')}
                  icon={sectorIconMap[sector.iconName]}
                />
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', defaultCta.title)}
        description={content.getContent('cta_desc', defaultCta.description)}
        primaryLabel={content.getContent('cta_button', defaultCta.primaryLabel)}
        primaryTo={defaultCta.primaryTo}
        secondaryLabel={defaultCta.secondaryLabel}
        secondaryTo={defaultCta.secondaryTo}
      />
    </div>
  );
}

export function SolutionDetailPage() {
  const content = useSiteContent('industries');
  const { sectorId } = useParams<{ sectorId: string }>();
  const resolvedSlug = resolveSectorSlug(sectorId || '');
  const sector = MARMIDON_SECTORS.find((s) => s.slug === resolvedSlug);

  useEffect(() => {
    if (!sector) return;
    trackEvent('sector_view', { sector_name: sector.title, sector_slug: resolvedSlug });
  }, [sector, resolvedSlug]);

  if (sectorId && resolvedSlug !== sectorId) {
    return <Navigate to={`/solutions/${resolvedSlug}`} replace />;
  }

  if (!sector) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <SEO title="Solution Not Found" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Solution not found</h1>
          <p className="mt-2 text-slate-600">Sorry, we could not find that industry solution.</p>
          <Link to="/solutions" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
            <ArrowLeft className="w-4 h-4" /> All solutions
          </Link>
        </div>
      </div>
    );
  }

  const sectorDetail = getSectorDetail(resolvedSlug);

  const sectorJsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
      { name: sector.title, path: `/solutions/${resolvedSlug}` },
    ]),
    ...(sectorDetail?.proof ? [reviewJsonLd({
      quote: sectorDetail.proof.quote,
      author: sectorDetail.proof.attribution,
    })] : []),
  ];
  const demoUrl = demoRequestUrl({ sector: resolvedSlug });
  const primaryModuleSlug = sector.recommendedModules[0];
  const modulesCtaTo = primaryModuleSlug ? `/products/${primaryModuleSlug}` : '/products';

  return (
    <div className="pt-16">
      <SEO title={sectorSeoTitle(sector.title)} description={sector.description} jsonLd={sectorJsonLd} fullTitle />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Solutions', path: '/solutions' },
          { label: sector.title },
        ]}
      />

      <PageHero
        badge={sector.title}
        title={`Marmidon for ${sector.title}`}
        description={sector.description}
        primaryCta={{ label: content.getContent('detail_hero_primary_cta', 'Request a Demo'), to: demoUrl }}
        secondaryCta={{ label: content.getContent('detail_hero_secondary_cta', 'Explore modules'), to: modulesCtaTo }}
      />

      {sectorDetail && (
        <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={<span className="type-badge type-badge--light">{content.getContent('detail_helps_badge', 'How Marmidon helps')}</span>}
              title={cmsTemplate(
                content.getContent('detail_helps_title', 'How Marmidon helps {{name}} organisations'),
                { name: sector.title.toLowerCase() }
              )}
              description={content.getContent('detail_helps_desc', 'Practical outcomes when finance, operations, and industry workflows run on one ERP platform.')}
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {sectorDetail.howHelps.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                  <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-primary)] mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading
                badge={<span className="type-badge type-badge--light">{content.getContent('detail_pain_badge', 'Challenges')}</span>}
                title={content.getContent('detail_pain_title', 'Common pain points')}
                description={content.getContent('detail_pain_desc', 'We understand the unique challenges this industry faces.')}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {sector.painPoints.map((p) => (
                  <div key={p} className="rounded-xl bg-red-50 p-5 text-sm font-medium text-red-700 ring-1 ring-red-100">{p}</div>
                ))}
              </div>
            </div>
            {sector.stat && (
              <div className="rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-8 text-white">
                <div className="text-4xl font-bold">{sector.stat}</div>
                <div className="mt-1 text-sm text-white/80">{sector.statLabel}</div>
                <hr className="my-6 border-white/20" />
                <p className="text-sm text-white/90">{content.getContent('detail_stat_note', 'Typical results achieved by organisations in this sector after deploying Marmidon ERP.')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light">{content.getContent('detail_modules_badge', 'Modules')}</span>}
            title={content.getContent('detail_modules_title', 'Recommended modules')}
            description={content.getContent('detail_modules_desc', 'The Marmidon modules most relevant to this industry.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sector.recommendedModules.map((slug) => {
              const mod = getModule(slug);
              const ModIcon = moduleIconMap[slug] || BarChart3;
              return (
                <ScrollReveal key={slug}>
                  <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm text-center">
                    <div className="inline-flex rounded-xl bg-blue-50 p-3 ring-1 ring-blue-100 text-blue-600">
                      <ModIcon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">{mod?.shortName ?? slug}</h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{mod?.subtitle}</p>
                    <Link to={`/products/${slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {sectorDetail?.proof && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <Testimonial
                quote={sectorDetail.proof.quote}
                attribution={sectorDetail.proof.attribution}
                company={sectorDetail.proof.company}
                variant="dark"
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      <PageCtaSection
        title={cmsTemplate(content.getContent('detail_cta_title', defaultCta.title), { name: sector.title })}
        description={cmsTemplate(content.getContent('detail_cta_desc', defaultCta.description), { name: sector.title })}
        primaryLabel={content.getContent('detail_cta_button', defaultCta.primaryLabel)}
        primaryTo={demoUrl}
        secondaryLabel={content.getContent('detail_cta_secondary', 'Explore modules')}
        secondaryTo={modulesCtaTo}
      />
    </div>
  );
}
