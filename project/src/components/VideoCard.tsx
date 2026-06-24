import { Play } from 'lucide-react';

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
    <div className="group overflow-hidden rounded-[30px] bg-white shadow-xl border border-slate-200">
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={`${name} video testimonial`}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/20 transition-opacity duration-300 group-hover:bg-slate-950/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <Play className="h-7 w-7" />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-900">
            {logoText}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">{name}</div>
            <div className="text-sm text-slate-500">{title}, {company}</div>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600">“{quote}”</p>
      </div>
    </div>
  );
}
