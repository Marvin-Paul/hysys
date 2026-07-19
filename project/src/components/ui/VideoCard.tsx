import { Play } from 'lucide-react';
import { CardMedia } from './CardMedia';

type VideoCardProps = {
  thumbnail: string;
  logoText: string;
  name: string;
  title: string;
  company: string;
  quote: string;
};

export function VideoCard({ thumbnail, logoText, name, title, company, quote }: VideoCardProps) {
  return (
    <div className="pro-card h-full">
      <CardMedia src={thumbnail} alt={`${name} video testimonial`} aspect="video" />

      <div className="pro-card__body">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-900">
            {logoText}
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900">{name}</div>
            <div className="truncate text-sm text-slate-500">{title}, {company}</div>
          </div>
        </div>
        <p className="pro-card__description">“{quote}”</p>
        <div className="pro-card__footer">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
              <Play className="h-4 w-4" />
            </span>
            Watch story
          </span>
        </div>
      </div>
    </div>
  );
}
