import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, CalendarDays } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { eventImages } from '../../lib/cms/cardDefaults';

const defaultEvents = [
  {
    id: 'summit',
    date: 'June 12, 2026',
    title: 'Marmidon Global Summit',
    description: 'Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.',
    highlight: 'Live keynotes + panel discussions',
  },
  {
    id: 'forum',
    date: 'September 4, 2026',
    title: 'Customer Success Forum',
    description: 'Explore customer stories, best practices, and success strategies for integrated ERP and AI-powered operations.',
    highlight: 'Case study deep dives',
  },
  {
    id: 'workshop',
    date: 'November 18, 2026',
    title: 'Cloud Transformation Workshop',
    description: 'Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.',
    highlight: 'Architecture and security workshops',
  },
];

const defaultHighlights = [
  { id: 'roadmaps', text: 'Discover product roadmaps and feature plans directly from our team.' },
  { id: 'practices', text: 'Learn best practices for ERP, automation, and digital transformation.' },
  { id: 'network', text: 'Connect with peers, partners, and solution experts.' },
  { id: 'deploy', text: 'Get actionable guidance for secure deployments and scaling.' },
];

const defaultFaqs = [
  { question: 'Who should attend?', answer: 'IT leaders, operations teams, customer success managers, and anyone evaluating digital transformation solutions.' },
  { question: 'How do I register?', answer: 'Request a demo or contact our team to reserve your place and ask about group registration.' },
  { question: 'Can I attend remotely?', answer: 'Yes — most events include virtual sessions, live Q&A, and on-demand recordings.' },
  { question: 'What will I learn?', answer: 'You will learn how to use Marmidon ERP to unify finance and operations, automate workflows, and scale with confidence.' },
];

export function EventsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const content = useSiteContent('events');
  const resolvedEvents = mergeCmsList(
    content.getContentRaw('events_list') as any[] | null,
    defaultEvents
  ).map((e: any) => ({
    ...e,
    image: e.image || eventImages[e.id as string] || '',
  }));
  const rawFaqs = content.getContentRaw('faqs') as any[] | null;
  const resolvedFaqs = rawFaqs?.length
    ? rawFaqs.map((f: any) => ({ question: f.question || f.questionKey, answer: f.answer || f.answerKey }))
    : defaultFaqs;
  const resolvedHighlights = mergeCmsList(
    content.getContentRaw('events_highlights') as any[] | null,
    defaultHighlights
  );

  const eventsJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.events.title} description={PAGE_META.events.description} jsonLd={eventsJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Events' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <CalendarDays className="w-4 h-4" /> {content.getContent('events_hero_badge', 'Events & Experiences')}
          </span>
        }
        title={content.getContentAny(['eventsTitle', 'pricingTitle', 'hero_title'], 'Events & Experiences')}
        description={content.getContentAny(['eventsDesc', 'pricingDesc', 'hero_desc'], 'Participate in live summits, workshops, and partner forums designed to help your organisation grow with Marmidon.')}
      >
        <Link
          to="/request-a-demo"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]"
        >
          {content.getContent('events_hero_cta_primary', 'Request a Demo')} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]"
        >
          {content.getContent('events_hero_cta_secondary', 'Contact Us')}
        </Link>
      </LightPageHeader>

      <section className="products-catalog">
        <div className="products-container">
          <ScrollReveal>
            <SectionHeading
              badge={
                <span className="type-badge type-badge--light">
                  <Sparkles className="w-4 h-4" /> {content.getContent('events_section_badge', 'Upcoming Events')}
                </span>
              }
              title={content.getContent('events_section_title', 'Learn, network, and lead change')}
              description={content.getContent('events_section_desc', 'Experience Marmidon events tailored for customers, partners, and IT teams who want to modernize faster.')}
            />
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {resolvedEvents.map((event: any, idx: number) => (
              <ScrollReveal key={event.id ?? idx}>
                <div className="group relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <OptimizedImage
                    src={event.image || eventImages[event.id as string]}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="relative p-8 min-h-[280px] flex flex-col justify-end">
                    <div className="type-label mb-3 text-white/80">{event.date}</div>
                    <h3 className="type-section-title text-xl mb-2 text-white">{event.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{event.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur text-white px-4 py-2 text-sm font-semibold w-fit">
                      <CalendarDays className="w-4 h-4" /> {event.highlight}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center pt-8 pb-16 border-t border-gray-100">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                  <CalendarDays className="w-4 h-4" /> {content.getContent('events_highlights_badge', 'Event Highlights')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-6">
                  {content.getContent('events_highlights_title', 'Why attend Marmidon events?')}
                </h2>
                <ul className="space-y-4 text-gray-600">
                  {resolvedHighlights.map((item: any) => (
                    <li key={item.id} className="flex gap-3">
                      <span className="mt-1 text-[var(--color-primary)]">•</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">{content.getContent('cta_title', 'Reserve your seat')}</h3>
                <p className="text-white/80 mb-8 leading-relaxed">{content.getContent('cta_desc', 'Spaces are limited for our flagship events. Reserve early to ensure your team gets the best experience and dedicated time with our experts.')}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:bg-white/90 transition-all">
                  {content.getContent('cta_button', 'Contact Events Team')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto pt-16 border-t border-gray-100">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> {content.getContent('faq_section_badge', 'Event FAQs')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)]">
                {content.getContent('faq_section_title', 'Everything you need to know')}
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {resolvedFaqs.map((faq: any, idx: number) => (
              <ScrollReveal key={idx}>
                <div className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all duration-300 ${openFaq === idx ? 'shadow-lg' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[var(--color-primary)]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {openFaq === idx && (
                    <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
