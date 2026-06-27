import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export function AgentforceStatsSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-12 sm:py-16 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT — counter card */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group w-full"
            style={{ aspectRatio: '4/3' }}
            onClick={() => setPlaying(true)}
          >
            {playing ? (
              <iframe className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                title="Agentforce conversations demo"
                allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <>
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg,#c7d8f8 0%,#dce8ff 30%,#e8d9f8 65%,#f0e6ff 100%)' }} />
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute rounded-full" style={{ width:220,height:220,bottom:'-40px',right:'-40px',background:'rgba(139,92,246,0.15)' }} />
                  <div className="absolute rounded-full" style={{ width:160,height:160,top:'-30px',left:'-30px',background:'rgba(99,130,255,0.12)' }} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none mb-2 sm:mb-3 text-center"
                    style={{ color:'#032d60',letterSpacing:'-0.02em' }}>
                    999,007
                  </div>
                  <p className="text-center text-[#032d60] font-semibold text-sm sm:text-base leading-snug">
                    Conversations<br />handled by Agentforce.
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center border-2 border-white/80 group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#032d60] fill-[#032d60] ml-0.5" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* RIGHT — copy */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#032d60] leading-tight mb-4 sm:mb-5">
              4M+ conversations handled by Agentforce and counting
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Everyone talks the AI talk. We're walking the walk. With{' '}
              <span className="font-semibold text-gray-800">66% autonomous case resolution</span>,{' '}
              <span className="font-semibold text-gray-800">15% more marketing pipeline</span>, and{' '}
              <span className="font-semibold text-gray-800">1.8x higher lead conversion</span>,
              Agentforce delivers real conversational AI across service, sales, and marketing workflows.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link to="/customer-stories"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0b5394] text-white rounded-lg font-semibold text-sm hover:bg-[#032d60] transition-all hover:shadow-lg">
                See our stories <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#0b5394] rounded-lg font-semibold text-sm border-2 border-[#0b5394] hover:bg-blue-50 transition-all">
                Experience HYSYS Help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
