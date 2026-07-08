import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Quote, TrendingUp, Zap, Sparkles, Star, Users, BarChart3, Shield } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
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
    <div className="pt-16">
      <SEO title="Customer Stories" />

      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse" style={{
            background: i % 2 === 0 ? 'rgba(0,163,224,0.4)' : 'rgba(255,255,255,0.3)',
            top: `${15+(i*8)%65}%`, left: `${5+(i*11)%90}%`, animationDelay: `${i*0.4}s`,
          }} />
        ))}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 text-white">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                Real Results from Real Customers
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">HYSYS GLOBAL SOLUTIONS LIMITED</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {content.getContent('customerStoriesTitle', t('customerStoriesTitle'))}
              <span className="block bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent mt-2">
                Success Stories
              </span>
            </h1>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-amber-400 via-cyan-300 to-blue-400" />
            </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              {content.getContent('customerStoriesDesc', t('customerStoriesDesc'))}
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Global stats ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {globalStats.map((stat, idx) => (
              <ScrollReveal key={idx}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#0b5394] to-[#00a3e0] bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stories grid ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Featured Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">Trusted by industry leaders</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">See how organisations like yours are achieving remarkable results with HYSYS.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {resolvedStories.map((story: any, idx: number) => (
              <ScrollReveal key={story.id}>
                <Link to={`/customer-stories/${story.id}`} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 block">
                  {/* Top color bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${COLORS[idx % COLORS.length]}`} />

                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${COLORS[idx % COLORS.length]} flex items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {story.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#0b5394] transition-colors">
                          {content.getContent(story.nameKey, t(story.nameKey))}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 mt-1">
                          {content.getContent(story.industryKey, t(story.industryKey))}
                        </span>
                      </div>
                      {/* Star rating */}
                      <div className="ml-auto flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="w-8 h-8 text-[#0b5394]/10 absolute -top-1 -left-1" />
                      <p className="text-gray-700 italic leading-relaxed pl-5">
                        "{content.getContent(story.quoteKey, t(story.quoteKey))}"
                      </p>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {(story.results || []).map((r: any, ri: number) => (
                        <div key={ri} className={`bg-gradient-to-br ${COLORS[idx % COLORS.length]} rounded-2xl p-3 text-center`}>
                          <div className="text-xl font-extrabold text-white">{r.value}</div>
                          <div className="text-[10px] text-white/70 leading-tight mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#0b5394] font-bold text-sm group-hover:text-[#032d60] transition-colors">
                      {content.getContent('readFullStory', t('readFullStory'))}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Star className="w-10 h-10 text-amber-300 fill-amber-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{content.getContent('shareYourStory', t('shareYourStory'))}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{content.getContent('shareYourStoryDesc', t('shareYourStoryDesc'))}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
          <Link to="/customer-stories" className="text-[#0b5394] font-semibold hover:underline">{t('viewAllStories')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={story.name} />

      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <ScrollReveal>
            <Link to="/customer-stories" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to all stories
            </Link>
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-extrabold text-2xl mx-auto mb-6 shadow-2xl`}>
              {story.logo}
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white/80 mb-4">
              {t(story.industryKey)}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">{t(story.nameKey)}</h1>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-cyan-300" />
            </div>
            <div className="flex justify-center gap-0.5 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-300 fill-amber-300" />)}
            </div>
            <blockquote className="text-xl sm:text-2xl text-white/85 italic max-w-3xl mx-auto leading-relaxed font-light">
              "{t(story.quoteKey)}"
            </blockquote>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4hairyH-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to write your success story?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Join 150,000+ businesses achieving remarkable results with HYSYS.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
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
