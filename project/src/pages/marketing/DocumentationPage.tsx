import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Video, ArrowRight, Search, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PageHero } from '../../components/ui/PageHero';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList, toCmsArray } from '../../lib/cms/cmsContent';
import { docCategoryImages } from '../../lib/cms/cardDefaults';

const iconMap: Record<string, LucideIcon> = { Sparkles, FileText, BookOpen, Video };

const defaultCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Quick-start guides, deployment options, and first steps with Marmidon ERP.',
    iconName: 'Sparkles',
    articles: ['Platform overview', 'Module selection guide', 'User setup & roles', 'Importing opening balances'],
  },
  {
    id: 'products',
    title: 'ERP Modules',
    description: 'Documentation for Financials, HR & Payroll, Inventory, Sales, Manufacturing, and more.',
    iconName: 'FileText',
    articles: ['Financials user guide', 'Inventory & warehouse setup', 'Sales & CRM workflows', 'Manufacturing & BOM setup'],
  },
  {
    id: 'administration',
    title: 'Administration',
    description: 'User management, security settings, and platform configuration.',
    iconName: 'BookOpen',
    articles: ['User roles and permissions', 'Security best practices', 'Custom fields and workflows', 'Integration setup'],
  },
  {
    id: 'video-tutorials',
    title: 'Video Tutorials',
    description: 'Step-by-step video walkthroughs for common ERP tasks and workflows.',
    iconName: 'Video',
    articles: ['Dashboard walkthrough', 'Purchase order workflow', 'Creating reports', 'Mobile access setup'],
  },
];

export function DocumentationPage() {
  const navigate = useNavigate();
  const content = useSiteContent('documentation');
  const rawCategories = content.getContentRaw('doc_categories') as any[] | null;
  const docCategories = mergeCmsList(rawCategories, defaultCategories  ).map((cat: any) => ({
    ...cat,
    icon: iconMap[String(cat.iconName)] || FileText,
    articles: toCmsArray(cat.articles),
    image: cat.image || docCategoryImages[cat.id as string] || '',
  }));

  return (
    <div className="pt-16">
      <SEO
        title={PAGE_META.documentation.title}
        description={PAGE_META.documentation.description}
        fullTitle
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Documentation' }]} />

      <PageHero
        badge={content.getContent('hero_badge', 'Documentation')}
        title={content.getContentAny(['hero_title'], 'Product Documentation')}
        subtitle={content.getContent('hero_subtitle', 'Guides & tutorials')}
        description={content.getContent('hero_desc', 'Browse technical guides, setup instructions, and best practices for every Marmidon product.')}
        primaryCta={{ label: content.getContent('hero_cta', 'Contact Support'), to: '/contact' }}
        secondaryCta={{ label: content.getContent('hero_cta_secondary', 'Request a Demo'), to: '/request-a-demo' }}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder={content.getContent('search_placeholder', 'Search documentation...')}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const query = (e.target as HTMLInputElement).value.trim();
                      if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
                    }
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {docCategories.map((category) => (
              <ScrollReveal key={category.id}>
                <div className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={category.image || docCategoryImages[category.id as string] || docCategoryImages['getting-started']}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="relative p-8 min-h-[260px] flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-white">{category.title}</h3>
                        <p className="text-xs text-white/70">{category.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {category.articles.map((article: string) => (
                        <li key={article}>
                          <Link
                            to="/contact"
                            className="flex items-center gap-2 text-xs text-white/80 hover:text-white transition-colors py-0.5"
                          >
                            <ArrowRight className="w-3 h-3 flex-shrink-0" />
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                    >
                      Request full documentation <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Need help finding something?')}
        description={content.getContent('cta_desc', 'Our support team can provide detailed documentation and guided assistance.')}
        primaryLabel={content.getContent('cta_button', 'Contact Support')}
        primaryTo="/contact"
      />
    </div>
  );
}
