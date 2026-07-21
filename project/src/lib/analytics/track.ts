/** Consent-gated analytics — Doc 4 §7.2 event taxonomy */

import { getStoredUtmParams } from './utmCapture';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | 'demo_request_submit'
  | 'contact_submit'
  | 'lead_form_start'
  | 'resource_download'
  | 'newsletter_signup'
  | 'module_view'
  | 'sector_view'
  | 'case_study_view'
  | 'cta_click'
  | 'pricing_view'
  | 'outbound_click'
  | 'search_query';

function hasAnalyticsConsent(): boolean {
  const level = localStorage.getItem('marmidon-cookie-consent');
  if (level === 'all') return true;
  if (level === 'custom') {
    try {
      const prefs = JSON.parse(localStorage.getItem('marmidon-cookie-prefs') || '{}');
      return prefs.analytics === true;
    } catch {
      return false;
    }
  }
  return false;
}

export function initAnalytics(gtmId?: string) {
  if (!gtmId || typeof window === 'undefined') return;
  if (document.getElementById('gtm-script')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  if (!document.getElementById('gtm-noscript')) {
    const noscript = document.createElement('noscript');
    noscript.id = 'gtm-noscript';
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.prepend(noscript);
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (!hasAnalyticsConsent()) return;

  const utm = getStoredUtmParams();
  const hasUtm = Object.keys(utm).length > 0;

  const payload = {
    event,
    page_path: window.location.pathname,
    ...(hasUtm ? utm : {}),
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, { ...(hasUtm ? utm : {}), ...params });
  }
}

export function trackOutboundClick(target: string, linkText?: string) {
  trackEvent('outbound_click', { target, link_text: linkText ?? '' });
}

/** Global click handler for external links */
export function initOutboundTracking() {
  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, window.location.origin);
      if (url.hostname !== window.location.hostname) {
        trackOutboundClick(url.href, anchor.textContent?.trim() ?? '');
      }
    } catch {
      /* invalid URL — ignore */
    }
  });
}

export function onConsentGranted(level: 'all' | 'essential' | 'custom') {
  const shouldInit = level === 'all' || (level === 'custom' && hasAnalyticsConsent());
  if (shouldInit) {
    const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;
    initAnalytics(gtmId);
    initOutboundTracking();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'consent_granted' });
  }
}
