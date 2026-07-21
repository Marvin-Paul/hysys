import { PageHero } from '../../components/ui/PageHero';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';

export function TermsPage() {
  const content = useSiteContent('legal');
  const termsJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Terms', path: '/legal/terms' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.terms.title} description={PAGE_META.terms.description} jsonLd={termsJsonLd} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Terms' }]} />
      <PageHero
        badge={content.getContent('terms_hero_badge', 'Terms of Service')}
        title={content.getContent('terms_hero_title', 'Terms of Service')}
        subtitle={content.getContent('terms_hero_subtitle', 'Legal terms & usage policies')}
        description={content.getContent('terms_hero_desc', 'Review the rules that govern access to our platform, services, and website.')}
        primaryCta={{ label: content.getContent('terms_hero_cta', 'Contact Legal'), to: '/contact' }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed mb-8">
            These Terms of Service ("Terms") govern your access to and use of the Marmidon Global Solutions Limited ("Marmidon," "we," "us," or "our") website, platform, and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By creating an account, accessing, or using the Marmidon platform, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Statement. If you are using the platform on behalf of an organisation, you represent that you have the authority to bind that organisation.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">2. Account Registration and Security</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>You must provide accurate, current, and complete information during registration</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials</li>
            <li>You must notify us immediately of any unauthorised use of your account</li>
            <li>We reserve the right to disable accounts that violate these Terms</li>
            <li>Accounts are not transferable without our prior written consent</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">3. Licence and Access</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Access and use the platform for your internal business purposes</li>
            <li>Install and use any software provided as part of the service</li>
            <li>Upload and manage your data within the platform</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">4. Subscription and Billing</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Subscription fees are billed in advance on a monthly or annual basis as selected</li>
            <li>Fees are non-refundable except as expressly stated in our refund policy</li>
            <li>We reserve the right to change pricing with 30 days&apos; notice</li>
            <li>Late payments may result in service suspension</li>
            <li>All fees are exclusive of applicable taxes</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">5. Acceptable Use</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Use the platform for any unlawful purpose or in violation of any applicable laws</li>
            <li>Upload or transmit viruses, malware, or malicious code</li>
            <li>Attempt to gain unauthorised access to any part of the platform</li>
            <li>Reverse engineer, decompile, or disassemble any portion of the platform</li>
            <li>Exceed usage limits or resell access to the platform without written permission</li>
            <li>Use the platform to send unsolicited communications (spam)</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">6. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The Marmidon platform, including its code, design, logos, trademarks, and content, is owned by Marmidon Global Solutions Limited and protected by intellectual property laws. You retain ownership of any data you upload to the platform. We claim no ownership over your data.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">7. Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We process your data in accordance with our Privacy Statement and applicable data protection laws. We implement appropriate technical and organisational measures to protect your data. As between you and Marmidon, you control your data and we act as a data processor.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">8. Service Level and Availability</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>We strive for 99.9% uptime for our platform</li>
            <li>Scheduled maintenance will be communicated in advance</li>
            <li>We are not liable for interruptions beyond our reasonable control</li>
            <li>Support response times vary by subscription tier</li>
          </ul>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            To the maximum extent permitted by law, Marmidon Global Solutions Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the platform. Our total liability is limited to the amount you have paid us in the 12 months preceding the claim.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">10. Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Either party may terminate the agreement at any time with written notice. We may suspend or terminate your access immediately if you violate these Terms. Upon termination, your right to access the platform ceases, and we will delete your data within 90 days unless legally required to retain it.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">11. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These Terms are governed by the laws of the Republic of Uganda. Any disputes arising from these Terms shall be resolved in the courts of Kampala, Uganda.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">12. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We may modify these Terms at any time. We will notify you of material changes via email or through the platform. Continued use after changes take effect constitutes acceptance of the modified Terms.
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-secondary)] mt-10 mb-4">13. Contact</h2>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700">
              <strong>Marmidon Global Solutions Limited</strong><br />
              Plot 19 Sir Albert Cook Road, MENGO - KAMPALA<br />
              P.O.Box 16435 K'la<br />
              Email: <a href="mailto:legal@marmidon.com" className="text-[var(--color-primary)] underline">legal@marmidon.com</a><br />
              Tel: 0782-602854
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
