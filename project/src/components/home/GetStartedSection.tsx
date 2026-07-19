import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useSiteContent } from '../../hooks/useSiteContent';

export function GetStartedSection() {
  const content = useSiteContent('homepage');

  return (
    <section className="relative section-pad overflow-hidden bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <ScrollReveal>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="type-badge type-badge--hero mb-6">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {content.getContent('get_started_badge', 'See Marmidon in action')}
          </span>
          <h2 className="type-display text-3xl sm:text-4xl lg:text-[2.75rem] mb-8">
            {content.getContent('get_started_title_1', 'Ready to unify your operations?')}<br />
            <span className="type-display-accent">{content.getContent('get_started_title_2', 'Book a personalised demo')}</span><br />
            {content.getContent('get_started_title_3', 'with our ERP specialists')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/request-a-demo"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base hover:bg-gray-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {content.getContent('get_started_button', 'Request a Demo')}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/20 transition-all duration-300"
            >
              {content.getContent('get_started_contact_label', 'Contact Sales')}
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">{content.getContent('get_started_footnote', 'No obligation. Tailored to your industry and modules.')}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
