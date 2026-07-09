import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const industries = [
  {
    title: 'Financial Services',
    description: 'Connect with customers on their terms and deliver personalised advice at scale with trusted AI.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="6" y="18" width="36" height="24" rx="3" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="2"/><rect x="6" y="12" width="36" height="8" rx="2" fill="#a78bfa"/><circle cx="14" cy="34" r="3" fill="white"/><rect x="20" y="32" width="14" height="3" rx="1.5" fill="white" opacity="0.7"/></svg>),
    link: '/industries/financial-services',
  },
  {
    title: 'Retail',
    description: 'Acquire profitable customers faster with unified, real-time data and AI-powered personalisation.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M8 14h32l-4 18H12L8 14z" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="2"/><circle cx="18" cy="38" r="3" fill="#a78bfa"/><circle cx="30" cy="38" r="3" fill="#a78bfa"/></svg>),
    link: '/industries/retail',
  },
  {
    title: 'Healthcare & Life Sciences',
    description: 'Elevate your workforce with AI agents that handle admin tasks so care teams can focus on patients.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="8" y="8" width="32" height="32" rx="16" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="2"/><path d="M24 16v16M16 24h16" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>),
    link: '/industries/healthcare',
  },
  {
    title: 'Technology',
    description: 'Automate workflows, unify and integrate data, and thrive in a new era of tech, powered by trusted AI.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><circle cx="24" cy="24" r="16" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="2"/><circle cx="24" cy="24" r="5" fill="white"/><path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>),
    link: '/industries/technology',
  },
  {
    title: 'Manufacturing',
    description: 'Integrate all your data across a unified value chain to better serve customers and channel partners.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><circle cx="24" cy="24" r="10" fill="none" stroke="#c4b5fd" strokeWidth="3"/><circle cx="24" cy="24" r="4" fill="white"/><path d="M24 8v6M24 34v6M8 24h6M34 24h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>),
    link: '/industries/manufacturing',
  },
  {
    title: 'Public Sector',
    description: 'Deliver trusted government services faster with AI that meets the highest security and compliance standards.',
    icon: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M24 6l18 10v4H6v-4L24 6z" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="2"/><rect x="10" y="20" width="5" height="18" rx="1" fill="white" opacity="0.8"/><rect x="21.5" y="20" width="5" height="18" rx="1" fill="white" opacity="0.8"/><rect x="33" y="20" width="5" height="18" rx="1" fill="white" opacity="0.8"/></svg>),
    link: '/industries/public-sector',
  },
];

export function IndustriesSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-4">
            Launch faster with 16+ Agentforce solutions, built for your industry
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Designed with industry expertise, these out-of-the-box solutions align with your workflows,
            data, and customer needs, so you can modernise faster and deliver value from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(145deg,#7c3aed 0%,#6d28d9 40%,#8b5cf6 100%)', minHeight: 220 }}
            >
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.10) 0%,transparent 60%)' }} />
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'rgba(139,92,246,0.35)', filter: 'blur(36px)', transform: 'translate(30%,30%)' }} />

              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">{ind.title}</h3>
                <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">{ind.description}</p>
              </div>

              <div className="relative flex items-end justify-between mt-6 sm:mt-8">
                <Link to={ind.link}
                  className="text-white font-semibold text-sm underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all">
                  Learn more
                </Link>
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.92)' }}>
                  {ind.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/industries"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl font-bold text-[var(--color-primary)] text-sm border-2 border-[var(--color-primary)] bg-white hover:bg-blue-50 transition-all hover:shadow-md">
            See all industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
