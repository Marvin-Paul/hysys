import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';

const steps = [
  { tier: 'Discover', label: 'Map your modules and sector requirements' },
  { tier: 'Implement', label: 'Configure, migrate data, and train your team' },
  { tier: 'Grow', label: 'Add modules and scale with Marmidon support' },
];

export function AgentblazerSection() {
  const content = useSiteContent('homepage');

  return (
    <section className="agentblazer-section">
      <div className="agentblazer-section__bg" aria-hidden="true">
        <div className="agentblazer-section__orb agentblazer-section__orb--1" />
        <div className="agentblazer-section__orb agentblazer-section__orb--2" />
        <div className="agentblazer-section__orb agentblazer-section__orb--3" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-[1]">
        <span className="agentblazer-section__kicker">{content.getContent('agentblazer_badge', 'Implementation journey')}</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight mb-3 sm:mb-4">
          {content.getContent('agentblazer_title', 'From discovery to go-live')}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-7 sm:mb-8">
          {content.getContent('agentblazer_desc', 'Our team guides you through scoping, configuration, data migration, and training — so Marmidon ERP goes live with confidence.')}
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[var(--color-primary)] text-white rounded-lg font-bold text-sm hover:bg-[var(--color-secondary)] transition-all hover:shadow-lg hover:-translate-y-0.5 mb-12 sm:mb-16">
          {content.getContent('agentblazer_cta', 'Talk to our team')} <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="grid gap-6 sm:grid-cols-3 text-left">
          {steps.map((step, index) => (
            <div key={step.tier} className="rounded-2xl bg-white/80 backdrop-blur p-6 ring-1 ring-slate-200 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">Step {index + 1}</div>
              <h3 className="text-lg font-bold text-[var(--color-secondary)] mb-2">{step.tier}</h3>
              <p className="text-sm text-gray-600">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
