/**
 * Sector page content — Doc 5 §5.2 "How Marmidon helps" and proof blocks.
 */

export interface SectorDetailContent {
  howHelps: string[];
  proof: { quote: string; attribution: string; company: string };
}

export const SECTOR_DETAIL_CONTENT: Record<string, SectorDetailContent> = {
  manufacturing: {
    howHelps: [
      'Connect shop-floor production with finance and inventory on one database',
      'Plan materials and capacity from live sales and forecast demand',
      'Track unit costs from BOM through finished goods with full traceability',
    ],
    proof: { quote: 'We went from weekly stock reconciliations to daily visibility across both plants.', attribution: 'Operations Director', company: 'East African manufacturer' },
  },
  production: {
    howHelps: [
      'Schedule work orders against available capacity and materials',
      'Capture shop-floor output in real time without paper travellers',
      'Roll production variances into financial reporting automatically',
    ],
    proof: { quote: 'Production planning that took days now runs in hours with Marmidon.', attribution: 'Plant Manager', company: 'Food production company' },
  },
  wholesale: {
    howHelps: [
      'Manage multi-warehouse stock with accurate valuation and transfers',
      'Quote and fulfil B2B orders from live availability and price lists',
      'Reconcile supplier invoices with goods received and purchase orders',
    ],
    proof: { quote: 'Stock accuracy improved from 78% to 97% in one quarter.', attribution: 'Supply Chain Lead', company: 'Regional wholesaler' },
  },
  retail: {
    howHelps: [
      'Run POS across outlets with unified pricing and promotions',
      'Sync store sales to inventory and finance for same-day reconciliation',
      'Understand margin by product, outlet, and period from live dashboards',
    ],
    proof: { quote: 'End-of-day reconciliation across 50 stores now takes minutes, not hours.', attribution: 'Retail Operations Manager', company: 'Multi-outlet retailer' },
  },
  distribution: {
    howHelps: [
      'Optimise pick, pack, and dispatch with warehouse and fleet visibility',
      'Track delivery costs and allocate them to customers or routes',
      'Give sales teams live stock and delivery status for every order',
    ],
    proof: { quote: 'Delivery exceptions dropped 30% once sales and warehouse shared one system.', attribution: 'Logistics Manager', company: 'Distribution group' },
  },
  'professional-services': {
    howHelps: [
      'Track project time, costs, and billing on one platform',
      'Forecast utilisation and pipeline from CRM and project data',
      'Invoice clients faster with milestone and time-based billing',
    ],
    proof: { quote: 'Project margin visibility improved immediately — we stopped under-billing complex jobs.', attribution: 'Managing Partner', company: 'Professional services firm' },
  },
  education: {
    howHelps: [
      'Manage fee billing, payroll, and procurement with statutory compliance',
      'Control budgets by department, campus, or grant with full audit trails',
      'Give administrators dashboards on enrolment-linked revenue and costs',
    ],
    proof: { quote: 'Fee reconciliation and payroll now close in the same week — not the next month.', attribution: 'Finance Controller', company: 'Private education group' },
  },
  healthcare: {
    howHelps: [
      'Procure medical supplies with approval workflows and audit trails',
      'Run compliant payroll across multiple facilities and shifts',
      'Track inventory of consumables with expiry and reorder alerts',
    ],
    proof: { quote: 'Procurement cycle time fell 40% while compliance documentation got stronger.', attribution: 'Administration Lead', company: 'Healthcare network' },
  },
  hospitality: {
    howHelps: [
      'Manage F&B inventory, procurement, and POS on one platform',
      'Schedule staff and payroll with seasonal workforce flexibility',
      'Track outlet profitability with live food cost and revenue data',
    ],
    proof: { quote: 'Food cost variance is visible daily — not discovered at month-end.', attribution: 'F&B Director', company: 'Hotel group' },
  },
  'non-profit': {
    howHelps: [
      'Track restricted and unrestricted funds with donor reporting',
      'Manage grants, budgets, and project costs with full transparency',
      'Run compliant payroll and procurement for programme delivery',
    ],
    proof: { quote: 'Donor reports that took two weeks now export directly from Marmidon BI.', attribution: 'Programme Director', company: 'International NGO' },
  },
  construction: {
    howHelps: [
      'Capture job costs from procurement, time, and equipment on site',
      'Manage subcontractor POs and progress billing against milestones',
      'Track fleet and plant costs allocated to active projects',
    ],
    proof: { quote: 'We finally know margin by project before the job closes — not six months after.', attribution: 'Project Director', company: 'Construction contractor' },
  },
  'media-publishing': {
    howHelps: [
      'Manage project-based production costs and client billing',
      'Track ad sales pipeline and receivables alongside operations',
      'Control freelance and contractor spend with approval workflows',
    ],
    proof: { quote: 'Campaign profitability is visible while the project is still live.', attribution: 'Finance Manager', company: 'Media agency' },
  },
};

export function getSectorDetail(slug: string): SectorDetailContent | undefined {
  return SECTOR_DETAIL_CONTENT[slug];
}
