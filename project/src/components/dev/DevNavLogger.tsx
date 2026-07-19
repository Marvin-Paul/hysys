import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type DevLogPayload =
  | { type: 'nav'; path: string; at: string }
  | {
      type: 'click';
      at: string;
      from: string;
      kind: string;
      label: string;
      href?: string;
      className?: string;
    };

function sendDevLog(payload: DevLogPayload) {
  fetch('/__dev/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function truncate(text: string, max = 72) {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

function getClickTarget(target: EventTarget | null): HTMLElement | null {
  let node = target instanceof HTMLElement ? target : null;

  while (node && node !== document.body) {
    if (
      node.matches(
        'a[href], button, [role="button"], input[type="submit"], input[type="button"], .product-card, .story-card, .pro-card, .btn-read'
      )
    ) {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

function describeClick(element: HTMLElement): Pick<DevLogPayload & { type: 'click' }, 'kind' | 'label' | 'href' | 'className'> {
  const label =
    element.getAttribute('aria-label') ||
    element.getAttribute('title') ||
    (element as HTMLInputElement).value ||
    element.textContent ||
    '(no label)';

  if (element.matches('.product-card, .story-card, .pro-card')) {
    const link = element.closest('a[href]') ?? element.querySelector('a[href]');
    return {
      kind: 'CARD',
      label: truncate(label),
      href: link?.getAttribute('href') ?? undefined,
      className: element.className.split(/\s+/).slice(0, 3).join(' ') || undefined,
    };
  }

  if (element.matches('a[href]')) {
    return {
      kind: 'LINK',
      label: truncate(label),
      href: element.getAttribute('href') ?? undefined,
      className: element.className.split(/\s+/).slice(0, 3).join(' ') || undefined,
    };
  }

  if (element.matches('button, [role="button"], input[type="submit"], input[type="button"]')) {
    return {
      kind: 'BUTTON',
      label: truncate(label),
      className: element.className.split(/\s+/).slice(0, 3).join(' ') || undefined,
    };
  }

  return {
    kind: 'CLICK',
    label: truncate(label),
    className: element.className.split(/\s+/).slice(0, 3).join(' ') || undefined,
  };
}

/** Dev only: logs navigation and clicks in the Vite terminal */
export function DevNavLogger() {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const path = `${location.pathname}${location.search}${location.hash}`;
    sendDevLog({ type: 'nav', path, at: new Date().toISOString() });
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const onClick = (event: MouseEvent) => {
      const element = getClickTarget(event.target);
      if (!element) return;

      const { kind, label, href, className } = describeClick(element);
      sendDevLog({
        type: 'click',
        at: new Date().toISOString(),
        from: `${location.pathname}${location.search}`,
        kind,
        label,
        href,
        className,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname, location.search]);

  return null;
}
