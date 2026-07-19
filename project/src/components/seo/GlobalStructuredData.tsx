import { useEffect } from 'react';
import { globalJsonLdGraph } from '../../lib/seo/structuredData';

/** Site-wide Organization + WebSite JSON-LD (Doc 4 §6.3) */
export function GlobalStructuredData() {
  useEffect(() => {
    let el = document.getElementById('json-ld-global');
    if (!el) {
      el = document.createElement('script');
      el.id = 'json-ld-global';
      el.setAttribute('type', 'application/ld+json');
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(globalJsonLdGraph());
  }, []);

  return null;
}
