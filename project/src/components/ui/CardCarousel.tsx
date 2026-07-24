import type { ReactNode } from 'react';

interface CardCarouselProps {
  children: ReactNode[];
  speed?: number;
  className?: string;
}

export function CardCarousel({ children, speed = 30, className = '' }: CardCarouselProps) {
  const cards = [...children, ...children];

  return (
    <div className={`carousel-wrapper overflow-hidden ${className}`}>
      <div
        className="carousel-track flex gap-6"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="carousel-card">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
