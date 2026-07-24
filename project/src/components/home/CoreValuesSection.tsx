import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { pickMarmidonHomepageText } from '../../lib/cms/cmsContent';
import { coreValuesImage } from '../../lib/cms/cardDefaults';
import { OptimizedImage } from '../ui/OptimizedImage';

const defaultTags = ['TRUST', 'CUSTOMER SUCCESS', 'INNOVATION', 'INTEGRITY', 'SUSTAINABILITY'];

export function CoreValuesSection() {
  const content = useSiteContent('homepage');
  const rawTags = content.getContentRaw('core_values_tags') as string[] | null;
  const tags = rawTags?.length ? rawTags.map(String) : defaultTags;

  const title = pickMarmidonHomepageText(
    content.getContentRaw('core_values_title'),
    'Built on trust, innovation, and customer success'
  );
  const desc = pickMarmidonHomepageText(
    content.getContentRaw('core_values_desc'),
    'Marmidon is committed to helping organisations run better — with secure ERP, local expertise, and long-term partnerships that grow with your business.'
  );
  const ctaPrimary = pickMarmidonHomepageText(
    content.getContentRaw('core_values_cta_primary'),
    'Our story'
  );
  const ctaSecondary = pickMarmidonHomepageText(
    content.getContentRaw('core_values_cta_secondary'),
    'Meet the team'
  );

  return (
    <section className="py-10 sm:py-12 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-4 sm:mb-5">
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{desc}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg"
              >
                {ctaPrimary} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[var(--color-primary)] rounded-lg font-semibold text-sm border-2 border-[var(--color-primary)] hover:bg-blue-50 transition-all"
              >
                {ctaSecondary} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[320px] shadow-lg">
            <OptimizedImage
              src={coreValuesImage}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[var(--color-secondary)]/50 to-[var(--color-primary)]/45" />
            <div className="relative z-10 flex items-center justify-center min-h-[280px] sm:min-h-[320px] p-6 sm:p-8">
              <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-[#0F2D5C]/95 px-6 sm:px-8 py-6 sm:py-7 text-center shadow-2xl">
                <div className="text-[11px] sm:text-xs font-extrabold text-cyan-300 tracking-[0.25em] uppercase mb-4">
                  Our values
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  {tags.map((val) => (
                    <div key={val} className="text-sm sm:text-base font-bold text-white leading-snug">
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
