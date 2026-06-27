import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { useState } from 'react';

const avatars = [
  { initials: 'AJ', color: '#f97316', top: '8%',  left: '-4%'  },
  { initials: 'MS', color: '#8b5cf6', top: '5%',  right: '1%'  },
  { initials: 'KL', color: '#ec4899', top: '40%', left: '-4%'  },
  { initials: 'RD', color: '#14b8a6', top: '40%', right: '-3%' },
  { initials: 'PW', color: '#f59e0b', bottom: '18%', left: '-2%'  },
  { initials: 'NG', color: '#06b6d4', bottom: '10%', right: '-1%' },
];

export function AIForBusinessSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#032d60] leading-tight mb-4">
              Built-in AI for every part of your business
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              Put AI to work across sales, service, and marketing with{' '}
              <Link to="/products" className="text-[#0b5394] underline underline-offset-2 hover:text-[#032d60] font-medium">
                Starter Suite
              </Link>
              {' '}– a CRM that knows your business and can automate the kind of customer
              experiences you'll actually be proud of. Start simply with quick and easy
              setup and prebuilt agents.
            </p>
            <p className="text-gray-700 text-sm mb-6 sm:mb-8">
              <span className="font-semibold">$25 USD/user/month.</span>{' '}
              <Link to="/pricing" className="text-[#0b5394] underline underline-offset-2 hover:text-[#032d60]">
                See full pricing
              </Link>.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0b5394] text-white rounded-lg font-semibold text-sm hover:bg-[#032d60] transition-all hover:shadow-lg"
              >
                Start for free <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#0b5394] rounded-lg font-semibold text-sm border-2 border-[#0b5394] hover:bg-blue-50 transition-all"
              >
                Watch demo <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT — video card */}
          <div className="order-1 lg:order-2 relative px-6 sm:px-8 lg:px-6">
            {/* avatars — hide on very small screens */}
            {avatars.map((av, i) => (
              <div
                key={i}
                className="hidden sm:flex absolute z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white"
                style={{
                  background: av.color,
                  top: av.top, left: av.left, right: av.right, bottom: av.bottom,
                  animation: `float ${4 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {av.initials}
              </div>
            ))}
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              style={{ aspectRatio: '16/9' }}
              onClick={() => setPlaying(true)}
            >
              {playing ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=0"
                  title="HYSYS AI for business demo"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#032d60 0%,#0b5394 45%,#00a3e0 100%)' }} />
                  <div className="absolute inset-0 overflow-hidden">
                    {[
                      { w:120,h:120,top:'-10%',left:'10%',o:0.12 },
                      { w:80, h:80, top:'50%', left:'-5%',o:0.10 },
                      { w:100,h:100,top:'20%',right:'-5%',o:0.10 },
                      { w:60, h:60, bottom:'5%',left:'30%',o:0.14 },
                    ].map((c,i)=>(
                      <div key={i} className="absolute rounded-full"
                        style={{ width:c.w,height:c.h,top:c.top,left:c.left,right:(c as any).right,bottom:(c as any).bottom,background:'white',opacity:c.o }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-5 sm:p-8">
                    <p className="text-white text-lg sm:text-2xl font-extrabold leading-tight drop-shadow-lg max-w-xs">
                      Small businesses<br />love HYSYS
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/60 group-hover:scale-110 transition-all shadow-xl">
                      <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
