import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { useSiteContent } from '../../hooks/useSiteContent';

export function SupportPage() {
  const content = useSiteContent('company');
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
            <p className="type-body-muted text-lg max-w-3xl">
              {content.getContent('support_body', 'Our support team provides implementation assistance, training, and ongoing optimisation services.')}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
