import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is HYSYS Global Solutions and what do we do?',
    answer: 'HYSYS Global Solutions Limited is a leading provider of CRM and business automation solutions. We help organizations across industries streamline their sales, service, marketing, and operations through our unified platform powered by agentic AI and data analytics. Our mission is to bring companies and customers together by providing intelligent, scalable solutions that drive growth and enhance customer experiences.',
  },
  {
    question: 'What industries does HYSYS Global Solutions serve?',
    answer: 'We serve a diverse range of industries including financial services, healthcare, manufacturing, retail, telecommunications, professional services, and the public sector. Our platform is highly customizable to meet the unique regulatory, operational, and customer engagement requirements of each industry vertical.',
  },
  {
    question: 'How does HYSYS Global Solutions implement agentic AI in its platform?',
    answer: 'Our agentic AI capabilities enable autonomous decision-making and action-taking based on your business goals. This includes intelligent lead scoring, automated workflow orchestration, predictive analytics for customer behavior, smart routing for service cases, and personalized marketing journey optimization - all without requiring manual intervention for routine decisions.',
  },
  {
    question: 'Can HYSYS Global Solutions integrate with our existing systems?',
    answer: 'Yes, our platform offers extensive integration capabilities through pre-built connectors, RESTful APIs, and middleware support. We integrate seamlessly with popular ERP systems (SAP, Oracle, Microsoft Dynamics), marketing automation tools, communication platforms, and custom legacy systems to ensure a unified data ecosystem.',
  },
  {
    question: 'What deployment options does HYSYS Global Solutions offer?',
    answer: 'We offer flexible deployment options including public cloud (multi-region), private cloud, and hybrid deployments. Our platform is cloud-agnostic and can run on AWS, Azure, Google Cloud, or on-premises infrastructure, giving you full control over data residency, compliance, and performance requirements.',
  },
  {
    question: 'What kind of support and training does HYSYS Global Solutions provide?',
    answer: 'We provide comprehensive support including 24/7 technical support for enterprise customers, dedicated customer success managers, implementation services, customized training programs, certification courses, and an extensive knowledge base. Our professional services team ensures smooth onboarding and ongoing optimization of your CRM investment.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#032d60] mb-6">Frequently Asked Questions</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            HYSYS GLOBAL SOLUTIONS LIMITED is the <span className="font-semibold text-[#032d60]">#1 CRM</span> (customer relationship management) platform. We bring companies and customers together by providing a unified set of applications – powered by <span className="font-semibold text-[#0b5394]">agentic AI</span> and data – that help every department, including sales, service, marketing, commerce, and IT, work as one.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Our cloud-based agentic solutions help you find more leads, close more deals, and provide better service to your customers, all on a single, integrated agentic platform. Below are answers to common questions about our platform and how it can transform your business.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left hover:opacity-70 transition"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#032d60]">{faq.question}</h3>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-[#0b5394]" />
                  ) : (
                    <Plus className="h-6 w-6 text-[#0b5394]" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-600 leading-relaxed animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
