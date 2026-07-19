import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { VideoPoster } from '../ui/VideoPoster';
import { DEFAULT_ERP_OVERVIEW_VIDEO } from '../../lib/youtube';

const LEGACY_AI_TITLES = new Set(['Built-in AI for every part of your business']);

function resolveSectionText(stored: string, legacy: Set<string>, fallback: string): string {
  const text = stored.trim();
  if (!text || legacy.has(text)) return fallback;
  return text;
}

export function AIForBusinessSection({ videoUrl: fallbackVideoUrl }: { videoUrl?: string | null }) {
  const [playing, setPlaying] = useState(false);
  const content = useSiteContent('homepage');
  const videoUrl =
    content.getContent('ai_business_video_url', '') ||
    fallbackVideoUrl ||
    DEFAULT_ERP_OVERVIEW_VIDEO;
  const title = resolveSectionText(
    content.getContent('ai_business_title', ''),
    LEGACY_AI_TITLES,
    'Real-time visibility across every department'
  );
  const description = content.getContent('ai_business_desc', '').includes('Starter Suite')
    ? 'Marmidon ERP connects finance, inventory, sales, and operations on one platform — giving leaders dashboards and reports they can trust without exporting spreadsheets.'
    : content.getContent(
        'ai_business_desc',
        'Marmidon ERP connects finance, inventory, sales, and operations on one platform — giving leaders dashboards and reports they can trust without exporting spreadsheets.'
      );

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {description}
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link
                to="/request-a-demo"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg"
              >
                {content.getContent('ai_business_cta_primary', 'Request a Demo')} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[var(--color-primary)] rounded-lg font-semibold text-sm border-2 border-[var(--color-primary)] hover:bg-blue-50 transition-all"
              >
                {content.getContent('ai_business_cta_secondary', 'Watch overview')} <Play className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <VideoPoster
              videoUrl={videoUrl}
              title="Marmidon ERP platform overview"
              aspectRatio="16/9"
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
