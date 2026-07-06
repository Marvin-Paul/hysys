import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { Layout } from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductDetailPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const SolutionDetailPage = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionDetailPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const IndustryDetailPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustryDetailPage })));
const LearningPage = lazy(() => import('./pages/LearningPage').then(m => ({ default: m.LearningPage })));
const LearningDetailPage = lazy(() => import('./pages/LearningPage').then(m => ({ default: m.LearningDetailPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const CustomerStoriesPage = lazy(() => import('./pages/CustomerStoriesPage').then(m => ({ default: m.CustomerStoriesPage })));
const CustomerStoryDetailPage = lazy(() => import('./pages/CustomerStoriesPage').then(m => ({ default: m.CustomerStoryDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then(m => ({ default: m.CookiesPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ProjectStatusPage = lazy(() => import('./pages/ProjectStatusPage').then(m => ({ default: m.ProjectStatusPage })));
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AuthCallback } from './pages/AuthCallback';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { SiteContentProvider } from './hooks/useSiteContent';

/* Admin dashboard */
import {
  DashboardLayout, DashboardOverview, CRMPage, LeadsPage, PipelinePage,
  AutomationPage, AIToolsPage, AnalyticsPage, ReportsPage,
  ServiceOperationsPage, MarketingPage, CommercePage, IntegrationsPage,
  DataGovernancePage, AdminPage, SettingsPage, SupportPage,
} from './pages/DashboardPage';
import { ContentManagerPage } from './pages/ContentManagerPage';
import { SubmissionsManager } from './pages/SubmissionsManager';

/* User CRM app */
import {
  CRMLayout, CRMHome, CRMContacts, CRMLeads,
  CRMOpportunities, CRMReports, CRMSupport, CRMSettings,
} from './pages/CRMApp';

/* ── Guards ── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-[#0b5394] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/** Requires auth. If role is known, redirects to the right home. */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/** Only lets admins through; regular users go to /crm */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, role } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'user') return <Navigate to="/crm" replace />;
  return <>{children}</>;
}

/** Only lets regular users through; admins go to /dashboard */
function UserRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, role } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

/** After login, send user to the right place based on role */
function RoleRedirect() {
  const { user, loading, role } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'admin') return <Navigate to="/dashboard" replace />;
  return <Navigate to="/crm" replace />;
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
          <Route path="/me"            element={<RoleRedirect />} />

          {/* ── Admin dashboard (/dashboard/*) ── */}
          <Route path="/dashboard" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
            <Route index                  element={<DashboardOverview />} />
            <Route path="crm"             element={<CRMPage />} />
            <Route path="leads"           element={<LeadsPage />} />
            <Route path="pipeline"        element={<PipelinePage />} />
            <Route path="automation"      element={<AutomationPage />} />
            <Route path="ai-tools"        element={<AIToolsPage />} />
            <Route path="analytics"       element={<AnalyticsPage />} />
            <Route path="reports"         element={<ReportsPage />} />
            <Route path="service"         element={<ServiceOperationsPage />} />
            <Route path="marketing"       element={<MarketingPage />} />
            <Route path="commerce"        element={<CommercePage />} />
            <Route path="integrations"    element={<IntegrationsPage />} />
            <Route path="data-governance" element={<DataGovernancePage />} />
            <Route path="admin"           element={<AdminPage />} />
            <Route path="site-content"    element={<ContentManagerPage />} />
            <Route path="submissions"     element={<SubmissionsManager />} />
            <Route path="settings"        element={<SettingsPage />} />
            <Route path="support"         element={<SupportPage />} />
          </Route>

          {/* ── User CRM app (/crm/*) ── */}
          <Route path="/crm" element={<UserRoute><CRMLayout /></UserRoute>}>
            <Route index                  element={<CRMHome />} />
            <Route path="contacts"        element={<CRMContacts />} />
            <Route path="leads"           element={<CRMLeads />} />
            <Route path="opportunities"   element={<CRMOpportunities />} />
            <Route path="reports"         element={<CRMReports />} />
            <Route path="support"         element={<CRMSupport />} />
            <Route path="settings"        element={<CRMSettings />} />
          </Route>

          {/* ── Public marketing site ── */}
          <Route element={<Layout><Suspense fallback={<LoadingScreen />}><Outlet /></Suspense></Layout>}>
            <Route path="/"                          element={<HomePage />} />
            <Route path="/products"                  element={<ProductsPage />} />
            <Route path="/products/:productId"       element={<ProductDetailPage />} />
            <Route path="/solutions"                 element={<SolutionsPage />} />
            <Route path="/solutions/:solutionId"     element={<SolutionDetailPage />} />
            <Route path="/industries"                element={<IndustriesPage />} />
            <Route path="/industries/:industryId"    element={<IndustryDetailPage />} />
            <Route path="/learning"                  element={<LearningPage />} />
            <Route path="/learning/:learningId"      element={<LearningDetailPage />} />
            <Route path="/pricing"                   element={<PricingPage />} />
            <Route path="/customer-stories"          element={<CustomerStoriesPage />} />
            <Route path="/customer-stories/:storyId" element={<CustomerStoryDetailPage />} />
            <Route path="/about"                     element={<AboutPage />} />
            <Route path="/contact"                   element={<ContactPage />} />
            <Route path="/privacy"                   element={<PrivacyPage />} />
            <Route path="/cookies"                   element={<CookiesPage />} />
            <Route path="/terms"                     element={<TermsPage />} />
            <Route path="/project-status"            element={<ProjectStatusPage />} />
          </Route>
        </Routes>
        </SiteContentProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
