import { CheckCircle, Clock, Loader2, Code2, Database, Globe, Shield, BarChart3, Zap, Server, Navigation, Layers, TrendingUp, Users, FileCode, GitBranch, Calendar, Building2, ChevronRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────

interface Phase {
  number: number;
  name: string;
  status: 'complete' | 'in-progress' | 'pending';
  progress: number;
  description: string;
}

interface Feature {
  name: string;
  icon: React.ReactNode;
}

interface TechItem {
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const phases: Phase[] = [
  { number: 1, name: 'Planning & Architecture',       status: 'complete',    progress: 100, description: 'System design, tech stack selection, database schema' },
  { number: 2, name: 'UI/UX Design & Components',     status: 'complete',    progress: 100, description: 'Design system, reusable components, responsive layouts' },
  { number: 3, name: 'Authentication & User Mgmt',    status: 'complete',    progress: 100, description: 'Login, registration, OAuth, role-based access control' },
  { number: 4, name: 'CRM Dashboard & Features',      status: 'in-progress', progress: 75,  description: 'Dashboard modules, pipeline, leads, contacts, analytics' },
  { number: 5, name: 'Database Integration & APIs',   status: 'in-progress', progress: 60,  description: 'Supabase tables, RLS policies, REST endpoints, Express API' },
  { number: 6, name: 'Testing & Quality Assurance',   status: 'pending',     progress: 0,   description: 'Unit tests, integration tests, E2E testing, performance' },
  { number: 7, name: 'Deployment & Launch',           status: 'pending',     progress: 0,   description: 'CI/CD pipeline, cloud hosting, domain, SSL, go-live' },
];

const completedFeatures: Feature[] = [
  { name: 'Public Marketing Website',     icon: <Globe className="w-4 h-4" /> },
  { name: 'User Authentication',          icon: <Shield className="w-4 h-4" /> },
  { name: 'Admin Dashboard',              icon: <Layers className="w-4 h-4" /> },
  { name: 'Contact Management (CRM)',     icon: <Users className="w-4 h-4" /> },
  { name: 'Sales Pipeline',               icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Lead Management',              icon: <GitBranch className="w-4 h-4" /> },
  { name: 'AI Tools Section',             icon: <Zap className="w-4 h-4" /> },
  { name: 'Analytics & Reports',          icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Marketing Campaigns',          icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Commerce & Quotes',            icon: <FileCode className="w-4 h-4" /> },
  { name: 'Chatbot (Connect+ Assistant)', icon: <Zap className="w-4 h-4" /> },
  { name: 'Multi-language Support',       icon: <Globe className="w-4 h-4" /> },
];

const inProgressFeatures: Feature[] = [
  { name: 'Advanced Analytics Charts',   icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Email Notifications',         icon: <Globe className="w-4 h-4" /> },
  { name: 'Real-time Database Sync',     icon: <Database className="w-4 h-4" /> },
  { name: 'Automation Workflows',        icon: <Zap className="w-4 h-4" /> },
  { name: 'Service Operations Module',   icon: <Server className="w-4 h-4" /> },
  { name: 'Integrations Marketplace',    icon: <Layers className="w-4 h-4" /> },
];

const techStack: TechItem[] = [
  { name: 'React 18',        role: 'Frontend Framework',  icon: <Code2 className="w-5 h-5" />,       color: 'bg-sky-50 border-sky-200 text-sky-700' },
  { name: 'TypeScript',      role: 'Type Safety',          icon: <Code2 className="w-5 h-5" />,       color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Vite',            role: 'Build Tool',           icon: <Zap className="w-5 h-5" />,         color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'Tailwind CSS',    role: 'Styling',              icon: <Layers className="w-5 h-5" />,      color: 'bg-teal-50 border-teal-200 text-teal-700' },
  { name: 'Supabase',        role: 'Database & Auth',      icon: <Database className="w-5 h-5" />,    color: 'bg-green-50 border-green-200 text-green-700' },
  { name: 'React Router v7', role: 'Navigation',           icon: <Navigation className="w-5 h-5" />,  color: 'bg-red-50 border-red-200 text-red-700' },
  { name: 'Chart.js',        role: 'Data Visualization',   icon: <BarChart3 className="w-5 h-5" />,   color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { name: 'Express.js',      role: 'Backend Server',       icon: <Server className="w-5 h-5" />,      color: 'bg-gray-50 border-gray-300 text-gray-700' },
];

const nextSteps = [
  { step: 1, action: 'Complete CRM Dashboard modules — finish automation workflows and integrations page.' },
  { step: 2, action: 'Finalize database integration — complete all Supabase RLS policies and REST API endpoints.' },
  { step: 3, action: 'Set up testing suite — configure Vitest, write unit and integration tests for critical paths.' },
  { step: 4, action: 'Performance optimization — code splitting, lazy loading, caching strategies.' },
  { step: 5, action: 'Staging environment deployment — Docker, environment configs, smoke testing.' },
  { step: 6, action: 'UAT with stakeholders — client review, feedback collection, final adjustments.' },
  { step: 7, action: 'Production launch — DNS, SSL, monitoring, go-live checklist.' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Phase['status'] }) {
  if (status === 'complete') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <CheckCircle className="w-3 h-3" /> Complete
      </span>
    );
  }
  if (status === 'in-progress') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
        <Loader2 className="w-3 h-3 animate-spin" /> In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

function ProgressBar({ progress, status }: { progress: number; status: Phase['status'] }) {
  const color =
    status === 'complete'    ? 'bg-emerald-500' :
    status === 'in-progress' ? 'bg-amber-400'   : 'bg-gray-200';

  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-lg font-bold text-[#032d60] uppercase tracking-widest">{children}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#0b5394]/30 to-transparent" />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export function ProjectStatusPage() {
  const generatedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Overall progress: average of all phase progress values
  const overallProgress = Math.round(phases.reduce((sum, p) => sum + p.progress, 0) / phases.length);

  return (
    <div className="min-h-screen bg-white font-sans print:bg-white" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── Print styles injected via style tag ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* ── Header / Hero ── */}
      <header className="bg-gradient-to-br from-[#032d60] via-[#0b5394] to-[#00a3e0] text-white">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            {/* Branding */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-[#00a3e0] text-xs font-semibold uppercase tracking-widest mb-0.5">HYSYS Global Solutions</p>
                <h1 className="text-2xl font-extrabold leading-tight">Project Status Report</h1>
                <p className="text-white/70 text-sm mt-0.5">CRM Web Application</p>
              </div>
            </div>

            {/* Status pill */}
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-sm font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" /> In Progress
              </span>
              <div className="text-right">
                <p className="text-white/60 text-xs">Overall Completion</p>
                <p className="text-3xl font-black text-white">{overallProgress}%</p>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-[#00a3e0] to-emerald-400 transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-5xl mx-auto px-8 py-10 space-y-12">

        {/* ── 1. Project Overview ── */}
        <section>
          <SectionTitle>Project Overview</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Project Name',    value: 'HYSYS CRM Web Application',      icon: <FileCode className="w-4 h-4" /> },
              { label: 'Client',          value: 'HYSYS Global Solutions',          icon: <Building2 className="w-4 h-4" /> },
              { label: 'Project Status',  value: 'In Progress',                     icon: <Loader2 className="w-4 h-4" /> },
              { label: 'Start Date',      value: 'January 2025',                    icon: <Calendar className="w-4 h-4" /> },
              { label: 'Current Phase',   value: 'Phase 4–5 (CRM + DB)',            icon: <GitBranch className="w-4 h-4" /> },
              { label: 'Target Launch',   value: 'Q3 2025',                         icon: <Clock className="w-4 h-4" /> },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-[#0b5394] mb-1">
                  {icon}
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</span>
                </div>
                <p className="text-sm font-semibold text-[#032d60]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Tech Stack ── */}
        <section>
          <SectionTitle>Technology Stack</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map(({ name, role, icon, color }) => (
              <div key={name} className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${color}`}>
                <span className="shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-sm leading-tight">{name}</p>
                  <p className="text-xs opacity-70 leading-tight">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Development Phases ── */}
        <section>
          <SectionTitle>Development Cycle</SectionTitle>
          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.number} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0
                        ${phase.status === 'complete'    ? 'bg-emerald-500' :
                          phase.status === 'in-progress' ? 'bg-amber-400'   : 'bg-gray-300'}`}
                    >
                      {phase.number}
                    </div>
                    <div>
                      <p className="font-semibold text-[#032d60] text-sm leading-tight">Phase {phase.number}: {phase.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {phase.status !== 'pending' && (
                      <span className="text-sm font-bold text-gray-600">{phase.progress}%</span>
                    )}
                    <StatusBadge status={phase.status} />
                  </div>
                </div>
                <ProgressBar progress={phase.progress} status={phase.status} />
              </div>
            ))}
          </div>
        </section>

        {/* ── 4 & 5. Features ── */}
        <section className="grid md:grid-cols-2 gap-8">

          {/* Completed */}
          <div>
            <SectionTitle>Features Completed</SectionTitle>
            <div className="space-y-2">
              {completedFeatures.map(({ name, icon }) => (
                <div key={name} className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-emerald-800 font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div>
            <SectionTitle>Features In Progress</SectionTitle>
            <div className="space-y-2">
              {inProgressFeatures.map(({ name, icon }) => (
                <div key={name} className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5">
                  <Loader2 className="w-4 h-4 text-amber-500 shrink-0 animate-spin" />
                  <span className="text-sm text-amber-800 font-medium">{name}</span>
                </div>
              ))}
            </div>

            {/* Pending reminder */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Upcoming</p>
              {['Unit & Integration Testing', 'E2E Test Suite', 'CI/CD Pipeline', 'Production Deployment'].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Key Metrics ── */}
        <section>
          <SectionTitle>Key Metrics</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Pages Built',        value: '25+',     icon: <Globe className="w-6 h-6" />,    accent: '#0b5394' },
              { label: 'Components Created', value: '40+',     icon: <Layers className="w-6 h-6" />,   accent: '#00a3e0' },
              { label: 'Database Tables',    value: '20+',     icon: <Database className="w-6 h-6" />, accent: '#032d60' },
              { label: 'Lines of Code',      value: '10,000+', icon: <Code2 className="w-6 h-6" />,    accent: '#0b5394' },
            ].map(({ label, value, icon, accent }) => (
              <div
                key={label}
                className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-5"
                  style={{ backgroundColor: accent }}
                />
                <div className="mb-3" style={{ color: accent }}>{icon}</div>
                <p className="text-3xl font-extrabold text-[#032d60]">{value}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Next Steps ── */}
        <section>
          <SectionTitle>Next Steps</SectionTitle>
          <div className="space-y-3">
            {nextSteps.map(({ step, action }) => (
              <div key={step} className="flex items-start gap-4 bg-[#032d60]/[0.03] border border-[#032d60]/10 rounded-xl px-5 py-4">
                <div className="w-7 h-7 rounded-full bg-[#0b5394] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {step}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{action}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-0.5 ml-auto" />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-8 print:mt-4">
        <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0b5394]" />
            <span className="font-semibold text-[#0b5394]">HYSYS Global Solutions</span>
            <span>·</span>
            <span>CRM Web Application — Internal Project Report</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Generated on <strong className="text-gray-500">{generatedDate}</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default ProjectStatusPage;
