import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import {
  Home, Users, TrendingUp, Target, BarChart3, Settings,
  LogOut, Search, Bell, ChevronDown, Plus, X, Mail,
  Phone, Building, CheckCircle, ArrowRight, Clock,
  Sparkles, FileText, HelpCircle, Rocket, Import,
  BookOpen, UserPlus,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

/* ── Types ── */
interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  created_at: string;
}

interface Deal {
  id: string;
  name: string;
  amount: number;
  stage: string;
  close_date: string | null;
  created_at: string;
}

interface Task {
  id: string;
  title: string;
  due_date: string | null;
  done: boolean;
  created_at: string;
}

/* ── Nav items ── */
const navItems = [
  { icon: Home,       label: 'Home',         path: '/crm' },
  { icon: Users,      label: 'Contacts',     path: '/crm/contacts' },
  { icon: Target,     label: 'Leads',        path: '/crm/leads' },
  { icon: TrendingUp, label: 'Opportunities',path: '/crm/opportunities' },
  { icon: BarChart3,  label: 'Reports',      path: '/crm/reports' },
  { icon: HelpCircle, label: 'Support',      path: '/crm/support' },
  { icon: Settings,   label: 'Settings',     path: '/crm/settings' },
];

/* ── Layout ── */
export function CRMLayout() {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';
  const lastName  = user?.user_metadata?.last_name  || '';
  const fullName  = lastName ? `${firstName} ${lastName}` : firstName;
  const initials  = lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : firstName[0]?.toUpperCase() || 'U';
  const email = user?.email || '';

  const handleSignOut = async () => { await signOut(); navigate('/login', { replace: true }); };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      {/* Top nav bar — Salesforce-style */}
      <header className="bg-[#032d60] text-white h-12 flex items-center px-4 gap-4 flex-shrink-0 z-40">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <img src="/Mavy%20logo2.png" alt="HYSYS" className="h-8 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                location.pathname === item.path || (item.path !== '/crm' && location.pathname.startsWith(item.path))
                  ? 'bg-white/20 text-white'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search HYSYS..."
              className="pl-8 pr-3 py-1.5 w-48 bg-white/10 border border-white/20 rounded text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20" />
          </div>
          {/* Notifications */}
          <button className="relative text-white/75 hover:text-white">
            <Bell className="w-5 h-5" />
          </button>
          {/* User menu */}
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {initials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-white/60" />
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-semibold text-gray-900 text-sm">{fullName}</div>
                <div className="text-xs text-gray-500 truncate">{email}</div>
              </div>
              <div className="p-1">
                <Link to="/crm/settings" className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 w-full">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

/* ── Home / Overview ── */
export function CRMHome() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState(0);
  const [deals, setDeals] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [checklistDone, setChecklistDone] = useState<Record<string,boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('hysys-crm-checklist') || '{}'); } catch { return {}; }
  });
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('hysys-crm-dismissed') === '1');

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'there';
  const isNew = contacts === 0 && deals === 0;

  const steps = [
    { id: 'profile',  icon: UserPlus,  label: 'Complete your profile',      path: '/crm/settings' },
    { id: 'contact',  icon: Users,     label: 'Add your first contact',      path: '/crm/contacts' },
    { id: 'lead',     icon: Target,    label: 'Create your first lead',      path: '/crm/leads' },
    { id: 'deal',     icon: TrendingUp,label: 'Create your first opportunity',path: '/crm/opportunities' },
    { id: 'import',   icon: Import,    label: 'Import existing data',        path: '/crm/contacts' },
    { id: 'explore',  icon: BookOpen,  label: 'Explore reporting',           path: '/crm/reports' },
  ];
  const doneCount = steps.filter(s => checklistDone[s.id]).length;

  const toggle = (id: string) => {
    const next = { ...checklistDone, [id]: !checklistDone[id] };
    setChecklistDone(next);
    localStorage.setItem('hysys-crm-checklist', JSON.stringify(next));
  };
  const dismiss = () => { setDismissed(true); localStorage.setItem('hysys-crm-dismissed', '1'); };

  useEffect(() => {
    Promise.all([
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('deals').select('*', { count: 'exact', head: true }),
      supabase.from('activities').select('*').eq('type','task').limit(5).order('created_at', { ascending: false }),
    ]).then(([c, d, t]) => {
      setContacts(c.count || 0);
      setDeals(d.count || 0);
      setTasks((t.data || []).map((a: any) => ({ id: a.id, title: a.title || 'Task', due_date: a.due_date, done: a.status === 'completed', created_at: a.created_at })));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#032d60]">
          {isNew ? `Welcome to HYSYS CRM, ${firstName}!` : `Good day, ${firstName}`}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isNew ? "Let's set up your workspace. Follow the steps below to get started." : "Here's your workspace overview."}
        </p>
      </div>

      {/* Setup assistant */}
      {!dismissed && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#032d60] to-[#0b5394] px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h2 className="text-white font-bold text-base">Setup Assistant</h2>
                <p className="text-white/70 text-xs mt-0.5">{doneCount} of {steps.length} steps complete</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-extrabold text-cyan-300">{Math.round((doneCount/steps.length)*100)}%</div>
                <div className="text-white/50 text-xs">complete</div>
              </div>
              <button onClick={dismiss} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="px-6 py-1 bg-gray-50">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#0b5394] rounded-full transition-all duration-500"
                style={{ width: `${(doneCount/steps.length)*100}%` }} />
            </div>
          </div>
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map(step => (
              <div key={step.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  checklistDone[step.id] ? 'bg-green-50 border-green-200 opacity-70' : 'bg-white border-gray-200 hover:border-[#0b5394] hover:shadow-sm'
                }`}
                onClick={() => toggle(step.id)}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  checklistDone[step.id] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {checklistDone[step.id] && <CheckCircle className="w-4 h-4 text-white fill-white" />}
                </div>
                <Link to={step.path} onClick={e => e.stopPropagation()}
                  className={`text-sm font-medium flex-1 ${checklistDone[step.id] ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {step.label}
                </Link>
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </div>
            ))}
          </div>
          {doneCount === steps.length && (
            <div className="px-6 pb-5 flex items-center gap-2 text-green-600 font-semibold text-sm">
              <Sparkles className="w-4 h-4" /> You're all set! Your CRM workspace is ready.
            </div>
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Contacts', value: contacts, icon: Users, path: '/crm/contacts', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Open Deals', value: deals, icon: TrendingUp, path: '/crm/opportunities', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Today's Tasks", value: tasks.filter(t => !t.done).length, icon: CheckCircle, path: '/crm/contacts', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Reports', value: 5, icon: BarChart3, path: '/crm/reports', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s) => (
          <Link key={s.label} to={s.path}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{loading ? '—' : s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Tasks + Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Today's Tasks</h2>
            <Link to="/crm/contacts" className="text-xs text-[#0b5394] font-medium hover:underline">View all</Link>
          </div>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <Clock className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm text-gray-500 font-medium">No tasks yet</p>
              <p className="text-xs text-gray-400 mt-1">Tasks you create will appear here</p>
            </div>
          ) : tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                {task.done && <CheckCircle className="w-full h-full text-white fill-white" />}
              </div>
              <span className={`text-sm flex-1 ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</span>
              {task.due_date && <span className="text-xs text-gray-400">{new Date(task.due_date).toLocaleDateString()}</span>}
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { icon: UserPlus, label: 'New Contact',     path: '/crm/contacts',     color: 'bg-blue-50 text-blue-600' },
              { icon: Target,   label: 'New Lead',         path: '/crm/leads',        color: 'bg-yellow-50 text-yellow-600' },
              { icon: TrendingUp,label:'New Opportunity',  path: '/crm/opportunities',color: 'bg-emerald-50 text-emerald-600' },
              { icon: FileText, label: 'New Report',       path: '/crm/reports',      color: 'bg-purple-50 text-purple-600' },
              { icon: Mail,     label: 'Contact Support',  path: '/crm/support',      color: 'bg-orange-50 text-orange-600' },
            ].map(a => (
              <Link key={a.label} to={a.path}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{a.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Contacts Page ── */
export function CRMContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', company: '' });

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('contacts').insert({ ...form, owner_id: user?.id, status: 'lead' });
    setShowAdd(false);
    setForm({ first_name: '', last_name: '', email: '', phone: '', company: '' });
    fetch();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#032d60]">Contacts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your customer and prospect contacts</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60] transition-colors">
          <Plus className="w-4 h-4" /> New Contact
        </button>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">New Contact</h2>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">First Name *</label>
                  <input required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Last Name *</label>
                  <input required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Phone</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Company</label>
                <input value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">Save Contact</button>
                <button type="button" onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table or empty state */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-[#0b5394] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[#0b5394]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">Add your first contact to start building relationships and tracking customer data.</p>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
              <Plus className="w-4 h-4" /> Add your first contact
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{['Name','Company','Email','Phone','Status','Created'].map(h =>
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white text-xs font-bold">
                        {c.first_name[0]}{c.last_name[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{c.first_name} {c.last_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{(c as any).company || '—'}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{c.email || '—'}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{c.phone || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ── Leads Page ── */
export function CRMLeads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', company: '', email: '', phone: '' });

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('leads').insert({ ...form, owner_id: user?.id, status: 'New', company: form.company });
    setShowAdd(false);
    setForm({ first_name: '', last_name: '', company: '', email: '', phone: '' });
    fetch();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#032d60]">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and qualify your incoming prospects</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
          <Plus className="w-4 h-4" /> New Lead
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">New Lead</h2>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">First Name *</label>
                  <input required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Last Name *</label>
                  <input required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Company *</label>
                <input required value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">Save Lead</button>
                <button type="button" onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48"><div className="w-8 h-8 border-2 border-[#0b5394] border-t-transparent rounded-full animate-spin" /></div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">Create leads to track potential customers before they become contacts.</p>
            <button onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
              <Plus className="w-4 h-4" /> Create your first lead
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>{['Name','Company','Email','Status','Source','Created'].map(h =>
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{l.first_name} {l.last_name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{l.company}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{l.email || '—'}</td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{l.status || 'New'}</span></td>
                  <td className="px-5 py-3 text-sm text-gray-500">{l.lead_source || '—'}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ── Opportunities Page ── */
const STAGES = ['Prospecting','Qualification','Proposal','Negotiation','Closed Won','Closed Lost'];

export function CRMOpportunities() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', amount: '', stage: 'Prospecting', close_date: '' });

  const fetchDeals = async () => {
    setLoading(true);
    const { data } = await supabase.from('deals').select('*').order('created_at', { ascending: false });
    setDeals(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchDeals(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('deals').insert({
      name: form.name, amount: parseFloat(form.amount) || 0,
      stage: form.stage, close_date: form.close_date || null, owner_id: user?.id,
    });
    setShowAdd(false);
    setForm({ name: '', amount: '', stage: 'Prospecting', close_date: '' });
    fetchDeals();
  };

  const byStage = STAGES.slice(0,4).map(s => ({ stage: s, items: deals.filter(d => d.stage === s) }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#032d60]">Opportunities</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track deals through your sales pipeline</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
          <Plus className="w-4 h-4" /> New Opportunity
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">New Opportunity</h2>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Opportunity Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Amount (USD)</label>
                  <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Close Date</label>
                  <input type="date" value={form.close_date} onChange={e => setForm({...form, close_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Stage</label>
                <select value={form.stage} onChange={e => setForm({...form, stage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none">
                  {STAGES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">Save</button>
                <button type="button" onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48"><div className="w-8 h-8 border-2 border-[#0b5394] border-t-transparent rounded-full animate-spin" /></div>
      ) : deals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center py-20 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No opportunities yet</h3>
          <p className="text-gray-500 text-sm max-w-xs mb-6">Create your first opportunity to start tracking deals through your pipeline.</p>
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
            <Plus className="w-4 h-4" /> Create your first opportunity
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {byStage.map(col => (
            <div key={col.stage} className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-semibold text-gray-900 text-sm">{col.stage}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {col.items.length} deal{col.items.length !== 1 ? 's' : ''} ·{' '}
                  ${col.items.reduce((s, d) => s + (d.amount || 0), 0).toLocaleString()}
                </div>
              </div>
              <div className="p-3 space-y-2 min-h-32">
                {col.items.map(d => (
                  <div key={d.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                    <div className="text-sm font-medium text-gray-900">{d.name}</div>
                    <div className="text-xs text-gray-500 mt-1">${(d.amount || 0).toLocaleString()}</div>
                    {d.close_date && <div className="text-xs text-gray-400 mt-1">Closes {new Date(d.close_date).toLocaleDateString()}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Reports Page ── */
export function CRMReports() {
  const reports = [
    { name: 'My Contacts', type: 'Contacts', updated: 'Today' },
    { name: 'My Open Leads', type: 'Leads', updated: 'Today' },
    { name: 'My Opportunities', type: 'Opportunities', updated: 'Today' },
    { name: 'Closed Won This Month', type: 'Opportunities', updated: 'Today' },
    { name: 'Activities This Week', type: 'Activities', updated: 'Today' },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#032d60]">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Analyse your data with built-in reports</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">
          <Plus className="w-4 h-4" /> New Report
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>{['Report Name','Type','Last Updated','Action'].map(h =>
              <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {reports.map((r,i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-medium text-gray-900">{r.name}</td>
                <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">{r.type}</span></td>
                <td className="px-5 py-3 text-sm text-gray-500">{r.updated}</td>
                <td className="px-5 py-3">
                  <button className="text-[#0b5394] text-sm font-medium hover:underline">Run</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Support Page ── */
export function CRMSupport() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-[#032d60] mb-2">Help & Support</h1>
      <p className="text-gray-500 text-sm mb-8">Get help with your HYSYS CRM workspace</p>
      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {[
          { icon: BookOpen, title: 'Documentation', desc: 'Browse guides and tutorials', link: '/learning', color: 'bg-blue-50 text-blue-600' },
          { icon: Mail,     title: 'Email Support',  desc: 'info@hysysglobal.com',       link: 'mailto:info@hysysglobal.com', color: 'bg-green-50 text-green-600' },
          { icon: Phone,    title: 'Phone Support',  desc: '0782-602854',                link: 'tel:+256782602854',           color: 'bg-orange-50 text-orange-600' },
        ].map(c => (
          <a key={c.title} href={c.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mb-4`}>
              <c.icon className="w-6 h-6" />
            </div>
            <div className="font-semibold text-gray-900 mb-1">{c.title}</div>
            <div className="text-sm text-gray-500">{c.desc}</div>
          </a>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        {[
          { q: 'How do I import contacts?', a: 'Go to Contacts → use the Import button to upload a CSV file.' },
          { q: 'How do I create a report?', a: 'Go to Reports → click New Report and choose a report type.' },
          { q: 'Can I invite team members?', a: 'Contact our support team to add additional users to your workspace.' },
          { q: 'How do I convert a lead to a contact?', a: 'Open a lead record and click the Convert button to create a contact and opportunity.' },
        ].map((item, i) => (
          <div key={i} className="py-4 border-b border-gray-100 last:border-0">
            <div className="font-medium text-gray-900 text-sm mb-1">{item.q}</div>
            <div className="text-sm text-gray-500">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Settings Page ── */
export function CRMSettings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName:  user?.user_metadata?.last_name  || '',
    company:   user?.user_metadata?.company    || '',
    email:     user?.email || '',
  });
  const initials = form.firstName && form.lastName
    ? `${form.firstName[0]}${form.lastName[0]}`.toUpperCase()
    : (user?.email?.[0] || 'U').toUpperCase();

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.updateUser({ data: { first_name: form.firstName, last_name: form.lastName, company: form.company } });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-[#032d60] mb-6">Account Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-5">My Profile</h2>
        <form onSubmit={save} className="space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white text-xl font-bold">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{form.firstName} {form.lastName}</div>
              <div className="text-sm text-gray-500">{form.email}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">First Name</label>
              <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1.5 block">Last Name</label>
              <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Company</label>
            <input value={form.company} onChange={e => setForm({...form, company: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b5394] outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Email</label>
            <input value={form.email} disabled
              className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-400 cursor-not-allowed" />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className="px-5 py-2.5 bg-[#0b5394] text-white rounded-lg text-sm font-semibold hover:bg-[#032d60]">Save Changes</button>
            {saved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved!</span>}
          </div>
        </form>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data.</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">Delete Account</button>
      </div>
    </div>
  );
}
