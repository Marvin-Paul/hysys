import { storyThumbnails } from '../cms/cardDefaults';

export interface CustomerStory {
  id: string;
  name: string;
  industry: string;
  sectorSlug: string;
  moduleSlugs: string[];
  logo: string;
  quote: string;
  thumbnail: string;
  results: { label: string; value: string }[];
  challenge: string;
  solution: string;
  nameKey: string;
  industryKey: string;
  quoteKey: string;
  challengeKey: string;
  solutionKey: string;
}

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    id: 'techcorp',
    name: 'TechCorp',
    industry: 'Manufacturing',
    sectorSlug: 'manufacturing',
    moduleSlugs: ['financials', 'inventory', 'manufacturing'],
    logo: 'TC',
    quote: 'Marmidon unified our finance, inventory, and production data. We cut manual reporting by 60% in six months.',
    thumbnail: storyThumbnails.techcorp,
    results: [
      { label: 'Reporting time saved', value: '60%' },
      { label: 'Stock accuracy', value: '+35%' },
      { label: 'User adoption', value: '95%' },
    ],
    challenge: 'TechCorp ran finance, inventory, and production on separate spreadsheets and legacy tools with no single source of truth.',
    solution: 'They deployed Marmidon Financials, Inventory, and Manufacturing modules — giving plant and finance teams real-time visibility from order to delivery.',
    nameKey: 'techcorp',
    industryKey: 'technology',
    quoteKey: 'techcorpQuote',
    challengeKey: 'techcorpChallenge',
    solutionKey: 'techcorpSolution',
  },
  {
    id: 'globalretail',
    name: 'GlobalRetail',
    industry: 'Retail',
    sectorSlug: 'retail',
    moduleSlugs: ['pos-retail', 'inventory', 'financials'],
    logo: 'GR',
    quote: 'With Marmidon POS and Inventory linked to finance, we finally have one view across 50+ stores.',
    thumbnail: storyThumbnails.globalretail,
    results: [
      { label: 'Stock accuracy', value: '+42%' },
      { label: 'Reconciliation time', value: '-55%' },
      { label: 'Margin visibility', value: '+28%' },
    ],
    challenge: 'GlobalRetail struggled with disconnected POS, warehouse, and finance systems across 50+ locations.',
    solution: 'Marmidon POS & Retail, Inventory, and Financials unified store sales, stock movements, and end-of-day reconciliation.',
    nameKey: 'globalRetail',
    industryKey: 'retailIndustry',
    quoteKey: 'globalRetailQuote',
    challengeKey: 'globalRetailChallenge',
    solutionKey: 'globalRetailSolution',
  },
  {
    id: 'healthfirst',
    name: 'HealthFirst',
    industry: 'Healthcare',
    sectorSlug: 'healthcare',
    moduleSlugs: ['hr-payroll', 'procurement', 'inventory'],
    logo: 'HF',
    quote: 'Procurement and HR on one platform improved compliance and cut admin work across our facilities.',
    thumbnail: storyThumbnails.healthfirst,
    results: [
      { label: 'Procurement cycle', value: '-40%' },
      { label: 'Payroll accuracy', value: '+99%' },
      { label: 'Admin time saved', value: '30%' },
    ],
    challenge: 'HealthFirst needed compliant procurement, payroll, and inventory control across multiple care facilities.',
    solution: 'Marmidon HR & Payroll, Procurement, and Inventory modules standardised workflows with full audit trails.',
    nameKey: 'healthFirst',
    industryKey: 'healthcareIndustry',
    quoteKey: 'healthFirstQuote',
    challengeKey: 'healthFirstChallenge',
    solutionKey: 'healthFirstSolution',
  },
  {
    id: 'financetech',
    name: 'FinanceTech',
    industry: 'Professional Services',
    sectorSlug: 'professional-services',
    moduleSlugs: ['projects', 'financials', 'sales-crm'],
    logo: 'FT',
    quote: 'Project costing and billing in Marmidon gave us visibility we never had — profitability improved immediately.',
    thumbnail: storyThumbnails.financetech,
    results: [
      { label: 'Billing cycle', value: '-45%' },
      { label: 'Project margin', value: '+22%' },
      { label: 'Utilisation', value: '+18%' },
    ],
    challenge: 'FinanceTech tracked projects in spreadsheets with no link between time, costs, and invoicing.',
    solution: 'Marmidon Projects, Financials, and Sales & CRM connected time capture, job costing, and client billing on one platform.',
    nameKey: 'financeTech',
    industryKey: 'financialIndustry',
    quoteKey: 'financeTechQuote',
    challengeKey: 'financeTechChallenge',
    solutionKey: 'financeTechSolution',
  },
  {
    id: 'swiftlogistics',
    name: 'SwiftLogistics',
    industry: 'Distribution',
    sectorSlug: 'distribution',
    moduleSlugs: ['inventory', 'fleet', 'sales-crm'],
    logo: 'SL',
    quote: 'Warehouse, fleet, and sales finally share one view — delivery exceptions dropped 30% in the first quarter.',
    thumbnail: storyThumbnails.techcorp,
    results: [
      { label: 'Delivery exceptions', value: '-30%' },
      { label: 'Order fulfilment', value: '+25%' },
      { label: 'Fleet utilisation', value: '+18%' },
    ],
    challenge: 'SwiftLogistics could not reconcile warehouse picks, route planning, and customer order status across three systems.',
    solution: 'Marmidon Inventory, Fleet, and Sales & CRM gave dispatch, drivers, and account managers live status on every order.',
    nameKey: 'swiftLogistics',
    industryKey: 'distribution',
    quoteKey: 'swiftLogisticsQuote',
    challengeKey: 'swiftLogisticsChallenge',
    solutionKey: 'swiftLogisticsSolution',
  },
  {
    id: 'kampalaacademy',
    name: 'Kampala Academy',
    industry: 'Education',
    sectorSlug: 'education',
    moduleSlugs: ['financials', 'hr-payroll', 'procurement'],
    logo: 'KA',
    quote: 'Fee billing, payroll, and procurement on Marmidon cut our month-end close from three weeks to five days.',
    thumbnail: storyThumbnails.healthfirst,
    results: [
      { label: 'Close cycle', value: '-65%' },
      { label: 'Fee collection', value: '+20%' },
      { label: 'Payroll errors', value: '-90%' },
    ],
    challenge: 'Kampala Academy managed fees in one system, payroll in another, and procurement on spreadsheets across three campuses.',
    solution: 'Marmidon Financials, HR & Payroll, and Procurement unified revenue, people costs, and supplier spend with campus-level reporting.',
    nameKey: 'kampalaAcademy',
    industryKey: 'education',
    quoteKey: 'kampalaAcademyQuote',
    challengeKey: 'kampalaAcademyChallenge',
    solutionKey: 'kampalaAcademySolution',
  },
];

export const CUSTOMER_STORIES_BY_ID = Object.fromEntries(CUSTOMER_STORIES.map((s) => [s.id, s]));
