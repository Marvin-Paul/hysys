import type { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeMarmidonProductCards, pickCmsField, pickMarmidonHomepageText } from '../../lib/cms/cmsContent';
import { resourceCardImages } from '../../lib/cms/cardDefaults';

const defaultCards = [
  {
    id: 'blog',
    tag: 'Blog',
    title: 'ERP insights & product updates',
    desc: 'Practical guides on finance, inventory, and sector best practices from the Marmidon team.',
    link: '/resources/blog',
    image: resourceCardImages.blog,
  },
  {
    id: 'guides',
    tag: 'Guides',
    title: 'Whitepapers & playbooks',
    desc: 'In-depth resources for evaluating and implementing enterprise ERP in your industry.',
    link: '/resources/guides',
    image: resourceCardImages.guides,
  },
  {
    id: 'docs',
    tag: 'Documentation',
    title: 'Technical documentation',
    desc: 'Module references, setup guides, and integration notes for your IT team.',
    link: '/documentation',
    image: resourceCardImages.docs,
  },
];

function handleImageError(cardId: string, event: SyntheticEvent<HTMLImageElement>) {
  const fallback = resourceCardImages[cardId];
  if (fallback && event.currentTarget.src !== fallback) {
    event.currentTarget.src = fallback;
  }
}

export function AISuccessSection() {
  const content = useSiteContent('homepage');
  const cmsCards = content.getContentRaw('ai_success_cards') as typeof defaultCards | null;
  const cards = mergeMarmidonProductCards(
    cmsCards,
    defaultCards,
    (card, cms) => ({
      ...card,
      tag: pickCmsField(cms?.tag, card.tag),
      title: pickMarmidonHomepageText(cms?.title, card.title),
      desc: pickMarmidonHomepageText(cms?.desc ?? cms?.description, card.desc),
      link: pickCmsField(cms?.link, card.link),
      image: resourceCardImages[card.id] || card.image || pickCmsField(cms?.image, ''),
    }),
    (card) => card.id
  );
  const linkLabel = content.getContent('ai_success_card_link_label', 'Explore');
  const sectionTitle = pickMarmidonHomepageText(
    content.getContentRaw('ai_success_title'),
    'Resources to help you evaluate and implement ERP'
  );

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight max-w-2xl mx-auto">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.id}
              to={card.link || '/resources'}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => handleImageError(card.id, e)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 z-10 inline-flex px-2.5 py-1 rounded-md bg-white/95 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] shadow-sm">
                  {card.tag}
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] mt-4">
                  {linkLabel} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
