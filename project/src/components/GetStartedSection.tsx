import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from '../lib/i18n';

export function GetStartedSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <ScrollReveal>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90 backdrop-blur-md border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            {t('getStartedBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            {t('getStartedTitle1')}<br />
            <span className="text-cyan-200">{t('getStartedTitle2')}</span>,<br />
            {t('getStartedTitle3')}
          </h2>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold text-base hover:bg-gray-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {t('tryForFree')}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <p className="text-white/40 text-sm mt-6">{t('noCommitment')}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
