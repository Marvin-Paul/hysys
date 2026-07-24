import { LightPageHeader } from '../../components/ui/LightPageHeader';
import { PAGE_META } from '../../lib/seo/pageMeta';
import { SEO } from '../../components/ui/SEO';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { ContentCard } from '../../components/ui/ContentCard';
import { useSiteContent } from '../../hooks/useSiteContent';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShieldCheck, FileCheck, Users, Eye } from 'lucide-react';

export function SecurityPage() {
  const content = useSiteContent('company');

  const pillars = [
    {
      id: 'encryption',
      title: 'Data encryption',
      description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256, with key rotation policies managed by our security operations team.',
      icon: Lock,
      link: '/company/security#encryption',
    },
    {
      id: 'access',
      title: 'Role-based access control',
      description: 'Granular permissions, MFA enforcement, and SSO/SAML 2.0 integration ensure the right people have the right access.',
      icon: Users,
      link: '/company/security#access',
    },
    {
      id: 'compliance',
      title: 'Global compliance',
      description: 'Aligned with GDPR, PCI-DSS, and local data-protection regulations. Regular audits keep our certifications current.',
      icon: FileCheck,
      link: '/company/security#compliance',
    },
    {
      id: 'monitoring',
      title: '24/7 threat monitoring',
      description: 'Continuous security monitoring, anomaly detection, and incident response so threats are identified and neutralised fast.',
      icon: Eye,
      link: '/company/security#monitoring',
    },
    {
      id: 'resilience',
      title: 'Backup & disaster recovery',
      description: 'Automated backups, geo-redundant storage, and tested recovery procedures protect your business against data loss.',
      icon: ShieldCheck,
      link: '/company/security#resilience',
    },
  ];

  return (
    <div className="pt-16">
      <SEO title={PAGE_META.security.title} description={PAGE_META.security.description} fullTitle />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Security' }]} />
      <LightPageHeader
        badge={<span className="type-badge type-badge--light">Security</span>}
        title={content.getContent('security_title', 'Security & Compliance')}
        description={content.getContent('security_desc', 'Enterprise security built into every layer of our platform.')}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionHeading
                title="Trust is our foundation"
                description="Marmidon is designed with a security-first mindset — from infrastructure and code to governance and compliance."
              />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <ScrollReveal key={pillar.id}>
                <ContentCard
                  to={pillar.link}
                  title={pillar.title}
                  description={pillar.description}
                  icon={pillar.icon}
                  footerLabel="Learn more"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <SectionHeading
                title="Need a security review or SOC 2 documentation?"
                description="We share our security posture, audit reports, and compliance roadmap with qualified prospects under NDA."
              />
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-secondary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Request security docs <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
