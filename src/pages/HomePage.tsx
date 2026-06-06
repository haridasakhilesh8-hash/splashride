import { Link } from 'react-router-dom';
import { useTech } from '../lib/TechContext';
import { technologies } from '../lib/navigation';
import { ArrowRight, Zap, BookOpen, Code, Globe, Target, BarChart3, Sparkles, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl } from '../lib/seo';
import { getActiveInterviewPrepSections, getInterviewPrepStats } from '../content/interview-prep';

export default function HomePage() {
  const { setActiveTechId } = useTech();

  const handleTechClick = (techId: string, active: boolean) => {
    if (!active) return;
    setActiveTechId(techId);
    window.scrollTo(0, 0);
  };

  const activeTechs = technologies.filter(t => t.active);
  const comingSoonTechs = technologies.filter(t => !t.active);
  const interviewPrepSections = getActiveInterviewPrepSections();
  const interviewPrepStats = getInterviewPrepStats();
  const totalTopics = activeTechs.reduce(
    (sum, tech) => sum + tech.categories.flatMap(c => c.items).filter(i => !i.badge).length,
    0
  );

  const techBadges: Record<string, string> = {
    aem: 'Advanced',
    react: 'Popular',
    nextjs: 'Trending',
    java: 'Most Complete',
    springboot: 'Most Complete',
    aws: 'Cloud',
    docker: 'Popular',
    kubernetes: 'Advanced',
  };

  const techDifficulty: Record<string, { label: string; level: number }> = {
    aem: { label: 'Advanced', level: 3 },
    react: { label: 'Beginner', level: 1 },
    nextjs: { label: 'Intermediate', level: 2 },
    java: { label: 'Beginner', level: 1 },
    springboot: { label: 'Intermediate', level: 2 },
    aws: { label: 'Intermediate', level: 2 },
    docker: { label: 'Beginner', level: 1 },
    kubernetes: { label: 'Advanced', level: 3 },
  };

  const careerGoals = [
    {
      title: 'Frontend Engineer',
      desc: 'Build UI fluency with component architecture, routing, rendering, APIs, and performance.',
      techIds: ['react', 'nextjs'],
    },
    {
      title: 'Backend Engineer',
      desc: 'Strengthen core language depth, REST APIs, persistence, security, and production patterns.',
      techIds: ['java', 'springboot'],
    },
    {
      title: 'Cloud Engineer',
      desc: 'Learn cloud foundations, containers, orchestration, deployment, and operational readiness.',
      techIds: ['aws', 'docker', 'kubernetes'],
    },
    {
      title: 'AEM Developer',
      desc: 'Focus on enterprise CMS development with components, templates, Sling Models, HTL, and Dispatcher.',
      techIds: ['aem'],
    },
    {
      title: 'AI Engineer',
      desc: 'Start with AI concepts and connect them to practical full-stack implementation skills.',
      techIds: ['ai', 'react', 'springboot'],
    },
  ];

  const recentlyAdded = [
    { techId: 'kubernetes', slug: 'kubernetes-best-practices', title: 'Kubernetes Best Practices', tech: 'Kubernetes' },
    { techId: 'kubernetes', slug: 'kubernetes-disaster-recovery', title: 'Disaster Recovery', tech: 'Kubernetes' },
    { techId: 'kubernetes', slug: 'kubernetes-monitoring-prometheus', title: 'Prometheus', tech: 'Kubernetes' },
    { techId: 'aws', slug: 'aws-cost-optimization', title: 'Cost Optimization', tech: 'AWS' },
  ];

  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SplashRide',
      url: absoluteUrl('/'),
      description: 'Project-focused developer learning for AEM, React, Next.js, Core Java, Spring Boot, AWS, Docker and Kubernetes.',
      publisher: {
        '@type': 'Organization',
        name: 'SplashRide',
        logo: absoluteUrl('/splashride-logo.png'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'SplashRide technology learning paths',
      itemListElement: activeTechs.map((tech, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/technology/${tech.id}`),
        name: `${tech.label} tutorials`,
        description: tech.description,
      })),
    },
  ];

  const openTopic = (techId: string) => {
    setActiveTechId(techId);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ padding: '3rem 2rem 5rem', maxWidth: '1000px', margin: '0 auto' }} className="fade-in">
      <SEO
        title="SplashRide | Developer Learning Paths, Tutorials and Interview Prep"
        description="Learn AEM, React, Next.js, Core Java, Spring Boot, AWS, Docker and Kubernetes with project-focused tutorials, examples and interview-ready explanations."
        structuredData={homeStructuredData}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '20px',
          padding: '5px 14px',
          marginBottom: '1.5rem',
        }}>
          <Zap size={13} style={{ color: '#6366f1' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Multi-Technology Learning Platform
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}>
          Build real project confidence the way a{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            senior developer
          </span>
          {' '}would teach it.
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.75,
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          Learn AEM, React, Next.js, Java, Spring Boot, AWS, Docker, and Kubernetes through
          architecture-minded explanations, production issues, examples, and interview-ready clarity.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '1.5rem' }}>
          <Link
            to="/technology/react"
            onClick={() => {
              setActiveTechId('react');
              window.scrollTo(0, 0);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              background: 'var(--color-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 700,
            }}
          >
            <BookOpen size={15} />
            Start Learning
          </Link>
          <button
            onClick={() => document.getElementById('technology-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 700,
            }}
          >
            <Target size={15} />
            Choose a Technology
          </button>
        </div>
      </div>

      {/* Choose Your Goal */}
      <div id="choose-goal" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Choose Your Goal
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {careerGoals.map(goal => (
            <div
              key={goal.title}
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-accent)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {goal.title}
                </h3>
                <Target size={14} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <p style={{ margin: '0 0 12px', fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                {goal.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {goal.techIds.map(techId => {
                  const tech = technologies.find(t => t.id === techId);
                  if (!tech) return null;
                  const pillColor = tech.id === 'nextjs' ? 'var(--color-text-primary)' : tech.color;
                  const pillBg = tech.id === 'nextjs' ? 'var(--color-bg-primary)' : `${tech.color}12`;
                  const pillBorder = tech.id === 'nextjs' ? 'var(--color-border-hover)' : `${tech.color}30`;

                  return (
                    <Link
                      key={`${goal.title}-${tech.id}`}
                      to={`/technology/${tech.id}`}
                      onClick={() => {
                        setActiveTechId(tech.id);
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        background: pillBg,
                        border: `1px solid ${pillBorder}`,
                        borderRadius: '20px',
                        color: pillColor,
                        cursor: 'pointer',
                        padding: '5px 9px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      {tech.label}
                      <ArrowRight size={12} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '10px',
        marginBottom: '3rem',
        scrollMarginTop: '80px',
      }}>
        {[
          { icon: <BookOpen size={15} />, value: `${totalTopics}+`, label: 'Topics' },
          { icon: <Globe size={15} />, value: activeTechs.length, label: 'Technologies' },
          { icon: <Code size={15} />, value: `${totalTopics}+`, label: 'Examples' },
          { icon: <BarChart3 size={15} />, value: `${interviewPrepStats.totalQuestions}+`, label: 'Interview Questions' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '14px 16px',
            }}
          >
            <div style={{ color: '#6366f1', flexShrink: 0 }}>{stat.icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Prep */}
      <div id="interview-prep" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Interview Prep
        </h2>

        <Link
          to="/interview-prep"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          style={{
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <p style={{ margin: '0 0 6px', color: 'var(--color-accent)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Available now
              </p>
              <h3 style={{ margin: '0 0 8px', color: 'var(--color-text-primary)', fontSize: '1.15rem', fontWeight: 800 }}>
                Interview Prep
              </h3>
              <p style={{ margin: 0, maxWidth: '650px', color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                Practice real AEM, React, Next.js, Core Java, Spring Boot, AWS, Docker, and Kubernetes interview answers across developer, senior, lead, and architect rounds with production scenarios, common mistakes, and interviewer expectations.
              </p>
            </div>
            <ArrowRight size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Technologies Covered', value: interviewPrepStats.technologiesCovered },
              { label: 'Total Questions', value: interviewPrepStats.totalQuestions },
              { label: 'Experience Levels', value: interviewPrepStats.experienceLevels },
              { label: 'Categories', value: interviewPrepStats.categories },
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px',
              }}>
                <p style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: 800, fontSize: '1.05rem' }}>{item.value}</p>
                <p style={{ margin: '3px 0 0', color: 'var(--color-text-muted)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
            {interviewPrepSections.map(section => (
              <span key={section.technologyId} style={{
                color: 'var(--color-accent)',
                background: 'var(--color-accent-light)',
                border: '1px solid rgba(99,102,241,0.22)',
                borderRadius: '999px',
                padding: '5px 9px',
                fontSize: '0.72rem',
                fontWeight: 800,
              }}>
                {section.technologyLabel}
              </span>
            ))}
          </div>
        </Link>
      </div>

      {/* Active Technologies */}
      <div id="technology-cards" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Available Now
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {activeTechs.map(tech => {
            const liveCount = tech.categories
              .flatMap(c => c.items)
              .filter(i => !i.badge).length;
            return (
              <Link
                key={tech.id}
                to={`/technology/${tech.id}`}
                onClick={() => handleTechClick(tech.id, true)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textDecoration: 'none',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = tech.color;
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = `0 8px 24px ${tech.color}22`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'var(--color-border)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Color accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: tech.color,
                  borderRadius: '12px 12px 0 0',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{tech.icon}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {techBadges[tech.id] && (
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        color: tech.color,
                        background: `${tech.color}14`,
                        border: `1px solid ${tech.color}30`,
                        borderRadius: '20px',
                        padding: '2px 7px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}>
                        {techBadges[tech.id]}
                      </span>
                    )}
                    <ArrowRight size={15} style={{ color: 'var(--color-text-muted)', marginTop: '1px' }} />
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {tech.label}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    {tech.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: `${tech.color}18`,
                    color: tech.color,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    border: `1px solid ${tech.color}30`,
                  }}>
                    {liveCount} topics
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                  }}>
                    {(techDifficulty[tech.id] ?? { label: 'Intermediate', level: 2 }).label}
                    <span style={{ display: 'inline-flex', gap: '2px' }}>
                      {[1, 2, 3].map(n => (
                        <span
                          key={n}
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: n <= (techDifficulty[tech.id]?.level ?? 2) ? tech.color : 'var(--color-border)',
                          }}
                        />
                      ))}
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recently Added */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Recently Added Topics
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {recentlyAdded.map(item => (
            <Link
              key={`${item.techId}-${item.slug}`}
              to={`/technology/${item.techId}/topic/${item.slug}`}
              onClick={() => openTopic(item.techId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                textDecoration: 'none',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '13px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <Sparkles size={14} style={{ color: '#6366f1', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>{item.tech}</p>
                </div>
              </div>
              <TrendingUp size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Coming Soon
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {comingSoonTechs.map(tech => (
            <div
              key={tech.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '14px 16px',
                opacity: 0.6,
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{tech.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {tech.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                  Coming soon
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why SplashRide */}
      <div id="projects" style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '1.75rem',
        scrollMarginTop: '80px',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>
          Why SplashRide?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { icon: <Zap size={15} />, title: 'Project-focused', desc: 'Every explanation includes what actually happens in enterprise projects' },
            { icon: <BookOpen size={15} />, title: 'Beginner-friendly', desc: 'Complex concepts in plain language — no prerequisites assumed' },
            { icon: <Code size={15} />, title: 'Real code examples', desc: 'Working code from real implementations, not toy examples' },
            { icon: <Globe size={15} />, title: 'Multi-technology', desc: 'One platform for AEM, React, Java, AWS, Docker, and more' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ color: '#6366f1', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
