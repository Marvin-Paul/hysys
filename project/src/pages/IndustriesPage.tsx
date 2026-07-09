import { Link, useParams } from 'react-router-dom';
import { GraduationCap, Landmark, ShoppingCart, ArrowRight, Heart, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { Heart, GraduationCap, Landmark, ShoppingCart };

const industriesData: Record<string, any> = {
  'healthcare':         { icon: Heart,        title: 'Healthcare',         subtitle: 'Patient engagement',  description: 'Transform patient experiences with a unified platform. HYSYS for Healthcare helps providers deliver personalised care while streamlining operations and ensuring compliance.',    features: ['Patient 360 View','Appointment Management','Care Coordination','HIPAA Compliance','Telemedicine Integration','Patient Portal'],       stats: [{ label: 'Healthcare providers', value: '10K+' },{ label: 'Patient satisfaction increase', value: '32%' }], color: 'from-rose-500 to-pink-600',    subtitleKey: 'patientEngagement', titleKey: 'healthcare',       descriptionKey: 'healthcareDesc' },
  'education':          { icon: GraduationCap, title: 'Education',          subtitle: 'Student success',     description: 'Empower students and educators with a connected campus. HYSYS for Education helps institutions manage student relationships from recruitment to graduation.',                    features: ['Student Recruitment','Admissions Management','Student Success Tracking','Alumni Relations','Faculty Collaboration','Financial Aid'],    stats: [{ label: 'Universities',           value: '5,000+' },{ label: 'Students reached', value: '50M+' }],                   color: 'from-amber-500 to-orange-600', subtitleKey: 'studentSuccess',    titleKey: 'education',        descriptionKey: 'educationDesc'  },
  'financial-services': { icon: Landmark,      title: 'Financial Services', subtitle: 'Client relationships',description: 'Build trust and grow your book of business. HYSYS for Financial Services helps advisors deliver personalised experiences while managing compliance.',                         features: ['Client 360 View','Wealth Management','Loan Origination','Compliance & Security','Lead Generation','Portfolio Analytics'],              stats: [{ label: 'Financial institutions', value: '8,000+' },{ label: 'Assets managed', value: '$10T+' }],                    color: 'from-blue-600 to-indigo-700', subtitleKey: 'clientRelationships',titleKey: 'financialServices',descriptionKey: 'financialDesc'  },
  'retail':             { icon: ShoppingCart,  title: 'Retail',             subtitle: 'Customer experience', description: 'Create memorable shopping experiences across channels. HYSYS for Retail helps you understand customers and deliver personalised experiences at every touchpoint.',              features: ['Unified Commerce','Customer Loyalty','Inventory Management','Personalization','Omnichannel Support','Demand Forecasting'],               stats: [{ label: 'Retailers',              value: '25K+' }, { label: 'Increase in repeat customers', value: '45%' }],          color: 'from-emerald-500 to-teal-600',subtitleKey: 'customerExperience', titleKey: 'retail',           descriptionKey: 'retailDesc'     },
};

/* ── Industries List ── */
export function IndustriesPage() {
  const { t } = useTranslation();
  const content = useSiteContent('industries');
  const rawIndustries = content.getContentRaw('industries_list') as any[] | null;
  const toArray = (v: any) => typeof v === 'string' ? v.split(',').map((s: string) => s.trim()).filter(Boolean) : (Array.isArray(v) ? v : []);
  const resolvedData: Record<string, any> = rawIndustries
    ? Object.fromEntries(rawIndustries.map((p: any) => [p.key, { ...p, features: toArray(p.features), icon: iconMap[p.iconName] || Heart }]))
    : industriesData;

  return (
    <div className="pt-16">
      <SEO title="Industries" />

      <section className="products-hero">
        <div className="products-container">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-6">
            <Sparkles className="w-4 h-4" /> Industry Solutions
          </span>
          <h1>{content.getContent('industriesTitle', t('industriesTitle'))}</h1>
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-[#0a2540] leading-8">
            {content.getContent('industriesDesc', t('industriesDesc'))}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/industries" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
              Explore Industries
            </Link>
          </div>
        </div>
      </section>

      <section className="products-catalog">
        <div className="products-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Industries We Serve
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">Purpose-built for your sector</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Tailored solutions that understand the unique challenges of your industry.</p>
            </div>
          </ScrollReveal>

          <div className="product-grid">
            {Object.entries(resolvedData).map(([key, industry]) => (
              <ScrollReveal key={key}>
                <Link to={`/industries/${key}`} className="product-card group">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t(industry.subtitleKey)}</div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">{t(industry.titleKey)}</h3>
                      <p className="text-gray-500 mb-4 text-sm leading-relaxed line-clamp-2">{t(industry.descriptionKey)}</p>
                      <div className="flex gap-4 mb-4 flex-wrap">
                        {industry.stats.map((stat: any, si: number) => (
                          <div key={si} className="bg-gray-50 rounded-xl px-3 py-2">
                            <div className="text-sm font-extrabold text-[var(--color-primary)]">{stat.value}</div>
                            <div className="text-[10px] text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                        Learn more <ArrowRight className="w-4 h-4" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Don't see your industry?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">HYSYS adapts to any sector. Talk to our team for a custom solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Contact Us <ArrowRight className="w-5 h-5" />
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

/* ── Industry Detail ── */
export function IndustryDetailPage() {
  const { t } = useTranslation();
  const content = useSiteContent('industries');
  const { industryId } = useParams<{ industryId: string }>();
  const rawIndustriesDetail = content.getContentRaw('industries_list') as any[] | null;
  const industry = rawIndustriesDetail
    ? Object.fromEntries(rawIndustriesDetail.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Heart }]))[industryId || '']
    : industriesData[industryId || ''];

  if (!industry) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('industryNotFound')}</h1>
          <Link to="/industries" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllIndustries')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={industry.title} />

      <PageHero
        badge={t(industry.subtitleKey)}
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title={t(industry.titleKey)}
        subtitle="by HYSYS"
        description={industry.description}
        primaryCta={{ label: t('getIndustrySolution'), to: '/register' }}
        secondaryCta={{ label: t('contactSales'), to: '/contact' }}
      />

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready for {industry.title}?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Start your free 14-day trial. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/industries" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                View All Industries
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
