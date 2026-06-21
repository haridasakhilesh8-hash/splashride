import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Code,
  Globe,
  GraduationCap,
  Layers,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Zap,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTech } from '../lib/TechContext';
import { technologyCategoryGroups } from '../lib/catalogOrder';
import { technologies } from '../lib/navigation';
import { absoluteUrl } from '../lib/seo';
import { getActiveInterviewPrepSections, getInterviewPrepStats } from '../content/interview-prep';
import { getTechnologyPath, getTechnologyTopicPath } from '../lib/routes';

type JourneyMilestone = {
  label: string;
  iconLeft: string;
  iconTop: string;
  labelLeft: string;
  labelTop: string;
  bubble: string;
  icon: ReactNode;
};

const journeyMilestones: JourneyMilestone[] = [
  {
    label: 'Learn',
    iconLeft: '12%',
    iconTop: '86%',
    labelLeft: '15%',
    labelTop: '95%',
    bubble: '0 0 0 6px rgba(37,99,235,0.12)',
    icon: <BookOpen size={14} />,
  },
  {
    label: 'Practice',
    iconLeft: '26%',
    iconTop: '64%',
    labelLeft: '27%',
    labelTop: '74%',
    bubble: '0 0 0 6px rgba(99,102,241,0.13)',
    icon: <Target size={14} />,
  },
  {
    label: 'Build',
    iconLeft: '36%',
    iconTop: '47%',
    labelLeft: '37%',
    labelTop: '58%',
    bubble: '0 0 0 6px rgba(14,165,233,0.13)',
    icon: <Code size={14} />,
  },
  {
    label: 'Master',
    iconLeft: '60%',
    iconTop: '24%',
    labelLeft: '59%',
    labelTop: '35%',
    bubble: '0 0 0 6px rgba(168,85,247,0.13)',
    icon: <ShieldCheck size={14} />,
  },
  {
    label: 'Achieve',
    iconLeft: '84%',
    iconTop: '7%',
    labelLeft: '83%',
    labelTop: '17%',
    bubble: '0 0 0 6px rgba(249,115,22,0.16)',
    icon: <Rocket size={14} />,
  },
];

const journeyParticles = [
  { left: '12%', top: '16%', size: '7px', delay: '0s', duration: '7s' },
  { left: '26%', top: '74%', size: '5px', delay: '1.4s', duration: '8s' },
  { left: '34%', top: '22%', size: '6px', delay: '0.7s', duration: '6.8s' },
  { left: '48%', top: '57%', size: '4px', delay: '2.2s', duration: '7.6s' },
  { left: '62%', top: '14%', size: '6px', delay: '1.1s', duration: '6.4s' },
  { left: '72%', top: '62%', size: '7px', delay: '2.7s', duration: '8.4s' },
  { left: '85%', top: '28%', size: '5px', delay: '1.9s', duration: '7.2s' },
];

function TechJourneyVisual() {
  return (
    <div className="tech-journey-shell" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '540px',
      aspectRatio: '1 / 0.96',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.12)',
      background: 'radial-gradient(circle at 22% 18%, rgba(14,165,233,0.2), transparent 28%), radial-gradient(circle at 78% 14%, rgba(168,85,247,0.24), transparent 26%), linear-gradient(180deg, rgba(2,6,23,0.28), rgba(2,6,23,0.1))',
      boxShadow: '0 35px 70px rgba(2,6,23,0.34)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), transparent 24%, transparent 78%, rgba(255,255,255,0.04))',
        pointerEvents: 'none',
      }} />

      {journeyParticles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${index}`}
          className="tech-journey-particle"
          style={{
            position: 'absolute',
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(191,219,254,0.95) 0%, rgba(14,165,233,0.68) 45%, transparent 72%)',
            boxShadow: '0 0 18px rgba(59,130,246,0.75)',
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            pointerEvents: 'none',
          }}
        />
      ))}

      <svg
        viewBox="0 0 520 500"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="roadStrokeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="52%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="roadCenterGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          <linearGradient id="mountainGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(10,15,35,0.88)" />
            <stop offset="100%" stopColor="rgba(76,29,149,0.76)" />
          </linearGradient>
          <linearGradient id="mistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.22)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
          <filter id="roadGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0
                      0 0.75 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="summitGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <path
          d="M0 455 L118 396 L176 360 L260 286 L312 238 L392 160 L448 78 L520 38 L520 500 L0 500 Z"
          fill="url(#mountainGradient)"
          opacity="0.92"
        />
        <path
          d="M166 500 L250 338 L338 246 L430 118 L520 26 L520 500 Z"
          fill="url(#mistGradient)"
          opacity="0.85"
        />

        <path
          className="tech-journey-road-glow"
          d="M38 430 C88 412 116 406 156 388 C200 368 210 350 198 318 C186 284 202 260 248 246 C300 230 306 204 274 174 C242 144 258 116 306 112 C352 108 378 90 394 62 C404 42 424 28 452 22"
          fill="none"
          stroke="url(#roadStrokeGradient)"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#roadGlow)"
          opacity="0.95"
        />
        <path
          className="tech-journey-road-main"
          d="M38 430 C88 412 116 406 156 388 C200 368 210 350 198 318 C186 284 202 260 248 246 C300 230 306 204 274 174 C242 144 258 116 306 112 C352 108 378 90 394 62 C404 42 424 28 452 22"
          fill="none"
          stroke="url(#roadStrokeGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="tech-journey-road-center"
          d="M38 430 C88 412 116 406 156 388 C200 368 210 350 198 318 C186 284 202 260 248 246 C300 230 306 204 274 174 C242 144 258 116 306 112 C352 108 378 90 394 62 C404 42 424 28 452 22"
          fill="none"
          stroke="url(#roadCenterGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          className="tech-journey-road-shimmer"
          d="M38 430 C88 412 116 406 156 388 C200 368 210 350 198 318 C186 284 202 260 248 246 C300 230 306 204 274 174 C242 144 258 116 306 112 C352 108 378 90 394 62 C404 42 424 28 452 22"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="12 34"
        />

        <g className="tech-journey-flag">
          <path d="M451 21 L451 69" stroke="rgba(255,255,255,0.85)" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M453 24 C468 12 486 17 494 26 C486 36 468 40 453 33 Z"
            fill="rgba(168,85,247,0.95)"
          />
          <path
            d="M463 28 C468 24 476 24 480 29 C476 34 468 34 463 31 Z"
            fill="rgba(255,255,255,0.9)"
          />
          <circle cx="451" cy="22" r="8" fill="rgba(255,255,255,0.48)" filter="url(#summitGlow)" />
        </g>
      </svg>

      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}>
        {journeyMilestones.map((milestone, index) => (
          <div key={milestone.label}>
            <div
              className="tech-journey-milestone"
              style={{
                position: 'absolute',
                left: milestone.iconLeft,
                top: milestone.iconTop,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 0.6}s`,
              }}
            >
              <div className="tech-journey-pulse" style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.9), rgba(124,58,237,0.92))',
                border: '1px solid rgba(255,255,255,0.42)',
                color: '#ffffff',
                boxShadow: `${milestone.bubble}, 0 12px 26px rgba(2,6,23,0.35)`,
              }}>
                {milestone.icon}
              </div>
            </div>

            <div
              className="tech-journey-milestone-label"
              style={{
                position: 'absolute',
                left: milestone.labelLeft,
                top: milestone.labelTop,
                transform: 'translate(-50%, -50%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '86px',
                padding: '6px 10px',
                borderRadius: '999px',
                background: 'rgba(2,6,23,0.48)',
                border: '1px solid rgba(255,255,255,0.13)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.03em',
                backdropFilter: 'blur(8px)',
                textAlign: 'center',
                animationDelay: `${index * 0.6}s`,
              }}
            >
              {milestone.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        left: '18px',
        top: '18px',
        pointerEvents: 'none',
      }}>
        <div style={{
          maxWidth: '250px',
          borderRadius: '16px',
          background: 'rgba(2,6,23,0.38)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '10px 12px',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '0.74rem',
          fontWeight: 800,
          letterSpacing: '0.02em',
          lineHeight: 1.45,
          textAlign: 'left',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 14px 28px rgba(2,6,23,0.2)',
        }}>
          Ride your technology journey from beginner to expert.
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
  const comingSoonTechs = technologies.filter(t => !t.active);
  const interviewPrepSections = getActiveInterviewPrepSections();
  const interviewPrepStats = getInterviewPrepStats();
  const interviewQuestionCountByTech = new Map(
    interviewPrepSections.map((section) => [section.technologyId, section.questions.length]),
  );
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

  const platformPillars = [
    {
      icon: <GraduationCap size={18} />,
      title: 'Learning Paths',
      desc: 'Structured paths that help you move from fundamentals to project-ready confidence.',
      accent: '#2563eb',
    },
    {
      icon: <Target size={18} />,
      title: 'Interview Preparation',
      desc: 'Real questions, senior-level answers, production scenarios, and interviewer expectations.',
      accent: '#7c3aed',
    },
    {
      icon: <Layers size={18} />,
      title: 'Architecture Knowledge',
      desc: 'System design, trade-offs, governance, scalability, and enterprise implementation patterns.',
      accent: '#0891b2',
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Production Experience',
      desc: 'Troubleshooting, performance, security, incident support, and real project examples.',
      accent: '#16a34a',
    },
  ];

  const whySplashRide = [
    {
      icon: <Briefcase size={18} />,
      title: 'Built around real work',
      desc: 'SplashRide explains how technologies are used in client projects, production systems, releases, incidents, and interviews.',
      accent: '#6366f1',
    },
    {
      icon: <Code size={18} />,
      title: 'Not memorization-first',
      desc: 'Topics connect concepts to decisions: when to use something, why it matters, what breaks, and how seniors explain it.',
      accent: '#0ea5e9',
    },
    {
      icon: <Target size={18} />,
      title: 'Career-focused preparation',
      desc: 'The same platform supports learning, interview readiness, architecture thinking, and technical leadership growth.',
      accent: '#8b5cf6',
    },
    {
      icon: <BarChart3 size={18} />,
      title: 'Practical depth across stacks',
      desc: 'AEM, frontend, backend, cloud, DevOps, and platform topics live in one consistent learning experience.',
      accent: '#f97316',
    },
  ];

  const missionSteps = [
    { icon: <BookOpen size={18} />, title: 'From confused', desc: 'Clear fundamentals' },
    { icon: <Code size={18} />, title: 'To building', desc: 'Project-based practice' },
    { icon: <Target size={18} />, title: 'To interview ready', desc: 'Real answer patterns' },
    { icon: <Rocket size={18} />, title: 'To career growth', desc: 'Senior-level thinking' },
  ];

  const ecosystemDomainDetails = {
    'Enterprise CMS': {
      desc: 'Enterprise and headless CMS learning across AEM, Contentful, Sitecore, architecture, workflows, modeling, and delivery.',
      icon: <Building2 size={20} />,
      accent: '#f97316',
    },
    Frontend: {
      desc: 'Modern UI engineering, rendering, routing, state, performance, and testing.',
      icon: <Code size={20} />,
      accent: '#2563eb',
    },
    Backend: {
      desc: 'Core language depth, APIs, persistence, security, transactions, and production systems.',
      icon: <Server size={20} />,
      accent: '#16a34a',
    },
    'Cloud & DevOps': {
      desc: 'Cloud platforms, containers, orchestration, CI/CD, observability, and operations.',
      icon: <Cloud size={20} />,
      accent: '#7c3aed',
    },
    AI: {
      desc: 'LLM foundations, prompt design, RAG, vector databases, agents, evaluation, and production AI systems.',
      icon: <Sparkles size={20} />,
      accent: '#8b5cf6',
    },
  } as const;

  const ecosystemDomains = technologyCategoryGroups.map((group) => ({
    title: group.label,
    desc: ecosystemDomainDetails[group.label].desc,
    icon: ecosystemDomainDetails[group.label].icon,
    techIds: group.technologyIds,
    accent: ecosystemDomainDetails[group.label].accent,
  }));

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
      techIds: ['aws', 'azure', 'docker', 'kubernetes'],
    },
    {
      title: 'Azure Engineer',
      desc: 'Build Azure platform depth across compute, storage, networking, identity, containers, and architecture.',
      techIds: ['azure', 'docker', 'kubernetes'],
    },
    {
      title: 'AEM Developer',
      desc: 'Focus on enterprise CMS development with components, templates, Sling Models, HTL, and Dispatcher.',
      techIds: ['aem'],
    },
    {
      title: 'Sitecore Developer',
      desc: 'Build enterprise CMS depth with templates, items, renderings, workflows, headless delivery, and XM Cloud direction.',
      techIds: ['sitecore', 'react', 'nextjs'],
    },
    {
      title: 'AI Engineer',
      desc: 'Build practical LLM engineering skills across prompts, retrieval, evaluation, product integration, and production AI delivery.',
      techIds: ['ai-llm', 'react', 'springboot'],
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

  const openTopic = (techId: string) => {
    setActiveTechId(techId);
    window.scrollTo(0, 0);
  };

  const sectionEyebrowStyle = {
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--color-accent)',
    margin: '0 0 0.6rem',
  };

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
        marginBottom: '2rem',
        background: 'radial-gradient(circle at 82% 18%, rgba(56,189,248,0.22), transparent 26%), radial-gradient(circle at 72% 70%, rgba(124,58,237,0.28), transparent 34%), linear-gradient(120deg, #020a2a 0%, #061142 46%, #16072f 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, transparent 0 54%, rgba(37,99,235,0.18) 55%, rgba(124,58,237,0.24) 68%, transparent 76%)',
          opacity: 0.9,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '12%',
          width: '160px',
          height: '160px',
          backgroundImage: 'radial-gradient(rgba(59,130,246,0.45) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          opacity: 0.35,
          pointerEvents: 'none',
        }} />
        <div className="homepage-hero-inner hero-grid" style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '3.2rem 2rem 4rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.02fr) minmax(300px, 0.98fr)',
          gap: '2rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
        <div className="homepage-hero-copy">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(124,58,237,0.24)',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '20px',
            padding: '5px 13px',
            marginBottom: '1.2rem',
            boxShadow: '0 8px 26px rgba(59,130,246,0.18)',
          }}>
            <Zap size={13} style={{ color: '#bfdbfe' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Developer Learning Platform
            </span>
          </div>

          <h1 className="homepage-hero-title" style={{
            fontSize: 'clamp(2.6rem, 5.6vw, 4.15rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.045em',
            lineHeight: 1.03,
            margin: '0 0 1.1rem',
          }}>
            Learn Technologies
            <br />
            the Way Senior Engineers
            <br />
            Explain{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0ea5ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Them
            </span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.84)',
            lineHeight: 1.8,
            maxWidth: '560px',
            margin: 0,
          }}>
            Master React, AEM, Java, Spring Boot, Azure, Kubernetes, AI and more through real-world tutorials, interview preparation, architecture notes, and career-focused learning paths.
          </p>

          <div className="homepage-hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '1.7rem', alignItems: 'center' }}>
            <button
              onClick={() => document.getElementById('technology-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="homepage-button-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #0ea5ff, #7c3aed)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '12px 18px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 900,
                boxShadow: '0 16px 30px rgba(37,99,235,0.26)',
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
                background: 'rgba(255,255,255,0.04)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: '8px',
                padding: '12px 18px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 900,
              }}
            >
              <Target size={15} />
              Start Interview Prep
            </Link>
          </div>
        </div>

        <div className="homepage-hero-visual" style={{
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'visible',
        }}>
          <div style={{
            position: 'absolute',
            inset: '10% -6% 8% 4%',
            background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.16), rgba(124,58,237,0.14) 45%, transparent 75%)',
            filter: 'blur(28px)',
            opacity: 0.9,
            pointerEvents: 'none',
          }} />
          <TechJourneyVisual />
        </div>
        </div>
      </section>
      {/* Platform Statistics */}
      <section className="homepage-section homepage-stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '10px',
        marginBottom: '3rem',
        scrollMarginTop: '80px',
      }}>
        {[
          { icon: <BookOpen size={15} />, value: `${totalTopics}+`, label: 'Topics' },
          { icon: <Globe size={15} />, value: activeTechs.length, label: 'Technologies' },
          { icon: <BarChart3 size={15} />, value: `${interviewPrepStats.totalQuestions}+`, label: 'Interview Questions' },
          { icon: <Target size={15} />, value: interviewPrepStats.experienceLevels, label: 'Experience Levels' },
          { icon: <Layers size={15} />, value: interviewPrepStats.categories, label: 'Categories' },
        ].map(stat => (
          <div
            key={stat.label}
            className="homepage-card homepage-stat-card"
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
            <div style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{stat.icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* What is SplashRide? */}
      <section className="homepage-section" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 0.85fr) 1.15fr', gap: '1.5rem', alignItems: 'start' }} className="split-section">
          <div>
            <p style={sectionEyebrowStyle}>What is SplashRide?</p>
            <h2 className="homepage-section-title" style={{
              margin: '0 0 0.8rem',
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
            }}>
              The smarter way to learn technology.
            </h2>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>
              SplashRide is a developer learning platform built to bridge the gap between tutorials and real-world work. It shows what technologies are, how they are used in projects, what breaks in production, and how experienced engineers explain decisions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
            {platformPillars.map(item => (
                <div
                  key={item.title}
                  className="homepage-card"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div className="homepage-icon-badge" style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
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
                    <h3 style={{ margin: '0 0 5px', color: 'var(--color-text-primary)', fontSize: '0.92rem', fontWeight: 800 }}>
                      {item.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SplashRide? */}
      <section className="homepage-section" style={{ marginBottom: '3rem' }}>
        <p style={{ ...sectionEyebrowStyle, textAlign: 'center' }}>Why SplashRide?</p>
        <h2 className="homepage-section-title" style={{
          margin: '0 auto 1.3rem',
          textAlign: 'center',
          maxWidth: '640px',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.03em',
        }}>
          Built for developers who want practical depth, not just surface-level notes.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {whySplashRide.map(item => (
            <div key={item.title} className="homepage-card" style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '16px',
              minHeight: '150px',
            }}>
              <div className="homepage-icon-badge" style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: `${item.accent}14`,
                color: item.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                {item.icon}
              </div>
              <h3 style={{ margin: '0 0 6px', color: 'var(--color-text-primary)', fontSize: '0.95rem', fontWeight: 800 }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.62 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Built by a Developer */}
      <section className="homepage-section" style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '3rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.6rem', alignItems: 'center' }} className="founder-grid">
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
            </p>
          </div>

          <div>
            <p style={sectionEyebrowStyle}>Built by a Developer, For Developers</p>
            <h2 style={{ margin: '0 0 0.75rem', color: 'var(--color-text-primary)', fontSize: 'clamp(1.45rem, 3vw, 2rem)', lineHeight: 1.15, fontWeight: 900, letterSpacing: '-0.03em' }}>
              Built by a working developer, for developers.
            </h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.72 }}>
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
                borderRadius: '9px',
                background: 'var(--color-bg-secondary)',
                padding: '10px 16px',
                fontSize: '0.82rem',
                fontWeight: 900,
                marginBottom: '1rem',
              }}
            >
              Read About SplashRide
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="homepage-section" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <p style={sectionEyebrowStyle}>Our Mission</p>
        <h2 className="homepage-section-title" style={{ margin: '0 0 1.4rem', color: 'var(--color-text-primary)', fontSize: 'clamp(1.45rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
          Ride Your <span style={{ color: 'var(--color-accent)' }}>Tech Journey</span>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '1rem',
        }}>
          {missionSteps.map((step, index) => (
            <div key={step.title} style={{ position: 'relative' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                margin: '0 auto 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)',
                background: 'var(--color-accent-light)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 22%, var(--color-border))',
              }}>
                {step.icon}
              </div>
              <p style={{ margin: '0 0 3px', color: 'var(--color-text-primary)', fontSize: '0.82rem', fontWeight: 900 }}>
                {step.title}
              </p>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.72rem', fontWeight: 700 }}>
                {step.desc}
              </p>
              {index < missionSteps.length - 1 && (
                <span className="mission-line" style={{
                  position: 'absolute',
                  top: '24px',
                  left: 'calc(50% + 34px)',
                  width: 'calc(100% - 68px)',
                  height: '1px',
                  background: 'var(--color-border)',
                }} />
              )}
            </div>
          ))}
        </div>
        <p style={{ margin: '1rem auto 0', maxWidth: '620px', color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
          Our mission is to help developers grow from confused to confident by learning the practical side of technology: how to build, explain, troubleshoot, and make better engineering decisions.
        </p>
      </section>

      {/* Choose Your Goal */}
      <section id="choose-goal" className="homepage-section" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Choose Your Goal
        </h2>

        <div className="homepage-goal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {careerGoals.map(goal => (
            <div
              key={goal.title}
              className="homepage-card"
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
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
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
                      to={getTechnologyPath(tech.id)}
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
                        fontWeight: 800,
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
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
              borderRadius: '9px',
              background: 'var(--color-bg-secondary)',
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 900,
            }}
          >
            View All Career Paths
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Interview Prep */}
      <section id="interview-prep" className="homepage-section" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Interview Prep
        </h2>

        <Link
          to="/interview-prep"
          className="homepage-card"
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
              <h3 style={{ margin: '0 0 8px', color: 'var(--color-text-primary)', fontSize: '1.15rem', fontWeight: 900 }}>
                Interview Prep
              </h3>
              <p style={{ margin: 0, maxWidth: '700px', color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.88rem' }}>
                Practice real AEM, Contentful, Sitecore, React, Next.js, Core Java, Spring Boot, AWS, Azure, Docker, Kubernetes, and AI or LLM Engineering interview answers across developer, senior, lead, and architect rounds with production scenarios, common mistakes, and interviewer expectations.
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
                <p style={{ margin: '3px 0 0', color: 'var(--color-text-muted)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
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
              }} className="homepage-tag">
                {section.technologyLabel}
              </span>
            ))}
          </div>
        </Link>
      </section>

      {/* Choose Your Ride */}
      <section id="technology-cards" className="homepage-section" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
        <p style={{ ...sectionEyebrowStyle, textAlign: 'center' }}>Choose Your Ride</p>
        <h2 className="homepage-section-title" style={{
          margin: '0 0 1.3rem',
          textAlign: 'center',
          color: 'var(--color-text-primary)',
          fontSize: 'clamp(1.45rem, 3vw, 2rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
        }}>
          Technology Ecosystem
        </h2>

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

        <h3 style={{ margin: '0 0 1rem', color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Available Now
        </h3>

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

      {/* Recently Added */}
      <section className="homepage-section" style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
        }}>
          Recently Added Topics
        </h2>

        <div className="homepage-recent-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {recentlyAdded.map(item => (
            <Link
              key={`${item.techId}-${item.slug}`}
              to={getTechnologyTopicPath(item.techId, item.slug)}
              onClick={() => openTopic(item.techId)}
              className="homepage-card"
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
                <Sparkles size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>{item.tech}</p>
                </div>
              </div>
              <TrendingUp size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoonTechs.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '0.75rem',
            fontWeight: 800,
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
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {tech.label}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                    Coming soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginTop: '2rem',
        background: 'linear-gradient(180deg, #071133 0%, #0b153d 100%)',
        color: '#ffffff',
        borderTop: '1px solid rgba(255,255,255,0.08)',
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
                  filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.35))',
                }}
              />
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  Splash<span style={{ color: '#38bdf8' }}>Ride</span>
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Ride Your Tech Journey
                </p>
              </div>
            </div>
            <p style={{ margin: '0 0 0.65rem', fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
              Ride Your Tech Journey
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.76)', fontSize: '0.84rem', lineHeight: 1.7, maxWidth: '360px' }}>
              Developer learning paths, tutorials, interview prep, and career guidance.
            </p>
          </div>

          <div>
            <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
            <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', fontWeight: 800, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
