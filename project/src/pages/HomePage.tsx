import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { CustomerStoriesSection } from '../components/CustomerStoriesSection';
import { FAQSection } from '../components/FAQSection';

const trustedBrands = ['Spotify', 'Toyota', 'Adobe', 'IBM', 'Amazon Web Services', 'Cisco'];

const stats = [
  { value: '150K+', label: 'Companies Trust Us' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '40M+', label: 'Active Users' },
  { value: '60+', label: 'Countries' },
];

const productCards = [
  { icon: Users, title: 'Sales Cloud', subtitle: 'CRM Platform', description: 'Drive revenue growth with intelligent sales automation and real-time forecasting.', color: 'from-blue-500 to-blue-700', bgColor: 'bg-blue-50', link: '/products/sales-cloud' },
  { icon: BarChart3, title: 'Service Cloud', subtitle: 'Customer Service', description: 'Deliver exceptional support experiences with AI-powered service solutions.', color: 'from-cyan-500 to-teal-600', bgColor: 'bg-cyan-50', link: '/products/service-cloud' },
  { icon: Zap, title: 'Marketing Cloud', subtitle: 'Digital Marketing', description: 'Create personalized customer journeys across every channel and touchpoint.', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', link: '/products/marketing-cloud' },
  { icon: Shield, title: 'Commerce Cloud', subtitle: 'E-Commerce', description: 'Build seamless shopping experiences that convert browsers into buyers.', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', link: '/products/commerce-cloud' },
];

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Sub-second response times ensure your team never waits.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 Type II compliant with end-to-end encryption.' },
  { icon: Globe, title: 'Global Scale', description: 'Data centers worldwide for local performance.' },
  { icon: Award, title: 'Award Winning', description: 'Recognized as the #1 CRM platform 10 years running.' }
];

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDemoOpen = searchParams.get('demo') === '1';

  const openDemo = () => setSearchParams({ demo: '1' });
  const closeDemo = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('demo');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            <div className="text-white">
              <div className="animate-fade-in-up animate-delay-100">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  AI-Powered CRM Platform
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up animate-delay-200">
                Unify Your Customer
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg animate-fade-in-up animate-delay-300">
                The world's leading CRM platform that helps businesses of all sizes connect with customers, streamline operations, and drive growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={openDemo}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-10 animate-fade-in-up animate-delay-500">
                <p className="text-sm text-white/60 mb-4">Trusted by industry leaders</p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                  {trustedBrands.map((brand) => (
                    <div key={brand} className="text-white/40 font-semibold text-lg hover:text-white/70 transition-colors cursor-pointer">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <button
              onClick={closeDemo}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-sm transition hover:bg-white"
              aria-label="Close demo modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] p-6 sm:p-8 lg:p-10">
              <div className="rounded-3xl bg-slate-950 overflow-hidden">
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1"
                    title="HYSYS demo video"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-50 p-6 sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0b5394] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    <Play className="w-4 h-4" />
                    Demo Experience
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-900">See HYSYS in action</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Watch a concise product demo to understand how our CRM platform accelerates sales, service, and marketing across teams.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-sm font-semibold text-slate-900">What you'll see</div>
                    <ul className="mt-3 space-y-3 text-sm text-slate-600">
                      <li>• Intelligent pipeline management</li>
                      <li>• Automated service workflows</li>
                      <li>• Personalized marketing journeys</li>
                      <li>• Real-time customer analytics</li>
                    </ul>
                  </div>

                  <Link
                    to="/signup"
                    onClick={closeDemo}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0b5394] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#032d60]"
                  >
                    Start your free trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0b5394] to-[#00a3e0] bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Complete Suite of <span className="gradient-text">Cloud Products</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to connect with customers, automate processes, and grow your business.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCards.map((card, idx) => (
              <Link key={idx} to={card.link} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${card.bgColor}`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{card.subtitle}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5394] group-hover:text-[#032d60] transition-colors">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CustomerStoriesSection />

      <FAQSection />

      <section className="py-20 bg-gradient-to-br from-[#032d60] to-[#0b5394] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Built for the <span className="block text-cyan-300">Modern Enterprise</span></h2>
              <p className="text-lg text-white/80 mb-8">Our platform combines cutting-edge AI with enterprise-grade reliability to deliver a CRM experience that scales with your business.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((f, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-white/70">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Revenue Overview</h3>
                  <span className="text-xs text-cyan-300">Live</span>
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 75, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-blue-300" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyan-300">$2.4M</div>
                    <div className="text-xs text-white/60">This Quarter</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">+24%</div>
                    <div className="text-xs text-white/60">Growth Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">Start your free trial today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0b5394] text-white rounded-xl font-semibold hover:bg-[#032d60] transition-all hover:shadow-lg hover:-translate-y-0.5">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

