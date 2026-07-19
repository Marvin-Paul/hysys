import { ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'left' | 'right' | 'scale';
  threshold?: number;
}

export function ScrollReveal({ children, className = '', variant = 'default', threshold }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  const variantClass = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <div ref={ref} className={`${variantClass} ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
