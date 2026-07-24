import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { ContentCard } from '../../components/ui/ContentCard';
import { useSiteContent } from '../../hooks/useSiteContent';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, GraduationCap, Users, MessageSquare, BookOpen } from 'lucide-react';

export function SupportPage() {
  const content = useSiteContent('company');

  const services = [
    {
      id: 'implementation',
      title: 'Implementation support',
      description: 'Dedicated implementation managers guide your team through data migration, configuration, and go-live so you launch on time and on budget.',
      icon: Users,
      link: '/company/support#implementation',
    },
    {
      id: 'training',
      title: 'Training & enablement',
      description: 'Role-based training programs, live workshops, and on-demand video libraries help every user become productive faster.',
      icon: GraduationCap,
      link: '/company/support#training',
    },
    {
      id: 'helpdesk',
      title: '24/7 helpdesk',
      description: 'Local and regional support teams provide round-the-clock assistance via phone, email, and live chat with guaranteed SLAs.',
      icon: Headphones,
      link: '/company/support#helpdesk',
    },
    {
      id: 'success',
      title: 'Customer success',
      description: 'Proactive health checks, adoption insights, and renewal guidance keep your Marmidon investment delivering value year after year.',
      icon: MessageSquare,
      link: '/company/support#success',
    },
    {
      id: 'resources',
      title: 'Knowledge base',
      description: 'A searchable knowledge base, troubleshooting guides, and best-practice documentation help teams resolve issues independently.',
      icon: BookOpen,
      link: '/company/support#resources',
    },
  ];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.support.title} description={PAGE_META.support.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Support' }]} />
      <LightPageHeader
        badge={<span className="type-badge type-badge--light">Support</span>}
        title={content.getContent('support_title', 'Support & Services')}
        description={content.getContent('support_desc', 'Dedicated support to help your team succeed with Marmidon.')}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionHeading
                title="Support that scales with your business"
                description="From first-day onboarding to long-term optimisation, our local teams make sure your Marmidon investment keeps delivering."
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
              <ScrollReveal key={item.id}>
                <ContentCard
                  to={item.link}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  footerLabel="Learn more"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <SectionHeading
                title="Need help right now?"
                description="Our support team is available during business hours and on-call for critical issues. Reach us by phone, email, or live chat."
              />
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Contact support <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
