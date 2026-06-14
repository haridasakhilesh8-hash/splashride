import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, PenTool } from 'lucide-react';
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

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    url: absoluteUrl('/contact'),
    description: 'Contact SplashRide for feedback, corrections, suggestions, or collaboration updates.',
  };

  return (
    <div style={{ padding: '2.75rem 2rem 5rem', maxWidth: '980px', margin: '0 auto' }} className="fade-in homepage-root">
      <SEO
        title="Contact | SplashRide"
        description="Contact SplashRide for feedback, corrections, suggestions, or collaboration-related updates."
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
            <p style={sectionEyebrowStyle}>Contact</p>
            <h1 style={{ ...sectionTitleStyle, fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              A simple place for feedback, corrections, suggestions, or collaboration.
            </h1>
            <p style={sectionBodyStyle}>
              SplashRide welcomes thoughtful feedback that helps improve the platform and make the learning experience more useful for developers.
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
              <MessageSquare size={20} />
            </div>
            <p style={{ margin: '0 0 0.7rem', color: 'var(--color-text-primary)', fontSize: '0.98rem', fontWeight: 800 }}>
              Contact availability
            </p>
            <p style={sectionBodyStyle}>
              Contact details will be added soon.
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-card" style={{ padding: '20px', borderRadius: '16px' }}>
          <h2 style={{ margin: '0 0 0.8rem', color: 'var(--color-text-primary)', fontSize: '1.08rem', fontWeight: 800 }}>
            What you can reach out about
          </h2>
          <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {[
              'Feedback about the learning experience',
              'Corrections or content improvements',
              'Suggestions for new topics or technologies',
              'Collaboration-related conversations',
            ].map((item) => (
              <div key={item} className="homepage-card" style={{ padding: '16px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div className="homepage-icon-badge" style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <PenTool size={16} />
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, #08163d, #1f1660)',
        borderRadius: '16px',
        padding: '1.5rem',
        color: '#ffffff',
      }}>
        <p style={{ ...sectionEyebrowStyle, color: '#93c5fd' }}>Keep Exploring</p>
        <h2 style={{ margin: '0 0 0.7rem', fontSize: 'clamp(1.35rem, 3vw, 1.9rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
          Continue with learning or interview preparation.
        </h2>
        <div className="homepage-hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/technologies/react" className="homepage-button-primary" style={ctaPrimaryStyle}>
            Explore Technologies
            <ArrowRight size={15} />
          </Link>
          <Link to="/interview-prep" className="homepage-button-secondary" style={ctaLinkStyle}>
            Start Interview Prep
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
