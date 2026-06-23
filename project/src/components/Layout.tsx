import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
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
  GraduationCap,
  Stethoscope,
  ShoppingCart,
  Landmark,
  BookOpen,
  Award,
  PlayCircle
} from 'lucide-react';

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
  {
    label: 'Industries',
    path: '/industries',
    items: [
      { icon: Stethoscope, title: 'Healthcare', desc: 'Patient engagement', path: '/industries/healthcare' },
      { icon: GraduationCap, title: 'Education', desc: 'Student success', path: '/industries/education' },
      { icon: Landmark, title: 'Financial Services', desc: 'Client relationships', path: '/industries/financial-services' },
      { icon: ShoppingCart, title: 'Retail', desc: 'Customer experience', path: '/industries/retail' },
    ]
  },
  {
    label: 'Learning',
    path: '/learning',
    items: [
      { icon: BookOpen, title: 'Trailhead', desc: 'Free learning paths', path: '/learning/trailhead' },
      { icon: Award, title: 'Certifications', desc: 'Get certified', path: '/learning/certifications' },
      { icon: PlayCircle, title: 'Webinars', desc: 'Live sessions', path: '/learning/webinars' },
      { icon: FileText, title: 'Documentation', desc: 'Technical docs', path: '/learning/documentation' },
    ]
  },
];

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-white shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${isScrolled || !isHome ? 'text-[#032d60]' : 'text-white'}`}>
                  CloudForce
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
                      className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                        activeDropdown === item.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="p-2">
                        {item.items.map((subItem, idx) => (
                          <Link
                            key={idx}
                            to={subItem.path}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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

                <Link
                  to="/pricing"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  Pricing
                </Link>

                <Link
                  to="/customer-stories"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  Customer Stories
                </Link>

                <Link
                  to="/about"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isScrolled || !isHome
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  About Us
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors ${
                  isScrolled || !isHome ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors ${
                  isScrolled || !isHome ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0b5394] rounded-lg hover:bg-[#032d60] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
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
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.path} className="block py-2 text-gray-900 font-medium">
                    {item.label}
                  </Link>
                </div>
              ))}
              <Link to="/pricing" className="block py-2 text-gray-900 font-medium">Pricing</Link>
              <Link to="/customer-stories" className="block py-2 text-gray-900 font-medium">Customer Stories</Link>
              <Link to="/about" className="block py-2 text-gray-900 font-medium">About Us</Link>
              <Link to="/contact" className="block py-2 text-gray-900 font-medium">Contact Us</Link>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link to="/login" className="block py-2 text-gray-700">Login</Link>
                <Link to="/signup" className="block py-2 px-4 text-center text-white bg-[#0b5394] rounded-lg">
                  Sign Up
                </Link>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CloudForce</span>
              </Link>
              <p className="text-white/60 text-sm mb-6 max-w-xs">
                The world's #1 CRM platform, helping businesses connect with customers and grow.
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
              2026 CloudForce, Inc. All rights reserved.
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
  );
}



