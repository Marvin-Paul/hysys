import { Link } from 'react-router-dom';
import { Map } from 'lucide-react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { MARMIDON_MODULES, MARMIDON_SECTORS } from '../../lib/marmidonCatalog';

const sections = [
  {
    title: 'Products',
    links: [
      { label: 'All Products', path: '/products' },
      ...MARMIDON_MODULES.map((m) => ({ label: m.shortName, path: `/products/${m.slug}` })),
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'All Solutions', path: '/solutions' },
      ...MARMIDON_SECTORS.map((s) => ({ label: s.title, path: `/solutions/${s.slug}` })),
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resources Hub', path: '/resources' },
      { label: 'Blog', path: '/resources/blog' },
      { label: 'Guides & Whitepapers', path: '/resources/guides' },
      { label: 'FAQs', path: '/resources/faqs' },
      { label: 'Documentation', path: '/documentation' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Company Hub', path: '/company' },
      { label: 'About', path: '/company/about' },
      { label: 'Team', path: '/company/team' },
      { label: 'Careers', path: '/company/careers' },
      { label: 'Partners', path: '/partners' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Other',
    links: [
      { label: 'Customers', path: '/customers' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Request a Demo', path: '/request-a-demo' },
      { label: 'Privacy Policy', path: '/legal/privacy' },
      { label: 'Terms of Use', path: '/legal/terms' },
      { label: 'Cookie Policy', path: '/legal/cookies' },
    ],
  },
];

export function SitemapPage() {
  return (
    <div className="pt-16">
      <SEO title={PAGE_META.sitemap.title} description={PAGE_META.sitemap.description} fullTitle />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Map className="w-4 h-4" /> Sitemap
          </span>
        }
        title="Site map"
        description="Browse every section of the Marmidon website."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-sm text-[var(--color-primary)] hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
