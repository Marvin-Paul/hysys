import type { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeMarmidonProductCards, pickCmsField, pickMarmidonHomepageText } from '../../lib/cms/cmsContent';
import { outcomeReportImages } from '../../lib/cms/cardDefaults';
import { OptimizedImage } from '../ui/OptimizedImage';

const defaultReports = [
  {
    id: 'efficiency',
    tag: 'Outcome',
    title: '35% faster month-end close after unifying finance and inventory',
    stat1_value: '35%',
    stat1_label: 'faster close',
    stat2_value: '11',
    stat2_label: 'modules integrated',
    link: '/products/financials',
    image: outcomeReportImages.efficiency,
  },
  {
    id: 'inventory',
    tag: 'Outcome',
    title: 'Retailers report 32% higher sell-through with connected POS and stock',
    stat1_value: '32%',
    stat1_label: 'sell-through',
    stat2_value: '28%',
    stat2_label: 'less shrinkage',
    link: '/solutions/retail',
    image: outcomeReportImages.inventory,
  },
  {
    id: 'manufacturing',
    tag: 'Outcome',
    title: 'Manufacturers cut planning cycles with integrated production and procurement',
    stat1_value: '40%',
    stat1_label: 'planning time saved',
    stat2_value: '25%',
    stat2_label: 'cost visibility',
    link: '/solutions/manufacturing',
    image: outcomeReportImages.manufacturing,
  },
];

function handleImageError(reportId: string, event: SyntheticEvent<HTMLImageElement>) {
  const fallback = outcomeReportImages[reportId];
  if (fallback && event.currentTarget.src !== fallback) {
    event.currentTarget.src = fallback;
  }
}

export function AnalystReportSection() {
  const content = useSiteContent('homepage');
  const cmsReports = content.getContentRaw('analyst_reports') as typeof defaultReports | null;
  const reports = mergeMarmidonProductCards(
    cmsReports,
    defaultReports,
    (card, cms) => ({
      ...card,
      tag: pickCmsField(cms?.tag, card.tag),
      title: pickMarmidonHomepageText(cms?.title, card.title),
      stat1_value: pickCmsField(cms?.stat1_value, card.stat1_value),
      stat1_label: pickCmsField(cms?.stat1_label, card.stat1_label),
      stat2_value: pickCmsField(cms?.stat2_value, card.stat2_value),
      stat2_label: pickCmsField(cms?.stat2_label, card.stat2_label),
      link: pickCmsField(cms?.link, card.link),
      image: outcomeReportImages[card.id] || card.image || pickCmsField(cms?.image, ''),
    }),
    (card) => card.id
  );
  const sectionTitle = pickMarmidonHomepageText(
    content.getContentRaw('analyst_section_title'),
    'Featured proof from Marmidon customers'
  );

  return (
    <section className="py-14 sm:py-20 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight max-w-2xl mx-auto">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reports.map((report) => (
            <Link
              key={report.id}
              to={report.link || '/customers'}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div className="relative h-40 sm:h-44 overflow-hidden">
                {report.image ? (
                  <OptimizedImage
                    src={report.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => handleImageError(report.id, e)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-6 sm:gap-8 px-4 pb-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none">{report.stat1_value}</div>
                    <div className="text-xs text-white/85 mt-1">{report.stat1_label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 leading-none">{report.stat2_value}</div>
                    <div className="text-xs text-white/85 mt-1">{report.stat2_label}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">{report.tag}</span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug flex-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {report.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] mt-4">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
