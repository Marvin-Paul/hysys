import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { VideoCard } from './VideoCard';
import { CarouselControls } from './CarouselControls';

const stories = [
  {
    logoText: 'AC',
    name: 'Alex Carter',
    title: 'VP of Customer Success',
    company: 'Cloudly Inc.',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    quote: 'The customer success stories carousel helped our brand stand out while showcasing measurable growth and alignment across distributed teams.',
  },
  {
    logoText: 'TR',
    name: 'Tina Ramirez',
    title: 'Global Marketing Director',
    company: 'NovaWave',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    quote: 'We reduced campaign cycle time by 38% and earned stronger executive buy-in through consistent, shareable customer video stories.',
  },
  {
    logoText: 'JP',
    name: 'Jordan Patel',
    title: 'Head of Sales Operations',
    company: 'Vertex Dynamics',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    quote: 'The video carousel is smooth, responsive, and instantly communicates trust to prospects across our enterprise funnel.',
  },
  {
    logoText: 'MK',
    name: 'Maya Kim',
    title: 'Chief Growth Officer',
    company: 'Zenith Systems',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    quote: 'This section became our highest-performing homepage asset, with longer engagement times and stronger demo requests.',
  },
  {
    logoText: 'LB',
    name: 'Liam Brooks',
    title: 'VP of Operations',
    company: 'Sapphire Labs',
    thumbnail: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80',
    quote: 'The carousel delivers a polished enterprise feel and keeps our success stories accessible on all device sizes.',
  },
];

export function CustomerStoriesSection() {
  const sliderSlides = useMemo(
    () => stories.map((story) => (
      <SwiperSlide key={story.name}>
        <VideoCard {...story} />
      </SwiperSlide>
    )),
    []
  );

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0052CC] to-[#032D60] text-white overflow-hidden">
      {/* Decorative wave shapes at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" fill="rgba(59, 130, 246, 0.3)" />
          <path d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z" fill="rgba(147, 197, 253, 0.2)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200 mb-4">Customer Success Stories</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Loved by teams worldwide</h2>
          <p className="mt-4 text-base text-blue-100">Experience modern customer storytelling with an enterprise-ready video carousel that adapts to desktop, tablet, and mobile.</p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            speed={900}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={true}
            pagination={{ clickable: true, el: '.customer-stories-pagination' }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 28 },
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
