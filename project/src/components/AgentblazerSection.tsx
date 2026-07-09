import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const badges = [
  { label: 'Ranger',      ring: 'from-slate-300 to-slate-400',   bg: '#e2e8f0', inner: '#cbd5e1', emoji: '🚀' },
  { label: 'Champion',    ring: 'from-yellow-300 to-amber-500',  bg: '#fef3c7', inner: '#fde68a', emoji: '🏆' },
  { label: 'Trailblazer', ring: 'from-violet-300 to-pink-400',   bg: '#ede9fe', inner: '#ddd6fe', emoji: '⭐' },
];

export function AgentblazerSection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-3 sm:mb-4">
          Become an Agentblazer
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-7 sm:mb-8">
          Learn essential AI and Agentforce skills required to shape the future of work — for free.
        </p>

        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[var(--color-primary)] text-white rounded-lg font-bold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg hover:-translate-y-0.5 mb-10 sm:mb-14"
        >
          Explore support and resources <ArrowRight className="w-4 h-4" />
        </Link>

        {/* badge cards — 3 cols on sm+, 1 col on xs */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mt-2">
          {badges.map((b, i) => (
            <div key={i}
              className="flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-white">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${b.ring} flex items-center justify-center shadow-lg`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center gap-1"
                  style={{ background: b.bg, border: `3px solid ${b.inner}` }}>
                  <span className="text-2xl sm:text-3xl leading-none">{b.emoji}</span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest">Agentblazer</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-[var(--color-secondary)]">{b.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
