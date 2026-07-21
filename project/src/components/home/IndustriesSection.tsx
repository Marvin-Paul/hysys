import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeMarmidonProductCards, pickCmsField } from '../../lib/cms/cmsContent';
import { sectorImages } from '../../lib/cms/cardDefaults';
import { SectorCard } from '../ui/SectorCard';
import { MARMIDON_SECTORS, sectorCardsForHomepage } from '../../lib/marmidonCatalog';

const defaultSectors = sectorCardsForHomepage();

const iconsById: Record<string, ReactNode> = {
  manufacturing: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="8" y="20" width="32" height="20" rx="2" fill="white" opacity="0.9"/><path d="M14 20V12h8v8M26 20V8h8v12" stroke="white" strokeWidth="2"/></svg>),
  production: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><circle cx="24" cy="24" r="14" stroke="white" strokeWidth="2"/><path d="M24 14v10l7 4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>),
  wholesale: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="6" y="16" width="36" height="22" rx="3" fill="white" opacity="0.85"/><path d="M6 22h36" stroke="#3588E4" strokeWidth="2"/></svg>),
  retail: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M8 14h32l-4 18H12L8 14z" fill="white" opacity="0.9"/><circle cx="18" cy="38" r="3" fill="white"/><circle cx="30" cy="38" r="3" fill="white"/></svg>),
  distribution: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><circle cx="12" cy="32" r="4" fill="white"/><circle cx="36" cy="32" r="4" fill="white"/><path d="M16 32h16M12 28V16h24v12" stroke="white" strokeWidth="2"/></svg>),
  'professional-services': (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="10" y="12" width="28" height="26" rx="3" fill="white" opacity="0.9"/><path d="M16 22h16M16 28h10" stroke="#3588E4" strokeWidth="2" strokeLinecap="round"/></svg>),
  education: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M24 8L6 18l18 10 18-10L24 8z" fill="white" opacity="0.9"/><path d="M12 22v10c0 2 5 6 12 6s12-4 12-6V22" stroke="white" strokeWidth="2"/></svg>),
  healthcare: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="8" y="8" width="32" height="32" rx="16" fill="white" opacity="0.15" stroke="white" strokeWidth="2"/><path d="M24 16v16M16 24h16" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>),
  hospitality: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M8 36h32M12 36V20h8v16M28 36V14h8v22" stroke="white" strokeWidth="2"/><path d="M20 20h8v4h-8z" fill="white" opacity="0.8"/></svg>),
  'non-profit': (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M24 38c0-8 10-12 10-20a6 6 0 00-12 0 6 6 0 00-12 0c0 8 10 12 14 20z" fill="white" opacity="0.9"/></svg>),
  construction: (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><path d="M8 36h32M14 36V24l10-8 10 8v12" stroke="white" strokeWidth="2"/><rect x="20" y="28" width="8" height="8" fill="white" opacity="0.8"/></svg>),
  'media-publishing': (<svg viewBox="0 0 48 48" className="w-6 h-6" fill="none"><rect x="8" y="10" width="32" height="28" rx="3" fill="white" opacity="0.9"/><path d="M14 18h20M14 24h14M14 30h18" stroke="#3588E4" strokeWidth="2" strokeLinecap="round"/></svg>),
};

export function IndustriesSection() {
  const content = useSiteContent('homepage');
  const cmsSectors = content.getContentRaw('homepage_industries_list') as typeof defaultSectors | null;
  const sectors = mergeMarmidonProductCards(
    cmsSectors,
    defaultSectors,
    (card, cms) => ({
      ...card,
      title: pickCmsField(cms?.title, card.title),
      description: pickCmsField(cms?.description, card.description),
      link: pickCmsField(cms?.link, card.link),
      image: sectorImages[card.id] || card.image || pickCmsField(cms?.image, ''),
    }),
    (card) => card.id
  );
  const cardLinkLabel = content.getContent('homepage_industries_link_label', 'Learn more');
  const exploreCta = content.getContent('homepage_industries_cta', 'Explore all solutions');

  const displayedSectors = sectors.slice(0, 4);
  const hiddenSectors = sectors.slice(4);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {displayedSectors.map((sector: { id: string; title: string; description: string; link?: string; iconName?: string; image?: string }) => (
            <SectorCard
              key={sector.id}
              id={sector.id}
              title={sector.title}
              description={sector.description}
              link={sector.link || `/solutions/${sector.id}`}
              image={sector.image}
              icon={iconsById[sector.id] ?? iconsById[MARMIDON_SECTORS[0]?.slug ?? 'manufacturing']}
              linkLabel={cardLinkLabel}
            />
          ))}
          {/* Remaining sector cards are preserved below for future use */}
          {hiddenSectors.map((sector: { id: string; title: string; description: string; link?: string; iconName?: string; image?: string }) => (
            <SectorCard
              key={sector.id}
              id={sector.id}
              title={sector.title}
              description={sector.description}
              link={sector.link || `/solutions/${sector.id}`}
              image={sector.image}
              icon={iconsById[sector.id] ?? iconsById[MARMIDON_SECTORS[0]?.slug ?? 'manufacturing']}
              linkLabel={cardLinkLabel}
              className="hidden"
            />
          ))}
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
