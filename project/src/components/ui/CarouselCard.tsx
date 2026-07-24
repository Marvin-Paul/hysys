import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CardMedia } from './CardMedia';

interface CarouselCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  linkLabel?: string;
}

export function CarouselCard({ icon: Icon, title, description, to, linkLabel = 'Learn more' }: CarouselCardProps) {
  return (
    <Link to={to} className="pro-card group block h-full">
      <CardMedia
        src=""
        alt={title}
        aspect="video"
        fallback={
          <div className="pro-card__media-fallback">
            <div className="pro-card__icon bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
        }
      />
      <div className="pro-card__body">
        <h3 className="pro-card__title">{title}</h3>
        <p className="pro-card__description">{description}</p>
        <div className="pro-card__footer">
          <span className="pro-card__cta">
            {linkLabel} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
