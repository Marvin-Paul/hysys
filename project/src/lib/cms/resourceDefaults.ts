/** Static defaults for resource/pricing pages — merged with CMS when present. */

export const DEFAULT_PRICING_TIERS = [
  {
    id: 'essential',
    name: 'Essential',
    price: 'Quote',
    period: '',
    desc: 'Core finance, HR, and inventory for growing businesses getting off spreadsheets.',
    features: ['Financials & general ledger', 'HR & payroll', 'Inventory & warehouse', 'Standard reports', 'Email support', 'Implementation assistance'],
    cta: 'Request a Demo',
    highlight: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: 'Quote',
    period: '',
    desc: 'Full operational ERP — procurement, sales, manufacturing, and BI for mid-market organisations.',
    features: ['Everything in Essential', 'Procurement & Sales & CRM', 'Manufacturing or POS', 'Business intelligence dashboards', 'Multi-company & multi-currency', 'Priority support'],
    cta: 'Request a Demo',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'All eleven modules, sector configuration, integrations, and dedicated success management.',
    features: ['Full Marmidon module suite', 'Sector-specific configuration', 'Custom integrations & API', 'Dedicated account manager', 'On-premise or cloud deployment', '24/7 premium support'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export const DEFAULT_PRICING_FAQS = [
  { id: 'p1', question: 'How is Marmidon ERP priced?', answer: 'Pricing depends on the modules you need, number of users, and deployment model. We provide a tailored quote after understanding your requirements.' },
  { id: 'p2', question: 'Can I start with a few modules and expand later?', answer: 'Yes — most customers start with finance and inventory, then add sales, manufacturing, or other modules as they grow.' },
  { id: 'p3', question: 'Do you offer sector-specific packages?', answer: 'Yes — we offer preconfigured setups for manufacturing, retail, healthcare, construction, and eight other sectors.' },
  { id: 'p4', question: 'What payment methods do you accept?', answer: 'We accept bank transfers, mobile money, and major cards for annual licensing agreements.' },
  { id: 'p5', question: 'Can I get a custom enterprise quote?', answer: 'Contact our sales team or request a demo — we will scope modules, users, and implementation for a fixed quote.' },
];

export const DEFAULT_RESOURCE_CARDS = [
  { id: 'blog', title: 'Blog', description: 'ERP insights, product updates, and implementation guides.', path: '/resources/blog', iconName: 'Newspaper', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { id: 'guides', title: 'Guides & whitepapers', description: 'In-depth resources on ERP, automation, and digital transformation.', path: '/resources/guides', iconName: 'BookOpen', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { id: 'faqs', title: 'FAQs', description: 'Quick answers to the most common questions about Marmidon.', path: '/resources/faqs', iconName: 'MessageCircle', accent: 'bg-violet-50 text-violet-600 ring-violet-100' },
  { id: 'docs', title: 'Documentation', description: 'Technical docs, API references, and implementation guides.', path: '/documentation', iconName: 'FileText', accent: 'bg-cyan-50 text-cyan-600 ring-cyan-100' },
];

export const DEFAULT_GUIDES = [
  { id: 'erp-implementation', title: 'ERP Implementation Guide', desc: 'A step-by-step guide to planning and executing a successful Marmidon ERP rollout.', pages: '24 pages', type: 'PDF' },
  { id: 'digital-transformation', title: 'Digital Transformation Playbook', desc: 'Strategic frameworks for leading digital transformation in your organisation.', pages: '32 pages', type: 'PDF' },
  { id: 'ai-business', title: 'AI for Business: Getting Started', desc: 'How to identify and implement AI opportunities across your business functions.', pages: '18 pages', type: 'PDF' },
  { id: 'data-privacy', title: 'Data Privacy Compliance Handbook', desc: 'Navigate the complex landscape of data privacy regulations with confidence.', pages: '28 pages', type: 'PDF' },
];

/** Flat FAQ items — grouped by category on the FAQs page. */
export const DEFAULT_FAQ_PAGE_ITEMS = [
  { id: 'gs1', category: 'Getting started', question: 'What is Marmidon ERP?', answer: 'Marmidon is an integrated enterprise resource planning (ERP) platform with eleven modules — finance, HR, inventory, procurement, sales, manufacturing, fleet, POS, BI, projects, and operations — on one unified database.' },
  { id: 'gs2', category: 'Getting started', question: 'How do I request a demo?', answer: 'Click "Request a Demo" on any page or visit /request-a-demo. Our team will schedule a personalised walkthrough tailored to your industry and modules of interest.' },
  { id: 'gs3', category: 'Getting started', question: 'Do I need to install software?', answer: 'Marmidon runs in the cloud and is accessible from any modern web browser. On-premise deployment is available for organisations that require it.' },
  { id: 'mp1', category: 'Modules & pricing', question: 'Can I start with only some modules?', answer: 'Yes. Most customers begin with finance, inventory, and sales, then add HR, manufacturing, fleet, or other modules as they grow. All modules share one database.' },
  { id: 'mp2', category: 'Modules & pricing', question: 'How is Marmidon priced?', answer: 'Pricing is quote-based — you pay for the modules, users, and deployment model you need. Visit our Pricing page or contact sales for a tailored quote after your demo.' },
  { id: 'mp3', category: 'Modules & pricing', question: 'Do you offer demos instead of a free trial?', answer: 'We offer personalised demos rather than self-service trials. A demo lets our team show Marmidon configured for your sector and answer implementation questions upfront.' },
  { id: 'ps1', category: 'Platform & security', question: 'Is my data secure?', answer: 'Yes. Marmidon uses enterprise-grade encryption at rest and in transit, role-based access control, audit trails, and compliance-ready architecture.' },
  { id: 'ps2', category: 'Platform & security', question: 'Can Marmidon integrate with other systems?', answer: 'Yes. Marmidon offers APIs, webhooks, and pre-built connectors for accounting tools, payment gateways, biometric devices, and third-party applications.' },
  { id: 'ps3', category: 'Platform & security', question: 'Do you offer local data hosting?', answer: 'Yes. We offer data residency options, including local hosting in Uganda and other African countries.' },
  { id: 'si1', category: 'Support & implementation', question: 'How do I get support?', answer: 'Email info@marmidon.com, call 0782-602854, or submit a message on our Contact page. Enterprise customers receive dedicated account management.' },
  { id: 'si2', category: 'Support & implementation', question: 'How long does implementation take?', answer: 'Typical go-live is 2–6 weeks depending on modules, data migration, and customisation. Our team guides discovery, configuration, training, and hypercare.' },
  { id: 'si3', category: 'Support & implementation', question: 'Do you offer training?', answer: 'Yes. We provide documentation, video tutorials, live training sessions, and on-site enablement for enterprise deployments.' },
];

export function groupFaqItems(items: { category?: string; question?: string; answer?: string; q?: string; a?: string }[]) {
  const grouped = new Map<string, { category: string; questions: { q: string; a: string }[] }>();
  for (const item of items) {
    const category = String(item.category || 'General').trim();
    const q = String(item.question || item.q || '').trim();
    const a = String(item.answer || item.a || '').trim();
    if (!q) continue;
    if (!grouped.has(category)) grouped.set(category, { category, questions: [] });
    grouped.get(category)!.questions.push({ q, a });
  }
  return [...grouped.values()];
}

export const DEFAULT_COMPANY_SECTIONS = [
  { id: 'about', title: 'About Marmidon', description: 'Our mission, values, and the team behind the platform.', path: '/company/about', iconName: 'Building2', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { id: 'team', title: 'Team', description: 'Meet the leadership team driving innovation.', path: '/company/team', iconName: 'Users', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { id: 'careers', title: 'Careers', description: 'Join us and help build the future of business software.', path: '/company/careers', iconName: 'Briefcase', accent: 'bg-violet-50 text-violet-600 ring-violet-100' },
  { id: 'partners', title: 'Partners', description: 'Explore partnership opportunities with Marmidon.', path: '/partners', iconName: 'Handshake', accent: 'bg-orange-50 text-orange-600 ring-orange-100' },
  { id: 'news', title: 'News & press', description: 'Latest announcements, press releases, and media coverage.', path: '/resources/blog', iconName: 'Newspaper', accent: 'bg-cyan-50 text-cyan-600 ring-cyan-100' },
];

export const DEFAULT_COMPANY_STATS = [
  { id: 'companies', value: '150K+', label: 'Companies' },
  { id: 'users', value: '40M+', label: 'Active users' },
  { id: 'countries', value: '60+', label: 'Countries' },
  { id: 'uptime', value: '99.9%', label: 'Uptime SLA' },
];

export const DEFAULT_PARTNER_PROGRAMS = [
  { id: 'consulting', title: 'Consulting Partners', desc: 'Implement and customise Marmidon solutions for clients. Access training, certification, and co-selling opportunities.', iconName: 'Users', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { id: 'technology', title: 'Technology Partners', desc: 'Integrate your products with the Marmidon platform. Build apps, connectors, and extensions for the ecosystem.', iconName: 'Award', accent: 'bg-violet-50 text-violet-600 ring-violet-100' },
  { id: 'reseller', title: 'Reseller Partners', desc: 'Distribute Marmidon solutions in your region. Enjoy competitive margins, marketing support, and dedicated channel management.', iconName: 'Globe', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { id: 'isv', title: 'ISV Partners', desc: 'Build integrations and extensions for the Marmidon ERP platform using our APIs and marketplace.', iconName: 'BarChart3', accent: 'bg-orange-50 text-orange-600 ring-orange-100' },
];

export const DEFAULT_PARTNER_LIST = [
  { id: 'acmecorp', name: 'AcmeCorp Solutions', location: 'Kampala, UG', program: 'reseller', sectors: 'Manufacturing, Retail, Distribution', website: 'https://acmecorp.example.com' },
  { id: 'bluetech', name: 'BlueTech Systems', location: 'Nairobi, KE', program: 'technology', sectors: 'Healthcare, Education', website: 'https://bluetech.example.com' },
  { id: 'catalyst', name: 'Catalyst Consulting', location: 'Lagos, NG', program: 'consulting', sectors: 'Financial Services, Professional Services', website: 'https://catalyst.example.com' },
  { id: 'dataflow', name: 'DataFlow Integrators', location: 'Kigali, RW', program: 'isv', sectors: 'Wholesale, Distribution', website: 'https://dataflow.example.com' },
  { id: 'enterprise-africa', name: 'Enterprise Africa Partners', location: 'Johannesburg, ZA', program: 'reseller', sectors: 'Manufacturing, Mining, Construction', website: 'https://enterprise-africa.example.com' },
  { id: 'helix', name: 'Helix Software', location: 'Dar es Salaam, TZ', program: 'technology', sectors: 'Hospitality, Retail', website: 'https://helix.example.com' },
  { id: 'integrate', name: 'Integrate Solutions', location: 'Accra, GH', program: 'consulting', sectors: 'Public Sector, Healthcare', website: 'https://integrate.example.com' },
  { id: 'kili-tech', name: 'KiliTech Partners', location: 'Arusha, TZ', program: 'reseller', sectors: 'Agriculture, Non-Profit', website: 'https://kili-tech.example.com' },
  { id: 'nexus', name: 'Nexus Business Systems', location: 'Lusaka, ZM', program: 'consulting', sectors: 'Education, Professional Services', website: 'https://nexus.example.com' },
  { id: 'omnix', name: 'OmniX Integrations', location: 'Cape Town, ZA', program: 'isv', sectors: 'Media & Publishing, Retail', website: 'https://omnix.example.com' },
  { id: 'pinnacle', name: 'Pinnacle ERP Solutions', location: 'Kampala, UG', program: 'reseller', sectors: 'Manufacturing, Wholesale, Construction', website: 'https://pinnacle.example.com' },
  { id: 'quantum', name: 'Quantum Technologies', location: 'Addis Ababa, ET', program: 'technology', sectors: 'Financial Services, Education', website: 'https://quantum.example.com' },
];

export const DEFAULT_PARTNER_BENEFITS = [
  { id: 'revenue', title: 'Revenue sharing', desc: 'Competitive margins and recurring revenue on subscription renewals.' },
  { id: 'training', title: 'Training & certification', desc: 'Free access to Marmidon training materials, exams, and partner-only events.' },
  { id: 'comarketing', title: 'Co-marketing support', desc: 'Joint marketing campaigns, lead sharing, and partner directory listing.' },
  { id: 'technical', title: 'Technical enablement', desc: 'Sandbox environments, API documentation, and dedicated solution architects.' },
  { id: 'sales', title: 'Sales tools', desc: 'Demo environments, proposal templates, and competitive intelligence.' },
  { id: 'community', title: 'Partner community', desc: 'Connect with peers, share best practices, and collaborate on opportunities.' },
];

export const DEFAULT_CAREERS_VALUES = [
  { id: 'innovation', title: 'Innovation first', desc: 'We challenge conventions and embrace bold ideas to solve real problems.' },
  { id: 'customer', title: 'Customer obsessed', desc: 'Every decision starts with what is best for our customers.' },
  { id: 'team', title: 'One team', desc: 'We collaborate across borders, backgrounds, and disciplines.' },
  { id: 'growth', title: 'Growth mindset', desc: 'We learn fast, iterate, and never stop improving.' },
];

export const DEFAULT_OPEN_ROLES = [
  { id: 'engineer', title: 'Senior Software Engineer', dept: 'Engineering', location: 'Kampala, UG', type: 'Full-time' },
  { id: 'designer', title: 'Product Designer', dept: 'Design', location: 'Kampala, UG', type: 'Full-time' },
  { id: 'csm', title: 'Customer Success Manager', dept: 'Success', location: 'Remote', type: 'Full-time' },
  { id: 'sdr', title: 'Sales Development Representative', dept: 'Sales', location: 'Kampala, UG', type: 'Full-time' },
  { id: 'architect', title: 'Cloud Solutions Architect', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { id: 'marketing', title: 'Marketing Manager', dept: 'Marketing', location: 'Kampala, UG', type: 'Full-time' },
];

export const DEFAULT_NAV_RESOURCES = [
  { id: 'blog', title: 'Blog', desc: 'Product updates & industry insights', path: '/resources/blog', iconName: 'Newspaper', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { id: 'guides', title: 'Guides & whitepapers', desc: 'In-depth research and playbooks', path: '/resources/guides', iconName: 'BookOpen', accent: 'bg-amber-50 text-amber-600 ring-amber-100' },
  { id: 'faqs', title: 'FAQs', desc: 'Quick answers to common questions', path: '/resources/faqs', iconName: 'HelpCircle', accent: 'bg-violet-50 text-violet-600 ring-violet-100' },
  { id: 'docs', title: 'Documentation', desc: 'Technical docs & API references', path: '/documentation', iconName: 'FileText', accent: 'bg-cyan-50 text-cyan-600 ring-cyan-100' },
  { id: 'stories', title: 'Customer Stories', desc: 'See how customers succeed with Marmidon', path: '/customers', iconName: 'Building2', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
];

export const DEFAULT_NAV_COMPANY = [
  { id: 'about', title: 'About Marmidon', desc: 'Our mission, values, and history', path: '/company/about', iconName: 'Building2', accent: 'bg-blue-50 text-blue-600 ring-blue-100' },
  { id: 'team', title: 'Team', desc: 'Meet our leadership', path: '/company/team', iconName: 'Users', accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100' },
  { id: 'careers', title: 'Careers', desc: 'Join us and build the future', path: '/company/careers', iconName: 'Briefcase', accent: 'bg-violet-50 text-violet-600 ring-violet-100' },
  { id: 'partners', title: 'Partners', desc: 'Grow with our ecosystem', path: '/partners', iconName: 'HeartPulse', accent: 'bg-orange-50 text-orange-600 ring-orange-100' },
  { id: 'events', title: 'Events', desc: 'Seminars, summits & workshops', path: '/events', iconName: 'CalendarCheck', accent: 'bg-cyan-50 text-cyan-600 ring-cyan-100' },
  { id: 'contact', title: 'Contact', desc: 'Get in touch with our team', path: '/contact', iconName: 'MessageSquare', accent: 'bg-slate-100 text-slate-700 ring-slate-200' },
];

export const DEFAULT_ABOUT_STATS = [
  { id: 'companies', value: '150K+', label: 'Companies worldwide', iconName: 'Building2' },
  { id: 'users', value: '40M+', label: 'Active users', iconName: 'Users' },
  { id: 'countries', value: '60+', label: 'Countries served', iconName: 'Globe' },
  { id: 'uptime', value: '99.9%', label: 'Uptime SLA', iconName: 'TrendingUp' },
];

export const DEFAULT_FOOTER_RESOURCES = [
  { id: 'blog', title: 'Blog', path: '/resources/blog' },
  { id: 'guides', title: 'Guides & Whitepapers', path: '/resources/guides' },
  { id: 'faqs', title: 'FAQs', path: '/resources/faqs' },
];

export const DEFAULT_FOOTER_COMPANY = [
  { id: 'about', title: 'About Us', path: '/company/about' },
  { id: 'team', title: 'Team', path: '/company/team' },
  { id: 'careers', title: 'Careers', path: '/company/careers' },
  { id: 'partners', title: 'Partners', path: '/partners' },
];
