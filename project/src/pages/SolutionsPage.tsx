import { Link, useParams } from 'react-router-dom';
import { Building2, TrendingUp, Sparkles, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const solutionsData: Record<string, { icon: LucideIcon; title: string; subtitle: string; description: string; features: string[]; benefits: string[] }> = {
  'small-business': { icon: Building2, title: 'Small Business', subtitle: 'Grow faster', description: 'HYSYS GLOBAL SOLUTIONS LIMITED helps small businesses build stronger relationships with customers and prospects. Get started quickly with easy-to-use tools designed for growing teams.', features: ['Contact & Lead Management', 'Email Templates & Tracking', 'Mobile App Access', 'Reports & Dashboards', 'Task & Activity Management', 'Basic Automation'], benefits: ['Close deals faster', 'Build lasting relationships', 'Scale operations easily', 'Affordable pricing'] },
  'enterprise': { icon: TrendingUp, title: 'Enterprise', subtitle: 'Scale operations', description: 'The world\'s most customizable and secure CRM. Enterprise organizations trust HYSYS GLOBAL SOLUTIONS LIMITED to manage millions of customers and complex global operations.', features: ['Advanced Security & Compliance', 'Custom Development', 'API Access', 'Advanced Analytics', 'Multi-org Management', 'Dedicated Support'], benefits: ['Unlimited customization', 'Enterprise-grade security', 'Global scalability', '24/7 premium support'] },
  'startups': { icon: Sparkles, title: 'Startups', subtitle: 'Launch strong', description: 'Get your startup off the ground with a platform that grows with you. HYSYS GLOBAL SOLUTIONS LIMITED helps startups build customer relationships from day one.', features: ['Startup Pricing Programs', 'Fast Implementation', 'Scalable Infrastructure', 'Investor Reporting', 'Growth Analytics', 'Integration Ecosystem'], benefits: ['Launch quickly', 'Scale without limits', 'Attract investors', 'Build from day one'] },
  'nonprofits': { icon: Heart, title: 'Nonprofits', subtitle: 'Amplify impact', description: 'Purpose-built for nonprofits, HYSYS GLOBAL SOLUTIONS LIMITED helps organizations manage donors, volunteers, and programs efficiently. Special pricing available for eligible organizations.', features: ['Donor Management', 'Volunteer Coordination', 'Program Tracking', 'Grant Management', 'Impact Measurement', 'Special Nonprofit Pricing'], benefits: ['Increase donations', 'Engage volunteers', 'Track impact', 'Special discounts'] }
};

export function SolutionsPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Solutions for Every Business</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Whether you're a startup or enterprise, we have the right solution for your unique needs.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(solutionsData).map(([key, solution]) => (
              <Link key={key} to={`/solutions/${key}`} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{solution.subtitle}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5394]">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function SolutionDetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();
  const solution = solutionsData[solutionId || ''];

  if (!solution) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Solution Not Found</h1>
          <Link to="/solutions" className="text-[#0b5394] hover:underline">View all solutions</Link>
        </div>
      </div>
    );
  }

  const Icon = solution.icon;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">{solution.subtitle}</div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{solution.title}</h1>
              <p className="text-xl text-white/80 mb-8">{solution.description}</p>
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-xl font-semibold hover:bg-gray-50 transition-all hover:shadow-xl">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                <Icon className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
              <div className="space-y-4">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-[#0b5394] flex-shrink-0" />
                    <span className="font-medium text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits</h2>
              <div className="space-y-4">
                {solution.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0b5394]/5 to-transparent rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#0b5394] flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


