import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTopicContent } from '../content/index';
import { getTopicTitle, getRelatedSlugs, getCategoryForSlug, getTechById } from '../lib/navigation';
import { useTech } from '../lib/TechContext';
import FAQAccordion from '../components/FAQAccordion';
import CodeBlock from '../components/CodeBlock';
import OnThisPage from '../components/OnThisPage';
import Diagram from '../components/Diagram';
import { AlertTriangle, CheckCircle, Lightbulb, BookOpen, ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { absoluteUrl } from '../lib/seo';
import { getTechnologyPath, getTechnologyTopicPath } from '../lib/routes';

function MarkdownText({ text }: { text: string }) {
  // Simple markdown-like rendering for **bold** and `code` and headings
  const lines = text.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    // Heading
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2).includes('**')) {
      elements.push(
        <h3 key={i} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '1rem', marginBottom: '0.4rem' }}>
          {line.slice(2, -2)}
        </h3>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
          {listItems.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '8px', marginBottom: '4px', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>→</span>
              <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
          {listItems.map((item, j) => (
            <li key={j} style={{ marginBottom: '4px', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ol>
      );
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} style={{ background: '#1e1e2e', borderRadius: '8px', padding: '1rem', overflow: 'auto', margin: '0.75rem 0', border: '1px solid #2d3748' }}>
          <code style={{ color: '#cdd6f4', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(Boolean).map(h => h.trim());
      const rows = tableLines.slice(2).map(row => row.split('|').filter(Boolean).map(c => c.trim()));
      elements.push(
        <div key={i} style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                {headers.map((h, j) => (
                  <th key={j} style={{ background: 'var(--color-bg-sidebar)', padding: '8px 12px', textAlign: 'left', border: '1px solid var(--color-border)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j}>
                  {row.map((cell, k) => (
                    <td key={k} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', background: j % 2 === 1 ? 'var(--color-bg-secondary)' : 'transparent' }}
                      dangerouslySetInnerHTML={{ __html: renderInline(cell) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}
        dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
    );
    i++;
  }

  return <>{elements}</>;
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:600;color:var(--color-text-primary)">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="font-family:var(--font-mono);font-size:0.82em;background:var(--color-bg-sidebar);padding:2px 5px;border-radius:4px;color:var(--color-accent);border:1px solid var(--color-border)">$1</code>');
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--color-border)',
        scrollMarginTop: '80px',
      }}
    >
      {children}
    </h2>
  );
}

function InfoBox({ type, children }: { type: 'info' | 'warning' | 'tip' | 'danger'; children: React.ReactNode }) {
  const configs = {
    info: { bg: '#eff6ff', border: '#3b82f6', darkBg: '#0c1a2e', icon: '💡' },
    warning: { bg: '#fffbeb', border: '#f59e0b', darkBg: '#1a1200', icon: '⚠️' },
    tip: { bg: '#f0fdf4', border: '#22c55e', darkBg: '#0a1f0a', icon: '✅' },
    danger: { bg: '#fef2f2', border: '#ef4444', darkBg: '#1f0a0a', icon: '🚨' },
  };
  const c = configs[type];
  return (
    <div
      className={`note-box ${type}`}
      style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
    >
      <span style={{ flexShrink: 0 }}>{c.icon}</span>
      <div
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: 'var(--color-text-primary)',
          whiteSpace: 'normal',
          overflow: 'visible',
          textOverflow: 'unset',
          display: 'block',
          height: 'auto',
          maxHeight: 'none',
          minWidth: 0,
          overflowWrap: 'anywhere',
          wordBreak: 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function TopicPage() {
  const { slug, techId } = useParams<{ slug: string; techId: string }>();
  const navigate = useNavigate();
  const { activeTech } = useTech();
  const topic = slug ? getTopicContent(slug) : null;
  const category = slug ? getCategoryForSlug(slug) : null;

  if (!topic) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem' }}>Topic Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          This topic is coming soon or the URL is incorrect.
        </p>
        <button
          onClick={() => navigate(techId ? getTechnologyPath(techId) : '/')}
          style={{
            background: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Back to {activeTech?.label ?? 'Home'}
        </button>
      </div>
    );
  }

  const relatedTopics = getRelatedSlugs(topic.slug);
  const pageTech = (techId ? getTechById(techId) : null) ?? activeTech;
  const topicTitle = `${topic.title} | ${pageTech?.label ?? 'Developer'} Tutorial | SplashRide`;
  const topicDescription = topic.description.length > 155
    ? `${topic.description.slice(0, 152).trim()}...`
    : topic.description;
  const topicStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: topic.title,
      description: topic.description,
      dateModified: topic.lastReviewed,
      mainEntityOfPage: absoluteUrl(getTechnologyTopicPath(pageTech?.id ?? techId ?? 'aem', topic.slug)),
      author: {
        '@type': 'Organization',
        name: 'SplashRide',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SplashRide',
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/splashride-logo.png'),
        },
      },
      about: [pageTech?.label, category?.title].filter(Boolean),
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
          name: pageTech?.label ?? 'Technology',
          item: absoluteUrl(getTechnologyPath(pageTech?.id ?? techId ?? 'aem')),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: topic.title,
          item: absoluteUrl(getTechnologyTopicPath(pageTech?.id ?? techId ?? 'aem', topic.slug)),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topic.faqs.map((faq) => ({
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
    <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', maxWidth: '1380px', margin: '0 auto' }}>
      <SEO
        title={topicTitle}
        description={topicDescription}
        type="article"
        structuredData={topicStructuredData}
      />

      {/* Main content */}
      <article
        style={{ flex: 1, minWidth: 0, padding: '1.5rem 0 4rem', maxWidth: '860px' }}
        className="fade-in"
      >
        {/* Breadcrumb */}
        {pageTech && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.78rem', padding: 0, textDecoration: 'none' }}
            >
              SplashRide
            </Link>
            <ChevronRight size={11} style={{ color: 'var(--color-text-muted)' }} />
            <Link
              to={getTechnologyPath(pageTech.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.78rem', padding: 0, textDecoration: 'none' }}
            >
              {pageTech.label}
            </Link>
            {category && (
              <>
                <ChevronRight size={11} style={{ color: 'var(--color-text-muted)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{category.title}</span>
              </>
            )}
            <ChevronRight size={11} style={{ color: 'var(--color-text-muted)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{topic.title}</span>
          </nav>
        )}

        {/* Page header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {topic.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {topic.description}
          </p>

          {/* Meta badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Last reviewed: {topic.lastReviewed}
              </span>
            </div>
            <span style={{ color: 'var(--color-border)' }}>·</span>
            {topic.applicableVersions.map((v) => (
              <span
                key={v}
                style={{
                  fontSize: '0.72rem',
                  background: 'var(--color-tag-bg)',
                  color: 'var(--color-tag-text)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Tag size={10} />
                {v}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: '1.5rem' }} />

        {/* Quick Understanding */}
        <div id="quick-understanding" style={{ scrollMarginTop: '80px' }}>
          <InfoBox type="tip">
            <strong>Quick Understanding:</strong> {topic.quickUnderstanding}
          </InfoBox>
        </div>

        {/* What Is It */}
        <SectionHeading id="what-is-it">
          <span style={{ marginRight: '8px' }}>🔍</span> What Is It?
        </SectionHeading>
        <MarkdownText text={topic.whatIsIt} />

        {/* Why We Need It */}
        <SectionHeading id="why-we-need-it">
          <span style={{ marginRight: '8px' }}>🎯</span> Why Do We Need It?
        </SectionHeading>
        <MarkdownText text={topic.whyWeNeedIt} />

        {/* Real World Usage */}
        <SectionHeading id="real-world">
          <span style={{ marginRight: '8px' }}>🏗️</span> What Happens in Real Projects?
        </SectionHeading>
        <MarkdownText text={topic.realWorldUsage} />

        {/* How It Works */}
        <SectionHeading id="how-it-works">
          <span style={{ marginRight: '8px' }}>⚙️</span> How It Works
        </SectionHeading>
        <MarkdownText text={topic.howItWorks} />

        {/* Diagram */}
        {topic.hasDiagram && topic.diagramType && (
          <Diagram type={topic.diagramType} />
        )}

        {/* Example */}
        <SectionHeading id="example">
          <span style={{ marginRight: '8px' }}>💻</span> Example
        </SectionHeading>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>{topic.example.title}</strong>
          {' — '}{topic.example.description}
        </p>
        <CodeBlock examples={topic.example.code} />

        {/* Common Confusions */}
        <SectionHeading id="common-confusions">
          <span style={{ marginRight: '8px' }}>🤔</span> Common Confusions
        </SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topic.commonConfusions.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '14px 16px',
              }}
            >
              <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                ❓ {item.question}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Production Issues */}
        <SectionHeading id="production-issues">
          <span style={{ marginRight: '8px' }}>🚨</span> Common Production Issues
        </SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topic.productionIssues.map((issue, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                background: 'var(--prod-issue-bg, #fef2f2)',
                borderLeft: '3px solid #ef4444',
                borderRadius: '0 6px 6px 0',
                padding: '10px 14px',
              }}
              className="production-issue-item"
            >
              <AlertTriangle size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{issue}</span>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <SectionHeading id="best-practices">
          <span style={{ marginRight: '8px' }}>✅</span> Best Practices
        </SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topic.bestPractices.map((practice, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                background: 'var(--best-practice-bg, #f0fdf4)',
                borderLeft: '3px solid #22c55e',
                borderRadius: '0 6px 6px 0',
                padding: '10px 14px',
              }}
              className="best-practice-item"
            >
              <CheckCircle size={15} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{practice}</span>
            </div>
          ))}
        </div>

        {/* Architect's Note */}
        <SectionHeading id="architect-note">
          <span style={{ marginRight: '8px' }}>🏛️</span> Architect's Note
        </SectionHeading>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-accent-light), var(--color-bg-secondary))',
            border: '1px solid var(--color-accent)',
            borderRadius: '10px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <Lightbulb size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Senior Architect's Perspective
            </span>
          </div>
          <MarkdownText text={topic.architectNote} />
        </div>

        {/* FAQs */}
        <SectionHeading id="faqs">
          <span style={{ marginRight: '8px' }}>💬</span> Frequently Asked Questions
        </SectionHeading>
        <FAQAccordion faqs={topic.faqs} />

        {/* Key Takeaways */}
        <SectionHeading id="key-takeaways">
          <span style={{ marginRight: '8px' }}>🎯</span> Key Takeaways
        </SectionHeading>
        <div
          style={{
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topic.keyTakeaways.map((takeaway, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                  {takeaway}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <>
            <SectionHeading id="related-topics">
              <span style={{ marginRight: '8px' }}>🔗</span> Related Topics
            </SectionHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {relatedTopics.map((item) => (
                <Link
                  key={item.slug}
                  to={getTechnologyTopicPath(pageTech?.id ?? techId ?? 'aem', item.slug)}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-accent)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
                  }}
                >
                  <BookOpen size={14} />
                  {getTopicTitle(item.slug)}
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </>
        )}

        <style>{`
          :root {
            --prod-issue-bg: #fef2f2;
            --best-practice-bg: #f0fdf4;
          }
          body.dark {
            --prod-issue-bg: #1f0a0a;
            --best-practice-bg: #0a1f0a;
          }
        `}</style>
      </article>

      {/* Right sidebar - On This Page */}
      <div className="on-this-page-sidebar">
        <OnThisPage />
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .on-this-page-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
