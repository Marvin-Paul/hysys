import type { ReactNode } from 'react';

interface SectionHeadingProps {
  badge?: ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  tone = 'default',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'type-section-header--center' : 'type-section-header--left';
  const toneClass = tone === 'inverse' ? 'type-section-header--inverse' : '';

  return (
    <div className={`type-section-header ${alignClass} ${toneClass} ${className}`.trim()}>
      {badge && <div className="type-section-header__badge-wrap">{badge}</div>}
      <h2 className="type-section-title">{title}</h2>
      {description && <p className="type-section-desc">{description}</p>}
    </div>
  );
}
