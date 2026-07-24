import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { ContentCard } from '../../components/ui/ContentCard';
import { useSiteContent } from '../../hooks/useSiteContent';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Network, Cloud, Shield, Zap } from 'lucide-react';

export function ArchitecturePage() {
  const content = useSiteContent('company');

  const capabilities = [
    {
      id: 'cloud',
      title: 'Cloud-native foundation',
      description: 'Built on modern cloud infrastructure for elastic scaling, high availability, and global reach without managing physical servers.',
      icon: Cloud,
      link: '/company/architecture#cloud',
    },
    {
      id: 'api',
      title: 'API-first design',
      description: 'Every module exposes RESTful APIs and webhooks so you can extend, automate, and embed Marmidon into your existing toolchain.',
      icon: Network,
      link: '/company/architecture#api',
    },
    {
      id: 'modules',
      title: 'Modular microservices',
      description: 'Finance, HR, inventory, and sales run as loosely coupled services. Deploy only what you need and let modules grow with your business.',
      icon: Server,
      link: '/company/architecture#modules',
    },
    {
      id: 'performance',
      title: 'High-performance data layer',
      description: 'Optimised queries, intelligent caching, and real-time replication keep response times fast even with millions of transactions.',
      icon: Zap,
      link: '/company/architecture#performance',
    },
    {
      id: 'security',
      title: 'Security by design',
      description: 'Role-based access, encrypted data stores, and continuous penetration testing protect every layer of the platform.',
      icon: Shield,
      link: '/company/architecture#security',
    },
  ];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.architecture.title} description={PAGE_META.architecture.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Architecture' }]} />
      <LightPageHeader
        badge={<span className="type-badge type-badge--light">Architecture</span>}
        title={content.getContent('architecture_title', 'Enterprise-Grade Architecture')}
        description={content.getContent('architecture_desc', 'Scalable, secure, and modular platform architecture built for enterprise.')}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionHeading
                title="Built for scale, designed for flexibility"
                description="Marmidon's architecture brings together cloud-native infrastructure, modular services, and enterprise security so your business can grow without friction."
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <ScrollReveal key={cap.id}>
                <ContentCard
                  to={cap.link}
                  title={cap.title}
                  description={cap.description}
                  icon={cap.icon}
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
                title="Ready to modernise your ERP infrastructure?"
                description="Talk to our solutions team about deployment options, performance requirements, and how Marmidon fits your technology landscape."
              />
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Talk to an architect <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
