import { Link, useParams } from 'react-router-dom';
import { GraduationCap, Landmark, ShoppingCart, ArrowRight, CheckCircle, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = {
  Heart, GraduationCap, Landmark, ShoppingCart,
};

const industriesData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[]; stats: { label: string; value: string }[]; subtitleKey: string; titleKey: string; descriptionKey: string }> = {
  'healthcare': { icon: Heart, title: 'Healthcare', subtitle: 'Patient engagement', description: 'Transform patient experiences with a unified platform. HYSYS GLOBAL SOLUTIONS LIMITED for Healthcare helps providers deliver personalized care while streamlining operations and ensuring compliance.', features: ['Patient 360 View', 'Appointment Management', 'Care Coordination', 'HIPAA Compliance', 'Telemedicine Integration', 'Patient Portal'], stats: [{ label: 'Healthcare providers', value: '10K+' }, { label: 'Patient satisfaction increase', value: '32%' }], subtitleKey: 'patientEngagement', titleKey: 'healthcare', descriptionKey: 'healthcareDesc' },
  'education': { icon: GraduationCap, title: 'Education', subtitle: 'Student success', description: 'Empower students and educators with a connected campus. HYSYS GLOBAL SOLUTIONS LIMITED for Education helps institutions manage student relationships from recruitment to graduation.', features: ['Student Recruitment', 'Admissions Management', 'Student Success Tracking', 'Alumni Relations', 'Faculty Collaboration', 'Financial Aid'], stats: [{ label: 'Universities', value: '5,000+' }, { label: 'Students reached', value: '50M+' }], subtitleKey: 'studentSuccess', titleKey: 'education', descriptionKey: 'educationDesc' },
  'financial-services': { icon: Landmark, title: 'Financial Services', subtitle: 'Client relationships', description: 'Build trust and grow your book of business. HYSYS GLOBAL SOLUTIONS LIMITED for Financial Services helps advisors deliver personalized experiences while managing compliance.', features: ['Client 360 View', 'Wealth Management', 'Loan Origination', 'Compliance & Security', 'Lead Generation', 'Portfolio Analytics'], stats: [{ label: 'Financial institutions', value: '8,000+' }, { label: 'Assets managed', value: '$10T+' }], subtitleKey: 'clientRelationships', titleKey: 'financialServices', descriptionKey: 'financialDesc' },
  'retail': { icon: ShoppingCart, title: 'Retail', subtitle: 'Customer experience', description: 'Create memorable shopping experiences across channels. HYSYS GLOBAL SOLUTIONS LIMITED for Retail helps you understand customers and deliver personalized experiences at every touchpoint.', features: ['Unified Commerce', 'Customer Loyalty', 'Inventory Management', 'Personalization', 'Omnichannel Support', 'Demand Forecasting'], stats: [{ label: 'Retailers', value: '25K+' }, { label: 'Increase in repeat customers', value: '45%' }], subtitleKey: 'customerExperience', titleKey: 'retail', descriptionKey: 'retailDesc' }
};

export function IndustriesPage() {
  const { t } = useTranslation();
  const content = useSiteContent('industries');
  const rawIndustries = content.getContentRaw('industries_list') as any[] | null;
  const resolvedIndustriesData: Record<string, any> = rawIndustries
    ? Object.fromEntries(rawIndustries.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Heart }]))
    : industriesData;
  return (
    <div className="pt-16">
      <SEO title="Industries" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{content.getContent('industriesTitle', t('industriesTitle'))}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.getContent('industriesDesc', t('industriesDesc'))}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {Object.entries(resolvedIndustriesData).map(([key, industry]) => (
              <Link key={key} to={`/industries/${key}`} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{content.getContent(industry.subtitleKey, t(industry.subtitleKey))}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.getContent(industry.titleKey, t(industry.titleKey))}</h3>
                    <p className="text-gray-600 mb-4">{content.getContent(industry.descriptionKey, t(industry.descriptionKey))}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5394]">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

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
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{content.getContent('industryNotFound', t('industryNotFound'))}</h1>
          <Link to="/industries" className="text-[#0b5394] hover:underline">{content.getContent('viewAllIndustries', t('viewAllIndustries'))}</Link>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div className="pt-16">
      <SEO title={industry.title} />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="left">
              <div className="text-white">
                <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">{content.getContent(industry.subtitleKey, t(industry.subtitleKey))}</div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">{industry.title}</h1>
                <p className="text-xl text-white/80 mb-8">{industry.description}</p>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all hover:shadow-xl">
                  {content.getContent('getIndustrySolution', t('getIndustrySolution'))} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="hidden lg:flex justify-center">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                  <Icon className="w-24 h-24 text-white" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {industry.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#0b5394] to-[#00a3e0] bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal><h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{content.getContent('keyFeatures', t('keyFeatures'))}</h2></ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            {industry.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircle className="w-6 h-6 text-[#0b5394] flex-shrink-0" />
                <span className="font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
