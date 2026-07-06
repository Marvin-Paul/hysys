import { useTranslation } from '../lib/i18n';
import { SEO } from '../components/SEO';

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-16">
      <SEO title="Privacy Statement" />
      <section className="bg-gradient-to-br from-[#032d60] to-[#0b5394] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t('privacyTitle')}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{t('lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              HYSYS GLOBAL SOLUTIONS LIMITED ("HYSYS," "we," "us," or "our") is committed to protecting your privacy. This Privacy Statement explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you register for an account, fill out a form, request a demo, subscribe to our newsletter, or contact us. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
              <li>Name, email address, phone number, and job title</li>
              <li>Company name, industry, and company size</li>
              <li>Billing and payment information</li>
              <li>Communication preferences and marketing responses</li>
              <li>Content you submit through our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and manage subscriptions</li>
              <li>To communicate with you about product updates, offers, and events</li>
              <li>To personalise your experience and deliver relevant content</li>
              <li>To detect, prevent, and address technical issues or fraud</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">3. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
              <li><strong>Service providers</strong> who assist us in operating our platform (e.g., cloud hosting, payment processing, analytics)</li>
              <li><strong>Business partners</strong> when you use integrated third-party services through our platform</li>
              <li><strong>Legal authorities</strong> when required by law or to protect our rights</li>
              <li><strong>Corporate affiliates</strong> in connection with a merger, acquisition, or asset sale</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement industry-standard security measures including encryption in transit and at rest, access controls, regular security audits, and SOC 2 Type II compliance to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain data as required by law, for legitimate business purposes, or until you request deletion.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
              <li>Access, correct, or delete your personal data</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              To exercise these rights, contact us at <a href="mailto:privacy@hysysglobal.com" className="text-[#0b5394] underline">privacy@hysysglobal.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your information may be transferred to and processed in countries outside your own. We ensure appropriate safeguards are in place through Standard Contractual Clauses and other mechanisms to protect your data in accordance with applicable laws.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">8. Changes to This Privacy Statement</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Statement from time to time. We will notify you of material changes by posting the updated version on this page and, where appropriate, by email.
            </p>

            <h2 className="text-2xl font-bold text-[#032d60] mt-10 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Statement, please contact us:
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700">
                <strong>HYSYS GLOBAL SOLUTIONS LIMITED</strong><br />
                Plot 19 Sir Albert Cook Road, MENGO - KAMPALA<br />
                P.O.Box 16435 K'la<br />
                Email: <a href="mailto:privacy@hysysglobal.com" className="text-[#0b5394] underline">privacy@hysysglobal.com</a><br />
                Tel: 0782-602854
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
