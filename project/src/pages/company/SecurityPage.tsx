import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { useSiteContent } from '../../hooks/useSiteContent';

export function SecurityPage() {
  const content = useSiteContent('company');
  return (
    <div className="pt-16">
      <SEO title={PAGE_META.security.title} description={PAGE_META.security.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Security' }]} />
      <LightPageHeader
        badge={<span className="type-badge type-badge--light">Security</span>}
        title={content.getContent('security_title', 'Security & Compliance')}
        description={content.getContent('security_desc', 'Enterprise security built into every layer of our platform.')}
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="type-body-muted text-lg max-w-3xl">
              {content.getContent('security_body', 'Our security framework covers data protection, access control, and compliance with global standards.')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
