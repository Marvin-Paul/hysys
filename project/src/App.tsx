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
import {
  DashboardLayout,
  DashboardOverview,
  CRMPage,
  LeadsPage,
  PipelinePage,
  AutomationPage,
  AIToolsPage,
  AnalyticsPage,
  ReportsPage,
  ServiceOperationsPage,
  MarketingPage,
  CommercePage,
  IntegrationsPage,
  DataGovernancePage,
  AdminPage,
  SettingsPage,
  SupportPage
} from './pages/DashboardPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth pages without main layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Dashboard with nested routes - protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardOverview />} />
            <Route path="crm" element={<CRMPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="automation" element={<AutomationPage />} />
            <Route path="ai-tools" element={<AIToolsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="service" element={<ServiceOperationsPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="commerce" element={<CommercePage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="data-governance" element={<DataGovernancePage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>

          {/* Main site pages with layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/solutions/:solutionId" element={<SolutionDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/industries/:industryId" element={<IndustryDetailPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/learning/:learningId" element={<LearningDetailPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/customer-stories" element={<CustomerStoriesPage />} />
                <Route path="/customer-stories/:storyId" element={<CustomerStoryDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

