import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CardMedia } from './CardMedia';
import { useSiteContent } from '../../hooks/useSiteContent';

export interface ContentCardProps {
  to: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  icon?: LucideIcon;
  iconGradient?: string;
  footerLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

/** Professional CMS-friendly card with consistent size and cropped images */
export function ContentCard({
  to,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  icon: Icon,
  iconGradient = 'from-[var(--color-primary)] to-[var(--color-accent)]',
  footerLabel,
  className = '',
  children,
}: ContentCardProps) {
  const global = useSiteContent('global');
  const resolvedFooter = footerLabel ?? global.getContent('card_footer_label', 'Learn more');

  return (
    <Link to={to} className={`pro-card group block h-full ${className}`.trim()}>
      <CardMedia
        src={image}
        alt={imageAlt || title}
        aspect="video"
        fallback={
          Icon ? (
            <div className="pro-card__media-fallback">
              <div className={`pro-card__icon bg-gradient-to-br ${iconGradient}`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>
          ) : undefined
        }
      />

      <div className="pro-card__body">
        {subtitle && <p className="pro-card__eyebrow">{subtitle}</p>}
        <h3 className="pro-card__title">{title}</h3>
        {description && <p className="pro-card__description">{description}</p>}
        {children}
        <div className="pro-card__footer">
          <span className="pro-card__cta">
            {resolvedFooter} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
