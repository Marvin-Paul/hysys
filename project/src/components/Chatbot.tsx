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
const GREETING = `👋 Welcome! I'm **Connect+ Assistant**, your HYSYS Global Solutions support specialist.\n\nI'm here to help you with **products**, **pricing**, **technical guidance**, and more.\n\nHow can I assist you today?`;

// ── FAQ knowledge base ───────────────────────────────────────────────────────
const faq: FaqEntry[] = [
  {
    keywords: ['free', 'trial', 'try', 'demo', 'get started', 'start'],
    answer: `## Free Trial\n\n**HYSYS offers a 14-day free trial** with full platform access — no credit card required.\n\n**What's included:**\n- Full access to all cloud products\n- Dedicated onboarding specialist\n- Step-by-step setup guidance\n- Live chat support throughout your trial\n\nReady to get started? Click below.`,
    link: { text: 'Start Free Trial →', to: '/register' },
  },
  {
    keywords: ['price', 'pricing', 'cost', 'plan', 'pay', 'subscription', 'billing', 'how much'],
    answer: `## Pricing Plans\n\n| Plan | Price | Best For |\n|------|-------|----------|\n| **Essentials** | UGX 91,000/user/mo | Small teams |\n| **Professional** | UGX 274,000/user/mo | Growing businesses |\n| **Enterprise** | UGX 548,000/user/mo | Large organisations |\n\n> All plans include a free trial. Volume discounts available for 50+ users.\n\nFor custom enterprise pricing, our sales team is happy to help.`,
    link: { text: 'View Full Pricing →', to: '/pricing' },
  },
  {
    keywords: ['sales', 'sales cloud', 'crm', 'opportunity', 'lead', 'pipeline'],
    answer: `## Sales Cloud\n\nOur **flagship CRM platform** designed to help your team close more deals.\n\n**Key features:**\n- Lead & opportunity management\n- AI-powered sales forecasting\n- Pipeline automation & workflows\n- Mobile CRM for field teams\n- Real-time performance dashboards`,
    link: { text: 'Explore Sales Cloud →', to: '/products/sales-cloud' },
  },
  {
    keywords: ['service', 'customer service', 'support ticket', 'case', 'help desk'],
    answer: `## Service Cloud\n\nDeliver **world-class customer support** across every channel.\n\n**Key features:**\n- Omnichannel case management\n- AI-powered chatbots & automation\n- Self-service knowledge base\n- Service analytics & SLA tracking\n- Field service management`,
    link: { text: 'Explore Service Cloud →', to: '/products/service-cloud' },
  },
  {
    keywords: ['marketing', 'email', 'campaign', 'journey', 'social', 'advertising'],
    answer: `## Marketing Cloud\n\nCreate **personalised customer journeys** that convert.\n\n**Key features:**\n- Multi-channel journey builder\n- Email & SMS automation\n- Social advertising studio\n- Content management system\n- Campaign analytics & ROI tracking`,
    link: { text: 'Explore Marketing Cloud →', to: '/products/marketing-cloud' },
  },
  {
    keywords: ['commerce', 'ecommerce', 'store', 'shop', 'order', 'b2b', 'b2c'],
    answer: `## Commerce Cloud\n\nPower **B2B and B2C commerce** with AI-driven experiences.\n\n**Key features:**\n- AI-powered product search\n- Order & inventory management\n- Headless commerce architecture\n- Marketplace integrations\n- Personalised storefronts`,
    link: { text: 'Explore Commerce Cloud →', to: '/products/commerce-cloud' },
  },
  {
    keywords: ['data', 'analytics', 'report', 'dashboard', 'insight', 'ai', 'data cloud'],
    answer: `## Data Cloud\n\nUnify your data for **real-time, AI-powered insights**.\n\n**Key features:**\n- Customer 360 unified profiles\n- Real-time data harmonisation\n- Predictive AI & Einstein analytics\n- Privacy & compliance tools\n- Cross-cloud data activation`,
    link: { text: 'Explore Data Cloud →', to: '/products/data-cloud' },
  },
  {
    keywords: ['platform', 'admin', 'automation', 'custom', 'workflow', 'flow', 'integration'],
    answer: `## Platform Cloud\n\nBuild, automate, and govern your entire CRM ecosystem.\n\n**Key features:**\n- Custom objects & fields\n- Role-based access control\n- Workflow automation with Flow\n- 200+ third-party integrations\n- Data governance & audit trails`,
    link: { text: 'Explore Platform Cloud →', to: '/products/platform-cloud' },
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'talk', 'human', 'agent', 'speak'],
    answer: `## Contact Us\n\nOur team is available to assist you directly.\n\n**📍 Office:** Plot 19 Sir Albert Cook Road, Mengo – Kampala\n**📞 Phone:** 0782-602854 · 0752-602857 · 0757-602854\n**📧 Email:** info@hysysglobal.com\n**🌐 Website:** www.hysysglobal.com\n\n> Business hours: Mon–Fri, 8:00 AM – 6:00 PM (EAT)`,
    link: { text: 'Visit Contact Page →', to: '/contact' },
  },
  {
    keywords: ['about', 'company', 'who', 'mission', 'history', 'founded', 'hysys'],
    answer: `## About HYSYS Global Solutions\n\nFounded in 2010, **HYSYS GLOBAL SOLUTIONS LIMITED** has been empowering organisations with intelligent CRM and enterprise software solutions.\n\n**By the numbers:**\n- 150,000+ companies served\n- 40M+ active users\n- 60+ countries\n- 99.9% uptime SLA`,
    link: { text: 'Our Full Story →', to: '/about' },
  },
  {
    keywords: ['industry', 'healthcare', 'education', 'financial', 'retail', 'sector', 'vertical'],
    answer: `## Industry Solutions\n\nWe deliver **purpose-built solutions** for regulated and fast-moving industries.\n\n| Industry | Key Focus |\n|----------|-----------|\n| **Healthcare** | Patient engagement, compliance |\n| **Education** | Student CRM, enrolment |\n| **Financial Services** | Client management, audit trails |\n| **Retail** | Unified commerce, loyalty |\n\nEach solution is tailored to your sector's specific workflows and compliance requirements.`,
    link: { text: 'Explore Industries →', to: '/industries' },
  },
  {
    keywords: ['security', 'safe', 'compliance', 'hipaa', 'gdpr', 'privacy', 'encrypt'],
    answer: `## Security & Compliance\n\nYour data security is our priority.\n\n**Security standards:**\n- AES-256 encryption at rest & in transit\n- Role-based access control (RBAC)\n- Full audit trail & activity logs\n- GDPR & HIPAA compliance ready\n- SOC 2 Type II certified infrastructure\n\nFor detailed security information, please review our Privacy Policy.`,
    link: { text: 'Privacy Policy →', to: '/privacy' },
  },
  {
    keywords: ['implement', 'setup', 'onboard', 'deploy', 'migration', 'go live', 'install'],
    answer: `## Implementation & Onboarding\n\nOur team ensures a **smooth, guided go-live**.\n\n**Typical process:**\n1. Discovery & planning workshop\n2. Data migration & clean-up\n3. Platform configuration\n4. User training & enablement\n5. Go-live support & hypercare\n\n> Average deployment: **2–6 weeks** depending on complexity.`,
    link: { text: 'Talk to Sales →', to: '/contact' },
  },
  {
    keywords: ['training', 'learn', 'certification', 'course', 'tutorial'],
    answer: `## Training & Support\n\nWe provide comprehensive **training and support** for all our products.\n\n- **Onboarding** — Guided setup for new customers\n- **Documentation** — Product guides and best practices\n- **Support** — Dedicated support team\n\nContact our team to learn more.`,
    link: { text: 'Contact Support →', to: '/contact' },
  },
  {
    keywords: ['small business', 'startup', 'nonprofit', 'non-profit', 'charity', 'ngo'],
    answer: `## Solutions for Every Organisation\n\nWe have plans designed for organisations of all sizes.\n\n| Segment | Benefit |\n|---------|---------|\n| **Small Business** | Affordable plans, quick setup |\n| **Startups** | Special startup pricing programs |\n| **Nonprofits** | Discounted licensing available |\n| **Enterprise** | Custom contracts & SLAs |\n\nContact our team to discuss the best fit for your organisation.`,
    link: { text: 'Explore Solutions →', to: '/solutions' },
  },
  {
    keywords: ['customer', 'story', 'case study', 'success', 'testimonial', 'review'],
    answer: `## Customer Success Stories\n\nSee how organisations like yours are achieving results with HYSYS.\n\nOur customers report:\n- **35%** increase in sales productivity\n- **28%** improvement in customer satisfaction\n- **40%** reduction in support resolution time\n\nExplore real-world success stories from across industries.`,
    link: { text: 'Read Customer Stories →', to: '/customer-stories' },
  },
];

const quickActions = [
  { label: 'Free Trial', keywords: 'free trial' },
  { label: 'Pricing', keywords: 'pricing' },
  { label: 'Contact Us', keywords: 'contact' },
  { label: 'Our Products', keywords: 'sales cloud crm' },
];

// ── Escalation triggers ──────────────────────────────────────────────────────
const ESCALATION_KEYWORDS = ['human', 'agent', 'person', 'speak to someone', 'escalate', 'real person', 'support team', 'talk to'];
const ESCALATION_RESPONSE = `## Connecting You to Our Team\n\nI'd be happy to connect you with a **human support specialist**.\n\n**Here's how to reach us:**\n- 📞 **Call:** 0782-602854 / 0752-602857\n- 📧 **Email:** info@hysysglobal.com\n- 💬 **Live Chat:** Available on our Contact page during business hours\n\n> Our team typically responds within **2 business hours**.`;

// ── Greeting/thanks responses ────────────────────────────────────────────────
const THANKS_KEYWORDS = ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful'];
const THANKS_RESPONSE = `You're welcome! 😊 Is there anything else I can help you with?\n\nFeel free to ask about **products**, **pricing**, **onboarding**, or any other topic.`;

// ── Fallback responses ───────────────────────────────────────────────────────
const fallbackResponses = [
  `I'm not able to verify that specific detail right now.\n\n**Here are a few options:**\n- Try rephrasing your question\n- Contact our support team for direct guidance\n- Visit our [Support Center](/contact) for help`,
  `That falls outside my current knowledge area. I want to make sure you get accurate information.\n\n**I'd recommend:**\n- Reaching out to our support team\n- Visiting our Contact page for direct assistance`,
  `I don't have a confident answer for that one. Rather than guessing, I'd suggest connecting with our team who can give you a verified, detailed response.\n\n📞 **0782-602854** · 📧 **info@hysysglobal.com**`,
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
                  Online · HYSYS Global Solutions
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
              Powered by Connect+ · HYSYS Global Solutions
            </p>
          </div>
        </div>
      )}
    </>
  );
}
