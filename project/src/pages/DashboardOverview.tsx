import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RefreshCw, ChevronDown, TrendingUp, TrendingDown,
  Users, Target, DollarSign, BarChart3, UserPlus,
  Maximize2,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend, Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

/* ── Palette ── */
const BLUE   = '#0070D2';
const BLUE2  = '#1589EE';
const PURPLE = '#9C63F9';
const GREEN  = '#4BC076';
const TEAL   = '#06A59A';
const ORANGE = '#FFB75D';
const PINK   = '#F8546C';

/* ── Static mock data ── */
const STAGE_LABELS  = ['Prospecting','Qualification','Needs Analysis','Value Proposition','Proposal/Price','Negotiation'];
const STAGE_AMOUNTS = [675, 300, 270, 370, 385, 100];
const STAGE_COLORS  = [BLUE, BLUE2, PURPLE, TEAL, GREEN, ORANGE];

const REGION_LABELS  = ['East Africa','West Africa','Central','Southern'];
const REGION_DATA    = [3700, 460, 695, 390];
const REGION_COLORS  = [BLUE, PURPLE, ORANGE, TEAL];

const SOURCE_LABELS  = ['Web','Phone Inquiry','Partner Referral','Purchased List','Employee Referral','External Referral'];
const SOURCE_CLOSED  = [160, 790, 540, 75, 350, 200];
const SOURCE_OPEN    = [120, 300, 200, 50, 150, 100];

const ACCOUNT_LABELS = ['Express Logist.','GamePoint','Grand Hotels','United Oil','University of Art','Other'];
const ACCOUNT_DATA   = [75, 125, 135, 90, 45, 630];
const ACCOUNT_COLORS = [BLUE, PURPLE, GREEN, TEAL, ORANGE, '#CBD5E1'];

const QUARTERS = ['Q1-2024','Q2-2024','Q3-2024','Q4-2024'];
const Q_VALUES = [1600, 945, 1100, 885];

/* ── Shared chart defaults ── */
const baseBar = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#6B7280' } },
    y: { grid: { color: '#F3F4F6' }, ticks: { font: { size: 10 }, color: '#6B7280', callback: (v: any) => `${v}M` } },
  },
};

const baseDoughnut = {
  responsive: true, maintainAspectRatio: false, cutout: '65%',
  plugins: { legend: { position: 'right' as const, labels: { font: { size: 10 }, boxWidth: 10, padding: 8, color: '#374151' } }, tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } } },
};

/* ── Card wrapper ── */
function Card({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      <div className="flex items-start justify-between px-4 pt-4 pb-2 border-b border-gray-100 shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <Maximize2 className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500 cursor-pointer mt-0.5" />
      </div>
      <div className="flex-1 flex flex-col px-4 pb-4 pt-3">{children}</div>
      {link && (
        <div className="px-4 pb-3">
          <Link to={link} className="text-xs text-[#0070D2] hover:underline">{`View Report ›`}</Link>
        </div>
      )}
    </div>
  );
}

/* ── Funnel chart (CSS-based) ── */
function FunnelChart() {
  const max = Math.max(...STAGE_AMOUNTS);
  return (
    <div className="flex-1 flex items-center gap-4">
      <div className="flex-1 space-y-1.5">
        {STAGE_LABELS.map((label, i) => {
          const pct = Math.round((STAGE_AMOUNTS[i] / max) * 100);
          return (
            <div key={label} className="flex items-center gap-2">
              <div className="flex justify-center" style={{ width: '100%' }}>
                <div
                  className="h-7 rounded flex items-center justify-center text-white text-[10px] font-bold transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: STAGE_COLORS[i], minWidth: 60 }}
                >
                  UGX {STAGE_AMOUNTS[i]}M
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="shrink-0 space-y-1.5">
        {STAGE_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5 h-7">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: STAGE_COLORS[i] }} />
            <span className="text-[10px] text-gray-600 whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardOverview() {
  const [timeframe, setTimeframe] = useState('This Quarter');
  const [region,    setRegion]    = useState('All');
  const [refreshing,setRefreshing]= useState(false);
  const [lastRefresh,setLastRefresh] = useState(new Date());
  const [stats, setStats] = useState({ contacts: 0, deals: 0, revenue: 0 });
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Admin';

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setRefreshing(true);
    try {
      const [cRes, dRes] = await Promise.all([
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('deals').select('amount, stage'),
      ]);
      const rev = dRes.data?.reduce((s, d) => s + (d.stage === 'closed_won' ? (d.amount || 0) : 0), 0) || 0;
      setStats({ contacts: cRes.count || 0, deals: dRes.data?.length || 0, revenue: rev });
      setLastRefresh(new Date());
    } catch (e) { console.error(e); }
    finally { setRefreshing(false); }
  }

  const refreshStr = lastRefresh.toLocaleString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });

  /* Chart data */
  const quarterData = {
    labels: QUARTERS,
    datasets: [{ label: 'Sales', data: Q_VALUES, backgroundColor: BLUE, borderRadius: 3, barThickness: 28 }],
  };

  const sourceData = {
    labels: SOURCE_LABELS,
    datasets: [
      { label: 'Closed Won', data: SOURCE_CLOSED, backgroundColor: BLUE,   borderRadius: 3, barThickness: 14 },
      { label: 'Open',       data: SOURCE_OPEN,   backgroundColor: BLUE2,  borderRadius: 3, barThickness: 14 },
    ],
  };

  const regionData = {
    labels: REGION_LABELS,
    datasets: [{ data: REGION_DATA, backgroundColor: REGION_COLORS, borderWidth: 2, borderColor: '#fff' }],
  };

  const accountData = {
    labels: ACCOUNT_LABELS,
    datasets: [{ data: ACCOUNT_DATA, backgroundColor: ACCOUNT_COLORS, borderWidth: 2, borderColor: '#fff' }],
  };

  const sourceBarOpts = {
    ...baseBar,
    plugins: {
      ...baseBar.plugins,
      legend: { display: true, position: 'top' as const, labels: { font: { size: 10 }, boxWidth: 10, color: '#374151' } },
      tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } },
    },
  };

  return (
    <div className="space-y-0 bg-[#F3F4F6] -m-6">

      {/* ── Sub-header bar (mimics SF dashboard header) ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Dashboard</p>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Sales Team Dream Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track past and future sales by amount, close date, status, region, and lead source.
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              As of {refreshStr} · Viewing as <span className="font-medium text-gray-600">{firstName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select value={timeframe} onChange={e => setTimeframe(e.target.value)}
                className="appearance-none text-xs font-medium pl-2.5 pr-6 py-1.5 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0070D2]/30 cursor-pointer">
                {['This Quarter','Last Quarter','This Year','Last 30 Days'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={region} onChange={e => setRegion(e.target.value)}
                className="appearance-none text-xs font-medium pl-2.5 pr-6 py-1.5 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0070D2]/30 cursor-pointer">
                {['All','East Africa','West Africa','Central Africa'].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            <button onClick={loadData} disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-60">
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">Edit</button>
            <button className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">Subscribe</button>
            <Link to="/dashboard/leads"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#0070D2] text-white rounded hover:bg-[#005FB2] transition-all shadow-sm">
              <UserPlus className="w-3.5 h-3.5" /> + New Lead
            </Link>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="p-4 space-y-4">

        {/* ROW 1: Sales by Quarter | Funnel | Big Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Sales by Quarter — horizontal bar */}
          <Card title="Sales by Quarter" subtitle="Sum of Amount" link="/dashboard/reports">
            <div style={{ height: 200 }}>
              <Bar
                data={quarterData}
                options={{
                  ...baseBar,
                  indexAxis: 'y' as const,
                  scales: {
                    x: { grid: { color: '#F3F4F6' }, ticks: { font: { size: 10 }, color: '#6B7280', callback: (v: any) => `UGX ${v}M` } },
                    y: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#374151' } },
                  },
                  plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } } },
                }}
              />
            </div>
          </Card>

          {/* Potential Sales by Stage — funnel */}
          <Card title="Potential Sales by Stage" subtitle={`Sum of Amount: UGX 2.1B`} link="/dashboard/pipeline">
            <FunnelChart />
          </Card>

          {/* Big KPI numbers */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded border border-gray-200 shadow-sm p-5 flex-1">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-gray-500 font-medium">Total Sales</p>
                <Maximize2 className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <p className="text-5xl font-extrabold text-gray-900 tracking-tight leading-none mt-2">UGX 3.6B</p>
              <div className="flex items-center gap-1.5 mt-3">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">+14% vs last quarter</span>
              </div>
              <Link to="/dashboard/reports" className="text-xs text-[#0070D2] hover:underline mt-2 block">
                View Report (Closed Won Opportunities by Quarter) ›
              </Link>
            </div>
            <div className="bg-white rounded border border-gray-200 shadow-sm p-5 flex-1">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-gray-500 font-medium">Total Potential Sales</p>
                <Maximize2 className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <p className="text-5xl font-extrabold text-gray-900 tracking-tight leading-none mt-2">UGX 2.1B</p>
              <div className="flex items-center gap-1.5 mt-3">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-semibold text-blue-600">+8% open pipeline</span>
              </div>
              <Link to="/dashboard/pipeline" className="text-xs text-[#0070D2] hover:underline mt-2 block">
                View Report (Opportunities by Stage) ›
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 2: Region donut | Lead Source bar | Account donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Sales by Region — donut */}
          <Card title="Sales & Potential Sales by Region" subtitle="Sum of Amount" link="/dashboard/analytics">
            <div className="flex items-center justify-center flex-1">
              <div style={{ height: 200, width: '100%', position: 'relative' }}>
                <Doughnut data={regionData} options={{
                  ...baseDoughnut,
                  plugins: {
                    ...baseDoughnut.plugins,
                    legend: { position: 'right', labels: { font: { size: 10 }, boxWidth: 10, padding: 8, color: '#374151' } },
                    tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } },
                  },
                }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center" style={{ marginRight: '60px' }}>
                    <p className="text-xl font-extrabold text-gray-900">UGX 5.8B</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Sales by Lead Source — grouped bar */}
          <Card title="Sales & Potential Sales by Lead Source" subtitle="Sum of Amount" link="/dashboard/analytics">
            <div style={{ height: 200 }}>
              <Bar data={sourceData} options={sourceBarOpts} />
            </div>
          </Card>

          {/* Expected Revenue by Account — donut */}
          <Card title="Expected Revenue by Account" subtitle="Sum of Expected Revenue" link="/dashboard/reports">
            <div className="flex items-center justify-center flex-1">
              <div style={{ height: 200, width: '100%', position: 'relative' }}>
                <Doughnut data={accountData} options={{
                  ...baseDoughnut,
                  plugins: {
                    ...baseDoughnut.plugins,
                    legend: { position: 'right', labels: { font: { size: 10 }, boxWidth: 10, padding: 8, color: '#374151' } },
                    tooltip: { callbacks: { label: (c: any) => ` UGX ${c.raw}M` } },
                  },
                }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center" style={{ marginRight: '60px' }}>
                    <p className="text-xl font-extrabold text-gray-900">UGX 1.1B</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 3: Live KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Contacts', value: stats.contacts || '—', icon: Users,    color: 'text-[#0070D2]', bg: 'bg-blue-50',   change: '+12%', up: true  },
            { label: 'Active Deals',   value: stats.deals    || '—', icon: Target,   color: 'text-violet-600',bg: 'bg-violet-50', change: '+24%', up: true  },
            { label: 'Win Rate',       value: '34.5%',               icon: TrendingUp,color:'text-emerald-600',bg:'bg-emerald-50', change: '+2.1%',up: true  },
            { label: 'Closed Revenue', value: stats.revenue > 0 ? `UGX ${(stats.revenue/1e9).toFixed(1)}B` : 'UGX 3.6B', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50', change: '+14%', up: true },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center shrink-0`}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{kpi.label}</p>
                <p className="text-xl font-extrabold text-gray-900 leading-tight">{String(kpi.value)}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── To Do List footer ── */}
      <div className="border-t border-gray-200 bg-white px-6 py-2">
        <Link to="/dashboard/service" className="text-xs text-[#0070D2] hover:underline font-medium flex items-center gap-1">
          <BarChart3 className="w-3.5 h-3.5" /> To Do List
        </Link>
      </div>
    </div>
  );
}
