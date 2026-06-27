import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function GetStartedSection() {
  return (
    <section className="py-14 sm:py-20 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm font-semibold text-[#0b5394] mb-2 sm:mb-3 tracking-widest uppercase">
          Get started today
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#032d60] leading-tight mb-6 sm:mb-8">
          There's nothing to install, no credit card required, free for 30 days
        </h2>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#0b5394] text-white rounded-lg font-bold text-sm sm:text-base hover:bg-[#032d60] transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          Try for free
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
}
