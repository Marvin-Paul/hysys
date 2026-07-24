import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { ContentCard } from '../../components/ui/ContentCard';
import { useSiteContent } from '../../hooks/useSiteContent';
import { Link } from 'react-router-dom';
import { ArrowRight, Plug, Globe, CreditCard, ShoppingCart, BarChart3 } from 'lucide-react';

export function IntegrationsPage() {
  const content = useSiteContent('company');

  const integrations = [
    {
      id: 'banking',
      title: 'Banking & payments',
      description: 'Native integrations with leading banks and payment gateways for seamless collections, reconciliations, and payouts.',
      icon: CreditCard,
      link: '/company/integrations#banking',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce & POS',
      description: 'Sync orders, inventory, and customer data between Marmidon and your online stores or retail POS systems in real time.',
      icon: ShoppingCart,
      link: '/company/integrations#ecommerce',
    },
    {
      id: 'bi',
      title: 'Business intelligence',
      description: 'Feed Marmidon data into Power BI, Tableau, or Looker for advanced analytics, custom dashboards, and cross-platform reporting.',
      icon: BarChart3,
      link: '/company/integrations#bi',
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem & API',
      description: 'Use our REST APIs and webhooks to connect CRM, messaging, document signing, and any custom system your business relies on.',
      icon: Plug,
      link: '/company/integrations#ecosystem',
    },
    {
      id: 'global',
      title: 'Global & regional',
      description: 'Pre-built connectors for regional tax engines, local banks, and compliance tools across the markets we operate in.',
      icon: Globe,
      link: '/company/integrations#global',
    },
  ];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.integrations.title} description={PAGE_META.integrations.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Integrations' }]} />
      <LightPageHeader
        badge={<span className="type-badge type-badge--light">Integrations</span>}
        title={content.getContent('integrations_title', 'Seamless Integrations')}
        description={content.getContent('integrations_desc', 'Connect Marmidon with the tools your team already uses.')}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionHeading
                title="Connect every tool in your stack"
                description="From banking and e-commerce to BI and custom middleware, Marmidon integrations keep your systems talking — without manual exports or duplicates."
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((item) => (
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
                title="Need a custom connector?"
                description="Our partnerships team can build bespoke integrations for your proprietary systems, legacy databases, or regional requirements."
              />
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Discuss your integration <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
