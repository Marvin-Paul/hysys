import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { useSiteContent } from '../../hooks/useSiteContent';

export function ArchitecturePage() {
  const content = useSiteContent('company');
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
            <p className="type-body-muted text-lg max-w-3xl">
              {content.getContent('architecture_body', 'Our architecture is designed for reliability, scalability, and security across all deployment environments.')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
