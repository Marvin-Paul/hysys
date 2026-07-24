import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LightPageHeader } from '../ui/LightPageHeader';
import { useSiteContent } from '../../hooks/useSiteContent';

export function ResourcesTeaser() {
  const content = useSiteContent('homepage');
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {content.getContent('resources_title', 'Resources & Insights')}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {content.getContent('resources_desc', 'Guides, whitepapers, and ERP insights to help your team evaluate, implement, and grow.')}
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {['guides', 'blog', 'faqs'].map((key) => (
            <ScrollReveal key={key}>
              <Link
                to={`/resources/${key}`}
                className="group block rounded-2xl border border-gray-100 p-8 shadow-sm transition hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)]">
                  {content.getContent(`resources_${key}_title`, key.charAt(0).toUpperCase() + key.slice(1))}
                </h3>
                <p className="text-gray-500 mb-4">
                  {content.getContent(`resources_${key}_desc`, `Explore our ${key}.`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
