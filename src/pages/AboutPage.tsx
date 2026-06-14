import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  Layers,
  Target,
  UserRound,
} from 'lucide-react';
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

const aboutHighlights = [
  {
    icon: <Compass size={18} />,
    title: 'Career Clarity',
    desc: 'SplashRide helps people understand what to learn next, why it matters, and how different technology paths connect to real careers.',
    accent: '#2563eb',
  },
  {
    icon: <Target size={18} />,
    title: 'Interview Preparation',
    desc: 'The platform connects learning with interview preparation so users can build confidence for real hiring conversations, not just theory.',
    accent: '#7c3aed',
  },
  {
    icon: <Layers size={18} />,
    title: 'Production Knowledge',
    desc: 'Topics go beyond basics into architecture notes, production support thinking, best practices, and practical decision-making.',
    accent: '#0891b2',
  },
];

const audienceCards = [
  'Students trying to understand technology directions after engineering',
  'Fresh graduates and job seekers who need clearer learning paths and interview preparation',
  'Junior developers building stronger real-world foundations',
  'Senior developers who want architecture depth, production clarity, and broader growth',
  'Career switchers moving into software and platform roles',
  'Future tech leads who want stronger ownership, delivery, and decision-making context',
];

const differenceCards = [
  {
    title: 'Built from real confusion',
    desc: 'SplashRide was created from the real experience of lacking career clarity after engineering and trying to understand what actually matters in the industry.',
  },
  {
    title: 'More than tutorials',
    desc: 'It brings together roadmaps, technology paths, interview preparation, projects, certifications, production knowledge, and practical growth steps in one place.',
  },
  {
    title: 'Senior-engineer explanations',
    desc: 'The focus is on how experienced engineers explain trade-offs, production issues, and implementation decisions in real work.',
  },
  {
    title: 'Career-first perspective',
    desc: 'Instead of isolated topics, the site helps users connect learning to jobs, growth, confidence, and long-term progression.',
  },
];

const trustSignals = [
  'Real-world explanations instead of surface-level notes',
  'Clear paths for learning, interview preparation, and career growth',
  'Practical guidance for technologies, production issues, and architecture thinking',
  'A creator perspective shaped by real delivery, enterprise systems, and developer growth',
];

export default function AboutPage() {
  const aboutStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About SplashRide',
      url: absoluteUrl('/about'),
      description: 'Learn why SplashRide was created, who it helps, what makes it different, and how it supports developer learning, interview preparation, and career growth.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Akki',
      jobTitle: 'Technical Lead | Architect | Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'SplashRide',
      },
      description: 'Founder and creator of SplashRide.',
    },
  ];

  return (
    <div style={{ padding: '2.75rem 2rem 5rem', maxWidth: '1120px', margin: '0 auto' }} className="fade-in homepage-root">
      <SEO
        title="About SplashRide | Why It Was Created"
        description="Learn who created SplashRide, why it was built, who it helps, what makes it different, and why developers trust it for learning, interview preparation, and career growth."
        structuredData={aboutStructuredData}
      />

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))',
        border: '1px solid rgba(37,99,235,0.16)',
        borderRadius: '18px',
        padding: '2rem',
      }}>
        <div className="split-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 0.9fr) 1.1fr', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <p style={sectionEyebrowStyle}>About SplashRide</p>
            <h1 style={{ ...sectionTitleStyle, fontSize: 'clamp(2rem, 4vw, 2.9rem)' }}>
              A developer learning platform built to bring clarity, confidence, and direction.
            </h1>
            <p style={sectionBodyStyle}>
              SplashRide exists to help people understand technology paths, roadmaps, interview preparation, production knowledge, projects, certifications, and the real growth steps behind becoming stronger engineers.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {aboutHighlights.map((item) => (
              <div key={item.title} className="homepage-card" style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                background: 'var(--color-bg-card)',
                borderRadius: '14px',
              }}>
                <div className="homepage-icon-badge" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${item.accent}14`,
                  color: item.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <h2 style={{ margin: '0 0 4px', color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: 800 }}>
                    {item.title}
                  </h2>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="split-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.92fr) 1.08fr', gap: '1.5rem', alignItems: 'start' }}>
          <div>
            <p style={sectionEyebrowStyle}>Why I Created SplashRide</p>
            <h2 style={sectionTitleStyle}>Built from the need for clearer direction after engineering.</h2>
            <p style={sectionBodyStyle}>
              SplashRide was created from the real experience of lacking career clarity after engineering. The intention is to reduce that confusion for others by making technology learning more structured, practical, interview-ready, and connected to real professional growth.
            </p>
          </div>

          <div className="homepage-card" style={{ padding: '18px', borderRadius: '14px' }}>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--color-text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>
              The main intention behind the website
            </p>
            <p style={sectionBodyStyle}>
              Help users understand what to learn, how to grow, how technologies are used in real work, what interviewers expect, what breaks in production, and how to move from confusion to confidence step by step.
            </p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <p style={sectionEyebrowStyle}>Who This Website Is For</p>
        <h2 style={sectionTitleStyle}>Designed for learners, job seekers, working developers, and future leaders.</h2>
        <div className="homepage-goal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {audienceCards.map((item) => (
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
                  <BookOpen size={16} />
                </div>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="homepage-section">
        <p style={sectionEyebrowStyle}>What Makes SplashRide Different</p>
        <h2 style={sectionTitleStyle}>It connects learning with careers, interviews, and real engineering work.</h2>
        <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {differenceCards.map((item, index) => (
            <div key={item.title} className="homepage-card" style={{ padding: '18px', borderRadius: '14px' }}>
              <div className="homepage-icon-badge" style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: index % 2 === 0 ? 'rgba(37,99,235,0.12)' : 'rgba(124,58,237,0.12)',
                color: index % 2 === 0 ? '#2563eb' : '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                {index % 2 === 0 ? <Layers size={18} /> : <Target size={18} />}
              </div>
              <h3 style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.98rem', fontWeight: 800 }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.68 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="homepage-section">
        <div className="split-section" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.95fr) 1.05fr', gap: '1.5rem', alignItems: 'start' }}>
          <div>
            <p style={sectionEyebrowStyle}>Why You Should Visit SplashRide</p>
            <h2 style={sectionTitleStyle}>A place to return to when you need practical direction and trustworthy learning context.</h2>
            <p style={sectionBodyStyle}>
              SplashRide is built to be useful not just once, but repeatedly across learning, preparation, troubleshooting, and career growth. It is meant to be a practical companion for understanding both the technology itself and the path around it.
            </p>
          </div>

          <div className="homepage-card" style={{ padding: '18px', borderRadius: '14px' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
              {trustSignals.map((item) => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.65 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '16px',
        padding: '1.6rem',
      }}>
        <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.6rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '116px',
              height: '116px',
              borderRadius: '50%',
              margin: '0 auto 0.9rem',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              border: '4px solid var(--color-bg-primary)',
              boxShadow: '0 14px 30px rgba(37,99,235,0.2)',
            }}>
              <UserRound size={46} />
            </div>
            <h3 style={{ margin: '0 0 3px', color: 'var(--color-text-primary)', fontSize: '1.05rem', fontWeight: 900 }}>
              Akki
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.5 }}>
              Founder & Creator
              <br />
              Technical Lead | Architect | Developer
            </p>
          </div>

          <div>
            <p style={sectionEyebrowStyle}>About the Creator</p>
            <h2 style={{ ...sectionTitleStyle, marginBottom: '0.75rem' }}>Built by a developer, for developers.</h2>
            <p style={{ ...sectionBodyStyle, marginBottom: '0.8rem' }}>
              I work as a technical lead with experience across AEM, CMS platforms, enterprise applications, content systems, and large-scale digital experiences.
            </p>
            <p style={{ ...sectionBodyStyle, marginBottom: '1rem' }}>
              I created SplashRide to make technical learning more practical, interview-focused, and production-ready. Every topic is designed to explain not just what a technology is, but how it is actually used in real projects.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Enterprise projects', 'Interview clarity', 'Architecture thinking', 'Production support'].map((label) => (
                <span key={label} className="homepage-tag" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-accent)',
                  background: 'var(--color-accent-light)',
                  borderRadius: '999px',
                  padding: '6px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                }}>
                  <Briefcase size={12} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, #08163d, #1f1660)',
        borderRadius: '16px',
        padding: '1.6rem',
        color: '#ffffff',
      }}>
        <p style={{ ...sectionEyebrowStyle, color: '#93c5fd' }}>Start Exploring</p>
        <h2 style={{ margin: '0 0 0.7rem', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
          Learn with more clarity, confidence, and direction.
        </h2>
        <p style={{ margin: '0 0 1.1rem', color: 'rgba(255,255,255,0.82)', fontSize: '0.9rem', lineHeight: 1.72, maxWidth: '720px' }}>
          Explore technology tracks, start interview preparation, and keep building stronger engineering judgment with SplashRide.
        </p>
        <div className="homepage-hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/technologies/react"
            className="homepage-button-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #0ea5ff, #7c3aed)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px',
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 900,
            }}
          >
            Explore Technologies
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/interview-prep"
            className="homepage-button-secondary"
            style={{
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
            }}
          >
            Start Interview Prep
          </Link>
        </div>
      </section>
    </div>
  );
}
