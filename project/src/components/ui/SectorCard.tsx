import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CardMedia } from './CardMedia';

interface SectorCardProps {
  id?: string;
  title: string;
  description?: string;
  image?: string | null;
  to?: string;
  link?: string;
  linkLabel?: string;
  className?: string;
  icon?: LucideIcon;
  iconGradient?: string;
  children?: ReactNode;
}

export function SectorCard({
  title,
  description,
  image,
  to,
  link,
  linkLabel,
  className = '',
  icon: Icon,
  iconGradient = 'from-[var(--color-primary)] to-[var(--color-accent)]',
  children,
}: SectorCardProps) {
  const href = link || to || '#';
  return (
    <Link to={href} className={`pro-card group block h-full ${className}`.trim()}>
      <CardMedia
        src={image}
        alt={title}
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
        <h3 className="pro-card__title">{title}</h3>
        {description && <p className="pro-card__description">{description}</p>}
        {children}
        <div className="pro-card__footer">
          <span className="pro-card__cta">
            {linkLabel || 'Learn more'} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
