import { PageHero } from '../../components/ui/PageHero';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { breadcrumbJsonLd } from '../../lib/seo/structuredData';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';

export function PrivacyPage() {
  const content = useSiteContent('legal');
  const privacyJsonLd = [breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Privacy', path: '/legal/privacy' },
  ])];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.privacy.title} description={PAGE_META.privacy.description} jsonLd={privacyJsonLd} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacy' }]} />
      <PageHero
        badge={content.getContent('privacy_hero_badge', 'Privacy Statement')}
        title={content.getContent('privacy_hero_title', 'Privacy Policy')}
        subtitle={content.getContent('privacy_hero_subtitle', 'Data protection & trust')}
        description={content.getContent('privacy_hero_desc', 'Learn how we collect, safeguard, and use your information responsibly.')}
        primaryCta={{ label: content.getContent('privacy_hero_cta', 'Contact Privacy Team'), to: '/contact' }}
      />

      <section className="page-section page-section--white">
        <div className="page-container page-container--reading">
          <div className="prose-marmidon">
            <p className="type-lead">
              Marmidon Global Solutions Limited ("Marmidon," "we," "us," or "our") is committed to protecting your privacy. This Privacy Statement explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you register for an account, fill out a form, request a demo, subscribe to our newsletter, or contact us. This may include:
            </p>
            <ul>
              <li>Name, email address, phone number, and job title</li>
              <li>Company name, industry, and company size</li>
              <li>Billing and payment information</li>
              <li>Communication preferences and marketing responses</li>
              <li>Content you submit through our platform</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            <ul>
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and manage subscriptions</li>
              <li>To communicate with you about product updates, offers, and events</li>
              <li>To personalise your experience and deliver relevant content</li>
              <li>To detect, prevent, and address technical issues or fraud</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>

            <h2>3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share your data with:
            </p>
            <ul>
              <li><strong>Service providers</strong> who assist us in operating our platform (e.g., cloud hosting, payment processing, analytics)</li>
              <li><strong>Business partners</strong> when you use integrated third-party services through our platform</li>
              <li><strong>Legal authorities</strong> when required by law or to protect our rights</li>
              <li><strong>Corporate affiliates</strong> in connection with a merger, acquisition, or asset sale</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit and at rest, access controls, regular security audits, and SOC 2 Type II compliance to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain data as required by law, for legitimate business purposes, or until you request deletion.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:privacy@marmidon.com">privacy@marmidon.com</a>.
            </p>

            <h2>7. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries outside your own. We ensure appropriate safeguards are in place through Standard Contractual Clauses and other mechanisms to protect your data in accordance with applicable laws.
            </p>

            <h2>8. Changes to This Privacy Statement</h2>
            <p>
              We may update this Privacy Statement from time to time. We will notify you of material changes by posting the updated version on this page and, where appropriate, by email.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Statement, please contact us:
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 not-prose">
              <p>
                <strong>Marmidon Global Solutions Limited</strong><br />
                Plot 19 Sir Albert Cook Road, MENGO - KAMPALA<br />
                P.O.Box 16435 K'la<br />
                Email: <a href="mailto:privacy@marmidon.com">privacy@marmidon.com</a><br />
                Tel: 0782-602854
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
