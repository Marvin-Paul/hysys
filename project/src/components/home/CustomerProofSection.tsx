import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { VideoPoster } from '../ui/VideoPoster';
import { DEFAULT_CUSTOMER_PROOF_VIDEO } from '../../lib/youtube';

/** Homepage customer proof block with embedded YouTube walkthrough */
export function CustomerProofSection({ videoUrl: fallbackVideoUrl }: { videoUrl?: string | null }) {
  const [playing, setPlaying] = useState(false);
  const content = useSiteContent('homepage');
  const videoUrl =
    content.getContent('customer_proof_video_url', '') ||
    fallbackVideoUrl ||
    DEFAULT_CUSTOMER_PROOF_VIDEO;

  return (
    <section className="py-12 sm:py-16 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <VideoPoster
              videoUrl={videoUrl}
              title="Marmidon ERP customer success overview"
              aspectRatio="16/9"
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
            <p className="mt-3 text-center text-sm text-gray-500">
              <span className="font-bold text-[var(--color-secondary)] text-lg mr-1">
                {content.getContent('agentforce_stat_value', '500+')}
              </span>
              {content.getContent('agentforce_stat_label', 'Organisations trust Marmidon ERP').replace('\n', ' ')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-4 sm:mb-5">
              {content.getContent('agentforce_title', 'Proven results across Africa and beyond')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {content.getContent(
                'agentforce_desc',
                'Manufacturers, retailers, and service firms use Marmidon to cut manual work, improve stock accuracy, and close books faster. See how customers in your sector transformed operations.'
              )}
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Link
                to="/customers"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg"
              >
                {content.getContent('agentforce_cta_primary', 'Customer stories')} <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[var(--color-primary)] rounded-lg font-semibold text-sm border-2 border-[var(--color-primary)] hover:bg-blue-50 transition-all"
              >
                {content.getContent('agentforce_cta_secondary', 'Watch customer demo')} <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
