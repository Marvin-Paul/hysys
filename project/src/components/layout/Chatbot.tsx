import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, X, Send, Sparkles, UserCheck } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  isMarkdown?: boolean;
}

interface FaqEntry {
  keywords: string[];
  answer: string;
  link?: { text: string; to: string };
}

// ── System identity ──────────────────────────────────────────────────────────
const BOT_NAME = 'Connect+ Assistant';
const GREETING = `👋 Welcome! I'm **Connect+ Assistant**, your Marmidon ERP support specialist.\n\nI can help with **modules**, **industry solutions**, **demos**, **pricing**, and **support**.\n\nHow can I assist you today?`;

// ── FAQ knowledge base ───────────────────────────────────────────────────────
const faq: FaqEntry[] = [
  {
    keywords: ['demo', 'request demo', 'get started', 'start', 'see marmidon', 'book'],
    answer: `## Request a Demo\n\n**Book a personalised Marmidon ERP demo** tailored to your industry and modules.\n\n**What's included:**\n- Walkthrough of relevant ERP modules\n- Sector-specific workflow examples\n- Implementation and pricing guidance\n- Q&A with our ERP specialists\n\nReady to see Marmidon in action? Click below.`,
    link: { text: 'Request a Demo →', to: '/request-a-demo' },
  },
  {
    keywords: ['pricing', 'price', 'cost', 'license', 'quote'],
    answer: `## ERP Pricing\n\nMarmidon pricing is **quote-based** — you pay for the modules, users, and deployment model you need.\n\n**Typical tiers:**\n- **Starter** — Core finance, inventory, and sales\n- **Professional** — Full operational suite\n- **Enterprise** — Custom modules, SLAs, and on-premise options\n\nContact sales or request a demo for a tailored quote.`,
    link: { text: 'View Pricing →', to: '/pricing' },
  },
  {
    keywords: ['financial', 'finance', 'accounting', 'ledger', 'financials'],
    answer: `## Financial Management\n\n**General ledger, AP/AR, budgeting, and statutory reporting** in one integrated finance layer.\n\n**Key features:**\n- Chart of accounts & multi-currency\n- Accounts payable & receivable\n- Budgeting & financial reporting\n- Tax & statutory compliance\n- Bank reconciliation`,
    link: { text: 'Explore Financials →', to: '/products/financials' },
  },
  {
    keywords: ['hr', 'payroll', 'human resources', 'employee', 'leave'],
    answer: `## HR & Payroll\n\nManage **employee records, payroll, leave, and appraisals** with statutory deductions built in.\n\n**Key features:**\n- Employee master records\n- Payroll processing\n- Leave & attendance\n- Performance management\n- HR self-service portal`,
    link: { text: 'Explore HR & Payroll →', to: '/products/hr-payroll' },
  },
  {
    keywords: ['inventory', 'warehouse', 'stock', 'barcode'],
    answer: `## Inventory & Warehouse\n\n**Multi-location stock control**, barcoding, valuation, and reorder rules across your supply chain.\n\n**Key features:**\n- Multi-location stock\n- Barcode & serial tracking\n- Stock valuation methods\n- Reorder & min/max rules\n- Warehouse transfers`,
    link: { text: 'Explore Inventory →', to: '/products/inventory' },
  },
  {
    keywords: ['sales', 'crm', 'pipeline', 'quotation', 'invoice'],
    answer: `## Sales & CRM\n\n**Quotations, orders, invoicing, and pipeline visibility** linked directly to finance.\n\n**Key features:**\n- CRM & pipeline management\n- Quotations & sales orders\n- Invoicing & receivables\n- Customer 360 view\n- Mobile sales access`,
    link: { text: 'Explore Sales & CRM →', to: '/products/sales-crm' },
  },
  {
    keywords: ['manufacturing', 'production', 'bom', 'work order'],
    answer: `## Manufacturing & Production\n\n**BOMs, work orders, production planning, and shop-floor costing** integrated with inventory and finance.\n\n**Key features:**\n- Bill of materials\n- Work order management\n- Production scheduling\n- Shop-floor costing\n- Quality tracking`,
    link: { text: 'Explore Manufacturing →', to: '/products/manufacturing' },
  },
  {
    keywords: ['procurement', 'purchase', 'supplier', 'po'],
    answer: `## Procurement & Suppliers\n\n**Requisitions, purchase orders, supplier management, and goods receipt** on one platform.\n\n**Key features:**\n- Purchase requisitions\n- Purchase orders\n- Supplier management\n- Approval workflows\n- Spend analytics`,
    link: { text: 'Explore Procurement →', to: '/products/procurement' },
  },
  {
    keywords: ['bi', 'dashboard', 'report', 'analytics', 'business intelligence'],
    answer: `## Business Intelligence\n\n**Executive dashboards, configurable reports, and KPI tracking** across all ERP modules.\n\n**Key features:**\n- Executive dashboards\n- Configurable reports\n- KPI tracking\n- Drill-down analytics\n- Role-based views`,
    link: { text: 'Explore BI & Dashboards →', to: '/products/business-intelligence' },
  },
  {
    keywords: ['operations', 'work order', 'service', 'sla', 'dispatch', 'field service'],
    answer: `## Operations Management\n\n**Coordinate jobs, work orders, scheduling, and SLAs** so service teams deliver consistently with costs visible to finance.\n\n**Key features:**\n- Job and work order tracking\n- Scheduling and dispatch\n- SLA monitoring\n- Operational cost capture\n- Mobile field updates`,
    link: { text: 'Explore Operations →', to: '/products/operations' },
  },
  {
    keywords: ['fleet', 'vehicle', 'transport', 'fuel', 'mileage', 'maintenance'],
    answer: `## Fleet Management\n\n**Control vehicles, maintenance, fuel, and mileage** with fleet costs allocated to jobs and departments.\n\n**Key features:**\n- Vehicle register & utilisation\n- Preventive maintenance scheduling\n- Fuel and mileage tracking\n- Compliance records\n- Cost allocation to operations`,
    link: { text: 'Explore Fleet →', to: '/products/fleet' },
  },
  {
    keywords: ['pos', 'point of sale', 'retail', 'checkout', 'till', 'store'],
    answer: `## Point of Sale & Retail\n\n**Fast checkout tied to live stock and finance** across stores with end-of-day reconciliation built in.\n\n**Key features:**\n- Fast POS checkout\n- Live stock checks\n- Consistent pricing across locations\n- Returns and exchanges\n- Automatic revenue posting`,
    link: { text: 'Explore POS & Retail →', to: '/products/pos-retail' },
  },
  {
    keywords: ['project', 'job costing', 'billing', 'milestone', 'time capture', 'profitability'],
    answer: `## Project & Job Costing\n\n**Deliver projects profitably** with budgets, time and cost capture, margin analysis, and client billing linked to finance.\n\n**Key features:**\n- Budget vs actual tracking\n- Time and expense capture\n- Job costing and margin analysis\n- Milestone billing\n- Resource planning`,
    link: { text: 'Explore Projects →', to: '/products/projects' },
  },
  {
    keywords: ['module', 'modules', 'erp modules', 'all modules', 'product suite'],
    answer: `## Marmidon ERP Modules\n\nMarmidon includes **eleven integrated modules** on one platform:\n\n1. **Financials** — GL, AP/AR, reporting\n2. **HR & Payroll** — People and payroll\n3. **Inventory** — Stock and warehouse\n4. **Procurement** — Buying and suppliers\n5. **Sales & CRM** — Pipeline to cash\n6. **Operations** — Jobs and service delivery\n7. **Fleet** — Vehicles and transport\n8. **Manufacturing** — Production and BOMs\n9. **POS & Retail** — Store checkout\n10. **BI & Dashboards** — Analytics\n11. **Projects** — Job costing\n\nWhich module would you like to explore?`,
    link: { text: 'View All Modules →', to: '/products' },
  },
  {
    keywords: ['event', 'events', 'summit', 'workshop', 'forum', 'conference', 'register', 'attend'],
    answer: `## Marmidon Events\n\nJoin our **summits, workshops, and partner forums** to learn from product leaders and connect with peers.\n\n**Upcoming highlights:**\n- Marmidon Global Summit\n- Customer Success Forum\n- ERP Transformation Workshop\n\n> Most events offer virtual attendance and on-demand recordings.`,
    link: { text: 'View Events →', to: '/events' },
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'talk', 'human', 'agent', 'speak'],
    answer: `## Contact Us\n\nOur team is available to assist you directly.\n\n**📍 Office:** Plot 19 Sir Albert Cook Road, Mengo – Kampala\n**📞 Phone:** 0782-602854 · 0752-602857 · 0757-602854\n**📧 Email:** info@marmidon.com\n**🌐 Website:** www.marmidon.com\n\n> Business hours: Mon–Fri, 8:00 AM – 6:00 PM (EAT)`,
    link: { text: 'Visit Contact Page →', to: '/contact' },
  },
  {
    keywords: ['about', 'company', 'who', 'mission', 'history', 'founded', 'Marmidon'],
    answer: `## About Marmidon Global Solutions\n\nFounded in 2010, **Marmidon Global Solutions Limited** delivers integrated ERP software for finance, operations, inventory, and more.\n\n**By the numbers:**\n- 500+ organisations served\n- 11 integrated ERP modules\n- 12 industry sectors\n- 99.9% uptime SLA`,
    link: { text: 'Our Full Story →', to: '/company/about' },
  },
  {
    keywords: ['industry', 'sector', 'solution', 'healthcare', 'education', 'retail', 'manufacturing', 'construction'],
    answer: `## Industry Solutions\n\nMarmidon ERP is configured for **twelve sectors** with the modules and workflows each industry needs.\n\n| Sector | Key modules |\n|--------|-------------|\n| **Manufacturing** | Production, inventory, finance |\n| **Retail** | POS, inventory, sales |\n| **Healthcare** | HR, procurement, finance |\n| **Construction** | Projects, fleet, job costing |\n\nEach solution is tailored to your sector's specific workflows and compliance requirements.`,
    link: { text: 'Explore Solutions →', to: '/solutions' },
  },
  {
    keywords: ['security', 'safe', 'compliance', 'hipaa', 'gdpr', 'privacy', 'encrypt'],
    answer: `## Security & Compliance\n\nYour data security is our priority.\n\n**Security standards:**\n- AES-256 encryption at rest & in transit\n- Role-based access control (RBAC)\n- Full audit trail & activity logs\n- GDPR & data protection compliance ready\n- Enterprise-grade infrastructure\n\nFor detailed security information, please review our Privacy Policy.`,
    link: { text: 'Privacy Policy →', to: '/legal/privacy' },
  },
  {
    keywords: ['implement', 'setup', 'onboard', 'deploy', 'migration', 'go live', 'install'],
    answer: `## Implementation & Onboarding\n\nOur team ensures a **smooth, guided go-live**.\n\n**Typical process:**\n1. Discovery & planning workshop\n2. Data migration & clean-up\n3. Module configuration\n4. User training & enablement\n5. Go-live support & hypercare\n\n> Average deployment: **2–6 weeks** depending on complexity.`,
    link: { text: 'Talk to Sales →', to: '/contact' },
  },
  {
    keywords: ['training', 'learn', 'certification', 'course', 'tutorial', 'documentation'],
    answer: `## Training & Support\n\nWe provide comprehensive **training and support** for all Marmidon ERP modules.\n\n- **Onboarding** — Guided setup for new customers\n- **Documentation** — Module guides and best practices\n- **Support** — Dedicated support team\n\nContact our team to learn more.`,
    link: { text: 'Contact Support →', to: '/contact' },
  },
  {
    keywords: ['customer', 'story', 'case study', 'success', 'testimonial', 'review'],
    answer: `## Customer Success Stories\n\nSee how organisations like yours are achieving results with Marmidon ERP.\n\nOur customers report:\n- **60%** reduction in manual reporting\n- **35%** improvement in stock accuracy\n- **45%** faster billing cycles\n\nExplore real-world success stories from across industries.`,
    link: { text: 'Read Customer Stories →', to: '/customers' },
  },
];

const quickActions = [
  { label: 'Request a Demo', keywords: 'request demo' },
  { label: 'ERP Modules', keywords: 'financials inventory sales' },
  { label: 'Contact Us', keywords: 'contact' },
  { label: 'Pricing', keywords: 'pricing quote' },
];

// ── Escalation triggers ──────────────────────────────────────────────────────
const ESCALATION_KEYWORDS = ['human', 'agent', 'person', 'speak to someone', 'escalate', 'real person', 'support team', 'talk to'];
const ESCALATION_RESPONSE = `## Connecting You to Our Team\n\nI'd be happy to connect you with a **human support specialist**.\n\n**Here's how to reach us:**\n- 📞 **Call:** 0782-602854 / 0752-602857\n- 📧 **Email:** info@marmidon.com\n- 💬 **Live Chat:** Available on our Contact page during business hours\n\n> Our team typically responds within **2 business hours**.`;

// ── Greeting/thanks responses ────────────────────────────────────────────────
const THANKS_KEYWORDS = ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful'];
const THANKS_RESPONSE = `You're welcome! 😊 Is there anything else I can help you with?\n\nFeel free to ask about **ERP modules**, **industry solutions**, **demos**, or **pricing**.`;

// ── Fallback responses ───────────────────────────────────────────────────────
const fallbackResponses = [
  `I'm not able to verify that specific detail right now.\n\n**Here are a few options:**\n- Try rephrasing your question\n- Contact our support team for direct guidance\n- Visit our [Support Center](/contact) for help`,
  `That falls outside my current knowledge area. I want to make sure you get accurate information.\n\n**I'd recommend:**\n- Reaching out to our support team\n- Visiting our Contact page for direct assistance`,
  `I don't have a confident answer for that one. Rather than guessing, I'd suggest connecting with our team who can give you a verified, detailed response.\n\n📞 **0782-602854** · 📧 **info@marmidon.com**`,
];

// ── Answer matching ──────────────────────────────────────────────────────────
function findAnswer(input: string): FaqEntry | null {
  const q = input.toLowerCase().trim();
  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faq) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
      const words = kw.split(' ');
      if (words.length > 1 && words.every((w) => q.includes(w))) score += 10;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best : null;
}

// ── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text: string): JSX.Element {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let inTable = false;
  let key = 0;

  const flushTable = () => {
    if (tableHeaders.length) {
      elements.push(
        <div key={key++} className="overflow-x-auto my-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--color-primary)]/10">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="px-2 py-1.5 text-left font-semibold text-[var(--color-secondary)] border border-gray-200">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-2 py-1.5 border border-gray-200 text-gray-700">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = []; tableRows = []; inTable = false;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.slice(1, -1).split('|').map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) { inTable = true; continue; }
      if (!inTable && tableHeaders.length === 0) { tableHeaders = cells; inTable = true; }
      else if (inTable) tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // H2
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={key++} className="font-bold text-[var(--color-secondary)] text-sm mt-1 mb-1">{trimmed.slice(3)}</h2>);
    }
    // H3
    else if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={key++} className="font-semibold text-[var(--color-primary)] text-xs mt-1 mb-0.5">{trimmed.slice(4)}</h3>);
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={key++} className="border-l-2 border-[var(--color-primary)] pl-2 my-1 text-gray-500 text-xs italic">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
    }
    // Bullet list
    else if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={key++} className="ml-3 text-xs text-gray-700 list-disc list-outside">
          {renderInline(trimmed.slice(2))}
        </li>
      );
    }
    // Numbered list
    else if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <li key={key++} className="ml-3 text-xs text-gray-700 list-decimal list-outside">
          {renderInline(trimmed.replace(/^\d+\.\s/, ''))}
        </li>
      );
    }
    // Empty line
    else if (trimmed === '') {
      elements.push(<div key={key++} className="h-1" />);
    }
    // Normal paragraph
    else {
      elements.push(
        <p key={key++} className="text-xs text-gray-700 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
    }
  }

  if (inTable) flushTable();
  return <div className="space-y-0.5">{elements}</div>;
}

function renderInline(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
      : part
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: GREETING, isMarkdown: true },
  ]);
  const [input, setInput] = useState('');
  const [fallbackIdx, setFallbackIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const addBotMessage = (text: string, isMarkdown = true) => {
    setTyping(false);
    setMessages((prev) => [...prev, { role: 'bot', text, isMarkdown }]);
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setTyping(true);

    setTimeout(() => {
      const q = msg.toLowerCase();

      // Escalation check
      if (ESCALATION_KEYWORDS.some((k) => q.includes(k))) {
        addBotMessage(ESCALATION_RESPONSE);
        return;
      }

      // Thanks check
      if (THANKS_KEYWORDS.some((k) => q.includes(k))) {
        addBotMessage(THANKS_RESPONSE, false);
        return;
      }

      const match = findAnswer(msg);
      if (match) {
        addBotMessage(match.answer);
        if (match.link) {
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              role: 'bot',
              text: `__LINK__${match.link!.text}||${match.link!.to}`,
              isMarkdown: false,
            }]);
          }, 150);
        }
      } else {
        const idx = fallbackIdx % fallbackResponses.length;
        setFallbackIdx(idx + 1);
        addBotMessage(fallbackResponses[idx]);
      }
    }, 500);
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:bg-[var(--color-secondary)] transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          <Bot className="w-5 h-5" />
          <span className="text-sm font-semibold">Connect+ Assistant</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">

          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{BOT_NAME}</div>
                <div className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online · Marmidon Global Solutions
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => {
              if (msg.text.startsWith('__LINK__')) {
                const [label, to] = msg.text.replace('__LINK__', '').split('||');
                return (
                  <div key={idx} className="flex justify-start">
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full hover:bg-[var(--color-secondary)] transition-colors shadow-sm"
                    >
                      {label}
                    </Link>
                  </div>
                );
              }
              return (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-[var(--color-primary)] text-white rounded-tr-sm text-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'user'
                      ? <span className="text-sm">{msg.text}</span>
                      : msg.isMarkdown
                      ? renderMarkdown(msg.text)
                      : <p className="text-xs text-gray-700 leading-relaxed">{msg.text}</p>
                    }
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-3 pt-2 flex gap-2 flex-wrap bg-gray-50 border-t border-gray-100">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSend(action.keywords)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2.5 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Powered by Connect+ · Marmidon Global Solutions
            </p>
          </div>
        </div>
      )}
    </>
  );
}
