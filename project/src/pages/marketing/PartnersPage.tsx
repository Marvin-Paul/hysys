import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, Award, Users, Globe, BarChart3, Search, ExternalLink, MapPin, Filter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { OptimizedImage } from '../../components/ui/OptimizedImage';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_PARTNER_BENEFITS, DEFAULT_PARTNER_PROGRAMS, DEFAULT_PARTNER_LIST } from '../../lib/cms/resourceDefaults';
import { partnerProgramImages, partnerDirectoryImages } from '../../lib/cms/cardDefaults';

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

  const partners = mergeCmsList(
    content.getContentRaw('partners_list') as typeof DEFAULT_PARTNER_LIST | null,
    DEFAULT_PARTNER_LIST
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('all');

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const name = String(p.name || '').toLowerCase();
      const location = String(p.location || '').toLowerCase();
      const sectors = String(p.sectors || '').toLowerCase();
      const program = String(p.program || '');
      const q = searchQuery.toLowerCase();
      if (q && !name.includes(q) && !location.includes(q) && !sectors.includes(q)) return false;
      if (programFilter !== 'all' && program !== programFilter) return false;
      return true;
    });
  }, [partners, searchQuery, programFilter]);

  const partnersJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Partners', path: '/partners' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.partners.title} description={PAGE_META.partners.description} jsonLd={partnersJsonLd} fullTitle />

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
                    <OptimizedImage
                      src={p.image || partnerProgramImages[p.id as string] || partnerProgramImages.consulting}
                      alt={String(p.title || '')}
                      className="absolute inset-0 w-full h-full object-cover"
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

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={<span className="type-badge type-badge--light"><Globe className="w-4 h-4" /> Partner Directory</span>}
            title="Find a Marmidon partner"
            description="Search by name, location, or sector. Filter by programme type to find the right partner for your needs."
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partners by name, location, or sector…"
                className="w-full rounded-xl border-0 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-900 ring-1 ring-slate-200 transition focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                aria-label="Search partners"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full sm:w-48 rounded-xl border-0 bg-slate-100 py-3 pl-10 pr-8 text-sm text-slate-900 ring-1 ring-slate-200 transition focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none appearance-none"
                aria-label="Filter by programme"
              >
                <option value="all">All programmes</option>
                <option value="consulting">Consulting</option>
                <option value="technology">Technology</option>
                <option value="reseller">Reseller</option>
                <option value="isv">ISV</option>
              </select>
            </div>
          </div>
          {filteredPartners.length === 0 ? (
            <p className="mt-12 text-center text-slate-500">No partners match your search. Try a different filter.</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPartners.map((p) => (
                <ScrollReveal key={p.id || p.name}>
                  <div className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5">
                    <div className="h-32 rounded-xl overflow-hidden relative ring-1 ring-slate-100">
                      <OptimizedImage
                        src={partnerDirectoryImages[(p.id as string)] || partnerDirectoryImages.acmecorp}
                        alt={String(p.name || '')}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-900">{String(p.name || '')}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5" /> {String(p.location || '')}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">{String(p.program || '')}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{String(p.sectors || '')}</span>
                    </div>
                    <a
                      href={String(p.website || '#')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
                    >
                      Visit website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
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
