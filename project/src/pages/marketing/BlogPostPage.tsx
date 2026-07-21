import { Link, useParams } from 'react-router-dom';
import { CalendarDays, User, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { BlogCard } from '../../components/ui/BlogCard';
import { articleJsonLd, breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG } from '../../lib/content/blogPosts';
import { MARMIDON_MODULES } from '../../lib/marmidonCatalog';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList, cmsSlug } from '../../lib/cms/cmsContent';
import { blogPostImages } from '../../lib/cms/cardDefaults';

function useBlogPosts() {
  const content = useSiteContent('blog');
  const rawPosts = content.getContentRaw('blog_posts');
  return useMemo(
    () =>
      mergeCmsList(
        rawPosts as Record<string, unknown>[] | null,
        BLOG_POSTS.map((p) => ({ ...p, id: p.slug }))
      ).map((post) => ({
        slug: String(post.slug || cmsSlug(post as { id?: string; slug?: string }) || post.id || ''),
        title: String(post.title || ''),
        excerpt: String(post.excerpt || ''),
        date: String(post.date || ''),
        author: String(post.author || ''),
        category: String(post.category || ''),
        body: String(post.body || ''),
        moduleSlugs: (Array.isArray(post.moduleSlugs) ? post.moduleSlugs : []) as string[],
        sectorSlugs: (Array.isArray(post.sectorSlugs) ? post.sectorSlugs : []) as string[],
        tags: (Array.isArray(post.tags) ? post.tags : []) as string[],
      })),
    [rawPosts]
  );
}

function RelatedPosts({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const related = useMemo(() => {
    const sameCategory = BLOG_POSTS.filter((p) => p.category === currentCategory && p.slug !== currentSlug);
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);
    const others = BLOG_POSTS.filter((p) => p.slug !== currentSlug && !sameCategory.includes(p));
    return [...sameCategory, ...others].slice(0, 3);
  }, [currentSlug, currentCategory]);

  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Related articles</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
              image={blogPostImages[post.slug]}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TaxonomyLinks({ moduleSlugs, sectorSlugs, tags }: { moduleSlugs: string[]; sectorSlugs: string[]; tags: string[] }) {
  const modules = useMemo(
    () => MARMIDON_MODULES.filter((m) => moduleSlugs.includes(m.slug)),
    [moduleSlugs]
  );

  if (modules.length === 0 && tags.length === 0) return null;

  return (
    <div className="border-t border-slate-200 pt-8 mt-12">
      {modules.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Related modules</h3>
          <div className="flex flex-wrap gap-2">
            {modules.map((m) => (
              <Link
                key={m.slug}
                to={`/products/${m.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {m.shortName} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      )}
      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = useSiteContent('blog');
  const posts = useBlogPosts();
  const post = slug
    ? posts.find((p) => p.slug === slug) ?? BLOG_POSTS_BY_SLUG[slug]
    : null;

  const articleJsonLdData = useMemo(() => {
    if (!post || !slug) return undefined;
    return [
      articleJsonLd({
        headline: post.title,
        description: post.excerpt,
        url: `https://www.marmidon.com/resources/blog/${slug}`,
        datePublished: post.date,
        author: post.author,
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/resources/blog' },
        { name: post.title, path: `/resources/blog/${slug}` },
      ]),
    ];
  }, [post, slug]);

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <SEO title="Post Not Found" />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
          <p className="mt-2 text-slate-600">Sorry, we could not find that blog post.</p>
          <Link to="/resources/blog" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={post.title} description={post.excerpt} jsonLd={articleJsonLdData} />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/resources/blog' },
          { label: post.title },
        ]}
      />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Sparkles className="w-4 h-4" /> {post.category}
          </span>
        }
        title={post.title}
        description={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {post.date}</span>
          <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><Tag className="w-4 h-4" /> {post.category}</span>
        </div>
      </LightPageHeader>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            {post.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-slate-700 mb-4">{paragraph}</p>
            ))}
          </div>

          <TaxonomyLinks
            moduleSlugs={post.moduleSlugs ?? []}
            sectorSlugs={post.sectorSlugs ?? []}
            tags={post.tags ?? []}
          />
        </div>
      </section>

      <RelatedPosts currentSlug={post.slug} currentCategory={post.category} />

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={content.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
