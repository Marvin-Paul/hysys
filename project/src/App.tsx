import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductsPage, ProductDetailPage } from './pages/ProductPage';
import { SolutionsPage, SolutionDetailPage } from './pages/SolutionsPage';
import { IndustriesPage, IndustryDetailPage } from './pages/IndustriesPage';
import { LearningPage, LearningDetailPage } from './pages/LearningPage';
import { PricingPage } from './pages/PricingPage';
import { CustomerStoriesPage, CustomerStoryDetailPage } from './pages/CustomerStoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { AuthCallback } from './pages/AuthCallback';

/* Admin dashboard */
import {
  DashboardLayout, DashboardOverview, CRMPage, LeadsPage, PipelinePage,
  AutomationPage, AIToolsPage, AnalyticsPage, ReportsPage,
  ServiceOperationsPage, MarketingPage, CommercePage, IntegrationsPage,
  DataGovernancePage, AdminPage, SettingsPage, SupportPage,
} from './pages/DashboardPage';

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
        <Routes>
          {/* ── Auth pages ── */}
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/signup"        element={<SignUpPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
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
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/"                         element={<HomePage />} />
                <Route path="/products"                 element={<ProductsPage />} />
                <Route path="/products/:productId"      element={<ProductDetailPage />} />
                <Route path="/solutions"                element={<SolutionsPage />} />
                <Route path="/solutions/:solutionId"    element={<SolutionDetailPage />} />
                <Route path="/industries"               element={<IndustriesPage />} />
                <Route path="/industries/:industryId"   element={<IndustryDetailPage />} />
                <Route path="/learning"                 element={<LearningPage />} />
                <Route path="/learning/:learningId"     element={<LearningDetailPage />} />
                <Route path="/pricing"                  element={<PricingPage />} />
                <Route path="/customer-stories"         element={<CustomerStoriesPage />} />
                <Route path="/customer-stories/:storyId" element={<CustomerStoryDetailPage />} />
                <Route path="/about"                    element={<AboutPage />} />
                <Route path="/contact"                  element={<ContactPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
