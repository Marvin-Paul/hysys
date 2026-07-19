import type { FaqItem } from '../components/ui/FaqAccordion';

const MODULE_FAQS: Record<string, FaqItem[]> = {
  financials: [
    { question: 'Does Marmidon Financials support multi-currency?', answer: 'Yes. Financials handles multiple currencies with revaluation, consolidation, and reporting in your base currency.' },
    { question: 'Can other modules post to the ledger automatically?', answer: 'Procurement, Sales, Inventory, HR & Payroll, and Projects all post journals automatically — no duplicate entry.' },
    { question: 'Is the module audit-ready?', answer: 'Every transaction retains a full audit trail with user, timestamp, and dimension tags for statutory and internal audits.' },
  ],
  'hr-payroll': [
    { question: 'Does payroll support local statutory deductions?', answer: 'Yes. Marmidon HR & Payroll is configured for African statutory requirements including PAYE, NSSF, and local tax rules.' },
    { question: 'Can employees access their own records?', answer: 'The HR self-service portal lets employees view payslips, apply for leave, and update personal details.' },
    { question: 'How does payroll connect to finance?', answer: 'Payroll journals post automatically to Financials each run, keeping HR and finance permanently aligned.' },
  ],
  inventory: [
    { question: 'Can we manage stock across multiple warehouses?', answer: 'Yes. Inventory supports unlimited locations with transfers, reorder rules, and location-level valuation.' },
    { question: 'Which valuation methods are supported?', answer: 'FIFO, weighted average, and standard costing are available depending on your accounting policy.' },
    { question: 'Does inventory sync with sales and manufacturing?', answer: 'Sales orders and work orders consume live stock levels — no batch exports or manual reconciliation.' },
  ],
  procurement: [
    { question: 'Can we enforce approval workflows?', answer: 'Requisitions and purchase orders follow configurable approval chains by amount, department, or category.' },
    { question: 'Is three-way matching supported?', answer: 'Yes. Purchase orders, goods receipts, and supplier invoices are matched before payment is released.' },
    { question: 'How does procurement connect to inventory?', answer: 'Approved POs receive goods directly into stock with full traceability from supplier to shelf.' },
  ],
  'sales-crm': [
    { question: 'Can field sales teams work offline?', answer: 'Mobile sales access lets reps quote and capture orders in the field, syncing when connectivity returns.' },
    { question: 'Does invoicing link to receivables?', answer: 'Invoices raised in Sales & CRM flow straight into Financials receivables with live payment status.' },
    { question: 'Can we track pipeline and forecasting?', answer: 'CRM pipeline stages, weighted forecasts, and win/loss analysis are built in and BI-ready.' },
  ],
  operations: [
    { question: 'Can we track SLAs on service jobs?', answer: 'Operations supports SLA definitions with alerts when jobs approach or breach agreed response times.' },
    { question: 'Is mobile field access available?', answer: 'Field teams update job status, capture notes, and log time from any mobile browser.' },
    { question: 'How does operations connect to finance?', answer: 'Job costs and billable time post to Projects and Financials for accurate margin reporting.' },
  ],
  fleet: [
    { question: 'Can we track fuel and maintenance costs per vehicle?', answer: 'Fleet logs fuel, mileage, service history, and assigns costs to departments or projects.' },
    { question: 'Does fleet integrate with procurement?', answer: 'Maintenance parts and fuel purchases can flow through Procurement with full cost allocation.' },
    { question: 'Can drivers be assigned to vehicles?', answer: 'Driver assignment, trip logs, and compliance document expiry tracking are included.' },
  ],
  manufacturing: [
    { question: 'Does Marmidon support bills of material?', answer: 'Multi-level BOMs with revisions, scrap factors, and substitute materials are fully supported.' },
    { question: 'Can we plan production from sales demand?', answer: 'MRP-style planning uses sales orders and forecasts to generate work orders and material requirements.' },
    { question: 'How is production cost calculated?', answer: 'Material, labour, and overhead are captured on work orders and rolled into unit costs in Financials.' },
  ],
  'pos-retail': [
    { question: 'Can we run multiple retail outlets?', answer: 'POS & Retail supports multi-outlet pricing, promotions, and consolidated end-of-day reconciliation.' },
    { question: 'Does POS sync inventory in real time?', answer: 'Every sale updates stock levels immediately across warehouse and retail locations.' },
    { question: 'Can we offer customer loyalty programmes?', answer: 'Loyalty points, promotions, and customer purchase history are linked to the CRM record.' },
  ],
  'business-intelligence': [
    { question: 'Can dashboards be customised per role?', answer: 'Role-based views let executives, finance, and operations each see the KPIs relevant to them.' },
    { question: 'Does BI pull live ERP data?', answer: 'Dashboards query live Marmidon data — no overnight batch loads or spreadsheet exports required.' },
    { question: 'Can reports be exported?', answer: 'Reports export to Excel and PDF, and scheduled delivery can be configured for recurring packs.' },
  ],
  projects: [
    { question: 'Can we track time and expenses against projects?', answer: 'Employees log time and expenses against project tasks with approval workflows before billing.' },
    { question: 'How is project profitability calculated?', answer: 'Budget vs actual costs roll up automatically from time, procurement, and inventory usage.' },
    { question: 'Does project billing connect to sales?', answer: 'Milestone and time-based invoices generate from Projects and post to Sales & CRM and Financials.' },
  ],
};

export function getModuleFaqs(slug: string): FaqItem[] {
  return MODULE_FAQS[slug] ?? [];
}
