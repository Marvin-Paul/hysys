import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const pricingPlans = [
  { nameKey: 'essentials',   price: 91000,  periodKey: 'perUserMonth', descriptionKey: 'essentialsDesc',   featureKeys: ['contactLeadMgmt', 'opportunityTracking', 'mobileApp', 'emailIntegration', 'reportsDashboards', 'fiveCustomObjects'], ctaKey: 'startFreeTrial', popular: false },
  { nameKey: 'professional', price: 274000, periodKey: 'perUserMonth', descriptionKey: 'professionalDesc', featureKeys: ['everythingInEssentials', 'workflowAutomation', 'salesForecasting', 'customReports', 'twentyFiveCustomObjects', 'apiAccess', 'collaborationTools'], ctaKey: 'startFreeTrial', popular: true },
  { nameKey: 'enterprise',   price: 548000, periodKey: 'perUserMonth', descriptionKey: 'enterpriseDesc',   featureKeys: ['everythingInProfessional', 'advancedSecurity', 'unlimitedCustomization', 'enterpriseAnalytics', 'unlimitedCustomObjects', 'prioritySupport', 'advancedIntegrations'], ctaKey: 'contactSales', popular: false },
];

const faqs = [
  { questionKey: 'faq1Q', answerKey: 'faq1A' },
  { questionKey: 'faq2Q', answerKey: 'faq2A' },
  { questionKey: 'faq3Q', answerKey: 'faq3A' },
  { questionKey: 'faq4Q', answerKey: 'faq4A' },
];

export function PricingPage() {
  const { t } = useTranslation();
  const content = useSiteContent('pricing');
  const resolvedPricingPlans = content.getContentRaw('pricing_plans') ?? pricingPlans;
  const resolvedFaqs = content.getContentRaw('faqs') ?? faqs;
  return (
    <div className="pt-16">
      <SEO title="Pricing" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{content.getContent('pricingTitle', t('pricingTitle'))}</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.getContent('pricingDesc', t('pricingDesc'))}</p>
            </div>
          </ScrollReveal>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {resolvedPricingPlans.map((plan, idx) => (
              <div key={idx} className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-[#0b5394] scale-105' : 'border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0b5394] text-white text-sm font-medium rounded-full">
                    {content.getContent('mostPopular', t('mostPopular'))}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.getContent(plan.nameKey, t(plan.nameKey))}</h3>
                  <p className="text-gray-600 text-sm">{content.getContent(plan.descriptionKey, t(plan.descriptionKey))}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">UGX {plan.price.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">{content.getContent(plan.periodKey, t(plan.periodKey))}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.featureKeys.map((featureKey, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0b5394] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{content.getContent(featureKey, t(featureKey))}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-[#0b5394] text-white hover:bg-[#032d60]'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {content.getContent(plan.ctaKey, t(plan.ctaKey))}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{content.getContent('faqTitle', t('faqTitle'))}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {resolvedFaqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#0b5394] flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-900">{content.getContent(faq.questionKey, t(faq.questionKey))}</h3>
                </div>
                <p className="text-gray-600 ml-8">{content.getContent(faq.answerKey, t(faq.answerKey))}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.getContent('customSolutionTitle', t('customSolutionTitle'))}</h2>
            <p className="text-lg text-gray-600 mb-8">{content.getContent('customSolutionDesc', t('customSolutionDesc'))}</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg">
              {content.getContent('contactSalesBtn', t('contactSalesBtn'))} <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
