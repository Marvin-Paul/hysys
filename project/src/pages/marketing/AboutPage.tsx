import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, ArrowRight, Sparkles, CheckCircle, Building2, TrendingUp, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { useTranslation } from '../../lib/i18n';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CardMedia } from '../../components/ui/CardMedia';
import { useSiteContent } from '../../hooks/useSiteContent';
import { leadershipPhotos, aboutValueImages } from '../../lib/cms/cardDefaults';
import { mergeCmsList, cmsText } from '../../lib/cms/cmsContent';
import { DEFAULT_ABOUT_STATS } from '../../lib/cms/resourceDefaults';

const iconMap: Record<string, LucideIcon> = { Users, Globe, Heart, Award, Building2, TrendingUp };

const leadership = [
  { id: 'alex-johnson', name: 'Alex Johnson', role: 'CEO & Co-Founder', bio: 'Former VP at leading tech companies with 20+ years experience building enterprise platforms.', image: leadershipPhotos['Alex Johnson'] },
  { id: 'maria-chen', name: 'Maria Chen', role: 'Chief Technology Officer', bio: 'Pioneered cloud infrastructure at major providers. Leads Marmidon engineering vision.', image: leadershipPhotos['Maria Chen'] },
  { id: 'david-park', name: 'David Park', role: 'Chief Financial Officer', bio: 'Finance leader with deep SaaS expertise and a track record of scaling companies globally.', image: leadershipPhotos['David Park'] },
  { id: 'sarah-williams', name: 'Sarah Williams', role: 'Chief Marketing Officer', bio: 'Brand builder with global marketing experience across Africa and Europe.', image: leadershipPhotos['Sarah Williams'] },
];

const values = [
  { id: 'customer-success', icon: Users, titleKey: 'valueCustomerSuccess', descriptionKey: 'valueCustomerSuccessDesc' },
  { id: 'trust-security', icon: Globe, titleKey: 'valueTrustSecurity', descriptionKey: 'valueTrustSecurityDesc' },
  { id: 'equality', icon: Heart, titleKey: 'valueEquality', descriptionKey: 'valueEqualityDesc' },
  { id: 'innovation', icon: Award, titleKey: 'valueInnovation', descriptionKey: 'valueInnovationDesc' },
];

const milestones = [
  { id: '2010', year: '2010', eventKey: 'milestone2010' },
  { id: '2014', year: '2014', eventKey: 'milestone2014' },
  { id: '2018', year: '2018', eventKey: 'milestone2018' },
  { id: '2022', year: '2022', eventKey: 'milestone2022' },
  { id: '2026', year: '2026', eventKey: 'milestone2026' },
];

const defaultMissionBullets = [
  { id: 'customer-first', text: 'Customer-first mindset' },
  { id: 'security', text: 'Enterprise-grade security' },
  { id: 'innovation', text: 'Continuous innovation' },
  { id: 'global', text: 'Global reach, local expertise' },
];

export function AboutPage() {
  const { t } = useTranslation();
  const content = useSiteContent('about');
  const resolvedLeadership = mergeCmsList(
    content.getContentRaw('leadership_team') as any[] | null,
    leadership
  ).map((leader: any) => ({
    ...leader,
    image: leader.image || leader.photo || leadershipPhotos[leader.name] || '',
  }));
  const resolvedMilestones = mergeCmsList(
    content.getContentRaw('milestones') as typeof milestones | null,
    milestones
  );
  const resolvedValues = mergeCmsList(
    content.getContentRaw('values') as typeof values | null,
    values
  ).map((v: Record<string, unknown> & typeof values[number]) => ({
    ...v,
    icon: iconMap[String(v.iconName)] || v.icon || Heart,
    image: String(v.image || aboutValueImages[String(v.id)] || ''),
  }));
  const missionBullets = mergeCmsList(
    content.getContentRaw('mission_bullets') as typeof defaultMissionBullets | null,
    defaultMissionBullets
  );
  const stats = mergeCmsList(
    content.getContentRaw('about_stats') as typeof DEFAULT_ABOUT_STATS | null,
    DEFAULT_ABOUT_STATS
  ).map((stat) => ({
    ...stat,
    icon: iconMap[String(stat.iconName)] || Building2,
  }));

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.about.title} description={PAGE_META.about.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'About' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {content.getContent('hero_badge_label', 'About Us')}
          </span>
        }
        title={content.getContent('hero_title', t('aboutTitle'))}
        description={content.getContent('hero_desc', t('aboutDesc'))}
      >
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]">
          {content.getContent('hero_cta_primary', 'Get in Touch')} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
          {content.getContent('hero_cta_secondary', 'Request a Demo')}
        </Link>
      </LightPageHeader>

      {/* ── Stats bar ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <ScrollReveal key={stat.id || idx}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="type-stat-value bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="type-stat-label">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="left">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-6">
                  <Sparkles className="w-4 h-4" /> {content.getContent('mission_badge', 'Our Mission')}
                </span>
                <h2 className="type-section-title mb-6">
                  {content.getContent('mission_title', t('ourMission'))}
                </h2>
                <p className="type-body-muted text-lg mb-4">
                  {content.getContent('mission_text_1', t('missionText1'))}
                </p>
                <p className="type-body-muted text-lg mb-8">
                  {content.getContent('mission_text_2', t('missionText2'))}
                </p>
                <div className="space-y-3 mb-8">
                  {missionBullets.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link to="/request-a-demo" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold hover:bg-[var(--color-secondary)] transition-all hover:shadow-xl hover:-translate-y-1">
                  {content.getContent('mission_cta', 'Request a Demo')} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-3xl p-8 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                  <div className="relative">
                    <Shield className="w-12 h-12 text-cyan-300 mb-4" />
                    <div className="text-5xl font-extrabold mb-2">150K+</div>
                    <div className="text-white/70 mb-8 text-lg">{content.getContent('stats_badge', 'Companies trust Marmidon Global Solutions')}</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                        <div className="text-3xl font-extrabold">40M+</div>
                        <div className="text-sm text-white/70 mt-1">Active users</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
                        <div className="text-3xl font-extrabold">60+</div>
                        <div className="text-sm text-white/70 mt-1">Countries</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 about-values-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> {content.getContent('values_badge', 'What We Stand For')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{content.getContent('values_title', t('ourValues'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">{content.getContent('values_subtitle', 'The principles that guide everything we do.')}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {resolvedValues.map((value: Record<string, unknown> & typeof values[number], idx) => {
              const valueId = value.id as string || (values[idx] && values[idx].id) || '';
              return (
                <ScrollReveal key={idx}>
                  <div className="group relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center">
                    <img
                      src={value.image || aboutValueImages[valueId]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                    <div className="relative p-8 min-h-[240px] flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-2 text-lg">{cmsText(value.title as string | undefined, value.titleKey, t)}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{cmsText(value.description as string | undefined, value.descriptionKey, t)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Users className="w-4 h-4" /> {content.getContent('leadership_badge', 'The Team')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{content.getContent('leadership_title', t('leadershipTeam'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">{content.getContent('leadership_subtitle', 'World-class leaders driving Marmidon forward.')}</p>
            </div>
          </ScrollReveal>
          <div className="pro-card-grid stagger-children">
            {resolvedLeadership.map((leader: { name: string; role: string; bio: string; image?: string; photo?: string }, idx: number) => (
              <ScrollReveal key={idx}>
                <div className="pro-card pro-card--compact text-center">
                  <div className="pro-card__body items-center pt-8">
                    <CardMedia
                      src={leader.image || leader.photo}
                      alt={leader.name}
                      aspect="avatar"
                      className="mx-auto"
                      fallback={
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-lg font-extrabold text-white">
                          {leader.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      }
                    />
                    <h3 className="pro-card__title mt-4">{leader.name}</h3>
                    <p className="text-[var(--color-primary)] font-semibold text-sm mb-3">{leader.role}</p>
                    <p className="pro-card__description line-clamp-4">{leader.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <TrendingUp className="w-4 h-4" /> {content.getContent('journey_badge', 'Our Journey')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)]">{content.getContent('journey_title', t('ourJourney'))}</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]" />
            <div className="space-y-8">
              {resolvedMilestones.map((milestone: Record<string, unknown> & typeof milestones[number], idx) => (
                <ScrollReveal key={idx}>
                  <div className="flex items-start gap-8 pl-8">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] -ml-2 mt-1.5 z-10 flex-shrink-0 shadow-lg" />
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
                      <div className="text-sm font-extrabold text-[var(--color-primary)] mb-1">{milestone.year}</div>
                      <div className="font-semibold text-gray-900">{cmsText(milestone.event as string | undefined, milestone.eventKey, t)}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04] about-cta-grid-bg" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.getContent('cta_title', t('joinOurTeam'))}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{content.getContent('cta_desc', t('joinOurTeamDesc'))}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {content.getContent('cta_button', t('viewOpenPositions'))} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                {content.getContent('cta_secondary_button', 'Request a Demo')}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
