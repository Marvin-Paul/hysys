import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const reports = [
  {
    tag: 'Report',
    title: 'Agentforce delivers ROI faster and at a lower cost than a DIY approach',
    stat1: { value: '75%', label: 'increased accuracy' },
    stat2: { value: '14×', label: 'faster deployment' },
    accent: 'from-[var(--color-secondary)] to-[var(--color-primary)]',
    link: '/solutions',
  },
  {
    tag: 'Report',
    title: 'HYSYS named a Leader in the 2025 Gartner Magic Quadrant for CRM',
    stat1: { value: '#1', label: 'CRM platform globally' },
    stat2: { value: '10×', label: 'years running' },
    accent: 'from-[var(--color-primary)] to-[var(--color-accent)]',
    link: '/solutions',
  },
  {
    tag: 'Analyst Report',
    title: 'Forrester Total Economic Impact™ study: 362% ROI with HYSYS',
    stat1: { value: '362%', label: 'ROI achieved' },
    stat2: { value: '$5.2M', label: 'net present value' },
    accent: 'from-[#1e3a8a] to-[var(--color-primary)]',
    link: '/solutions',
  },
];

export function AnalystReportSection() {
  return (
    <section className="py-14 sm:py-20 border-t border-gray-200" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-secondary)] leading-tight max-w-2xl mx-auto">
            See why analysts agree HYSYS should be your Agentic AI partner
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reports.map((r, i) => (
            <Link key={i} to={r.link}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className={`relative bg-gradient-to-br ${r.accent} h-36 sm:h-44 flex items-center justify-center overflow-hidden`}>
                <div className="absolute w-28 h-28 rounded-full bg-white/10 top-4 left-4" />
                <div className="absolute w-16 h-16 rounded-full bg-white/10 bottom-2 right-6" />
                <span className="absolute top-5 right-7 text-cyan-300 text-xl select-none">✦</span>
                <span className="absolute bottom-7 left-7 text-blue-200 text-base select-none">✦</span>
                <div className="relative flex gap-5 items-end">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white leading-none">{r.stat2.value}</div>
                    <div className="text-xs text-blue-200 mt-1">{r.stat2.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 leading-none">{r.stat1.value}</div>
                    <div className="text-xs text-blue-200 mt-1">{r.stat1.label}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold text-gray-500 border border-gray-200 mb-3 w-fit">
                  {r.tag}
                </span>
                <h3 className="text-[var(--color-secondary)] font-bold text-sm leading-snug flex-1">{r.title}</h3>
                <div className="mt-4 flex items-center gap-1 text-[var(--color-primary)] text-sm font-semibold group-hover:gap-2 transition-all">
                  Read report <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
