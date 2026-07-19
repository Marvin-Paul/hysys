import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, X, ChevronRight, FileText, Building2, CalendarDays, CalendarCheck,
  Landmark, Users, Package, ShoppingCart, TrendingUp, Settings, Truck, Factory,
  Store, BarChart3, Briefcase, BookOpen, type LucideIcon,
} from 'lucide-react';
import { PageHero } from '../../components/ui/PageHero';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { MARMIDON_MODULES, MARMIDON_SECTORS } from '../../lib/marmidonCatalog';
import { BLOG_POSTS } from '../../lib/content/blogPosts';
import { CUSTOMER_STORIES } from '../../lib/content/customerStories';
import { trackEvent } from '../../lib/analytics/track';

const moduleIconMap: Record<string, LucideIcon> = {
  Landmark, Users, Package, ShoppingCart, TrendingUp, Settings, Truck, Factory, Store, BarChart3, Briefcase,
};

const sectorIconMap: Record<string, LucideIcon> = {
  Factory, Truck, Briefcase, Building2, ShoppingCart, Store, TrendingUp, Users, FileText, Settings,
};

const staticContent = [
  { title: 'Request a Demo', desc: 'Book a personalised Marmidon ERP demo for your modules and industry', category: 'Support', path: '/request-a-demo', icon: CalendarCheck },
  { title: 'Support Center', desc: 'Get help from our team — sales, implementation, and technical support', category: 'Support', path: '/contact', icon: FileText },
  { title: 'Product Documentation', desc: 'Guides and best practices for Marmidon ERP modules', category: 'Support', path: '/documentation', icon: FileText },
  { title: 'Pricing', desc: 'Quote-based ERP pricing — modules, users, and deployment options', category: 'Support', path: '/pricing', icon: FileText },
  { title: 'Customer Stories', desc: 'See how organisations achieved results with Marmidon ERP', category: 'Support', path: '/customers', icon: FileText },
  { title: 'Events', desc: 'Summits, workshops, and partner forums', category: 'Support', path: '/events', icon: CalendarDays },
];

const searchCategories = [
  { id: 'Products', label: 'Modules', icon: Package },
  { id: 'Solutions', label: 'Solutions', icon: Building2 },
  { id: 'Resources', label: 'Resources', icon: BookOpen },
  { id: 'Support', label: 'Support', icon: FileText },
];

function buildSearchIndex() {
  const modules = MARMIDON_MODULES.map((m) => ({
    title: m.shortName,
    desc: `${m.title} — ${m.subtitle}`,
    category: 'Products' as const,
    path: `/products/${m.slug}`,
    icon: moduleIconMap[m.iconName] || Package,
  }));
  const sectors = MARMIDON_SECTORS.map((s) => ({
    title: s.title,
    desc: s.description,
    category: 'Solutions' as const,
    path: `/solutions/${s.slug}`,
    icon: sectorIconMap[s.iconName] || Building2,
  }));
  const blog = BLOG_POSTS.map((post) => ({
    title: post.title,
    desc: post.excerpt,
    category: 'Resources' as const,
    path: `/resources/blog/${post.slug}`,
    icon: BookOpen,
  }));
  const guides = [
    { title: 'ERP Implementation Guide', desc: 'Step-by-step Marmidon rollout planning', category: 'Resources' as const, path: '/resources/guides', icon: BookOpen },
    { title: 'Digital Transformation Playbook', desc: 'Frameworks for leading digital change', category: 'Resources' as const, path: '/resources/guides', icon: BookOpen },
  ];
  const stories = CUSTOMER_STORIES.map((story) => ({
    title: `${story.name} — Customer Story`,
    desc: story.quote,
    category: 'Resources' as const,
    path: `/customers/${story.id}`,
    icon: Building2,
  }));
  return [...modules, ...sectors, ...blog, ...guides, ...stories, ...staticContent];
}

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const allContent = useMemo(() => buildSearchIndex(), []);
  const [filteredResults, setFilteredResults] = useState<typeof allContent>([]);

  useEffect(() => {
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const results = allContent.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.desc.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
      setFilteredResults(results);
      trackEvent('search_query', { query: query.trim(), results_count: results.length });
    } else {
      setFilteredResults([]);
    }
  }, [query, allContent]);

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const getCategoryResults = (category: string) => {
    return filteredResults.filter(item => item.category === category);
  };

  const categoryResults = searchCategories.map(cat => ({
    ...cat,
    count: getCategoryResults(cat.id).length
  })).filter(cat => cat.count > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <SEO title={PAGE_META.search.title} description={PAGE_META.search.description} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Search' }]} />

      <PageHero
        badge="Search"
        title="Find what you need"
        subtitle="Search Marmidon ERP"
        description="Discover modules, industry solutions, blog posts, guides, customer stories, and support resources."
      />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
              placeholder="Search modules, industries, blog, guides, stories…"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {!query.trim() ? (
            <div className="text-center py-16 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Enter a search term to find modules, solutions, and resources.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-gray-900">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-gray-500 mt-2">Try different keywords or browse our products and solutions.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/products" className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold">Browse modules</Link>
                <Link to="/solutions" className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700">Browse solutions</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {categoryResults.map((cat) => {
                const results = getCategoryResults(cat.id);
                const CatIcon = cat.icon;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-4">
                      <CatIcon className="w-5 h-5 text-[var(--color-primary)]" />
                      <h2 className="text-lg font-bold text-gray-900">{cat.label}</h2>
                      <span className="text-sm text-gray-400">({cat.count})</span>
                    </div>
                    <div className="space-y-2">
                      {results.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <Link
                            key={`${item.path}-${item.title}`}
                            to={item.path}
                            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                              <ItemIcon className="w-5 h-5 text-[var(--color-primary)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h3>
                              <p className="text-sm text-gray-500 truncate">{item.desc}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-primary)] flex-shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

