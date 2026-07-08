import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { Layout } from './components/Layout';
import { SiteContentProvider } from './hooks/useSiteContent';

/* ── Lazy public pages ── */
const HomePage             = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage         = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage    = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductDetailPage })));
const SolutionsPage        = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const SolutionDetailPage   = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionDetailPage })));
const IndustriesPage       = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const IndustryDetailPage   = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustryDetailPage })));
const LearningPage         = lazy(() => import('./pages/LearningPage').then(m => ({ default: m.LearningPage })));
const LearningDetailPage   = lazy(() => import('./pages/LearningPage').then(m => ({ default: m.LearningDetailPage })));
const PricingPage          = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const CustomerStoriesPage  = lazy(() => import('./pages/CustomerStoriesPage').then(m => ({ default: m.CustomerStoriesPage })));
const CustomerStoryDetailPage = lazy(() => import('./pages/CustomerStoriesPage').then(m => ({ default: m.CustomerStoryDetailPage })));
const AboutPage            = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage          = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage          = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const CookiesPage          = lazy(() => import('./pages/CookiesPage').then(m => ({ default: m.CookiesPage })));
const TermsPage            = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ProjectStatusPage    = lazy(() => import('./pages/ProjectStatusPage').then(m => ({ default: m.ProjectStatusPage })));
const SearchResultsPage    = lazy(() => import('./pages/SearchResultsPage').then(m => ({ default: m.SearchResultsPage })));

/* ── Auth pages (eager) ── */
import { LoginPage }        from './pages/LoginPage';
import { SignUpPage }       from './pages/SignUpPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AuthCallback }     from './pages/AuthCallback';
import { AdminLoginPage }   from './pages/AdminLoginPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

/* ── Admin dashboard ── */
import {
  DashboardLayout, DashboardOverview, AdminPage, SettingsPage,
} from './pages/DashboardPage';
import { ContentManagerPage } from './pages/ContentManagerPage';
import { SubmissionsManager } from './pages/SubmissionsManager';

/* ── Guards ── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-[#0b5394] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * AdminRoute — only allows users with role='admin'.
 * - Not logged in → /login
 * - Logged in but role='user' → /403
 * - role='admin' → renders children
 */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, role, isAdmin } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user)   return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/403" replace />;
  return <>{children}</>;
}

/**
 * RoleRedirect — waits for auth state to settle, then redirects based on role.
 * - loading (initial session load) → LoadingScreen
 * - role still null (auth state resolving after sign-in) → LoadingScreen
 * - not logged in → /login
 * - admin → /dashboard
 * - user → / (public homepage)
 */
function RoleRedirect() {
  const { user, loading, role } = useAuth();
  if (loading || (user && role === null)) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'admin') return <Navigate to="/dashboard" replace />;
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <SiteContentProvider>
          <Routes>
            {/* ── Auth pages ── */}
            <Route path="/login"         element={<LoginPage />} />
            <Route path="/signup"        element={<SignUpPage />} />
            <Route path="/register"      element={<RegistrationPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/admin-login"   element={<AdminLoginPage />} />

            {/* ── Redirect any /crm/* to /dashboard ── */}
            <Route path="/crm/*"         element={<Navigate to="/dashboard" replace />} />
            <Route path="/me"            element={<RoleRedirect />} />

            {/* ── Admin dashboard ── */}
            <Route path="/dashboard" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
              <Route index                  element={<DashboardOverview />} />
              <Route path="admin"           element={<AdminPage />} />
              <Route path="site-content"    element={<ContentManagerPage />} />
              <Route path="submissions"     element={<SubmissionsManager />} />
              <Route path="settings"        element={<SettingsPage />} />
            </Route>

            {/* ── Public marketing site ── */}
            <Route element={<Layout><Suspense fallback={<LoadingScreen />}><Outlet /></Suspense></Layout>}>
              <Route path="/403"                            element={<UnauthorizedPage />} />
               <Route path="/"                           element={<HomePage />} />
              <Route path="/products"                   element={<ProductsPage />} />
              <Route path="/products/:productId"        element={<ProductDetailPage />} />
              <Route path="/solutions"                  element={<SolutionsPage />} />
              <Route path="/solutions/:solutionId"      element={<SolutionDetailPage />} />
              <Route path="/industries"                 element={<IndustriesPage />} />
              <Route path="/industries/:industryId"     element={<IndustryDetailPage />} />
              <Route path="/learning"                   element={<LearningPage />} />
              <Route path="/learning/:learningId"       element={<LearningDetailPage />} />
              <Route path="/pricing"                    element={<PricingPage />} />
              <Route path="/customer-stories"           element={<CustomerStoriesPage />} />
              <Route path="/customer-stories/:storyId"  element={<CustomerStoryDetailPage />} />
              <Route path="/about"                      element={<AboutPage />} />
              <Route path="/contact"                    element={<ContactPage />} />
              <Route path="/privacy"                    element={<PrivacyPage />} />
              <Route path="/cookies"                    element={<CookiesPage />} />
              <Route path="/terms"                      element={<TermsPage />} />
              <Route path="/project-status"             element={<ProjectStatusPage />} />
              <Route path="/search"                     element={<SearchResultsPage />} />
            </Route>
          </Routes>
        </SiteContentProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
