export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  body: string;
  moduleSlugs?: string[];
  sectorSlugs?: string[];
  tags?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'crm-trends-2026',
    title: 'Top 5 ERP trends shaping African businesses in 2026',
    excerpt: 'Integrated finance, real-time inventory, and sector-fit ERP — the trends defining how African organisations run operations this year.',
    date: '2026-06-15',
    author: 'Sarah Williams',
    category: 'Industry Insights',
    moduleSlugs: ['financials', 'hr-payroll', 'inventory', 'sales-crm', 'business-intelligence'],
    sectorSlugs: ['manufacturing', 'retail', 'healthcare', 'construction'],
    tags: ['ERP trends', 'digital transformation', 'Africa', 'cloud ERP'],
    body: 'Enterprise software in Africa is shifting from disconnected tools to unified ERP. In 2026, five trends stand out for finance and operations leaders.\n\n1. Unified platforms — Finance, inventory, HR, and sales on one database instead of spreadsheets and siloed apps.\n\n2. Sector-fit configuration — Prebuilt workflows for manufacturing, retail, healthcare, and construction reduce implementation time.\n\n3. Mobile-first operations — Field sales, warehouse teams, and site managers update the system from anywhere.\n\n4. Embedded analytics — Dashboards draw from live ERP data so leaders stop waiting for month-end reports.\n\n5. Local compliance built in — Statutory payroll, tax, and audit trails designed for African regulatory requirements.\n\nMarmidon ERP is built around each of these trends — eleven modules, one platform, configured for your industry.',
  },
  {
    slug: 'digital-transformation-africa',
    title: 'Digital transformation in Africa: a practical ERP guide',
    excerpt: 'How African businesses are leapfrogging legacy systems with modern, cloud-ready ERP.',
    date: '2026-05-28',
    author: 'Alex Johnson',
    category: 'Guides',
    moduleSlugs: ['financials', 'inventory', 'procurement', 'projects'],
    sectorSlugs: ['manufacturing', 'wholesale', 'retail', 'professional-services'],
    tags: ['digital transformation', 'Africa', 'cloud ERP', 'ERP guide'],
    body: 'Africa is undergoing a digital revolution. With mobile penetration at an all-time high and cloud infrastructure becoming more accessible, businesses across the continent are skipping legacy systems entirely and moving directly to integrated ERP.\n\nKey considerations for digital transformation:\n\n• Start with a clear strategy aligned to business goals\n• Prioritise finance, inventory, and sales as your first modules\n• Invest in training and change management\n• Partner with vendors who understand the local market\n\nMarmidon is committed to supporting African businesses through every stage of their ERP journey — from discovery to go-live and beyond.',
  },
  {
    slug: 'ai-customer-service',
    title: 'How integrated ERP improves customer service',
    excerpt: 'When sales, operations, and finance share one system, customer issues get resolved faster.',
    date: '2026-05-10',
    author: 'Maria Chen',
    category: 'Product',
    moduleSlugs: ['sales-crm', 'operations', 'inventory'],
    sectorSlugs: ['retail', 'wholesale', 'distribution', 'professional-services'],
    tags: ['customer service', 'integrated ERP', 'CRM', 'operations'],
    body: 'Customer service breaks down when teams cannot see order status, stock availability, or billing history. Integrated ERP fixes that by connecting every touchpoint on one platform.\n\nReal-world improvements:\n\n• Service teams see live order and delivery status from Sales & CRM\n• Operations tracks jobs and SLAs without switching systems\n• Finance resolves billing queries with full transaction history\n• Managers spot recurring issues through BI dashboards\n\nWith Marmidon Operations and Sales & CRM, businesses streamline service workflows and customer follow-up without exporting data to spreadsheets.',
  },
  {
    slug: 'data-privacy-2026',
    title: 'Data privacy and compliance: what ERP buyers need to know',
    excerpt: 'Navigating data protection requirements when choosing and deploying enterprise software.',
    date: '2026-04-22',
    author: 'David Park',
    category: 'Compliance',
    tags: ['data privacy', 'compliance', 'GDPR', 'security', 'data protection'],
    body: 'Data privacy regulations continue to evolve worldwide. From the GDPR in Europe to the Data Protection Act in Uganda and similar laws across Africa, businesses must stay compliant or face significant penalties.\n\nBest practices for ERP deployments:\n\n• Conduct regular data audits across modules\n• Implement role-based access controls per department\n• Maintain clear consent and processing records\n• Have a data breach response plan\n• Choose vendors with audit trails and local hosting options\n\nMarmidon ERP includes built-in audit trails, role-based access, and compliance-ready architecture.',
  },
  {
    slug: 'remote-sales-best-practices',
    title: 'Remote sales best practices on a unified ERP',
    excerpt: 'How distributed sales teams quote, order, and forecast when everyone works from different locations.',
    date: '2026-04-05',
    author: 'Sarah Williams',
    category: 'Sales',
    moduleSlugs: ['sales-crm', 'inventory'],
    sectorSlugs: ['manufacturing', 'wholesale', 'distribution', 'professional-services'],
    tags: ['remote sales', 'CRM', 'sales best practices', 'field sales'],
    body: 'Remote selling is here to stay. Top-performing teams adapt by ensuring every rep works from the same live data — stock levels, pricing, customer history, and open orders.\n\nKey practices:\n\n• Quote from live inventory and approved price lists\n• Share digital proposals linked to CRM records\n• Track follow-ups in the pipeline, not personal spreadsheets\n• Forecast from ERP data, not gut feel\n• Mobile access for field reps on the road\n\nMarmidon Sales & CRM provides quotations, orders, and pipeline visibility your team needs to sell effectively from anywhere.',
  },
];

export const BLOG_POSTS_BY_SLUG = Object.fromEntries(BLOG_POSTS.map((p) => [p.slug, p]));
