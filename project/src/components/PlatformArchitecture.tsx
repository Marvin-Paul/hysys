

/* ─────────────────────────────────────────────────────────────────────────
   PlatformArchitecture  –  compact, brand-matched architecture diagram
   Brand palette: #032d60 (dark navy) · #0b5394 (blue) · #00a3e0 (cyan)
   ───────────────────────────────────────────────────────────────────────── */

const topAgents = [
  { icon: '🤝', title: 'Agentforce Coworker',   sub: 'Your AI teammate that knows your data and workflows' },
  { icon: '💬', title: 'Slackbot',               sub: 'Your trusted employee agent' },
  { icon: '🧩', title: 'Customer apps & agents', sub: 'ANTHROPIC · ChatGPT · Teams · AgentExchange' },
];

const headlessRow = [
  {
    accent: '#00a3e0',
    icon: '⚡',
    brand: 'Agentforce',
    tag: 'System of agency',
    items: ['Voice', 'Piper (SDR)', 'Prospecting', 'Operations', 'Builder', 'Observability', 'Agent Fabric'],
  },
  {
    accent: '#36c5f0',
    icon: '🔗',
    brand: 'Slack',
    tag: 'System of engagement',
    items: ['Channels', 'Workflows', 'Huddles', 'Canvas', 'Marketplace'],
  },
  {
    accent: '#e97627',
    icon: '📊',
    brand: 'Tableau',
    tag: 'System of insight',
    items: ['Visualizations', 'Conversational', 'Embedded'],
  },
];

const customer360Items = [
  { icon: '❤️', label: 'Customer Service' },
  { icon: '📈', label: 'Sales' },
  { icon: '🔷', label: 'Platform' },
  { icon: '🎯', label: 'Marketing' },
  { icon: '🏭', label: 'Industries' },
  { icon: '🛒', label: 'Commerce' },
  { icon: '💰', label: 'Revenue Mgmt' },
  { icon: '🔧', label: 'Field Service' },
  { icon: '💻', label: 'IT Service' },
  { icon: '📞', label: 'Contact Center' },
];

const data360Items = [
  { icon: '🔴', label: 'Mulesoft' },
  { icon: '🔵', label: 'Informatica' },
  { icon: '⬡', label: 'CDP' },
  { icon: '🗄️', label: 'Structured & Unstructured' },
  { icon: '🌐', label: 'Federated' },
  { icon: '⚡', label: 'Real-time' },
  { icon: '🧠', label: 'Semantics' },
  { icon: '🕸️', label: 'Knowledge Graph' },
];

const aiProviders = ['OpenAI', 'ANTHROPIC', 'Gemini', 'LLaMA / Meta', 'Mistral AI'];

export function PlatformArchitecture() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        /* matches the site hero: deep navy → mid blue → cyan, same direction */
        background: 'linear-gradient(160deg, #032d60 0%, #0b5394 55%, #006fa8 100%)',
      }}
    >
      {/* ── subtle background texture ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft radial glow centre */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,163,224,0.12) 0%, transparent 70%)' }} />
        {/* fine grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        {/* top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,163,224,0.6),transparent)' }} />
        {/* bottom wave (same as hero bottom) */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H0Z"
              fill="white" fillOpacity="0.05" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ── heading ── */}
        <div className="text-center mb-5 sm:mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3"
            style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.35)', color: '#7dd3fc' }}
          >
            <span className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse inline-block" />
            Platform Architecture
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
            The Complete HYSYS Platform
          </h2>
          <p className="text-xs text-blue-200 max-w-lg mx-auto leading-relaxed">
            One unified architecture — from AI agents to data infrastructure — powering every layer of your enterprise.
          </p>
        </div>

        {/* ── 3-D diagram — scrollable on mobile ── */}
        <div className="relative mx-auto overflow-x-auto" style={{ maxWidth: 840 }}>
          <div className="min-w-[300px]" style={{ transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' }}>

            {/* ── TOP AGENT CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 px-1">
              {topAgents.map((a, i) => (
                <div
                  key={i}
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

            {/* ── MAIN FRAME ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(3,45,96,0.92) 0%, rgba(2,28,62,0.97) 100%)',
                border: '1.5px solid rgba(0,163,224,0.3)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(2,15,50,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Headless 360 banner */}
              <div
                className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-2"
                style={{
                  background: 'linear-gradient(90deg,rgba(0,163,224,0.06),rgba(0,163,224,0.12),rgba(0,163,224,0.06))',
                  borderBottom: '1px solid rgba(0,163,224,0.2)',
                }}
              >
                <span className="text-[10px] font-medium text-blue-300 tracking-wide">
                  MCPs · APIs · Experience Layer · Identity
                </span>
                <span className="text-base font-extrabold tracking-tight"
                  style={{ background: 'linear-gradient(90deg,#00a3e0,#7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Headless 360
                </span>
                <span className="text-[10px] font-medium text-blue-300 tracking-wide">
                  Access &amp; Authorization · Compliance · Governance
                </span>
              </div>

              {/* Agentforce / Slack / Tableau */}
              <div className="grid grid-cols-3 gap-2 p-3">
                {headlessRow.map((item, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg p-2.5 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.11)',
                    }}
                  >
                    {/* top accent line in brand colour */}
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

              {/* ── Customer 360 ── */}
              <div className="mx-4 mb-3 rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: 'rgba(0,163,224,0.08)', borderBottom: '1px solid rgba(0,163,224,0.15)' }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs"
                    style={{ background: 'linear-gradient(135deg,#0b5394,#00a3e0)' }}>⚙️</span>
                  <span className="text-white font-bold text-sm">Customer 360</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-cyan-300"
                    style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.25)' }}>
                    System of record
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-3">
                  {customer360Items.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
                      <span className="text-sm leading-none">{item.icon}</span>
                      <span className="text-[10px] font-medium text-blue-100 whitespace-nowrap">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Data 360 ── */}
              <div className="mx-4 mb-4 rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: 'rgba(0,163,224,0.08)', borderBottom: '1px solid rgba(0,163,224,0.15)' }}>
                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs"
                    style={{ background: 'linear-gradient(135deg,#0b5394,#00a3e0)' }}>🗄️</span>
                  <span className="text-white font-bold text-sm">Data 360</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-cyan-300"
                    style={{ background: 'rgba(0,163,224,0.15)', border: '1px solid rgba(0,163,224,0.25)' }}>
                    System of context
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-3">
                  {data360Items.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
                      <span className="text-sm leading-none">{item.icon}</span>
                      <span className="text-[10px] font-medium text-blue-100 whitespace-nowrap">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── AI TRUST LAYER ── */}
            <div
              className="relative mt-2 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(90deg,#032d60,#0b5394,#032d60)',
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
                  🛡️&nbsp; AI Trust Layer
                </span>
                <div className="flex gap-1 flex-1 justify-start">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full inline-block"
                      style={{ background: 'rgba(0,163,224,0.45)' }} />
                  ))}
                </div>
              </div>
              {/* Ask Agentforce pill */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-[11px] font-bold"
                style={{
                  background: 'linear-gradient(135deg,#0b5394,#032d60)',
                  border: '1px solid rgba(0,163,224,0.45)',
                  boxShadow: '0 3px 12px rgba(0,163,224,0.3)',
                }}
              >
                🤖 Ask Agentforce
              </div>
            </div>

            {/* ── AI PROVIDERS ── */}
            <div
              className="mt-1.5 rounded-xl px-6 py-3"
              style={{
                background: 'linear-gradient(90deg,#021a40,#032d60,#021a40)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 16px 40px rgba(2,10,40,0.6)',
              }}
            >
              <div className="flex items-center justify-around flex-wrap gap-3">
                {aiProviders.map((p, i) => (
                  <span key={i} className="text-xs font-semibold text-blue-200 tracking-wide">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* ground shadow */}
            <div className="mx-16 h-6 rounded-full"
              style={{ background: 'rgba(2,10,50,0.55)', filter: 'blur(16px)', transform: 'translateY(2px)' }} />
          </div>
        </div>

        {/* caption */}
        <p className="text-center text-blue-300/60 text-xs mt-10">
          Powered by HYSYS · Enterprise-grade security &amp; compliance
        </p>
      </div>
    </section>
  );
}
