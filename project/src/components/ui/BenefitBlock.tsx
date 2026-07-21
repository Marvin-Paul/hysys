import type { ReactNode } from 'react';

interface BenefitBlockProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string | null;
  children?: ReactNode;
}

export function BenefitBlock({ title, description, icon, image, children }: BenefitBlockProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      {image && (
        <img src={image} alt={title} className="mb-4 h-40 w-full rounded-xl object-cover" />
      )}
      {icon && <div className="mb-4 text-[var(--color-primary)]">{icon}</div>}
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
      {children}
    </div>
  );
}
