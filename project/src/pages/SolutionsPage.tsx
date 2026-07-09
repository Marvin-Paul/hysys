import { Link, useParams } from 'react-router-dom';
import { Building2, TrendingUp, Sparkles, Heart, ArrowRight, CheckCircle, FileText, Phone, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { Building2, TrendingUp, Sparkles, Heart };

const solutionsData: Record<string, any> = {
  'small-business': { icon: Building2, title: 'Small Business', subtitle: 'Grow faster',       description: 'HYSYS helps small businesses build stronger customer relationships. Get started quickly with easy-to-use tools designed for growing teams.',           features: ['Contact & Lead Management','Email Templates & Tracking','Mobile App Access','Reports & Dashboards','Task & Activity Management','Basic Automation'],                    benefits: ['Close deals faster','Build lasting relationships','Scale operations easily','Affordable pricing'],     color: 'from-blue-500 to-blue-700',   subtitleKey: 'growFaster',       titleKey: 'smallBusiness',          descriptionKey: 'smallBizDesc'             },
  'enterprise':     { icon: TrendingUp, title: 'Enterprise',    subtitle: 'Scale operations', description: "The world's most customizable and secure CRM. Enterprise organizations trust HYSYS to manage millions of customers and complex global operations.", features: ['Advanced Security & Compliance','Custom Development','API Access','Advanced Analytics','Multi-org Management','Dedicated Support'],                          benefits: ['Unlimited customization','Enterprise-grade security','Global scalability','24/7 premium support'], color: 'from-violet-600 to-purple-700',subtitleKey: 'scaleOperations',  titleKey: 'enterprise',             descriptionKey: 'enterpriseSolutionDesc'   },
  'startups':       { icon: Sparkles,   title: 'Startups',      subtitle: 'Launch strong',    description: 'Get your startup off the ground with a platform that grows with you. HYSYS helps startups build customer relationships from day one.',              features: ['Startup Pricing Programs','Fast Implementation','Scalable Infrastructure','Investor Reporting','Growth Analytics','Integration Ecosystem'],                   benefits: ['Launch quickly','Scale without limits','Attract investors','Build from day one'],               color: 'from-amber-500 to-orange-600',  subtitleKey: 'launchStrong',     titleKey: 'startups',               descriptionKey: 'startupsDesc'             },
  'nonprofits':     { icon: Heart,      title: 'Nonprofits',    subtitle: 'Amplify impact',   description: 'Purpose-built for nonprofits. HYSYS helps organizations manage donors, volunteers, and programs efficiently. Special pricing available.',            features: ['Donor Management','Volunteer Coordination','Program Tracking','Grant Management','Impact Measurement','Special Nonprofit Pricing'],                       benefits: ['Increase donations','Engage volunteers','Track impact','Special discounts'],                    color: 'from-rose-500 to-pink-600',     subtitleKey: 'amplifyImpact',    titleKey: 'nonprofits',             descriptionKey: 'nonprofitsDesc'           },
};

/* ── Solutions List ── */
export function SolutionsPage() {
  const supportItems = [
    {
      key: 'email',
      title: 'Email Support',
      description: 'Reach our support team by email for account help, technical issues, and implementation questions.',
      icon: FileText,
      action: { label: 'Email Support', to: 'mailto:support@hysysglobal.com' },
      badge: 'Fast response',
    },
    {
      key: 'phone',
      title: 'Phone Support',
      description: 'Call our support center for urgent assistance and guided troubleshooting.',
      icon: Phone,
      action: { label: 'Call Support', to: 'tel:+256782602854' },
      badge: 'Available 8am–6pm EAT',
    },
    {
      key: 'documentation',
      title: 'Product Documentation',
      description: 'Browse technical guides, setup instructions, and best practices for every HYSYS product.',
      icon: FileText,
      action: { label: 'View Docs', to: '/contact' },
      badge: 'Self-service resources',
    },
    {
      key: 'ticketing',
      title: 'Open a Support Ticket',
      description: 'Submit an issue and track your request through our support portal.',
      icon: Sparkles,
      action: { label: 'Submit Ticket', to: '/contact' },
      badge: 'Track every request',
    },
  ];

  return (
    <div className="pt-16">
      <SEO title="Support" />
      <PageHero
        badge="Support & Help"
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title="Support Center"
        subtitle="We’re here to help"
        description="Find help, documentation, and direct access to our support team for every product and request."
        primaryCta={{ label: 'Contact Support', to: '/contact' }}
        secondaryCta={{ label: 'Get Started', to: '/register' }}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                <Sparkles className="w-4 h-4" /> Support Options
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-secondary)] mb-4">Find the help you need</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Our support team and knowledge resources are ready to assist you across every stage of your journey.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {supportItems.map((item) => (
              <ScrollReveal key={item.key}>
                <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] mb-1">{item.badge}</div>
                      <h3 className="text-2xl font-extrabold text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-8 leading-relaxed">{item.description}</p>
                  <a
                    href={item.action.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                  >
                    {item.action.label} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">Need urgent help?</h3>
              <p className="text-gray-500 leading-relaxed mb-6">If you have an urgent issue, our support team is available Monday through Friday from 8:00 AM to 6:00 PM EAT.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-500">0782-602854 · 0752-602857</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@hysysglobal.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Documentation</p>
                    <p className="text-sm text-gray-500">Browse guides and product docs anytime.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-extrabold mb-4">Still need help?</h3>
              <p className="text-white/80 mb-8 leading-relaxed">Our team is ready to support every customer, whether you need platform setup, integration advice, or incident response.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:bg-white/90 transition-all">
                Contact Support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[var(--color-secondary)] mb-4">Helpful resources</h3>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>Knowledge base articles for quick answers.</li>
                <li>Step-by-step onboarding checklists.</li>
                <li>Release notes and product updates.</li>
                <li>Best practices for security and governance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Solution Detail ── */
export function SolutionDetailPage() {
  const { t } = useTranslation();
  const content = useSiteContent('solutions');
  const { solutionId } = useParams<{ solutionId: string }>();
  const rawSolutionsDetail = content.getContentRaw('solutions_list') as any[] | null;
  const toArray = (v: any) => typeof v === 'string' ? v.split(',').map((s: string) => s.trim()).filter(Boolean) : (Array.isArray(v) ? v : []);
  const solution = rawSolutionsDetail
    ? Object.fromEntries(rawSolutionsDetail.map((p: any) => [p.key, { ...p, features: toArray(p.features), icon: iconMap[p.iconName] || Heart }]))[solutionId || '']
    : solutionsData[solutionId || ''];

  if (!solution) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('solutionNotFound')}</h1>
          <Link to="/solutions" className="text-[var(--color-primary)] font-semibold hover:underline">{t('viewAllSolutions')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEO title={solution.title} />

      <PageHero
        badge={t(solution.subtitleKey)}
        eyebrow="HYSYS GLOBAL SOLUTIONS LIMITED"
        title={t(solution.titleKey)}
        subtitle="by HYSYS"
        description={solution.description}
        primaryCta={{ label: t('getStarted'), to: '/register' }}
        secondaryCta={{ label: t('contactSales'), to: '/contact' }}
      />

      {/* Features + Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Features */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-5">
                  <Sparkles className="w-4 h-4" /> Key Features
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-secondary)] mb-8">{t('keyFeaturesTitle')}</h2>
              </ScrollReveal>
              <div className="space-y-4 stagger-children">
                {solution.features.map((feature: string, idx: number) => (
                  <ScrollReveal key={idx}>
                    <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-gray-100">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{feature}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-sm font-semibold text-emerald-700 mb-5">
                  ✦ Benefits
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-secondary)] mb-8">{t('benefitsTitle')}</h2>
              </ScrollReveal>
              <div className="space-y-4 stagger-children">
                {solution.benefits.map((benefit: string, idx: number) => (
                  <ScrollReveal key={idx}>
                    <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent rounded-2xl hover:from-[var(--color-primary)]/10 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[var(--color-primary)]/10">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to {solution.title}?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Start your free 14-day trial today. No credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-secondary)] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {t('getStarted')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                View All Solutions
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
