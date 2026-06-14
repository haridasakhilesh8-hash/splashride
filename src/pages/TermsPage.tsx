import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
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

const termsPoints = [
  'SplashRide content is provided for learning and informational purposes.',
  'Users should verify information before making career, interview, certification, or technology decisions.',
  'SplashRide does not guarantee job placement, certification success, or interview success.',
  'Users should not misuse, copy, scrape, or republish site content without permission.',
];

export default function TermsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions',
    url: absoluteUrl('/terms'),
    description: 'Read the SplashRide terms and conditions for use of the developer learning platform and its informational content.',
  };

  return (
    <div style={{ padding: '2.75rem 2rem 5rem', maxWidth: '980px', margin: '0 auto' }} className="fade-in homepage-root">
      <SEO
        title="Terms & Conditions | SplashRide"
        description="Read the SplashRide terms and conditions for using the developer learning platform and its learning content."
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
            <p style={sectionEyebrowStyle}>Terms & Conditions</p>
            <h1 style={{ ...sectionTitleStyle, fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              Learning content should be used responsibly and with judgment.
            </h1>
            <p style={sectionBodyStyle}>
              These terms explain the basic expectations for using SplashRide and its developer learning content.
            </p>
          </div>

          <div className="homepage-card" style={{ padding: '18px', borderRadius: '14px' }}>
            <div className="homepage-icon-badge" style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(124,58,237,0.12)',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <FileText size={20} />
            </div>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--color-text-primary)', fontSize: '0.98rem', fontWeight: 800 }}>
              Intended use
            </p>
            <p style={sectionBodyStyle}>
              SplashRide is meant to support learning, preparation, and professional growth, but users should still apply independent judgment when making important decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-card" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'grid', gap: '14px' }}>
            {termsPoints.map((item) => (
              <div key={item}>
                <p style={{ ...sectionBodyStyle, color: 'var(--color-text-primary)', fontWeight: 700 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-card" style={{ padding: '20px', borderRadius: '16px' }}>
          <h2 style={{ margin: '0 0 0.6rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
            Content and ownership
          </h2>
          <p style={sectionBodyStyle}>
            SplashRide content is created to help users learn technologies with more clarity and practical context. Users should not copy, scrape, republish, or redistribute content in a way that misuses the platform or its materials without permission.
          </p>
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, #08163d, #1f1660)',
        borderRadius: '16px',
        padding: '1.5rem',
        color: '#ffffff',
      }}>
        <p style={{ ...sectionEyebrowStyle, color: '#93c5fd' }}>Continue Learning</p>
        <h2 style={{ margin: '0 0 0.7rem', fontSize: 'clamp(1.35rem, 3vw, 1.9rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
          Explore the platform with clarity.
        </h2>
        <div className="homepage-hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/about" className="homepage-button-secondary" style={ctaLinkStyle}>
            About SplashRide
          </Link>
          <Link to="/technologies/react" className="homepage-button-primary" style={ctaPrimaryStyle}>
            Explore Technologies
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
