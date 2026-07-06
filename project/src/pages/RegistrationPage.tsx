import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle, ChevronDown, Search, User,
  Building, Users, Mail, Phone, Globe, Briefcase, ExternalLink,
  Menu, X, Sparkles, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { SEO } from '../components/SEO';
import { Chatbot } from '../components/Chatbot';

const COMPANY_SIZES = [
  '1-20 employees', '21-50 employees', '51-200 employees',
  '201-500 employees', '501-1000 employees', '1000+ employees',
];

const COUNTRIES = [
  'Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan',
  'Nigeria', 'South Africa', 'Ghana', 'Ethiopia', 'United Kingdom',
  'United States', 'Canada', 'Germany', 'France', 'India', 'Other',
];

const JOB_TITLES = [
  'Software Developer', 'CEO / Founder', 'CTO / VP Engineering',
  'Sales Director', 'Marketing Manager', 'IT Manager',
  'Product Manager', 'Operations Manager', 'Other',
];

const rightFeatures = [
  {
    icon: User,
    title: 'Talk to Sales',
    desc: 'Connect with our enterprise team to build a tailored solution for your business.',
    linkText: 'Contact Hysys Sales',
    linkTo: '/contact',
  },
  {
    icon: Sparkles,
    title: 'See Hysys AI in Action',
    desc: 'Deploy intelligent automation and manage enterprise-grade AI agents at scale.',
    linkText: 'Explore AI Solutions',
    linkTo: '/solutions/enterprise',
  },
  {
    icon: Users,
    title: 'Connect Workspace: Your Ultimate Teammate',
    desc: 'Bring your teams together. Centralize communication and automate tasks in one secure place.',
    linkText: 'Discover Connect Workspace',
    linkTo: '/products/platform-cloud',
  },
  {
    icon: Globe,
    title: 'Guided Platform Tour',
    desc: 'Experience the full capabilities of our technology stack through a hands-on walk-through.',
    linkText: 'Start Product Tour',
    linkTo: '/learning/trailhead',
  },
];

const searchRoutes: Record<string, string> = {
  'sales': '/products/sales-cloud', 'sales cloud': '/products/sales-cloud',
  'service': '/products/service-cloud', 'service cloud': '/products/service-cloud',
  'marketing': '/products/marketing-cloud', 'marketing cloud': '/products/marketing-cloud',
  'commerce': '/products/commerce-cloud', 'commerce cloud': '/products/commerce-cloud',
  'data': '/products/data-cloud', 'data cloud': '/products/data-cloud',
  'platform': '/products/platform-cloud', 'platform cloud': '/products/platform-cloud',
  'small business': '/solutions/small-business', 'enterprise': '/solutions/enterprise',
  'startups': '/solutions/startups', 'nonprofits': '/solutions/nonprofits',
  'healthcare': '/industries/healthcare', 'education': '/industries/education',
  'financial services': '/industries/financial-services', 'retail': '/industries/retail',
  'pricing': '/pricing', 'about': '/about', 'contact': '/contact',
  'trailhead': '/learning/trailhead', 'certifications': '/learning/certifications',
  'webinars': '/learning/webinars', 'documentation': '/learning/documentation',
};

export function RegistrationPage() {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const route = searchRoutes[q] || (q.includes(' ') ? searchRoutes[q.split(' ')[0]] : null);
    if (route) navigate(route);
  };

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    jobTitle: 'Software Developer',
    company: '',
    companySize: '1-20 employees',
    country: 'Uganda',
    email: '',
    phone: '',
    password: '',
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const isValid = (field: string) => {
    const v = form[field as keyof typeof form];
    return typeof v === 'string' && v.length > 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }
    setLoading(true);
    const { error: signupError } = await signUpWithEmail(
      form.email.includes('@') ? form.email : `${form.email}@temp.com`,
      form.password || 'TempPass123!',
      {
        first_name: form.firstName,
        last_name: form.lastName,
        company: form.company,
        job_title: form.jobTitle,
        company_size: form.companySize,
        country: form.country,
        phone: form.phone,
      }
    );
    setLoading(false);
    if (signupError) {
      setError(signupError.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#032d60] to-[#0b5394] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">You're all set!</h1>
            <p className="text-gray-600 mb-2">Check your email to verify your account.</p>
            <p className="text-sm text-gray-500 mb-8">We sent a confirmation link to <strong>{form.email}</strong></p>
            <Link to="/login" className="block w-full py-3 bg-[#0b5394] text-white rounded-lg font-semibold hover:bg-[#032d60] transition-all text-center">
              Go to Sign In
            </Link>
            <Link to="/" className="block mt-4 text-sm text-[#0b5394] hover:underline">← Back to home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Start Your Free Trial" description="Try Hysys Global Solutions Limited for free. No credit card required. Complete the form to start your free trial." />
      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/Mavy%20logo2.png" alt="HYSYS" className="w-10 h-10 rounded object-cover" />
              <span className="text-sm font-bold text-gray-900 hidden sm:inline">HYSYS GLOBAL SOLUTIONS</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <NavDropdown label="Products" />
              <NavDropdown label="Industries" />
              <NavDropdown label="Customers" />
              <NavDropdown label="More" />

              <div className="relative ml-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-[#0b5394]" onClick={handleSearch} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ask Hysys anything..."
                  className="w-56 pl-9 pr-3 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none bg-gray-50"
                />
              </div>

              <Link to="/login" className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0b5394] transition-colors flex items-center gap-1.5">
                <User className="w-4 h-4" /> Login
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <Link to="/login" className="block py-2 text-gray-700 font-medium">Login</Link>
            <Link to="/products" className="block py-2 text-gray-700 font-medium">Products</Link>
            <Link to="/industries" className="block py-2 text-gray-700 font-medium">Industries</Link>
            <Link to="/customer-stories" className="block py-2 text-gray-700 font-medium">Customers</Link>
            <Link to="/pricing" className="block py-2 text-gray-700 font-medium">Pricing</Link>
          </div>
        )}
      </nav>

      {/* ── Two-Column Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-5 gap-8 xl:gap-12">

          {/* ── LEFT: Registration Form (3/5) ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/Mavy%20logo2.png" alt="HYSYS" className="w-12 h-12 rounded-xl object-cover shadow" />
                  <div>
                    <p className="text-xs font-bold text-[#0b5394] uppercase tracking-widest">HYSYS Global Solutions</p>
                    <p className="text-xs text-gray-400">Enterprise CRM Platform</p>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  Start Your Free 14-Day Trial
                </h1>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  No credit card required. No software to install. Full platform access from day one.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {['✓ Free for 14 days','✓ Dedicated onboarding','✓ Cancel anytime'].map(b => (
                    <span key={b} className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First Name" value={form.firstName} onChange={(v) => update('firstName', v)} valid={isValid('firstName')} required />
                  <Field label="Last Name" value={form.lastName} onChange={(v) => update('lastName', v)} valid={isValid('lastName')} required />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Job Title"
                    value={form.jobTitle}
                    onChange={(v) => update('jobTitle', v)}
                    options={JOB_TITLES}
                    icon={Briefcase}
                  />
                  <Field label="Company" value={form.company} onChange={(v) => update('company', v)} valid={isValid('company')} required icon={Building} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <SelectField label="Company Size" value={form.companySize} onChange={(v) => update('companySize', v)} options={COMPANY_SIZES} icon={Users} />
                  <SelectField label="Country / Region" value={form.country} onChange={(v) => update('country', v)} options={COUNTRIES} icon={Globe} />
                </div>

                <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} valid={isValid('email')} required icon={Mail} />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} valid={isValid('phone')} required icon={Phone} />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Create a password (min 6 characters)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none text-sm transition-all"
                    required
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0b5394] focus:ring-[#0b5394] cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#0b5394] hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-[#0b5394] hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading || !agreeTerms}
                  className="w-full py-4 bg-[#0b5394] text-white rounded-xl font-bold hover:bg-[#032d60] transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base mt-2 flex items-center justify-center gap-2 tracking-wide"
                >
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating account...</>
                  ) : (
                    'Start My Free Trial →'
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-2">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>

              <div className="mt-6">
                <div className="relative flex items-center">
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="px-4 text-xs text-gray-400 bg-white">Or sign up with</span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => signInWithGoogle()}
                    disabled={googleLoading}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
                  >
                    {googleLoading ? (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.23v2.84C4.13 20.46 7.82 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.23C1.18 8.88.68 10.87.68 12s.5 3.12 1.56 4.93l2.99-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.19 15.02 1 12 1 7.82 1 4.13 3.48 2.23 7.07l3.61 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.03-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.404-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.44-4.492 2.573-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.803-3.532 1.815-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                    </svg>
                    Apple
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0b5394] font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>

          {/* ── RIGHT: Feature & Support Grid (2/5) ── */}
          <div className="lg:col-span-2 space-y-6">
            {rightFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0b5394] to-[#00a3e0] flex items-center justify-center mb-4">
                  <feat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{feat.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{feat.desc}</p>
                <Link
                  to={feat.linkTo}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b5394] hover:text-[#032d60] transition-colors group"
                >
                  {feat.linkText}
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#032d60] to-[#0b5394] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Free 14-Day Trial</h4>
                  <p className="text-white/70 text-xs">No credit card required</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                {['Full platform access', 'Dedicated support', 'No setup fees', 'Cancel anytime'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      <Chatbot />
    </div>
  );
}

/* ── Sub-components ── */

function Field({
  label, value, onChange, valid, required, type, icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  valid?: boolean; required?: boolean; type?: string; icon?: typeof Building;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && ' *'}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
        <input
          type={type || 'text'} required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-10 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none transition-all ${
            valid ? 'border-green-400 bg-green-50/30' : 'border-gray-300'
          }`}
        />
        {valid && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; icon?: typeof Building;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#0b5394] focus:border-transparent outline-none appearance-none bg-white cursor-pointer transition-all`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function NavDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0b5394] rounded-lg hover:bg-gray-50 transition-colors">
      {label}
      <ChevronDown className="w-3.5 h-3.5" />
    </button>
  );
}
