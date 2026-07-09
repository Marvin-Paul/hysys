import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, ArrowRight, Sparkles, CheckCircle, Building2, TrendingUp, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { SEO } from '../components/SEO';
import { useSiteContent } from '../hooks/useSiteContent';

const iconMap: Record<string, LucideIcon> = { Users, Globe, Heart, Award };

const leadership = [
  { name: 'Alex Johnson',    role: 'CEO & Co-Founder',  bio: 'Former VP at leading tech companies with 20+ years experience building enterprise platforms.' },
  { name: 'Maria Chen',      role: 'Chief Technology Officer', bio: 'Pioneered cloud infrastructure at major providers. Leads HYSYS engineering vision.' },
  { name: 'David Park',      role: 'Chief Financial Officer',  bio: 'Finance leader with deep SaaS expertise and a track record of scaling companies globally.' },
  { name: 'Sarah Williams',  role: 'Chief Marketing Officer',  bio: 'Brand builder with global marketing experience across Africa and Europe.' },
];

const values = [
  { icon: Users,  titleKey: 'valueCustomerSuccess', descriptionKey: 'valueCustomerSuccessDesc' },
  { icon: Globe,  titleKey: 'valueTrustSecurity',   descriptionKey: 'valueTrustSecurityDesc'   },
  { icon: Heart,  titleKey: 'valueEquality',         descriptionKey: 'valueEqualityDesc'         },
  { icon: Award,  titleKey: 'valueInnovation',       descriptionKey: 'valueInnovationDesc'       },
];

const milestones = [
  { year: '2010', eventKey: 'milestone2010' },
  { year: '2014', eventKey: 'milestone2014' },
  { year: '2018', eventKey: 'milestone2018' },
  { year: '2022', eventKey: 'milestone2022' },
  { year: '2026', eventKey: 'milestone2026' },
];

const stats = [
  { value: '150K+', label: 'Companies worldwide',  icon: Building2 },
  { value: '40M+',  label: 'Active users',          icon: Users     },
  { value: '60+',   label: 'Countries served',      icon: Globe     },
  { value: '99.9%', label: 'Uptime SLA',            icon: TrendingUp},
];

export function AboutPage() {
  const { t } = useTranslation();
  const content = useSiteContent('about');
  const resolvedLeadership = (content.getContentRaw('leadership_team') ?? leadership) as typeof leadership;
  const resolvedMilestones = (content.getContentRaw('milestones') ?? milestones) as typeof milestones;
  const rawValues = content.getContentRaw('values') as any[] | null;
  const resolvedValues = rawValues
    ? rawValues.map((v: any) => ({ ...v, icon: iconMap[v.iconName] || Heart }))
    : values;

  return (
    <div className="pt-16">
      <SEO title="About Us" />

      <section className="products-hero">
        <div className="products-container">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-6">
            <Sparkles className="w-4 h-4" /> About Us
          </span>
          <h1>{content.getContent('hero_title', t('aboutTitle'))}</h1>
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-[#0a2540] leading-8">
            {content.getContent('hero_desc', t('aboutDesc'))}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <ScrollReveal key={idx}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
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
                  <Sparkles className="w-4 h-4" /> Our Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-6 leading-tight">
                  {content.getContent('mission_title', t('ourMission'))}
                </h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  {content.getContent('mission_text_1', t('missionText1'))}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {content.getContent('mission_text_2', t('missionText2'))}
                </p>
                <div className="space-y-3 mb-8">
                  {['Customer-first mindset', 'Enterprise-grade security', 'Continuous innovation', 'Global reach, local expertise'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-bold hover:bg-[var(--color-secondary)] transition-all hover:shadow-xl hover:-translate-y-1">
                  {t('joinJourney')} <ArrowRight className="w-5 h-5" />
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
                    <div className="text-white/70 mb-8 text-lg">{content.getContent('stats_badge', 'Companies trust HYSYS Global Solutions')}</div>
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
                <Sparkles className="w-4 h-4" /> What We Stand For
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{content.getContent('values_title', t('ourValues'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">The principles that guide everything we do.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {resolvedValues.map((value, idx) => (
              <ScrollReveal key={idx}>
                <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{t(value.titleKey)}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{t(value.descriptionKey)}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Users className="w-4 h-4" /> The Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">{content.getContent('leadership_title', t('leadershipTeam'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">World-class leaders driving HYSYS forward.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {resolvedLeadership.map((leader, idx) => (
              <ScrollReveal key={idx}>
                <div className="group text-center bg-gray-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {leader.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg">{leader.name}</h3>
                  <p className="text-[var(--color-primary)] font-semibold text-sm mb-3">{leader.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{leader.bio}</p>
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
                <TrendingUp className="w-4 h-4" /> Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)]">{content.getContent('journey_title', t('ourJourney'))}</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]" />
            <div className="space-y-8">
              {resolvedMilestones.map((milestone, idx) => (
                <ScrollReveal key={idx}>
                  <div className="flex items-start gap-8 pl-8">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] -ml-2 mt-1.5 z-10 flex-shrink-0 shadow-lg" />
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
                      <div className="text-sm font-extrabold text-[var(--color-primary)] mb-1">{milestone.year}</div>
                      <div className="font-semibold text-gray-900">{t(milestone.eventKey)}</div>
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
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                Start Free Trial
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
