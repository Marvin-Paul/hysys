import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CardMedia } from '../../components/ui/CardMedia';
import { DEFAULT_ERP_OVERVIEW_VIDEO, toYouTubeEmbedUrl } from '../../lib/youtube';

export function HeroSection() {
  const content = useSiteContent('homepage');
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const videoUrl = content.getContentRaw('video_url') as string | null;
  const defaultVideoUrl = toYouTubeEmbedUrl(DEFAULT_ERP_OVERVIEW_VIDEO) ?? DEFAULT_ERP_OVERVIEW_VIDEO;
  const demoVideoUrl = videoUrl ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1` : `${defaultVideoUrl}?autoplay=1&mute=1`;

  const closeDemo = () => setIsDemoOpen(false);

  return (
    <section className="relative overflow-hidden bg-white" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-6 border border-white/10">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {content.getContent('hero_badge', 'Integrated ERP')}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                {content.getContent('hero_title', 'Run your whole business on one platform')}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                {content.getContent('hero_desc', 'Eleven integrated modules share one database — so finance, operations, inventory, and sales stay in sync without spreadsheets or duplicate entry.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/request-a-demo"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    {content.getContent('hero_cta', 'Request a Demo')}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-2xl font-bold text-base border-2 border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

              <div className="relative">
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white">
                  <CardMedia
                    src="/Gemini_Generated_Image_dwu7drdwu7drdwu7.png"
                    alt="Marmidon ERP dashboard preview"
                    aspect="portrait"
                    width={700}
                    height={900}
                    fallback={
                      <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                            <Play className="w-8 h-8" />
                          </div>
                          <p className="text-lg font-semibold">Marmidon ERP</p>
                          <p className="text-white/70 text-sm mt-2">Enterprise Resource Planning</p>
                        </div>
                      </div>
                    }
                  />
                </div>

                <div className="absolute -bottom-6 -right-6 w-80 h-80 bg-[var(--color-accent)]/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-80 h-80 bg-[var(--color-primary)]/20 rounded-full blur-3xl -z-10" />
              </div>
          </div>
        </div>
      </div>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <button
              onClick={closeDemo}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-sm transition hover:bg-white"
              aria-label="Close demo"
            >
              ✕
            </button>
            <div className="aspect-video bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={demoVideoUrl}
                title="Marmidon demo video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
