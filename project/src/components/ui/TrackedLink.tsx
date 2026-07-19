import { Link, type LinkProps } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics/track';

interface TrackedLinkProps extends LinkProps {
  ctaName: string;
  ctaLocation?: string;
}

export function TrackedLink({ ctaName, ctaLocation, onClick, to, ...rest }: TrackedLinkProps) {
  return (
    <Link
      {...rest}
      to={to}
      onClick={(event) => {
        trackEvent('cta_click', {
          cta_name: ctaName,
          cta_location: ctaLocation ?? window.location.pathname,
          cta_destination: typeof to === 'string' ? to : (typeof to === 'object' && to && 'pathname' in to ? String(to.pathname) : ''),
        });
        onClick?.(event);
      }}
    />
  );
}
