import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  Sparkles,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Zap,
  Brain,
  Mail,
  Phone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import { supabase, type Contact, type Activity, type SupportTicket, type Company } from '../lib/supabase';

const dashboardNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Users, label: 'Contacts', path: '/dashboard/crm' },
  { icon: Target, label: 'Leads', path: '/dashboard/leads' },
  { icon: TrendingUp, label: 'Pipeline', path: '/dashboard/pipeline' },
  { icon: Zap, label: 'Automation', path: '/dashboard/automation' },
  { icon: Brain, label: 'AI Tools', path: '/dashboard/ai-tools' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: HelpCircle, label: 'Service', path: '/dashboard/service' },
  { icon: Mail, label: 'Marketing', path: '/dashboard/marketing' },
  { icon: DollarSign, label: 'Commerce', path: '/dashboard/commerce' },
  { icon: ArrowRight, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: CheckCircle, label: 'Data Governance', path: '/dashboard/data-governance' },
  { icon: Settings, label: 'Admin', path: '/dashboard/admin' },
  { icon: Settings, label: 'Account Settings', path: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
];

function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#032d60] text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">CloudForce</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {dashboardNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Demo User</div>
              <div className="text-xs text-white/60 truncate">demo@cloudforce.com</div>
            </div>
            <Link to="/login" className="text-white/60 hover:text-white">
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:border-[#0b5394] focus:ring-1 focus:ring-[#0b5394] outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center font-semibold text-white">
                  JD
                </div>
                <div className="hidden md:block">
                  <div className="font-medium text-gray-900">Demo User</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ contacts: 0, deals: 0, revenue: 0, activities: 0 });
  const [recentActivities, setRecentActivities] = useState<(Activity & { contact?: Contact, company?: Company })[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactsRes, dealsRes, activitiesRes] = await Promise.all([
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('deals').select('*'),
          supabase.from('activities').select('*, contact:contacts(*), company:companies(*)').order('created_at', { ascending: false }).limit(5)
        ]);

        const totalRevenue = dealsRes.data?.reduce((sum, deal) => sum + (deal.stage === 'closed_won' ? deal.amount : 0), 0) || 0;

        setStats({
          contacts: contactsRes.count || 0,
          deals: dealsRes.data?.length || 0,
          revenue: totalRevenue,
          activities: activitiesRes.data?.length || 0
        });

        setRecentActivities(activitiesRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const metrics = [
    { label: 'Total Contacts', value: stats.contacts.toString(), change: '+12%', trend: 'up', icon: Users },
    { label: 'Revenue (Won)', value: `$${(stats.revenue / 1000).toFixed(0)}K`, change: '+8%', trend: 'up', icon: DollarSign },
    { label: 'Active Deals', value: stats.deals.toString(), change: '+24%', trend: 'up', icon: Target },
    { label: 'Activities', value: stats.activities.toString(), change: '-5%', trend: 'down', icon: CheckCircle },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b5394]" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <div className="text-sm text-gray-600">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Stage</h2>
          <div className="h-64 flex items-end gap-2">
            {[35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-[#0b5394] to-[#00a3e0] rounded-t-lg transition-all duration-500 hover:from-cyan-500 hover:to-blue-400"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-gray-500">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'call' && <Phone className="w-4 h-4 text-[#0b5394]" />}
                  {activity.type === 'email' && <Mail className="w-4 h-4 text-[#0b5394]" />}
                  {activity.type === 'meeting' && <Users className="w-4 h-4 text-[#0b5394]" />}
                  {activity.type === 'note' && <FileText className="w-4 h-4 text-[#0b5394]" />}
                  {activity.type === 'task' && <CheckCircle className="w-4 h-4 text-[#0b5394]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{activity.title || activity.type}</p>
                  <p className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CRMPage() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<(Contact & { company: Company | null })[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ first_name: '', last_name: '', email: '', company: '', status: 'lead' as const });

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, company:companies(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addContact(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data: companyData } = await supabase
        .from('companies')
        .select('id')
        .ilike('name', newContact.company)
        .limit(1);

      let companyId = companyData?.[0]?.id || null;

      if (!companyId && newContact.company) {
        const { data: newCompany } = await supabase
          .from('companies')
          .insert({ name: newContact.company })
          .select('id')
          .single();
        companyId = newCompany?.id || null;
      }

      const contactToInsert = {
        first_name: newContact.first_name,
        last_name: newContact.last_name,
        email: newContact.email || null,
        company_id: companyId
      };

      await supabase.from('contacts').insert(contactToInsert);
      setShowAddModal(false);
      setNewContact({ first_name: '', last_name: '', email: '', company: '', status: 'lead' });
      fetchContacts();
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">CRM - Contacts</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Contact</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={newContact.first_name}
                  onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={newContact.last_name}
                  onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Company"
                value={newContact.company}
                onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-3 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60]">
                  Add Contact
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b5394]" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Company</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Value</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white font-semibold">
                        {contact.first_name[0]}{contact.last_name[0]}
                      </div>
                      <span className="font-medium text-gray-900">{contact.first_name} {contact.last_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{contact.company?.name || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.email || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'active' ? 'bg-green-100 text-green-700' :
                      contact.status === 'lead' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {contact.value ? `$${(contact.value / 1000).toFixed(0)}K` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LeadsPage() {
  const leads = [
    { name: 'Amina Okello', company: 'Kampala Foods Group', source: 'Web demo', score: 94, status: 'Qualified', owner: 'Demo User', value: '$82K' },
    { name: 'Daniel Carter', company: 'Northstar Logistics', source: 'Partner referral', score: 87, status: 'Nurturing', owner: 'Sales Ops', value: '$140K' },
    { name: 'Priya Shah', company: 'BrightCare Clinics', source: 'Campaign', score: 76, status: 'New', owner: 'Demo User', value: '$58K' },
    { name: 'Leo Mensah', company: 'Mosaic Retail', source: 'LinkedIn', score: 69, status: 'Working', owner: 'Growth Team', value: '$36K' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-600 mt-1">Capture, score, route, nurture, and convert prospects into opportunities.</p>
        </div>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" /> New Lead
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'New Leads', value: '284', detail: '+18 this week' },
          { label: 'Avg. AI Score', value: '78', detail: 'Priority threshold 70+' },
          { label: 'Conversion Rate', value: '31%', detail: '+6% from last month' },
          { label: 'Open Pipeline', value: '$316K', detail: 'From qualified leads' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600">{item.label}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{item.value}</div>
            <div className="text-xs text-green-600 mt-2">{item.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Lead', 'Source', 'Score', 'Status', 'Value'].map((head) => <th key={head} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">{head}</th>)}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.company} - {lead.owner}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full bg-[#0b5394]" style={{ width: `${lead.score}%` }} /></div>
                      <span className="text-sm font-semibold text-gray-900">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{lead.status}</span></td>
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Routing Rules</h2>
          <div className="space-y-4">
            {['Enterprise leads to senior reps', 'Healthcare leads to industry pod', 'Score over 85 creates hot task', 'Dormant leads enter nurture journey'].map((rule, idx) => (
              <div key={rule} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                <div className="text-sm text-gray-700">{rule}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelinePage() {
  const stages = [
    { name: 'Prospecting', total: '$180K', deals: ['BrightCare expansion', 'Mosaic pilot', 'City Bank renewal'] },
    { name: 'Qualification', total: '$245K', deals: ['Northstar rollout', 'EduPlus CRM'] },
    { name: 'Proposal', total: '$410K', deals: ['Kampala Foods suite', 'Nova Manufacturing'] },
    { name: 'Negotiation', total: '$320K', deals: ['PrimeTel support cloud', 'GreenGrid commerce'] },
    { name: 'Closed Won', total: '$690K', deals: ['Apex Data Cloud', 'Orbit Sales Cloud'] },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-sm text-gray-600 mt-1">Kanban-style opportunity tracking with forecast and next-step visibility.</p>
        </div>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Opportunity
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-4 mb-6">
        {stages.map((stage) => (
          <div key={stage.name} className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-80">
            <div className="p-4 border-b border-gray-100">
              <div className="font-semibold text-gray-900">{stage.name}</div>
              <div className="text-sm text-gray-500">{stage.total} forecast</div>
            </div>
            <div className="p-3 space-y-3">
              {stage.deals.map((deal, idx) => (
                <div key={deal} className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all">
                  <div className="font-medium text-sm text-gray-900">{deal}</div>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{20 + idx * 15}% probability</span>
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {['Forecast Categories', 'Territory Coverage', 'Quota Attainment'].map((title, idx) => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">{title}</h2>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-[#0b5394] to-[#00a3e0]" style={{ width: `${[72, 84, 63][idx]}%` }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{[72, 84, 63][idx]}%</div>
            <p className="text-sm text-gray-500 mt-1">Current quarter health</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationPage() {
  const flows = [
    { name: 'Lead assignment and SLA task', trigger: 'Lead created', status: 'Active', runs: '1,284' },
    { name: 'Quote approval routing', trigger: 'Discount over 15%', status: 'Active', runs: '186' },
    { name: 'Case escalation', trigger: 'High priority idle 2h', status: 'Active', runs: '74' },
    { name: 'Renewal reminder', trigger: 'Contract ends in 60 days', status: 'Paused', runs: '42' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation Builder</h1>
          <p className="text-sm text-gray-600 mt-1">Model workflow rules, approvals, assignments, and scheduled business processes.</p>
        </div>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2">
          <Zap className="w-5 h-5" /> Create Flow
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Flow', 'Trigger', 'Status', 'Runs'].map((head) => <th key={head} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">{head}</th>)}</tr>
            </thead>
            <tbody>
              {flows.map((flow) => (
                <tr key={flow.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{flow.name}</td>
                  <td className="px-6 py-4 text-gray-600">{flow.trigger}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${flow.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{flow.status}</span></td>
                  <td className="px-6 py-4 text-gray-900">{flow.runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Flow Canvas</h2>
          {['Start: record changes', 'Decision: priority or value', 'Action: assign owner', 'Action: send notification', 'End: audit log'].map((step, idx) => (
            <div key={step} className="relative pl-8 pb-5 last:pb-0">
              {idx < 4 && <div className="absolute left-3 top-6 bottom-0 w-px bg-gray-200" />}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#0b5394] text-white text-xs flex items-center justify-center">{idx + 1}</div>
              <div className="text-sm font-medium text-gray-900">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function AIToolsPage() {
  const tools = [
    { name: 'Lead Scoring AI', description: 'Automatically score leads based on engagement and likelihood to convert.', status: 'Active', icon: Target },
    { name: 'Email Assistant', description: 'Generate personalized email content with AI-powered suggestions.', status: 'Active', icon: Mail },
    { name: 'Sales Forecasting', description: 'Predict sales outcomes with machine learning models.', status: 'Active', icon: TrendingUp },
    { name: 'Chatbot Builder', description: 'Create intelligent chatbots for customer support.', status: 'Setup Required', icon: Zap },
    { name: 'Document Analysis', description: 'Extract insights from contracts and documents.', status: 'Setup Required', icon: FileText },
    { name: 'Voice Analytics', description: 'Analyze sales calls for sentiment and key moments.', status: 'Coming Soon', icon: Phone },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          AI Powered
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center">
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                tool.status === 'Active' ? 'bg-green-100 text-green-700' :
                tool.status === 'Setup Required' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {tool.status}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
            <button className="flex items-center gap-2 text-sm font-medium text-[#0b5394] hover:underline">
              {tool.status === 'Active' ? 'Open Tool' : 'Configure'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const data = [
    { label: 'Page Views', value: '45,231', change: '+15%' },
    { label: 'Unique Visitors', value: '12,847', change: '+8%' },
    { label: 'Bounce Rate', value: '32%', change: '-5%' },
    { label: 'Avg. Session', value: '4m 32s', change: '+12%' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-green-600'}`}>
              {item.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Organic Search', value: 45, color: 'bg-[#0b5394]' },
              { source: 'Direct', value: 25, color: 'bg-[#00a3e0]' },
              { source: 'Social Media', value: 18, color: 'bg-green-500' },
              { source: 'Referral', value: 12, color: 'bg-orange-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-600">{item.source}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h2>
          <div className="space-y-3">
            {['/pricing', '/products/sales-cloud', '/customer-stories', '/contact', '/about'].map((page, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{page}</span>
                <span className="text-sm font-medium text-gray-900">{[3421, 2847, 1953, 1234, 987][idx]} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  const reports = [
    { name: 'Sales Performance', type: 'Monthly', lastRun: '2026-06-15', status: 'Ready' },
    { name: 'Lead Conversion', type: 'Weekly', lastRun: '2026-06-18', status: 'Ready' },
    { name: 'Revenue Forecast', type: 'Quarterly', lastRun: '2026-06-01', status: 'Ready' },
    { name: 'Customer Health', type: 'Monthly', lastRun: '2026-06-15', status: 'Processing' },
    { name: 'Team Activity', type: 'Daily', lastRun: '2026-06-19', status: 'Ready' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Report Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Last Run</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{report.name}</td>
                <td className="px-6 py-4 text-gray-600">{report.type}</td>
                <td className="px-6 py-4 text-gray-600">{report.lastRun}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#0b5394] text-sm font-medium hover:underline">
                    {report.status === 'Ready' ? 'View' : 'Cancel'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServiceOperationsPage() {
  const queues = [
    { name: 'Tier 1 Support', open: 38, sla: '94%', wait: '4m' },
    { name: 'Billing', open: 12, sla: '98%', wait: '2m' },
    { name: 'Implementation', open: 18, sla: '89%', wait: '11m' },
    { name: 'Escalations', open: 6, sla: '76%', wait: '18m' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Operations</h1>
          <p className="text-sm text-gray-600 mt-1">Case queues, SLAs, escalation rules, knowledge, and omnichannel support controls.</p>
        </div>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2"><Plus className="w-5 h-5" /> New Case</button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {queues.map((queue) => (
          <div key={queue.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="font-semibold text-gray-900">{queue.name}</div>
            <div className="text-3xl font-bold text-gray-900 mt-3">{queue.open}</div>
            <div className="text-sm text-gray-500">open cases</div>
            <div className="flex items-center justify-between mt-4 text-sm"><span className="text-green-600">SLA {queue.sla}</span><span className="text-gray-500">{queue.wait} wait</span></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Omnichannel Workload</h2>
          {[
            { channel: 'Email-to-case', value: 46 },
            { channel: 'Live chat', value: 28 },
            { channel: 'Phone', value: 18 },
            { channel: 'Customer portal', value: 8 },
          ].map((item) => (
            <div key={item.channel} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-700">{item.channel}</span><span className="font-medium text-gray-900">{item.value}%</span></div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#0b5394]" style={{ width: `${item.value}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Suggestions</h2>
          {['Reset user MFA', 'Resolve invoice dispute', 'Configure lead routing', 'Export customer data'].map((article) => (
            <div key={article} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-700">{article}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketingPage() {
  const journeys = [
    { name: 'New lead nurture', audience: '12,840', conversion: '18%', status: 'Live' },
    { name: 'Renewal expansion', audience: '2,430', conversion: '27%', status: 'Live' },
    { name: 'Webinar follow-up', audience: '864', conversion: '34%', status: 'Live' },
    { name: 'Win-back campaign', audience: '1,120', conversion: '9%', status: 'Draft' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Journeys</h1>
          <p className="text-sm text-gray-600 mt-1">Audience segmentation, campaign orchestration, engagement scoring, and attribution.</p>
        </div>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2"><Mail className="w-5 h-5" /> Build Journey</button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-6">
        {['Email', 'SMS', 'Ads', 'Web'].map((channel, idx) => (
          <div key={channel} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600">{channel} engagement</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{[42, 18, 31, 56][idx]}%</div>
            <div className="text-xs text-green-600 mt-2">+{[5, 2, 7, 4][idx]}% campaign lift</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100"><tr>{['Journey', 'Audience', 'Conversion', 'Status', 'Action'].map((head) => <th key={head} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">{head}</th>)}</tr></thead>
          <tbody>{journeys.map((journey) => (
            <tr key={journey.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{journey.name}</td>
              <td className="px-6 py-4 text-gray-600">{journey.audience}</td>
              <td className="px-6 py-4 text-gray-900">{journey.conversion}</td>
              <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${journey.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{journey.status}</span></td>
              <td className="px-6 py-4"><button className="text-[#0b5394] text-sm font-medium hover:underline">Open</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function CommercePage() {
  const items = [
    { name: 'Revenue Cloud Suite', sku: 'RC-ENT-01', price: '$240/user', stock: 'Active' },
    { name: 'Service Add-on', sku: 'SV-ADD-20', price: '$80/user', stock: 'Active' },
    { name: 'Data Credits', sku: 'DC-100K', price: '$1,200', stock: 'Active' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold text-gray-900">Commerce and Quote-to-Cash</h1><p className="text-sm text-gray-600 mt-1">Products, price books, quotes, contracts, orders, and renewals.</p></div><button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2"><DollarSign className="w-5 h-5" /> New Quote</button></div>
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {['Open Quotes', 'Contract Value', 'Renewals Due'].map((label, idx) => <div key={label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="text-sm text-gray-600">{label}</div><div className="text-2xl font-bold text-gray-900 mt-1">{['32', '$1.8M', '14'][idx]}</div><div className="text-xs text-gray-500 mt-2">Current quarter</div></div>)}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div className="p-5 border-b border-gray-100 font-semibold text-gray-900">Product Catalog</div><table className="w-full"><tbody>{items.map((item) => <tr key={item.sku} className="border-b border-gray-100 last:border-0"><td className="px-5 py-4"><div className="font-medium text-gray-900">{item.name}</div><div className="text-sm text-gray-500">{item.sku}</div></td><td className="px-5 py-4 text-gray-900">{item.price}</td><td className="px-5 py-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">{item.stock}</span></td></tr>)}</tbody></table></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h2 className="font-semibold text-gray-900 mb-4">Approval Path</h2>{['Draft quote', 'Legal terms check', 'Discount approval', 'Customer signature', 'Contract activation'].map((step, idx) => <div key={step} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"><CheckCircle className={`w-5 h-5 ${idx < 2 ? 'text-green-600' : 'text-gray-300'}`} /><span className="text-sm text-gray-700">{step}</span></div>)}</div>
      </div>
    </div>
  );
}

function IntegrationsPage() {
  const integrations = [
    { name: 'Google Workspace', type: 'Calendar and email sync', status: 'Connected' },
    { name: 'Slack', type: 'Deal and case alerts', status: 'Connected' },
    { name: 'Stripe', type: 'Billing events', status: 'Needs auth' },
    { name: 'Data warehouse', type: 'Nightly customer sync', status: 'Connected' },
    { name: 'Telephony', type: 'Call logging', status: 'Setup' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold text-gray-900">Integrations</h1><p className="text-sm text-gray-600 mt-1">Connect external apps, APIs, webhooks, and data streams.</p></div><button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2"><Plus className="w-5 h-5" /> Add Connector</button></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{integrations.map((item) => <div key={item.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-start justify-between mb-4"><div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><ArrowRight className="w-6 h-6 text-[#0b5394]" /></div><span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></div><h3 className="font-semibold text-gray-900">{item.name}</h3><p className="text-sm text-gray-600 mt-2">{item.type}</p><button className="mt-4 text-sm font-medium text-[#0b5394] hover:underline">Configure</button></div>)}</div>
    </div>
  );
}

function DataGovernancePage() {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Data Governance</h1><p className="text-sm text-gray-600 mt-1">Data quality, duplicate management, audit readiness, backups, and retention policies.</p></div>
      <div className="grid lg:grid-cols-4 gap-6 mb-6">{['Duplicate Risk', 'Complete Profiles', 'Retention Rules', 'Audit Events'].map((label, idx) => <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"><div className="text-sm text-gray-600">{label}</div><div className="text-2xl font-bold text-gray-900 mt-1">{['3.2%', '91%', '12', '8,420'][idx]}</div><div className="text-xs text-gray-500 mt-2">Last 30 days</div></div>)}</div>
      <div className="grid lg:grid-cols-2 gap-6"><div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h2 className="font-semibold text-gray-900 mb-4">Data Quality Rules</h2>{['Require company on qualified leads', 'Normalize phone numbers', 'Merge contacts with identical email', 'Block invalid opportunity close dates'].map((rule) => <div key={rule} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"><span className="text-sm text-gray-700">{rule}</span><span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Enabled</span></div>)}</div><div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h2 className="font-semibold text-gray-900 mb-4">Audit Trail</h2>{['Permission set changed', 'Report exported', 'Contact merge completed', 'Integration token rotated'].map((event, idx) => <div key={event} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"><span className="text-sm text-gray-700">{event}</span><span className="text-xs text-gray-500">{idx + 1}h ago</span></div>)}</div></div>
    </div>
  );
}

function AdminPage() {
  const adminAreas = [
    { name: 'Roles and Profiles', detail: 'Control object, record, and field access' },
    { name: 'Custom Objects', detail: 'Define app-specific records and layouts' },
    { name: 'Page Layouts', detail: 'Arrange fields, sections, and actions' },
    { name: 'Validation Rules', detail: 'Protect business-critical data quality' },
    { name: 'SSO and MFA', detail: 'Configure identity and login policies' },
    { name: 'Sandbox Environments', detail: 'Test changes before production rollout' },
  ];

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Platform Admin</h1><p className="text-sm text-gray-600 mt-1">Configure security, metadata, custom objects, layouts, and release controls.</p></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{adminAreas.map((area) => <div key={area.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"><div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4"><Settings className="w-6 h-6 text-[#0b5394]" /></div><h3 className="font-semibold text-gray-900">{area.name}</h3><p className="text-sm text-gray-600 mt-2">{area.detail}</p><button className="mt-4 text-sm font-medium text-[#0b5394] hover:underline">Manage</button></div>)}</div>
    </div>
  );
}
function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white text-2xl font-bold">
                DU
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Photo
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" defaultValue="Demo" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" defaultValue="User" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" defaultValue="demo@cloudforce.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none" />
            </div>
            <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-red-200">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const { data } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
        setTickets(data || []);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <button className="px-4 py-2 bg-[#0b5394] text-white rounded-lg font-medium hover:bg-[#032d60] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Ticket
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Documentation</div>
              <div className="text-sm text-gray-500">Browse guides and docs</div>
            </div>
          </div>
          <Link to="/learning/documentation" className="text-[#0b5394] text-sm font-medium hover:underline">View Docs</Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Email Support</div>
              <div className="text-sm text-gray-500">support@cloudforce.com</div>
            </div>
          </div>
          <a href="mailto:support@cloudforce.com" className="text-[#0b5394] text-sm font-medium hover:underline">Send Email</a>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Phone Support</div>
              <div className="text-sm text-gray-500">+1 (800) 123-4567</div>
            </div>
          </div>
          <a href="tel:+18001234567" className="text-[#0b5394] text-sm font-medium hover:underline">Call Now</a>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b5394]" />
        </div>
      ) : tickets.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Ticket ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Subject</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Priority</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 font-mono text-sm text-[#0b5394]">{ticket.ticket_number}</td>
                  <td className="px-6 py-4 text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
                      ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{new Date(ticket.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No support tickets</h3>
          <p className="text-gray-600">Create a ticket if you need help with anything.</p>
        </div>
      )}
    </div>
  );
}

export { DashboardLayout, DashboardOverview, CRMPage, LeadsPage, PipelinePage, AutomationPage, AIToolsPage, AnalyticsPage, ReportsPage, ServiceOperationsPage, MarketingPage, CommercePage, IntegrationsPage, DataGovernancePage, AdminPage, SettingsPage, SupportPage };






