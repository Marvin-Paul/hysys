import { Link, useParams } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Sparkles, Star, Users, Shield } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const COLORS = [
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-teal-600',
  'from-violet-600 to-purple-700',
  'from-amber-500 to-orange-600',
];

const customerStories = [
  {
    id: 'techcorp', name: 'TechCorp', industry: 'Technology', logo: 'TC',
    quote: 'HYSYS transformed our sales process. We increased pipeline by 150% in just 6 months.',
    results: [{ label: 'Pipeline increase', value: '150%' }, { label: 'Sales cycle', value: '-40%' }, { label: 'User adoption', value: '95%' }],
    challenge: 'TechCorp needed to unify disconnected sales tools and gain visibility into their growing pipeline.',
    solution: 'They implemented Sales Cloud with custom automations that streamlined their unique B2B sales process.',
    nameKey: 'techcorp', industryKey: 'technology', quoteKey: 'techcorpQuote',
    challengeKey: 'techcorpChallenge', solutionKey: 'techcorpSolution',
  },
  {
    id: 'globalretail', name: 'GlobalRetail', industry: 'Retail', logo: 'GR',
    quote: 'With Marketing Cloud, we deliver personalised experiences to millions across every channel.',
    results: [{ label: 'Email open rate', value: '+65%' }, { label: 'Customer retention', value: '+32%' }, { label: 'Revenue per user', value: '+28%' }],
    challenge: 'GlobalRetail struggled to create consistent, personalised experiences across 50+ locations.',
    solution: 'Marketing Cloud unified customer data and enabled real-time personalisation at every touchpoint.',
    nameKey: 'globalRetail', industryKey: 'retailIndustry', quoteKey: 'globalRetailQuote',
    challengeKey: 'globalRetailChallenge', solutionKey: 'globalRetailSolution',
  },
  {
    id: 'healthfirst', name: 'HealthFirst', industry: 'Healthcare', logo: 'HF',
    quote: 'Patient satisfaction scores jumped after implementing Service Cloud. Our team is more efficient than ever.',
    results: [{ label: 'Patient satisfaction', value: '+45%' }, { label: 'Response time', value: '-60%' }, { label: 'Agent productivity', value: '+70%' }],
    challenge: 'HealthFirst needed to improve patient communication while ensuring full HIPAA compliance.',
    solution: 'Service Cloud provided secure, coordinated care across the entire patient journey.',
    nameKey: 'healthFirst', industryKey: 'healthcareIndustry', quoteKey: 'healthFirstQuote',
    challengeKey: 'healthFirstChallenge', solutionKey: 'healthFirstSolution',
  },
  {
    id: 'financetech', name: 'FinanceTech', industry: 'Financial Services', logo: 'FT',
    quote: 'Our advisors now have complete client visibility, enabling more meaningful conversations and faster decisions.',
    results: [{ label: 'AUM growth', value: '+80%' }, { label: 'Client retention', value: '+25%' }, { label: 'Advisor efficiency', value: '+50%' }],
    challenge: 'FinanceTech had fragmented client data across multiple systems, limiting advisor effectiveness.',
    solution: 'Financial Services Cloud unified data and provided AI-powered insights for better engagement.',
    nameKey: 'financeTech', industryKey: 'financialIndustry', quoteKey: 'financeTechQuote',
    challengeKey: 'financeTechChallenge', solutionKey: 'financeTechSolution',
  },
];

const globalStats = [
  { value: '150K+', label: 'Customers worldwide', icon: Users },
  { value: '35%',   label: 'Avg. productivity boost', icon: TrendingUp },
  { value: '4.8★',  label: 'Average customer rating', icon: Star },
  { value: '99.9%', label: 'Customer retention rate', icon: Shield },
];

export function CustomerStoriesPage() {
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const resolvedStories = (content.getContentRaw('customer_stories') as any[] | null) ?? customerStories;

  return (
    <div className="pt-16 customer-stories-page">
      <SEO title="Customer Stories" />

      <section className="stories-hero">
        <div className="container">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
            <Sparkles className="w-4 h-4" /> Customer Stories
          </span>
          <h1>{content.getContent('customerStoriesTitle', t('customerStoriesTitle'))}</h1>
          <p>{content.getContent('customerStoriesDesc', t('customerStoriesDesc'))}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/customer-stories" className="btn-read">
              Read Stories
            </Link>
            <Link to="/contact" className="btn-read bg-[#0052a3] hover:bg-[#003f7a]">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global stats ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {globalStats.map((stat, idx) => (
              <ScrollReveal key={idx}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stories grid ── */}
      <section className="stories-grid-section">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Featured Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">Trusted by industry leaders</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">See how organisations like yours are achieving remarkable results with HYSYS.</p>
            </div>
          </ScrollReveal>

          <div className="stories-grid">
            {resolvedStories.map((story: any, idx: number) => (
              <ScrollReveal key={story.id}>
                <Link to={`/customer-stories/${story.id}`} className="story-card group">
                  <div className="card-header">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${COLORS[idx % COLORS.length]} flex items-center justify-center text-white font-extrabold text-xl transition duration-300 group-hover:scale-105`}> 
                      {story.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#061c3f]">{content.getContent(story.nameKey, t(story.nameKey))}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/80 text-[#4a607a] mt-1">
                        {content.getContent(story.industryKey, t(story.industryKey))}
                      </span>
                    </div>
                  </div>

                  <p className="quote">"{content.getContent(story.quoteKey, t(story.quoteKey))}"</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {(story.results || []).map((r: any, ri: number) => (
                      <div key={ri} className={`rounded-2xl p-3 text-center bg-white/70 backdrop-blur-sm`}>
                        <div className="text-xl font-extrabold text-[#061c3f]">{r.value}</div>
                        <div className="text-[10px] text-[#4a607a] leading-tight mt-0.5">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer">
                    <span className="client-name">{content.getContent('readFullStory', t('readFullStory'))}</span>
                    <button type="button" className="btn-read">
                      Read
                    </button>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Star className="w-10 h-10 text-amber-300 fill-amber-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.getContent('shareYourStory', t('shareYourStory'))}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{content.getContent('shareYourStoryDesc', t('shareYourStoryDesc'))}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {content.getContent('contactUsBtn', t('contactUsBtn'))} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                Start Your Journey
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export function CustomerStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const rawDetail = content.getContentRaw('customer_stories') as any[] | null;
  const story = rawDetail ? rawDetail.find((s: any) => s.id === storyId) : customerStories.find(s => s.id === storyId);
  const results = story ? (Array.isArray((story as any).results) ? (story as any).results : []) : [];
  const storyIdx = customerStories.findIndex(s => s.id === storyId);
  const color = COLORS[storyIdx >= 0 ? storyIdx % COLORS.length : 0];

  if (!story) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('storyNotFound')}</h1>
          <Link to="/customer-stories" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllStories')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={story.name} />

      <PageHero
        badge={t(story.industryKey)}
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title={t(story.nameKey)}
        subtitle="Success Story"
        description={`"${t(story.quoteKey)}"`}
        primaryCta={{ label: t('contactSales'), to: '/contact' }}
        secondaryCta={{ label: t('viewAllStories'), to: '/customer-stories' }}
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
                <h2 className="text-xl font-extrabold text-gray-900">{t('theChallenge')}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{t(story.challengeKey)}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">{t('theSolution')}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">{t(story.solutionKey)}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4hairyH-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to write your success story?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Join 150,000+ businesses achieving remarkable results with HYSYS.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/customer-stories" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                More Stories
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
