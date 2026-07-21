import type { ReactNode } from 'react';

interface PricingCardProps {
  title: string;
  price?: string;
  period?: string;
  description?: string;
  features?: string[];
  ctaLabel?: string;
  onCta?: () => void;
  highlighted?: boolean;
  children?: ReactNode;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features = [],
  ctaLabel = 'Get started',
  onCta,
  highlighted = false,
  children,
}: PricingCardProps) {
  return (
    <div className={`relative rounded-3xl border ${highlighted ? 'border-[var(--color-primary)] shadow-xl' : 'border-gray-100 shadow-sm'} p-8 transition hover:-translate-y-1 hover:shadow-lg`}>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-[var(--color-primary)]">{price}</span>
        {period && <span className="text-sm text-gray-500">/{period}</span>}
      </div>
      {description && <p className="mt-3 text-sm text-gray-600">{description}</p>}
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-0.5 text-[var(--color-primary)]">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onCta}
        className={`mt-8 w-full rounded-2xl py-3 text-sm font-bold transition ${highlighted ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]' : 'border border-gray-200 text-gray-900 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}
      >
        {ctaLabel}
      </button>
      {children}
    </div>
  );
}
