import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, HelpCircle, Sparkles, Zap, Shield, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const pricingPlans = [
  {
    nameKey: 'essentials', price: 91000, periodKey: 'perUserMonth',
    descriptionKey: 'essentialsDesc', icon: Zap, color: 'from-blue-500 to-blue-700',
    featureKeys: ['contactLeadMgmt','opportunityTracking','mobileApp','emailIntegration','reportsDashboards','fiveCustomObjects'],
    ctaKey: 'startFreeTrial', popular: false,
  },
  {
    nameKey: 'professional', price: 274000, periodKey: 'perUserMonth',
    descriptionKey: 'professionalDesc', icon: Shield, color: 'from-[#0b5394] to-[#00a3e0]',
    featureKeys: ['everythingInEssentials','workflowAutomation','salesForecasting','customReports','twentyFiveCustomObjects','apiAccess','collaborationTools'],
    ctaKey: 'startFreeTrial', popular: true,
  },
  {
    nameKey: 'enterprise', price: 548000, periodKey: 'perUserMonth',
    descriptionKey: 'enterpriseDesc', icon: Award, color: 'from-violet-600 to-purple-700',
    featureKeys: ['everythingInProfessional','advancedSecurity','unlimitedCustomization','enterpriseAnalytics','unlimitedCustomObjects','prioritySupport','advancedIntegrations'],
    ctaKey: 'contactSales', popular: false,
  },
];

const faqs = [
  { questionKey: 'faq1Q', answerKey: 'faq1A' },
  { questionKey: 'faq2Q', answerKey: 'faq2A' },
  { questionKey: 'faq3Q', answerKey: 'faq3A' },
  { questionKey: 'faq4Q', answerKey: 'faq4A' },
];

const trustBadges = [
  '🔒 Enterprise-grade security',
  '⚡ Setup in under 5 minutes',
  '🆓 Free 14-day trial',
  '❌ No credit card required',
  '🔄 Cancel anytime',
];

export function PricingPage() {
  const { t } = useTranslation();
  const content = useSiteContent('pricing');
  const resolvedPricingPlans = content.getContentRaw('pricing_plans') ?? pricingPlans;
  const resolvedFaqs = content.getContentRaw('faqs') ?? faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16">
      <SEO title="Pricing" />

      {/* ── Hero ── */}
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 text-white">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Simple, transparent pricing
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">HYSYS GLOBAL SOLUTIONS LIMITED</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {content.getContent('pricingTitle', t('pricingTitle'))}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-2">
                Plans for Every Team
              </span>
            </h1>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
            </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              {content.getContent('pricingDesc', t('pricingDesc'))}
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {trustBadges.map(b => (
                <span key={b} className="text-sm text-white/60">{b}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Choose Your Plan
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">All plans include a 14-day free trial</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">No credit card required. Upgrade, downgrade or cancel at any time.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {resolvedPricingPlans.map((plan, idx) => (
              <ScrollReveal key={idx}>
                <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular ? 'shadow-2xl ring-2 ring-[#0b5394] scale-105' : 'shadow-sm border border-gray-100'
                }`}>
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-[#0b5394] to-[#00a3e0] text-white text-xs font-bold py-2 text-center tracking-wider uppercase">
                      ✦ Most Popular
                    </div>
                  )}
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${plan.color}`} />

                  <div className="p-8">
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                        <plan.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-extrabold text-gray-900">{t(plan.nameKey)}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{t(plan.descriptionKey)}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">UGX</span>
                        <span className="text-4xl font-extrabold text-gray-900">{plan.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">per user / month</p>
                    </div>

                    {/* CTA */}
                    <Link to={plan.ctaKey === 'contactSales' ? '/contact' : '/register'}
                      className={`block w-full py-3.5 px-6 rounded-2xl font-bold text-center transition-all duration-300 mb-6 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#0b5394] to-[#00a3e0] text-white hover:shadow-lg hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-900 hover:bg-[#0b5394] hover:text-white'
                      }`}>
                      {t(plan.ctaKey)}
                    </Link>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.featureKeys.map((featureKey, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-[#0b5394]' : 'text-gray-400'}`} />
                          <span className="text-gray-600 text-sm">{t(featureKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <HelpCircle className="w-4 h-4" /> Common Questions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60]">{content.getContent('faqTitle', t('faqTitle'))}</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {resolvedFaqs.map((faq, idx) => (
              <ScrollReveal key={idx}>
                <div className={`bg-gray-50 rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === idx ? 'border-[#0b5394]/30 shadow-md' : 'border-gray-100'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900">{t(faq.questionKey)}</span>
                    {openFaq === idx
                      ? <ChevronUp className="w-5 h-5 text-[#0b5394] flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {t(faq.answerKey)}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.getContent('customSolutionTitle', t('customSolutionTitle'))}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{content.getContent('customSolutionDesc', t('customSolutionDesc'))}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {content.getContent('contactSalesBtn', t('contactSalesBtn'))} <ArrowRight className="w-5 h-5" />
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
