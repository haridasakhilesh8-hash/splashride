import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl } from '../lib/seo';

const sectionEyebrowStyle: CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--color-accent)',
  margin: '0 0 0.6rem',
};

const sectionTitleStyle: CSSProperties = {
  margin: '0 0 0.8rem',
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
  fontWeight: 900,
  lineHeight: 1.12,
  color: 'var(--color-text-primary)',
  letterSpacing: '-0.03em',
};

const sectionBodyStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.92rem',
  lineHeight: 1.75,
};

export default function PrivacyPolicyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: absoluteUrl('/privacy-policy'),
    description: 'Read the SplashRide privacy policy for how the developer learning platform handles site usage information and policy updates.',
  };

  return (
    <div style={{ padding: '2.75rem 2rem 5rem', maxWidth: '980px', margin: '0 auto' }} className="fade-in homepage-root">
      <SEO
        title="Privacy Policy | SplashRide"
        description="Read the SplashRide privacy policy covering the developer learning platform, site usage information, and policy updates."
        structuredData={structuredData}
      />

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))',
        border: '1px solid rgba(37,99,235,0.16)',
        borderRadius: '18px',
        padding: '2rem',
      }}>
        <div className="split-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.95fr) 1.05fr', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <p style={sectionEyebrowStyle}>Privacy Policy</p>
            <h1 style={{ ...sectionTitleStyle, fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              Simple privacy guidance for a learning-focused platform.
            </h1>
            <p style={sectionBodyStyle}>
              SplashRide is a developer learning platform that provides tutorials, roadmaps, interview preparation, and career learning content. This page explains the basic privacy approach for using the site.
            </p>
          </div>

          <div className="homepage-card" style={{ padding: '18px', borderRadius: '14px' }}>
            <div className="homepage-icon-badge" style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(37,99,235,0.12)',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <ShieldCheck size={20} />
            </div>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--color-text-primary)', fontSize: '0.98rem', fontWeight: 800 }}>
              Current site usage
            </p>
            <p style={sectionBodyStyle}>
              SplashRide does not currently require user accounts, login access, or payment to browse the learning content available on the site.
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-card" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h2 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
                What SplashRide is
              </h2>
              <p style={sectionBodyStyle}>
                SplashRide is a developer learning platform built to help users learn technologies with more clarity, confidence, and career direction through practical tutorials and learning resources.
              </p>
            </div>

            <div>
              <h2 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
                Information and site usage
              </h2>
              <p style={sectionBodyStyle}>
                SplashRide may use basic site or usage information to understand how the website is being used and to improve content quality, usability, and performance. The intention of any such usage data is only to improve the site experience.
              </p>
            </div>

            <div>
              <h2 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
                No account or payment requirement
              </h2>
              <p style={sectionBodyStyle}>
                At this stage, SplashRide does not require account creation, login, subscription payment, or checkout flow for general access to the site and its public learning content.
              </p>
            </div>

            <div>
              <h2 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
                Policy updates
              </h2>
              <p style={sectionBodyStyle}>
                This privacy policy may be updated over time as SplashRide evolves. Any future revisions will be reflected on this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, #08163d, #1f1660)',
        borderRadius: '16px',
        padding: '1.5rem',
        color: '#ffffff',
      }}>
        <p style={{ ...sectionEyebrowStyle, color: '#93c5fd' }}>Explore SplashRide</p>
        <h2 style={{ margin: '0 0 0.7rem', fontSize: 'clamp(1.35rem, 3vw, 1.9rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
          Continue exploring the platform.
        </h2>
        <div className="homepage-hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/about" className="homepage-button-secondary" style={ctaLinkStyle}>
            About SplashRide
          </Link>
          <Link to="/interview-prep" className="homepage-button-primary" style={ctaPrimaryStyle}>
            Start Interview Prep
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

const ctaLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  textDecoration: 'none',
  background: 'rgba(255,255,255,0.04)',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.24)',
  borderRadius: '10px',
  padding: '12px 18px',
  fontSize: '0.88rem',
  fontWeight: 900,
};

const ctaPrimaryStyle: CSSProperties = {
  ...ctaLinkStyle,
  background: 'linear-gradient(135deg, #0ea5ff, #7c3aed)',
  border: '1px solid rgba(255,255,255,0.12)',
};
