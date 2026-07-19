import { Sparkles, Users, Shield, Zap, Globe, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';

const iconMap: Record<string, LucideIcon> = { Users, Shield, Zap, Globe, Award };

const defaultFeatures = [
  { id: 'integrated', title: 'Fully integrated', description: 'Eleven modules on one database — finance, inventory, sales, and operations stay in sync without duplicate entry.', iconName: 'Zap' },
  { id: 'sectors', title: 'Sector-fit configurations', description: 'Preconfigured workflows for manufacturing, retail, healthcare, construction, and eight more industries.', iconName: 'Globe' },
  { id: 'security', title: 'Enterprise security', description: 'Role-based access, audit trails, and compliance controls built for regulated and growing businesses.', iconName: 'Shield' },
  { id: 'support', title: 'Proven & supported', description: 'Local implementation, training, and ongoing support from the Marmidon team across Africa and beyond.', iconName: 'Award' },
];

const LEGACY_FEATURE_KEYS = new Set(['lightningFast', 'enterpriseSecurity', 'globalScale', 'awardWinning']);

function isLegacyCmsFeatures(items: unknown[] | null | undefined): boolean {
  if (!items?.length) return false;
  return items.some((raw) => {
    if (!raw || typeof raw !== 'object') return false;
    const titleKey = String((raw as Record<string, unknown>).titleKey ?? '');
    return LEGACY_FEATURE_KEYS.has(titleKey);
  });
}

export function FeaturesSection() {
  const content = useSiteContent('homepage');
  const rawFeatures = content.getContentRaw('features') as any[] | null;
  const cmsFeatures = isLegacyCmsFeatures(rawFeatures) ? null : rawFeatures;
  const features = mergeCmsList(cmsFeatures, defaultFeatures).map((item: any, index: number) => {
    const fallback = defaultFeatures[index] ?? defaultFeatures[0];
    const stableId = String(item.id || fallback.id || `feature-${index}`);
    return {
      ...fallback,
      ...item,
      id: stableId,
      title: String(item.title || '').trim() || fallback.title,
      description: String(item.description || '').trim() || fallback.description,
      icon: iconMap[String(item.iconName)] || iconMap[fallback.iconName] || Zap,
    };
  });

  return (
    <section className="section-pad bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            badge={
              <span className="type-badge type-badge--light">
                <Sparkles className="w-4 h-4" /> Why Choose Us
              </span>
            }
            title={content.getContent('features_section_title', 'Why Marmidon')}
            description={content.getContent('features_section_desc', 'Integrated ERP built for African businesses — sector-fit, secure, and supported from implementation to growth.')}
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={`${feature.id}-${index}`}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[var(--color-secondary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
