import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, CalendarDays } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';

const events = [
  {
    date: 'June 12, 2026',
    title: 'HYSYS Global Summit',
    description: 'Join customers, partners, and product leaders for innovation sessions, hands-on workshops, and networking.',
    highlight: 'Live keynotes + panel discussions',
  },
  {
    date: 'September 4, 2026',
    title: 'Customer Success Forum',
    description: 'Explore customer stories, best practices, and success strategies for CRM and AI-powered operations.',
    highlight: 'Case study deep dives',
  },
  {
    date: 'November 18, 2026',
    title: 'Cloud Transformation Workshop',
    description: 'Practical sessions for IT teams planning secure cloud migrations and scalable platform rollouts.',
    highlight: 'Architecture and security workshops',
  },
];

const eventFaqs = [
  { question: 'Who should attend?', answer: 'IT leaders, operations teams, customer success managers, and anyone evaluating digital transformation solutions.' },
  { question: 'How do I register?', answer: 'Click the registration button or contact our team to reserve your place and ask for group pricing.' },
  { question: 'Can I attend remotely?', answer: 'Yes — most events include virtual sessions, live Q&A, and on-demand recordings.' },
  { question: 'What will I learn?', answer: 'You will learn how to use HYSYS to improve customer experience, automate workflows, and scale with confidence.' },
];

export function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16">
      <SEO title="Events" />

      <PageHero
        badge="Events"
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title="Events & Experiences"
        subtitle="Join our community"
        description="Participate in live summits, workshops, and partner forums designed to help your organisation grow with HYSYS."
        primaryCta={{ label: 'Register Now', to: '/contact' }}
        secondaryCta={{ label: 'Contact Us', to: '/contact' }}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Upcoming Events
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">Learn, network, and lead change</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Experience HYSYS events tailored for customers, partners, and IT teams who want to modernize faster.</p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <ScrollReveal key={idx}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-[0.2em] mb-4">{event.date}</div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{event.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 text-sm font-semibold">
                    <CalendarDays className="w-4 h-4" /> {event.highlight}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                  <CalendarDays className="w-4 h-4" /> Event Highlights
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-6">Why attend HYSYS events?</h2>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-3"><span className="mt-1 text-[var(--color-primary)]">•</span> Discover product roadmaps and feature plans directly from our team.</li>
                  <li className="flex gap-3"><span className="mt-1 text-[var(--color-primary)]">•</span> Learn best practices for CRM, automation, and digital transformation.</li>
                  <li className="flex gap-3"><span className="mt-1 text-[var(--color-primary)]">•</span> Connect with peers, partners, and solution experts.</li>
                  <li className="flex gap-3"><span className="mt-1 text-[var(--color-primary)]">•</span> Get actionable guidance for secure deployments and scaling.</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Reserve your seat</h3>
                <p className="text-white/80 mb-8 leading-relaxed">Spaces are limited for our flagship events. Reserve early to ensure your team gets the best experience and dedicated time with our experts.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:bg-white/90 transition-all">
                  Contact Events Team <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Event FAQs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)]">Everything you need to know</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {eventFaqs.map((faq, idx) => (
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
      </section>
    </div>
  );
}
