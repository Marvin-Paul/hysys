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
  CheckCircle2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ScrollReveal } from '../components/ScrollReveal';
import { CustomerStoriesSection } from '../components/CustomerStoriesSection';
import { FAQSection } from '../components/FAQSection';
import { PlatformArchitecture } from '../components/PlatformArchitecture';
import { AIForBusinessSection } from '../components/AIForBusinessSection';
import { AgentforceStatsSection } from '../components/AgentforceStatsSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { AnalystReportSection } from '../components/AnalystReportSection';
import { AgentblazerSection } from '../components/AgentblazerSection';
import { CoreValuesSection } from '../components/CoreValuesSection';
import { AISuccessSection } from '../components/AISuccessSection';
import { GetStartedSection } from '../components/GetStartedSection';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const trustedBrands = ['Spotify', 'Toyota', 'Adobe', 'IBM', 'Amazon Web Services', 'Cisco', 'Spotify', 'Toyota', 'Adobe', 'IBM', 'Amazon Web Services', 'Cisco'];

const stats = [
  { value: '150K+', labelKey: 'companiesTrustUs' },
  { value: '99.9%', labelKey: 'uptimeSLA' },
  { value: '40M+', labelKey: 'activeUsers' },
  { value: '60+', labelKey: 'countries' },
];

const productCards = [
  { icon: Users, titleKey: 'salesCloud', subtitleKey: 'crmPlatform', descriptionKey: 'salesCloudDesc', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50', link: '/products/sales-cloud', gradient: 'from-blue-400 to-cyan-400' },
  { icon: BarChart3, titleKey: 'serviceCloud', subtitleKey: 'customerService', descriptionKey: 'serviceCloudDesc', color: 'from-cyan-500 to-teal-600', bgColor: 'bg-cyan-50', link: '/products/service-cloud', gradient: 'from-cyan-400 to-teal-400' },
  { icon: Zap, titleKey: 'marketingCloud', subtitleKey: 'digitalMarketing', descriptionKey: 'marketingCloudDesc', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', link: '/products/marketing-cloud', gradient: 'from-green-400 to-emerald-400' },
  { icon: Shield, titleKey: 'commerceCloud', subtitleKey: 'eCommerce', descriptionKey: 'commerceCloudDesc', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', link: '/products/commerce-cloud', gradient: 'from-orange-400 to-red-400' },
];

const iconMap: Record<string, LucideIcon> = {
  Users, Zap, BarChart3, Shield, Globe, Award,
};

export function HomePage() {
  const { t } = useTranslation();
  const content = useSiteContent('homepage');
  const resolvedTrustedBrands = (content.getContentRaw('trusted_brands') ?? trustedBrands) as typeof trustedBrands;
  const resolvedStats = (content.getContentRaw('stats') ?? stats) as typeof stats;
  const rawProductCards = content.getContentRaw('product_cards') as any[] | null;
  const resolvedProductCards = rawProductCards
    ? rawProductCards.map((p: any) => ({ ...p, icon: iconMap[p.iconName] || Shield }))
    : productCards;
  const videoUrl = content.getContentRaw('video_url') as string | null;
  const defaultVideoUrl = 'https://www.youtube.com/embed/ScMzIvxBSi4';
  const demoVideoUrl = videoUrl ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1` : `${defaultVideoUrl}?autoplay=1&mute=1`;
  const [searchParams, setSearchParams] = useSearchParams();
  const isDemoOpen = searchParams.get('demo') === '1';

  const openDemo = () => setSearchParams({ demo: '1' });
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
      <SEO title="Home" />
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

            {/* Badge */}
            <div className="flex justify-center mb-7">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 shadow-lg tracking-wide">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {t('homeSectionBadge')}
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>

            {/* Eyebrow line */}
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
              HYSYS GLOBAL SOLUTIONS LIMITED
            </p>

            {/* Main headline — centered, large */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-5 tracking-tight">
              {content.getContent('hero_title', t('heroTitleLine1'))}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent animate-gradient-shift mt-1">
                {content.getContent('hero_subtitle', t('heroTitleLine2'))}
              </span>
            </h1>

            {/* Accent divider */}
            <div className="flex justify-center mb-7">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              {t('heroDescription')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  {content.getContent('hero_cta', t('startFreeTrial'))}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button
                type="button"
                onClick={openDemo}
                className="group inline-flex items-center justify-center gap-2 px-10 py-4 glass-card rounded-2xl font-bold text-base text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 border border-white/20"
              >
                <Play className="w-5 h-5" />
                {content.getContent('hero_cta_secondary', t('watchDemo'))}
              </button>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: '🔒', text: 'Enterprise-grade security' },
                { icon: '⚡', text: 'Setup in under 5 minutes' },
                { icon: '🌍', text: 'Used in 60+ countries' },
                { icon: '🆓', text: 'Free 14-day trial' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-white/50 text-sm">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Trusted brands */}
            <div>
              <p className="text-xs text-white/30 uppercase tracking-[0.25em] mb-5">{t('trustedBy')}</p>
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
                    title="HYSYS demo video"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-50 p-6 sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    <Play className="w-4 h-4" />
                    {t('demoExperience')}
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-900">{t('demoTitle')}</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {t('demoDescription')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-sm font-semibold text-slate-900">{t('whatYoullSee')}</div>
                    <ul className="mt-3 space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t('demoBulletPipeline')}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t('demoBulletService')}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t('demoBulletMarketing')}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t('demoBulletAnalytics')}</li>
                    </ul>
                  </div>

                  <Link
                    to="/register"
                    onClick={closeDemo}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-secondary)] hover:-translate-y-0.5"
                  >
                    {t('demoStartTrial')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <section className="bg-white py-16 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent" />
        <div ref={statsRef} className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children ${statsVisible ? 'visible' : ''}`}>
            {resolvedStats.map((stat, idx) => {
              const statValueKeys = ['stats_companies', 'stats_integrations', 'stats_users', 'stats_countries'];
              const statLabelKeys = ['stats_companies_label', 'stats_integrations_label', 'stats_users_label', 'stats_countries_label'];
              return (
                <div key={idx} className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Counter value={content.getContent(statValueKeys[idx], stat.value)} />
                  </div>
                  <div className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">{content.getContent(statLabelKeys[idx], t(stat.labelKey))}</div>
                </div>
              );
            })}
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
            {t('platformIntroBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            {t('platformIntroTitle')}{' '}
            <span className="gradient-text">Agentic Enterprise</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            {t('platformIntroDesc')}
          </p>
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {t('exploreAllProducts')}
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
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('completeSuiteTitle')} <span className="gradient-text">{t('completeSuiteTitleHighlight')}</span></h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('completeSuiteDesc')}</p>
              </div>
            </ScrollReveal>
            <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${productsVisible ? 'visible' : ''}`}>
              {resolvedProductCards.map((card, idx) => (
                <Link key={idx} to={card.link} className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden animate-card-float" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${card.bgColor}`} />
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-3xl p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${card.color.split(' ')[0].replace('from-', '')}, ${card.color.split(' ')[1].replace('to-', '')})` }}>
                    <div className="w-full h-full rounded-[23px] bg-white" />
                  </div>
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t(card.subtitleKey)}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{t(card.titleKey)}</h3>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">{t(card.descriptionKey)}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                      {t('learnMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </section>

      <PlatformArchitecture />

      <CustomerStoriesSection />

      <AIForBusinessSection videoUrl={videoUrl} />

      <AgentforceStatsSection videoUrl={videoUrl} />

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
