const SITE_URL = 'https://www.marmidon.com';

export const ORGANIZATION_JSON_LD = {
  '@type': 'Organization',
  name: 'Marmidon Global Solutions Limited',
  url: SITE_URL,
  logo: `${SITE_URL}/Mavy%20logo3.svg`,
  description: 'Integrated enterprise ERP software for finance, HR, inventory, sales, manufacturing, and more.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@marmidon.com',
    telephone: '+256-782-602854',
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/marmidon',
    'https://twitter.com/MarmidonERP',
    'https://www.facebook.com/MarmidonERP',
    'https://www.youtube.com/@MarmidonERP',
  ],
};

export const WEBSITE_JSON_LD = {
  '@type': 'WebSite',
  name: 'Marmidon Enterprise ERP',
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: 'Marmidon Global Solutions Limited' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function softwareApplicationJsonLd(params: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    '@type': 'SoftwareApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category || 'BusinessApplication',
    operatingSystem: 'Web, Windows, Cloud',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Contact for tailored ERP licensing quote',
    },
    provider: {
      '@type': 'Organization',
      name: 'Marmidon Global Solutions Limited',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
}) {
  return {
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Marmidon Global Solutions Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/Mavy%20logo3.svg`,
      },
    },
  };
}

export function reviewJsonLd(params: {
  quote: string;
  author: string;
  authorTitle?: string;
  ratingValue?: number;
}) {
  return {
    '@type': 'Review',
    reviewBody: params.quote,
    author: { '@type': 'Person', name: params.author },
    ...(params.authorTitle ? { authorTitle: params.authorTitle } : {}),
    ...(params.ratingValue ? { reviewRating: { '@type': 'Rating', ratingValue: params.ratingValue, bestRating: 5 } } : {}),
    itemReviewed: {
      '@type': 'Organization',
      name: 'Marmidon Global Solutions Limited',
    },
  };
}

export function globalJsonLdGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD],
  };
}
