import { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { useTranslation } from '../../lib/i18n';
import { useSiteContent } from '../../hooks/useSiteContent';

const faqs = [
  { questionKey: 'faqQ1', answerKey: 'faqA1' },
  { questionKey: 'faqQ2', answerKey: 'faqA2' },
  { questionKey: 'faqQ3', answerKey: 'faqA3' },
  { questionKey: 'faqQ4', answerKey: 'faqA4' },
  { questionKey: 'faqQ5', answerKey: 'faqA5' },
  { questionKey: 'faqQ6', answerKey: 'faqA6' },
];

export function FAQSection() {
  const { t } = useTranslation();
  const content = useSiteContent('global');
  const rawFaqs = content.getContentRaw('faqs') as any[] | null;
  const resolvedFaqs = (rawFaqs?.length ? rawFaqs : faqs).map((item: any, index: number) => ({
    question: item.question || t(item.questionKey),
    answer: item.answer || t(item.answerKey),
    id: item.id || `faq-${index}`,
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="page-section page-section--muted">
      <div className="page-container page-container--narrow">
        <ScrollReveal>
          <SectionHeading
            badge={
              <span className="type-badge type-badge--light">
                <Sparkles className="w-4 h-4" />
                {t('faqBadge')}
              </span>
            }
            title={content.getContent('faq_section_title', t('faqSectionTitle'))}
            description={`${t('faqIntro1')} ${t('faqIntro2')}`}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-1 mt-2">
            {resolvedFaqs.map((faq, index) => (
              <div key={faq.id} className="border-b border-slate-200/80 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left hover:opacity-80 transition"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--type-heading)] leading-snug pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0 text-[var(--color-primary)]">
                    {openIndex === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="pb-5 type-body-muted pr-8">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
