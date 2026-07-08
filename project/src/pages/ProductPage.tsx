import { Link, useParams } from 'react-router-dom';
import { Users, BarChart3, Shield, Zap, Cloud, ShoppingCart, ArrowRight, CheckCircle, Play, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { Users, Zap, BarChart3, Shield, ShoppingCart, Cloud };

const productData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[]; cta: string; color: string; titleKey: string; subtitleKey: string; ctaKey: string; bgColor: string }> = {
  'sales-cloud':    { icon: Users,       title: 'Sales Cloud',    subtitle: 'CRM Platform',      description: "Drive revenue growth with the world's #1 CRM. Sales Cloud helps your team close more deals, accelerate productivity, and build lasting customer relationships with AI-powered insights.",   features: ['Lead & Opportunity Management','Sales Forecasting & Analytics','Workflow Automation','Mobile CRM Access','Contact & Account Management','Email Integration'], cta: 'Start Selling Smarter',   color: 'from-blue-500 to-blue-700',     bgColor: 'bg-blue-50',   titleKey: 'salesCloud',    subtitleKey: 'crmPlatform',          ctaKey: 'startSellingSmarter' },
  'service-cloud':  { icon: BarChart3,   title: 'Service Cloud',  subtitle: 'Customer Service',  description: 'Deliver exceptional customer service with a unified platform. Service Cloud connects your support team across channels and empowers them with AI-powered recommendations.',                    features: ['Omnichannel Support','Case Management','Knowledge Base','AI-Powered Chatbots','Service Analytics','Field Service Management'],                                           cta: 'Transform Your Service', color: 'from-cyan-500 to-teal-600',   bgColor: 'bg-cyan-50',   titleKey: 'serviceCloud',  subtitleKey: 'customerServiceLabel', ctaKey: 'transformService'     },
  'marketing-cloud':{ icon: Zap,         title: 'Marketing Cloud',subtitle: 'Digital Marketing', description: 'Create personalized customer journeys across every channel. Marketing Cloud helps you connect with customers in new ways, delivering the right message every time.',                           features: ['Email Marketing','Journey Builder','Social Media Marketing','Advertising Studio','Data Studio','Content Management'],                                                        cta: 'Start Marketing Smarter',color: 'from-green-500 to-emerald-600',bgColor: 'bg-green-50', titleKey: 'marketingCloud',subtitleKey: 'digitalMarketingLabel',ctaKey: 'startMarketingSmarter'},
  'commerce-cloud': { icon: ShoppingCart,title: 'Commerce Cloud', subtitle: 'E-Commerce',        description: 'Build seamless shopping experiences across digital and physical channels. Commerce Cloud helps you convert browsers into buyers with AI-powered personalization.',                              features: ['B2C Commerce','B2B Commerce','Order Management','AI-Powered Search','Headless Commerce','Marketplace Integration'],                                                           cta: 'Launch Your Store',      color: 'from-orange-500 to-red-500',   bgColor: 'bg-orange-50',titleKey: 'commerceCloud', subtitleKey: 'eCommerceLabel',       ctaKey: 'launchStore'          },
  'data-cloud':     { icon: Cloud,       title: 'Data Cloud',     subtitle: 'Data Platform',     description: 'Unify your customer data across all sources. Data Cloud provides real-time insights and enables hyper-personalized experiences with a complete view of every customer.',                       features: ['Real-Time Data Activation','Customer 360 Profiles','Data Harmonization','AI-Powered Insights','Privacy & Compliance','Data Streams'],                                        cta: 'Unlock Your Data',       color: 'from-indigo-500 to-purple-600',bgColor: 'bg-indigo-50',titleKey: 'dataCloud',     subtitleKey: 'dataPlatform',         ctaKey: 'unlockData'           },
  'platform-cloud': { icon: Shield,      title: 'Platform Cloud', subtitle: 'Admin & Automation',description: 'Configure custom objects, secure access, automate workflows, connect external systems, and govern CRM data from one administration layer.',                                                    features: ['Custom Objects & Layouts','Flow Automation','Roles & Permission Sets','Integration Hub','Audit Trail','Data Quality Rules'],                                                  cta: 'Build Your Platform',    color: 'from-slate-600 to-cyan-600',   bgColor: 'bg-slate-50', titleKey: 'platformCloud', subtitleKey: 'adminAutomation',      ctaKey: 'buildPlatform'        },
};

/* ── Shared hero background ─────────────────────────────────────────────── */
function HeroBackground({ children }: { children: React.ReactNode }) {
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
          top: `${20 + (i * 9) % 60}%`, left: `${5 + (i * 13) % 90}%`,
          animationDelay: `${i * 0.5}s`,
        }} />
      ))}
      {children}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ── Products List Page ─────────────────────────────────────────────────── */
export function ProductsPage() {
  const { t } = useTranslation();
  const content = useSiteContent('products');
  const rawProducts = content.getContentRaw('products_list') as any[] | null;
  const resolvedProductData: Record<string, any> = rawProducts
    ? Object.fromEntries(rawProducts.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Shield }]))
    : productData;

  return (
    <div className="pt-16">
      <SEO title="Products" description="Cloud Products - CRM, Sales, Service, Marketing" />

      <HeroBackground>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 text-white">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                The Complete Product Suite
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">HYSYS GLOBAL SOLUTIONS LIMITED</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {content.getContent('productsTitle', t('productsTitle'))}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-2">
                Built for Growth
              </span>
            </h1>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
            </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              {content.getContent('productsDesc', t('productsDesc'))}
            </p>
          </ScrollReveal>
        </div>
      </HeroBackground>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">Everything you need to grow</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Six powerful clouds. One unified platform.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {Object.entries(resolvedProductData).map(([key, product]) => (
              <ScrollReveal key={key}>
                <Link to={`/products/${key}`} className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden block">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${product.bgColor}`} />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${product.color}" style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t(product.subtitleKey)}</div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#0b5394] transition-colors">{t(product.titleKey)}</h3>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-2">{product.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b5394] group-hover:text-[#032d60] transition-colors">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Try any HYSYS product free for 14 days. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

/* ── Product Detail Page ─────────────────────────────────────────────────── */
export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { t } = useTranslation();
  const content = useSiteContent('products');
  const rawProducts = content.getContentRaw('products_list') as any[] | null;
  const product = rawProducts
    ? Object.fromEntries(rawProducts.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Shield }]))[productId || '']
    : productData[productId || ''];

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('productNotFound')}</h1>
          <Link to="/products" className="text-[#0b5394] font-semibold hover:underline">{t('viewAllProducts')}</Link>
        </div>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="pt-16">
      <SEO title={product.title} description={product.description} />

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
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 uppercase tracking-wider text-cyan-300">
                    {t(product.subtitleKey)}
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
                  {t(product.titleKey)}
                  <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-1 text-4xl sm:text-5xl">
                    by HYSYS
                  </span>
                </h1>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-300 mb-6" />
                <p className="text-lg text-white/70 mb-10 leading-relaxed font-light max-w-lg">{product.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    {t(product.ctaKey)} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                    <Play className="w-5 h-5" /> Watch Demo
                  </button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className={`absolute -inset-8 bg-gradient-to-br ${product.color} opacity-20 rounded-[50px] blur-2xl`} />
                  <div className={`relative w-72 h-72 rounded-[40px] bg-gradient-to-br ${product.color} flex items-center justify-center shadow-2xl`}>
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

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Key Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">{t('keyFeatures')}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need, right out of the box.</p>
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

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('readyToGetStarted')}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">{t('joinThousands')} {t(product.titleKey)}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {t('startFreeTrialBtn')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                View All Products
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
