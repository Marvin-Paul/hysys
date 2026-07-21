import { Newspaper } from 'lucide-react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { NewsletterSignup } from '../../components/ui/NewsletterSignup';
import { BlogCard } from '../../components/ui/BlogCard';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';
import { BLOG_POSTS } from '../../lib/content/blogPosts';
import { mergeCmsList, cmsSlug } from '../../lib/cms/cmsContent';
import { blogPostImages } from '../../lib/cms/cardDefaults';

export function BlogPage() {
  const content = useSiteContent('blog');
  const posts = mergeCmsList(
    content.getContentRaw('blog_posts') as Record<string, unknown>[] | null,
    BLOG_POSTS.map((p) => ({ ...p, id: p.slug }))
  ).map((post) => ({
    slug: String(post.slug || cmsSlug(post as { id?: string; slug?: string }) || post.id || ''),
    title: String(post.title || ''),
    excerpt: String(post.excerpt || ''),
    date: String(post.date || ''),
    author: String(post.author || ''),
    category: String(post.category || ''),
    body: String(post.body || ''),
    image: String(post.image || blogPostImages[(post.slug || post.id) as string] || ''),
  })).filter((p) => p.slug && p.title);

  const blogJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/resources/blog' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.blog.title} description={PAGE_META.blog.description} jsonLd={blogJsonLd} fullTitle />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Resources', path: '/resources' }, { label: 'Blog' }]} />

      <LightPageHeader
        badge={
          <span className="type-badge type-badge--light">
            <Newspaper className="w-4 h-4" /> {content.getContent('blog_hero_badge', 'Blog')}
          </span>
        }
        title={content.getContent('blog_title', 'Marmidon blog')}
        description={content.getContent('blog_desc', 'ERP insights, implementation guides, and stories from the team.')}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                author={post.author}
                category={post.category}
                image={post.image || blogPostImages[post.slug]}
                linkLabel={content.getContent('blog_read_more_label', 'Read more')}
                layout="horizontal"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup
            title={content.getContent('newsletter_title', 'Stay informed')}
            description={content.getContent('newsletter_desc', 'Get the latest ERP insights delivered to your inbox.')}
          />
        </div>
      </section>

      <PageCtaSection
        title={content.getContent('cta_title', 'Ready to see Marmidon in action?')}
        description={content.getContent('cta_desc', 'Book a personalised demo tailored to your modules and industry.')}
        primaryLabel={content.getContent('cta_button', 'Request a Demo')}
        primaryTo="/request-a-demo"
      />
    </div>
  );
}
