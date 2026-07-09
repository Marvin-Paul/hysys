import { Link, useParams } from 'react-router-dom';
import { Users, BarChart3, Shield, Zap, Cloud, ShoppingCart, ArrowRight, CheckCircle, Sparkles, Globe, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { Users, Zap, BarChart3, Shield, ShoppingCart, Cloud, Globe, Award };

const productData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[]; cta: string; color: string; titleKey: string; subtitleKey: string; ctaKey: string; bgColor: string }> = {
  'sales-cloud':    { icon: Users,       title: 'Sales Cloud',    subtitle: 'CRM Platform',      description: "Drive revenue growth with the world's #1 CRM. Sales Cloud helps your team close more deals, accelerate productivity, and build lasting customer relationships with AI-powered insights.",   features: ['Lead & Opportunity Management','Sales Forecasting & Analytics','Workflow Automation','Mobile CRM Access','Contact & Account Management','Email Integration'], cta: 'Start Selling Smarter',   color: 'from-blue-500 to-blue-700',     bgColor: 'bg-blue-50',   titleKey: 'salesCloud',    subtitleKey: 'crmPlatform',          ctaKey: 'startSellingSmarter' },
  'service-cloud':  { icon: BarChart3,   title: 'Service Cloud',  subtitle: 'Customer Service',  description: 'Deliver exceptional customer service with a unified platform. Service Cloud connects your support team across channels and empowers them with AI-powered recommendations.',                    features: ['Omnichannel Support','Case Management','Knowledge Base','AI-Powered Chatbots','Service Analytics','Field Service Management'],                                           cta: 'Transform Your Service', color: 'from-cyan-500 to-teal-600',   bgColor: 'bg-cyan-50',   titleKey: 'serviceCloud',  subtitleKey: 'customerServiceLabel', ctaKey: 'transformService'     },
  'marketing-cloud':{ icon: Zap,         title: 'Marketing Cloud',subtitle: 'Digital Marketing', description: 'Create personalized customer journeys across every channel. Marketing Cloud helps you connect with customers in new ways, delivering the right message every time.',                           features: ['Email Marketing','Journey Builder','Social Media Marketing','Advertising Studio','Data Studio','Content Management'],                                                        cta: 'Start Marketing Smarter',color: 'from-green-500 to-emerald-600',bgColor: 'bg-green-50', titleKey: 'marketingCloud',subtitleKey: 'digitalMarketingLabel',ctaKey: 'startMarketingSmarter'},
  'commerce-cloud': { icon: ShoppingCart,title: 'Commerce Cloud', subtitle: 'E-Commerce',        description: 'Build seamless shopping experiences across digital and physical channels. Commerce Cloud helps you convert browsers into buyers with AI-powered personalization.',                              features: ['B2C Commerce','B2B Commerce','Order Management','AI-Powered Search','Headless Commerce','Marketplace Integration'],                                                           cta: 'Launch Your Store',      color: 'from-orange-500 to-red-500',   bgColor: 'bg-orange-50',titleKey: 'commerceCloud', subtitleKey: 'eCommerceLabel',       ctaKey: 'launchStore'          },
  'data-cloud':     { icon: Cloud,       title: 'Data Cloud',     subtitle: 'Data Platform',     description: 'Unify your customer data across all sources. Data Cloud provides real-time insights and enables hyper-personalized experiences with a complete view of every customer.',                       features: ['Real-Time Data Activation','Customer 360 Profiles','Data Harmonization','AI-Powered Insights','Privacy & Compliance','Data Streams'],                                        cta: 'Unlock Your Data',       color: 'from-indigo-500 to-purple-600',bgColor: 'bg-indigo-50',titleKey: 'dataCloud',     subtitleKey: 'dataPlatform',         ctaKey: 'unlockData'           },
  'platform-cloud': { icon: Shield,      title: 'Platform Cloud', subtitle: 'Admin & Automation',description: 'Configure custom objects, secure access, automate workflows, connect external systems, and govern CRM data from one administration layer.',                                                    features: ['Custom Objects & Layouts','Flow Automation','Roles & Permission Sets','Integration Hub','Audit Trail','Data Quality Rules'],                                                  cta: 'Build Your Platform',    color: 'from-slate-600 to-cyan-600',   bgColor: 'bg-slate-50', titleKey: 'platformCloud', subtitleKey: 'adminAutomation',      ctaKey: 'buildPlatform'        },
};

/* ── Products List Page ─────────────────────────────────────────────────── */
export function ProductsPage() {
  const { t } = useTranslation();
  const content = useSiteContent('products');
  const homepageContent = useSiteContent('homepage');
  const rawProducts = content.getContentRaw('products_list') as any[] | null;
  const toArray = (v: any) => typeof v === 'string' ? v.split(',').map((s: string) => s.trim()).filter(Boolean) : (Array.isArray(v) ? v : []);
  const resolvedProductData: Record<string, any> = rawProducts
    ? Object.fromEntries(rawProducts.map((p: any) => [p.key, { ...p, features: toArray(p.features), icon: iconMap[p.iconName] || Shield }]))
    : productData;
  const rawProductCards = homepageContent.getContentRaw('product_cards') as any[] | null;
  const resolvedProductCards = rawProductCards
    ? rawProductCards.map((p: any) => ({ ...p, icon: iconMap[p.iconName] || Shield }))
    : [];

  return (
    <div className="pt-16">
      <SEO title="Products" description="Cloud Products - CRM, Sales, Service, Marketing" />

      <section className="products-hero">
        <div className="products-container">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-6">
            <Sparkles className="w-4 h-4" /> The Complete Product Suite
          </span>
          <h1>{content.getContent('productsTitle', t('productsTitle'))}</h1>
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-[#0a2540] leading-8">
            {content.getContent('productsDesc', t('productsDesc'))}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <section className="products-catalog">
        <div className="products-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">Everything you need to grow</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Six powerful clouds. One unified platform.</p>
            </div>
          </ScrollReveal>
          <div className="product-grid">
            {Object.entries(resolvedProductData).map(([key, product]) => (
              <ScrollReveal key={key}>
                <Link to={`/products/${key}`} className="product-card group">
                  <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${product.bgColor || 'bg-blue-50'}`} />
                    <div className="absolute inset-0 rounded-3xl p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${product.color?.split(' ')[0]?.replace('from-', '') || ''}, ${product.color?.split(' ')[1]?.replace('to-', '') || ''})` }}>
                      <div className="w-full h-full rounded-[23px] bg-white" />
                    </div>
                    {product.image ? (
                      <div className="w-full aspect-video overflow-hidden bg-gray-50">
                        <img src={product.image} alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : null}
                    <div className="relative p-6">
                      {!product.image && (
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                          <product.icon className="w-7 h-7 text-white" />
                        </div>
                      )}
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{t(product.subtitleKey)}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{t(product.titleKey)}</h3>
                      <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                        Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {resolvedProductCards.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                  <Sparkles className="w-4 h-4" /> Product Suite
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything you need <span className="gradient-text">to grow</span></h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">Explore our complete range of products and solutions.</p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {resolvedProductCards.map((card, idx) => (
                <ScrollReveal key={idx}>
                  <Link to={card.link} className="group block bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${card.bgColor}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                    <div className="absolute inset-0 rounded-3xl p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${card.color?.split(' ')[0]?.replace('from-', '') || ''}, ${card.color?.split(' ')[1]?.replace('to-', '') || ''})` }}>
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
                        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="products-spotlight">
        <div className="products-container">
          <div className="spotlight-flex">
            <div className="spotlight-text">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Spotlight
              </span>
              <h2 className="text-4xl font-extrabold text-[#0a2540] mb-6">A radiant showcase for your growth engine</h2>
              <p className="text-gray-600 max-w-xl leading-relaxed mb-8">
                Highlight a product experience with an elegant radial glow, premium spacing, and a calm interface that feels polished and modern.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#08407a]">
                  Start Free Trial
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
                  Contact Sales
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
                    <p className="text-sm text-gray-500 uppercase tracking-[0.18em] mb-1">Featured product</p>
                    <h3 className="text-2xl font-semibold text-[var(--color-secondary)]">Marketing Cloud</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Deliver personalized customer journeys with real-time campaign orchestration, analytics, and automation.
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">Key benefit</p>
                    <p className="text-gray-600 text-sm">Build campaigns faster with AI-driven audience segmentation.</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">Why it matters</p>
                    <p className="text-gray-600 text-sm">Help teams convert more customers while keeping campaigns aligned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Try any HYSYS product free for 14 days. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
          <Link to="/products" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllProducts')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={product.title} description={product.description} />

      <PageHero
        badge={t(product.subtitleKey)}
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title={t(product.titleKey)}
        subtitle="by HYSYS"
        description={product.description}
        primaryCta={{ label: t(product.ctaKey), to: '/register' }}
        secondaryCta={{ label: t('viewAllProducts'), to: '/products' }}
      />

      {product.image && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img src={product.image} alt={product.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Key Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{t('keyFeatures')}</h2>
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('readyToGetStarted')}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">{t('joinThousands')} {t(product.titleKey)}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
