import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { useSiteContent } from '../../hooks/useSiteContent';

export function IntegrationsPage() {
  const content = useSiteContent('company');
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
            <p className="type-body-muted text-lg max-w-3xl">
              {content.getContent('integrations_body', 'We provide native and API-based integrations with leading enterprise platforms.')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
