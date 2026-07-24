import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { CardCarousel } from '../ui/CardCarousel';
import { SectorCard } from '../ui/SectorCard';
import { MARMIDON_SECTORS } from '../../lib/marmidonCatalog';
import { sectorImages } from '../../lib/cms/cardDefaults';
import type { LucideIcon } from 'lucide-react';
import {
  Factory, Cog, Truck, ShoppingBag, Network, Briefcase, GraduationCap,
  HeartPulse, UtensilsCrossed, Heart, HardHat, Newspaper,
} from 'lucide-react';

const sectorIconMap: Record<string, LucideIcon> = {
  Factory, Cog, Truck, ShoppingBag, Network, Briefcase, GraduationCap,
  HeartPulse, UtensilsCrossed, Heart, HardHat, Newspaper,
};

export function IndustriesSection() {
  const content = useSiteContent('homepage');
  const cardLinkLabel = content.getContent('homepage_industries_link_label', 'Learn more');
  const exploreCta = content.getContent('homepage_industries_cta', 'Explore all solutions');

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-4">
            {content.getContent('homepage_industries_title', 'ERP solutions built for your industry')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {content.getContent('homepage_industries_desc', 'Twelve sector-specific configurations of Marmidon ERP — with the modules, workflows, and reporting your industry needs from day one.')}
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <CardCarousel speed={30}>
            {MARMIDON_SECTORS.map((sector) => (
              <SectorCard
                key={sector.slug}
                id={sector.slug}
                title={sector.title}
                description={sector.description.length > 120 ? `${sector.description.slice(0, 117)}…` : sector.description}
                link={`/solutions/${sector.slug}`}
                image={sectorImages[sector.slug]}
                icon={sectorIconMap[sector.iconName] ?? Factory}
                linkLabel={cardLinkLabel}
              />
            ))}
          </CardCarousel>
        </div>

        <div className="text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg"
          >
            {exploreCta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
