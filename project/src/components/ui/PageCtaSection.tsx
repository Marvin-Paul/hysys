import { ScrollReveal } from './ScrollReveal';

import { ArrowRight, Sparkles } from 'lucide-react';

import { TrackedLink } from './TrackedLink';



interface PageCtaSectionProps {

  title?: string;

  description?: string;

  primaryLabel?: string;

  primaryTo?: string;

  secondaryLabel?: string;

  secondaryTo?: string;

}



const DEFAULT_CTA = {

  title: 'Ready to see Marmidon in action?',

  description: 'Book a personalised demo and discover how Marmidon ERP can transform your operations.',

  primaryLabel: 'Request a Demo',

  primaryTo: '/request-a-demo',

  secondaryLabel: 'Contact Sales',

  secondaryTo: '/contact',

};



export function PageCtaSection({

  title = DEFAULT_CTA.title,

  description = DEFAULT_CTA.description,

  primaryLabel = DEFAULT_CTA.primaryLabel,

  primaryTo = DEFAULT_CTA.primaryTo,

  secondaryLabel = DEFAULT_CTA.secondaryLabel,

  secondaryTo = DEFAULT_CTA.secondaryTo,

}: PageCtaSectionProps = {}) {

  return (

    <section className="relative section-pad overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />

      <div

        className="absolute inset-0 opacity-[0.04]"

        style={{

          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,

        }}

      />

      <ScrollReveal>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{title}</h2>

          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <TrackedLink

              to={primaryTo}

              ctaName={primaryLabel}

              ctaLocation="page_cta_section"

              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"

            >

              {primaryLabel} <ArrowRight className="w-5 h-5" />

            </TrackedLink>

            {secondaryLabel && secondaryTo && (

              <TrackedLink

                to={secondaryTo}

                ctaName={secondaryLabel}

                ctaLocation="page_cta_section"

                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300"

              >

                {secondaryLabel}

              </TrackedLink>

            )}

          </div>

        </div>

      </ScrollReveal>

    </section>

  );

}

