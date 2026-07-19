import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Globe, RefreshCw, Eye, ExternalLink, Upload, Settings2,
  LayoutDashboard, Palette, Image, MessageSquare, Clock,
  Home, Info, Package, Building2, CreditCard, Phone, BookOpen, Menu,
  Sparkles, Zap, CheckCircle2, TrendingUp, Activity, Layers,
  Server, HardDrive, Newspaper, HelpCircle, Handshake, FileText, Users, Briefcase, CalendarCheck, Mail,
} from 'lucide-react';
import { useAdminContent } from '../../hooks/useSiteContent';
import { supabase } from '../../lib/db/supabase';
import { DesignManager } from '../../components/cms/DesignManager';
import { MediaLibrary } from '../../components/cms/MediaLibrary';
import { LivePreview } from '../../components/cms/LivePreview';
import { SectionEditor } from '../../components/cms/SectionEditor';
import { SubmissionsManager } from './SubmissionsManager';

type Tab = 'dashboard' | 'content' | 'design' | 'media' | 'submissions';

const SECTIONS = [
  { id: 'homepage',   label: 'Homepage',         icon: Home,       desc: 'Hero, stats, products' },
  { id: 'navigation', label: 'Navigation',       icon: Menu,       desc: 'Menu labels & links' },
  { id: 'about',      label: 'About Us',         icon: Info,       desc: 'Mission, team, values' },
  { id: 'products',   label: 'Products',         icon: Package,    desc: 'Product catalog' },
  { id: 'industries', label: 'Solutions',       icon: Building2,  desc: 'Solutions page & industry cards' },
  { id: 'stories',    label: 'Customer Stories', icon: BookOpen,   desc: 'Case studies' },
  { id: 'events',     label: 'Events',           icon: CreditCard, desc: 'Upcoming events & FAQs' },
  { id: 'contact',    label: 'Contact',          icon: Phone,      desc: 'Contact info & form' },
  { id: 'demo_request', label: 'Demo Request',   icon: CalendarCheck, desc: 'Request a demo form' },
  { id: 'documentation', label: 'Documentation', icon: BookOpen,   desc: 'Guides & doc categories' },
  { id: 'pricing',       label: 'Pricing',          icon: TrendingUp, desc: 'Plans, tiers & pricing FAQs' },
  { id: 'resources',     label: 'Resources Hub',    icon: Layers,     desc: 'Blog, guides, FAQs hub' },
  { id: 'blog',          label: 'Blog',             icon: Newspaper,  desc: 'Blog posts & articles' },
  { id: 'guides',        label: 'Guides',           icon: BookOpen,   desc: 'Whitepapers & downloads' },
  { id: 'faq_page',      label: 'FAQs Page',        icon: HelpCircle, desc: 'Full FAQ page content' },
  { id: 'company',       label: 'Company Hub',      icon: Building2,  desc: 'Company landing & stats' },
  { id: 'partners',      label: 'Partners',         icon: Handshake,  desc: 'Partner programmes' },
  { id: 'partner_apply', label: 'Partner Apply',    icon: Handshake,  desc: 'Partner application form' },
  { id: 'careers',       label: 'Careers',          icon: Briefcase,  desc: 'Jobs & culture' },
  { id: 'team',          label: 'Team',             icon: Users,      desc: 'Leadership page header' },
  { id: 'legal',         label: 'Legal Pages',      icon: FileText,   desc: 'Privacy, terms & cookies heroes' },
  { id: 'global',     label: 'Site-wide',        icon: Settings2,  desc: 'Footer, FAQ, support' },
];

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard; desc: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Site overview & stats' },
  { id: 'content',   label: 'Content', icon: Globe, desc: 'Edit page content' },
  { id: 'submissions', label: 'Submissions', icon: Mail, desc: 'Demo, contact & partner leads' },
  { id: 'design',    label: 'Design', icon: Palette, desc: 'Customize appearance' },
  { id: 'media',     label: 'Media', icon: Image, desc: 'Upload & manage files' },
];

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-10 h-10 border-[3px] border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 w-10 h-10 border-[3px] border-[var(--color-accent)] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, gradient }: {
  icon: typeof Globe; label: string; value: string | number; sub?: string; gradient?: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none"
        style={{ backgroundImage: gradient || 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">{label}</span>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${gradient ? 'var(--color-primary)' : 'var(--color-primary)'}12, ${gradient ? 'var(--color-accent)' : 'var(--color-accent)'}08)` }}>
            <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1.5 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

function DashboardTab({ onOpenSubmissions }: { onOpenSubmissions: () => void }) {
  const [stats, setStats] = useState({
    sections: 0,
    fields: 0,
    mediaCount: 0,
    storageUsed: '0 MB',
    messages: 0,
    lastUpdated: 'Never',
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      try {
        const [contentRes, mediaRes, messagesRes] = await Promise.all([
          supabase.from('site_content').select('section, updated_at', { count: 'exact', head: false }),
          supabase.from('media_library').select('id, file_size', { count: 'exact' }),
          supabase.from('contact_submissions').select('id', { count: 'exact' }),
        ]);

        const sections = new Set(contentRes.data?.map(r => r.section) || []);
        const totalSize = (mediaRes.data as { file_size: number }[] | undefined)?.reduce((acc, m) => acc + (m.file_size || 0), 0) || 0;
        const sizeMB = (totalSize / (1024 * 1024)).toFixed(1);

        const dates = contentRes.data?.map(r => r.updated_at).filter(Boolean) as string[] || [];
        const lastUpd = dates.length > 0 ? new Date(Math.max(...dates.map(d => new Date(d).getTime()))).toLocaleDateString() : 'Never';

        setStats({
          sections: sections.size,
          fields: contentRes.count || 0,
          mediaCount: mediaRes.count || 0,
          storageUsed: `${sizeMB} MB`,
          messages: messagesRes.count || 0,
          lastUpdated: lastUpd,
        });
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <LoadingScreen />;

  const QUICK_ACTIONS = [
    { label: 'Edit Homepage', tab: 'content' as Tab, section: 'homepage', icon: Globe, desc: 'Update hero, features & more' },
    { label: 'Upload Media', tab: 'media' as Tab, section: undefined, icon: Upload, desc: 'Images, videos & documents' },
    { label: 'Customize Design', tab: 'design' as Tab, section: undefined, icon: Palette, desc: 'Colors, fonts & layout' },
    { label: 'View Live Site', tab: undefined, section: undefined, icon: ExternalLink, href: '/', desc: 'Open in new tab' },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] p-6 sm:p-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white/[0.03]" />
        </div>
        <div className="relative flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/80 text-[11px] font-medium mb-3">
              <Sparkles className="w-3 h-3" /> Site Manager
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{greeting}, Admin</h2>
            <p className="text-sm text-white/70 mt-1 max-w-md">Here&apos;s what&apos;s happening with your site today.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Activity className="w-4 h-4 text-green-300" />
            <span className="text-xs text-white/80 font-medium">All systems active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Globe} label="Content Sections" value={stats.sections} sub={`${stats.fields} total fields`} gradient="linear-gradient(135deg, var(--color-primary), #6366f1)" />
        <StatCard icon={Image} label="Media Files" value={stats.mediaCount} sub={`${stats.storageUsed} used`} gradient="linear-gradient(135deg, #8b5cf6, #ec4899)" />
        <button type="button" onClick={onOpenSubmissions} className="text-left">
          <StatCard icon={MessageSquare} label="Form Submissions" value={stats.messages} sub="Demo, contact & partner" gradient="linear-gradient(135deg, #06b6d4, #10b981)" />
        </button>
        <StatCard icon={Clock} label="Last Updated" value={stats.lastUpdated} gradient="linear-gradient(135deg, #f59e0b, #ef4444)" />
        <StatCard icon={HardDrive} label="Storage" value={stats.storageUsed} sub="Across all media" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)" />
        <StatCard icon={Server} label="Site Status" value="Live" sub="All systems operational" gradient="linear-gradient(135deg, #10b981, #06b6d4)" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]/70 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-xs text-gray-400">Common tasks to manage your site</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) =>
              action.href ? (
                <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-4 py-3.5 bg-gray-50/80 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <action.icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{action.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{action.desc}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </a>
              ) : (
                <div key={action.label}
                  className="group relative flex items-center gap-3 px-4 py-3.5 bg-gray-50/80 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 cursor-pointer overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <action.icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{action.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{action.desc}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Website Status</h3>
              <p className="text-xs text-gray-400">Health overview of your site</p>
            </div>
          </div>
          <div className="space-y-1">
            {[
              { label: 'Content', status: stats.sections > 0, detail: `${stats.sections} sections published`, icon: Globe },
              { label: 'Media', status: stats.mediaCount > 0, detail: `${stats.mediaCount} files uploaded`, icon: Image },
              { label: 'Design', status: true, detail: 'Custom theme applied', icon: Palette },
              { label: 'Contact Form', status: true, detail: `${stats.messages} messages received`, icon: MessageSquare },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-gray-300'}`} />
                  <item.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{item.detail}</span>
                  {item.status && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentTab() {
  const [activeSection, setActiveSection] = useState('homepage');
  const [showPreview, setShowPreview] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { refreshSection } = useAdminContent();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshSection(activeSection);
    setTimeout(() => setRefreshing(false), 400);
  };

  const activeSectionMeta = SECTIONS.find(s => s.id === activeSection);
  const SectionIcon = activeSectionMeta?.icon || Globe;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 mb-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-white/[0.03]" />
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <SectionIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{activeSectionMeta?.label || 'Content'} Editor</h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-md">Live Edit</span>
              </div>
              <p className="text-sm text-white/60 mt-0.5">Edit content for this page section</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                showPreview
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm'
              }`}>
              <Eye className="w-3.5 h-3.5" /> {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleRefresh} disabled={refreshing}
              className="px-3.5 py-2 text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 rounded-xl backdrop-blur-sm flex items-center gap-1.5 disabled:opacity-50 transition-all duration-200">
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-[0.1em]">Page Sections</h2>
              </div>
            </div>
            <nav className="p-2.5 space-y-1">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button key={section.id} onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 group ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    style={isActive ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' } : {}}>
                    <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="flex-1 font-medium">{section.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    )}
                  </button>
                );
              })}
            </nav>
            <div className="px-3 pb-3">
              <p className="text-[10px] text-gray-400 leading-relaxed px-1">
                {SECTIONS.find((s) => s.id === activeSection)?.desc}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100/60">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-blue-800 mb-1">Instant Save</p>
                <p className="text-[11px] text-blue-600/80 leading-relaxed">
                  Each field saves immediately when you edit it. Use <strong>Publish</strong> to snapshot a version you can restore later.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {showPreview ? (
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <LivePreview section={activeSection} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                  <span className="text-xs font-medium text-gray-500">Editing: <span className="text-gray-700 font-semibold">{activeSectionMeta?.label}</span></span>
                </div>
              </div>
              <div className="p-6">
                <SectionEditor section={activeSection} onRefresh={handleRefresh} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContentManagerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: Tab = tabParam === 'submissions' || tabParam === 'content' || tabParam === 'design' || tabParam === 'media'
    ? tabParam
    : 'dashboard';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [unreadSubmissions, setUnreadSubmissions] = useState(0);

  useEffect(() => {
    if (tabParam === 'submissions' || tabParam === 'content' || tabParam === 'design' || tabParam === 'media') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    async function loadUnread() {
      if (!supabase) return;
      const { count } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);
      setUnreadSubmissions(count || 0);
    }
    loadUnread();
  }, [activeTab]);

  const setTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      searchParams.delete('tab');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Site Content Manager</h1>
              <p className="text-sm text-gray-400 mt-0.5">Manage your website content, design, and media.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2.5 ${
                activeTab === tab.id
                  ? 'text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' } : {}}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'submissions' && unreadSubmissions > 0 && (
                <span className={`min-w-[1.25rem] px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[var(--color-primary)] text-white'
                }`}>
                  {unreadSubmissions}
                </span>
              )}
              {idx < TABS.length - 1 && activeTab !== tab.id && activeTab !== TABS[idx + 1]?.id && (
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-200" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'dashboard' && <DashboardTab onOpenSubmissions={() => setTab('submissions')} />}
      {activeTab === 'content' && <ContentTab />}
      {activeTab === 'submissions' && <SubmissionsManager onUnreadChange={setUnreadSubmissions} />}
      {activeTab === 'design' && <DesignManager />}
      {activeTab === 'media' && <MediaLibrary />}
    </div>
  );
}
