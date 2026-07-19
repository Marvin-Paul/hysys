import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, BarChart3, Shield, Zap, Cloud, ShoppingCart, ArrowRight, CheckCircle, Sparkles, Globe, Award, Landmark, Package, TrendingUp, Settings, Truck, Factory, Store, Briefcase, Link2, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PageHero } from '../../components/ui/PageHero';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ContentCard } from '../../components/ui/ContentCard';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { CardMedia } from '../../components/ui/CardMedia';
import { useTranslation } from '../../lib/i18n';
import { useSiteContent } from '../../hooks/useSiteContent';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { moduleSeoTitle, PAGE_META } from '../../lib/seo/pageMeta';
import { cmsSlug, mergeCmsRecord, toCmsArray, resolveText, cmsText, cmsTemplate } from '../../lib/cms/cmsContent';
import { productImages } from '../../lib/cms/cardDefaults';

import { MARMIDON_MODULES, resolveModuleSlug, getModule, getSector } from '../../lib/marmidonCatalog';
import { getModuleDetail } from '../../lib/moduleDetailContent';
import { getModuleFaqs } from '../../lib/moduleFaqs';
import { demoRequestUrl } from '../../lib/forms/demoUrl';
import { FaqAccordion } from '../../components/ui/FaqAccordion';
import { softwareApplicationJsonLd, breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { trackEvent } from '../../lib/analytics/track';

const moduleIconMap: Record<string, LucideIcon> = {
  Landmark, Users, Package, ShoppingCart, TrendingUp, Settings, Truck, Factory, Store, BarChart3, Briefcase,
  Shield, Zap, Cloud, Globe, Award,
};

const productData: Record<string, any> = Object.fromEntries(
  MARMIDON_MODULES.map((m) => [
    m.slug,
    {
      icon: moduleIconMap[m.iconName] || Shield,
      title: m.title,
      subtitle: m.subtitle,
      description: m.description,
      features: m.features,
      cta: 'Request a Demo',
      ctaKey: 'requestDemo',
      color: m.color,
      bgColor: 'bg-blue-50',
      titleKey: m.titleKey,
      subtitleKey: `${m.titleKey}Subtitle`,
      image: productImages[m.slug] || '',
    },
  ])
);

/* ── Products List Page ─────────────────────────────────────────────────── */
export function ProductsPage() {
  const { t } = useTranslation();
  const content = useSiteContent('products');
  const rawProducts = content.getContentRaw('products_list') as any[] | null;
  const resolvedProductData = mergeCmsRecord(rawProducts, productData, (item, slug, fallback) => ({
    ...fallback,
    ...item,
    features: toCmsArray(item.features).length ? toCmsArray(item.features) : (fallback.features as string[]),
    icon: moduleIconMap[String(item.iconName)] || fallback.icon || Shield,
    description: resolveText(
      String(item.description ?? fallback.description ?? ''),
      String(item.descriptionKey ?? fallback.descriptionKey ?? ''),
      t
    ) || fallback.description || '',
    image: String(item.image || fallback.image || productImages[slug] || ''),
  }));

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.products.title} description={PAGE_META.products.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Products' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {content.getContent('products_hero_badge', 'The Complete Product Suite')}
          </span>
        }
        title={content.getContentAny(['productsTitle', 'hero_title'], t('productsTitle'))}
        description={content.getContentAny(['productsDesc', 'hero_desc'], t('productsDesc'))}
      >
        <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#1E66C4]">
          {content.getContent('products_hero_cta_primary', 'Request a Demo')} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
          {content.getContent('products_hero_cta_secondary', t('contactSales'))}
        </Link>
      </LightPageHeader>

      <section className="products-catalog">
        <div className="products-container">
          <ScrollReveal>
            <SectionHeading
              badge={
                <span className="type-badge type-badge--light">
                  <Sparkles className="w-4 h-4" /> {content.getContent('products_grid_badge', 'Our Products')}
                </span>
              }
              title={content.getContent('products_grid_title', 'Everything you need to grow')}
              description={content.getContent('products_grid_desc', 'Eleven integrated modules. One unified ERP platform.')}
            />
          </ScrollReveal>
          <div className="pro-card-grid">
            {Object.entries(resolvedProductData).map(([key, product]) => (
              <ScrollReveal key={key}>
                <ContentCard
                  to={`/products/${key}`}
                  title={resolveText(String(product.title ?? ''), String(product.titleKey ?? ''), t) || t(product.titleKey)}
                  subtitle={resolveText(String(product.subtitle ?? ''), String(product.subtitleKey ?? ''), t) || t(product.subtitleKey)}
                  description={product.description || resolveText('', String(product.descriptionKey ?? ''), t) || t(product.descriptionKey)}
                  image={product.image}
                  imageAlt={resolveText(String(product.title ?? ''), String(product.titleKey ?? ''), t) || product.title || t(product.titleKey)}
                  icon={product.icon}
                  iconGradient={product.color}
                  className="product-card"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="products-spotlight">
        <div className="products-container">
          <div className="spotlight-flex">
            <div className="spotlight-text">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> {content.getContent('spotlight_badge', 'Spotlight')}
              </span>
              <h2 className="text-4xl font-extrabold text-[#0a2540] mb-6">{content.getContent('spotlight_title', 'A radiant showcase for your growth engine')}</h2>
              <p className="text-gray-600 max-w-xl leading-relaxed mb-8">
                {content.getContent('spotlight_desc', 'Highlight a product experience with an elegant radial glow, premium spacing, and a calm interface that feels polished and modern.')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#08407a]">
                  {content.getContent('cta_button', 'Request a Demo')}
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
                  {t('contactSales')}
                </Link>
              </div>
            </div>
            <div className="spotlight-showcase">
              <div className="showcase-glow-backdrop" />
              <div className="relative z-10 w-full max-w-md rounded-[40px] bg-white p-10 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-[0.18em] mb-1">{content.getContent('spotlight_featured_label', 'Featured product')}</p>
                    <h3 className="text-2xl font-semibold text-[var(--color-secondary)]">{content.getContent('spotlight_product_name', 'Financials')}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {content.getContent('spotlight_product_desc', 'Real-time ledgers, payables, receivables, and statutory reporting — the finance backbone of Marmidon ERP.')}
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">{content.getContent('spotlight_benefit_1_title', 'Automatic posting')}</p>
                    <p className="text-gray-600 text-sm">{content.getContent('spotlight_benefit_1_desc', 'Sales, procurement, and inventory transactions flow into accounts without manual journals.')}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">{content.getContent('spotlight_benefit_2_title', 'Audit-ready close')}</p>
                    <p className="text-gray-600 text-sm">{content.getContent('spotlight_benefit_2_desc', 'Structured period close with locking, dimensions, and a complete audit trail.')}</p>                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to get started?')}
        description={content.getContent('cta_desc', 'Book a personalised demo to see how Marmidon ERP fits your organisation.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
        secondaryLabel={t('contactSales')}
        secondaryTo="/contact"
      />
    </div>
  );
}

/* ── Product Detail Page ─────────────────────────────────────────────────── */
export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { t } = useTranslation();
  const content = useSiteContent('products');
  const global = useSiteContent('global');
  const resolvedSlug = resolveModuleSlug(productId || '');

  if (productId && resolvedSlug !== productId) {
    return <Navigate to={`/products/${resolvedSlug}`} replace />;
  }

  const rawProducts = content.getContentRaw('products_list') as any[] | null;
  const resolvedProducts = mergeCmsRecord(rawProducts, productData, (item, slug, fallback) => ({
    ...fallback,
    ...item,
    features: toCmsArray(item.features).length ? toCmsArray(item.features) : (fallback.features as string[]),
    icon: moduleIconMap[String(item.iconName)] || fallback.icon || Shield,
    description: resolveText(
      String(item.description ?? fallback.description ?? ''),
      String(item.descriptionKey ?? fallback.descriptionKey ?? ''),
      t
    ) || fallback.description || '',
    image: String(item.image || fallback.image || productImages[slug] || ''),
  }));
  const product = resolvedProducts[resolvedSlug];

  useEffect(() => {
    if (!product) return;
    trackEvent('module_view', { module_name: product.title, module_slug: resolvedSlug });
  }, [product, resolvedSlug]);

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('productNotFound')}</h1>
          <Link to="/products" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllProducts')}</Link>
        </div>
      </div>
    );
  }

  const moduleJsonLd = [
    softwareApplicationJsonLd({
      name: product.title,
      description: product.description,
      url: `https://www.marmidon.com/products/${resolvedSlug}`,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: product.title, path: `/products/${resolvedSlug}` },
    ]),
  ];

  const detail = getModuleDetail(resolvedSlug);
  const overview = detail?.overview ?? product.description;
  const benefits = detail?.benefits ?? [];
  const relatedModules = (detail?.relatedModuleSlugs ?? [])
    .map((slug) => getModule(slug))
    .filter((mod): mod is NonNullable<typeof mod> => Boolean(mod));
  const relevantSectors = (detail?.sectorSlugs ?? [])
    .map((slug) => getSector(slug))
    .filter((sector): sector is NonNullable<typeof sector> => Boolean(sector));
  const moduleFaqs = getModuleFaqs(resolvedSlug);
  const demoUrl = demoRequestUrl({ module: resolvedSlug });
  const industriesCtaTo = relevantSectors[0] ? `/solutions/${relevantSectors[0].slug}` : '/solutions';

  return (
    <div className="pt-16">
      <SEO
        title={moduleSeoTitle(resolvedSlug, product.title)}
        description={product.description}
        type="product"
        jsonLd={moduleJsonLd}
        fullTitle
      />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: cmsText(product.title, product.titleKey, t) },
        ]}
      />

      {/* Block 1 · Hero */}
      <PageHero
        badge={cmsText(product.subtitle, product.subtitleKey, t)}
        title={cmsText(product.title, product.titleKey, t)}
        subtitle={global.getContent('page_subtitle_suffix', 'by Marmidon')}
        description={overview.slice(0, 160) + (overview.length > 160 ? '…' : '')}
        primaryCta={{ label: content.getContent('detail_hero_primary_cta', 'Request a Demo'), to: demoUrl }}
        secondaryCta={{ label: content.getContent('detail_hero_secondary_cta', 'See relevant industries'), to: industriesCtaTo }}
      />

      {/* Block 2 · Overview */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="type-badge type-badge--light inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4" /> Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-secondary)] mb-4">
              {cmsText(product.title, product.titleKey, t)}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">{overview}</p>
          </ScrollReveal>
        </div>
      </section>

      {product.image && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <CardMedia src={product.image} alt={product.title} aspect="wide" className="max-h-[26rem]" />
            </div>
          </div>
        </section>
      )}

      {/* Block 3 · Key capabilities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> {content.getContent('detail_features_badge', 'Key capabilities')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{content.getContent('detail_features_title', t('keyFeatures'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">{content.getContent('detail_features_desc', 'Core capabilities included with this module.')}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {product.features.map((feature: string, idx: number) => (
              <ScrollReveal key={idx}>
                <div className="group flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 leading-snug">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4 · Benefits / outcomes */}
      {benefits.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge={<span className="type-badge type-badge--light">{content.getContent('detail_outcomes_badge', 'Outcomes')}</span>}
                title={content.getContent('detail_outcomes_title', t('benefitsTitle'))}
                description={content.getContent('detail_outcomes_desc', 'What your organisation gains when this module is live.')}
              />
            </ScrollReveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <ScrollReveal key={benefit}>
                  <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mb-3" />
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">{benefit}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Block 5 · How it fits */}
      {detail?.integrationStory && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 p-8 sm:p-10 ring-1 ring-[var(--color-primary)]/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-extrabold text-[var(--color-secondary)]">{content.getContent('detail_integration_title', 'How it fits the Marmidon platform')}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">{detail.integrationStory}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Block 6 · Relevant sectors */}
      {relevantSectors.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge={<span className="type-badge type-badge--light"><Building2 className="w-4 h-4" /> Sectors</span>}
                title={content.getContent('detail_industries_title', 'Most relevant industries')}
                description={content.getContent('detail_industries_desc', 'See how this module supports organisations in your sector.')}
              />
            </ScrollReveal>
            <div className="mt-12 flex flex-wrap gap-3">
              {relevantSectors.map((sector) => (
                <Link
                  key={sector.slug}
                  to={`/solutions/${sector.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                >
                  {sector.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Block 7 · Proof */}
      {detail?.proof && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <blockquote className="relative rounded-3xl bg-[var(--color-secondary)] p-8 sm:p-10 text-white">
                <p className="text-lg sm:text-xl leading-relaxed font-medium">&ldquo;{detail.proof.quote}&rdquo;</p>
                <footer className="mt-6 text-sm text-white/70">
                  — {detail.proof.attribution}, {detail.proof.company}
                </footer>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Block 8 · FAQ */}
      {moduleFaqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge={<span className="type-badge type-badge--light">FAQ</span>}
                title={content.getContent('detail_faq_title', 'Frequently asked questions')}
                description={`Common questions about ${cmsText(product.title, product.titleKey, t)}.`}
              />
            </ScrollReveal>
            <div className="mt-10">
              <FaqAccordion items={moduleFaqs} />
            </div>
          </div>
        </section>
      )}

      {/* Block 9 · Related modules */}
      {relatedModules.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge={<span className="type-badge type-badge--light">Related modules</span>}
                title={content.getContent('detail_related_title', 'Works best with')}
                description={content.getContent('detail_related_desc', 'Modules that connect directly with this part of Marmidon ERP.')}
              />
            </ScrollReveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedModules.map((mod) => (
                <ScrollReveal key={mod.slug}>
                  <ContentCard
                    to={`/products/${mod.slug}`}
                    title={mod.shortName}
                    subtitle={mod.subtitle}
                    description={mod.description.slice(0, 100) + (mod.description.length > 100 ? '…' : '')}
                    icon={moduleIconMap[mod.iconName] || Shield}
                    iconGradient={mod.color}
                    image={productImages[mod.slug]}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Block 10 · Final CTA */}
      <PageCtaSection
        title={cmsTemplate(
          content.getContent('detail_cta_title', `See {{name}} in a live demo`),
          { name: cmsText(product.title, product.titleKey, t) }
        )}
        description={content.getContent('detail_cta_desc', 'Book a personalised demo with our ERP specialists — tailored to your modules and industry.')}
        primaryLabel={content.getContent('detail_cta_button', 'Request a Demo')}
        primaryTo={demoUrl}
        secondaryLabel={content.getContent('detail_cta_secondary', 'See relevant industries')}
        secondaryTo={industriesCtaTo}
      />
    </div>
  );
}
