/**
 * Generates public/sitemap.xml from Marmidon IA.
 * Usage: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.marmidon.com';

const MODULES = [
  'financials', 'hr-payroll', 'inventory', 'procurement', 'sales-crm', 'operations',
  'fleet', 'manufacturing', 'pos-retail', 'business-intelligence', 'projects',
];

const SECTORS = [
  'manufacturing', 'production', 'wholesale', 'retail', 'distribution',
  'professional-services', 'education', 'healthcare', 'hospitality', 'non-profit',
  'construction', 'media-publishing',
];

const BLOG_SLUGS = [
  'crm-trends-2026',
  'digital-transformation-africa',
  'ai-customer-service',
  'data-privacy-2026',
  'remote-sales-best-practices',
];

const STORY_IDS = [
  'techcorp',
  'globalretail',
  'healthfirst',
  'financetech',
  'swiftlogistics',
  'kampalaacademy',
];

const STATIC = [
  '/',
  '/products',
  '/solutions',
  '/customers',
  '/pricing',
  '/partners',
  '/partners/apply',
  '/request-a-demo',
  '/contact',
  '/company',
  '/company/about',
  '/company/team',
  '/company/careers',
  '/resources',
  '/resources/blog',
  '/resources/guides',
  '/resources/faqs',
  '/documentation',
  '/sitemap',
  '/legal/privacy',
  '/legal/terms',
  '/legal/cookies',
];

const urls = [
  ...STATIC,
  ...MODULES.map((s) => `/products/${s}`),
  ...SECTORS.map((s) => `/solutions/${s}`),
  ...BLOG_SLUGS.map((slug) => `/resources/blog/${slug}`),
  ...STORY_IDS.map((id) => `/customers/${id}`),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url>
    <loc>${SITE}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path.startsWith('/products/') || path.startsWith('/solutions/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
