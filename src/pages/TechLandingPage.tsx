import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTechById } from '../lib/navigation';
import { ArrowRight, BookOpen, BriefcaseBusiness, ChevronRight, GraduationCap, Layers3 } from 'lucide-react';
import SEO from '../components/SEO';
import TechnologyMainFAQs from '../components/TechnologyMainFAQs';
import { absoluteUrl } from '../lib/seo';
import { getTechnologyPath, getTechnologyTopicPath } from '../lib/routes';
import { getTechnologyMainFaqs } from '../content/technologyMainFaqs';
import {
  getCareerPathLinksForTechnology,
  getInterviewPrepPrimaryLinkForTechnology,
  getRelatedTechnologyLinks,
} from '../lib/topicClusters';

export default function TechLandingPage() {
  const { techId } = useParams<{ techId: string }>();
  const navigate = useNavigate();
  const tech = getTechById(techId ?? '');

  if (!tech) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-text-primary)' }}>Technology not found</h1>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const liveTopics = tech.categories
    .flatMap(c => c.items)
    .filter(i => !i.badge);
  const faqs = getTechnologyMainFaqs(tech);
  const interviewPrepLink = getInterviewPrepPrimaryLinkForTechnology(tech.id);
  const careerPathLinks = getCareerPathLinksForTechnology(tech.id, 2);
  const relatedTechnologyLinks = getRelatedTechnologyLinks(tech.id, 3);
  const quickLinks = [
    ...(interviewPrepLink ? [{ ...interviewPrepLink, typeLabel: 'Interview', icon: <GraduationCap size={14} /> }] : []),
    ...careerPathLinks.map((link) => ({ ...link, typeLabel: 'Career Path', icon: <BriefcaseBusiness size={14} /> })),
    ...relatedTechnologyLinks.map((link) => ({ ...link, typeLabel: 'Related Tech', icon: <Layers3 size={14} /> })),
  ].slice(0, 6);

  const techTitle = `${tech.label} Tutorials | SplashRide`;
  const techDescription = `${tech.description} Learn ${tech.label} with practical tutorials, examples, production guidance and interview-ready explanations.`;
  const techStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: techTitle,
      description: techDescription,
      url: absoluteUrl(getTechnologyPath(tech.id)),
      about: tech.label,
      isPartOf: {
        '@type': 'WebSite',
        name: 'SplashRide',
        url: absoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'SplashRide',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: tech.label,
          item: absoluteUrl(getTechnologyPath(tech.id)),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${tech.label} topics`,
      itemListElement: liveTopics.slice(0, 50).map((topic, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(getTechnologyTopicPath(tech.id, topic.slug)),
        name: topic.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div style={{ padding: '2rem 0 4rem', maxWidth: '860px' }} className="fade-in">
      <SEO
        title={techTitle}
        description={techDescription}
        structuredData={techStructuredData}
      />

      <nav aria-label="Breadcrumb" style={breadcrumbStyle}>
        <Link to="/" style={crumbStyle}>Home</Link>
        <ChevronRight size={12} style={{ color: 'var(--color-text-muted)' }} />
        <span style={{ color: 'var(--color-text-muted)' }}>Technologies</span>
        <ChevronRight size={12} style={{ color: 'var(--color-text-muted)' }} />
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>{tech.label}</span>
      </nav>

      {/* Hero */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{tech.icon}</span>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>
              {tech.label}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {liveTopics.length} topic{liveTopics.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '620px' }}>
          {tech.description}
        </p>

        {quickLinks.length > 0 && (
          <section style={quickLinkSectionStyle}>
            <h2 style={quickLinkHeadingStyle}>Continue Learning</h2>
            <div style={quickLinkWrapStyle}>
            {quickLinks.map((link) => (
              <Link key={`${tech.id}-${link.path}`} to={link.path} style={quickLinkStyle}>
                <span style={quickLinkMetaStyle}>
                  <span style={quickLinkIconStyle}>{link.icon}</span>
                  <span style={{ minWidth: 0 }}>
                    <span style={quickLinkLabelStyle}>{link.label}</span>
                    <span style={quickLinkTypeStyle}>{link.typeLabel}</span>
                  </span>
                </span>
                <ArrowRight size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              </Link>
            ))}
            </div>
          </section>
        )}
      </div>

      {/* Categories */}
      {tech.categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-muted)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>{cat.icon}</span> {cat.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {cat.items.map(item => (
              <Link
                key={item.slug}
                to={getTechnologyTopicPath(tech.id, item.slug)}
                onClick={(event) => {
                  if (item.badge) {
                    event.preventDefault();
                    return;
                  }
                  window.scrollTo(0, 0);
                }}
                aria-disabled={!!item.badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  textDecoration: 'none',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  cursor: item.badge ? 'default' : 'pointer',
                  textAlign: 'left',
                  opacity: item.badge ? 0.5 : 1,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (!item.badge) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </span>
                </div>
                {item.badge
                  ? <span style={{ fontSize: '0.6rem', background: 'var(--color-tag-bg)', color: 'var(--color-tag-text)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{item.badge}</span>
                  : <ArrowRight size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                }
              </Link>
            ))}
          </div>
        </div>
      ))}

      <TechnologyMainFAQs faqs={faqs} />
    </div>
  );
}

const breadcrumbStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '0.9rem',
  fontSize: '0.74rem',
  flexWrap: 'wrap' as const,
};

const crumbStyle = {
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
};

const quickLinkSectionStyle = {
  marginTop: '1rem',
};

const quickLinkHeadingStyle = {
  margin: '0 0 0.7rem',
  color: 'var(--color-text-primary)',
  fontSize: '0.96rem',
  fontWeight: 800,
  textAlign: 'left' as const,
};

const quickLinkWrapStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '10px',
};

const quickLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  textDecoration: 'none',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  borderRadius: '10px',
  padding: '10px 12px',
  color: 'inherit',
};

const quickLinkMetaStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  minWidth: 0,
};

const quickLinkIconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  color: 'var(--color-accent)',
  background: 'var(--color-accent-light)',
  flexShrink: 0,
};

const quickLinkLabelStyle = {
  display: 'block',
  color: 'var(--color-text-primary)',
  fontSize: '0.82rem',
  fontWeight: 800,
  lineHeight: 1.35,
};

const quickLinkTypeStyle = {
  display: 'block',
  marginTop: '2px',
  color: 'var(--color-text-muted)',
  fontSize: '0.68rem',
  fontWeight: 700,
  lineHeight: 1.3,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};
