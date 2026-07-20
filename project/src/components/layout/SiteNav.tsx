import { useState, useEffect, useMemo } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {

  Menu,

  X,

  ChevronDown,

  Search,

  Globe,

  Users,

  Shield,

  Cloud,

  Zap,

  MessageSquare,

  ShoppingCart,

  ArrowRight,

  Building2,

  BookOpen,

  Briefcase,

  HeartPulse,

  GraduationCap,

  Landmark,

  ShoppingBag,

  Cpu,

  Factory,

  Building,

  Newspaper,

  HelpCircle,

  FileText,

  CalendarCheck,

  Package,

  TrendingUp,

  Settings,

  Truck,

  Store,

  BarChart3,

  Cog,

  Network,

  UtensilsCrossed,

  Heart,

  HardHat,

  type LucideIcon,

} from 'lucide-react';

import { languages, useTranslation } from '../../lib/i18n';

import { useSiteContent } from '../../hooks/useSiteContent';

import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_NAV_COMPANY, DEFAULT_NAV_RESOURCES } from '../../lib/cms/resourceDefaults';
import { modulesForNav, sectorsForNav, MODULE_NAV_GROUPS } from '../../lib/marmidonCatalog';
import { trackEvent } from '../../lib/analytics/track';

interface NavSubItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  path: string;
  accent: string;
}

interface NavGroup {
  label: string;
  path: string;
  tagline: string;
  columns: 2 | 3;
  items: NavSubItem[];
}



const productIconMap: Record<string, LucideIcon> = {
  Users, Shield, Cloud, Zap, MessageSquare, ShoppingCart,
  Landmark, Package, TrendingUp, Settings, Truck, Factory, Store, BarChart3, Briefcase,
};

const sectorIconMap: Record<string, LucideIcon> = {
  HeartPulse, GraduationCap, Landmark, ShoppingBag, Cpu, Factory, Building,
  Cog, Truck, Network, Briefcase, UtensilsCrossed, Heart, HardHat, Newspaper,
};

const navResourceIconMap: Record<string, LucideIcon> = {
  Newspaper, BookOpen, HelpCircle, FileText, Building2,
};

const navCompanyIconMap: Record<string, LucideIcon> = {
  Building2, Users, Briefcase, HeartPulse, CalendarCheck, MessageSquare,
};

const defaultNavProducts = modulesForNav();

const defaultSolutions = sectorsForNav();

export function SiteNav() {

  const [isScrolled, setIsScrolled] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const { languageCode, setLanguage, t } = useTranslation();

  const nav = useSiteContent('navigation');
  const contactContent = useSiteContent('contact');

  const location = useLocation();

  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const isHeroNav = isHome && !isScrolled;



  const productsLabel = nav.getContent('nav_products_label', t('products'));

  const solutionsLabel = nav.getContent('nav_solutions_label', 'Solutions');

  const resourcesLabel = nav.getContent('nav_resources_label', 'Resources');

  const companyLabel = nav.getContent('nav_company_label', 'Company');



  const navGroups: NavGroup[] = useMemo(() => {

    const products = mergeCmsList(nav.getContentRaw('nav_products') as typeof defaultNavProducts | null, defaultNavProducts)

      .map((item: any) => ({ icon: productIconMap[String(item.iconName)] || Users, title: item.title, desc: item.desc, path: item.path, accent: item.accent }));



    return [

      {

        label: productsLabel,

        path: '/products',

        tagline: nav.getContent('nav_products_tagline', 'Eleven integrated modules. One unified ERP platform.'),

        columns: 3 as const,

        items: products,

      },

      {

        label: solutionsLabel,

        path: '/solutions',

        tagline: nav.getContent('nav_solutions_tagline', 'Tailored solutions for every industry.'),

        columns: 3 as const,

        items: mergeCmsList(nav.getContentRaw('nav_solutions') as typeof defaultSolutions | null, defaultSolutions)
          .map((item: any) => ({ icon: sectorIconMap[String(item.iconName)] || Building2, title: item.title, desc: item.desc, path: item.path, accent: item.accent })),

      },

      {

        label: resourcesLabel,

        path: '/resources',

        tagline: nav.getContent('nav_resources_tagline', 'Learn, explore, and grow with Marmidon.'),

        columns: 2 as const,

        items: mergeCmsList(nav.getContentRaw('nav_resources') as typeof DEFAULT_NAV_RESOURCES | null, DEFAULT_NAV_RESOURCES)
          .map((item: any) => ({ icon: navResourceIconMap[String(item.iconName)] || BookOpen, title: item.title, desc: item.desc, path: item.path, accent: item.accent })),

      },

      {

        label: companyLabel,

        path: '/company',

        tagline: nav.getContent('nav_company_tagline', 'Get to know Marmidon Global Solutions.'),

        columns: 2 as const,

        items: mergeCmsList(nav.getContentRaw('nav_company') as typeof DEFAULT_NAV_COMPANY | null, DEFAULT_NAV_COMPANY)
          .map((item: any) => ({ icon: navCompanyIconMap[String(item.iconName)] || Building2, title: item.title, desc: item.desc, path: item.path, accent: item.accent })),

      },

    ];

  }, [nav, productsLabel, solutionsLabel, resourcesLabel, companyLabel]);

  const customersLabel = nav.getContent('nav_customers_label', 'Customers');
  const pricingLabel = nav.getContent('nav_pricing_label', 'Pricing');
  const partnersLabel = nav.getContent('nav_partners_label', 'Partners');

  const flatNavLinks = [
    { label: customersLabel, path: '/customers' },
    { label: pricingLabel, path: '/pricing' },
    { label: partnersLabel, path: '/partners' },
  ];

  const [mobileSection, setMobileSection] = useState<string | null>(productsLabel);

  useEffect(() => { setMobileSection(productsLabel); }, [productsLabel]);



  const isActive = (path: string) => {

    if (path === '/') return location.pathname === '/';

    return location.pathname === path || location.pathname.startsWith(path + '/');

  };



  useEffect(() => {

    const onScroll = () => setIsScrolled(window.scrollY > 12);

    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

    return () => window.removeEventListener('scroll', onScroll);

  }, []);



  useEffect(() => {

    setMobileOpen(false);

    setActiveDropdown(null);

    setSearchOpen(false);

  }, [location.pathname]);



  useEffect(() => {

    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => { document.body.style.overflow = ''; };

  }, [mobileOpen]);



  const handleSearch = () => {

    const q = searchQuery.trim().toLowerCase();

    if (!q) return;

    const routes: Record<string, string> = {
      financials: '/products/financials', finance: '/products/financials',
      payroll: '/products/hr-payroll', hr: '/products/hr-payroll',
      inventory: '/products/inventory', warehouse: '/products/inventory',
      procurement: '/products/procurement', sales: '/products/sales-crm', crm: '/products/sales-crm',
      operations: '/products/operations', fleet: '/products/fleet',
      manufacturing: '/products/manufacturing', pos: '/products/pos-retail', retail: '/solutions/retail',
      bi: '/products/business-intelligence', analytics: '/products/business-intelligence',
      projects: '/products/projects',
      healthcare: '/solutions/healthcare', health: '/solutions/healthcare',
      education: '/solutions/education', wholesale: '/solutions/wholesale',
      distribution: '/solutions/distribution', hospitality: '/solutions/hospitality',
      construction: '/solutions/construction', 'non-profit': '/solutions/non-profit', nonprofit: '/solutions/non-profit',
      'professional services': '/solutions/professional-services', production: '/solutions/production',
      'media publishing': '/solutions/media-publishing', media: '/solutions/media-publishing',
      pricing: '/pricing', plans: '/pricing', cost: '/pricing',
      events: '/events', customers: '/customers', stories: '/customers',
      about: '/company/about', company: '/company', contact: '/contact', support: '/contact',
      products: '/products', industries: '/solutions', solutions: '/solutions',
      documentation: '/documentation', docs: '/documentation',
      blog: '/resources/blog', 'customer stories': '/customers',
      partners: '/partners', careers: '/company/careers', team: '/company/team',
      demo: '/request-a-demo', faq: '/resources/faqs', guides: '/resources/guides',
    };

    for (const [keyword, path] of Object.entries(routes)) {

      if (q.includes(keyword)) { navigate(path); setSearchQuery(''); setSearchOpen(false); return; }

    }

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);

    trackEvent('search_query', { query: searchQuery.trim(), results_path: '/search' });

    setSearchQuery('');

    setSearchOpen(false);

  };



  const navLinkClass = (active: boolean) =>

    `site-nav__link ${active ? 'site-nav__link--active' : ''} ${isHeroNav ? 'site-nav__link--hero' : ''}`;



  const renderMegaItem = (item: NavSubItem, key?: string) => (

    <Link

      key={key ?? item.path}

      to={item.path}

      className="nav-mega-item group"

      onClick={() => setActiveDropdown(null)}

    >

      <div className={`nav-mega-item__icon ring-1 ${item.accent}`}>

        <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />

      </div>

      <div className="nav-mega-item__body min-w-0">

        <span className="nav-mega-item__title">{item.title}</span>

        <span className="nav-mega-item__desc">{item.desc}</span>

      </div>

      <ArrowRight className="nav-mega-item__arrow w-4 h-4 shrink-0" />

    </Link>

  );

  const renderMegaGroup = (group: NavGroup, align: 'start' | 'center' | 'end' = 'center') => (
    <div
      key={group.label}
      className="relative"
      onMouseEnter={() => setActiveDropdown(group.label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link
        to={group.path}
        aria-current={isActive(group.path) ? 'page' : undefined}
        className={navLinkClass(isActive(group.path))}
      >
        {group.label}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
            activeDropdown === group.label ? 'rotate-180' : ''
          }`}
        />
      </Link>
      <div className="site-nav__bridge" aria-hidden />
      <div
        className={`nav-mega-panel ${
          group.columns === 3 ? 'nav-mega-panel--wide' : 'nav-mega-panel--medium'
        } ${align === 'start' ? 'nav-mega-panel--align-start' : ''} ${
          align === 'end' ? 'nav-mega-panel--align-end' : ''
        } ${activeDropdown === group.label ? 'nav-mega-panel--open' : ''}`}
      >
        <div className="nav-mega-panel__header">
          <div>
            <p className="nav-mega-panel__eyebrow">{group.label}</p>
            <p className="nav-mega-panel__tagline">{group.tagline}</p>
          </div>
          <Link
            to={group.path}
            className="nav-mega-panel__view-all"
            onClick={() => setActiveDropdown(null)}
          >
            {nav.getContent('nav_view_all', 'View all')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div
          className={`nav-mega-panel__grid ${
            group.columns === 3 ? 'nav-mega-panel__grid--3' : 'nav-mega-panel__grid--2'
          }`}
        >
          {group.items.map(renderMegaItem)}
        </div>
      </div>
    </div>
  );

  const renderProductsMegaGroup = (group: NavGroup) => {
    const itemsByPath = Object.fromEntries(group.items.map((item) => [item.path, item]));

    return (
      <div
        key={group.label}
        className="relative"
        onMouseEnter={() => setActiveDropdown(group.label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link
          to={group.path}
          aria-current={isActive(group.path) ? 'page' : undefined}
          className={navLinkClass(isActive(group.path))}
        >
          {group.label}
          <ChevronDown
            className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
              activeDropdown === group.label ? 'rotate-180' : ''
            }`}
          />
        </Link>
        <div className="site-nav__bridge" aria-hidden />
        <div
          className={`nav-mega-panel nav-mega-panel--products ${
            activeDropdown === group.label ? 'nav-mega-panel--open' : ''
          }`}
        >
          <div className="nav-mega-panel__header">
            <div>
              <p className="nav-mega-panel__eyebrow">{group.label}</p>
              <p className="nav-mega-panel__tagline">{group.tagline}</p>
            </div>
            <Link
              to={group.path}
              className="nav-mega-panel__view-all"
              onClick={() => setActiveDropdown(null)}
            >
              {nav.getContent('nav_view_all', 'View all')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="nav-mega-products-layout">
            {MODULE_NAV_GROUPS.map((column) => (
              <div key={column.label} className="nav-mega-products-col">
                <p className="nav-mega-products-col__label">{column.label}</p>
                <div className="nav-mega-products-col__items">
                  {column.slugs.map((slug) => {
                    const item = itemsByPath[`/products/${slug}`];
                    if (!item) return null;
                    return renderMegaItem(item, slug);
                  })}
                </div>
              </div>
            ))}
            <aside className="nav-mega-promo">
              <p className="nav-mega-promo__eyebrow">Get started</p>
              <h3 className="nav-mega-promo__title">See Marmidon live</h3>
              <p className="nav-mega-promo__desc">Book a demo tailored to your modules and industry.</p>
              <Link
                to="/request-a-demo"
                className="nav-mega-promo__cta"
                onClick={() => setActiveDropdown(null)}
              >
                Request a Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    );
  };

  const renderFlatLink = (link: { label: string; path: string }) => (
    <Link
      key={link.path}
      to={link.path}
      aria-current={isActive(link.path) ? 'page' : undefined}
      className={`${navLinkClass(isActive(link.path))} site-nav__link--flat`}
    >
      {link.label}
    </Link>
  );

  const supportPhone = contactContent.getContent('phone_numbers', '0782-602854').split('\n')[0]?.trim() || '0782-602854';
  const phoneDigits = supportPhone.replace(/[^\d+]/g, '');
  const phoneHref = phoneDigits.startsWith('+') ? `tel:${phoneDigits}` : `tel:+256${phoneDigits.replace(/^0/, '')}`;
  const contactLabel = nav.getContentAny(['nav_contact_sales_label', 'nav_contact_label'], 'Contact Sales');

  return (

    <header

      className={`site-nav ${isHeroNav ? 'site-nav--hero' : 'site-nav--solid'} ${isScrolled && !isHeroNav ? 'site-nav--scrolled' : ''}`}

    >

      <div className="site-nav__inner">

        <Link to="/" className="site-nav__brand shrink-0" aria-label="Marmidon home">

          <img src="/Mavy%20logo3.svg" alt="Marmidon" className="site-nav__logo" />

        </Link>



        <nav className="site-nav__primary-nav" aria-label="Primary">
          {navGroups[0] && renderProductsMegaGroup(navGroups[0])}
          {navGroups[1] && renderMegaGroup(navGroups[1], 'start')}
          {renderFlatLink(flatNavLinks[0])}
          {navGroups[2] && renderMegaGroup(navGroups[2], 'end')}
          {renderFlatLink(flatNavLinks[1])}
          {renderFlatLink(flatNavLinks[2])}
          {navGroups[3] && renderMegaGroup(navGroups[3], 'end')}
        </nav>



        <div className="site-nav__actions">

          <div className={`site-nav__search ${searchOpen ? 'site-nav__search--open' : ''}`}>

            {searchOpen ? (

              <>

                <Search className="w-4 h-4 text-slate-400 shrink-0" />

                <input

                  type="search"

                  autoFocus

                  value={searchQuery}

                  onChange={(e) => setSearchQuery(e.target.value)}

                  onKeyDown={(e) => {

                    if (e.key === 'Enter') handleSearch();

                    if (e.key === 'Escape') setSearchOpen(false);

                  }}

                  placeholder={nav.getContent('nav_search_placeholder', 'Search products, industries…')}

                  className="site-nav__search-input"

                />

                <button

                  type="button"

                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}

                  className="site-nav__search-close"

                  aria-label="Close search"

                >

                  <X className="w-4 h-4" />

                </button>

              </>

            ) : (

              <button

                type="button"

                onClick={() => setSearchOpen(true)}

                className="site-nav__icon-btn"

                aria-label="Open search"

              >

                <Search className="w-[18px] h-[18px]" />

              </button>

            )}

          </div>



          <div

            className="relative"

            onMouseEnter={() => setActiveDropdown('language')}

            onMouseLeave={() => setActiveDropdown(null)}

          >

            <button type="button" className="site-nav__lang-btn">

              <Globe className="w-4 h-4 opacity-70" />

              <span>{languageCode.toUpperCase()}</span>

              <ChevronDown

                className={`w-3 h-3 opacity-50 transition-transform ${

                  activeDropdown === 'language' ? 'rotate-180' : ''

                }`}

              />

            </button>

            <div className="site-nav__bridge site-nav__bridge--narrow" aria-hidden />

            <div className={`nav-lang-panel ${activeDropdown === 'language' ? 'nav-lang-panel--open' : ''}`}>

              {languages.map((lang) => (

                <button

                  key={lang.code}

                  type="button"

                  onClick={() => setLanguage(lang)}

                  className={`nav-lang-item ${languageCode === lang.code ? 'nav-lang-item--active' : ''}`}

                >

                  <span>{lang.label}</span>

                  {languageCode === lang.code && (

                    <span className="nav-lang-item__badge">{nav.getContent('nav_language_active_label', 'Active')}</span>

                  )}

                </button>

              ))}

            </div>

          </div>



          <div className="site-nav__divider" aria-hidden />



          <div className="site-nav__contact-stack">
            <Link to="/contact" className={`site-nav__text-link ${isHeroNav ? 'site-nav__text-link--hero' : ''}`}>
              {contactLabel}
            </Link>
            <a
              href={phoneHref}
              className={`site-nav__text-link site-nav__phone-link ${isHeroNav ? 'site-nav__text-link--hero' : ''}`}
            >
              {supportPhone}
            </a>
          </div>

          <Link to="/request-a-demo" className="site-nav__cta">
            {nav.getContent('nav_demo_label', 'Request a Demo')}
          </Link>

        </div>



        <button

          type="button"

          onClick={() => setMobileOpen(!mobileOpen)}

          className={`xl:hidden site-nav__menu-btn ${isHeroNav ? 'site-nav__menu-btn--hero' : ''}`}

          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}

          aria-expanded={mobileOpen}

        >

          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}

        </button>

      </div>



      {mobileOpen && (

        <>

          <div className="site-nav__overlay xl:hidden" onClick={() => setMobileOpen(false)} aria-hidden />

          <div className="site-nav__drawer xl:hidden">

            <div className="site-nav__drawer-header">

              <div>

                <p className="text-base font-semibold text-slate-900">{nav.getContent('nav_mobile_menu_title', 'Menu')}</p>

                <p className="text-xs text-slate-500 mt-0.5">{nav.getContent('nav_mobile_menu_subtitle', 'Explore Marmidon products & services')}</p>

              </div>

              <button

                type="button"

                onClick={() => setMobileOpen(false)}

                className="site-nav__drawer-close"

                aria-label="Close menu"

              >

                <X className="w-5 h-5" />

              </button>

            </div>



            <div className="site-nav__drawer-search">

              <Search className="w-4 h-4 text-slate-400 shrink-0" />

              <input

                type="search"

                value={searchQuery}

                onChange={(e) => setSearchQuery(e.target.value)}

                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}

                placeholder={nav.getContent('nav_mobile_search_placeholder', 'Search…')}

                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"

              />

            </div>



            <div className="site-nav__drawer-body">

              {navGroups.slice(0, 2).map((group) => (

                <div key={group.label} className="nav-mobile-section">

                  <button

                    type="button"

                    className="nav-mobile-section__trigger"

                    onClick={() => setMobileSection(mobileSection === group.label ? null : group.label)}

                    aria-expanded={mobileSection === group.label}

                  >

                    <span>{group.label}</span>

                    <ChevronDown

                      className={`w-4 h-4 text-slate-400 transition-transform ${

                        mobileSection === group.label ? 'rotate-180' : ''

                      }`}

                    />

                  </button>

                  {mobileSection === group.label && (

                    <div className="nav-mobile-section__content">

                      {group.label === productsLabel ? (
                        MODULE_NAV_GROUPS.map((column) => {
                          const itemsByPath = Object.fromEntries(group.items.map((item) => [item.path, item]));
                          return (
                            <div key={column.label} className="nav-mobile-products-group">
                              <p className="nav-mobile-products-group__label">{column.label}</p>
                              {column.slugs.map((slug) => {
                                const item = itemsByPath[`/products/${slug}`];
                                if (!item) return null;
                                return (
                                  <Link key={item.path} to={item.path} className="nav-mobile-link nav-mobile-link--compact">
                                    <div className={`nav-mega-item__icon ring-1 ${item.accent}`}>
                                      <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="text-sm font-medium text-slate-900">{item.title}</div>
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        })
                      ) : (
                        group.items.map((item) => (
                          <Link key={item.path} to={item.path} className="nav-mobile-link">
                            <div className={`nav-mega-item__icon ring-1 ${item.accent}`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{item.title}</div>
                              <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                          </Link>
                        ))
                      )}

                      <Link to={group.path} className="nav-mobile-view-all">

                        {nav.getContent('nav_view_all', 'View all')} {group.label.toLowerCase()}

                        <ArrowRight className="w-3.5 h-3.5" />

                      </Link>

                    </div>

                  )}

                </div>

              ))}

              <div className="nav-mobile-flat-links px-4 py-2 space-y-1 border-b border-slate-100">
                {flatNavLinks.slice(0, 1).map((link) => (
                  <Link key={link.path} to={link.path} className="block py-2 text-sm font-medium text-slate-900">
                    {link.label}
                  </Link>
                ))}
              </div>

              {navGroups.slice(2, 3).map((group) => (
                <div key={group.label} className="nav-mobile-section">
                  <button
                    type="button"
                    className="nav-mobile-section__trigger"
                    onClick={() => setMobileSection(mobileSection === group.label ? null : group.label)}
                    aria-expanded={mobileSection === group.label}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        mobileSection === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSection === group.label && (
                    <div className="nav-mobile-section__content">
                      {group.items.map((item) => (
                        <Link key={item.path} to={item.path} className="nav-mobile-link">
                          <div className={`nav-mega-item__icon ring-1 ${item.accent}`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                      <Link to={group.path} className="nav-mobile-view-all">
                        {nav.getContent('nav_view_all', 'View all')} {group.label.toLowerCase()}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <div className="nav-mobile-flat-links px-4 py-2 space-y-1 border-b border-slate-100">
                {flatNavLinks.slice(1).map((link) => (
                  <Link key={link.path} to={link.path} className="block py-2 text-sm font-medium text-slate-900">
                    {link.label}
                  </Link>
                ))}
              </div>

              {navGroups.slice(3).map((group) => (
                <div key={group.label} className="nav-mobile-section">
                  <button
                    type="button"
                    className="nav-mobile-section__trigger"
                    onClick={() => setMobileSection(mobileSection === group.label ? null : group.label)}
                    aria-expanded={mobileSection === group.label}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        mobileSection === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSection === group.label && (
                    <div className="nav-mobile-section__content">
                      {group.items.map((item) => (
                        <Link key={item.path} to={item.path} className="nav-mobile-link">
                          <div className={`nav-mega-item__icon ring-1 ${item.accent}`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                      <Link to={group.path} className="nav-mobile-view-all">
                        {nav.getContent('nav_view_all', 'View all')} {group.label.toLowerCase()}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <div className="nav-mobile-section">

                <button

                  type="button"

                  className="nav-mobile-section__trigger"

                  onClick={() => setMobileSection(mobileSection === 'Language' ? null : 'Language')}

                  aria-expanded={mobileSection === 'Language'}

                >

                  <span className="flex items-center gap-2">

                    <Globe className="w-4 h-4 text-slate-400" />

                    Language — {languageCode.toUpperCase()}

                  </span>

                  <ChevronDown

                    className={`w-4 h-4 text-slate-400 transition-transform ${

                      mobileSection === 'Language' ? 'rotate-180' : ''

                    }`}

                  />

                </button>

                {mobileSection === 'Language' && (

                  <div className="nav-mobile-section__content nav-mobile-section__content--grid">

                    {languages.map((lang) => (

                      <button

                        key={lang.code}

                        type="button"

                        onClick={() => setLanguage(lang)}

                        className={`nav-mobile-lang ${languageCode === lang.code ? 'nav-mobile-lang--active' : ''}`}

                      >

                        {lang.label}

                      </button>

                    ))}

                  </div>

                )}

              </div>

            </div>

            <div className="site-nav__drawer-footer">

              <div className="site-nav__drawer-contact-stack col-span-2">
                <Link to="/contact" className="site-nav__drawer-contact">
                  {contactLabel}
                </Link>
                <a href={phoneHref} className="site-nav__drawer-contact site-nav__drawer-phone">
                  {supportPhone}
                </a>
              </div>

              <Link to="/request-a-demo" className="site-nav__drawer-cta col-span-2">
                {nav.getContent('nav_demo_label', 'Request a Demo')}
              </Link>

            </div>

          </div>

        </>

      )}

    </header>

  );

}
