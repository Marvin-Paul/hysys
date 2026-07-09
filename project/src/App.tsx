import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SiteContentProvider } from './hooks/useSiteContent';
import { DesignProvider } from './hooks/useDesignSettings';

/* ── Lazy public pages ── */
const HomePage             = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage         = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage    = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductDetailPage })));
const SolutionsPage        = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const SolutionDetailPage   = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionDetailPage })));
const IndustriesPage       = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const IndustryDetailPage   = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustryDetailPage })));
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
const ContentManagerPage   = lazy(() => import('./pages/ContentManagerPage').then(m => ({ default: m.ContentManagerPage })));
const SubmissionsManager   = lazy(() => import('./pages/SubmissionsManager').then(m => ({ default: m.SubmissionsManager })));

/* ── Guards ── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
      <Router>
        <DesignProvider>
          <SiteContentProvider>
          <Routes>
            {/* ── Admin dashboard ── */}
            <Route path="/dashboard" element={<ContentManagerPage />} />
            <Route path="/dashboard/submissions" element={<SubmissionsManager />} />

            {/* ── Public marketing site ── */}
            <Route element={<Layout><Suspense fallback={<LoadingScreen />}><Outlet /></Suspense></Layout>}>
               <Route path="/"                           element={<HomePage />} />
              <Route path="/products"                   element={<ProductsPage />} />
              <Route path="/products/:productId"        element={<ProductDetailPage />} />
              <Route path="/solutions"                  element={<SolutionsPage />} />
              <Route path="/solutions/:solutionId"      element={<SolutionDetailPage />} />
              <Route path="/industries"                 element={<IndustriesPage />} />
              <Route path="/industries/:industryId"     element={<IndustryDetailPage />} />
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
        </DesignProvider>
      </Router>
  );
}

export default App;
