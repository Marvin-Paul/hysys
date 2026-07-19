import type { ReactNode } from 'react';

interface LightPageHeaderProps {
  badge?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Soft sky-gradient page intro used on catalog & about pages */
export function LightPageHeader({ badge, title, description, children }: LightPageHeaderProps) {
  return (
    <section className="page-intro">
      <div className="page-container page-intro__inner">
        {badge && <div className="page-intro__badge">{badge}</div>}
        <h1 className="type-page-title">{title}</h1>
        <p className="type-page-lead">{description}</p>
        {children && <div className="page-intro__actions">{children}</div>}
      </div>
    </section>
  );
}
