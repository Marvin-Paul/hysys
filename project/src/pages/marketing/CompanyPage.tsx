import { Link } from 'react-router-dom';
import { Building2, Users, Briefcase, ArrowRight, Handshake, Newspaper, type LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_COMPANY_SECTIONS, DEFAULT_COMPANY_STATS } from '../../lib/cms/resourceDefaults';
import { companySectionImages } from '../../lib/cms/cardDefaults';

const sectionIconMap: Record<string, LucideIcon> = {
  Building2, Users, Briefcase, Handshake, Newspaper,
};

export function CompanyPage() {
  const content = useSiteContent('company');
  const sections = mergeCmsList(
    content.getContentRaw('company_sections') as typeof DEFAULT_COMPANY_SECTIONS | null,
    DEFAULT_COMPANY_SECTIONS
  ).map((s) => ({
    ...s,
    desc: String(s.description || ''),
    icon: sectionIconMap[String(s.iconName)] || Building2,
    image: String(s.image || companySectionImages[String(s.id)] || ''),
  }));
  const stats = mergeCmsList(
    content.getContentRaw('company_stats') as typeof DEFAULT_COMPANY_STATS | null,
    DEFAULT_COMPANY_STATS
  );

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.company.title} description={PAGE_META.company.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Building2 className="w-4 h-4" /> {content.getContent('company_hero_badge', 'Company')}
          </span>
        }
        title={content.getContent('company_title', 'Marmidon Global Solutions')}
        description={content.getContent('company_desc', 'We build technology that empowers businesses across Africa and the world to grow, automate, and transform.')}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => {
              const Icon = s.icon || Building2;
              return (
                <ScrollReveal key={s.id || s.path}>
                  <Link to={String(s.path || '/company')} className="group relative block rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                    <img
                      src={s.image || companySectionImages[s.id as string] || companySectionImages.about}
                      alt={String(s.title || '')}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                    <div className="relative p-6 min-h-[200px] flex flex-col justify-end">
                      <div className={`inline-flex rounded-xl p-2.5 ring-1 backdrop-blur-sm ${String(s.accent || 'bg-white/20 text-white ring-white/30')}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white group-hover:text-[var(--color-accent)]">{s.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{s.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/90 group-hover:text-white">
                        {content.getContent('company_card_link_label', 'Learn more')} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-10 text-center text-white">
            <h2 className="text-2xl font-bold">{content.getContent('company_stats_title', 'Marmidon by the numbers')}</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id || stat.label}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
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
