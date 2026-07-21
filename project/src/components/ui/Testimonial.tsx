import type { ReactNode } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  children?: ReactNode;
}

export function Testimonial({ quote, author, role, avatar, children }: TestimonialProps) {
  return (
    <figure className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <blockquote className="text-lg text-gray-700">"{quote}"</blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {avatar && (
          <img src={avatar} alt={author} className="h-12 w-12 rounded-full object-cover" />
        )}
        <div>
          <div className="text-sm font-bold text-gray-900">{author}</div>
          {role && <div className="text-xs text-gray-500">{role}</div>}
        </div>
      </figcaption>
      {children}
    </figure>
  );
}
