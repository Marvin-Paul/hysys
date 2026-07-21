/**
 * Canonical Marmidon ERP taxonomy — single source of truth aligned with:
 * Doc 1 (PRD modules), Doc 3 (SIA slugs), Doc 5 (content matrix).
 * Keep slugs stable; update companion CMS/backfill when changing this file.
 */

import { sectorImages } from './cms/cardDefaults';

export interface MarmidonModule {
  id: string;
  slug: string;
  shortName: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconName: string;
  color: string;
  titleKey?: string;
}

export interface MarmidonSector {
  id: string;
  slug: string;
  title: string;
  description: string;
  painPoints: string[];
  recommendedModules: string[];
  iconName: string;
  stat?: string;
  statLabel?: string;
}

export const MARMIDON_MODULES: MarmidonModule[] = [
  {
    id: 'M1', slug: 'financials', shortName: 'Financials', title: 'Financial Management & Accounting',
    subtitle: 'Finance & compliance', iconName: 'Landmark',
    description: 'General ledger, payables, receivables, multi-currency, budgeting, and statutory reporting in one integrated finance layer.',
    features: ['General ledger & chart of accounts', 'Accounts payable & receivable', 'Multi-currency & consolidation', 'Budgeting & financial reporting', 'Tax & statutory compliance', 'Bank reconciliation'],
    color: 'from-blue-600 to-blue-800', titleKey: 'moduleFinancials',
  },
  {
    id: 'M2', slug: 'hr-payroll', shortName: 'HR & Payroll', title: 'Human Resources & Payroll',
    subtitle: 'People operations', iconName: 'Users',
    description: 'Employee records, payroll, leave, appraisals, and HR self-service with statutory deductions built in.',
    features: ['Employee master records', 'Payroll processing', 'Leave & attendance', 'Performance management', 'HR self-service portal', 'Statutory deductions'],
    color: 'from-violet-600 to-purple-800', titleKey: 'moduleHrPayroll',
  },
  {
    id: 'M3', slug: 'inventory', shortName: 'Inventory', title: 'Inventory & Warehouse',
    subtitle: 'Stock control', iconName: 'Package',
    description: 'Multi-location stock control, barcoding, valuation, reorder rules, and stock takes across your supply chain.',
    features: ['Multi-location stock', 'Barcode & serial tracking', 'Stock valuation methods', 'Reorder & min/max rules', 'Stock takes & adjustments', 'Warehouse transfers'],
    color: 'from-cyan-600 to-teal-700', titleKey: 'moduleInventory',
  },
  {
    id: 'M4', slug: 'procurement', shortName: 'Procurement', title: 'Procurement & Suppliers',
    subtitle: 'Source to pay', iconName: 'ShoppingCart',
    description: 'Requisitions, purchase orders, supplier management, approvals, and goods receipt on one platform.',
    features: ['Purchase requisitions', 'Purchase orders', 'Supplier management', 'Approval workflows', 'Goods receipt & matching', 'Spend analytics'],
    color: 'from-orange-500 to-red-600', titleKey: 'moduleProcurement',
  },
  {
    id: 'M5', slug: 'sales-crm', shortName: 'Sales & CRM', title: 'Sales & CRM',
    subtitle: 'Revenue growth', iconName: 'TrendingUp',
    description: 'Quotations, orders, invoicing, customer management, pipeline visibility, and receivables linked to finance.',
    features: ['CRM & pipeline management', 'Quotations & sales orders', 'Invoicing & receivables', 'Customer 360 view', 'Sales forecasting', 'Mobile sales access'],
    color: 'from-emerald-600 to-green-700', titleKey: 'moduleSalesCrm',
  },
  {
    id: 'M6', slug: 'operations', shortName: 'Operations', title: 'Operations Management',
    subtitle: 'Service delivery', iconName: 'Settings',
    description: 'Service workflows, job tracking, scheduling, and resource allocation for operational teams.',
    features: ['Job & work order tracking', 'Scheduling & dispatch', 'Resource allocation', 'SLA management', 'Operations dashboards', 'Mobile field updates'],
    color: 'from-slate-600 to-slate-800', titleKey: 'moduleOperations',
  },
  {
    id: 'M7', slug: 'fleet', shortName: 'Fleet', title: 'Fleet Management',
    subtitle: 'Vehicle operations', iconName: 'Truck',
    description: 'Vehicle register, fuel, maintenance, assignment, and cost tracking for your fleet.',
    features: ['Vehicle register', 'Fuel & mileage tracking', 'Maintenance schedules', 'Driver assignment', 'Cost allocation', 'Compliance records'],
    color: 'from-amber-600 to-orange-700', titleKey: 'moduleFleet',
  },
  {
    id: 'M8', slug: 'manufacturing', shortName: 'Manufacturing', title: 'Manufacturing & Production',
    subtitle: 'Make to order', iconName: 'Factory',
    description: 'Bills of material, work orders, production planning, shop-floor control, and product costing.',
    features: ['Bills of material', 'Work orders & routing', 'Production planning', 'Shop-floor tracking', 'Material requirements', 'Production costing'],
    color: 'from-indigo-600 to-blue-700', titleKey: 'moduleManufacturing',
  },
  {
    id: 'M9', slug: 'pos-retail', shortName: 'POS & Retail', title: 'Point of Sale & Retail',
    subtitle: 'Front office', iconName: 'Store',
    description: 'POS, retail pricing, promotions, multi-outlet management, and daily reconciliation.',
    features: ['Point of sale', 'Multi-outlet retail', 'Promotions & pricing', 'Daily reconciliation', 'Inventory sync', 'Customer loyalty'],
    color: 'from-rose-500 to-pink-600', titleKey: 'modulePosRetail',
  },
  {
    id: 'M10', slug: 'business-intelligence', shortName: 'BI & Dashboards', title: 'Business Intelligence & Dashboards',
    subtitle: 'Insight & analytics', iconName: 'BarChart3',
    description: 'KPI dashboards, analytics, configurable reports, and data export across the entire ERP suite.',
    features: ['Executive dashboards', 'Configurable reports', 'KPI tracking', 'Data export', 'Drill-down analytics', 'Role-based views'],
    color: 'from-sky-600 to-cyan-700', titleKey: 'moduleBi',
  },
  {
    id: 'M11', slug: 'projects', shortName: 'Projects', title: 'Project & Job Costing',
    subtitle: 'Project profitability', iconName: 'Briefcase',
    description: 'Project budgets, time and cost capture, profitability analysis, and billing.',
    features: ['Project budgets', 'Time & expense capture', 'Job costing', 'Profitability analysis', 'Milestone billing', 'Resource planning'],
    color: 'from-teal-600 to-emerald-700', titleKey: 'moduleProjects',
  },
];

export const MARMIDON_SECTORS: MarmidonSector[] = [
  {
    id: 'manufacturing', slug: 'manufacturing', title: 'Manufacturing', iconName: 'Factory',
    description: 'Unify production, inventory, procurement, and finance on one ERP platform built for manufacturers.',
    painPoints: ['Disconnected shop-floor and finance data', 'Inventory inaccuracy across plants', 'Slow production planning cycles', 'Limited visibility into unit costs'],
    recommendedModules: ['financials', 'inventory', 'procurement', 'operations', 'manufacturing', 'business-intelligence'],
    stat: '35% faster production cycles', statLabel: 'Typical improvement',
  },
  {
    id: 'production', slug: 'production', title: 'Production', iconName: 'Cog',
    description: 'Plan, schedule, and cost production runs with real-time visibility from raw materials to finished goods.',
    painPoints: ['Manual work order tracking', 'BOM versioning errors', 'Capacity planning gaps', 'Delayed cost reporting'],
    recommendedModules: ['financials', 'inventory', 'procurement', 'operations', 'manufacturing', 'business-intelligence'],
    stat: '40% reduction in planning time', statLabel: 'Average result',
  },
  {
    id: 'wholesale', slug: 'wholesale', title: 'Wholesale', iconName: 'Truck',
    description: 'Manage high-volume B2B sales, warehouse operations, and distributor relationships in one system.',
    painPoints: ['Complex pricing tiers', 'Multi-warehouse fulfilment', 'Credit control challenges', 'Slow order-to-cash'],
    recommendedModules: ['financials', 'inventory', 'procurement', 'sales-crm', 'business-intelligence'],
    stat: '28% faster order fulfilment', statLabel: 'Reported by users',
  },
  {
    id: 'retail', slug: 'retail', title: 'Retail', iconName: 'ShoppingBag',
    description: 'Connect POS, inventory, and finance for consistent omnichannel retail operations.',
    painPoints: ['Stock-outs and overstock', 'Disconnected store systems', 'Promotion complexity', 'End-of-day reconciliation delays'],
    recommendedModules: ['financials', 'inventory', 'sales-crm', 'pos-retail', 'business-intelligence'],
    stat: '32% higher sell-through', statLabel: 'Retail benchmark',
  },
  {
    id: 'distribution', slug: 'distribution', title: 'Distribution', iconName: 'Network',
    description: 'Optimise warehousing, fleet, and order fulfilment for distribution-heavy businesses.',
    painPoints: ['Route inefficiency', 'Warehouse pick accuracy', 'Returns processing', 'Margin leakage'],
    recommendedModules: ['financials', 'inventory', 'procurement', 'sales-crm', 'operations', 'fleet', 'business-intelligence'],
    stat: '25% logistics cost reduction', statLabel: 'Typical savings',
  },
  {
    id: 'professional-services', slug: 'professional-services', title: 'Professional Services', iconName: 'Briefcase',
    description: 'Track projects, time, billing, and HR for IT, legal, consulting, and professional firms.',
    painPoints: ['Project profitability blind spots', 'Time capture leakage', 'Resource utilisation gaps', 'Billing delays'],
    recommendedModules: ['financials', 'hr-payroll', 'sales-crm', 'operations', 'business-intelligence', 'projects'],
    stat: '45% faster billing cycles', statLabel: 'Services firms report',
  },
  {
    id: 'education', slug: 'education', title: 'Education', iconName: 'GraduationCap',
    description: 'Manage finance, HR, procurement, and operations for schools, colleges, and training institutions.',
    painPoints: ['Budget control across departments', 'Staff payroll complexity', 'Procurement compliance', 'Reporting to regulators'],
    recommendedModules: ['financials', 'hr-payroll', 'procurement', 'business-intelligence'],
    stat: '30% admin time saved', statLabel: 'Institution average',
  },
  {
    id: 'healthcare', slug: 'healthcare', title: 'Healthcare', iconName: 'HeartPulse',
    description: 'Support clinical and back-office operations with secure, compliant ERP for healthcare providers.',
    painPoints: ['Supply chain disruptions', 'Workforce scheduling', 'Regulatory reporting', 'Cost centre visibility'],
    recommendedModules: ['financials', 'hr-payroll', 'inventory', 'procurement', 'operations', 'business-intelligence'],
    stat: '22% supply cost reduction', statLabel: 'Healthcare providers',
  },
  {
    id: 'hospitality', slug: 'hospitality', title: 'Hospitality', iconName: 'UtensilsCrossed',
    description: 'Run finance, HR, inventory, and POS for hotels, restaurants, and hospitality groups.',
    painPoints: ['Perishable inventory waste', 'Seasonal staffing', 'Multi-property reporting', 'Guest billing complexity'],
    recommendedModules: ['financials', 'hr-payroll', 'inventory', 'procurement', 'sales-crm', 'operations', 'pos-retail', 'business-intelligence'],
    stat: '18% food cost improvement', statLabel: 'Hospitality sector',
  },
  {
    id: 'non-profit', slug: 'non-profit', title: 'Non-Profit', iconName: 'Heart',
    description: 'Transparent fund accounting, donor reporting, and programme management for NGOs and charities.',
    painPoints: ['Grant tracking', 'Donor reporting requirements', 'Volunteer coordination', 'Limited IT resources'],
    recommendedModules: ['financials', 'hr-payroll', 'procurement', 'business-intelligence', 'projects'],
    stat: '50% faster grant reporting', statLabel: 'NGO benchmark',
  },
  {
    id: 'construction', slug: 'construction', title: 'Construction', iconName: 'HardHat',
    description: 'Job costing, procurement, fleet, and project management for contractors and builders.',
    painPoints: ['Job cost overruns', 'Subcontractor management', 'Equipment utilisation', 'Progress billing delays'],
    recommendedModules: ['financials', 'hr-payroll', 'inventory', 'procurement', 'operations', 'fleet', 'business-intelligence', 'projects'],
    stat: '20% margin improvement', statLabel: 'Construction firms',
  },
  {
    id: 'media-publishing', slug: 'media-publishing', title: 'Media & Publishing', iconName: 'Newspaper',
    description: 'Manage projects, sales, HR, and operations for media, publishing, and creative agencies.',
    painPoints: ['Project-based billing', 'Rights & royalty tracking', 'Freelancer management', 'Campaign profitability'],
    recommendedModules: ['financials', 'hr-payroll', 'sales-crm', 'operations', 'business-intelligence', 'projects'],
    stat: '38% faster project close-out', statLabel: 'Media agencies',
  },
];

/** Legacy CRM product slugs → ERP module slugs (Doc 3 §301 redirects) */
export const LEGACY_PRODUCT_SLUGS: Record<string, string> = {
  'sales-cloud': 'sales-crm',
  'service-cloud': 'operations',
  'marketing-cloud': 'sales-crm',
  'commerce-cloud': 'pos-retail',
  'data-cloud': 'business-intelligence',
  'platform-cloud': 'operations',
};

/** Legacy industry slugs → sector slugs */
export const LEGACY_SECTOR_SLUGS: Record<string, string> = {
  'financial-services': 'professional-services',
  technology: 'professional-services',
  'public-sector': 'non-profit',
};

export function getModule(slug: string): MarmidonModule | undefined {
  return MARMIDON_MODULES.find((m) => m.slug === slug);
}

export function getSector(slug: string): MarmidonSector | undefined {
  return MARMIDON_SECTORS.find((s) => s.slug === slug);
}

export function resolveModuleSlug(slug: string): string {
  return LEGACY_PRODUCT_SLUGS[slug] ?? slug;
}

export function resolveSectorSlug(slug: string): string {
  return LEGACY_SECTOR_SLUGS[slug] ?? slug;
}

export function modulesForNav() {
  return MARMIDON_MODULES.map((m) => ({
    id: m.slug,
    title: m.shortName,
    desc: m.subtitle,
    path: `/products/${m.slug}`,
    iconName: m.iconName,
    accent: 'bg-blue-50 text-blue-600 ring-blue-100',
  }));
}

export function sectorsForNav() {
  return MARMIDON_SECTORS.map((s) => ({
    id: s.slug,
    title: s.title,
    desc: s.description.slice(0, 60) + (s.description.length > 60 ? '…' : ''),
    path: `/solutions/${s.slug}`,
    iconName: s.iconName,
    accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  }));
}

/** Products mega-menu column groups — Doc 3 §3.2 */
export const MODULE_NAV_GROUPS = [
  { label: 'Finance & People', slugs: ['financials', 'hr-payroll', 'sales-crm'] as const },
  { label: 'Supply Chain', slugs: ['inventory', 'procurement', 'manufacturing', 'pos-retail'] as const },
  { label: 'Operations & Insight', slugs: ['operations', 'fleet', 'projects', 'business-intelligence'] as const },
];

export function footerModuleLinks(limit = 6) {
  return MARMIDON_MODULES.slice(0, limit).map((m) => ({
    label: m.shortName,
    path: `/products/${m.slug}`,
  }));
}

export function footerSectorLinks(limit = 6) {
  return MARMIDON_SECTORS.slice(0, limit).map((s) => ({
    label: s.title,
    path: `/solutions/${s.slug}`,
  }));
}

/** Homepage module teaser cards (Doc 5 §4 block 4) */
export function moduleCardsForHomepage() {
  return MARMIDON_MODULES.map((m) => ({
    id: m.slug,
    titleKey: m.titleKey ?? m.slug,
    title: m.shortName,
    subtitle: m.subtitle,
    subtitleKey: `${m.titleKey ?? m.slug}Subtitle`,
    description: m.description.length > 130 ? `${m.description.slice(0, 127)}…` : m.description,
    descriptionKey: `${m.titleKey ?? m.slug}Desc`,
    link: `/products/${m.slug}`,
    iconName: m.iconName,
    color: m.color,
    bgColor: 'bg-blue-50',
    gradient: m.color,
    image: '',
  }));
}

/** Homepage sector teaser cards (Doc 5 §4 block 5) */
export function sectorCardsForHomepage() {
  return MARMIDON_SECTORS.map((s) => ({
    id: s.slug,
    title: s.title,
    description: s.description.length > 120 ? `${s.description.slice(0, 117)}…` : s.description,
    link: `/solutions/${s.slug}`,
    iconName: s.iconName,
    image: sectorImages[s.slug] || '',
  }));
}

/**
 * Module×Sector tiered matrix — ● primary fit, ○ secondary fit, '' none.
 * Row = module slug, col = sector slug.
 * Based on CPM §5 (cross-reference) and FR-MOD-06.
 */
export const MODULE_SECTOR_MATRIX: Record<string, Record<string, 'primary' | 'secondary' | ''>> = {
  financials: {
    manufacturing: 'primary', production: 'primary', wholesale: 'primary', retail: 'primary',
    distribution: 'primary', 'professional-services': 'primary', education: 'primary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'primary',
    construction: 'primary', 'media-publishing': 'primary',
  },
  'hr-payroll': {
    manufacturing: 'primary', production: 'primary', wholesale: 'primary', retail: 'primary',
    distribution: 'primary', 'professional-services': 'primary', education: 'primary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'primary',
    construction: 'primary', 'media-publishing': 'primary',
  },
  inventory: {
    manufacturing: 'primary', production: 'primary', wholesale: 'primary', retail: 'primary',
    distribution: 'primary', 'professional-services': 'secondary', education: 'secondary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'secondary',
    construction: 'primary', 'media-publishing': 'secondary',
  },
  procurement: {
    manufacturing: 'primary', production: 'primary', wholesale: 'primary', retail: 'secondary',
    distribution: 'primary', 'professional-services': 'secondary', education: 'primary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'primary',
    construction: 'primary', 'media-publishing': 'secondary',
  },
  'sales-crm': {
    manufacturing: 'secondary', production: 'secondary', wholesale: 'primary', retail: 'primary',
    distribution: 'primary', 'professional-services': 'primary', education: 'secondary',
    healthcare: 'secondary', hospitality: 'primary', 'non-profit': 'secondary',
    construction: 'secondary', 'media-publishing': 'primary',
  },
  operations: {
    manufacturing: 'primary', production: 'primary', wholesale: 'secondary', retail: 'secondary',
    distribution: 'primary', 'professional-services': 'primary', education: 'secondary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'secondary',
    construction: 'primary', 'media-publishing': 'primary',
  },
  fleet: {
    manufacturing: 'secondary', production: 'secondary', wholesale: 'primary',
    distribution: 'primary', 'professional-services': 'secondary',
    construction: 'primary',
  },
  manufacturing: {
    manufacturing: 'primary', production: 'primary',
    distribution: 'secondary', construction: 'secondary',
  },
  'pos-retail': {
    retail: 'primary', hospitality: 'primary',
    wholesale: 'secondary',
  },
  'business-intelligence': {
    manufacturing: 'primary', production: 'primary', wholesale: 'primary', retail: 'primary',
    distribution: 'primary', 'professional-services': 'primary', education: 'primary',
    healthcare: 'primary', hospitality: 'primary', 'non-profit': 'primary',
    construction: 'primary', 'media-publishing': 'primary',
  },
  projects: {
    'professional-services': 'primary', 'non-profit': 'primary', construction: 'primary',
    'media-publishing': 'primary', manufacturing: 'secondary',
  },
};

/** Full products list shape for CMS / products page */
export function productsListForCms() {
  return MARMIDON_MODULES.map((m) => ({
    id: m.slug,
    key: m.slug,
    title: m.title,
    subtitle: m.subtitle,
    description: m.description,
    titleKey: m.titleKey,
    subtitleKey: `${m.titleKey}Subtitle`,
    features: m.features,
    iconName: m.iconName,
    color: m.color,
    ctaKey: 'requestDemo',
  }));
}
