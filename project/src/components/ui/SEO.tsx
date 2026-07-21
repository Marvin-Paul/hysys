import { useEffect } from 'react';
import { getHreflangEntries } from '../../lib/seo/hreflang';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  canonical?: string;
  locale?: string;
  type?: 'website' | 'article' | 'product' | 'faq';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** When true, `title` is the complete document title (Doc 5 §8 hub pages). */
  fullTitle?: boolean;
}

const SITE_URL = 'https://www.marmidon.com';
const DEFAULT_IMAGE = '/Mavy%20logo3.svg';
const SITE_NAME = 'Marmidon Enterprise Software';

export function SEO({
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  canonical,
  locale = 'en_GB',
  type = 'website',
  jsonLd,
  fullTitle = false,
}: SEOProps) {
  useEffect(() => {
    const fullTitleStr = fullTitle ? title : `${title} | ${SITE_NAME}`;
    const desc = description || `${title} - ${SITE_NAME}`;
    const imgPath = image || DEFAULT_IMAGE;
    const img = imgPath.startsWith('http') ? imgPath : `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
    const url = canonical || `${SITE_URL}${window.location.pathname}`;

    document.title = fullTitleStr;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('og:title', fullTitleStr, true);
    setMeta('og:description', desc, true);
    setMeta('og:type', type, true);
    setMeta('og:url', url, true);
    setMeta('og:image', img, true);
    setMeta('og:locale', locale, true);
    setMeta('og:site_name', SITE_NAME, true);
    if (imageWidth) setMeta('og:image:width', String(imageWidth), true);
    if (imageHeight) setMeta('og:image:height', String(imageHeight), true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitleStr);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', img);
    setMeta('twitter:site', '@MarmidonERP');

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', url);

    // TSR §6.4 — 9-language hreflang tags
    const hreflangIds: string[] = [];
    getHreflangEntries(window.location.pathname).forEach((entry) => {
      const id = `hfl-${entry.hreflang}`;
      hreflangIds.push(id);
      let el = document.getElementById(id) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.id = id;
        el.rel = 'alternate';
        document.head.appendChild(el);
      }
      el.hreflang = entry.hreflang;
      el.href = entry.href;
    });
    document.querySelectorAll('link[id^="hfl-"]').forEach((el) => {
      if (!hreflangIds.includes(el.id)) el.remove();
    });

    let jsonLdEl = document.getElementById('json-ld-seo');
    if (jsonLd) {
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script');
        jsonLdEl.id = 'json-ld-seo';
        jsonLdEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = JSON.stringify(
        Array.isArray(jsonLd)
          ? { '@context': 'https://schema.org', '@graph': jsonLd }
          : { '@context': 'https://schema.org', ...jsonLd }
      );
    } else if (jsonLdEl) {
      jsonLdEl.remove();
    }
  }, [title, description, image, imageWidth, imageHeight, canonical, locale, type, jsonLd, fullTitle]);

  return null;
}
