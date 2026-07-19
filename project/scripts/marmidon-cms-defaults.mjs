/**
 * Marmidon ERP CMS defaults — mirrors project/src/lib/marmidonCatalog.ts
 * Used by scripts/backfill-cms-defaults.mjs (only fills empty DB fields).
 */

export const MARMIDON_MODULES = [
  { slug: 'financials', shortName: 'Financials', title: 'Financial Management & Accounting', subtitle: 'Finance & compliance', iconName: 'Landmark', color: 'from-blue-600 to-blue-800', titleKey: 'moduleFinancials' },
  { slug: 'hr-payroll', shortName: 'HR & Payroll', title: 'Human Resources & Payroll', subtitle: 'People operations', iconName: 'Users', color: 'from-violet-600 to-purple-800', titleKey: 'moduleHrPayroll' },
  { slug: 'inventory', shortName: 'Inventory', title: 'Inventory & Warehouse', subtitle: 'Stock control', iconName: 'Package', color: 'from-cyan-600 to-teal-700', titleKey: 'moduleInventory' },
  { slug: 'procurement', shortName: 'Procurement', title: 'Procurement & Suppliers', subtitle: 'Source to pay', iconName: 'ShoppingCart', color: 'from-orange-500 to-red-600', titleKey: 'moduleProcurement' },
  { slug: 'sales-crm', shortName: 'Sales & CRM', title: 'Sales & CRM', subtitle: 'Revenue growth', iconName: 'TrendingUp', color: 'from-emerald-600 to-green-700', titleKey: 'moduleSalesCrm' },
  { slug: 'operations', shortName: 'Operations', title: 'Operations Management', subtitle: 'Service delivery', iconName: 'Settings', color: 'from-slate-600 to-slate-800', titleKey: 'moduleOperations' },
  { slug: 'fleet', shortName: 'Fleet', title: 'Fleet Management', subtitle: 'Vehicle operations', iconName: 'Truck', color: 'from-amber-600 to-orange-700', titleKey: 'moduleFleet' },
  { slug: 'manufacturing', shortName: 'Manufacturing', title: 'Manufacturing & Production', subtitle: 'Make to order', iconName: 'Factory', color: 'from-indigo-600 to-blue-700', titleKey: 'moduleManufacturing' },
  { slug: 'pos-retail', shortName: 'POS & Retail', title: 'Point of Sale & Retail', subtitle: 'Front office', iconName: 'Store', color: 'from-rose-500 to-pink-600', titleKey: 'modulePosRetail' },
  { slug: 'business-intelligence', shortName: 'BI & Dashboards', title: 'Business Intelligence & Dashboards', subtitle: 'Insight & analytics', iconName: 'BarChart3', color: 'from-sky-600 to-cyan-700', titleKey: 'moduleBi' },
  { slug: 'projects', shortName: 'Projects', title: 'Project & Job Costing', subtitle: 'Project profitability', iconName: 'Briefcase', color: 'from-teal-600 to-emerald-700', titleKey: 'moduleProjects' },
];

export const MARMIDON_SECTORS = [
  { slug: 'manufacturing', title: 'Manufacturing', description: 'Unify production, inventory, procurement, and finance on one ERP platform built for manufacturers.' },
  { slug: 'production', title: 'Production', description: 'Plan, schedule, and cost production runs with real-time visibility from raw materials to finished goods.' },
  { slug: 'wholesale', title: 'Wholesale', description: 'Manage high-volume B2B sales, warehouse operations, and distributor relationships in one system.' },
  { slug: 'retail', title: 'Retail', description: 'Connect POS, inventory, and finance for consistent omnichannel retail operations.' },
  { slug: 'distribution', title: 'Distribution', description: 'Optimise warehousing, fleet, and order fulfilment for distribution-heavy businesses.' },
  { slug: 'professional-services', title: 'Professional Services', description: 'Track projects, time, billing, and HR for IT, legal, consulting, and professional firms.' },
  { slug: 'education', title: 'Education', description: 'Manage finance, HR, procurement, and operations for schools, colleges, and training institutions.' },
  { slug: 'healthcare', title: 'Healthcare', description: 'Support clinical and back-office operations with secure, compliant ERP for healthcare providers.' },
  { slug: 'hospitality', title: 'Hospitality', description: 'Run finance, HR, inventory, and POS for hotels, restaurants, and hospitality groups.' },
  { slug: 'non-profit', title: 'Non-Profit', description: 'Transparent fund accounting, donor reporting, and programme management for NGOs and charities.' },
  { slug: 'construction', title: 'Construction', description: 'Job costing, procurement, fleet, and project management for contractors and builders.' },
  { slug: 'media-publishing', title: 'Media & Publishing', description: 'Manage projects, sales, HR, and operations for media, publishing, and creative agencies.' },
];

export function navProductsForCms() {
  return MARMIDON_MODULES.map((m) => ({
    id: m.slug,
    title: m.shortName,
    desc: m.subtitle,
    path: `/products/${m.slug}`,
    iconName: m.iconName,
    accent: 'bg-blue-50 text-blue-600 ring-blue-100',
  }));
}

export function productCardsForCms() {
  return MARMIDON_MODULES.map((m) => ({
    titleKey: m.titleKey,
    title: m.shortName,
    subtitle: m.subtitle,
    subtitleKey: `${m.titleKey}Subtitle`,
    description: m.title,
    descriptionKey: `${m.titleKey}Desc`,
    link: `/products/${m.slug}`,
    iconName: m.iconName,
    color: m.color,
    image: '',
  }));
}

export function productsListForCms() {
  return MARMIDON_MODULES.map((m) => ({
    id: m.slug,
    key: m.slug,
    title: m.title,
    subtitle: m.subtitle,
    description: `${m.title} — ${m.subtitle}.`,
    titleKey: m.titleKey,
    subtitleKey: `${m.titleKey}Subtitle`,
    iconName: m.iconName,
    color: m.color,
    ctaKey: 'requestDemo',
    features: [],
  }));
}

const sectorImages = {
  manufacturing: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  production: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
  wholesale: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
  retail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
  distribution: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  'professional-services': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
  healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  hospitality: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'non-profit': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
  construction: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
  'media-publishing': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
};

export function homepageSectorsForCms() {
  return MARMIDON_SECTORS.map((s) => ({
    id: s.slug,
    title: s.title,
    description: s.description.length > 120 ? `${s.description.slice(0, 117)}…` : s.description,
    link: `/solutions/${s.slug}`,
    iconName: s.slug,
    image: sectorImages[s.slug] || '',
  }));
}

export function analystReportsForCms() {
  return [
    {
      id: 'efficiency',
      tag: 'Outcome',
      title: '35% faster month-end close after unifying finance and inventory',
      stat1_value: '35%',
      stat1_label: 'faster close',
      stat2_value: '11',
      stat2_label: 'modules integrated',
      link: '/products/financials',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'inventory',
      tag: 'Outcome',
      title: 'Retailers report 32% higher sell-through with connected POS and stock',
      stat1_value: '32%',
      stat1_label: 'sell-through',
      stat2_value: '28%',
      stat2_label: 'less shrinkage',
      link: '/solutions/retail',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'manufacturing',
      tag: 'Outcome',
      title: 'Manufacturers cut planning cycles with integrated production and procurement',
      stat1_value: '40%',
      stat1_label: 'planning time saved',
      stat2_value: '25%',
      stat2_label: 'cost visibility',
      link: '/solutions/manufacturing',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    },
  ];
}

export function aiSuccessCardsForCms() {
  return [
    {
      id: 'blog',
      tag: 'Blog',
      title: 'ERP insights & product updates',
      desc: 'Practical guides on finance, inventory, and sector best practices from the Marmidon team.',
      link: '/resources/blog',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'guides',
      tag: 'Guides',
      title: 'Whitepapers & playbooks',
      desc: 'In-depth resources for evaluating and implementing enterprise ERP in your industry.',
      link: '/resources/guides',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'docs',
      tag: 'Documentation',
      title: 'Technical documentation',
      desc: 'Module references, setup guides, and integration notes for your IT team.',
      link: '/documentation',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    },
  ];
}

export const MARMIDON_HOMEPAGE_OVERRIDES = {
  hero_title: 'Run your whole business',
  hero_subtitle: 'on one ERP platform',
  hero_desc: 'Marmidon Enterprise ERP unifies finance, HR, inventory, sales, manufacturing, and more — so your teams work from one source of truth.',
  hero_cta: 'Request a Demo',
  hero_cta_secondary: 'Explore modules',
  platform_intro_badge: 'Integrated ERP',
  platform_intro_title: 'Run your whole business on one Marmidon platform',
  platform_intro_desc: 'Eleven integrated modules share one database — so finance, operations, inventory, and sales stay in sync without spreadsheets or duplicate entry.',
  product_section_title: 'Eleven modules. One ERP platform.',
  product_section_desc: 'From finance and HR to inventory, manufacturing, and BI — every module connects on a single platform.',
  features_section_title: 'Why Marmidon',
  features_section_desc: 'Integrated ERP built for African businesses — sector-fit, secure, and supported from implementation to growth.',
  homepage_industries_title: 'ERP solutions built for your industry',
  homepage_industries_desc: 'Twelve sector-specific configurations of Marmidon ERP — with the modules, workflows, and reporting your industry needs from day one.',
  homepage_industries_cta: 'Explore all solutions',
  get_started_badge: 'See Marmidon in action',
  get_started_title_1: 'Ready to unify your operations?',
  get_started_title_2: 'Book a personalised demo',
  get_started_title_3: 'with our ERP specialists',
  get_started_button: 'Request a Demo',
  get_started_footnote: 'No obligation. Tailored to your industry and modules.',
  demo_title: 'See Marmidon ERP in action',
  demo_desc: 'Watch a concise product demo to understand how Marmidon unifies finance, inventory, sales, and operations across your organisation.',
  demo_cta_label: 'Request a Demo',
  platform_arch_title: 'The Complete Marmidon ERP Platform',
  platform_arch_desc: 'One unified architecture — from finance and supply chain to operations and business intelligence.',
  platform_arch_caption: 'Powered by Marmidon · Enterprise-grade security & compliance',
  stats_modules: '11',
  stats_modules_label: 'ERP modules',
  stats_sectors: '12',
  stats_sectors_label: 'Industry sectors',
  stats_integrations: '99.9%',
  stats_integrations_label: 'Uptime SLA',
  stats_platform: '1',
  stats_platform_label: 'Unified platform',
  ai_business_title: 'Real-time visibility across every department',
  ai_business_desc: 'Marmidon ERP connects finance, inventory, sales, and operations on one platform — giving leaders dashboards and reports they can trust without exporting spreadsheets.',
  ai_business_video_url: 'https://www.youtube.com/watch?v=RLn756ttsrg',
  ai_business_cta_primary: 'Request a Demo',
  ai_business_cta_secondary: 'Watch overview',
  customer_proof_video_url: 'https://www.youtube.com/watch?v=DMv_LuaCm48',
  agentforce_stat_value: '500+',
  agentforce_stat_label: 'Organisations\ntrust Marmidon ERP',
  agentforce_title: 'Proven results across Africa and beyond',
  agentforce_desc: 'Manufacturers, retailers, and service firms use Marmidon to cut manual work, improve stock accuracy, and close books faster. See how customers in your sector transformed operations.',
  agentforce_cta_primary: 'Customer stories',
  agentforce_cta_secondary: 'Watch customer demo',
  platform_arch_ask_agentforce: '📊 Explore dashboards',
  analyst_section_title: 'Featured proof from Marmidon customers',
  ai_success_title: 'Resources to help you evaluate and implement ERP',
  ai_success_card_link_label: 'Explore',
  core_values_title: 'Built on trust, innovation, and customer success',
  core_values_desc: 'Marmidon is committed to helping organisations run better — with secure ERP, local expertise, and long-term partnerships that grow with your business.',
  core_values_cta_primary: 'Our story',
  core_values_cta_secondary: 'Meet the team',
  core_values_tags: ['TRUST', 'CUSTOMER SUCCESS', 'INNOVATION', 'INTEGRITY', 'SUSTAINABILITY'],
};

export const MARMIDON_NAV_OVERRIDES = {
  nav_products_tagline: 'Eleven integrated modules. One unified ERP platform.',
  nav_mobile_menu_subtitle: 'Explore Marmidon ERP products & solutions',
  nav_demo_label: 'Request a Demo',
  nav_contact_sales_label: 'Contact Sales',
  nav_customers_label: 'Customers',
  nav_pricing_label: 'Pricing',
  nav_partners_label: 'Partners',
};

export const MARMIDON_PRODUCTS_OVERRIDES = {
  products_hero_badge: 'The Complete ERP Suite',
  products_grid_desc: 'Eleven integrated modules. One unified ERP platform.',
  products_hero_cta_primary: 'Request a Demo',
  detail_hero_primary_cta: 'Request a Demo',
  detail_cta_button: 'Request a Demo',
};

export const MARMIDON_GLOBAL_OVERRIDES = {
  page_eyebrow: 'Marmidon Global Solutions Limited',
  page_subtitle_suffix: 'by Marmidon',
  footer_tagline: 'Integrated ERP for finance, operations, and growth.',
  pricing_title: 'ERP pricing that scales with you',
  pricing_desc: 'Choose the modules and deployment model you need. Every plan starts with a personalised demo and quote.',
  resources_title: 'Learn, explore, and grow',
  resources_desc: 'ERP guides, FAQs, documentation, and insights to help your team get the most from Marmidon.',
  guides_title: 'Guides & whitepapers',
  guides_desc: 'In-depth resources on ERP implementation, automation, and digital transformation.',
};

/** Platform diagram list defaults — mirrors PlatformArchitecture.tsx */
export const MARMIDON_PLATFORM_ARCH_LISTS = {
  platform_arch_badge: 'Platform Architecture',
  platform_arch_headless_left: 'APIs · Web & mobile · Integrations',
  platform_arch_headless_title: 'Unified access',
  platform_arch_headless_right: 'Security · Compliance · Governance',
  platform_arch_customer360_title: 'Eleven ERP modules',
  platform_arch_customer360_tag: 'Single database',
  platform_arch_data360_title: 'Shared data layer',
  platform_arch_data360_tag: 'One source of truth',
  platform_arch_trust_layer_label: '🛡️  Enterprise security',
  platform_arch_agents: [
    { id: 'web', icon: '🌐', title: 'Web & mobile access', sub: 'Browser and mobile apps for every role in your organisation' },
    { id: 'api', icon: '🔌', title: 'API & integrations', sub: 'Connect banks, payment gateways, and third-party systems' },
    { id: 'pos', icon: '🏪', title: 'POS & retail outlets', sub: 'Point-of-sale tied directly to inventory and finance' },
  ],
  platform_arch_layers: [
    { id: 'finance-people', accent: 'var(--color-primary)', icon: '💼', brand: 'Finance & People', tag: 'Core business layer', items: 'Financials, HR & Payroll, Projects, Tax & compliance' },
    { id: 'supply-chain', accent: '#0E8F84', icon: '📦', brand: 'Supply Chain', tag: 'Source to fulfil', items: 'Inventory, Procurement, Manufacturing, Fleet' },
    { id: 'operations-insight', accent: 'var(--color-accent)', icon: '📊', brand: 'Operations & Insight', tag: 'Run & report', items: 'Sales & CRM, Operations, POS & Retail, Business Intelligence' },
  ],
  platform_arch_customer360_items: [
    { id: 'financials', icon: '💰', label: 'Financials' },
    { id: 'hr-payroll', icon: '👥', label: 'HR & Payroll' },
    { id: 'inventory', icon: '📦', label: 'Inventory' },
    { id: 'procurement', icon: '🛒', label: 'Procurement' },
    { id: 'sales-crm', icon: '📈', label: 'Sales & CRM' },
    { id: 'operations', icon: '⚙️', label: 'Operations' },
    { id: 'fleet', icon: '🚛', label: 'Fleet' },
    { id: 'manufacturing', icon: '🏭', label: 'Manufacturing' },
    { id: 'pos-retail', icon: '🏪', label: 'POS & Retail' },
    { id: 'bi', icon: '📊', label: 'BI & Dashboards' },
    { id: 'projects', icon: '📋', label: 'Projects' },
  ],
  platform_arch_data360_items: [
    { id: 'ledger', icon: '📒', label: 'Unified ledger' },
    { id: 'master', icon: '🗄️', label: 'Master data' },
    { id: 'workflows', icon: '🔄', label: 'Workflows' },
    { id: 'reporting', icon: '📑', label: 'Reporting engine' },
    { id: 'audit', icon: '🔍', label: 'Audit trail' },
    { id: 'multi-currency', icon: '💱', label: 'Multi-currency' },
    { id: 'multi-company', icon: '🏢', label: 'Multi-company' },
    { id: 'security', icon: '🔐', label: 'Role-based access' },
  ],
  platform_arch_providers: [
    { id: 'cloud', label: 'Cloud hosted' },
    { id: 'on-prem', label: 'On-premise' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'africa', label: 'Africa-ready' },
    { id: 'compliance', label: 'Statutory compliance' },
  ],
};

export const MARMIDON_NAV_LINKS = [
  { id: 'solutions', labelKey: 'solutions', path: '/solutions' },
  { id: 'support', labelKey: 'support', path: '/contact' },
  { id: 'events', labelKey: 'events', path: '/events' },
  { id: 'customerStories', labelKey: 'customerStories', path: '/customers' },
  { id: 'about', labelKey: 'about', path: '/company/about' },
];

export const MARMIDON_ABOUT_OVERRIDES = {
  hero_badge_label: 'About Us',
  hero_cta_primary: 'Get in Touch',
  hero_cta_secondary: 'Request a Demo',
  leadership_subtitle: 'World-class leaders driving Marmidon forward.',
  cta_secondary_button: 'Request a Demo',
};

export const MARMIDON_STORIES_OVERRIDES = {
  carousel_badge: 'Customer Success Stories',
  carousel_title: 'Trusted by organisations across Africa',
  carousel_desc: 'See how manufacturers, retailers, and service firms unified finance and operations with Marmidon ERP.',
  detail_cta_title: 'Ready to write your success story?',
  detail_cta_desc: 'Join organisations achieving remarkable results with Marmidon ERP.',
  detail_cta_primary: 'Request a Demo',
};

/** Full backfill defaults — Marmidon ERP only (no legacy HYSYS/CRM copy). */
export function buildMarmidonTextDefaults() {
  return {
    homepage: {
      ...MARMIDON_HOMEPAGE_OVERRIDES,
      ...MARMIDON_PLATFORM_ARCH_LISTS,
      trusted_by_label: 'Trusted by industry leaders',
      stats_companies: '500+',
      stats_companies_label: 'Organisations trust Marmidon',
      stats_users: '10K+',
      stats_users_label: 'Active users',
      stats_countries: '12+',
      stats_countries_label: 'Countries',
      explore_all_products_label: 'Explore all modules',
      homepage_industries_link_label: 'Learn more',
      demo_what_youll_see: "What you'll see",
      demo_bullets: [
        { id: 'finance', text: 'Finance, inventory, and sales on one platform' },
        { id: 'modules', text: 'Eleven integrated ERP modules' },
        { id: 'sectors', text: 'Sector-fit workflows for your industry' },
        { id: 'bi', text: 'Real-time dashboards and reporting' },
      ],
      product_cards: productCardsForCms(),
      homepage_industries_list: homepageSectorsForCms(),
      analyst_reports: analystReportsForCms(),
      ai_success_cards: aiSuccessCardsForCms(),
    },
    navigation: {
      ...MARMIDON_NAV_OVERRIDES,
      nav_products_label: 'Products',
      nav_view_all: 'View all',
      nav_contact_label: 'Contact',
      nav_signup_label: 'Request a Demo',
      nav_search_placeholder: 'Search modules, solutions…',
      nav_mobile_menu_title: 'Menu',
      nav_mobile_search_placeholder: 'Search…',
      nav_language_active_label: 'Active',
      nav_products: navProductsForCms(),
      nav_links: MARMIDON_NAV_LINKS,
    },
    products: {
      ...MARMIDON_PRODUCTS_OVERRIDES,
      products_grid_badge: 'Our Modules',
      products_grid_title: 'Eleven modules. One ERP platform.',
      products_hero_cta_secondary: 'Contact Sales',
      detail_cta_title: 'Ready to get started?',
      detail_cta_desc: 'Request a demo to see {{name}} in action.',
      detail_cta_secondary: 'View All Products',
      products_list: productsListForCms(),
    },
    global: { ...MARMIDON_GLOBAL_OVERRIDES, card_footer_label: 'Learn more' },
    about: { ...MARMIDON_ABOUT_OVERRIDES },
    stories: { ...MARMIDON_STORIES_OVERRIDES },
  };
}
