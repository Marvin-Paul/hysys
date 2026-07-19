import type { ReactNode } from 'react';

type CardMediaAspect = 'video' | 'wide' | 'square' | 'portrait' | 'avatar';

const aspectClass: Record<CardMediaAspect, string> = {
  video: 'pro-card__media--video',
  wide: 'pro-card__media--wide',
  square: 'pro-card__media--square',
  portrait: 'pro-card__media--portrait',
  avatar: 'pro-card__media--avatar',
};

interface CardMediaProps {
  src?: string | null;
  alt?: string;
  aspect?: CardMediaAspect;
  fallback?: ReactNode;
  className?: string;
}

/** Fixed-size media frame — images never stretch the card layout */
export function CardMedia({
  src,
  alt = '',
  aspect = 'video',
  fallback,
  className = '',
}: CardMediaProps) {
  if (!src && !fallback) return null;

  return (
    <div className={`pro-card__media ${aspectClass[aspect]} ${className}`.trim()}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
