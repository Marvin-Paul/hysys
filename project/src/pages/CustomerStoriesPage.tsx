import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Quote, TrendingUp, Zap } from 'lucide-react';

const customerStories = [
  { id: 'techcorp', name: 'TechCorp', industry: 'Technology', logo: 'TC', quote: 'HYSYS GLOBAL SOLUTIONS LIMITED transformed our sales process. We increased pipeline by 150% in just 6 months.', results: [{ label: 'Pipeline increase', value: '150%' }, { label: 'Sales cycle', value: '-40%' }, { label: 'User adoption', value: '95%' }], challenge: 'TechCorp needed a way to unify their disconnected sales tools and provide visibility into their growing pipeline.', solution: 'They implemented Sales Cloud with custom automations that streamlined their unique B2B sales process.' },
  { id: 'globalretail', name: 'GlobalRetail', industry: 'Retail', logo: 'GR', quote: 'With Marketing Cloud, we now deliver personalized experiences to millions of customers across every channel.', results: [{ label: 'Email open rate', value: '+65%' }, { label: 'Customer retention', value: '+32%' }, { label: 'Revenue per user', value: '+28%' }], challenge: 'GlobalRetail struggled to create consistent, personalized experiences across their 50+ retail locations and digital channels.', solution: 'Marketing Cloud unified their customer data and enabled real-time personalization across all touchpoints.' },
  { id: 'healthfirst', name: 'HealthFirst', industry: 'Healthcare', logo: 'HF', quote: 'Patient satisfaction scores jumped significantly after implementing Service Cloud. Our team is more efficient than ever.', results: [{ label: 'Patient satisfaction', value: '+45%' }, { label: 'Response time', value: '-60%' }, { label: 'Agent productivity', value: '+70%' }], challenge: 'HealthFirst needed to improve patient communication while ensuring HIPAA compliance across all interactions.', solution: 'Service Cloud with Health Cloud provided secure, coordinated care across the entire patient journey.' },
  { id: 'financetech', name: 'FinanceTech', industry: 'Financial Services', logo: 'FT', quote: 'Our advisors now have complete client visibility, enabling more meaningful conversations and faster decisions.', results: [{ label: 'AUM growth', value: '+80%' }, { label: 'Client retention', value: '+25%' }, { label: 'Advisor efficiency', value: '+50%' }], challenge: 'FinanceTech struggled with fragmented client data across multiple systems, limiting advisor effectiveness.', solution: 'Financial Services Cloud unified their data and provided AI-powered insights for better client engagement.' },
];

export function CustomerStoriesPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Customer Success Stories</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">See how companies worldwide are transforming their businesses with HYSYS GLOBAL SOLUTIONS LIMITED.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {customerStories.map((story) => (
              <Link key={story.id} to={`/customer-stories/${story.id}`} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white font-bold text-xl">
                    {story.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.industry}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-[#0b5394]/20 mb-2" />
                <p className="text-gray-700 italic mb-6">"{story.quote}"</p>
                <div className="flex items-center gap-2 text-[#0b5394] font-medium">
                  Read full story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Story</h2>
          <p className="text-lg text-gray-600 mb-8">Join hundreds of companies sharing their HYSYS GLOBAL SOLUTIONS LIMITED success stories.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function CustomerStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const story = customerStories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <Link to="/customer-stories" className="text-[#0b5394] hover:underline">View all stories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/customer-stories" className="inline-flex items-center gap-2 text-[#0b5394] font-medium mb-8 hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to all stories
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-[#032d60] to-[#0b5394] p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center font-bold text-2xl">
                {story.logo}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{story.name}</h1>
                <p className="text-white/80">{story.industry}</p>
              </div>
            </div>
            <blockquote className="text-xl italic text-white/90">"{story.quote}"</blockquote>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-100">
              {story.results.map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-[#0b5394]">{result.value}</div>
                  <div className="text-sm text-gray-600">{result.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0b5394]" /> The Challenge
                </h2>
                <p className="text-gray-700">{story.challenge}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#0b5394]" /> The Solution
                </h2>
                <p className="text-gray-700">{story.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

