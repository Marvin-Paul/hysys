import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | HYSYS Global Solutions`;
    
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:')) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description || `${title} - HYSYS Global Solutions`);
    setMeta('og:title', `${title} | HYSYS Global Solutions`);
    setMeta('og:description', description || `${title} - HYSYS Global Solutions`);
    setMeta('og:type', 'website');
    setMeta('og:url', window.location.href);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', `${title} | HYSYS Global Solutions`);
    setMeta('twitter:description', description || `${title} - HYSYS Global Solutions`);
  }, [title, description]);

  return null;
}
