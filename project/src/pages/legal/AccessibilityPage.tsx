import { PageHero } from '../../components/ui/PageHero';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { useSiteContent } from '../../hooks/useSiteContent';

export function AccessibilityPage() {
  const content = useSiteContent('legal');
  return (
    <div className="pt-16">
      <SEO title={PAGE_META.accessibility.title} description={PAGE_META.accessibility.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Accessibility' }]} />
      <PageHero
        badge={content.getContent('accessibility_hero_badge', 'Accessibility')}
        title={content.getContent('accessibility_hero_title', 'Accessibility Statement')}
        subtitle={content.getContent('accessibility_hero_subtitle', 'WCAG 2.2 AA Conformance')}
        description={content.getContent('accessibility_hero_desc', 'Marmidon is committed to ensuring digital accessibility for all users, regardless of ability.')}
        primaryCta={{ label: content.getContent('accessibility_hero_cta', 'Report an Issue'), to: '/contact' }}
      />

      <section className="page-section page-section--white">
        <div className="page-container page-container--reading">
          <div className="prose-marmidon">
            <p className="type-lead">
              Marmidon Global Solutions Limited ("Marmidon") is committed to ensuring digital accessibility
              for people with disabilities. We continually improve the user experience for everyone and
              apply the relevant accessibility standards.
            </p>

            <h2>Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and
              developers to improve accessibility for people with disabilities. It defines three levels
              of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p>
              The Marmidon website is <strong>partially conformant</strong> with WCAG 2.2 Level AA.
              Partially conformant means that some parts of the content do not yet fully conform to the
              accessibility standard. We are actively working to address any remaining issues.
            </p>

            <h2>Accessibility Features</h2>
            <ul>
              <li><strong>Skip to content</strong> — A skip-link at the top of every page lets keyboard users bypass repeated navigation.</li>
              <li><strong>Semantic structure</strong> — Pages use proper HTML landmarks (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;) and heading hierarchy (H1→H2→H3).</li>
              <li><strong>Keyboard navigation</strong> — All interactive elements are reachable and operable by keyboard alone.</li>
              <li><strong>Visible focus indicators</strong> — Clear focus outlines are visible on all focusable elements.</li>
              <li><strong>Colour contrast</strong> — Text and interactive elements meet minimum contrast ratios of 4.5:1 (normal) and 3:1 (large).</li>
              <li><strong>Alternative text</strong> — Meaningful images include descriptive alt text; decorative images are hidden from assistive technology.</li>
              <li><strong>Reduced motion</strong> — The site respects the prefers-reduced-motion setting and disables non-essential animations.</li>
              <li><strong>Form labels</strong> — All form fields have programmatically associated labels and error announcements.</li>
              <li><strong>Responsive design</strong> — Content is fully usable at 200% zoom and at 320px viewport width without loss of information.</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>We are working to resolve the following known issues:</p>
            <ul>
              <li>Some third-party embedded content (e.g., video players) may have limited keyboard support.</li>
              <li>Screen-reader optimisation for complex data tables is ongoing.</li>
            </ul>

            <h2>Assessment Approach</h2>
            <p>Marmidon assesses the accessibility of our website through:</p>
            <ul>
              <li>Automated testing using axe DevTools and Lighthouse.</li>
              <li>Manual keyboard-only testing of all user journeys.</li>
              <li>Periodic screen-reader spot checks (NVDA, VoiceOver).</li>
            </ul>

            <h2>Feedback &amp; Support</h2>
            <p>
              We welcome your feedback on the accessibility of the Marmidon website. If you encounter
              any barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 not-prose">
              <p>
                <strong>Marmidon Global Solutions Limited</strong><br />
                Plot 19 Sir Albert Cook Road, MENGO - KAMPALA<br />
                P.O.Box 16435 K'la<br />
                Email: <a href="mailto:accessibility@marmidon.com">accessibility@marmidon.com</a><br />
                Tel: 0782-602854
              </p>
            </div>
            <p className="mt-4">
              We aim to respond to accessibility feedback within 5 business days and to propose a
              resolution within 10 business days.
            </p>

            <h2>Date</h2>
            <p>This statement was last updated on 20 July 2026.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
