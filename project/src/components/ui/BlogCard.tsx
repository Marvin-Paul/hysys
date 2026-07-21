import type { ReactNode } from 'react';

interface BlogCardProps {
  title: string;
  excerpt?: string;
  image?: string | null;
  date?: string;
  to?: string;
  children?: ReactNode;
}

export function BlogCard({ title, excerpt, image, date, to = '#', children }: BlogCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover transition group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {date && <time className="text-xs font-semibold text-gray-400">{date}</time>}
        <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
        {excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerpt}</p>}
        {children}
        <a href={to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
          Read more <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
