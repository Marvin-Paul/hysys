import { PageHero } from '../../components/ui/PageHero';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';

export function CookiesPage() {
  const content = useSiteContent('legal');
  const cookiesJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Cookies', path: '/legal/cookies' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.cookies.title} description={PAGE_META.cookies.description} jsonLd={cookiesJsonLd} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cookies' }]} />
      <PageHero
        badge={content.getContent('cookies_hero_badge', 'Cookie Policy')}
        title={content.getContent('cookies_hero_title', 'Cookie Policy')}
        subtitle={content.getContent('cookies_hero_subtitle', 'How we use cookies')}
        description={content.getContent('cookies_hero_desc', 'Understand how Marmidon uses cookies and similar technologies on our website.')}
        primaryCta={{ label: content.getContent('cookies_hero_cta', 'Contact Us'), to: '/contact' }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed mb-8">
            Marmidon Global Solutions Limited ("Marmidon," "we," "us," or "our") uses cookies and similar tracking technologies on our website and platform. This Cookie Statement explains what cookies are, how we use them, and your choices regarding their use.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Cookies can be "persistent" (remain on your device until deleted) or "session" (expire when you close your browser). They may be set by the website you visit ("first-party cookies") or by third parties such as analytics or advertising providers ("third-party cookies").
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies for the following purposes:
          </p>

          <h3 className="text-xl font-semibold text-[var(--color-secondary)] mt-6 mb-3">Essential Cookies</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account authentication. Without these cookies, some services cannot be provided.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Session management and user authentication</li>
            <li>Maintaining your preferences during a session</li>
            <li>Security and fraud prevention</li>
            <li>Load balancing to ensure site availability</li>
          </ul>

          <h3 className="text-xl font-semibold text-[var(--color-secondary)] mt-6 mb-3">Analytics and Performance Cookies</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and measure the effectiveness of campaigns.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Page visit counts and traffic sources</li>
            <li>User behaviour and navigation patterns</li>
            <li>Error detection and debugging</li>
            <li>A/B testing and feature evaluation</li>
          </ul>

          <h3 className="text-xl font-semibold text-[var(--color-secondary)] mt-6 mb-3">Functional Cookies</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            These cookies allow the website to remember choices you make and provide enhanced, more personalised features.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Remembering language and region preferences</li>
            <li>Storing personalised content settings</li>
            <li>Remembering chat or support session details</li>
          </ul>

          <h3 className="text-xl font-semibold text-[var(--color-secondary)] mt-6 mb-3">Marketing and Targeting Cookies</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            These cookies are used to deliver relevant advertisements and track the effectiveness of marketing campaigns. They may be set by third-party advertising networks with our permission.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Delivering targeted content and advertisements</li>
            <li>Measuring campaign performance</li>
            <li>Building audience segments for marketing</li>
            <li>Social media sharing and integration</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">3. Third-Party Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We work with trusted third-party service providers who may set their own cookies on our website. These include analytics providers (such as Google Analytics), advertising networks, social media platforms, and customer support tools. These third parties have their own privacy and cookie policies governing the use of your information.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">4. Your Cookie Choices</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have control over how cookies are used on your device:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li><strong>Browser settings:</strong> Most browsers allow you to manage cookie preferences through their settings. You can block or delete cookies, but this may affect website functionality.</li>
            <li><strong>Cookie consent banner:</strong> When you first visit our site, a cookie banner allows you to accept or decline non-essential cookies.</li>
            <li><strong>Opt-out tools:</strong> You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.</li>
            <li><strong>Do Not Track:</strong> Some browsers support "Do Not Track" signals. We honour these signals where feasible.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">5. How to Manage Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Below are links to manage cookie settings in common browsers:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Microsoft Edge</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">6. Updates to This Cookie Statement</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We may update this Cookie Statement from time to time to reflect changes in technology, regulation, or our business practices. We encourage you to review this page periodically.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700">
              <strong>Marmidon Global Solutions Limited</strong><br />
              Plot 19 Sir Albert Cook Road, MENGO - KAMPALA<br />
              P.O.Box 16435 K'la<br />
              Email: <a href="mailto:privacy@marmidon.com" className="text-[var(--color-primary)] underline">privacy@marmidon.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
