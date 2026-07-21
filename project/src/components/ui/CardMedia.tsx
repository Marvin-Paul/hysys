import type { ReactNode } from 'react';
import { OptimizedImage } from './OptimizedImage';

type CardMediaAspect = 'video' | 'wide' | 'square' | 'portrait' | 'avatar';

const aspectClass: Record<CardMediaAspect, string> = {
  video: 'pro-card__media--video',
  wide: 'pro-card__media--wide',
  square: 'pro-card__media--square',
  portrait: 'pro-card__media--portrait',
  avatar: 'pro-card__media--avatar',
};

const aspectRatio: Record<CardMediaAspect, string> = {
  video: '16 / 9',
  wide: '21 / 9',
  square: '1 / 1',
  portrait: '3 / 4',
  avatar: '1 / 1',
};

interface CardMediaProps {
  src?: string | null;
  alt?: string;
  aspect?: CardMediaAspect;
  fallback?: ReactNode;
  className?: string;
  /** Override the component's own aspect-ratio with a custom w/h for CLS */
  width?: number;
  /** Override the component's own aspect-ratio with a custom w/h for CLS */
  height?: number;
}

export function CardMedia({
  src,
  alt = '',
  aspect = 'video',
  fallback,
  className = '',
  width,
  height,
}: CardMediaProps) {
  if (!src && !fallback) return null;

  return (
    <div className={`pro-card__media ${aspectClass[aspect]} ${className}`.trim()}>
      {src ? (
        <OptimizedImage
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          style={{ aspectRatio: aspectRatio[aspect] }}
          className="pro-card__img"
        />
      ) : (
        fallback
      )}
    </div>
  );
}
