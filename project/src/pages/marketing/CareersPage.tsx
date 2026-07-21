import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, MapPin, Clock, Users as UsersIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_CAREERS_VALUES, DEFAULT_OPEN_ROLES } from '../../lib/cms/resourceDefaults';
import { careerValueImages } from '../../lib/cms/cardDefaults';

export function CareersPage() {
  const content = useSiteContent('careers');
  const values = mergeCmsList(
    content.getContentRaw('careers_values') as (typeof DEFAULT_CAREERS_VALUES[number] & { image?: string })[] | null,
    DEFAULT_CAREERS_VALUES.map((v) => ({ ...v, image: '' }))
  ).map((v) => ({
    ...v,
    image: v.image || careerValueImages[v.id as string] || '',
  }));
  const openRoles = mergeCmsList(
    content.getContentRaw('open_roles') as typeof DEFAULT_OPEN_ROLES | null,
    DEFAULT_OPEN_ROLES
  );

  const careersJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company' },
    { name: 'Careers', path: '/company/careers' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.careers.title} description={PAGE_META.careers.description} jsonLd={careersJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Careers' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Briefcase className="w-4 h-4" /> {content.getContent('careers_hero_badge', 'Careers')}
          </span>
        }
        title={content.getContent('careers_title', 'Join the team building the future')}
        description={content.getContent('careers_desc', 'At Marmidon, we are building enterprise software that empowers businesses across Africa and beyond. Come grow with us.')}
      >
        <Link
          to="#open-roles"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]"
        >
          {content.getContent('careers_cta', 'View open roles')} <ArrowRight className="w-4 h-4" />
        </Link>
      </LightPageHeader>

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><UsersIcon className="w-4 h-4" /> {content.getContent('careers_values_badge', 'Why us?')}</span>}
            title={content.getContent('careers_values_title', 'Life at Marmidon')}
            description={content.getContent('careers_values_desc', 'We are building a culture where people do their best work.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <ScrollReveal key={v.id || v.title}>
                <div className="group relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                  <OptimizedImage
                    src={v.image || careerValueImages[v.id as string] || careerValueImages.innovation}
                    alt={String(v.title || '')}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                  <div className="relative p-6 min-h-[180px] flex flex-col justify-end">
                    <h3 className="font-semibold text-white">{v.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><Briefcase className="w-4 h-4" /> {content.getContent('careers_roles_badge', 'Openings')}</span>}
            title={content.getContent('careers_roles_title', 'Open roles')}
            description={content.getContent('careers_roles_desc', 'Find your next opportunity at Marmidon.')}
          />
          <div className="mt-12 space-y-4">
            {openRoles.map((role) => (
              <ScrollReveal key={role.id || role.title}>
                <div className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[var(--color-primary)]">{role.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><Briefcase className="w-3 h-3" /> {role.dept}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {role.location}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {role.type}</span>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#08407a]"
                  >
                    {content.getContent('careers_apply_label', 'Apply')} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={content.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
