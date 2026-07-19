/**
 * Per-page SEO metadata — Doc 5 §8 (Content Plan Matrix).
 * Titles are full document titles unless used with SEO `titleSuffix="short"`.
 */

const MODULE_SEO_NAMES: Record<string, string> = {
  financials: 'Financial & Accounting',
  'hr-payroll': 'Human Resources & Payroll',
  inventory: 'Inventory & Warehouse',
  procurement: 'Procurement & Suppliers',
  'sales-crm': 'Sales & CRM',
  operations: 'Operations',
  fleet: 'Fleet',
  manufacturing: 'Manufacturing & Production',
  'pos-retail': 'Point of Sale & Retail',
  'business-intelligence': 'Business Intelligence',
  projects: 'Project & Job Costing',
};

export const PAGE_META = {
  home: {
    title: 'Marmidon Enterprise Software | Integrated ERP',
    description:
      'Run finance, HR, inventory, sales, manufacturing and more on one integrated ERP platform. Request a demo tailored to your sector and modules.',
  },
  products: {
    title: 'ERP Modules | Marmidon Enterprise Software',
    description:
      'Explore eleven Marmidon ERP modules — financials, HR, inventory, procurement, sales, manufacturing, fleet, POS, BI, projects, and operations.',
  },
  solutions: {
    title: 'ERP by Industry | Marmidon Enterprise Software',
    description:
      'Industry-specific ERP for manufacturing, retail, wholesale, healthcare, education, construction, hospitality, and eight more sectors.',
  },
  customers: {
    title: 'Customer Stories | Marmidon Enterprise Software',
    description:
      'See how organisations unified finance and operations with Marmidon ERP — real outcomes from manufacturing, retail, and services.',
  },
  pricing: {
    title: 'Pricing | Marmidon Enterprise Software',
    description:
      'Quote-based ERP pricing for the modules, users, and deployment model you need. Every plan starts with a personalised demo.',
  },
  partners: {
    title: 'Partners | Marmidon Enterprise Software',
    description:
      'Join the Marmidon partner ecosystem — consulting, technology, reseller, and ISV programmes for ERP implementers across Africa.',
  },
  partnerApply: {
    title: 'Partner Application | Marmidon Enterprise Software',
    description:
      'Apply to become a Marmidon ERP consulting, technology, reseller, or ISV partner. Our partnerships team responds within five business days.',
  },
  about: {
    title: 'About Marmidon | Enterprise Software',
    description:
      'Learn about Marmidon Global Solutions — integrated ERP for African businesses, built with enterprise-grade security and local support.',
  },
  contact: {
    title: 'Contact Marmidon | Request a Demo',
    description:
      'Contact Marmidon for ERP demos, pricing quotes, partnerships, and support. Our team responds within one business day.',
  },
  resources: {
    title: 'Resources & Insights | Marmidon',
    description:
      'ERP guides, FAQs, documentation, and insights to help your team evaluate, implement, and grow with Marmidon.',
  },
  demo: {
    title: 'Request a Demo | Marmidon Enterprise Software',
    description:
      'Book a personalised Marmidon ERP demo — tailored to your industry, modules, and deployment requirements.',
  },
  documentation: {
    title: 'Documentation | Marmidon ERP',
    description:
      'Technical guides and setup instructions for Marmidon ERP modules — finance, inventory, sales, manufacturing, and more.',
  },
  faq: {
    title: 'FAQs | Marmidon Enterprise Software',
    description:
      'Answers to common questions about Marmidon ERP modules, pricing, deployment, integrations, and implementation.',
  },
  blog: {
    title: 'Blog | Marmidon Enterprise Software',
    description:
      'ERP insights, implementation guides, and product updates for finance and operations teams across Africa.',
  },
  events: {
    title: 'Events | Marmidon Enterprise Software',
    description:
      'Summits, workshops, and partner forums for Marmidon ERP customers, prospects, and implementation partners.',
  },
  careers: {
    title: 'Careers | Marmidon Enterprise Software',
    description:
      'Join Marmidon and help build integrated ERP for businesses across Africa and beyond.',
  },
  team: {
    title: 'Our Team | Marmidon Enterprise Software',
    description:
      'Meet the leadership team behind Marmidon Global Solutions and our mission to deliver enterprise ERP for Africa.',
  },
  company: {
    title: 'Company | Marmidon Enterprise Software',
    description:
      'About Marmidon Global Solutions — mission, team, careers, and how we help organisations run on integrated ERP.',
  },
  guides: {
    title: 'Guides & Whitepapers | Marmidon',
    description:
      'In-depth ERP implementation guides, digital transformation playbooks, and whitepapers from Marmidon.',
  },
  search: {
    title: 'Search | Marmidon Enterprise Software',
    description: 'Search Marmidon ERP modules, industry solutions, and support resources.',
  },
  sitemap: {
    title: 'Sitemap | Marmidon Enterprise Software',
    description: 'Complete sitemap of Marmidon ERP website pages — modules, sectors, resources, and support.',
  },
  privacy: {
    title: 'Privacy Statement | Marmidon Enterprise Software',
    description: 'How Marmidon collects, uses, and protects your personal information.',
  },
  terms: {
    title: 'Terms of Service | Marmidon Enterprise Software',
    description: 'Terms governing use of the Marmidon website and services.',
  },
  cookies: {
    title: 'Cookie Statement | Marmidon Enterprise Software',
    description: 'How Marmidon uses cookies and how you can manage your preferences.',
  },
} as const;

export function moduleSeoTitle(slug: string, fallbackTitle: string): string {
  const name = MODULE_SEO_NAMES[slug] ?? fallbackTitle;
  return `${name} | Marmidon ERP`;
}

export function sectorSeoTitle(sectorTitle: string): string {
  return `ERP for ${sectorTitle} | Marmidon`;
}
