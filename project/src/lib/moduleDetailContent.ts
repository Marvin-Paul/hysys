/**
 * Module page content for Doc 5 §5.1 nine-block template.
 * Capability lists live on MARMIDON_MODULES.features; this file holds
 * overview, benefits, integration, sectors, proof, and related modules.
 */

export interface ModuleDetailContent {
  overview: string;
  benefits: string[];
  integrationStory: string;
  sectorSlugs: string[];
  proof: { quote: string; attribution: string; company: string };
  relatedModuleSlugs: string[];
}

export const MODULE_DETAIL_CONTENT: Record<string, ModuleDetailContent> = {
  financials: {
    overview:
      "Marmidon's Financial Management & Accounting module gives you a single, always-current view of your finances. From the general ledger through payables, receivables and reporting, every transaction across Marmidon flows into your accounts automatically — so your numbers are accurate, your close is faster, and you are always audit-ready.",
    benefits: [
      'Real-time, accurate financial position at any moment',
      'Faster, more controlled month- and year-end close',
      'Fewer manual errors through automatic posting from other modules',
      'Audit-ready records with a complete trail',
      'Tighter control of cash, spend and budgets',
    ],
    integrationStory:
      'Procurement posts payables, Sales & CRM and POS feed receivables, Inventory drives valuation and cost of sales, HR & Payroll posts payroll journals, and Projects captures job costs — all flowing into Financials automatically for BI-ready reporting.',
    sectorSlugs: ['manufacturing', 'wholesale', 'construction', 'education', 'non-profit', 'professional-services'],
    proof: {
      quote: 'Closing the books used to take two weeks. With Marmidon Financials, we reconcile daily and close in three days.',
      attribution: 'Finance Director',
      company: 'Regional manufacturer',
    },
    relatedModuleSlugs: ['procurement', 'sales-crm', 'inventory', 'business-intelligence'],
  },
  'hr-payroll': {
    overview:
      "Marmidon's Human Resources & Payroll module keeps people records and payroll correct, compliant and in one place. From hire to retire, it manages employee information, leave, benefits and statutory-accurate payroll — and posts straight into your accounts, so HR and Finance always agree.",
    benefits: [
      'Employees paid accurately and on time, every time',
      'Confidence in statutory and tax compliance',
      'Less HR admin through automation and self-service',
      'A single, reliable source of people data',
      'HR and Finance permanently in step',
    ],
    integrationStory:
      'Payroll costs post automatically to Financials, project time flows into Projects for job costing, and Operations uses HR data for scheduling and resource allocation.',
    sectorSlugs: ['professional-services', 'education', 'healthcare', 'non-profit', 'hospitality', 'construction'],
    proof: {
      quote: 'Payroll that used to take three days now runs in hours — with payslips delivered digitally the same afternoon.',
      attribution: 'HR Manager',
      company: 'Healthcare group',
    },
    relatedModuleSlugs: ['financials', 'projects', 'operations'],
  },
  inventory: {
    overview:
      "Marmidon's Inventory & Warehouse module tells you exactly what you hold, where it is, and what it is worth — across every store and warehouse. It controls receipts, issues, transfers and counts, and values stock correctly so you avoid both stock-outs and capital tied up in the wrong items.",
    benefits: [
      'Accurate stock you can trust across all locations',
      'Fewer stock-outs and less over-ordering',
      'Reduced shrinkage and write-offs',
      'Correct stock valuation in the accounts',
      'Full control across multiple sites',
    ],
    integrationStory:
      'Procurement receives goods into stock, Sales & CRM and POS fulfil orders from live availability, Manufacturing consumes and produces materials, and Financials reflects valuation and cost of sales in real time.',
    sectorSlugs: ['wholesale', 'retail', 'distribution', 'manufacturing', 'healthcare', 'hospitality'],
    proof: {
      quote: 'Stock accuracy went from 78% to 97% within the first quarter — we finally trust what the system says is on the shelf.',
      attribution: 'Operations Lead',
      company: 'Wholesale distributor',
    },
    relatedModuleSlugs: ['procurement', 'sales-crm', 'manufacturing', 'financials'],
  },
  procurement: {
    overview:
      "Marmidon's Procurement & Suppliers module puts your buying under control. Requisitions, approvals, purchase orders and supplier invoices follow one disciplined, auditable flow — with three-way matching — so you buy the right things at the right price with a clear record of who approved what.",
    benefits: [
      'Controlled, auditable spend across the organisation',
      'Faster requisition-to-order cycles with approvals',
      'Better supplier terms through consolidated buying',
      'Three-way matching reduces invoice errors',
      'Spend visibility for finance and management',
    ],
    integrationStory:
      'Approved purchase orders drive goods receipt in Inventory, matched invoices post to Financials payables, and BI dashboards show spend by supplier, department and category.',
    sectorSlugs: ['manufacturing', 'healthcare', 'education', 'construction', 'hospitality', 'non-profit'],
    proof: {
      quote: 'We cut maverick spending by 40% once every purchase went through Marmidon approvals.',
      attribution: 'Procurement Manager',
      company: 'Multi-site retailer',
    },
    relatedModuleSlugs: ['inventory', 'financials', 'operations'],
  },
  'sales-crm': {
    overview:
      "Marmidon's Sales & CRM module helps you win and keep customers. Manage pipeline, quotations, orders and customer history in one place — with invoicing and receivables linked to Finance so revenue, stock and cash stay aligned.",
    benefits: [
      'Full pipeline visibility from lead to cash',
      'Faster quote-to-order conversion',
      'Customer history available to every rep',
      'Invoices and receipts tied to the ledger',
      'Mobile access for field sales teams',
    ],
    integrationStory:
      'Confirmed sales orders reserve or issue stock from Inventory, invoices post to Financials receivables, and BI tracks revenue, margin and pipeline health across the business.',
    sectorSlugs: ['wholesale', 'retail', 'professional-services', 'distribution', 'media-publishing', 'manufacturing'],
    proof: {
      quote: 'Our reps quote from live stock and pricing — order errors dropped by half in the first month.',
      attribution: 'Sales Director',
      company: 'B2B wholesaler',
    },
    relatedModuleSlugs: ['financials', 'inventory', 'business-intelligence', 'procurement'],
  },
  operations: {
    overview:
      "Marmidon's Operations Management module coordinates day-to-day service delivery. Track jobs, work orders, scheduling and SLAs so operational teams execute consistently — with costs and status visible to finance and management.",
    benefits: [
      'Clear visibility of open jobs and workloads',
      'Faster scheduling and dispatch',
      'SLA tracking and service accountability',
      'Operational costs captured for profitability',
      'Mobile updates from the field',
    ],
    integrationStory:
      'Work orders link to Inventory for parts, HR for technician availability, Fleet for vehicle assignment, and Financials for billing and cost allocation.',
    sectorSlugs: ['professional-services', 'healthcare', 'distribution', 'construction', 'hospitality', 'production'],
    proof: {
      quote: 'Dispatch time fell by 35% once every job was tracked in one system instead of spreadsheets.',
      attribution: 'Service Manager',
      company: 'Field services firm',
    },
    relatedModuleSlugs: ['sales-crm', 'fleet', 'projects', 'hr-payroll'],
  },
  fleet: {
    overview:
      "Marmidon's Fleet Management module controls vehicles and transport costs. Maintain a complete vehicle register, schedule maintenance, track fuel and mileage, and allocate fleet costs to jobs or departments.",
    benefits: [
      'Full visibility of fleet utilisation and costs',
      'Preventive maintenance reduces breakdowns',
      'Fuel and mileage tracked per vehicle',
      'Compliance records always up to date',
      'Costs allocated accurately to operations',
    ],
    integrationStory:
      'Fleet costs flow to Financials, vehicle assignments link to Operations work orders, and Procurement handles parts and service supplier invoices.',
    sectorSlugs: ['distribution', 'construction', 'manufacturing', 'healthcare', 'hospitality', 'non-profit'],
    proof: {
      quote: 'Fuel costs per kilometre dropped 18% once we could see utilisation by route and driver.',
      attribution: 'Logistics Manager',
      company: 'Distribution company',
    },
    relatedModuleSlugs: ['operations', 'financials', 'procurement'],
  },
  manufacturing: {
    overview:
      "Marmidon's Manufacturing & Production module takes you from order to finished goods. Manage BOMs, work orders, production planning and shop-floor costing with inventory and finance updated as production happens.",
    benefits: [
      'Accurate BOMs and production schedules',
      'Real-time visibility of WIP and finished goods',
      'Unit costing tied to actual material and labour',
      'Fewer production delays from material shortages',
      'Integrated quality and traceability',
    ],
    integrationStory:
      'Production consumes raw materials from Inventory, labour posts through HR or Projects, finished goods update stock, and Financials reflects production variances and cost of goods sold.',
    sectorSlugs: ['manufacturing', 'production', 'wholesale', 'distribution', 'construction'],
    proof: {
      quote: 'We finally know the true cost of every production run — margin on custom orders improved by 12%.',
      attribution: 'Production Manager',
      company: 'Fabrication plant',
    },
    relatedModuleSlugs: ['inventory', 'procurement', 'financials', 'operations'],
  },
  'pos-retail': {
    overview:
      "Marmidon's Point of Sale & Retail module delivers fast, reliable checkout tied straight into stock and finance. Sell at the counter or across stores with real-time inventory, pricing and end-of-day reconciliation.",
    benefits: [
      'Fast checkout with live stock checks',
      'Consistent pricing across locations',
      'End-of-day reconciliation in minutes',
      'Returns and exchanges handled correctly',
      'Sales data feeds finance automatically',
    ],
    integrationStory:
      'Every sale updates Inventory in real time, posts revenue to Financials, and appears in BI dashboards alongside wholesale and online channels.',
    sectorSlugs: ['retail', 'hospitality', 'wholesale', 'distribution'],
    proof: {
      quote: 'End-of-day reconciliation across 50 stores went from hours to under 30 minutes.',
      attribution: 'Retail Operations Lead',
      company: 'Multi-store retailer',
    },
    relatedModuleSlugs: ['inventory', 'sales-crm', 'financials', 'business-intelligence'],
  },
  'business-intelligence': {
    overview:
      "Marmidon's Business Intelligence & Dashboards module shows the whole business in one place. Executive dashboards, configurable reports and KPI tracking draw from every module — so leaders see finance, operations and sales performance without exporting spreadsheets.",
    benefits: [
      'Executive visibility across all modules',
      'Configurable reports without IT dependency',
      'KPI tracking with drill-down detail',
      'Role-based views for each department',
      'Export and share insights securely',
    ],
    integrationStory:
      'BI reads live data from Financials, Inventory, Sales, Manufacturing, HR and Projects — one database means one version of the truth across every dashboard.',
    sectorSlugs: ['manufacturing', 'retail', 'professional-services', 'healthcare', 'construction', 'non-profit'],
    proof: {
      quote: 'Management meetings now start with live dashboards — we stopped debating whose spreadsheet was right.',
      attribution: 'CEO',
      company: 'Growing SME',
    },
    relatedModuleSlugs: ['financials', 'sales-crm', 'inventory', 'manufacturing'],
  },
  projects: {
    overview:
      "Marmidon's Project & Job Costing module helps you deliver projects profitably. Set budgets, capture time and costs, analyse margin and bill clients — with every posting linked to Financials and HR.",
    benefits: [
      'Budget vs actual visibility on every job',
      'Time and expense capture from the field',
      'Accurate job costing and margin analysis',
      'Milestone billing linked to delivery',
      'Resource planning across active projects',
    ],
    integrationStory:
      'Project costs post to Financials, labour draws from HR & Payroll, materials issue from Inventory, and BI tracks profitability by project, client and sector.',
    sectorSlugs: ['professional-services', 'construction', 'media-publishing', 'non-profit', 'production'],
    proof: {
      quote: 'We discovered three projects were underwater before they finished — and corrected course in time.',
      attribution: 'Project Director',
      company: 'Consulting firm',
    },
    relatedModuleSlugs: ['financials', 'hr-payroll', 'sales-crm', 'operations'],
  },
};

export function getModuleDetail(slug: string): ModuleDetailContent | undefined {
  return MODULE_DETAIL_CONTENT[slug];
}
