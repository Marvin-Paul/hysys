import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    type: 'event',
    tag: 'Events',
    title: 'Dreamforce 2025',
    desc: "Join 40,000+ trailblazers for the world's largest AI & CRM conference.",
    bg: 'linear-gradient(135deg,#032d60 0%,#0b5394 60%,#00a3e0 100%)',
    avatars: ['AJ','MS','KL','RD'],
    link: '/contact',
    sparkle: true,
  },
  {
    type: 'community',
    tag: 'Community',
    title: 'Trailblazer Community',
    desc: 'Connect, learn, and grow with millions of Trailblazers worldwide.',
    bg: 'linear-gradient(135deg,#0891b2 0%,#0b5394 100%)',
    avatars: ['PW','NG','RD'],
    link: '/contact',
    sparkle: true,
  },
  {
    type: 'tools',
    tag: 'Tools & Integrations',
    title: 'AppExchange & Partners',
    desc: 'Extend HYSYS with 7,000+ apps and integrations built for every use case.',
    bg: 'linear-gradient(135deg,#f0f4ff 0%,#e0eaff 100%)',
    icons: ['🟣','📊','⚡','🔷'],
    link: '/products',
    sparkle: false,
  },
];

export function AISuccessSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#032d60] leading-tight max-w-2xl mx-auto">
            Find the insights, experts, and tools to fuel your AI success
          </h2>
        </div>

        {/* 1-col mobile → 2-col sm → 3-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Link key={i} to={c.link}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

              {/* coloured upper area */}
              <div className="relative flex items-center justify-center p-8 overflow-hidden"
                style={{ background: c.bg, minHeight: 160 }}>
                {c.sparkle && (
                  <>
                    <span className="absolute top-4 right-8 text-cyan-300 text-xl select-none">✦</span>
                    <span className="absolute bottom-5 left-6 text-blue-200 text-base select-none">✦</span>
                  </>
                )}
                {c.type !== 'tools' ? (
                  <div className="flex -space-x-3">
                    {c.avatars!.map((av, j) => (
                      <div key={j}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-md"
                        style={{ background: ['#7c3aed','#0891b2','#f97316','#ec4899'][j % 4], zIndex: c.avatars!.length - j }}>
                        {av}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {c.icons!.map((ic, j) => (
                      <div key={j} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl sm:text-2xl">
                        {ic}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* text area */}
              <div className="bg-white px-5 sm:px-6 py-4 sm:py-5 border-t border-gray-100 flex-1 flex flex-col">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{c.tag}</span>
                <h3 className="text-[#032d60] font-bold text-sm sm:text-base mt-1 mb-1 leading-snug">{c.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-snug mb-3 flex-1">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#0b5394] text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
