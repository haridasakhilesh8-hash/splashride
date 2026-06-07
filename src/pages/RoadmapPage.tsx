import type { CSSProperties, ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, CircleCheckBig, Clock3, Compass, Layers3, Target, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl } from '../lib/seo';
import { getCareerRoadmap, type CareerPathLink } from '../content/careerPaths';

function Badge({
  children,
  tone = 'calm',
}: {
  children: ReactNode;
  tone?: 'calm' | 'warm' | 'strong';
}) {
  const palette = {
    calm: {
      color: 'var(--color-accent)',
      border: 'rgba(37,99,235,0.2)',
      background: 'rgba(37,99,235,0.1)',
    },
    warm: {
      color: '#0f766e',
      border: 'rgba(20,184,166,0.22)',
      background: 'rgba(20,184,166,0.12)',
    },
    strong: {
      color: '#9a3412',
      border: 'rgba(249,115,22,0.26)',
      background: 'rgba(249,115,22,0.12)',
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

function getDifficultyTone(difficulty: string): 'calm' | 'warm' | 'strong' {
  if (difficulty.toLowerCase().includes('advanced')) return 'strong';
  if (difficulty.toLowerCase().includes('intermediate')) return 'warm';
  return 'calm';
}

function getDemandTone(demand: string): 'calm' | 'warm' | 'strong' {
  if (demand.toLowerCase().includes('very high') || demand.toLowerCase().includes('rapid')) return 'strong';
  if (demand.toLowerCase().includes('high')) return 'warm';
  return 'calm';
}

function ActionLink({
  to,
  children,
  variant = 'primary',
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <Link to={to} style={variant === 'primary' ? primaryActionStyle : secondaryActionStyle}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

function MetricTile({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div style={metricTileStyle}>
      <div style={metricTileIconStyle}>{icon}</div>
      <div>
        <p style={metricTileValueStyle}>{value}</p>
        <p style={metricTileLabelStyle}>{label}</p>
      </div>
    </div>
  );
}

function SectionHeader({
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

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={infoCardStyle}>
      <h3 style={cardHeadingStyle}>{title}</h3>
      <ul style={listStyle}>
        {items.map((item) => (
          <li key={`${title}-${item}`} style={listItemStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkPill({ link }: { link: CareerPathLink }) {
  return (
    <Link to={link.to} style={linkPillStyle}>
      {link.label}
      <ArrowRight size={12} />
    </Link>
  );
}

export default function RoadmapPage() {
  const { careerSlug } = useParams<{ careerSlug: string }>();
  const roadmap = getCareerRoadmap(careerSlug);

  if (!roadmap) {
    return <Navigate to="/career-paths" replace />;
  }

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: roadmap.title,
      description: roadmap.seoDescription,
      url: absoluteUrl(`/career-paths/${roadmap.slug}`),
      provider: {
        '@type': 'Organization',
        name: 'SplashRide',
        url: absoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SplashRide', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Career Paths', item: absoluteUrl('/career-paths') },
        { '@type': 'ListItem', position: 3, name: roadmap.shortTitle, item: absoluteUrl(`/career-paths/${roadmap.slug}`) },
      ],
    },
  ];

  const firstTechnology = roadmap.technologies.find((technology) => technology.availableNow !== false) ?? roadmap.technologies[0];
  const topRoles = roadmap.careerInsights.typicalRoles.slice(0, 3);

  return (
    <div style={{ padding: '2rem 0 4.5rem', maxWidth: '1100px', margin: '0 auto' }} className="fade-in">
      <SEO title={roadmap.seoTitle} description={roadmap.seoDescription} structuredData={structuredData} />

      <nav aria-label="Breadcrumb" style={breadcrumbStyle}>
        <Link to="/" style={crumbStyle}>
          SplashRide
        </Link>
        <span style={crumbDividerStyle}>/</span>
        <Link to="/career-paths" style={crumbStyle}>
          Career Paths
        </Link>
        <span style={crumbDividerStyle}>/</span>
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 800 }}>{roadmap.shortTitle}</span>
      </nav>

      <section style={heroShellStyle}>
        <div className="roadmap-top-grid" style={heroGridStyle}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <Badge tone={getDemandTone(roadmap.demand)}>{roadmap.demand}</Badge>
              <Badge tone={getDifficultyTone(roadmap.difficulty)}>{roadmap.difficulty}</Badge>
              <Badge tone="warm">{roadmap.salaryRange}</Badge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.8rem', flexShrink: 0 }}>{roadmap.icon}</span>
              <div>
                <p style={heroMetaStyle}>{roadmap.role}</p>
                <h1 style={heroTitleStyle}>{roadmap.shortTitle}</h1>
              </div>
            </div>

            <p style={heroSummaryStyle}>{roadmap.summary}</p>
            <p style={heroDescriptionStyle}>{roadmap.description}</p>

            <div style={heroActionRowStyle}>
              <ActionLink to={firstTechnology.to}>Start learning</ActionLink>
              <ActionLink to={roadmap.interviewPrep.primaryTrackTo} variant="secondary">
                Start interview prep
              </ActionLink>
            </div>

            <div style={heroChipRowStyle}>
              {roadmap.profile.skillsYouWillGain.slice(0, 4).map((skill) => (
                <span key={`${roadmap.slug}-${skill}`} style={chipStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <aside style={snapshotPanelStyle}>
            <div style={snapshotHeaderStyle}>
              <Compass size={16} style={{ color: 'var(--color-accent)' }} />
              <span>Path snapshot</span>
            </div>

            <div style={snapshotGridStyle}>
              <MetricTile label="Learning Hours" value={roadmap.hours} icon={<Clock3 size={16} />} />
              <MetricTile label="Duration" value={roadmap.duration} icon={<Target size={16} />} />
              <MetricTile label="Topics" value={String(roadmap.topicCount)} icon={<Layers3 size={16} />} />
              <MetricTile label="Questions" value={`${roadmap.interviewQuestionCount}+`} icon={<TrendingUp size={16} />} />
            </div>

            <div style={snapshotDividerStyle} />

            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <p style={snapshotListTitleStyle}>Good fit if you want</p>
                <ul style={compactListStyle}>
                  {roadmap.profile.whoThisPathIsFor.slice(0, 3).map((item) => (
                    <li key={`${roadmap.slug}-fit-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={snapshotListTitleStyle}>What you should expect</p>
                <ul style={compactListStyle}>
                  {roadmap.profile.expectedOutcomes.slice(0, 3).map((item) => (
                    <li key={`${roadmap.slug}-outcome-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ marginBottom: '2.6rem' }}>
        <SectionHeader
          eyebrow="Overview"
          title="Understand the path before you commit to it"
          description="This section brings the practical decision points forward so you can quickly tell whether this track matches the work, growth, and learning style you actually want."
        />

        <div className="roadmap-body-grid" style={overviewGridStyle}>
          <div style={overviewMainGridStyle}>
            <ListCard title="What you will learn" items={roadmap.profile.whatYouWillLearn} />
            <ListCard title="Skills you will gain" items={roadmap.profile.skillsYouWillGain} />
            <ListCard title="Expected outcomes" items={roadmap.profile.expectedOutcomes} />
          </div>

          <div style={overviewSideStyle}>
            <div style={highlightPanelStyle}>
              <div style={highlightHeaderStyle}>
                <CircleCheckBig size={16} style={{ color: 'var(--color-accent)' }} />
                <span>Critical checkpoints</span>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <HighlightRow label="Primary role target" value={roadmap.role} />
                <HighlightRow label="Production scenarios" value={`${roadmap.productionScenarioCount}+`} />
                <HighlightRow label="Interview depth" value={`${roadmap.interviewPrep.questionCount}+ questions`} />
                <HighlightRow label="Fastest next click" value={firstTechnology.label} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap-journey" style={{ marginBottom: '2.8rem', scrollMarginTop: '84px' }}>
        <SectionHeader
          eyebrow="Roadmap"
          title="Follow the learning order step by step"
          description="Each phase is placed in sequence so the later topics make sense when you reach them. The goal is not to learn everything at once. The goal is to learn in the right order."
        />

        <div style={phaseListStyle}>
          {roadmap.phases.map((phase, index) => (
            <article key={phase.id} style={{ ...phaseCardStyle, borderLeft: `4px solid ${phase.color}` }}>
              <div style={phaseHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={phaseIndexStyle}>{index + 1}</span>
                  <div>
                    <p style={phaseLabelStyle}>Phase {index + 1}</p>
                    <h3 style={phaseTitleStyle}>{phase.title}</h3>
                  </div>
                </div>
                <Badge tone="calm">{phase.duration}</Badge>
              </div>

              <p style={phaseSubtitleStyle}>{phase.subtitle}</p>

              <div style={phaseTopicsGridStyle}>
                {phase.topics.map((topic) => (
                  <div key={`${phase.id}-${topic.title}`} style={topicCardStyle}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                      <BookOpen size={15} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ minWidth: 0 }}>
                        <h4 style={topicTitleStyle}>{topic.title}</h4>
                        <p style={topicDescriptionStyle}>{topic.description}</p>
                        {topic.links?.length ? (
                          <div style={linkPillRowStyle}>
                            {topic.links.map((link) => (
                              <LinkPill key={link.to} link={link} />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.8rem' }}>
        <SectionHeader
          eyebrow="Technologies"
          title="Know which stack pieces matter most"
          description="You do not need every technology equally on day one. Focus first on the live tracks that move this career path forward, then use the adjacent technologies to deepen range."
        />

        <div style={technologyGridStyle}>
          {roadmap.technologies.map((technology) => (
            <Link key={`${roadmap.slug}-${technology.label}`} to={technology.to} className="card-hover" style={technologyCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={cardHeadingStyle}>{technology.label}</h3>
                  <p style={technologyDescriptionStyle}>{technology.description}</p>
                </div>
                <Badge tone={technology.availableNow === false ? 'strong' : 'warm'}>
                  {technology.availableNow === false ? 'Coming soon' : 'Live now'}
                </Badge>
              </div>
              <div style={technologyFooterStyle}>
                <span>Open technology track</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.8rem' }}>
        <SectionHeader
          eyebrow="Interview Prep"
          title="Connect learning to hiring expectations"
          description="This is where the path becomes job-facing. You can see which topics are covered, what question volume exists, and which tracks help you rehearse the role with more confidence."
        />

        <div className="split-section" style={interviewSectionGridStyle}>
          <div style={interviewHeroCardStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <Badge tone="calm">{roadmap.interviewPrep.questionCount}+ questions</Badge>
              <Badge tone="warm">{roadmap.interviewPrep.scenarioCount}+ scenarios</Badge>
              <Badge tone="strong">{roadmap.interviewPrep.systemDesignQuestionCount}+ system design</Badge>
            </div>
            <h3 style={interviewTitleStyle}>{roadmap.interviewPrep.primaryTrackLabel}</h3>
            <p style={interviewDescriptionStyle}>
              Practice realistic questions, architecture thinking, production decision-making, and role-specific scenarios instead of preparing only with trivia.
            </p>
            {roadmap.interviewPrep.note ? <p style={interviewNoteStyle}>{roadmap.interviewPrep.note}</p> : null}
            <ActionLink to={roadmap.interviewPrep.primaryTrackTo}>Open interview prep</ActionLink>
          </div>

          <div style={interviewSideStyle}>
            <div style={infoCardStyle}>
              <h3 style={cardHeadingStyle}>Topics covered</h3>
              <div style={topicChipRowStyle}>
                {roadmap.interviewPrep.topicsCovered.map((topic) => (
                  <span key={`${roadmap.slug}-${topic}`} style={topicChipStyle}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div style={infoCardStyle}>
              <h3 style={cardHeadingStyle}>Related interview tracks</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {roadmap.interviewPrep.linkedTracks.map((track) => (
                  <Link key={track.to} to={track.to} style={linkedTrackStyle}>
                    <span>{track.label}</span>
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2.8rem' }}>
        <SectionHeader
          eyebrow="Career Insights"
          title="Understand the market and the growth path"
          description="A path feels much more real when you can see what the demand means, what companies expect at each stage, and how role growth usually compounds over time."
        />

        <div className="split-section" style={insightGridStyle}>
          <div style={insightNarrativeStyle}>
            <div style={infoCardStyle}>
              <h3 style={cardHeadingStyle}>Demand</h3>
              <p style={paragraphStyle}>{roadmap.careerInsights.demand}</p>
            </div>
            <div style={infoCardStyle}>
              <h3 style={cardHeadingStyle}>Career growth</h3>
              <p style={paragraphStyle}>{roadmap.careerInsights.careerGrowth}</p>
            </div>
          </div>

          <div style={insightListsStyle}>
            <ListCard title="Skills needed" items={roadmap.careerInsights.skillsNeeded} />
            <ListCard title="Experience expectations" items={roadmap.careerInsights.experienceExpectations} />
          </div>
        </div>

        <div style={rolesGridStyle}>
          {topRoles.map((role) => (
            <div key={`${roadmap.slug}-${role.title}`} style={roleCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={roleTitleStyle}>{role.title}</h3>
                <Badge tone="warm">{role.salaryRange}</Badge>
              </div>
              <p style={roleExpectationStyle}>{role.expectation}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2.8rem' }}>
        <SectionHeader
          eyebrow="Resources"
          title="Use the right references at the right time"
          description="These references are grouped to help you stay on track: what order to follow, what to read next, and where to go when you want more depth."
        />

        <div style={resourceGridStyle}>
          {roadmap.resources.map((group) => (
            <div key={`${roadmap.slug}-${group.title}`} style={infoCardStyle}>
              <h3 style={cardHeadingStyle}>{group.title}</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {group.items.map((item) => (
                  <div key={`${group.title}-${item.label}`} style={resourceRowStyle}>
                    <div>
                      <p style={resourceLabelStyle}>{item.label}</p>
                      <p style={resourceDescriptionStyle}>{item.description}</p>
                    </div>
                    {item.to ? (
                      <Link to={item.to} style={resourceLinkStyle}>
                        Open
                        <ArrowRight size={14} />
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={bottomBannerStyle}>
        <div className="split-section" style={bottomBannerGridStyle}>
          <div>
            <p style={bottomBannerEyebrowStyle}>Ready to move?</p>
            <h2 style={bottomBannerTitleStyle}>Start with the first live track and build momentum fast.</h2>
            <p style={bottomBannerDescriptionStyle}>
              The easiest way to make this page useful is simple: open the first technology track, learn in order, and use interview prep as a checkpoint instead of waiting until the end.
            </p>
          </div>
          <div style={bottomBannerActionsStyle}>
            <ActionLink to={firstTechnology.to}>Open {firstTechnology.label}</ActionLink>
            <ActionLink to={roadmap.interviewPrep.primaryTrackTo} variant="secondary">
              Open prep track
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function HighlightRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={highlightRowStyle}>
      <span style={highlightLabelStyle}>{label}</span>
      <strong style={highlightValueStyle}>{value}</strong>
    </div>
  );
}

const breadcrumbStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '14px',
  fontSize: '0.72rem',
};

const crumbStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
};

const crumbDividerStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
};

const heroShellStyle: CSSProperties = {
  marginBottom: '2.8rem',
  padding: '1px',
  borderRadius: '22px',
  background:
    'linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(20,184,166,0.14) 52%, rgba(249,115,22,0.14) 100%)',
};

const heroGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.35fr) minmax(310px, 0.95fr)',
  gap: '20px',
  borderRadius: '21px',
  background: 'var(--color-bg-primary)',
  padding: '26px',
};

const heroMetaStyle: CSSProperties = {
  margin: '0 0 4px',
  color: 'var(--color-text-muted)',
  fontSize: '0.8rem',
  fontWeight: 800,
};

const heroTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: 'clamp(2rem, 3vw, 3rem)',
  lineHeight: 1.08,
};

const heroSummaryStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-primary)',
  fontSize: '1.03rem',
  fontWeight: 700,
  lineHeight: 1.6,
  maxWidth: '60ch',
};

const heroDescriptionStyle: CSSProperties = {
  margin: '0 0 18px',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.75,
  maxWidth: '64ch',
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

const chipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  padding: '6px 10px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  color: 'var(--color-text-primary)',
  fontSize: '0.74rem',
  fontWeight: 700,
};

const snapshotPanelStyle: CSSProperties = {
  borderRadius: '18px',
  border: '1px solid var(--color-border)',
  background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(37,99,235,0.03) 100%)',
  padding: '18px',
};

const snapshotHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '14px',
  color: 'var(--color-text-primary)',
  fontSize: '0.82rem',
  fontWeight: 800,
};

const snapshotGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '10px',
};

const metricTileStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '12px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
  padding: '12px',
};

const metricTileIconStyle: CSSProperties = {
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

const metricTileValueStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '0.95rem',
  fontWeight: 900,
};

const metricTileLabelStyle: CSSProperties = {
  margin: '2px 0 0',
  color: 'var(--color-text-muted)',
  fontSize: '0.67rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const snapshotDividerStyle: CSSProperties = {
  height: '1px',
  background: 'var(--color-border)',
  margin: '14px 0',
};

const snapshotListTitleStyle: CSSProperties = {
  margin: '0 0 8px',
  color: 'var(--color-text-primary)',
  fontSize: '0.8rem',
  fontWeight: 800,
};

const compactListStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '18px',
  color: 'var(--color-text-secondary)',
  fontSize: '0.82rem',
  lineHeight: 1.6,
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

const overviewGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.3fr) minmax(270px, 0.9fr)',
  gap: '16px',
};

const overviewMainGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '14px',
};

const overviewSideStyle: CSSProperties = {
  display: 'grid',
};

const infoCardStyle: CSSProperties = {
  borderRadius: '16px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  padding: '18px',
};

const cardHeadingStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-primary)',
  fontSize: '0.98rem',
  fontWeight: 800,
};

const listStyle: CSSProperties = {
  margin: 0,
  paddingLeft: '18px',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.65,
  fontSize: '0.84rem',
};

const listItemStyle: CSSProperties = {
  marginBottom: '4px',
};

const highlightPanelStyle: CSSProperties = {
  borderRadius: '16px',
  border: '1px solid var(--color-border)',
  background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(20,184,166,0.04) 100%)',
  padding: '18px',
};

const highlightHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
  color: 'var(--color-text-primary)',
  fontSize: '0.82rem',
  fontWeight: 800,
};

const highlightRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  alignItems: 'flex-start',
  borderTop: '1px solid var(--color-border)',
  paddingTop: '10px',
};

const highlightLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.76rem',
  fontWeight: 700,
};

const highlightValueStyle: CSSProperties = {
  color: 'var(--color-text-primary)',
  fontSize: '0.8rem',
  textAlign: 'right',
};

const phaseListStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
};

const phaseCardStyle: CSSProperties = {
  borderRadius: '18px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  padding: '18px 18px 18px 16px',
};

const phaseHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  alignItems: 'center',
  marginBottom: '10px',
};

const phaseIndexStyle: CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  fontSize: '0.8rem',
  fontWeight: 900,
  flexShrink: 0,
};

const phaseLabelStyle: CSSProperties = {
  margin: '0 0 2px',
  color: 'var(--color-text-muted)',
  fontSize: '0.72rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const phaseTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '1.1rem',
};

const phaseSubtitleStyle: CSSProperties = {
  margin: '0 0 14px',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.65,
  fontSize: '0.88rem',
};

const phaseTopicsGridStyle: CSSProperties = {
  display: 'grid',
  gap: '10px',
};

const topicCardStyle: CSSProperties = {
  borderRadius: '14px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
  padding: '14px',
};

const topicTitleStyle: CSSProperties = {
  margin: '0 0 5px',
  color: 'var(--color-text-primary)',
  fontSize: '0.92rem',
  fontWeight: 800,
};

const topicDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.6,
  fontSize: '0.82rem',
};

const linkPillRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '9px',
};

const linkPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  textDecoration: 'none',
  borderRadius: '999px',
  padding: '6px 10px',
  background: 'rgba(37,99,235,0.1)',
  border: '1px solid rgba(37,99,235,0.18)',
  color: 'var(--color-accent)',
  fontSize: '0.74rem',
  fontWeight: 800,
};

const technologyGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '14px',
};

const technologyCardStyle: CSSProperties = {
  display: 'grid',
  gap: '16px',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '16px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  padding: '18px',
};

const technologyDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.84rem',
  lineHeight: 1.65,
};

const technologyFooterStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  color: 'var(--color-accent)',
  fontSize: '0.82rem',
  fontWeight: 900,
  borderTop: '1px solid var(--color-border)',
  paddingTop: '10px',
};

const interviewSectionGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.05fr) minmax(300px, 0.95fr)',
  gap: '16px',
};

const interviewHeroCardStyle: CSSProperties = {
  borderRadius: '18px',
  border: '1px solid var(--color-border)',
  background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(37,99,235,0.04) 100%)',
  padding: '20px',
};

const interviewTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-primary)',
  fontSize: '1.15rem',
  lineHeight: 1.3,
};

const interviewDescriptionStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
  fontSize: '0.88rem',
};

const interviewNoteStyle: CSSProperties = {
  margin: '0 0 14px',
  color: 'var(--color-text-muted)',
  lineHeight: 1.6,
  fontSize: '0.8rem',
};

const interviewSideStyle: CSSProperties = {
  display: 'grid',
  gap: '14px',
};

const topicChipRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const topicChipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  padding: '6px 10px',
  background: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  fontSize: '0.74rem',
  fontWeight: 700,
};

const linkedTrackStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  color: 'var(--color-text-primary)',
  borderRadius: '12px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
  padding: '12px 14px',
  fontSize: '0.84rem',
  fontWeight: 800,
};

const insightGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: '16px',
  marginBottom: '14px',
};

const insightNarrativeStyle: CSSProperties = {
  display: 'grid',
  gap: '14px',
};

const insightListsStyle: CSSProperties = {
  display: 'grid',
  gap: '14px',
};

const paragraphStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.86rem',
  lineHeight: 1.7,
};

const rolesGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '14px',
};

const roleCardStyle: CSSProperties = {
  borderRadius: '16px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-secondary)',
  padding: '18px',
};

const roleTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '1rem',
  fontWeight: 800,
};

const roleExpectationStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.84rem',
  lineHeight: 1.65,
};

const resourceGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '14px',
};

const resourceRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  borderTop: '1px solid var(--color-border)',
  paddingTop: '12px',
};

const resourceLabelStyle: CSSProperties = {
  margin: '0 0 4px',
  color: 'var(--color-text-primary)',
  fontSize: '0.86rem',
  fontWeight: 800,
};

const resourceDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: '0.8rem',
  lineHeight: 1.6,
};

const resourceLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  textDecoration: 'none',
  color: 'var(--color-accent)',
  fontSize: '0.78rem',
  fontWeight: 800,
  whiteSpace: 'nowrap',
};

const bottomBannerStyle: CSSProperties = {
  borderRadius: '20px',
  border: '1px solid var(--color-border)',
  background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(20,184,166,0.08) 55%, rgba(249,115,22,0.08) 100%)',
  padding: '22px',
};

const bottomBannerGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.2fr) auto',
  gap: '18px',
  alignItems: 'center',
};

const bottomBannerEyebrowStyle: CSSProperties = {
  margin: '0 0 8px',
  color: 'var(--color-accent)',
  fontSize: '0.72rem',
  fontWeight: 900,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const bottomBannerTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  color: 'var(--color-text-primary)',
  fontSize: '1.5rem',
  lineHeight: 1.2,
};

const bottomBannerDescriptionStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
  maxWidth: '64ch',
};

const bottomBannerActionsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'flex-end',
};
