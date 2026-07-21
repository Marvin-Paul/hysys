import type { ReactNode } from 'react';

interface SectorCardProps {
  id?: string;
  title: string;
  description?: string;
  image?: string | null;
  to?: string;
  link?: string;
  linkLabel?: string;
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function SectorCard({ title, description, image, to, link, linkLabel, className = '', icon, children }: SectorCardProps) {
  const href = link || to || '#';
  return (
    <div className={`group relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-lg hover:-translate-y-1 ${className}`.trim()}>
      {image && (
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="relative p-6">
        {icon && <div className="mb-3 text-[var(--color-primary)]">{icon}</div>}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        {children}
        <a href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
          {linkLabel || 'Learn more'} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
