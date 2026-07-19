



/* ─────────────────────────────────────────────────────────────────────────

   PlatformArchitecture  –  compact, brand-matched architecture diagram

   Brand palette: var(--color-secondary) (dark navy) · var(--color-primary) (blue) · var(--color-accent) (cyan)

   ───────────────────────────────────────────────────────────────────────── */



import { useMemo } from 'react';

import { useSiteContent } from '../../hooks/useSiteContent';

import { mergeCmsList, toCmsArray } from '../../lib/cms/cmsContent';



const defaultAgents = [
  { id: 'web', icon: '🌐', title: 'Web & mobile access', sub: 'Browser and mobile apps for every role in your organisation' },
  { id: 'api', icon: '🔌', title: 'API & integrations', sub: 'Connect banks, payment gateways, and third-party systems' },
  { id: 'pos', icon: '🏪', title: 'POS & retail outlets', sub: 'Point-of-sale tied directly to inventory and finance' },
];

const defaultLayers = [
  {
    id: 'finance-people',
    accent: 'var(--color-primary)',
    icon: '💼',
    brand: 'Finance & People',
    tag: 'Core business layer',
    items: 'Financials, HR & Payroll, Projects, Tax & compliance',
  },
  {
    id: 'supply-chain',
    accent: '#0E8F84',
    icon: '📦',
    brand: 'Supply Chain',
    tag: 'Source to fulfil',
    items: 'Inventory, Procurement, Manufacturing, Fleet',
  },
  {
    id: 'operations-insight',
    accent: 'var(--color-accent)',
    icon: '📊',
    brand: 'Operations & Insight',
    tag: 'Run & report',
    items: 'Sales & CRM, Operations, POS & Retail, Business Intelligence',
  },
];

const defaultCustomer360Items = [
  { id: 'financials', icon: '💰', label: 'Financials' },
  { id: 'hr-payroll', icon: '👥', label: 'HR & Payroll' },
  { id: 'inventory', icon: '📦', label: 'Inventory' },
  { id: 'procurement', icon: '🛒', label: 'Procurement' },
  { id: 'sales-crm', icon: '📈', label: 'Sales & CRM' },
  { id: 'operations', icon: '⚙️', label: 'Operations' },
  { id: 'fleet', icon: '🚛', label: 'Fleet' },
  { id: 'manufacturing', icon: '🏭', label: 'Manufacturing' },
  { id: 'pos-retail', icon: '🏪', label: 'POS & Retail' },
  { id: 'bi', icon: '📊', label: 'BI & Dashboards' },
  { id: 'projects', icon: '📋', label: 'Projects' },
];

const defaultData360Items = [
  { id: 'ledger', icon: '📒', label: 'Unified ledger' },
  { id: 'master', icon: '🗄️', label: 'Master data' },
  { id: 'workflows', icon: '🔄', label: 'Workflows' },
  { id: 'reporting', icon: '📑', label: 'Reporting engine' },
  { id: 'audit', icon: '🔍', label: 'Audit trail' },
  { id: 'multi-currency', icon: '💱', label: 'Multi-currency' },
  { id: 'multi-company', icon: '🏢', label: 'Multi-company' },
  { id: 'security', icon: '🔐', label: 'Role-based access' },
];

const defaultProviders = [
  { id: 'cloud', label: 'Cloud hosted' },
  { id: 'on-prem', label: 'On-premise' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'africa', label: 'Africa-ready' },
  { id: 'compliance', label: 'Statutory compliance' },
];



export function PlatformArchitecture() {

  const content = useSiteContent('homepage');



  const agents = mergeCmsList(

    content.getContentRaw('platform_arch_agents') as typeof defaultAgents | null,

    defaultAgents

  );



  const layers = useMemo(

    () =>

      mergeCmsList(

        content.getContentRaw('platform_arch_layers') as typeof defaultLayers | null,

        defaultLayers

      ).map((layer) => ({

        ...layer,

        items: toCmsArray(layer.items),

      })),

    [content]

  );



  const customer360Items = mergeCmsList(

    content.getContentRaw('platform_arch_customer360_items') as typeof defaultCustomer360Items | null,

    defaultCustomer360Items

  );



  const data360Items = mergeCmsList(

    content.getContentRaw('platform_arch_data360_items') as typeof defaultData360Items | null,

    defaultData360Items

  );



  const providers = mergeCmsList(

    content.getContentRaw('platform_arch_providers') as typeof defaultProviders | null,

    defaultProviders

  );



  return (

    <section

      className="relative py-16 overflow-hidden"

      style={{

        background: 'linear-gradient(160deg, var(--color-secondary) 0%, var(--color-primary) 55%, #006fa8 100%)',

      }}

    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0"

          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,163,224,0.12) 0%, transparent 70%)' }} />

        <div className="absolute inset-0"

          style={{

            backgroundImage:

              'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',

            backgroundSize: '48px 48px',

          }} />

        <div className="absolute top-0 left-0 right-0 h-px"

          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,163,224,0.6),transparent)' }} />

        <div className="absolute bottom-0 left-0 right-0">

          <svg viewBox="0 0 1440 80" fill="none" className="w-full">

            <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H0Z"

              fill="white" fillOpacity="0.05" />

          </svg>

        </div>

      </div>



      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">



        <div className="text-center mb-5 sm:mb-6">

          <span

            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3"

            style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.35)', color: '#7dd3fc' }}

          >

            <span className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse inline-block" />

            {content.getContent('platform_arch_badge', 'Platform Architecture')}

          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">

            {content.getContent('platform_arch_title', 'The Complete Marmidon Platform')}

          </h2>

          <p className="text-xs text-blue-200 max-w-lg mx-auto leading-relaxed">

            {content.getContent('platform_arch_desc', 'One unified architecture — from AI agents to data infrastructure — powering every layer of your enterprise.')}

          </p>

        </div>



        <div className="relative mx-auto overflow-x-auto" style={{ maxWidth: 840 }}>

          <div className="min-w-[300px]" style={{ transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' }}>



            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 px-1">

              {agents.map((a) => (

                <div

                  key={a.id}

                  className="relative rounded-xl px-3 py-2.5 text-center overflow-hidden"

                  style={{

                    background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',

                    border: '1px solid rgba(255,255,255,0.2)',

                    boxShadow: '0 6px 20px rgba(3,45,96,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',

                    backdropFilter: 'blur(8px)',

                  }}

                >

                  <div className="absolute top-0 left-6 right-6 h-px"

                    style={{ background: 'linear-gradient(90deg,transparent,rgba(0,163,224,0.6),transparent)' }} />

                  <div className="text-xl mb-1 leading-none">{a.icon}</div>

                  <div className="font-bold text-white text-xs leading-snug">{a.title}</div>

                  <div className="mt-1 text-[10px] text-blue-200 leading-snug">{a.sub}</div>

                </div>

              ))}

            </div>



            <div

              className="rounded-2xl overflow-hidden"

              style={{

                background: 'linear-gradient(180deg, rgba(3,45,96,0.92) 0%, rgba(2,28,62,0.97) 100%)',

                border: '1.5px solid rgba(0,163,224,0.3)',

                boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(2,15,50,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',

              }}

            >

              <div

                className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-2"

                style={{

                  background: 'linear-gradient(90deg,rgba(0,163,224,0.06),rgba(0,163,224,0.12),rgba(0,163,224,0.06))',

                  borderBottom: '1px solid rgba(0,163,224,0.2)',

                }}

              >

                <span className="text-[10px] font-medium text-blue-300 tracking-wide">

                  {content.getContent('platform_arch_headless_left', 'MCPs · APIs · Experience Layer · Identity')}

                </span>

                <span className="text-base font-extrabold tracking-tight"

                  style={{ background: 'linear-gradient(90deg,var(--color-accent),#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>

                  {content.getContent('platform_arch_headless_title', 'Headless 360')}

                </span>

                <span className="text-[10px] font-medium text-blue-300 tracking-wide">

                  {content.getContent('platform_arch_headless_right', 'Access & Authorization · Compliance · Governance')}

                </span>

              </div>



              <div className="grid grid-cols-3 gap-2 p-3">

                {layers.map((item) => (

                  <div

                    key={item.id}

                    className="relative rounded-lg p-2.5 overflow-hidden"

                    style={{

                      background: 'rgba(255,255,255,0.05)',

                      border: '1px solid rgba(255,255,255,0.11)',

                    }}

                  >

                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-lg"

                      style={{ background: item.accent }} />

                    <div className="flex items-center gap-1.5 mb-2">

                      <span

                        className="w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0"

                        style={{ background: `${item.accent}22`, border: `1px solid ${item.accent}44` }}

                      >{item.icon}</span>

                      <div>

                        <div className="text-white font-bold text-xs leading-none">{item.brand}</div>

                        <div className="text-[8px] text-blue-300 mt-0.5">{item.tag}</div>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-1">

                      {item.items.map((it, j) => (

                        <span key={j}

                          className="px-1 py-px rounded text-[8px] text-blue-200"

                          style={{ background: 'rgba(0,163,224,0.1)', border: '1px solid rgba(0,163,224,0.15)' }}>

                          {it}

                        </span>

                      ))}

                    </div>

                  </div>

                ))}

              </div>



              <div className="mx-4 mb-3 rounded-xl overflow-hidden"

                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>

                <div className="flex items-center gap-2 px-4 py-2.5"

                  style={{ background: 'rgba(0,163,224,0.08)', borderBottom: '1px solid rgba(0,163,224,0.15)' }}>

                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs"

                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-accent))' }}>⚙️</span>

                  <span className="text-white font-bold text-sm">{content.getContent('platform_arch_customer360_title', 'Customer 360')}</span>

                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-cyan-300"

                    style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.25)' }}>

                    {content.getContent('platform_arch_customer360_tag', 'System of record')}

                  </span>

                </div>

                <div className="flex flex-wrap gap-2 px-4 py-3">

                  {customer360Items.map((item) => (

                    <div key={item.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"

                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>

                      <span className="text-sm leading-none">{item.icon}</span>

                      <span className="text-[10px] font-medium text-blue-100 whitespace-nowrap">{item.label}</span>

                    </div>

                  ))}

                </div>

              </div>



              <div className="mx-4 mb-4 rounded-xl overflow-hidden"

                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>

                <div className="flex items-center gap-2 px-4 py-2.5"

                  style={{ background: 'rgba(0,163,224,0.08)', borderBottom: '1px solid rgba(0,163,224,0.15)' }}>

                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs"

                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-accent))' }}>🗄️</span>

                  <span className="text-white font-bold text-sm">{content.getContent('platform_arch_data360_title', 'Data 360')}</span>

                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-cyan-300"

                    style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.25)' }}>

                    {content.getContent('platform_arch_data360_tag', 'System of context')}

                  </span>

                </div>

                <div className="flex flex-wrap gap-2 px-4 py-3">

                  {data360Items.map((item) => (

                    <div key={item.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"

                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>

                      <span className="text-sm leading-none">{item.icon}</span>

                      <span className="text-[10px] font-medium text-blue-100 whitespace-nowrap">{item.label}</span>

                    </div>

                  ))}

                </div>

              </div>

            </div>



            <div

              className="relative mt-2 rounded-xl overflow-hidden"

              style={{

                background: 'linear-gradient(90deg,var(--color-secondary),var(--color-primary),var(--color-secondary))',

                border: '1.5px solid rgba(0,163,224,0.35)',

                boxShadow: '0 0 24px rgba(0,163,224,0.18)',

              }}

            >

              <div className="px-6 py-3 flex items-center justify-center gap-3">

                <div className="flex gap-1 flex-1 justify-end">

                  {Array.from({ length: 14 }).map((_, i) => (

                    <span key={i} className="w-1 h-1 rounded-full inline-block"

                      style={{ background: 'rgba(0,163,224,0.45)' }} />

                  ))}

                </div>

                <span className="text-white font-extrabold text-sm tracking-widest whitespace-nowrap px-3">

                  {content.getContent('platform_arch_trust_layer_label', '🛡️  AI Trust Layer')}

                </span>

                <div className="flex gap-1 flex-1 justify-start">

                  {Array.from({ length: 14 }).map((_, i) => (

                    <span key={i} className="w-1 h-1 rounded-full inline-block"

                      style={{ background: 'rgba(0,163,224,0.45)' }} />

                  ))}

                </div>

              </div>

              <div

                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-[11px] font-bold"

                style={{

                  background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',

                  border: '1px solid rgba(0,163,224,0.45)',

                  boxShadow: '0 3px 12px rgba(0,163,224,0.3)',

                }}

              >

                {content.getContent('platform_arch_ask_agentforce', '📊 Explore dashboards')}

              </div>

            </div>



            <div

              className="mt-1.5 rounded-xl px-6 py-3"

              style={{

                background: 'linear-gradient(90deg,#021a40,var(--color-secondary),#021a40)',

                border: '1px solid rgba(255,255,255,0.08)',

                boxShadow: '0 16px 40px rgba(2,10,40,0.6)',

              }}

            >

              <div className="flex items-center justify-around flex-wrap gap-3">

                {providers.map((p) => (

                  <span key={p.id} className="text-xs font-semibold text-blue-200 tracking-wide">

                    {p.label}

                  </span>

                ))}

              </div>

            </div>



            <div className="mx-16 h-6 rounded-full"

              style={{ background: 'rgba(2,10,50,0.55)', filter: 'blur(16px)', transform: 'translateY(2px)' }} />

          </div>

        </div>



        <p className="text-center text-blue-300/60 text-xs mt-10">

          {content.getContent('platform_arch_caption', 'Powered by Marmidon · Enterprise-grade security & compliance')}

        </p>

      </div>

    </section>

  );

}

