import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Quote, TrendingUp, Zap } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const customerStories = [
  { id: 'techcorp', name: 'TechCorp', industry: 'Technology', logo: 'TC', quote: 'HYSYS GLOBAL SOLUTIONS LIMITED transformed our sales process. We increased pipeline by 150% in just 6 months.', results: [{ label: 'Pipeline increase', value: '150%' }, { label: 'Sales cycle', value: '-40%' }, { label: 'User adoption', value: '95%' }], challenge: 'TechCorp needed a way to unify their disconnected sales tools and provide visibility into their growing pipeline.', solution: 'They implemented Sales Cloud with custom automations that streamlined their unique B2B sales process.', nameKey: 'techcorp', industryKey: 'technology', quoteKey: 'techcorpQuote', challengeKey: 'techcorpChallenge', solutionKey: 'techcorpSolution' },
  { id: 'globalretail', name: 'GlobalRetail', industry: 'Retail', logo: 'GR', quote: 'With Marketing Cloud, we now deliver personalized experiences to millions of customers across every channel.', results: [{ label: 'Email open rate', value: '+65%' }, { label: 'Customer retention', value: '+32%' }, { label: 'Revenue per user', value: '+28%' }], challenge: 'GlobalRetail struggled to create consistent, personalized experiences across their 50+ retail locations and digital channels.', solution: 'Marketing Cloud unified their customer data and enabled real-time personalization across all touchpoints.', nameKey: 'globalRetail', industryKey: 'retailIndustry', quoteKey: 'globalRetailQuote', challengeKey: 'globalRetailChallenge', solutionKey: 'globalRetailSolution' },
  { id: 'healthfirst', name: 'HealthFirst', industry: 'Healthcare', logo: 'HF', quote: 'Patient satisfaction scores jumped significantly after implementing Service Cloud. Our team is more efficient than ever.', results: [{ label: 'Patient satisfaction', value: '+45%' }, { label: 'Response time', value: '-60%' }, { label: 'Agent productivity', value: '+70%' }], challenge: 'HealthFirst needed to improve patient communication while ensuring HIPAA compliance across all interactions.', solution: 'Service Cloud with Health Cloud provided secure, coordinated care across the entire patient journey.', nameKey: 'healthFirst', industryKey: 'healthcareIndustry', quoteKey: 'healthFirstQuote', challengeKey: 'healthFirstChallenge', solutionKey: 'healthFirstSolution' },
  { id: 'financetech', name: 'FinanceTech', industry: 'Financial Services', logo: 'FT', quote: 'Our advisors now have complete client visibility, enabling more meaningful conversations and faster decisions.', results: [{ label: 'AUM growth', value: '+80%' }, { label: 'Client retention', value: '+25%' }, { label: 'Advisor efficiency', value: '+50%' }], challenge: 'FinanceTech struggled with fragmented client data across multiple systems, limiting advisor effectiveness.', solution: 'Financial Services Cloud unified their data and provided AI-powered insights for better client engagement.', nameKey: 'financeTech', industryKey: 'financialIndustry', quoteKey: 'financeTechQuote', challengeKey: 'financeTechChallenge', solutionKey: 'financeTechSolution' },
];

export function CustomerStoriesPage() {
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const resolvedCustomerStories = content.getContentRaw('customer_stories') ?? customerStories;
  return (
    <div className="pt-16">
      <SEO title="Customer Stories" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{content.getContent('customerStoriesTitle', t('customerStoriesTitle'))}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.getContent('customerStoriesDesc', t('customerStoriesDesc'))}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {resolvedCustomerStories.map((story) => (
              <Link key={story.id} to={`/customer-stories/${story.id}`} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white font-bold text-xl">
                    {story.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{content.getContent(story.nameKey, t(story.nameKey))}</h3>
                    <p className="text-sm text-gray-500">{content.getContent(story.industryKey, t(story.industryKey))}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-[#0b5394]/20 mb-2" />
                <p className="text-gray-700 italic mb-6">"{content.getContent(story.quoteKey, t(story.quoteKey))}"</p>
                <div className="flex items-center gap-2 text-[#0b5394] font-medium">
                  {content.getContent('readFullStory', t('readFullStory'))} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.getContent('shareYourStory', t('shareYourStory'))}</h2>
            <p className="text-lg text-gray-600 mb-8">{content.getContent('shareYourStoryDesc', t('shareYourStoryDesc'))}</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg">
              {content.getContent('contactUsBtn', t('contactUsBtn'))} <ArrowRight className="w-5 h-5" />
            </Link>
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
  const rawStoriesDetail = content.getContentRaw('customer_stories') as any[] | null;
  const story = rawStoriesDetail
    ? rawStoriesDetail.find((s: any) => s.id === storyId)
    : customerStories.find(s => s.id === storyId);

  const results = story ? (Array.isArray((story as any).results) ? (story as any).results : []) : [];

  if (!story) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{content.getContent('storyNotFound', t('storyNotFound'))}</h1>
          <Link to="/customer-stories" className="text-[#0b5394] hover:underline">{content.getContent('viewAllStories', t('viewAllStories'))}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <SEO title={story.name} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/customer-stories" className="inline-flex items-center gap-2 text-[#0b5394] font-medium mb-8 hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> {content.getContent('backToAllStories', t('backToAllStories'))}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[#032d60] to-[#0b5394] p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">
                  {story.logo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{content.getContent(story.nameKey, t(story.nameKey))}</h1>
                  <p className="text-white/80">{content.getContent(story.industryKey, t(story.industryKey))}</p>
                </div>
              </div>
              <blockquote className="text-xl italic text-white/90">"{content.getContent(story.quoteKey, t(story.quoteKey))}"</blockquote>
            </div>
          </ScrollReveal>

          <div className="p-8">
            <ScrollReveal>
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-100">
                {results.map((result, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-[#0b5394]">{result.value}</div>
                    <div className="text-sm text-gray-600">{result.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#0b5394]" /> {content.getContent('theChallenge', t('theChallenge'))}
                  </h2>
                  <p className="text-gray-700">{content.getContent(story.challengeKey, t(story.challengeKey))}</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#0b5394]" /> {content.getContent('theSolution', t('theSolution'))}
                  </h2>
                  <p className="text-gray-700">{content.getContent(story.solutionKey, t(story.solutionKey))}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
