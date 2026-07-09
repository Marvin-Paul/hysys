import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, ChevronRight, Globe, Users, Shield, Zap, FileText, Building2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const searchCategories = [
  { id: 'products', label: 'Products', icon: Globe, paths: ['/products/sales-cloud', '/products/service-cloud', '/products/marketing-cloud', '/products/commerce-cloud', '/products/data-cloud', '/products/platform-cloud'] },
  { id: 'solutions', label: 'Solutions', icon: Users, paths: ['/solutions/small-business', '/solutions/enterprise', '/solutions/startups', '/solutions/nonprofits'] },
  { id: 'industries', label: 'Industries', icon: Building2, paths: ['/industries/healthcare', '/industries/education', '/industries/financial-services', '/industries/retail'] },
  { id: 'support', label: 'Support', icon: FileText, paths: ['/contact', '/solutions', '/about'] },
];

const allContent = [
  { title: 'Sales Cloud', desc: 'CRM Platform - Drive revenue growth with intelligent sales automation', category: 'Products', path: '/products/sales-cloud', icon: Users },
  { title: 'Service Cloud', desc: 'Customer Service - Deliver exceptional support with AI-powered solutions', category: 'Products', path: '/products/service-cloud', icon: Users },
  { title: 'Marketing Cloud', desc: 'Digital Marketing - Create personalized customer journeys', category: 'Products', path: '/products/marketing-cloud', icon: Zap },
  { title: 'Commerce Cloud', desc: 'E-Commerce - Build seamless shopping experiences', category: 'Products', path: '/products/commerce-cloud', icon: Shield },
  { title: 'Data Cloud', desc: 'Data Platform - Unify and activate your customer data', category: 'Products', path: '/products/data-cloud', icon: Globe },
  { title: 'Small Business', desc: 'Grow faster with CRM built for small teams', category: 'Solutions', path: '/solutions/small-business', icon: Building2 },
  { title: 'Enterprise', desc: 'Scale operations with enterprise-grade CRM', category: 'Solutions', path: '/solutions/enterprise', icon: Building2 },
  { title: 'Startups', desc: 'Launch strong with startup-friendly pricing', category: 'Solutions', path: '/solutions/startups', icon: Zap },
  { title: 'Support Center', desc: 'Get help from our customer support team and support knowledge resources', category: 'Support', path: '/contact', icon: FileText },
  { title: 'Product Documentation', desc: 'Browse technical guides and platform resources to get started fast', category: 'Support', path: '/solutions', icon: FileText },
];

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
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
    } else {
      setFilteredResults([]);
    }
  }, [query]);

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const getCategoryResults = (category: string) => {
    if (category === 'all') return filteredResults;
    return filteredResults.filter(item => item.category === category);
  };

  const categoryResults = searchCategories.map(cat => ({
    ...cat,
    count: getCategoryResults(cat.id).length
  })).filter(cat => cat.count > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PageHero
        badge="Search"
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title="Find what you need"
        subtitle="Search HYSYS content"
        description="Discover products, solutions, industries, and support resources across the HYSYS site."
      />

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              onClick={handleClearSearch}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Link>
            <div className="flex-1 flex items-center gap-3 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="search"
                defaultValue={query}
                placeholder="Search HYSYS..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      setSearchParams({ q: value.trim() });
                    }
                  }
                }}
              />
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {query && (
            <div className="text-sm text-gray-600 mb-6">
              Showing results for <span className="font-medium text-[var(--color-secondary)]">"{query}"</span>
              {filteredResults.length > 0 && (
                <span className="ml-2">({filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''})</span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {query && filteredResults.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600 mb-6">We couldn&apos;t find anything matching "{query}"</p>
              <p className="text-gray-500">Try different keywords or browse our categories below</p>
            </div>
          )}

          {query && filteredResults.length > 0 && (
            <div className="space-y-8">
              {categoryResults.map((category) => {
                const results = getCategoryResults(category.id);
                return (
                  <div key={category.id}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <category.icon className="w-6 h-6 text-[var(--color-primary)]" />
                        {category.label} ({results.length})
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.map((item, idx) => (
                        <Link
                          key={`${item.path}-${idx}`}
                          to={item.path}
                          className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[var(--color-primary)]/30"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{item.category}</div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h4>
                          <p className="text-gray-600 text-sm line-clamp-2">{item.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}

              {categoryResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No matching results in any category.</p>
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Search HYSYS Global Solutions</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Find products, solutions, industries, learning resources, and more.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {searchCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/search?q=${cat.label.toLowerCase()}`}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">{cat.label}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}