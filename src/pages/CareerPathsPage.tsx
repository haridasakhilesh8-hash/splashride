import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, Clock3, Gauge, Layers3, Sparkles, Target } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl } from '../lib/seo';
import { careerRoadmaps, getCareerPathStats, type CareerRoadmap } from '../content/careerPaths';

function parseLeadingNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

function getDemandTone(demand: string): 'strong' | 'warm' | 'calm' {
  if (demand.toLowerCase().includes('very high') || demand.toLowerCase().includes('rapid')) {
    return 'strong';
  }
  if (demand.toLowerCase().includes('high')) {
    return 'warm';
  }
  return 'calm';
}

function getDifficultyTone(difficulty: string): 'strong' | 'warm' | 'calm' {
  if (difficulty.toLowerCase().includes('advanced')) return 'strong';
  if (difficulty.toLowerCase().includes('intermediate')) return 'warm';
  return 'calm';
}

function getRecommendedPath(slug: string, fallback: CareerRoadmap) {
  return careerRoadmaps.find((roadmap) => roadmap.slug === slug) ?? fallback;
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div style={metricCardStyle}>
      <div style={metricIconStyle}>{icon}</div>
      <div>
        <p style={metricValueStyle}>{value}</p>
        <p style={metricLabelStyle}>{label}</p>
      </div>
    </div>
  );
}

function Badge({
  children,
  tone = 'calm',
}: {
  children: ReactNode;
  tone?: 'strong' | 'warm' | 'calm';
}) {
  const palette = {
    strong: {
      color: '#9a3412',
      border: 'rgba(249,115,22,0.26)',
      background: 'rgba(249,115,22,0.12)',
    },
    warm: {
      color: '#166534',
      border: 'rgba(34,197,94,0.26)',
      background: 'rgba(34,197,94,0.1)',
    },
    calm: {
      color: 'var(--color-accent)',
      border: 'rgba(37,99,235,0.22)',
      background: 'rgba(37,99,235,0.1)',
    },
  }[tone];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        padding: '6px 10px',
        fontSize: '0.72rem',
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function GoalGuideCard({
  label,
  title,
  description,
  roadmap,
}: {
  label: string;
  title: string;
  description: string;
  roadmap: CareerRoadmap;
}) {
  return (
    <Link to={`/career-paths/${roadmap.slug}`} className="card-hover" style={goalGuideCardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <p style={guideLabelStyle}>{label}</p>
          <h2 style={guideTitleStyle}>{title}</h2>
        </div>
        <span style={{ fontSize: '1.7rem', flexShrink: 0 }}>{roadmap.icon}</span>
      </div>
      <p style={guideDescriptionStyle}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <Badge tone={getDemandTone(roadmap.demand)}>{roadmap.demand}</Badge>
        <Badge tone={getDifficultyTone(roadmap.difficulty)}>{roadmap.difficulty}</Badge>
      </div>
      <div style={guideFooterStyle}>
        <span>{roadmap.shortTitle}</span>
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

function PathCard({ roadmap }: { roadmap: CareerRoadmap }) {
  const liveTechnologies = roadmap.technologies.filter((technology) => technology.availableNow !== false);
  const upcomingTechnologies = roadmap.technologies.filter((technology) => technology.availableNow === false);

  return (
    <Link to={`/career-paths/${roadmap.slug}`} className="card-hover" style={pathCardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            <Badge tone={getDemandTone(roadmap.demand)}>{roadmap.demand}</Badge>
            <Badge tone={getDifficultyTone(roadmap.difficulty)}>{roadmap.difficulty}</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem', flexShrink: 0 }}>{roadmap.icon}</span>
            <div>
              <p style={pathRoleStyle}>{roadmap.role}</p>
              <h2 style={pathTitleStyle}>{roadmap.shortTitle}</h2>
            </div>
          </div>
        </div>
        <div style={salaryPillStyle}>{roadmap.salaryRange}</div>
      </div>

      <p style={pathDescriptionStyle}>{roadmap.summary}</p>

      <div style={quickFactsGridStyle}>
        <div style={quickFactStyle}>
          <span style={quickFactLabelStyle}>Duration</span>
          <strong>{roadmap.duration}</strong>
        </div>
        <div style={quickFactStyle}>
          <span style={quickFactLabelStyle}>Learning Hours</span>
          <strong>{roadmap.hours}</strong>
        </div>
        <div style={quickFactStyle}>
          <span style={quickFactLabelStyle}>Interview Prep</span>
          <strong>{roadmap.interviewQuestionCount}+</strong>
        </div>
        <div style={quickFactStyle}>
          <span style={quickFactLabelStyle}>Production Scenarios</span>
          <strong>{roadmap.productionScenarioCount}+</strong>
        </div>
      </div>

      <div style={calloutGridStyle}>
        <div style={calloutBlockStyle}>
          <p style={calloutTitleStyle}>Best for</p>
          <p style={calloutBodyStyle}>{roadmap.profile.whoThisPathIsFor[0]}</p>
        </div>
        <div style={calloutBlockStyle}>
          <p style={calloutTitleStyle}>Outcome</p>
          <p style={calloutBodyStyle}>{roadmap.profile.expectedOutcomes[0]}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        <div>
          <p style={miniSectionTitleStyle}>Technologies to focus on</p>
          <div style={pillRowStyle}>
            {liveTechnologies.slice(0, 4).map((technology) => (
              <span key={`${roadmap.slug}-${technology.label}`} style={technologyPillStyle}>
                {technology.label}
              </span>
            ))}
            {upcomingTechnologies.slice(0, 2).map((technology) => (
              <span key={`${roadmap.slug}-${technology.label}`} style={technologyPillMutedStyle}>
                {technology.label} soon
              </span>
            ))}
          </div>
        </div>

        <div style={cardFooterStyle}>
          <span>Open career path</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}

export default function CareerPathsPage() {
  const stats = getCareerPathStats();
  const beginnerFriendly = careerRoadmaps.find((roadmap) => roadmap.difficulty.toLowerCase().includes('beginner')) ?? careerRoadmaps[0];
  const fastestPath = [...careerRoadmaps].sort((a, b) => parseLeadingNumber(a.duration) - parseLeadingNumber(b.duration))[0];
  const highestDemandPath =
    careerRoadmaps.find((roadmap) => roadmap.demand.toLowerCase().includes('very high')) ??
    careerRoadmaps.find((roadmap) => roadmap.demand.toLowerCase().includes('rapid')) ??
    careerRoadmaps[0];

  const startGuides = [
    {
      label: 'Start Here',
      title: 'If you want UI and product work',
      description: 'Choose a path that keeps you close to user experience, browser behavior, performance, and interface architecture.',
      roadmap: getRecommendedPath('frontend-engineer', beginnerFriendly),
    },
    {
      label: 'Career Fit',
      title: 'If you want APIs and business systems',
      description: 'Pick the route that builds backend depth, data thinking, and the kind of engineering used in enterprise delivery.',
      roadmap: getRecommendedPath('backend-engineer', highestDemandPath),
    },
    {
      label: 'Enterprise Focus',
      title: 'If you want Adobe and content platform work',
      description: 'Go with the path that prepares you for AEM teams, authoring systems, component work, and production support.',
      roadmap: getRecommendedPath('aem-developer', fastestPath),
    },
    {
      label: 'Platform Track',
      title: 'If you want cloud, delivery, and scale',
      description: 'Follow the platform-heavy route that leans into infrastructure, operations, observability, and release confidence.',
      roadmap: getRecommendedPath('devops-engineer', highestDemandPath),
    },
  ];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Career Paths | SplashRide',
      description: 'Career paths for developers who want structured learning order, technology coverage, interview preparation, and job-ready growth.',
      url: absoluteUrl('/career-paths'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'SplashRide career paths',
      itemListElement: careerRoadmaps.map((roadmap, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: roadmap.title,
        url: absoluteUrl(`/career-paths/${roadmap.slug}`),
      })),
    },
  ];

  return (
    <div style={{ padding: '2.5rem 0 5rem', maxWidth: '1120px', margin: '0 auto' }} className="fade-in">
      <SEO
        title="Career Paths | SplashRide"
        description="Choose a developer career path with structured learning order, technology coverage, interview preparation, career growth, and job-ready outcomes."
        structuredData={structuredData}
      />

      <section style={heroSectionStyle}>
        <div className="career-hero-grid" style={heroGridStyle}>
          <div>
            <p style={eyebrowStyle}>Career Paths</p>
            <h1 style={heroTitleStyle}>Pick a role with clarity, then follow the path with confidence.</h1>
            <p style={heroDescriptionStyle}>
              These pages are built to help you answer the hard questions early: which role fits you, how long it takes, what technologies matter,
              what salary bands look like, and where interview preparation connects to real production skill.
            </p>

            <div style={heroActionRowStyle}>
              <a href="#career-path-list" style={primaryActionStyle}>
                Explore all paths
                <ArrowRight size={16} />
              </a>
              <Link to={`/career-paths/${beginnerFriendly.slug}`} style={secondaryActionStyle}>
                Best first path
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={heroChipRowStyle}>
              <Badge tone="calm">Clear learning order</Badge>
              <Badge tone="warm">Interview-ready guidance</Badge>
              <Badge tone="strong">Production-focused thinking</Badge>
            </div>
          </div>

          <div style={heroPanelStyle}>
            <div style={heroPanelHeaderStyle}>
              <Sparkles size={16} style={{ color: 'var(--color-accent)' }} />
              <span>What you can decide quickly here</span>
            </div>

            <div style={heroPanelGridStyle}>
              <MetricCard label="Career Paths" value={String(stats.careerPaths)} icon={<BriefcaseBusiness size={16} />} />
              <MetricCard label="Learning Topics" value={`${stats.learningTopics}+`} icon={<Layers3 size={16} />} />
              <MetricCard label="Interview Questions" value={`${stats.interviewQuestions}+`} icon={<Target size={16} />} />
              <MetricCard label="Learning Hours" value={`${stats.learningHours}+`} icon={<Clock3 size={16} />} />
            </div>

            <div style={heroHighlightsStyle}>
              <div style={heroHighlightItemStyle}>
                <span style={heroHighlightLabelStyle}>Most beginner friendly</span>
                <Link to={`/career-paths/${beginnerFriendly.slug}`} style={heroHighlightLinkStyle}>
                  {beginnerFriendly.shortTitle}
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div style={heroHighlightItemStyle}>
                <span style={heroHighlightLabelStyle}>Fastest visible path</span>
                <Link to={`/career-paths/${fastestPath.slug}`} style={heroHighlightLinkStyle}>
                  {fastestPath.shortTitle}
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div style={heroHighlightItemStyle}>
                <span style={heroHighlightLabelStyle}>Highest demand signal</span>
                <Link to={`/career-paths/${highestDemandPath.slug}`} style={heroHighlightLinkStyle}>
                  {highestDemandPath.shortTitle}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2.6rem' }}>
        <SectionHeading
          eyebrow="Start smarter"
          title="Not sure where to begin?"
          description="Choose the track that sounds most like the work you want to do day to day. This is the fastest way to avoid wasting months on the wrong stack."
        />
        <div style={goalGuideGridStyle}>
          {startGuides.map((guide) => (
            <GoalGuideCard
              key={`${guide.label}-${guide.roadmap.slug}`}
              label={guide.label}
              title={guide.title}
              description={guide.description}
              roadmap={guide.roadmap}
            />
          ))}
        </div>
      </section>

      <section id="career-path-list">
        <SectionHeading
          eyebrow="All paths"
          title="Browse every career path"
          description="Each card surfaces the critical checkpoints first: demand, difficulty, time, technologies, interview depth, and the main outcome you should expect."
        />

        <div style={allPathsGridStyle}>
          {careerRoadmaps.map((roadmap) => (
            <PathCard key={roadmap.slug} roadmap={roadmap} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ marginBottom: '1rem', maxWidth: '760px' }}>
      <p style={sectionEyebrowStyle}>{eyebrow}</p>
      <h2 style={sectionTitleStyle}>{title}</h2>
      <p style={sectionDescriptionStyle}>{description}</p>
    </div>
  );
}

const heroSectionStyle: CSSProperties = {
  marginBottom: '2.5rem',
  padding: '1px',
  borderRadius: '20px',
  background:
    'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(20,184,166,0.14) 48%, rgba(249,115,22,0.16) 100%)',
};

const heroGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.95fr)',
  gap: '20px',
  borderRadius: '19px',
  background: 'var(--color-bg-primary)',
  padding: '26px',
};

const eyebrowStyle: CSSProperties = {
  margin: '0 0 12px',
  color: 'var(--color-accent)',
  fontSize: '0.74rem',
  fontWeight: 900,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

const heroTitleStyle: CSSProperties = {
  margin: '0 0 14px',
  fontSize: 'clamp(2rem, 3.5vw, 3.1rem)',
  lineHeight: 1.08,
  color: 'var(--color-text-primary)',
  maxWidth: '12ch',
};

const heroDescriptionStyle: CSSProperties = {
  margin: '0 0 18px',
  maxWidth: '66ch',
  color: 'var(--color-text-secondary)',
  fontSize: '0.98rem',
  lineHeight: 1.75,
};

const heroActionRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '16px',
};

const primaryActionStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  background: 'var(--color-accent)',
  color: '#ffffff',
  borderRadius: '10px',
  padding: '11px 16px',
  fontSize: '0.86rem',
  fontWeight: 800,
};

const secondaryActionStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  borderRadius: '10px',
  padding: '11px 16px',
  fontSize: '0.86rem',
  fontWeight: 800,
};

const heroChipRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const heroPanelStyle: CSSProperties = {
  borderRadius: '18px',
  border: '1px solid var(--color-border)',
  background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(37,99,235,0.03) 100%)',
  padding: '18px',
};

const heroPanelHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '14px',
  color: 'var(--color-text-primary)',
  fontSize: '0.82rem',
  fontWeight: 800,
};

const heroPanelGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
  marginBottom: '14px',
};

const metricCardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '12px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
  padding: '12px',
};

const metricIconStyle: CSSProperties = {
  width: '34px',
  height: '34px',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(37,99,235,0.1)',
  color: 'var(--color-accent)',
  flexShrink: 0,
};

const metricValueStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '1rem',
  fontWeight: 900,
};

const metricLabelStyle: CSSProperties = {
  margin: '2px 0 0',
  color: 'var(--color-text-muted)',
  fontSize: '0.68rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const heroHighlightsStyle: CSSProperties = {
  display: 'grid',
  gap: '10px',
};

const heroHighlightItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  borderTop: '1px solid var(--color-border)',
  paddingTop: '10px',
};

const heroHighlightLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.75rem',
  fontWeight: 700,
};

const heroHighlightLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  textDecoration: 'none',
  color: 'var(--color-accent)',
  fontSize: '0.8rem',
  fontWeight: 800,
};

const sectionEyebrowStyle: CSSProperties = {
  margin: '0 0 8px',
  color: 'var(--color-accent)',
  fontSize: '0.72rem',
  fontWeight: 900,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const sectionTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-primary)',
  fontSize: '1.7rem',
  lineHeight: 1.15,
};

const sectionDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
};

const goalGuideGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '14px',
};

const goalGuideCardStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  textDecoration: 'none',
  color: 'inherit',
  border: '1px solid var(--color-border)',
  borderRadius: '16px',
  background: 'var(--color-bg-secondary)',
  padding: '18px',
};

const guideLabelStyle: CSSProperties = {
  margin: '0 0 4px',
  color: 'var(--color-text-muted)',
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
};

const guideTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '1rem',
  lineHeight: 1.35,
};

const guideDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.84rem',
  lineHeight: 1.65,
};

const guideFooterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--color-accent)',
  fontSize: '0.82rem',
  fontWeight: 900,
};

const allPathsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '16px',
};

const pathCardStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
  textDecoration: 'none',
  color: 'inherit',
  border: '1px solid var(--color-border)',
  borderRadius: '18px',
  background: 'var(--color-bg-secondary)',
  padding: '20px',
};

const salaryPillStyle: CSSProperties = {
  flexShrink: 0,
  borderRadius: '999px',
  background: 'rgba(20,184,166,0.12)',
  border: '1px solid rgba(20,184,166,0.22)',
  color: '#0f766e',
  padding: '7px 10px',
  fontSize: '0.72rem',
  fontWeight: 800,
  lineHeight: 1.2,
};

const pathRoleStyle: CSSProperties = {
  margin: '0 0 3px',
  color: 'var(--color-text-muted)',
  fontSize: '0.78rem',
  fontWeight: 800,
};

const pathTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '1.18rem',
  lineHeight: 1.2,
};

const pathDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
  fontSize: '0.9rem',
};

const quickFactsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
};

const quickFactStyle: CSSProperties = {
  display: 'grid',
  gap: '4px',
  borderRadius: '12px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
  padding: '12px',
  color: 'var(--color-text-primary)',
  fontSize: '0.84rem',
};

const quickFactLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
};

const calloutGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
};

const calloutBlockStyle: CSSProperties = {
  display: 'grid',
  gap: '6px',
  padding: '12px 0 0',
  borderTop: '1px solid var(--color-border)',
};

const calloutTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '0.74rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const calloutBodyStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.83rem',
  lineHeight: 1.6,
};

const miniSectionTitleStyle: CSSProperties = {
  margin: '0 0 8px',
  color: 'var(--color-text-primary)',
  fontSize: '0.76rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const pillRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const technologyPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  padding: '6px 10px',
  background: 'rgba(37,99,235,0.1)',
  border: '1px solid rgba(37,99,235,0.18)',
  color: 'var(--color-text-primary)',
  fontSize: '0.74rem',
  fontWeight: 800,
};

const technologyPillMutedStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  padding: '6px 10px',
  background: 'var(--color-bg-primary)',
  border: '1px dashed var(--color-border-hover)',
  color: 'var(--color-text-muted)',
  fontSize: '0.74rem',
  fontWeight: 800,
};

const cardFooterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--color-accent)',
  fontSize: '0.84rem',
  fontWeight: 900,
  paddingTop: '10px',
  borderTop: '1px solid var(--color-border)',
};
