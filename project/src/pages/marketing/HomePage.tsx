import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Award,
  Sparkles,
  X,
  CheckCircle2,
  Landmark,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  Truck,
  Factory,
  Store,
  Briefcase,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { CustomerStoriesSection } from '../../components/home/CustomerStoriesSection';
import { FAQSection } from '../../components/home/FAQSection';
import { PlatformArchitecture } from '../../components/home/PlatformArchitecture';
import { AIForBusinessSection } from '../../components/home/AIForBusinessSection';
import { CustomerProofSection } from '../../components/home/CustomerProofSection';
import { IndustriesSection } from '../../components/home/IndustriesSection';
import { AnalystReportSection } from '../../components/home/AnalystReportSection';
import { AgentblazerSection } from '../../components/home/AgentblazerSection';
import { CoreValuesSection } from '../../components/home/CoreValuesSection';
import { AISuccessSection } from '../../components/home/AISuccessSection';
import { GetStartedSection } from '../../components/home/GetStartedSection';
import { FeaturesSection } from '../../components/home/FeaturesSection';
import { useTranslation } from '../../lib/i18n';
import { useSiteContent } from '../../hooks/useSiteContent';
import { SEO } from '../../components/ui/SEO';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { ContentCard } from '../../components/ui/ContentCard';
import { productImages } from '../../lib/cms/cardDefaults';
import { mergeCmsList, mergeMarmidonProductCards, pickCmsField, resolveText } from '../../lib/cms/cmsContent';
import { effectiveCmsText } from '../../lib/cms/cmsDefaults';
import { moduleCardsForHomepage } from '../../lib/marmidonCatalog';
import { DEFAULT_ERP_OVERVIEW_VIDEO, toYouTubeEmbedUrl } from '../../lib/youtube';

const defaultTrustBadges = [
  { id: 'security', icon: '🔒', text: 'Enterprise-grade security' },
  { id: 'modules', icon: '📦', text: '11 integrated ERP modules' },
  { id: 'sectors', icon: '🏭', text: '12 industry configurations' },
  { id: 'support', icon: '🤝', text: 'Local implementation support' },
];

const defaultDemoBullets = [
  { id: 'finance', text: 'Finance, HR, and payroll in one ledger' },
  { id: 'inventory', text: 'Inventory, procurement, and warehouse control' },
  { id: 'sales', text: 'Sales, CRM, and order-to-cash workflows' },
  { id: 'insights', text: 'Real-time dashboards across every module' },
];

const trustedBrands = ['Spotify', 'Toyota', 'Adobe', 'IBM', 'Amazon Web Services', 'Cisco', 'Spotify', 'Toyota', 'Adobe', 'IBM', 'Amazon Web Services', 'Cisco'];

const homepageStatSlots = [
  { value: '11', valueKeys: ['stats_modules'], labelKeys: ['stats_modules_label'], fallbackLabel: 'ERP modules' },
  { value: '12', valueKeys: ['stats_sectors'], labelKeys: ['stats_sectors_label'], fallbackLabel: 'Industry sectors' },
  { value: '99.9%', valueKeys: ['stats_integrations'], labelKeys: ['stats_integrations_label'], fallbackLabel: 'Uptime SLA' },
  { value: '1', valueKeys: ['stats_platform'], labelKeys: ['stats_platform_label'], fallbackLabel: 'Unified platform' },
];

const moduleIconMap: Record<string, LucideIcon> = {
  Landmark, Users, Package, ShoppingCart, TrendingUp, Settings, Truck, Factory, Store, BarChart3, Briefcase,
  Shield, Zap, Globe, Award,
};

const catalogModuleCards = moduleCardsForHomepage().map((card) => ({
  ...card,
  icon: moduleIconMap[card.iconName] || Shield,
  image: productImages[card.id] || card.image,
}));

const productCards = catalogModuleCards;

export function HomePage() {
  const { t } = useTranslation();
  const content = useSiteContent('homepage');
  const global = useSiteContent('global');
  const resolvedTrustedBrands = (content.getContentRaw('trusted_brands') ?? trustedBrands) as typeof trustedBrands;
  const resolvedTrustBadges = mergeCmsList(
    content.getContentRaw('hero_trust_badges') as any[] | null,
    defaultTrustBadges
  );
  const rawProductCards = content.getContentRaw('product_cards') as any[] | null;
  const resolvedProductCards = mergeMarmidonProductCards(rawProductCards, productCards, (card, cms) => ({
    ...card,
    title: pickCmsField(cms?.title, String(card.title)),
    subtitle: pickCmsField(cms?.subtitle, String(card.subtitle)),
    description: pickCmsField(cms?.description, String(card.description)),
    link: pickCmsField(cms?.link, String(card.link)) || card.link,
    image: pickCmsField(cms?.image, String(card.image)),
    iconName: pickCmsField(cms?.iconName, String(card.iconName)),
    color: pickCmsField(cms?.color, String(card.color)),
    icon: moduleIconMap[String(cms?.iconName ?? card.iconName)] || card.icon || Shield,
  }));
  const resolvedDemoBullets = mergeCmsList(
    content.getContentRaw('demo_bullets') as typeof defaultDemoBullets | null,
    defaultDemoBullets
  );
  const videoUrl = content.getContentRaw('video_url') as string | null;
  const defaultVideoUrl = toYouTubeEmbedUrl(DEFAULT_ERP_OVERVIEW_VIDEO) ?? DEFAULT_ERP_OVERVIEW_VIDEO;
  const demoVideoUrl = videoUrl ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1` : `${defaultVideoUrl}?autoplay=1&mute=1`;
  const [searchParams, setSearchParams] = useSearchParams();
  const isDemoOpen = searchParams.get('demo') === '1';

  const closeDemo = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('demo');
    setSearchParams(nextParams, { replace: true });
  };

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const { ref: introRef, isVisible: introVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: productsRef, isVisible: productsVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  /* Counter animation */
  const Counter = ({ value }: { value: string }) => {
    const [count, setCount] = useState(0);
    const num = parseInt(value.replace(/\D/g, ''));
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!visible) return;
      let start = 0;
      const duration = 2000;
      const step = Math.ceil(num / (duration / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= num) { setCount(num); clearInterval(timer); }
        else setCount(start);
      }, 16);
      return () => clearInterval(timer);
    }, [visible, num]);

    return <span ref={ref}>{count.toLocaleString()}{value.replace(/[\d,]/g, '')}</span>;
  };

  return (
    <>
      <SEO
        title={PAGE_META.home.title}
        description={PAGE_META.home.description}
        fullTitle
      />
      {/* ── Premium Hero ── */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04] animate-grid-move" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Blob shapes */}
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-blue-500/5 animate-blob blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-400/5 animate-blob blur-3xl" style={{ animationDelay: '5s' }} />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        {/* Spinning ring */}
        <div className="absolute top-[15%] left-[8%] w-48 h-48 border border-white/[0.06] rounded-full animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/40 rounded-full" />
        </div>
        <div className="absolute top-[15%] left-[8%] w-32 h-32 border border-white/[0.04] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-blue-400/30 rounded-full" />
        </div>

        {/* Orbital ring elements */}
        <div className="absolute top-1/3 right-8 w-32 h-32 border border-white/10 rounded-full animate-orbit" />
        <div className="absolute top-[38%] right-[3.5rem] w-20 h-20 border border-white/10 rounded-full animate-orbit-reverse" />

        {/* Particle dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse-glow"
            style={{
              background: i % 2 === 0 ? 'rgba(0, 163, 224, 0.4)' : 'rgba(255, 255, 255, 0.3)',
              top: `${15 + (i * 7) % 70}%`,
              left: `${5 + (i * 11) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div ref={heroRef} className={`text-white text-center transition-all duration-1000 w-full ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className="flex justify-center mb-6">
              <span className="type-badge type-badge--hero">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {t('homeSectionBadge')}
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>

            <p className="type-eyebrow type-eyebrow--hero">
              {global.getContent('page_eyebrow', 'Marmidon Global Solutions Limited')}
            </p>

            <h1 className="type-display">
              {content.getContent('hero_title', t('heroTitleLine1'))}
              <span className="type-display-accent">
                {content.getContent('hero_subtitle', t('heroTitleLine2'))}
              </span>
            </h1>

            <div className="type-divider" />

            <p className="type-hero-lead mb-10">
              {effectiveCmsText(content.getContentRaw('hero_desc'), 'homepage', 'hero_desc', t('heroDescription'))}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/request-a-demo"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  {content.getContent('hero_cta', 'Request a Demo')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 glass-card rounded-2xl font-bold text-base text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 border border-white/20"
              >
                {content.getContent('hero_cta_secondary', 'Explore modules')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {resolvedTrustBadges.map((b: any) => (
                <div key={b.id ?? b.text} className="flex items-center gap-2 text-white/50 text-sm">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Trusted brands */}
            <div>
              <p className="type-label mb-5">{content.getContent('trusted_by_label', t('trustedBy'))}</p>
              <div className="overflow-hidden">
                <div className="flex gap-10 animate-marquee hover:pause justify-center">
                  {resolvedTrustedBrands.map((brand, i) => (
                    <div key={i} className="flex-shrink-0 text-white/25 font-semibold text-base hover:text-white/55 transition-colors duration-300 cursor-pointer tracking-tight">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-24 sm:h-32">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl animate-scale-in">
            <button
              onClick={closeDemo}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-sm transition hover:bg-white"
              aria-label={t('closeDemoModal')}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] p-6 sm:p-8 lg:p-10">
              <div className="rounded-3xl bg-slate-950 overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={demoVideoUrl}
                    title="Marmidon demo video"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-50 p-6 sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    <Play className="w-4 h-4" />
                    {content.getContent('demo_experience_badge', t('demoExperience'))}
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-900">{content.getContent('demo_title', t('demoTitle'))}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {content.getContent('demo_desc', t('demoDescription'))}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-sm font-semibold text-slate-900">{content.getContent('demo_what_youll_see', t('whatYoullSee'))}</div>
                    <ul className="mt-3 space-y-3 text-sm text-slate-600">
                      {resolvedDemoBullets.map((bullet) => (
                        <li key={bullet.id} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" /> {bullet.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/request-a-demo"
                    onClick={closeDemo}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-secondary)] hover:-translate-y-0.5"
                  >
                    {content.getContent('demo_cta_label', 'Request a Demo')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar — Marmidon metrics (11 modules, 12 sectors, uptime, unified platform) */}
      <section className="bg-white py-16 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none" aria-hidden />
        <div ref={statsRef} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children ${statsVisible ? 'visible' : ''}`}>
            {homepageStatSlots.map((slot, idx) => (
              <div key={slot.valueKeys[0]} className="text-center group">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                  <Counter value={content.getContentAny(slot.valueKeys, slot.value)} />
                </div>
                <div className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {content.getContentAny(slot.labelKeys, slot.fallbackLabel)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Intro */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#f3f3f3' }}>
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(11,83,148,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,163,224,0.06) 0%, transparent 50%)'
        }} />
        <div ref={introRef} className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-6">
            <Sparkles className="w-4 h-4" />
            {content.getContent('platform_intro_badge', 'Integrated ERP')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            {content.getContent('platform_intro_title', 'Run your whole business on one Marmidon platform')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            {content.getContent('platform_intro_desc', 'Eleven integrated modules share one database — so finance, operations, inventory, and sales stay in sync without spreadsheets or duplicate entry.')}
          </p>
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {content.getContent('explore_all_products_label', t('exploreAllProducts'))}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div ref={productsRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {content.getContent('product_section_title', 'Eleven modules. One ERP platform.')}
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">{content.getContent('product_section_desc', 'From finance and HR to inventory, manufacturing, and BI — every module connects on a single platform.')}</p>
              </div>
            </ScrollReveal>
            <div className={`pro-card-grid stagger-children ${productsVisible ? 'visible' : ''}`}>
              {resolvedProductCards.map((card) => (
                <ContentCard
                  key={card.id || card.titleKey}
                  to={card.link}
                  title={card.title || resolveText('', String(card.titleKey ?? ''), t) || t(card.titleKey)}
                  subtitle={card.subtitle || resolveText('', String(card.subtitleKey ?? ''), t) || t(card.subtitleKey)}
                  description={card.description || resolveText('', String(card.descriptionKey ?? ''), t) || t(card.descriptionKey)}
                  image={card.image}
                  imageAlt={card.title || resolveText('', String(card.titleKey ?? ''), t) || t(card.titleKey)}
                  icon={card.icon}
                  iconGradient={card.color}
                  className="animate-card-float"
                />
              ))}
            </div>
        </div>
      </section>

      <FeaturesSection />

      <PlatformArchitecture />

      <CustomerStoriesSection />

      <AIForBusinessSection videoUrl={videoUrl} />

      <CustomerProofSection videoUrl={videoUrl} />

      <IndustriesSection />

      <AnalystReportSection />

      <AgentblazerSection />

      <CoreValuesSection />

      <AISuccessSection />

      <GetStartedSection />

      <FAQSection />
    </>
  );
}
