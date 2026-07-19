import type { LucideIcon } from 'lucide-react';
import { Compass, Trophy, Sparkles } from 'lucide-react';

export type AgentblazerTier = 'ranger' | 'champion' | 'trailblazer';

const tierConfig: Record<
  AgentblazerTier,
  {
    label: string;
    level: string;
    tagline: string;
    icon: LucideIcon;
  }
> = {
  ranger: {
    label: 'Ranger',
    level: 'Level I',
    tagline: 'Build your foundation',
    icon: Compass,
  },
  champion: {
    label: 'Champion',
    level: 'Level II',
    tagline: 'Master core skills',
    icon: Trophy,
  },
  trailblazer: {
    label: 'Trailblazer',
    level: 'Level III',
    tagline: 'Lead the future',
    icon: Sparkles,
  },
};

interface AgentblazerBadgeProps {
  tier: AgentblazerTier;
  className?: string;
}

export function AgentblazerBadge({ tier, className = '' }: AgentblazerBadgeProps) {
  const { label, level, tagline, icon: Icon } = tierConfig[tier];

  return (
    <article className={`agent-badge agent-badge--${tier} ${className}`.trim()}>
      <div className="agent-badge__glow" aria-hidden="true" />

      <div className="agent-badge__medal-wrap">
        <div className="agent-badge__orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="agent-badge__medal">
          <svg viewBox="0 0 120 120" className="agent-badge__svg" aria-hidden="true">
            <defs>
              <linearGradient id={`${tier}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
                {tier === 'ranger' && (
                  <>
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="45%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                  </>
                )}
                {tier === 'champion' && (
                  <>
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#b45309" />
                  </>
                )}
                {tier === 'trailblazer' && (
                  <>
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="35%" stopColor="#ec4899" />
                    <stop offset="70%" stopColor="#00a3e0" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={`${tier}-face`} x1="0%" y1="0%" x2="100%" y2="100%">
                {tier === 'ranger' && (
                  <>
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </>
                )}
                {tier === 'champion' && (
                  <>
                    <stop offset="0%" stopColor="#fffbeb" />
                    <stop offset="100%" stopColor="#fde68a" />
                  </>
                )}
                {tier === 'trailblazer' && (
                  <>
                    <stop offset="0%" stopColor="#faf5ff" />
                    <stop offset="100%" stopColor="#ddd6fe" />
                  </>
                )}
              </linearGradient>
              <filter id={`${tier}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
              </filter>
            </defs>

            <circle cx="60" cy="60" r="54" fill="none" stroke={`url(#${tier}-ring)`} strokeWidth="5" filter={`url(#${tier}-shadow)`} />
            <circle cx="60" cy="60" r="44" fill={`url(#${tier}-face)`} stroke="rgba(255,255,255,0.85)" strokeWidth="2" />

            {tier === 'trailblazer' && (
              <>
                <polygon points="60,18 63,28 73,28 65,34 68,44 60,38 52,44 55,34 47,28 57,28" fill="#fbbf24" opacity="0.95" />
                <polygon points="60,96 63,86 73,86 65,80 68,70 60,76 52,70 55,80 47,86 57,86" fill="#fbbf24" opacity="0.75" />
              </>
            )}

            {tier === 'champion' && (
              <path d="M60 22 L66 38 L83 38 L69 48 L75 64 L60 54 L45 64 L51 48 L37 38 L54 38 Z" fill="#f59e0b" opacity="0.35" />
            )}
          </svg>

          <div className="agent-badge__icon">
            <Icon strokeWidth={1.75} aria-hidden="true" />
          </div>

          <span className="agent-badge__shine" aria-hidden="true" />
        </div>

        <div className="agent-badge__ribbon">
          <span className="agent-badge__level">{level}</span>
        </div>
      </div>

      <div className="agent-badge__copy">
        <p className="agent-badge__eyebrow">Agentblazer</p>
        <h3 className="agent-badge__title">{label}</h3>
        <p className="agent-badge__tagline">{tagline}</p>
      </div>
    </article>
  );
}

export const agentblazerTiers: AgentblazerTier[] = ['ranger', 'champion', 'trailblazer'];
