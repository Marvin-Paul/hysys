import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
}

export function OptimizedImage({ src, alt = '', className = '', ...rest }: OptimizedImageProps) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
}
