import { Play } from 'lucide-react';
import { toYouTubeEmbedUrl, withYouTubeAutoplay, youTubeThumbnailUrl } from '../../lib/youtube';

interface VideoPosterProps {
  videoUrl: string;
  title: string;
  aspectRatio?: string;
  className?: string;
  playing?: boolean;
  onPlay?: () => void;
}

export function VideoPoster({
  videoUrl,
  title,
  aspectRatio = '16/9',
  className = '',
  playing = false,
  onPlay,
}: VideoPosterProps) {
  const embedUrl = toYouTubeEmbedUrl(videoUrl);
  const thumbnail = youTubeThumbnailUrl(videoUrl, 'max') ?? youTubeThumbnailUrl(videoUrl, 'hq');

  if (!embedUrl) return null;

  const startPlayback = () => onPlay?.();

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl ${playing ? '' : 'cursor-pointer group'} ${className}`}
      style={{ aspectRatio }}
      onClick={playing ? undefined : startPlayback}
      onKeyDown={playing ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startPlayback(); } }}
      role={playing ? undefined : 'button'}
      tabIndex={playing ? undefined : 0}
      aria-label={playing ? undefined : `Play video: ${title}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={withYouTubeAutoplay(embedUrl)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-[var(--color-primary)] fill-[var(--color-primary)] ml-1" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
