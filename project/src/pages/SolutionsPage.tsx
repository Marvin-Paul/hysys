import { Link, useParams } from 'react-router-dom';
import { Building2, TrendingUp, Sparkles, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { Building2, TrendingUp, Sparkles, Heart };

const solutionsData: Record<string, any> = {
  'small-business': { icon: Building2, title: 'Small Business', subtitle: 'Grow faster',       description: 'HYSYS helps small businesses build stronger customer relationships. Get started quickly with easy-to-use tools designed for growing teams.',           features: ['Contact & Lead Management','Email Templates & Tracking','Mobile App Access','Reports & Dashboards','Task & Activity Management','Basic Automation'],                    benefits: ['Close deals faster','Build lasting relationships','Scale operations easily','Affordable pricing'],     color: 'from-blue-500 to-blue-700',   subtitleKey: 'growFaster',       titleKey: 'smallBusiness',          descriptionKey: 'smallBizDesc'             },
  'enterprise':     { icon: TrendingUp, title: 'Enterprise',    subtitle: 'Scale operations', description: "The world's most customizable and secure CRM. Enterprise organizations trust HYSYS to manage millions of customers and complex global operations.", features: ['Advanced Security & Compliance','Custom Development','API Access','Advanced Analytics','Multi-org Management','Dedicated Support'],                          benefits: ['Unlimited customization','Enterprise-grade security','Global scalability','24/7 premium support'], color: 'from-violet-600 to-purple-700',subtitleKey: 'scaleOperations',  titleKey: 'enterprise',             descriptionKey: 'enterpriseSolutionDesc'   },
  'startups':       { icon: Sparkles,   title: 'Startups',      subtitle: 'Launch strong',    description: 'Get your startup off the ground with a platform that grows with you. HYSYS helps startups build customer relationships from day one.',              features: ['Startup Pricing Programs','Fast Implementation','Scalable Infrastructure','Investor Reporting','Growth Analytics','Integration Ecosystem'],                   benefits: ['Launch quickly','Scale without limits','Attract investors','Build from day one'],               color: 'from-amber-500 to-orange-600',  subtitleKey: 'launchStrong',     titleKey: 'startups',               descriptionKey: 'startupsDesc'             },
  'nonprofits':     { icon: Heart,      title: 'Nonprofits',    subtitle: 'Amplify impact',   description: 'Purpose-built for nonprofits. HYSYS helps organizations manage donors, volunteers, and programs efficiently. Special pricing available.',            features: ['Donor Management','Volunteer Coordination','Program Tracking','Grant Management','Impact Measurement','Special Nonprofit Pricing'],                       benefits: ['Increase donations','Engage volunteers','Track impact','Special discounts'],                    color: 'from-rose-500 to-pink-600',     subtitleKey: 'amplifyImpact',    titleKey: 'nonprofits',             descriptionKey: 'nonprofitsDesc'           },
};

/* ── Hero background (reusable) ── */
function Hero({ badge, title, subtitle, desc }: { badge: string; title: string; subtitle: string; desc: string }) {
  return (
    <section className="relative min-h-[60vh] overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse" style={{
          background: i % 2 === 0 ? 'rgba(0,163,224,0.4)' : 'rgba(255,255,255,0.3)',
          top: `${20+(i*9)%60}%`, left: `${5+(i*13)%90}%`, animationDelay: `${i*0.5}s`,
        }} />
      ))}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 text-white">
              <Sparkles className="w-4 h-4 text-cyan-300" />{badge}
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">HYSYS GLOBAL SOLUTIONS LIMITED</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
            {title}
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-2">{subtitle}</span>
          </h1>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
          </div>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">{desc}</p>
        </ScrollReveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ── Solutions List ── */
export function SolutionsPage() {
  const { t } = useTranslation();
  const content = useSiteContent('solutions');
  const rawSolutions = content.getContentRaw('solutions_list') as any[] | null;
  const resolvedData: Record<string, any> = rawSolutions
    ? Object.fromEntries(rawSolutions.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Heart }]))
    : solutionsData;

  return (
    <div className="pt-16">
      <SEO title="Solutions" />
      <Hero badge="Solutions for Every Business" title={content.getContent('solutionsTitle', t('solutionsTitle'))} subtitle="Tailored for You" desc={content.getContent('solutionsDesc', t('solutionsDesc'))} />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Choose Your Path
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">Solutions built for your needs</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Whether you're a startup or an enterprise, HYSYS has the right solution for you.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {Object.entries(resolvedData).map(([key, solution]) => (
              <ScrollReveal key={key}>
                <Link to={`/solutions/${key}`} className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden block">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t(solution.subtitleKey)}</div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#0b5394] transition-colors">{t(solution.titleKey)}</h3>
                      <p className="text-gray-500 mb-4 text-sm leading-relaxed">{t(solution.descriptionKey)}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b5394] group-hover:text-[#032d60] transition-colors">
                        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Not sure which solution fits?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Our team will help you find the perfect fit for your business size and goals.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Talk to Sales <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                Start Free Trial
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

/* ── Solution Detail ── */
export function SolutionDetailPage() {
  const { t } = useTranslation();
  const content = useSiteContent('solutions');
  const { solutionId } = useParams<{ solutionId: string }>();
  const rawSolutionsDetail = content.getContentRaw('solutions_list') as any[] | null;
  const solution = rawSolutionsDetail
    ? Object.fromEntries(rawSolutionsDetail.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Heart }]))[solutionId || '']
    : solutionsData[solutionId || ''];

  if (!solution) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('solutionNotFound')}</h1>
          <Link to="/solutions" className="text-[#0b5394] font-semibold hover:underline">{t('viewAllSolutions')}</Link>
        </div>
      </div>
    );
  }

  const Icon = solution.icon;

  return (
    <div className="pt-16">
      <SEO title={solution.title} />

      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="left">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 uppercase tracking-wider text-cyan-300 mb-5">
                  {t(solution.subtitleKey)}
                </span>
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
                  {solution.title}
                  <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-1 text-4xl sm:text-5xl">
                    by HYSYS
                  </span>
                </h1>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-300 mb-6" />
                <p className="text-lg text-white/70 mb-10 leading-relaxed font-light max-w-lg">{solution.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    {t('getStarted')} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                    Talk to Sales
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className={`absolute -inset-8 bg-gradient-to-br ${solution.color} opacity-20 rounded-[50px] blur-2xl`} />
                  <div className={`relative w-72 h-72 rounded-[40px] bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-2xl`}>
                    <Icon className="w-36 h-36 text-white" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features + Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Features */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-5">
                  <Sparkles className="w-4 h-4" /> Key Features
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#032d60] mb-8">{t('keyFeaturesTitle')}</h2>
              </ScrollReveal>
              <div className="space-y-4 stagger-children">
                {solution.features.map((feature: string, idx: number) => (
                  <ScrollReveal key={idx}>
                    <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-gray-100">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{feature}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-sm font-semibold text-emerald-700 mb-5">
                  ✦ Benefits
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#032d60] mb-8">{t('benefitsTitle')}</h2>
              </ScrollReveal>
              <div className="space-y-4 stagger-children">
                {solution.benefits.map((benefit: string, idx: number) => (
                  <ScrollReveal key={idx}>
                    <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#0b5394]/5 to-transparent rounded-2xl hover:from-[#0b5394]/10 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#0b5394]/10">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to {solution.title}?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Start your free 14-day trial today. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {t('getStarted')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                View All Solutions
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
