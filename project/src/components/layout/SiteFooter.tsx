import { Link } from 'react-router-dom';
import { useSiteContent } from '../../hooks/useSiteContent';
import { mergeCmsList } from '../../lib/cms/cmsContent';
import { DEFAULT_FOOTER_COMPANY, DEFAULT_FOOTER_RESOURCES } from '../../lib/cms/resourceDefaults';
import { footerModuleLinks, footerSectorLinks } from '../../lib/marmidonCatalog';

export function SiteFooter() {
  const global = useSiteContent('global');
  const contact = useSiteContent('contact');

  const tagline = global.getContent('footer_tagline', 'Empowering businesses with intelligent ERP solutions.');
  const brandName = global.getContent('footer_brand_name', 'Marmidon Global Solutions Limited');
  const websiteUrl = global.getContent('footer_website_url', 'https://www.marmidon.com');
  const copyright = global.getContent('footer_copyright', '© 2026 Marmidon Global Solutions Limited. All rights reserved.');
  const supportPhone = global.getContent('support_phone', '0782-602854');
  const officeAddress = contact.getContent('office_address', "Plot 19 Sir Albert Cook Road, Mengo — Kampala\nP.O. Box 16435 K'la");
  const phoneLines = (contact.getContent('phone_numbers', supportPhone) || supportPhone).split('\n').filter(Boolean);
  const email = contact.getContent('email_address', 'info@marmidon.com');

  const resourceLinks = mergeCmsList(
    global.getContentRaw('footer_resources') as typeof DEFAULT_FOOTER_RESOURCES | null,
    DEFAULT_FOOTER_RESOURCES
  );
  const companyLinks = mergeCmsList(
    global.getContentRaw('footer_company') as typeof DEFAULT_FOOTER_COMPANY | null,
    DEFAULT_FOOTER_COMPANY
  );

  const moduleLinks = footerModuleLinks();
  const sectorLinks = footerSectorLinks();
  const websiteHost = websiteUrl.replace(/^https?:\/\//, '');

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/">
              <img src="/Mavy%20logo3.svg" alt="Marmidon logo" className="site-footer__logo" />
            </Link>
            <span className="site-footer__brand-name">{brandName}</span>
            {tagline && <p className="site-footer__tagline">{tagline}</p>}
            <address className="site-footer__address not-italic">
              {officeAddress.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              Tel: {phoneLines.join(' · ')}<br />
              Email: <a href={`mailto:${email}`}>{email}</a><br />
              Website:{' '}
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                {websiteHost}
              </a>
            </address>
            <div className="site-footer__social">
              {[
                { label: 'X', href: websiteUrl, title: 'Marmidon on X' },
                { label: 'in', href: websiteUrl, title: 'Marmidon on LinkedIn' },
                { label: 'f', href: websiteUrl, title: 'Marmidon on Facebook' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  aria-label={social.title}
                  className="site-footer__social-link"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="site-footer__heading">{global.getContent('footer_col_products', 'Products')}</h4>
            <ul className="site-footer__links">
              {moduleLinks.map((link) => (
                <li key={link.path}><Link to={link.path} className="site-footer__link">{link.label}</Link></li>
              ))}
              <li><Link to="/products" className="site-footer__link site-footer__link--all">{global.getContent('footer_all_products_label', 'All products →')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">{global.getContent('footer_col_solutions', 'Solutions')}</h4>
            <ul className="site-footer__links">
              {sectorLinks.map((link) => (
                <li key={link.path}><Link to={link.path} className="site-footer__link">{link.label}</Link></li>
              ))}
              <li><Link to="/solutions" className="site-footer__link site-footer__link--all">{global.getContent('footer_all_solutions_label', 'All solutions →')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">{global.getContent('footer_col_resources', 'Resources')}</h4>
            <ul className="site-footer__links">
              {resourceLinks.map((link) => (
                <li key={link.id || link.path}><Link to={String(link.path)} className="site-footer__link">{link.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="site-footer__heading">{global.getContent('footer_col_company', 'Company')}</h4>
            <ul className="site-footer__links">
              {companyLinks.map((link) => (
                <li key={link.id || link.path}><Link to={String(link.path)} className="site-footer__link">{link.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <p className="site-footer__legal">{copyright}</p>
          <nav className="site-footer__legal-links" aria-label="Legal">
            <Link to="/legal/privacy" className="site-footer__legal-link">{global.getContent('footer_privacy_label', 'Privacy')}</Link>
            <Link to="/legal/terms" className="site-footer__legal-link">{global.getContent('footer_terms_label', 'Terms')}</Link>
            <Link to="/legal/cookies" className="site-footer__legal-link">{global.getContent('footer_cookies_label', 'Cookies')}</Link>
            <Link to="/sitemap" className="site-footer__legal-link">{global.getContent('footer_sitemap_label', 'Sitemap')}</Link>
            <Link to="/dashboard" title="Dashboard" className="site-footer__admin-dot" aria-label="Dashboard" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
