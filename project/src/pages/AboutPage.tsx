import { Link } from 'react-router-dom';
import { Users, Award, Globe, Heart, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { SEO } from '../components/SEO';
import { useSiteContent } from '../hooks/useSiteContent';

const iconMap: Record<string, LucideIcon> = {
  Users, Globe, Heart, Award,
};

const leadership = [
  { name: 'Alex Johnson', role: 'CEO', bio: 'Former VP at leading tech companies with 20+ years experience.' },
  { name: 'Maria Chen', role: 'CTO', bio: 'Pioneered cloud infrastructure at major providers.' },
  { name: 'David Park', role: 'CFO', bio: 'Finance leader with deep SaaS expertise.' },
  { name: 'Sarah Williams', role: 'CMO', bio: 'Brand builder with global marketing experience.' },
];

const values = [
  { icon: Users, titleKey: 'valueCustomerSuccess', descriptionKey: 'valueCustomerSuccessDesc' },
  { icon: Globe, titleKey: 'valueTrustSecurity', descriptionKey: 'valueTrustSecurityDesc' },
  { icon: Heart, titleKey: 'valueEquality', descriptionKey: 'valueEqualityDesc' },
  { icon: Award, titleKey: 'valueInnovation', descriptionKey: 'valueInnovationDesc' },
];

const milestones = [
  { year: '2010', eventKey: 'milestone2010' },
  { year: '2014', eventKey: 'milestone2014' },
  { year: '2018', eventKey: 'milestone2018' },
  { year: '2022', eventKey: 'milestone2022' },
  { year: '2026', eventKey: 'milestone2026' },
];

export function AboutPage() {
  const { t } = useTranslation();
  const content = useSiteContent('about');
  const resolvedLeadership = content.getContentRaw('leadership_team') ?? leadership;
  const resolvedMilestones = content.getContentRaw('milestones') ?? milestones;
  const rawValues = content.getContentRaw('values') as any[] | null;
  const resolvedValues = rawValues
    ? rawValues.map((v: any) => ({ ...v, icon: iconMap[v.iconName] || Heart }))
    : values;

  return (
    <div className="pt-16">
      <SEO title="About Us" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{content.getContent('hero_title', t('aboutTitle'))}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.getContent('hero_desc', t('aboutDesc'))}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.getContent('mission_title', t('ourMission'))}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {content.getContent('mission_text_1', t('missionText1'))}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {content.getContent('mission_text_2', t('missionText2'))}
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 text-[#0b5394] font-semibold hover:underline">
                {t('joinJourney')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0b5394] to-[#00a3e0] rounded-2xl p-8 text-white">
                <div className="text-5xl font-bold mb-2">150K+</div>
                <div className="text-white/80 mb-8">{content.getContent('stats_badge', 'Companies trust HYSYS GLOBAL SOLUTIONS LIMITED')}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4"><div className="text-2xl font-bold">40M+</div><div className="text-sm text-white/80">Users</div></div>
                  <div className="bg-white/10 rounded-lg p-4"><div className="text-2xl font-bold">60+</div><div className="text-sm text-white/80">Countries</div></div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{content.getContent('values_title', t('ourValues'))}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {resolvedValues.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{t(value.titleKey)}</h3>
                <p className="text-gray-600 text-sm">{t(value.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{content.getContent('leadership_title', t('leadershipTeam'))}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {resolvedLeadership.map((leader, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-gray-900">{leader.name}</h3>
                <p className="text-[#0b5394] font-medium text-sm mb-2">{leader.role}</p>
                <p className="text-gray-600 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{content.getContent('journey_title', t('ourJourney'))}</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#0b5394]" />
            <div className="space-y-8">
              {resolvedMilestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-6 pl-4">
                  <div className="w-3 h-3 rounded-full bg-[#0b5394] -ml-1.5 mt-1.5 z-10" />
                  <div>
                    <div className="text-sm font-semibold text-[#0b5394]">{milestone.year}</div>
                    <div className="font-medium text-gray-900">{t(milestone.eventKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#032d60] text-white">
        <ScrollReveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.getContent('cta_title', t('joinOurTeam'))}</h2>
          <p className="text-lg text-white/80 mb-8">{content.getContent('cta_desc', t('joinOurTeamDesc'))}</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all">
            {content.getContent('cta_button', t('viewOpenPositions'))} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
