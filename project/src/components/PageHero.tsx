import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const heroParticles = [
  { position: 'top-[12%] left-[8%]', color: 'bg-cyan-400/40' },
  { position: 'top-[18%] right-[12%]', color: 'bg-white/30' },
  { position: 'top-[32%] left-[25%]', color: 'bg-cyan-300/30' },
  { position: 'top-[40%] right-[22%]', color: 'bg-white/30' },
  { position: 'top-[55%] left-[10%]', color: 'bg-cyan-400/30' },
  { position: 'top-[58%] right-[18%]', color: 'bg-white/20' },
  { position: 'top-[70%] left-[28%]', color: 'bg-cyan-300/25' },
  { position: 'top-[72%] right-[32%]', color: 'bg-white/20' },
  { position: 'top-[80%] left-[55%]', color: 'bg-cyan-200/30' },
  { position: 'top-[18%] left-[70%]', color: 'bg-white/25' },
  { position: 'top-[28%] right-[45%]', color: 'bg-cyan-300/30' },
  { position: 'top-[68%] right-[8%]', color: 'bg-white/20' },
];

interface HeroCta {
  label: string;
  to: string;
  variant?: 'primary' | 'secondary';
}

interface PageHeroProps {
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
}

export function PageHero({
  badge,
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.04] animate-grid-move hero-grid-bg" />
      <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-blue-500/5 animate-blob blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-400/5 animate-blob animate-delay-5000 blur-3xl" />
      <div className="absolute top-1/3 right-8 w-32 h-32 border border-white/10 rounded-full animate-orbit" />
      <div className="absolute top-[38%] right-[3.5rem] w-20 h-20 border border-white/10 rounded-full animate-orbit-reverse" />
      {heroParticles.map((particle, idx) => (
        <div
          key={idx}
          className={`absolute w-1 h-1 rounded-full animate-pulse-glow ${particle.position} ${particle.color}`}
        />
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-white text-center w-full">
          <ScrollReveal>
            <div className="flex justify-center mb-7">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 shadow-lg tracking-wide">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                {badge}
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{eyebrow}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-5 tracking-tight">
              {title}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent animate-gradient-shift mt-1">
                {subtitle}
              </span>
            </h1>
            <div className="flex justify-center mb-7">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
            </div>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {primaryCta && (
                  <Link
                    to={primaryCta.to}
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      {primaryCta.label}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    to={secondaryCta.to}
                    className="group inline-flex items-center justify-center gap-2 px-10 py-4 glass-card rounded-2xl font-bold text-base text-white hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 border border-white/20"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
