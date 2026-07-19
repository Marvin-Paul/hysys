import { Link, useParams } from 'react-router-dom';
import { CalendarDays, User, Sparkles, Tag } from 'lucide-react';
import { useMemo } from 'react';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { articleJsonLd } from '../../lib/seo/structuredData';
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG } from '../../lib/content/blogPosts';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList, cmsSlug } from '../../lib/cms/cmsContent';

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
      })),
    [rawPosts]
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
