import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, Award, Users, Globe, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_PARTNER_BENEFITS, DEFAULT_PARTNER_PROGRAMS } from '../../lib/cms/resourceDefaults';
import { partnerProgramImages } from '../../lib/cms/cardDefaults';

const programIconMap: Record<string, LucideIcon> = {
  Users, Award, Globe, BarChart3,
};

export function PartnersPage() {
  const content = useSiteContent('partners');
  const programs = mergeCmsList(
    content.getContentRaw('partners_programs') as typeof DEFAULT_PARTNER_PROGRAMS | null,
    DEFAULT_PARTNER_PROGRAMS
  ).map((p) => ({
    ...p,
    icon: programIconMap[String(p.iconName)] || Users,
    image: String(p.image || partnerProgramImages[String(p.id)] || ''),
  }));
  const benefits = mergeCmsList(
    content.getContentRaw('partners_benefits') as typeof DEFAULT_PARTNER_BENEFITS | null,
    DEFAULT_PARTNER_BENEFITS
  );

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.partners.title} description={PAGE_META.partners.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Partners' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Handshake className="w-4 h-4" /> {content.getContent('partners_hero_badge', 'Partners')}
          </span>
        }
        title={content.getContent('partners_title', 'Grow with the Marmidon ecosystem')}
        description={content.getContent('partners_desc', 'Join a global network of partners building, selling, and delivering Marmidon solutions.')}
      >
        <Link
          to="/partners/apply"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]"
        >
          {content.getContent('partners_cta', 'Become a partner')} <ArrowRight className="w-4 h-4" />
        </Link>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><Award className="w-4 h-4" /> {content.getContent('partners_programs_badge', 'Programmes')}</span>}
            title={content.getContent('partners_programs_title', 'Partner programmes')}
            description={content.getContent('partners_programs_desc', 'Find the programme that fits your business model and goals.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => {
              const Icon = p.icon || Users;
              return (
                <ScrollReveal key={p.id || p.title}>
                  <div className="group relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
                    <img
                      src={p.image || partnerProgramImages[p.id as string] || partnerProgramImages.consulting}
                      alt={String(p.title || '')}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                    <div className="relative p-6 min-h-[200px] flex flex-col justify-end">
                      <div className={`inline-flex rounded-xl p-2.5 ring-1 backdrop-blur-sm ${String(p.accent || 'bg-white/20 text-white ring-white/30')}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white">{p.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{p.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><Users className="w-4 h-4" /> {content.getContent('partners_benefits_badge', 'Benefits')}</span>}
            title={content.getContent('partners_benefits_title', 'Why partner with Marmidon?')}
            description={content.getContent('partners_benefits_desc', 'Access resources, training, and revenue opportunities.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <ScrollReveal key={b.id || b.title}>
                <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <h3 className="font-semibold text-slate-900">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to join the Marmidon partner ecosystem?')}
        description={content.getContent('cta_desc', 'Apply today or speak with our partnerships team about programme fit.')}
        primaryLabel={content.getContent('cta_button', 'Apply to become a partner')}
        primaryTo="/partners/apply"
        secondaryLabel={content.getContent('cta_secondary_button', 'Talk to partnerships team')}
        secondaryTo="/contact"
      />
    </div>
  );
}
