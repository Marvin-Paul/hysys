import { Link, useParams } from 'react-router-dom';
import { BookOpen, Award, PlayCircle, FileText, ArrowRight, Clock, Star, CheckCircle, Sparkles, Users, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTranslation } from '../lib/i18n';
import { useSiteContent } from '../hooks/useSiteContent';
import { SEO } from '../components/SEO';

const iconMap: Record<string, LucideIcon> = { BookOpen, Award, PlayCircle, FileText };

const learningData: Record<string, any> = {
  'trailhead':      { icon: BookOpen,    title: 'Trailhead',      subtitle: 'Free learning paths', description: 'Learn in-demand skills with fun, interactive modules. Trailhead provides guided learning paths for every role and skill level.',                                                       features: ['Interactive Modules','Hands-on Projects','Skill Assessments','Gamified Learning','Community Support','Career Paths'],          color: 'from-blue-500 to-blue-700',   titleKey: 'trailhead',       subtitleKey: 'freeLearningPaths', descriptionKey: 'trailheadDesc' },
  'certifications': { icon: Award,       title: 'Certifications', subtitle: 'Get certified',       description: 'Validate your expertise with industry-recognised certifications. HYSYS certifications demonstrate your skills and advance your career.',                                              features: ['Administrator Certification','Developer Certification','Architect Certification','Consultant Certifications','Practice Exams','Study Groups'], color: 'from-amber-500 to-orange-600',titleKey: 'certifications',  subtitleKey: 'getCertified',      descriptionKey: 'certDesc'      },
  'webinars':       { icon: PlayCircle,  title: 'Webinars',       subtitle: 'Live sessions',       description: 'Join live sessions with product experts and industry leaders. Learn best practices, see demos, and get your questions answered.',                                                    features: ['Product Demos','Customer Success Stories','Industry Insights','Roadmap Previews','Q&A Sessions','On-Demand Library'],           color: 'from-rose-500 to-pink-600',   titleKey: 'webinars',        subtitleKey: 'liveSessions',      descriptionKey: 'webinarsDesc'  },
  'documentation':  { icon: FileText,   title: 'Documentation',  subtitle: 'Technical docs',      description: 'Comprehensive technical documentation for developers and admins. Find guides, API references, and best practices for every product.',                                                  features: ['API Reference','Developer Guides','Admin Guides','Release Notes','Implementation Guides','Troubleshooting'],                   color: 'from-emerald-500 to-teal-600',titleKey: 'documentation',   subtitleKey: 'technicalDocs',     descriptionKey: 'docsDesc'      },
};

const trails = [
  { name: 'Admin Beginner',       modules: 12, hours: 8,  level: 'Beginner',     color: 'from-blue-500 to-blue-700'    },
  { name: 'Developer Basics',     modules: 15, hours: 12, level: 'Beginner',     color: 'from-emerald-500 to-teal-600' },
  { name: 'Data Architecture',    modules: 8,  hours: 6,  level: 'Intermediate', color: 'from-violet-500 to-purple-700'},
  { name: 'AI & Machine Learning',modules: 10, hours: 10, level: 'Advanced',     color: 'from-amber-500 to-orange-600' },
];

const levelColor = (level: string) =>
  level === 'Beginner' ? 'bg-green-100 text-green-700' :
  level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
  'bg-red-100 text-red-700';

export function LearningPage() {
  const { t } = useTranslation();
  const content = useSiteContent('learning');
  const rawItems = content.getContentRaw('learning_items') as any[] | null;
  const resolvedData: Record<string, any> = rawItems
    ? Object.fromEntries(rawItems.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Award }]))
    : learningData;
  const resolvedTrails = (content.getContentRaw('trails') as any[] | null) ?? trails;

  return (
    <div className="pt-16">
      <SEO title="Learning & Resources" />

      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse" style={{
            background: i % 2 === 0 ? 'rgba(0,163,224,0.4)' : 'rgba(255,255,255,0.3)',
            top: `${20+(i*9)%60}%`, left: `${5+(i*13)%90}%`, animationDelay: `${i*0.5}s`,
          }} />
        ))}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <ScrollReveal>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 text-white">
                <Sparkles className="w-4 h-4 text-cyan-300" />HYSYS University
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">HYSYS GLOBAL SOLUTIONS LIMITED</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              {content.getContent('learningTitle', t('learningTitle'))}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-2">Grow Your Skills</span>
            </h1>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400" />
            </div>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              {content.getContent('learningDesc', t('learningDesc'))}
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Learning categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> Learning Resources
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">Everything you need to succeed</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Free and paid resources to help you get the most from HYSYS.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {Object.entries(resolvedData).map(([key, item]) => (
              <ScrollReveal key={key}>
                <Link to={`/learning/${key}`} className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden block text-center">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${item.color}`} />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t(item.subtitleKey)}</div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-[#0b5394] transition-colors">{t(item.titleKey)}</h3>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{t(item.descriptionKey)}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b5394] group-hover:text-[#032d60] transition-colors">
                    {t('exploreLabel')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <BookOpen className="w-4 h-4" /> Popular Trails
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60] mb-4">{content.getContent('popularLearningPaths', t('popularLearningPaths'))}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Guided paths to take you from beginner to expert.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {resolvedTrails.map((trail: any, idx: number) => (
              <ScrollReveal key={idx}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className={`h-2 bg-gradient-to-r ${trail.color || 'from-[#0b5394] to-[#00a3e0]'}`} />
                  <div className="p-6">
                    <h3 className="font-extrabold text-gray-900 text-lg mb-4">{trail.name}</h3>
                    <div className="space-y-2.5 text-sm text-gray-600 mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span>{trail.modules} {t('modules')}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <span>{trail.hours} {t('hours')}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Star className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelColor(trail.level)}`}>{trail.level}</span>
                      </div>
                    </div>
                    <button className={`w-full py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${trail.color || 'from-[#0b5394] to-[#00a3e0]'} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                      {t('startTrail')}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Free modules', icon: BookOpen },
              { value: '15+',  label: 'Certifications', icon: Award },
              { value: '200+', label: 'Live webinars/year', icon: PlayCircle },
              { value: '50K+', label: 'Learners trained', icon: Users },
            ].map((stat, idx) => (
              <ScrollReveal key={idx}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-[#0b5394] to-[#00a3e0] bg-clip-text text-transparent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Zap className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Start learning for free</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Access hundreds of free modules and earn certifications to advance your career.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/learning/trailhead" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                Explore Trailhead
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export function LearningDetailPage() {
  const { t } = useTranslation();
  const content = useSiteContent('learning');
  const { learningId } = useParams<{ learningId: string }>();
  const rawDetail = content.getContentRaw('learning_items') as any[] | null;
  const item = rawDetail
    ? Object.fromEntries(rawDetail.map((p: any) => [p.key, { ...p, icon: iconMap[p.iconName] || Award }]))[learningId || '']
    : learningData[learningId || ''];

  if (!item) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{t('learningNotFound')}</h1>
          <Link to="/learning" className="text-[#0b5394] font-semibold hover:underline">{t('viewAllResources')}</Link>
        </div>
      </div>
    );
  }

  const Icon = item.icon;

  return (
    <div className="pt-16">
      <SEO title={item.title} />

      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="left">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 uppercase tracking-wider text-cyan-300 mb-5">
                  {t(item.subtitleKey)}
                </span>
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
                  {item.title}
                  <span className="block bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent mt-1 text-4xl sm:text-5xl">by HYSYS</span>
                </h1>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-300 mb-6" />
                <p className="text-lg text-white/70 mb-10 leading-relaxed font-light max-w-lg">{item.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    {t('getStarted')} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/learning" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                    All Resources
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="right">
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className={`absolute -inset-8 bg-gradient-to-br ${item.color} opacity-20 rounded-[50px] blur-2xl`} />
                  <div className={`relative w-72 h-72 rounded-[40px] bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl`}>
                    <Icon className="w-36 h-36 text-white" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 80L720 40L1440 80V80H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394]/10 rounded-full text-sm font-semibold text-[#0b5394] mb-4">
                <Sparkles className="w-4 h-4" /> What's Included
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#032d60]">{t('whatYoullExperience')}</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {item.features.map((feature: string, idx: number) => (
              <ScrollReveal key={idx}>
                <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow`}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-10 h-10 text-cyan-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">Join thousands of professionals already learning on HYSYS University.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#032d60] rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {t('getStarted')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/learning" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                View All Resources
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
