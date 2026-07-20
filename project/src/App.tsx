import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useParams } from 'react-router-dom';

import { Layout } from './components/layout/Layout';

import { DevNavLogger } from './components/dev/DevNavLogger';

import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { SiteContentProvider } from './hooks/useSiteContent';

import { DesignProvider } from './hooks/useDesignSettings';

import { AuthProvider } from './hooks/useAuth';

import { resolveSectorSlug } from './lib/marmidonCatalog';



/* ── Lazy public pages ── */

const HomePage                  = lazy(() => import('./pages/marketing/HomePage').then(m => ({ default: m.HomePage })));

const AboutPage                 = lazy(() => import('./pages/marketing/AboutPage').then(m => ({ default: m.AboutPage })));

const ContactPage               = lazy(() => import('./pages/marketing/ContactPage').then(m => ({ default: m.ContactPage })));

const EventsPage                = lazy(() => import('./pages/marketing/EventsPage').then(m => ({ default: m.EventsPage })));

const SearchResultsPage         = lazy(() => import('./pages/marketing/SearchResultsPage').then(m => ({ default: m.SearchResultsPage })));

const DocumentationPage         = lazy(() => import('./pages/marketing/DocumentationPage').then(m => ({ default: m.DocumentationPage })));

const ProductsPage              = lazy(() => import('./pages/catalog/ProductPage').then(m => ({ default: m.ProductsPage })));

const ProductDetailPage         = lazy(() => import('./pages/catalog/ProductPage').then(m => ({ default: m.ProductDetailPage })));

const CustomerStoriesPage       = lazy(() => import('./pages/stories/CustomerStoriesPage').then(m => ({ default: m.CustomerStoriesPage })));

const CustomerStoryDetailPage   = lazy(() => import('./pages/stories/CustomerStoriesPage').then(m => ({ default: m.CustomerStoryDetailPage })));

const PrivacyPage               = lazy(() => import('./pages/legal/PrivacyPage').then(m => ({ default: m.PrivacyPage })));

const CookiesPage               = lazy(() => import('./pages/legal/CookiesPage').then(m => ({ default: m.CookiesPage })));

const TermsPage                 = lazy(() => import('./pages/legal/TermsPage').then(m => ({ default: m.TermsPage })));

const AccessibilityPage        = lazy(() => import('./pages/legal/AccessibilityPage').then(m => ({ default: m.AccessibilityPage })));

const LoginPage                 = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));

const ContentManagerPage        = lazy(() => import('./pages/admin/ContentManagerPage').then(m => ({ default: m.ContentManagerPage })));

const ProjectStatusPage         = lazy(() => import('./pages/admin/ProjectStatusPage').then(m => ({ default: m.ProjectStatusPage })));

const PricingPage               = lazy(() => import('./pages/marketing/PricingPage').then(m => ({ default: m.PricingPage })));

const PartnersPage              = lazy(() => import('./pages/marketing/PartnersPage').then(m => ({ default: m.PartnersPage })));

const PartnerApplyPage          = lazy(() => import('./pages/marketing/PartnerApplyPage').then(m => ({ default: m.PartnerApplyPage })));

const CompanyPage               = lazy(() => import('./pages/marketing/CompanyPage').then(m => ({ default: m.CompanyPage })));

const TeamPage                  = lazy(() => import('./pages/marketing/TeamPage').then(m => ({ default: m.TeamPage })));

const CareersPage               = lazy(() => import('./pages/marketing/CareersPage').then(m => ({ default: m.CareersPage })));

const ResourcesPage             = lazy(() => import('./pages/marketing/ResourcesPage').then(m => ({ default: m.ResourcesPage })));

const BlogPage                  = lazy(() => import('./pages/marketing/BlogPage').then(m => ({ default: m.BlogPage })));

const BlogPostPage              = lazy(() => import('./pages/marketing/BlogPostPage').then(m => ({ default: m.BlogPostPage })));

const GuidesPage                = lazy(() => import('./pages/marketing/GuidesPage').then(m => ({ default: m.GuidesPage })));

const FAQPage                   = lazy(() => import('./pages/marketing/FAQPage').then(m => ({ default: m.FAQPage })));

const DemoRequestPage           = lazy(() => import('./pages/marketing/DemoRequestPage').then(m => ({ default: m.DemoRequestPage })));

const SolutionsPage             = lazy(() => import('./pages/marketing/SolutionsPage').then(m => ({ default: m.SolutionsPage })));

const SolutionDetailPage        = lazy(() => import('./pages/marketing/SolutionsPage').then(m => ({ default: m.SolutionDetailPage })));

const SitemapPage               = lazy(() => import('./pages/marketing/SitemapPage').then(m => ({ default: m.SitemapPage })));

const NotFoundPage              = lazy(() => import('./pages/utility/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function LegacyIndustryRedirect() {
  const { industryId } = useParams<{ industryId: string }>();
  return <Navigate to={`/solutions/${resolveSectorSlug(industryId || '')}`} replace />;
}

function LegacyStoryRedirect() {
  const { storyId } = useParams<{ storyId: string }>();
  return <Navigate to={`/customers/${storyId ?? ''}`} replace />;
}



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

        <DevNavLogger />

        <AuthProvider>

        <DesignProvider>

          <SiteContentProvider>

          <Routes>

            {/* ── Auth (no public layout) ── */}

            <Route path="/login" element={<Suspense fallback={<LoadingScreen />}><LoginPage /></Suspense>} />



            {/* ── Admin dashboard ── */}

            <Route path="/dashboard" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><ContentManagerPage /></Suspense></ProtectedRoute>} />

            <Route path="/dashboard/submissions" element={<Navigate to="/dashboard?tab=submissions" replace />} />



            {/* ── Public marketing site ── */}

            <Route element={<Layout><Suspense fallback={<LoadingScreen />}><Outlet /></Suspense></Layout>}>

               <Route path="/"                           element={<HomePage />} />

              <Route path="/register"                   element={<Navigate to="/request-a-demo" replace />} />

              {/* Legacy redirects (Doc 3 §6) */}
              <Route path="/about"                      element={<Navigate to="/company/about" replace />} />
              <Route path="/customer-stories"           element={<Navigate to="/customers" replace />} />
              <Route path="/customer-stories/:storyId" element={<LegacyStoryRedirect />} />
              <Route path="/industries"                 element={<Navigate to="/solutions" replace />} />
              <Route path="/industries/:industryId"     element={<LegacyIndustryRedirect />} />
              <Route path="/services"                   element={<Navigate to="/solutions" replace />} />
              <Route path="/services/*"                 element={<Navigate to="/solutions" replace />} />
              <Route path="/privacy"                    element={<Navigate to="/legal/privacy" replace />} />
              <Route path="/terms"                      element={<Navigate to="/legal/terms" replace />} />
              <Route path="/cookies"                    element={<Navigate to="/legal/cookies" replace />} />

              <Route path="/products"                   element={<ProductsPage />} />

              <Route path="/products/:productId"        element={<ProductDetailPage />} />

              <Route path="/documentation"               element={<DocumentationPage />} />

              <Route path="/solutions/documentation"    element={<Navigate to="/documentation" replace />} />

              <Route path="/customers"                  element={<CustomerStoriesPage />} />
              <Route path="/customers/:storyId"        element={<CustomerStoryDetailPage />} />

              <Route path="/events"                     element={<EventsPage />} />

              <Route path="/pricing"                    element={<PricingPage />} />

              <Route path="/learning"                   element={<Navigate to="/events" replace />} />

              <Route path="/company/about"             element={<AboutPage />} />

              <Route path="/contact"                    element={<ContactPage />} />

              <Route path="/legal/privacy"             element={<PrivacyPage />} />
              <Route path="/legal/cookies"             element={<CookiesPage />} />
              <Route path="/legal/terms"               element={<TermsPage />} />
              <Route path="/legal/accessibility"        element={<AccessibilityPage />} />

              <Route path="/project-status"             element={<ProjectStatusPage />} />

              <Route path="/search"                     element={<SearchResultsPage />} />

              {/* ── New Priority 1 Routes ── */}
              <Route path="/partners"                   element={<PartnersPage />} />
              <Route path="/partners/apply"             element={<PartnerApplyPage />} />
              <Route path="/company"                    element={<CompanyPage />} />
              <Route path="/company/team"               element={<TeamPage />} />
              <Route path="/company/careers"            element={<CareersPage />} />
              <Route path="/resources"                  element={<ResourcesPage />} />
              <Route path="/resources/blog"             element={<BlogPage />} />
              <Route path="/resources/blog/:slug"       element={<BlogPostPage />} />
              <Route path="/resources/guides"           element={<GuidesPage />} />
              <Route path="/resources/faqs"             element={<FAQPage />} />
              <Route path="/request-a-demo"             element={<DemoRequestPage />} />
              <Route path="/solutions"                  element={<SolutionsPage />} />
              <Route path="/solutions/:sectorId"        element={<SolutionDetailPage />} />
              <Route path="/sitemap"                    element={<SitemapPage />} />
              <Route path="*"                           element={<NotFoundPage />} />

            </Route>

          </Routes>

        </SiteContentProvider>

        </DesignProvider>

        </AuthProvider>

      </Router>

  );

}



export default App;

