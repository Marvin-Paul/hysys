import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Linkedin, Twitter } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { leadershipPhotos } from '../../lib/cms/cardDefaults';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { OptimizedImage } from '../../components/ui/OptimizedImage';

const defaultTeam = [
  { id: 'alex-johnson', name: 'Alex Johnson', role: 'CEO & Co-Founder', bio: 'Former VP at leading tech companies with 20+ years experience building enterprise platforms.', image: leadershipPhotos['Alex Johnson'] },
  { id: 'maria-chen', name: 'Maria Chen', role: 'Chief Technology Officer', bio: 'Pioneered cloud infrastructure at major providers. Leads Marmidon engineering vision.', image: leadershipPhotos['Maria Chen'] },
  { id: 'david-park', name: 'David Park', role: 'Chief Financial Officer', bio: 'Finance leader with deep SaaS expertise and a track record of scaling companies globally.', image: leadershipPhotos['David Park'] },
  { id: 'sarah-williams', name: 'Sarah Williams', role: 'Chief Marketing Officer', bio: 'Brand builder with global marketing experience across Africa and Europe.', image: leadershipPhotos['Sarah Williams'] },
];

export function TeamPage() {
  const header = useSiteContent('team');
  const content = useSiteContent('about');
  const resolvedTeam = mergeCmsList(
    content.getContentRaw('leadership_team') as any[] | null,
    defaultTeam
  ).map((member: any) => ({
    ...member,
    image: member.image || member.photo || leadershipPhotos[member.name] || '',
  }));

  const teamJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company' },
    { name: 'Team', path: '/company/team' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.team.title} description={PAGE_META.team.description} jsonLd={teamJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Team' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {header.getContent('team_hero_badge', 'Team')}
          </span>
        }
        title={header.getContent('team_title', 'Our leadership team')}
        description={header.getContent('team_desc', 'Meet the people driving innovation at Marmidon.')}
      >
        <Link to="/company" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" /> {header.getContent('team_back_label', 'Back to Company')}
        </Link>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {resolvedTeam.map((member: any) => (
              <ScrollReveal key={member.id}>
                <div className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm text-center transition hover:shadow-lg">
                  <div className="mx-auto h-24 w-24 rounded-full overflow-hidden ring-4 ring-slate-100">
                    {member.image ? (
                      <OptimizedImage src={member.image} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-bold">
                        {member.name?.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-[var(--color-primary)]">{member.role}</p>
                  {member.bio && <p className="mt-2 text-xs text-slate-500">{member.bio}</p>}
                  <div className="mt-3 flex justify-center gap-2">
                    <a href="#" className="rounded-full bg-slate-100 p-1.5 text-slate-400 hover:text-[var(--color-primary)] transition"><Twitter className="w-3.5 h-3.5" /></a>
                    <a href="#" className="rounded-full bg-slate-100 p-1.5 text-slate-400 hover:text-[var(--color-primary)] transition"><Linkedin className="w-3.5 h-3.5" /></a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={header.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={header.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={header.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
