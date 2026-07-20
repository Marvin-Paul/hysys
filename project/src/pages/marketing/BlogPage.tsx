import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight, CalendarDays, User } from 'lucide-react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PageCtaSection } from '../../components/ui/PageCtaSection';
import { NewsletterSignup } from '../../components/ui/NewsletterSignup';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
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

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.blog.title} description={PAGE_META.blog.description} fullTitle />

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
              <ScrollReveal key={post.slug}>
                <Link to={`/resources/blog/${post.slug}`} className="group block rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-24 w-36 shrink-0 rounded-xl overflow-hidden relative ring-1 ring-slate-200">
                      <img
                        src={post.image || blogPostImages[post.slug]}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 font-medium text-[var(--color-primary)]">{post.category}</span>
                        <span className="inline-flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {post.date}</span>
                        <span className="inline-flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-[var(--color-primary)]">{post.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                        {content.getContent('blog_read_more_label', 'Read more')} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
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
