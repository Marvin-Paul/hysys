import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';

const pricingPlans = [
  { name: 'Essentials', price: 25, period: 'per user/month', description: 'For small teams just getting started', features: ['Contact & Lead Management', 'Opportunity Tracking', 'Mobile App', 'Email Integration', 'Reports & Dashboards', '5 Custom Objects'], cta: 'Start Free Trial', popular: false },
  { name: 'Professional', price: 75, period: 'per user/month', description: 'For growing teams needing more automation', features: ['Everything in Essentials', 'Workflow Automation', 'Sales Forecasting', 'Custom Reports', '25 Custom Objects', 'API Access', 'Collaboration Tools'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: 150, period: 'per user/month', description: 'For large organizations with complex needs', features: ['Everything in Professional', 'Advanced Security', 'Unlimited Customization', 'Enterprise Analytics', 'Unlimited Custom Objects', 'Priority Support', 'Advanced Integrations'], cta: 'Contact Sales', popular: false },
];

const faqs = [
  { question: 'Can I try before I buy?', answer: 'Yes! All plans include a 14-day free trial. No credit card required.' },
  { question: 'Can I change plans later?', answer: 'Absolutely. You can upgrade, downgrade, or cancel anytime from your account settings.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
  { question: 'Is there a discount for annual billing?', answer: 'Yes, save up to 20% when you pay annually instead of monthly.' },
];

export function PricingPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Choose the plan that fits your business. All plans include a 14-day free trial.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-[#0b5394] scale-105' : 'border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0b5394] text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0b5394] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-[#0b5394] text-white hover:bg-[#032d60]'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#0b5394] flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a custom solution?</h2>
          <p className="text-lg text-gray-600 mb-8">Contact our sales team to discuss enterprise pricing and custom solutions.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg">
            Contact Sales <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

