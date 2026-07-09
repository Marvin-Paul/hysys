import { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '../lib/i18n';

const faqs = [
  {
    questionKey: 'faqQ1',
    answerKey: 'faqA1',
  },
  {
    questionKey: 'faqQ2',
    answerKey: 'faqA2',
  },
  {
    questionKey: 'faqQ3',
    answerKey: 'faqA3',
  },
  {
    questionKey: 'faqQ4',
    answerKey: 'faqA4',
  },
  {
    questionKey: 'faqQ5',
    answerKey: 'faqA5',
  },
  {
    questionKey: 'faqQ6',
    answerKey: 'faqA6',
  },
];

export function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)]">
                <Sparkles className="w-4 h-4" />
                {t('faqBadge')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-secondary)] mb-6 text-center">{t('faqSectionTitle')}</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
              {t('faqIntro1')}
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
              {t('faqIntro2')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left hover:opacity-70 transition"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-secondary)]">{t(faq.questionKey)}</h3>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-[var(--color-primary)]" />
                  ) : (
                    <Plus className="h-6 w-6 text-[var(--color-primary)]" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="pb-4 text-gray-600 leading-relaxed animate-in fade-in duration-200">
                  {t(faq.answerKey)}
                </div>
              )}
            </div>
          ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
