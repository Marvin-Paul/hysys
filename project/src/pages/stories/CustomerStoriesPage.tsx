import { Link, useParams } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Sparkles, Star, Users, Shield, Filter } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { StoryCard } from '../../components/ui/StoryCard';
import { PageHero } from '../../components/ui/PageHero';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { useTranslation } from '../../lib/i18n';
import { useSiteContent } from '../../hooks/useSiteContent';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { mergeCmsList, cmsText } from '../../lib/cms/cmsContent';
import { storyThumbnails } from '../../lib/cms/cardDefaults';
import { articleJsonLd, breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { trackEvent } from '../../lib/analytics/track';
import { CUSTOMER_STORIES } from '../../lib/content/customerStories';
import { MARMIDON_MODULES, MARMIDON_SECTORS } from '../../lib/marmidonCatalog';

const COLORS = [
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-teal-600',
  'from-violet-600 to-purple-700',
  'from-amber-500 to-orange-600',
];

const customerStories = CUSTOMER_STORIES;

const globalStats = [
  { id: 'customers', value: '150K+', label: 'Customers worldwide', iconName: 'Users' },
  { id: 'productivity', value: '35%', label: 'Avg. productivity boost', iconName: 'TrendingUp' },
  { id: 'rating', value: '4.8★', label: 'Average customer rating', iconName: 'Star' },
  { id: 'retention', value: '99.9%', label: 'Customer retention rate', iconName: 'Shield' },
];

const statIconMap: Record<string, typeof Users> = { Users, TrendingUp, Star, Shield };

export function CustomerStoriesPage() {
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const [sectorFilter, setSectorFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const resolvedStories = mergeCmsList(
    content.getContentRaw('customer_stories') as any[] | null,
    customerStories
  ).map((story: any) => ({
    ...story,
    thumbnail: story.thumbnail || story.image || storyThumbnails[story.id] || '',
    sectorSlug: story.sectorSlug ?? CUSTOMER_STORIES.find((s) => s.id === story.id)?.sectorSlug ?? '',
    moduleSlugs: story.moduleSlugs ?? CUSTOMER_STORIES.find((s) => s.id === story.id)?.moduleSlugs ?? [],
  }));

  const filteredStories = resolvedStories.filter((story: any) => {
    if (sectorFilter && story.sectorSlug !== sectorFilter) return false;
    if (moduleFilter && !(story.moduleSlugs ?? []).includes(moduleFilter)) return false;
    return true;
  });
  const resolvedStats = mergeCmsList(
    content.getContentRaw('stories_stats') as any[] | null,
    globalStats
  ).map((stat: any) => ({
    ...stat,
    icon: statIconMap[String(stat.iconName)] || Users,
  }));

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.customers.title} description={PAGE_META.customers.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Customers' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> Customer Stories
          </span>
        }
        title={content.getContentAny(['customerStoriesTitle', 'hero_title'], t('customerStoriesTitle'))}
        description={content.getContentAny(['customerStoriesDesc', 'hero_desc'], t('customerStoriesDesc'))}
      >
        <Link
          to="#featured-stories"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[#08407a]"
        >
          {content.getContent('stories_list_hero_cta_primary', 'Read Stories')} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-8 py-4 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:bg-[#f5f9fc]"
        >
          {content.getContent('stories_list_hero_cta_secondary', 'Contact Sales')}
        </Link>
      </LightPageHeader>

      <section className="page-section--muted py-16 border-b border-slate-100">
        <div className="products-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {resolvedStats.map((stat, idx) => (
              <ScrollReveal key={stat.id ?? idx}>
                <div className="story-stat text-center">
                  <div className="story-stat__icon">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="story-stat__value">{stat.value}</div>
                  <div className="story-stat__label">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-stories" className="products-catalog">
        <div className="products-container">
          <ScrollReveal>
            <SectionHeading
              badge={
                <span className="type-badge type-badge--light">
                  <Sparkles className="w-4 h-4" /> {content.getContent('featured_badge', 'Featured Stories')}
                </span>
              }
              title={content.getContent('featured_section_title', 'Trusted by industry leaders')}
              description={content.getContent('featured_section_desc', 'See how organisations like yours are achieving remarkable results with Marmidon.')}
            />
          </ScrollReveal>

          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Filter className="w-4 h-4" /> Filter stories
            </span>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="form-control max-w-xs py-2 text-sm"
              aria-label="Filter by industry"
            >
              <option value="">All industries</option>
              {MARMIDON_SECTORS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title}</option>
              ))}
            </select>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="form-control max-w-xs py-2 text-sm"
              aria-label="Filter by module"
            >
              <option value="">All modules</option>
              {MARMIDON_MODULES.map((m) => (
                <option key={m.slug} value={m.slug}>{m.shortName}</option>
              ))}
            </select>
            {(sectorFilter || moduleFilter) && (
              <button
                type="button"
                onClick={() => { setSectorFilter(''); setModuleFilter(''); }}
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="pro-card-grid">
            {filteredStories.map((story: any, idx: number) => (
              <ScrollReveal key={story.id}>
                <StoryCard
                  to={`/customers/${story.id}`}
                  name={cmsText(story.name, story.nameKey, t)}
                  industry={cmsText(story.industry, story.industryKey, t)}
                  quote={cmsText(story.quote, story.quoteKey, t)}
                  logo={story.logo}
                  thumbnail={story.thumbnail || story.image}
                  results={story.results}
                  accent={COLORS[idx % COLORS.length]}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContentAny(['shareYourStory', 'cta_title'], t('shareYourStory'))}
        description={content.getContentAny(['shareYourStoryDesc', 'cta_desc'], t('shareYourStoryDesc'))}
        primaryLabel={content.getContentAny(['contactUsBtn', 'cta_button'], t('contactUsBtn'))}
        primaryTo="/contact"
        secondaryLabel="Request a Demo"
        secondaryTo="/request-a-demo"
      />
    </div>
  );
}

export function CustomerStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const rawDetail = content.getContentRaw('customer_stories') as any[] | null;
  const mergedStories = mergeCmsList(rawDetail, customerStories);
  const story = mergedStories.find((s) => s.id === storyId);
  const results = story ? (Array.isArray((story as any).results) ? (story as any).results : []) : [];
  const storyIdx = customerStories.findIndex(s => s.id === storyId);
  const color = COLORS[storyIdx >= 0 ? storyIdx % COLORS.length : 0];
  const relatedStories = mergedStories.filter((s) => s.id !== storyId).slice(0, 3);

  const storyName = story ? cmsText(story.name, story.nameKey, t) : '';
  const storyIndustry = story ? cmsText(story.industry, story.industryKey, t) : '';
  const storyQuote = story ? cmsText(story.quote, story.quoteKey, t) : '';
  const storyChallenge = story ? cmsText(story.challenge, story.challengeKey, t) : '';
  const storySolution = story ? cmsText(story.solution, story.solutionKey, t) : '';

  const storyJsonLd = useMemo(() => {
    if (!story || !storyId) return undefined;
    return [
      articleJsonLd({
        headline: `${storyName} — Marmidon customer story`,
        description: storyQuote,
        url: `https://www.marmidon.com/customers/${storyId}`,
        datePublished: '2026-01-01',
        author: 'Marmidon Global Solutions',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Customers', path: '/customers' },
        { name: storyName, path: `/customers/${storyId}` },
      ]),
    ];
  }, [story, storyName, storyQuote, storyId]);

  useEffect(() => {
    if (!story) return;
    trackEvent('case_study_view', { story_name: storyName, story_id: storyId ?? '' });
  }, [story, storyName, storyId]);

  if (!story) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('storyNotFound')}</h1>
          <Link to="/customers" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllStories')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={storyName} description={storyQuote} jsonLd={storyJsonLd} />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Customers', path: '/customers' },
          { label: storyName },
        ]}
      />

      <PageHero
        badge={storyIndustry}
        title={storyName}
        subtitle={content.getContent('detail_subtitle', 'Success Story')}
        description={`"${storyQuote}"`}
        primaryCta={{ label: content.getContent('detail_hero_primary_cta', t('contactSales')), to: '/contact' }}
        secondaryCta={{ label: content.getContent('detail_hero_secondary_cta', t('viewAllStories')), to: '/customers' }}
      />

      {/* Results */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-3 gap-6">
              {results.map((r: any, idx: number) => (
                <div key={idx} className={`bg-gradient-to-br ${color} rounded-3xl p-6 text-center shadow-xl`}>
                  <div className="text-4xl font-extrabold text-white mb-1">{r.value}</div>
                  <div className="text-sm text-white/70">{r.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Story detail */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">{content.getContent('detail_challenge_heading', t('theChallenge'))}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{storyChallenge}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">{content.getContent('detail_solution_heading', t('theSolution'))}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{storySolution}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related stories */}
      {relatedStories.length > 0 && (
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                badge={
                  <span className="type-badge type-badge--light">
                    <Sparkles className="w-4 h-4" /> {content.getContent('related_badge', 'Related Stories')}
                  </span>
                }
                title={content.getContent('related_title', 'More success stories')}
                description={content.getContent('related_desc', 'Discover how other organisations transformed their operations with Marmidon.')}
              />
            </ScrollReveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((s: any, idx: number) => {
                const relColor = COLORS[(storyIdx + 1 + idx) % COLORS.length];
                return (
                  <ScrollReveal key={s.id}>
                    <StoryCard
                      to={`/customers/${s.id}`}
                      name={cmsText(s.name, s.nameKey, t)}
                      industry={cmsText(s.industry, s.industryKey, t)}
                      quote={cmsText(s.quote, s.quoteKey, t)}
                      logo={s.logo}
                      thumbnail={s.thumbnail || s.image}
                      results={s.results}
                      accent={relColor}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4hairyH-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.getContent('detail_cta_title', 'Ready to write your success story?')}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">{content.getContent('detail_cta_desc', 'Join 150,000+ businesses achieving remarkable results with Marmidon.')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-a-demo" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {content.getContent('detail_cta_primary', 'Request a Demo')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/customers" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                {content.getContent('detail_cta_secondary', 'More Stories')}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
