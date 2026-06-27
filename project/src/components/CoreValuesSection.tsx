import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const coreValues = ['TRUST', 'CUSTOMER SUCCESS', 'INNOVATION', 'EQUALITY', 'SUSTAINABILITY'];

export function CoreValuesSection() {
  return (
    <section className="py-12 sm:py-16 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#032d60] leading-tight mb-4 sm:mb-5">
              We believe that business is the greatest platform for change
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Grounded in trust, customer success, innovation, equality, and sustainability,
              we're committed to doing well in business and doing good in the world —
              investing 1% of our equity, technology, and time to create lasting change.
              We're also a founder and champion of Pledge 1%, a global movement to ensure
              giving back is part of companies of all sizes.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link to="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0b5394] text-white rounded-lg font-semibold text-sm hover:bg-[#032d60] transition-all hover:shadow-lg">
                See what drives us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#0b5394] rounded-lg font-semibold text-sm border-2 border-[#0b5394] hover:bg-blue-50 transition-all">
                Take the pledge <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT — core values plaque */}
          <div className="relative flex items-center justify-center">
            <div
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center py-10 sm:py-12 px-6 sm:px-8"
              style={{ background: 'linear-gradient(135deg,#032d60 0%,#0b5394 60%,#00a3e0 100%)', minHeight: 260 }}
            >
              <div className="absolute w-40 h-40 rounded-full bg-white/5 -top-10 -left-10" />
              <div className="absolute w-28 h-28 rounded-full bg-white/5 -bottom-8 -right-8" />

              {/* plaque */}
              <div
                className="relative z-10 rounded-2xl px-6 sm:px-8 py-5 sm:py-7 text-center shadow-2xl"
                style={{
                  background: 'linear-gradient(160deg,#92400e 0%,#b45309 40%,#78350f 100%)',
                  border: '3px solid #a16207',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.15)',
                  minWidth: 200,
                }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fde68a' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 inline-block" /> HYSYS
                </div>
                <div className="text-[10px] sm:text-[11px] font-extrabold text-yellow-200 tracking-[0.3em] uppercase mb-3 sm:mb-4">
                  CORE VALUES
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  {coreValues.map((v, i) => (
                    <div key={i} className="text-sm sm:text-base font-extrabold tracking-wide"
                      style={{ color: '#fef9c3', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* avatar circles */}
              <div className="absolute left-3 sm:left-4 bottom-6 sm:bottom-8 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', border: '2px solid rgba(255,255,255,0.3)' }}>
                AJ
              </div>
              <div className="absolute right-3 sm:right-4 bottom-6 sm:bottom-8 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg"
                style={{ background: 'linear-gradient(135deg,#0891b2,#0b5394)', border: '2px solid rgba(255,255,255,0.3)' }}>
                KL
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
