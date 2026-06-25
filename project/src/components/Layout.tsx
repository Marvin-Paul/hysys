import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Globe,
  Users,
  Shield,
  Cloud,
  Zap,
  MessageSquare,
  FileText,
  Sparkles,
  Building2,
  TrendingUp,
  Heart,
  ShoppingCart,
  Landmark,
  BookOpen
} from 'lucide-react';
import { languages, translations, TranslationContext, Language } from '../lib/i18n';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  {
    label: 'Products',
    path: '/products',
    items: [
      { icon: Users, title: 'Sales Cloud', desc: 'CRM Platform', path: '/products/sales-cloud' },
      { icon: MessageSquare, title: 'Service Cloud', desc: 'Customer Service', path: '/products/service-cloud' },
      { icon: Zap, title: 'Marketing Cloud', desc: 'Digital Marketing', path: '/products/marketing-cloud' },
      { icon: ShoppingCart, title: 'Commerce Cloud', desc: 'E-Commerce', path: '/products/commerce-cloud' },
      { icon: Cloud, title: 'Data Cloud', desc: 'Data Platform', path: '/products/data-cloud' },
      { icon: Shield, title: 'Platform Cloud', desc: 'Admin & Automation', path: '/products/platform-cloud' },
    ]
  },
  {
    label: 'Solutions',
    path: '/solutions',
    items: [
      { icon: Building2, title: 'Small Business', desc: 'Grow faster', path: '/solutions/small-business' },
      { icon: TrendingUp, title: 'Enterprise', desc: 'Scale operations', path: '/solutions/enterprise' },
      { icon: Sparkles, title: 'Startups', desc: 'Launch strong', path: '/solutions/startups' },
      { icon: Heart, title: 'Nonprofits', desc: 'Amplify impact', path: '/solutions/nonprofits' },
    ]
  },
];

const moreItems = [
  { icon: Landmark, title: 'Industries', desc: 'Solutions by sector', path: '/industries' },
  { icon: BookOpen, title: 'Learning', desc: 'Training and resources', path: '/learning' },
  { icon: FileText, title: 'Pricing', desc: 'Plans and packages', path: '/pricing' },
  { icon: Sparkles, title: 'Customer Stories', desc: 'Success stories', path: '/customer-stories' },
  { icon: Building2, title: 'About', desc: 'Company overview', path: '/about' },
];

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageCode, setLanguageCode] = useState<string>(() => {
    const savedLang = window.localStorage.getItem('hysys-language');
    return savedLang || languages[0].code;
  });
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const savedLang = window.localStorage.getItem('hysys-language');
    if (savedLang) {
      const lang = languages.find((item) => item.code === savedLang);
      if (lang) setLanguageCode(lang.code);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('hysys-language', languageCode);
    document.documentElement.lang = languageCode;
  }, [languageCode]);

  const setLanguage = (lang: Language) => {
    setLanguageCode(lang.code);
  };

  const t = (key: string) => translations[languageCode]?.[key] ?? translations.en[key] ?? key;

  return (
    <TranslationContext.Provider value={{ languageCode, setLanguage, t }}>
      <div className="min-h-screen flex flex-col">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled || !isHome
              ? 'bg-white shadow-lg border-b border-gray-100'
              : 'bg-transparent'
          }`}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <img src="/Mavy%20logo2.png" alt="HYSYS logo" className="w-[100px] h-[72px] sm:w-[120px] sm:h-[86px] lg:w-[140px] lg:h-[100px] object-cover" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isScrolled || !isHome
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  <div
                    className={`absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {item.items.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.path}
                          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            <subItem.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{subItem.title}</div>
                            <div className="text-sm text-gray-500">{subItem.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                      <Link to={item.path} className="flex items-center gap-2 text-sm font-medium text-[#0b5394] hover:text-[#032d60]">
                        View all {item.label.toLowerCase()} <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('More')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === 'More' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                    activeDropdown === 'More'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="p-3 space-y-1">
                    {moreItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center text-white">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('language')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white/95 transition-colors ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Globe className="w-4 h-4 text-gray-500" />
                  {languageCode.toUpperCase()}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === 'language' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                    activeDropdown === 'language'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="p-2 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                          languageCode === lang.code ? 'bg-slate-100 text-slate-900' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {languageCode === lang.code && <span className="text-xs text-[#0b5394]">Selected</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/95 px-4 py-2 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask Hysys AI anything"
                  className="w-56 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors ${
                  isScrolled || !isHome ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Contact
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0b5394] rounded-full hover:bg-[#032d60] transition-all hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled || !isHome ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled || !isHome ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">Navigation</div>
                  <div className="text-sm text-gray-500">Explore HYSYS products and services</div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full bg-gray-100 text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Language</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`rounded-2xl px-3 py-2 text-sm text-left transition ${
                        languageCode === lang.code
                          ? 'bg-[#0b5394] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-gray-100 rounded-3xl p-3">
                <Link to="/industries" className="flex items-center justify-between text-gray-900 font-semibold py-2">
                  Industries
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
                <div className="mt-2 space-y-2 pl-3">
                  <Link to="/industries/healthcare" className="block text-sm text-gray-600 hover:text-gray-900">Healthcare</Link>
                  <Link to="/industries/education" className="block text-sm text-gray-600 hover:text-gray-900">Education</Link>
                  <Link to="/industries/financial-services" className="block text-sm text-gray-600 hover:text-gray-900">Financial Services</Link>
                  <Link to="/industries/retail" className="block text-sm text-gray-600 hover:text-gray-900">Retail</Link>
                </div>
              </div>

              <div className="border border-gray-100 rounded-3xl p-3">
                <Link to="/learning" className="flex items-center justify-between text-gray-900 font-semibold py-2">
                  Learning
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
                <div className="mt-2 space-y-2 pl-3">
                  <Link to="/learning/trailhead" className="block text-sm text-gray-600 hover:text-gray-900">Trailhead</Link>
                  <Link to="/learning/certifications" className="block text-sm text-gray-600 hover:text-gray-900">Certifications</Link>
                  <Link to="/learning/webinars" className="block text-sm text-gray-600 hover:text-gray-900">Webinars</Link>
                  <Link to="/learning/documentation" className="block text-sm text-gray-600 hover:text-gray-900">Documentation</Link>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                {moreItems.map((item) => (
                  <Link key={item.title} to={item.path} className="block text-gray-900 font-medium">{item.title}</Link>
                ))}
                <Link to="/contact" className="block text-gray-900 font-medium">Contact</Link>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link to="/signup" className="block py-3 text-center text-white bg-[#0b5394] rounded-xl hover:bg-[#032d60]">Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#032d60] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/Mavy%20logo2.png" alt="HYSYS logo" className="w-[110px] h-[79px] object-cover" />
                <span className="text-xl font-bold">HYSYS GLOBAL SOLUTIONS LIMITED</span>
              </Link>
              <p className="text-white/60 text-sm mb-6 max-w-xs">
                Plot 19 Sir Albert Cook Road, MENGO - KAMPALA
                <br />P.O.Box 16435 K'la
                <br />Tel: 0782-602854 · 0752602857 · 0757 602854
                <br />Email: <a href="mailto:info@hysysglobal.com" className="text-white/80 underline">info@hysysglobal.com</a>
                <br />Website: <a href="https://www.hysysglobal.com" className="text-white/80 underline">www.hysysglobal.com</a>
              </p>
              <div className="flex gap-4">
                {['T', 'L', 'F'].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-sm font-semibold"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/products/sales-cloud" className="text-white/60 text-sm hover:text-white">Sales Cloud</Link></li>
                <li><Link to="/products/service-cloud" className="text-white/60 text-sm hover:text-white">Service Cloud</Link></li>
                <li><Link to="/products/marketing-cloud" className="text-white/60 text-sm hover:text-white">Marketing Cloud</Link></li>
                <li><Link to="/products/commerce-cloud" className="text-white/60 text-sm hover:text-white">Commerce Cloud</Link></li>
                <li><Link to="/products/data-cloud" className="text-white/60 text-sm hover:text-white">Data Cloud</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link to="/solutions/small-business" className="text-white/60 text-sm hover:text-white">Small Business</Link></li>
                <li><Link to="/solutions/enterprise" className="text-white/60 text-sm hover:text-white">Enterprise</Link></li>
                <li><Link to="/solutions/startups" className="text-white/60 text-sm hover:text-white">Startups</Link></li>
                <li><Link to="/solutions/nonprofits" className="text-white/60 text-sm hover:text-white">Nonprofits</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/learning/trailhead" className="text-white/60 text-sm hover:text-white">Trailhead</Link></li>
                <li><Link to="/learning/certifications" className="text-white/60 text-sm hover:text-white">Certifications</Link></li>
                <li><Link to="/learning/webinars" className="text-white/60 text-sm hover:text-white">Webinars</Link></li>
                <li><Link to="/learning/documentation" className="text-white/60 text-sm hover:text-white">Docs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/60 text-sm hover:text-white">About Us</Link></li>
                <li><Link to="/customer-stories" className="text-white/60 text-sm hover:text-white">Customer Stories</Link></li>
                <li><Link to="/contact" className="text-white/60 text-sm hover:text-white">Contact</Link></li>
                <li><Link to="/pricing" className="text-white/60 text-sm hover:text-white">Pricing</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              2026 HYSYS GLOBAL SOLUTIONS LIMITED. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 text-sm hover:text-white">Privacy</a>
              <a href="#" className="text-white/60 text-sm hover:text-white">Terms</a>
              <a href="#" className="text-white/60 text-sm hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </TranslationContext.Provider>
  );
}



