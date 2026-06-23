import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Code,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTech } from '../lib/TechContext';
import { technologyCategoryGroups } from '../lib/catalogOrder';
import { technologies } from '../lib/navigation';
import { absoluteUrl } from '../lib/seo';
import { getActiveInterviewPrepSections, getInterviewPrepStats } from '../content/interview-prep';
import { careerRoadmaps } from '../content/careerPaths';
import { getTechnologyPath } from '../lib/routes';

function TechJourneyVisual() {
  const modules = [
    {
      step: '01',
      title: 'Learn',
      description: 'Practical tutorials and concepts explained clearly.',
      accent: '#F97316',
      cardIcon: <BookOpen size={24} strokeWidth={2.1} />,
      sideIcon: <Code size={28} strokeWidth={2.05} />,
      glow: 'rgba(249,115,22,0.18)',
    },
    {
      step: '02',
      title: 'Practice',
      description: 'Projects and exercises to strengthen your skills.',
      accent: '#FB4F8B',
      cardIcon: <Code size={24} strokeWidth={2.1} />,
      sideIcon: <Briefcase size={28} strokeWidth={2.05} />,
      glow: 'rgba(251,79,139,0.16)',
    },
    {
      step: '03',
      title: 'Interview',
      description: 'Real interview questions and scenarios.',
      accent: '#3B82F6',
      cardIcon: <Target size={24} strokeWidth={2.1} />,
      sideIcon: <ShieldCheck size={28} strokeWidth={2.05} />,
      glow: 'rgba(59,130,246,0.17)',
    },
    {
      step: '04',
      title: 'Grow',
      description: 'Career roadmaps and production-level skills.',
      accent: '#10B981',
      cardIcon: <Rocket size={24} strokeWidth={2.1} />,
      sideIcon: <Sparkles size={28} strokeWidth={2.05} />,
      glow: 'rgba(16,185,129,0.16)',
    },
  ];

  return (
    <div className="hero-platform-visual" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '560px',
      minHeight: '604px',
      borderRadius: '32px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'radial-gradient(circle at 88% 8%, rgba(255,122,24,0.12), transparent 25%), radial-gradient(circle at 94% 92%, rgba(16,185,129,0.1), transparent 26%), linear-gradient(180deg, rgba(9,12,19,0.98), rgba(10,15,24,0.96))',
      boxShadow: '0 24px 56px rgba(2,6,23,0.28)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03), transparent 24%, transparent 82%, rgba(16,185,129,0.035))',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.62), transparent 92%)',
        opacity: 0.22,
        pointerEvents: 'none',
      }} />

      <svg
        viewBox="0 0 620 620"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroVerticalPath" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="33%" stopColor="#FB4F8B" />
            <stop offset="66%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="heroVerticalGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="0.9 0 0 0 0
                      0 0.7 0 0 0
                      0 0 0.85 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
        <path
          d="M112 212 C88 212 82 222 82 244 L82 266 C82 288 89 300 112 300 L132 300"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M112 212 C88 212 82 222 82 244 L82 266 C82 288 89 300 112 300 L132 300"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#heroVerticalGlow)"
          opacity="0.16"
        />
        <path
          d="M112 300 C88 300 82 312 82 336 L82 392 C82 416 89 430 112 430 L132 430"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M112 300 C88 300 82 312 82 336 L82 392 C82 416 89 430 112 430 L132 430"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#heroVerticalGlow)"
          opacity="0.15"
        />
        <path
          d="M112 430 C88 430 82 442 82 468 L82 542 C82 566 89 580 112 580 L132 580"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M112 430 C88 430 82 442 82 468 L82 542 C82 566 89 580 112 580 L132 580"
          fill="none"
          stroke="url(#heroVerticalPath)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#heroVerticalGlow)"
          opacity="0.14"
        />
      </svg>

      <div className="hero-learning-panel" style={{
        position: 'absolute',
        inset: '18px',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'linear-gradient(180deg, rgba(14,17,24,0.92), rgba(10,14,22,0.88))',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        padding: '22px 22px 20px',
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <h2 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 900, color: '#F8FAFC', letterSpacing: '-0.03em' }}>
            <span style={{ color: '#F97316' }}>SplashRide</span> Learning System
          </h2>
          <p style={{ margin: '8px auto 0', color: '#CBD5E1', fontSize: '0.78rem', lineHeight: 1.6, maxWidth: '320px' }}>
            Your complete learning journey, structured for success.
          </p>
          <div style={{
            width: '48px',
            height: '2px',
            borderRadius: '999px',
            margin: '14px auto 0',
            background: 'linear-gradient(90deg, #F97316, #FB7185)',
          }} />
        </div>

        <div className="hero-learning-system-flow" style={{ display: 'grid', gap: '11px' }}>
          {modules.map((item) => (
            <div
              key={item.title}
              className="hero-learning-step"
              style={{
                display: 'grid',
                gridTemplateColumns: '86px minmax(0, 1fr)',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <div className="hero-learning-step-rail" style={{ position: 'relative', minHeight: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  position: 'absolute',
                  left: '1px',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '11px',
                  height: '11px',
                  borderRadius: '999px',
                  background: '#0B101A',
                  border: `2px solid ${item.accent}`,
                  boxShadow: `0 0 12px ${item.accent}26`,
                }} />
                <div style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '999px',
                  display: 'grid',
                  placeItems: 'center',
                  color: item.accent,
                  background: `radial-gradient(circle at 35% 30%, ${item.accent}38, ${item.accent}18 56%, rgba(10,15,24,0.12) 100%)`,
                  border: `1px solid ${item.accent}66`,
                  boxShadow: `0 0 0 10px ${item.accent}0F, 0 0 26px ${item.accent}1A`,
                }}>
                  {item.cardIcon}
                </div>
              </div>

              <div
                className="hero-learning-step-copy"
                style={{
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: `linear-gradient(180deg, rgba(17,24,39,0.86), rgba(11,16,26,0.82)), ${item.glow}`,
                  boxShadow: '0 14px 30px rgba(2,6,23,0.14)',
                  padding: '14px 16px',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '5px' }}>
                    <span style={{ color: item.accent, fontSize: '0.92rem', fontWeight: 900 }}>{item.step}</span>
                    <h3 style={{ margin: 0, color: '#F8FAFC', fontSize: '0.98rem', fontWeight: 900 }}>{item.title}</h3>
                  </div>
                  <p style={{ margin: 0, color: '#CBD5E1', fontSize: '0.79rem', lineHeight: 1.55, maxWidth: '270px' }}>
                    {item.description}
                  </p>
                </div>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  display: 'grid',
                  placeItems: 'center',
                  color: item.accent,
                  background: 'rgba(8,10,15,0.48)',
                  border: `1px solid ${item.accent}55`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}>
                  {item.sideIcon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { setActiveTechId } = useTech();

  const handleTechClick = (techId: string, active: boolean) => {
    if (!active) return;
    setActiveTechId(techId);
    window.scrollTo(0, 0);
  };

  const activeTechs = technologies.filter(t => t.active);
  const interviewPrepSections = getActiveInterviewPrepSections();
  const interviewPrepStats = getInterviewPrepStats();
  const interviewQuestionCountByTech = new Map(
    interviewPrepSections.map((section) => [section.technologyId, section.questions.length]),
  );
  const technologyMap = new Map(technologies.map((tech) => [tech.id, tech] as const));
  const careerRoadmapMap = new Map(careerRoadmaps.map((roadmap) => [roadmap.slug, roadmap] as const));
  const totalTopics = activeTechs.reduce(
    (sum, tech) => sum + tech.categories.flatMap(c => c.items).filter(i => !i.badge).length,
    0
  );

  const techBadges: Record<string, string> = {
    aem: 'Advanced',
    contentful: 'New',
    sitecore: 'Enterprise',
    react: 'Popular',
    nextjs: 'Trending',
    java: 'Most Complete',
    springboot: 'Most Complete',
    aws: 'Cloud',
    azure: 'New',
    docker: 'Popular',
    kubernetes: 'Advanced',
    'ai-llm': 'New',
  };

  const techDifficulty: Record<string, { label: string; level: number }> = {
    aem: { label: 'Advanced', level: 3 },
    contentful: { label: 'Intermediate', level: 2 },
    sitecore: { label: 'Advanced', level: 3 },
    react: { label: 'Beginner', level: 1 },
    nextjs: { label: 'Intermediate', level: 2 },
    java: { label: 'Beginner', level: 1 },
    springboot: { label: 'Intermediate', level: 2 },
    aws: { label: 'Intermediate', level: 2 },
    azure: { label: 'Intermediate', level: 2 },
    docker: { label: 'Beginner', level: 1 },
    kubernetes: { label: 'Advanced', level: 3 },
    'ai-llm': { label: 'Advanced', level: 3 },
  };

  const homepagePalette = {
    orange: '#F97316',
    pink: '#FB4F8B',
    blue: '#3B82F6',
    green: '#10B981',
    gold: '#F59E0B',
    violet: '#8B5CF6',
    warm: '#F6A04D',
  } as const;

  const directionCards = [
    {
      icon: <BookOpen size={18} />,
      title: 'Learn Technologies',
      desc: 'Go from fundamentals to real implementation across enterprise CMS, frontend, backend, cloud, and AI.',
      cta: 'Explore Technologies',
      action: 'scroll-tech' as const,
      accent: homepagePalette.blue,
    },
    {
      icon: <Target size={18} />,
      title: 'Prepare for Interviews',
      desc: 'Practice frequently asked questions, scenario answers, architecture thinking, and production support conversations.',
      cta: 'Start Interview Prep',
      to: '/interview-prep',
      accent: homepagePalette.pink,
    },
    {
      icon: <Briefcase size={18} />,
      title: 'Follow Career Paths',
      desc: 'Pick a role, understand the roadmap, and learn the technology mix that supports long-term growth.',
      cta: 'Explore Career Paths',
      to: '/career-paths',
      accent: homepagePalette.gold,
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Build Projects / Production Skills',
      desc: 'Learn troubleshooting, performance, deployment, observability, and the issues that appear after release.',
      cta: 'See Popular Technologies',
      action: 'scroll-tech' as const,
      accent: homepagePalette.green,
    },
  ];

  const whySplashRide = [
    {
      icon: <Briefcase size={18} />,
      title: 'Real-world learning',
      desc: 'Learn technologies through project use-cases, implementation patterns, and what teams actually ship.',
      accent: homepagePalette.orange,
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Production issues included',
      desc: 'Go beyond tutorials with troubleshooting, performance, support, reliability, and release-time thinking.',
      accent: homepagePalette.green,
    },
    {
      icon: <Target size={18} />,
      title: 'Interview-focused explanations',
      desc: 'Prepare for frequently asked questions, scenario answers, architecture rounds, and senior-level discussions.',
      accent: homepagePalette.pink,
    },
    {
      icon: <Rocket size={18} />,
      title: 'Career clarity',
      desc: 'Connect technologies to roles, growth paths, and the skills that move you toward lead or architect responsibilities.',
      accent: homepagePalette.gold,
    },
    {
      icon: <CheckCircle2 size={18} />,
      title: 'Senior-engineer style',
      desc: 'Understand not just what something is, but why it matters, when to use it, and how to explain the trade-offs clearly.',
      accent: homepagePalette.blue,
    },
  ];

  const ecosystemDomainDetails = {
    'Enterprise CMS': {
      desc: 'Enterprise and headless CMS learning across AEM, Contentful, Sitecore, architecture, workflows, modeling, and delivery.',
      icon: <Building2 size={20} />,
      accent: homepagePalette.orange,
    },
    Frontend: {
      desc: 'Modern UI engineering, rendering, routing, state, performance, and testing.',
      icon: <Code size={20} />,
      accent: homepagePalette.blue,
    },
    Backend: {
      desc: 'Core language depth, APIs, persistence, security, transactions, and production systems.',
      icon: <Server size={20} />,
      accent: homepagePalette.green,
    },
    'Cloud & DevOps': {
      desc: 'Cloud platforms, containers, orchestration, CI/CD, observability, and operations.',
      icon: <Cloud size={20} />,
      accent: homepagePalette.violet,
    },
    AI: {
      desc: 'LLM foundations, prompt design, RAG, vector databases, agents, evaluation, and production AI systems.',
      icon: <Sparkles size={20} />,
      accent: homepagePalette.pink,
    },
  } as const;

  const ecosystemDomains = technologyCategoryGroups.map((group) => ({
    title: group.label,
    desc: ecosystemDomainDetails[group.label].desc,
    icon: ecosystemDomainDetails[group.label].icon,
    techIds: group.technologyIds,
    accent: ecosystemDomainDetails[group.label].accent,
  }));

  const featuredInterviewTracks = [
    { technologyId: 'aem', label: 'AEM Interview Prep', description: 'Components, Sling Models, Dispatcher, Cloud Service, and production scenarios.' },
    { technologyId: 'contentful', label: 'Contentful Interview Prep', description: 'Content modeling, delivery APIs, preview, localization, and enterprise CMS trade-offs.' },
    { technologyId: 'sitecore', label: 'Sitecore Interview Prep', description: 'Templates, SXA, headless delivery, XM Cloud direction, and production support.' },
    { technologyId: 'react', label: 'React Interview Prep', description: 'Hooks, rendering behavior, performance, architecture, and frontend debugging.' },
    { technologyId: 'core-java', label: 'Java Interview Prep', description: 'Core Java, concurrency, JVM reasoning, API design, and backend fundamentals.' },
    { technologyId: 'aws', label: 'Cloud / DevOps Interview Prep', description: 'Cloud services, Docker, Kubernetes, CI/CD, reliability, and operations thinking.' },
  ];

  const featuredCareerPaths = [
    { slug: 'frontend-engineer', title: 'Frontend Engineer', technologyIds: ['react', 'nextjs'] },
    { slug: 'backend-engineer', title: 'Backend Engineer', technologyIds: ['java', 'springboot'] },
    { slug: 'aem-developer', title: 'AEM Developer', technologyIds: ['aem'] },
    { slug: 'contentful-developer', title: 'Contentful Developer', technologyIds: ['contentful'] },
    { slug: 'sitecore-developer', title: 'Sitecore Developer', technologyIds: ['sitecore'] },
    { slug: 'cloud-engineer', title: 'Cloud Engineer', technologyIds: ['aws', 'azure', 'docker', 'kubernetes'] },
    { slug: 'ai-engineer', title: 'AI Engineer', technologyIds: ['ai-llm'] },
    { title: 'Tech Lead / Architect', description: 'Grow from implementation depth into architecture, standards, production ownership, and cross-team decision making.', technologyIds: ['aem', 'springboot', 'aws', 'ai-llm'] },
  ];

  const heroHighlights = [
    { label: 'Real-world tutorials', icon: <BookOpen size={14} />, color: homepagePalette.gold },
    { label: 'Interview focused', icon: <Target size={14} />, color: homepagePalette.pink },
    { label: 'Production issues', icon: <ShieldCheck size={14} />, color: homepagePalette.green },
  ];

  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SplashRide',
      url: absoluteUrl('/'),
      slogan: 'Ride Your Tech Journey',
      description: 'SplashRide is a premium developer learning platform for learning paths, interview preparation, architecture knowledge, production experience, and career growth.',
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
        url: absoluteUrl(getTechnologyPath(tech.id)),
        name: `${tech.label} tutorials`,
        description: tech.description,
      })),
    },
  ];

  const getSectionEyebrowStyle = (color: string) => ({
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color,
    margin: '0 0 0.6rem',
  });

  return (
    <div style={{ padding: '2.5rem 2rem 5rem', maxWidth: '1120px', margin: '0 auto' }} className="fade-in homepage-root">
      <SEO
        title="SplashRide | Ride Your Tech Journey"
        description="SplashRide helps developers grow through learning paths, interview preparation, architecture knowledge, production experience, and career-focused technology learning."
        structuredData={homeStructuredData}
      />

      {/* Hero */}
      <section className="homepage-hero-section" style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginTop: '-2.5rem',
        marginBottom: '3rem',
        background: 'radial-gradient(circle at 80% 24%, rgba(255,122,24,0.16), transparent 26%), radial-gradient(circle at 92% 18%, rgba(251,113,133,0.12), transparent 22%), radial-gradient(circle at 18% 82%, rgba(16,185,129,0.07), transparent 16%), radial-gradient(circle at 58% 14%, rgba(59,130,246,0.06), transparent 18%), linear-gradient(118deg, #050914 0%, #0A1020 54%, #14111B 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, transparent 0 56%, rgba(249,115,22,0.08) 62%, rgba(251,113,133,0.12) 74%, transparent 84%)',
          opacity: 1,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.8), transparent 82%)',
          opacity: 0.35,
          pointerEvents: 'none',
        }} />
        <div className="homepage-hero-inner hero-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '3.8rem 2rem 3.95rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 560px) minmax(460px, 1fr)',
          gap: '3.25rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
        <div className="homepage-hero-copy">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(17,24,39,0.68)',
            border: '1px solid rgba(148,163,184,0.22)',
            borderRadius: '999px',
            padding: '7px 13px',
            marginBottom: '1.05rem',
            boxShadow: '0 10px 28px rgba(2,6,23,0.22)',
            backdropFilter: 'blur(12px)',
          }}>
            <span style={{ color: '#F97316', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              {'<>'}
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#F8FAFC', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Developer Learning Platform
            </span>
          </div>

          <h1 className="homepage-hero-title" style={{
            fontSize: 'clamp(3rem, 5.2vw, 4.35rem)',
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-0.045em',
            lineHeight: 0.98,
            margin: '0 0 1.15rem',
            maxWidth: '560px',
          }}>
            Learn.
            <br />
            Practice.
            <br />
            Interview.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #F97316 0%, #FB7185 52%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 18px rgba(249,115,22,0.12))',
            }}>
              Grow.
            </span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#CBD5E1',
            lineHeight: 1.82,
            maxWidth: '560px',
            margin: 0,
          }}>
            Master technologies with practical tutorials, real interview preparation, production issues, projects, and career-focused roadmaps.
          </p>

          <div className="homepage-hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '2rem', alignItems: 'center' }}>
            <button
              onClick={() => document.getElementById('technology-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="homepage-button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #F97316 0%, #FB7185 100%)',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '12px',
                padding: '13px 22px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 900,
                boxShadow: '0 16px 34px rgba(249,115,22,0.24)',
              }}
            >
              Explore Technologies
              <ArrowRight size={15} />
            </button>
            <Link
              to="/interview-prep"
              className="homepage-button-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                justifyContent: 'center',
                background: 'rgba(17,24,39,0.56)',
                color: '#F8FAFC',
                border: '1px solid rgba(203,213,225,0.24)',
                borderRadius: '12px',
                padding: '13px 22px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 900,
                backdropFilter: 'blur(12px)',
              }}
            >
              <Target size={15} />
              Start Interview Prep
            </Link>
            <Link
              to="/career-paths"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                textDecoration: 'none',
                color: '#F6A04D',
                padding: '10px 2px',
                fontSize: '0.82rem',
                fontWeight: 800,
              }}
            >
              View Career Paths
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
            {heroHighlights.map((item) => (
              <span
                key={item.label}
                className="homepage-tag"
                style={{
                  color: '#F8FAFC',
                  background: 'rgba(17,24,39,0.62)',
                  borderRadius: '999px',
                  padding: '7px 11px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  border: '1px solid rgba(148,163,184,0.16)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: item.color, display: 'inline-flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="homepage-hero-visual" style={{
          minHeight: '604px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'visible',
        }}>
          <div style={{
            position: 'absolute',
            inset: '10% -4% 8% 6%',
            background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.14), rgba(251,113,133,0.08) 40%, transparent 74%)',
            filter: 'blur(32px)',
            opacity: 0.78,
            pointerEvents: 'none',
          }} />
          <TechJourneyVisual />
        </div>
        </div>
      </section>

      <section id="choose-goal" className="homepage-section" style={{ scrollMarginTop: '80px' }}>
        <p style={getSectionEyebrowStyle(homepagePalette.blue)}>Choose your direction</p>
        <h2 className="homepage-section-title" style={{
          margin: '0 0 0.8rem',
          fontSize: 'clamp(1.55rem, 3vw, 2.2rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.03em',
        }}>
          Start with what you need right now.
        </h2>
        <p style={{ margin: '0 0 1.3rem', maxWidth: '760px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Learn a technology, get interview ready, pick a role, or strengthen production skills without jumping between disconnected resources.
        </p>

        <div className="homepage-goal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {directionCards.map((item) => {
            const content = (
              <>
                <div className="homepage-icon-badge" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${item.accent}14`,
                  color: item.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.98rem', fontWeight: 900 }}>
                  {item.title}
                </h3>
                <p style={{ margin: '0 0 14px', color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.62 }}>
                  {item.desc}
                </p>
                <div style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: item.accent,
                  fontSize: '0.78rem',
                  fontWeight: 900,
                }}>
                  <span>{item.cta}</span>
                  <ArrowRight size={14} />
                </div>
              </>
            );

            const cardStyle = {
              display: 'flex',
              flexDirection: 'column' as const,
              textDecoration: 'none',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '14px',
              padding: '18px',
              minHeight: '210px',
            };

            if (item.action === 'scroll-tech') {
              return (
                <button
                  key={item.title}
                  type="button"
                  className="homepage-card"
                  onClick={() => document.getElementById('technology-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{
                    ...cardStyle,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.title}
                to={item.to ?? '/'}
                className="homepage-card"
                onClick={() => window.scrollTo(0, 0)}
                style={cardStyle}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Technologies */}
      <section id="technology-cards" className="homepage-section" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <p style={{ ...getSectionEyebrowStyle(homepagePalette.orange), textAlign: 'center' }}>Popular technologies</p>
        <h2 className="homepage-section-title" style={{
          margin: '0 0 1.3rem',
          textAlign: 'center',
          color: 'var(--color-text-primary)',
          fontSize: 'clamp(1.45rem, 3vw, 2rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
        }}>
          Learn the stacks teams actually hire for.
        </h2>
        <p style={{ margin: '0 auto 1.5rem', maxWidth: '760px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Browse technologies by category, then open the full learning track for tutorials, production notes, and interview preparation.
        </p>

        <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
          {ecosystemDomains.map(domain => (
            <div key={domain.title} className="homepage-card" style={{
              background: 'var(--color-bg-secondary)',
              border: `1px solid ${domain.accent}30`,
              borderRadius: '12px',
              padding: '16px',
            }}>
              <div className="homepage-icon-badge" style={{ color: domain.accent, marginBottom: '10px', width: '38px', height: '38px', borderRadius: '10px', background: `${domain.accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{domain.icon}</div>
              <h3 style={{ margin: '0 0 5px', color: 'var(--color-text-primary)', fontSize: '0.95rem', fontWeight: 900 }}>
                {domain.title}
              </h3>
              <p style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)', fontSize: '0.76rem', lineHeight: 1.55 }}>
                {domain.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {domain.techIds.map(techId => {
                  const tech = technologies.find(t => t.id === techId);
                  if (!tech) return null;
                  return (
                    <Link
                      key={`${domain.title}-${tech.id}`}
                      to={getTechnologyPath(tech.id)}
                      onClick={() => handleTechClick(tech.id, tech.active)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none',
                        color: tech.active ? domain.accent : 'var(--color-text-muted)',
                        background: tech.active ? `${domain.accent}12` : 'var(--color-bg-primary)',
                        border: `1px solid ${tech.active ? `${domain.accent}28` : 'var(--color-border)'}`,
                        borderRadius: '999px',
                        padding: '5px 8px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                      }}
                    >
                      {tech.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="homepage-tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {activeTechs.map(tech => {
            const liveCount = tech.categories
              .flatMap(c => c.items)
              .filter(i => !i.badge).length;
            return (
              <Link
                key={tech.id}
                to={getTechnologyPath(tech.id)}
                onClick={() => handleTechClick(tech.id, true)}
                className="homepage-card"
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
                        fontWeight: 800,
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
                  <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                    {tech.label}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    {tech.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
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
                    fontWeight: 700,
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
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                  }}>
                    {interviewQuestionCountByTech.get(tech.id) ?? 0} interview questions
                  </span>
                </div>

                <div style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  paddingTop: '4px',
                  color: tech.color,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                }}>
                  <span>Open Technology</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="interview-prep" className="homepage-section" style={{ scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '16px', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <div>
            <p style={getSectionEyebrowStyle(homepagePalette.pink)}>Interview prep</p>
            <h2 className="homepage-section-title" style={{
              margin: '0 0 0.55rem',
              color: 'var(--color-text-primary)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
            }}>
              Prepare for the questions that matter most.
            </h2>
            <p style={{ margin: 0, maxWidth: '720px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Learn how experienced engineers answer fundamentals, production issues, architecture scenarios, and trade-off questions across the stacks teams hire for.
            </p>
          </div>
          <Link
            to="/interview-prep"
            className="homepage-button-muted"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              background: 'var(--color-bg-secondary)',
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 900,
            }}
          >
            Start Interview Prep
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {featuredInterviewTracks.map((track) => {
            const section = interviewPrepSections.find((item) => item.technologyId === track.technologyId);
            const tech = technologyMap.get(track.technologyId === 'core-java' ? 'java' : track.technologyId);
            if (!section) return null;

            return (
              <Link
                key={track.technologyId}
                to={`/interview-prep/${track.technologyId}`}
                className="homepage-card"
                onClick={() => window.scrollTo(0, 0)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px',
                  padding: '18px',
                  minHeight: '208px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                  <div className="homepage-icon-badge" style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${tech?.color ?? '#2563eb'}14`,
                    color: tech?.color ?? 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                  }}>
                    {tech?.icon ?? 'Q'}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {section.questions.length} Q&A
                  </span>
                </div>
                <h3 style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.96rem', fontWeight: 900 }}>
                  {track.label}
                </h3>
                <p style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.62 }}>
                  {track.description}
                </p>
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: tech?.color ?? 'var(--color-accent)',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                }}>
                  <span>Open track</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="homepage-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '16px', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <div>
            <p style={getSectionEyebrowStyle(homepagePalette.gold)}>Career paths</p>
            <h2 className="homepage-section-title" style={{
              margin: '0 0 0.55rem',
              color: 'var(--color-text-primary)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
            }}>
              Turn learning into career direction.
            </h2>
            <p style={{ margin: 0, maxWidth: '720px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Follow role-based roadmaps for developer growth, stack depth, production confidence, and the path toward lead or architect responsibilities.
            </p>
          </div>
          <Link
            to="/career-paths"
            className="homepage-button-muted"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              background: 'var(--color-bg-secondary)',
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 900,
            }}
          >
            Explore Career Paths
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {featuredCareerPaths.map((item) => {
            const roadmap = item.slug ? careerRoadmapMap.get(item.slug) : null;
            const primaryTech = item.technologyIds.map((techId) => technologyMap.get(techId)).find(Boolean);
            const cardContent = (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                  <div className="homepage-icon-badge" style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${primaryTech?.color ?? '#2563eb'}14`,
                    color: primaryTech?.color ?? 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                  }}>
                    {roadmap?.icon ?? primaryTech?.icon ?? 'R'}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {roadmap?.duration ?? 'Growth path'}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.96rem', fontWeight: 900 }}>
                  {item.title}
                </h3>
                <p style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.62 }}>
                  {item.description ?? roadmap?.summary ?? 'Role-based learning guidance for practical growth and interview readiness.'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                  {item.technologyIds.slice(0, 4).map((techId) => {
                    const tech = technologyMap.get(techId);
                    if (!tech) return null;
                    return (
                      <span
                        key={`${item.title}-${techId}`}
                        className="homepage-tag"
                        style={{
                          color: tech.id === 'nextjs' ? 'var(--color-text-primary)' : tech.color,
                          background: tech.id === 'nextjs' ? 'var(--color-bg-primary)' : `${tech.color}12`,
                          borderRadius: '999px',
                          padding: '5px 9px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                        }}
                      >
                        {tech.label}
                      </span>
                    );
                  })}
                </div>
                <div style={{
                  marginTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: primaryTech?.color ?? 'var(--color-accent)',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                }}>
                  <span>{item.slug ? 'Open path' : 'Included across paths'}</span>
                  <ArrowRight size={14} />
                </div>
              </>
            );

            if (!item.slug) {
              return (
                <div
                  key={item.title}
                  className="homepage-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '14px',
                    padding: '18px',
                    minHeight: '230px',
                  }}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={item.slug}
                to={`/career-paths/${item.slug}`}
                className="homepage-card"
                onClick={() => window.scrollTo(0, 0)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '14px',
                  padding: '18px',
                  minHeight: '230px',
                }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="homepage-section">
        <p style={{ ...getSectionEyebrowStyle(homepagePalette.green), textAlign: 'center' }}>Why SplashRide</p>
        <h2 className="homepage-section-title" style={{
          margin: '0 auto 1.1rem',
          textAlign: 'center',
          maxWidth: '660px',
          fontSize: 'clamp(1.5rem, 3vw, 1.95rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
        }}>
          Practical learning with clarity, depth, and direction.
        </h2>
        <div className="homepage-domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
          {whySplashRide.map(item => (
            <div
              key={item.title}
              className="homepage-card"
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '16px',
                minHeight: '152px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div className="homepage-icon-badge" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${item.accent}14`,
                  color: item.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '0.9rem', fontWeight: 900 }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.79rem', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '18px',
        padding: '1.4rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1.22fr)', gap: '1.4rem', alignItems: 'center' }} className="split-section">
          <div className="homepage-card" style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '18px',
            minHeight: '100%',
          }}>
            <div className="homepage-icon-badge" style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'rgba(37,99,235,0.14)',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <Rocket size={20} />
            </div>
            <p style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.84rem', fontWeight: 900 }}>
              Built by a working developer, for developers.
            </p>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.62 }}>
              A focused learning platform shaped by real project delivery, interview pressure, and career-growth confusion.
            </p>
          </div>

          <div>
            <p style={getSectionEyebrowStyle(homepagePalette.blue)}>About creator preview</p>
            <h2 style={{ margin: '0 0 0.7rem', color: 'var(--color-text-primary)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', lineHeight: 1.15, fontWeight: 900, letterSpacing: '-0.03em' }}>
              Built by a working developer, for developers.
            </h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.72, maxWidth: '700px' }}>
              SplashRide was created from real project, interview, and career confusion experience to help developers learn technologies with clarity, confidence, and direction.
            </p>
            <Link
              to="/about"
              className="homepage-button-muted"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                background: 'var(--color-bg-secondary)',
                padding: '10px 16px',
                fontSize: '0.82rem',
                fontWeight: 900,
              }}
            >
              Read About SplashRide
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginTop: '2rem',
        background: 'linear-gradient(180deg, #080A0F 0%, #111827 58%, #241318 100%)',
        color: '#ffffff',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1.1fr) repeat(2, minmax(180px, 0.9fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }} className="founder-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
              <img
                src="/splashride-reference-mark.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '32px',
                  objectFit: 'contain',
                  filter: 'hue-rotate(-38deg) saturate(0.82) brightness(1.04) contrast(1.02) drop-shadow(0 0 10px rgba(249,115,22,0.24))',
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFF7ED' }}>
                  Splash<span style={{ color: '#FB923C' }}>Ride</span>
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,237,213,0.62)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Ride Your Tech Journey
                </p>
              </div>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.76)', fontSize: '0.84rem', lineHeight: 1.7, maxWidth: '360px' }}>
              Developer learning paths, tutorials, interview prep, and career guidance.
            </p>
          </div>

          <div>
            <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', fontWeight: 800, color: '#F6A04D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Explore
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              <button
                onClick={() => document.getElementById('technology-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={footerLinkStyle}
              >
                Technologies
              </button>
              <Link to="/interview-prep" style={footerLinkStyle}>
                Interview Prep
              </Link>
              <Link to="/career-paths" style={footerLinkStyle}>
                Career Paths
              </Link>
              <button
                onClick={() => document.getElementById('choose-goal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={footerLinkStyle}
              >
                Learning Paths
              </button>
            </div>
          </div>

          <div>
            <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', fontWeight: 800, color: '#F6A04D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Company
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              <Link to="/about" style={footerLinkStyle}>
                About
              </Link>
              <Link to="/contact" style={footerLinkStyle}>
                Contact
              </Link>
              <Link to="/privacy-policy" style={footerLinkStyle}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={footerLinkStyle}>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const footerLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.82)',
  textDecoration: 'none',
  padding: '0',
  fontSize: '0.88rem',
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'left' as const,
} as const;
