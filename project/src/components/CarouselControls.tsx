import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export function CarouselControls() {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition hover:bg-white/10 hover:scale-110"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition hover:bg-white/10 hover:scale-110"
        aria-label="Play"
      >
        <Play className="h-6 w-6 fill-white" />
      </button>
      <button
        type="button"
        className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition hover:bg-white/10 hover:scale-110"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
