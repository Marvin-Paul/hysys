import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`bg-slate-50 border-b border-slate-200 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isHome = index === 0 && item.path === '/';

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5 min-w-0">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden />}
                {isLast || !item.path ? (
                  <span className="font-medium text-slate-700 truncate" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors truncate"
                  >
                    {isHome && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden />}
                    <span className="truncate">{isHome ? 'Home' : item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
