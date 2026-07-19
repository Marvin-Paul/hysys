import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { VideoCard } from '../ui/VideoCard';
import { CarouselControls } from '../ui/CarouselControls';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useTranslation } from '../../lib/i18n';
import { mergeCmsList, resolveText } from '../../lib/cms/cmsContent';
import { storyThumbnails } from '../../lib/cms/cardDefaults';

const fallbackStories = [
  {
    id: 'techcorp',
    logoText: 'TC',
    name: 'David Okello',
    title: 'Finance Director',
    company: 'TechCorp',
    thumbnail: storyThumbnails.techcorp,
    quote: 'Marmidon unified our finance, inventory, and production data. We cut manual reporting by 60% in six months.',
    nameKey: 'techcorp',
    quoteKey: 'techcorpQuote',
  },
  {
    id: 'globalretail',
    logoText: 'GR',
    name: 'Sarah Mensah',
    title: 'Retail Operations Lead',
    company: 'GlobalRetail',
    thumbnail: storyThumbnails.globalretail,
    quote: 'With Marmidon POS and Inventory linked to finance, we finally have one view across 50+ stores.',
    nameKey: 'globalRetail',
    quoteKey: 'globalRetailQuote',
  },
  {
    id: 'healthfirst',
    logoText: 'HF',
    name: 'Dr. James Nsubuga',
    title: 'Operations Director',
    company: 'HealthFirst',
    thumbnail: storyThumbnails.healthfirst,
    quote: 'Procurement and HR on one platform improved compliance and cut admin work across our facilities.',
    nameKey: 'healthFirst',
    quoteKey: 'healthFirstQuote',
  },
  {
    id: 'financetech',
    logoText: 'FT',
    name: 'Amina Hassan',
    title: 'Project Director',
    company: 'FinanceTech',
    thumbnail: storyThumbnails.financetech,
    quote: 'Project costing and billing in Marmidon gave us visibility we never had — profitability improved immediately.',
    nameKey: 'financeTech',
    quoteKey: 'financeTechQuote',
  },
];

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

export function CustomerStoriesSection() {
  const { t } = useTranslation();
  const content = useSiteContent('stories');
  const raw = content.getContentRaw('customer_stories') as any[] | null;
  const merged = mergeCmsList(raw, fallbackStories);

  const stories = merged.map((story: any) => ({
    thumbnail: story.thumbnail || story.image || storyThumbnails[story.id] || fallbackStories[0].thumbnail,
    name: resolveText(story.name, story.nameKey, t) || story.company || 'Customer',
    title: story.title || story.role || 'Executive',
    company: story.company || resolveText(story.name, story.nameKey, t) || 'Marmidon Customer',
    quote: resolveText(story.quote, story.quoteKey, t) || 'Marmidon ERP helped us unify operations on one platform.',
    logoText: story.logoText || story.logo || getInitials(resolveText(story.name, story.nameKey, t) || 'HC'),
  }));

  const storyCount = stories.length;
  const slidesPerViewMd = Math.min(2, storyCount);
  const slidesPerViewLg = Math.min(3, storyCount);

  const sliderSlides = useMemo(
    () => stories.map((story, index) => (
      <SwiperSlide key={`${story.company}-${story.name}-${index}`}>
        <VideoCard {...story} />
      </SwiperSlide>
    )),
    [stories]
  );

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0052CC] to-[var(--color-secondary)] text-white overflow-hidden border-t border-blue-900">
      <div className="absolute inset-x-0 bottom-0 h-32">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" fill="rgba(59, 130, 246, 0.3)" />
          <path d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z" fill="rgba(147, 197, 253, 0.2)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200 mb-4">
            {content.getContent('carousel_badge', 'Customer Success Stories')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {content.getContent('carousel_title', 'Loved by teams worldwide')}
          </h2>
          <p className="mt-4 text-base text-blue-100">
            {content.getContent('carousel_desc', 'Experience modern customer storytelling with an enterprise-ready video carousel that adapts to desktop, tablet, and mobile.')}
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={false}
            rewind={storyCount > 1}
            speed={900}
            autoplay={storyCount > 1 ? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            navigation={storyCount > 1}
            pagination={{ clickable: true, el: '.customer-stories-pagination' }}
            breakpoints={{
              768: { slidesPerView: slidesPerViewMd, spaceBetween: 24 },
              1024: { slidesPerView: slidesPerViewLg, spaceBetween: 28 },
            }}
            className="customer-stories-swiper"
          >
            {sliderSlides}
          </Swiper>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            <CarouselControls />
          </div>

          <div className="flex justify-center mt-8 lg:hidden">
            <CarouselControls />
          </div>
        </div>
      </div>
    </section>
  );
}
