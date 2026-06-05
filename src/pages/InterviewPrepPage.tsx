import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bookmark,
  Building2,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Search,
  Target,
} from 'lucide-react';
import SEO from '../components/SEO';
import {
  getActiveInterviewPrepSections,
  getInterviewPrepSection,
  getInterviewPrepStats,
  type InterviewPrepQuestion,
} from '../content/interview-prep';
import {
  getInterviewPrepCategoryForSlug,
  getInterviewPrepDefaultTopicSlug,
  getInterviewPrepGroupTitle,
  getInterviewPrepTopicTitle,
} from '../content/interview-prep/topicNavigation';
import { getTechById } from '../lib/navigation';
import { absoluteUrl } from '../lib/seo';
import { useTech } from '../lib/TechContext';

type DetailAccordionId =
  | 'detailed-explanation'
  | 'real-project-example'
  | 'production-scenario'
  | 'interviewer-expectation'
  | 'common-mistakes'
  | 'follow-up-questions'
  | 'architect-perspective';

const answerLabelAliases: Record<string, string> = {
  'direct answer': 'Direct Answer',
  what: 'What',
  why: 'Why',
  how: 'How',
  when: 'When',
  'architecture decision': 'Architecture Decision',
  'architect consideration': 'Architect Consideration',
  baseline: 'Baseline',
  'compatibility check': 'Compatibility Check',
  context: 'Context',
  'cutover decision': 'Cutover Decision',
  decision: 'Decision',
  'decision criteria': 'Decision Criteria',
  'diagnostic evidence': 'Diagnostic Evidence',
  'durable fix': 'Durable Fix',
  'failure mode': 'Failure Mode',
  'likely root cause': 'Likely Root Cause',
  mechanics: 'Mechanics',
  'migration method': 'Migration Method',
  'observed symptom': 'Observed Symptom',
  'operating model': 'Operating Model',
  'implementation choices': 'Implementation Choices',
  'performance method': 'Performance Approach',
  'production and cloud service': 'Production & Cloud Service',
  'production tip': 'Production Tip',
  'governance and ownership': 'Governance & Ownership',
  'security review': 'Security Review',
  threat: 'Threat',
  'trade-off': 'Trade-Off',
  validation: 'Validation',
  'what good looks like': 'What Good Looks Like',
  'common risk': 'Common Risk',
  'troubleshooting path': 'Troubleshooting Approach',
  'troubleshooting approach': 'Troubleshooting Approach',
};

function parseAnswerLabel(text: string) {
  const match = text.match(/^([^:]{1,40}):\s*(.+)$/s);
  if (!match) return null;

  const label = answerLabelAliases[match[1].trim().toLowerCase()];
  return label ? { label, content: match[2].trim() } : null;
}

function splitSupportingParagraphs(text: string) {
  if (text.length < 240) return [text];

  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z/])/);
  if (sentences.length < 2) return [text];

  return sentences.reduce<string[]>((paragraphs, sentence) => {
    const lastIndex = paragraphs.length - 1;
    if (lastIndex >= 0 && paragraphs[lastIndex].length + sentence.length < 220) {
      paragraphs[lastIndex] = `${paragraphs[lastIndex]} ${sentence}`;
    } else {
      paragraphs.push(sentence);
    }
    return paragraphs;
  }, []);
}

function SupportingText({ text }: { text: string }) {
  return (
    <div style={supportingTextStyle}>
      {splitSupportingParagraphs(text).map((paragraph, index) => (
        <p key={`${paragraph}-${index}`} style={detailBodyStyle}>{paragraph}</p>
      ))}
    </div>
  );
}

function AnswerBreakdown({ items }: { items: string[] }) {
  return (
    <div style={answerBreakdownStyle}>
      {items.map((item, index) => {
        const labeled = parseAnswerLabel(item);
        if (!labeled) {
          return (
            <div key={`${item}-${index}`} style={answerBulletStyle}>
              <span style={answerBulletMarkerStyle} />
              <SupportingText text={item} />
            </div>
          );
        }

        return (
          <section key={`${labeled.label}-${index}`} style={answerPointStyle}>
            <h4 style={answerPointLabelStyle}>{labeled.label}</h4>
            <SupportingText text={labeled.content} />
          </section>
        );
      })}
    </div>
  );
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '5px 0 0', maxWidth: '72ch', paddingLeft: '16px', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.55 }}>
      {items.map((item) => <li key={item} style={{ marginBottom: '2px' }}>{item}</li>)}
    </ul>
  );
}

function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'hot' | 'hard' | 'done' }) {
  const colors = {
    default: { color: 'var(--color-text-muted)', bg: 'var(--color-bg-secondary)', border: 'var(--color-border)' },
    hot: { color: '#7c2d12', bg: 'rgba(251,146,60,0.13)', border: 'rgba(251,146,60,0.34)' },
    hard: { color: '#7f1d1d', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.28)' },
    done: { color: '#166534', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.32)' },
  }[tone];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      color: colors.color,
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: '999px',
      padding: '2px 7px',
      fontSize: '11px',
      fontWeight: 800,
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function QuestionListRow({
  question,
  index,
  selected,
  completed,
  onSelect,
}: {
  question: InterviewPrepQuestion;
  index: number;
  selected: boolean;
  completed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`interview-question-row${selected ? ' interview-question-row--selected' : ''}`}
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '24px minmax(0, 1fr) 16px',
        gap: '6px',
        alignItems: 'center',
        minHeight: '36px',
        background: selected ? 'rgba(99,102,241,0.055)' : 'var(--color-bg-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: '7px',
        cursor: 'pointer',
        padding: '4px 8px',
        textAlign: 'left',
        boxShadow: selected ? 'inset 3px 0 0 var(--color-accent)' : 'none',
        transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <span style={{
        color: selected ? 'var(--color-accent)' : 'var(--color-text-muted)',
        fontSize: '0.76rem',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        textAlign: 'right',
      }}>
        {index + 1}
      </span>
      <span style={{
        minWidth: 0,
        color: 'var(--color-text-primary)',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.3,
        overflowWrap: 'anywhere',
      }}>
        {question.question}
      </span>
      <Bookmark size={14} style={{ color: completed ? 'var(--color-accent)' : 'var(--color-text-muted)', justifySelf: 'center' }} />
    </button>
  );
}

export default function InterviewPrepPage() {
  const { techId } = useParams<{ techId: string }>();
  const location = useLocation();
  const { setActiveTechId } = useTech();
  const sections = getActiveInterviewPrepSections();
  const selectedSection = techId ? getInterviewPrepSection(techId) : null;
  const stats = getInterviewPrepStats();
  const tech = selectedSection ? getTechById(selectedSection.technologyId) : undefined;

  const [query, setQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [openDetailSection, setOpenDetailSection] = useState<DetailAccordionId | null>(null);
  const questionListRef = useRef<HTMLDivElement>(null);

  const activeTechnologyId = selectedSection?.technologyId ?? techId ?? '';
  const topicSlug = new URLSearchParams(location.search).get('topic') ?? getInterviewPrepDefaultTopicSlug(activeTechnologyId);
  const activeCategory = getInterviewPrepCategoryForSlug(activeTechnologyId, topicSlug);
  const topicLabel = getInterviewPrepTopicTitle(activeTechnologyId, topicSlug);
  const topicGroupLabel = getInterviewPrepGroupTitle(activeTechnologyId, topicSlug);
  const questions = useMemo(() => selectedSection?.questions ?? [], [selectedSection]);

  const topicQuestions = useMemo(() => (
    questions
      .filter((item) => item.category === activeCategory)
      .sort((a, b) => (a.mostAskedRank ?? 999) - (b.mostAskedRank ?? 999))
  ), [activeCategory, questions]);

  const visibleQuestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topicQuestions.filter((item) => {
      const matchesDifficulty = difficultyFilter === 'all' || item.difficultyLevel === difficultyFilter;
      if (!matchesDifficulty) return false;
      if (!q) return true;
      return [
      item.question,
      item.shortAnswer,
      item.difficultyLevel,
      item.questionType,
      item.relatedTopics.join(' '),
      ].join(' ').toLowerCase().includes(q);
    });
  }, [difficultyFilter, query, topicQuestions]);

  const pageSize = selectedSection?.pagination.questionsPerPage ?? 10;
  const totalPages = Math.max(1, Math.ceil(visibleQuestions.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const paginatedQuestions = useMemo(
    () => visibleQuestions.slice(pageStartIndex, pageStartIndex + pageSize),
    [pageSize, pageStartIndex, visibleQuestions],
  );

  const selectedQuestion = useMemo(() => (
    paginatedQuestions.find((item) => item.id === selectedQuestionId)
    ?? paginatedQuestions[0]
  ), [paginatedQuestions, selectedQuestionId]);

  const selectedIndex = selectedQuestion ? visibleQuestions.findIndex((item) => item.id === selectedQuestion.id) : -1;
  const selectedFrequency = selectedQuestion ? `${selectedQuestion.frequencyScore}%` : '0%';
  const topicCompletedCount = topicQuestions.filter((item) => completedIds.has(item.id)).length;
  const topicLevelLabel = topicQuestions.some((item) => item.difficultyLevel === 'Architect')
    ? 'Beginner to Architect'
    : 'Beginner to Advanced';
  const estimatedMinutes = Math.max(20, Math.round(topicQuestions.length * 4.5));

  useEffect(() => {
    if (techId) setActiveTechId(techId);
  }, [setActiveTechId, techId]);

  useEffect(() => {
    if (!techId) return;
    try {
      const stored = window.localStorage.getItem(`splashride-interview-prep-${techId}-completed`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedIds(new Set(stored ? JSON.parse(stored) as string[] : []));
    } catch {
      setCompletedIds(new Set());
    }
  }, [techId]);

  useEffect(() => {
    if (!techId) return;
    window.localStorage.setItem(`splashride-interview-prep-${techId}-completed`, JSON.stringify(Array.from(completedIds)));
    window.dispatchEvent(new Event('splashride-interview-prep-progress'));
  }, [completedIds, techId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCurrentPage(1);
      setSelectedQuestionId(topicQuestions[0]?.id ?? null);
      setQuery('');
      setDifficultyFilter('all');
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [topicSlug, topicQuestions]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCurrentPage(1);
      setSelectedQuestionId(visibleQuestions[0]?.id ?? null);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [difficultyFilter, query, visibleQuestions]);

  const toggleCompleted = (questionId: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const goToQuestion = (direction: 'previous' | 'next') => {
    if (selectedIndex < 0) return;
    const nextIndex = direction === 'next'
      ? Math.min(visibleQuestions.length - 1, selectedIndex + 1)
      : Math.max(0, selectedIndex - 1);
    const nextPage = Math.floor(nextIndex / pageSize) + 1;
    if (nextPage !== currentPage) {
      setCurrentPage(nextPage);
      window.requestAnimationFrame(() => questionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    setSelectedQuestionId(visibleQuestions[nextIndex]?.id ?? null);
  };

  const changePage = (page: number) => {
    const nextPage = Math.min(totalPages, Math.max(1, page));
    if (nextPage === currentPage) return;

    const firstQuestionOnPage = visibleQuestions[(nextPage - 1) * pageSize];
    setCurrentPage(nextPage);
    setSelectedQuestionId(firstQuestionOnPage?.id ?? null);
    window.requestAnimationFrame(() => questionListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  if (!selectedSection) {
    const landingStructuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Interview Prep | SplashRide',
        description: 'Role-aware developer interview preparation for enterprise technologies.',
        url: absoluteUrl('/interview-prep'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'SplashRide interview preparation technologies',
        itemListElement: sections.map((section, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: section.title,
          url: absoluteUrl(`/interview-prep/${section.technologyId}`),
        })),
      },
    ];

    return (
      <div style={{ padding: '3rem 2rem 5rem', maxWidth: '1000px', margin: '0 auto' }} className="fade-in">
        <SEO
          title="Interview Prep | SplashRide"
          description="Interview preparation paths that teach how junior, mid-level, senior and architect-level developers answer real project questions."
          structuredData={landingStructuredData}
        />

        <p style={eyebrowStyle}>Interview Prep</p>
        <h1 style={{ margin: '0 0 12px', fontSize: '2.1rem', color: 'var(--color-text-primary)', lineHeight: 1.15 }}>
          Prepare for interviews the way experienced engineers answer them.
        </h1>
        <p style={{ margin: '0 0 24px', maxWidth: '700px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Choose a focused preparation path built around real projects, production incidents, migration decisions, security, performance, and what interviewers actually evaluate.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          <Metric label="Technologies" value={stats.technologiesCovered} />
          <Metric label="Questions" value={stats.totalQuestions} />
          <Metric label="Topics" value={stats.totalTopics} />
          <Metric label="Scenarios" value={stats.productionScenarios} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {sections.map((section) => (
            <Link
              key={section.technologyId}
              to={`/interview-prep/${section.technologyId}`}
              onClick={() => {
                setActiveTechId(section.technologyId);
                window.scrollTo(0, 0);
              }}
              style={landingPathStyle}
            >
              <div>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.78rem', fontWeight: 800 }}>{section.technologyLabel}</p>
                <h2 style={{ margin: '4px 0 8px', color: 'var(--color-text-primary)', fontSize: '1.15rem' }}>{section.title}</h2>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.6 }}>{section.description}</p>
              </div>
              <ArrowRight size={18} style={{ color: 'var(--color-accent)' }} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const pageTitle = `${topicLabel} ${selectedSection.technologyLabel} Interview Questions | SplashRide`;
  const pageDescription = `${topicQuestions.length} real-world ${topicLabel} interview questions with answers, production scenarios, and architect-level guidance.`;
  const pageStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDescription,
      url: absoluteUrl(`/interview-prep/${selectedSection.technologyId}?topic=${topicSlug}`),
      about: `${selectedSection.technologyLabel} ${topicLabel}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topicQuestions.slice(0, 20).map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.shortAnswer,
        },
      })),
    },
  ];

  return (
    <div style={{ padding: '0.45rem 0 1rem' }} className="fade-in">
      <SEO title={pageTitle} description={pageDescription} structuredData={pageStructuredData} />

      <div className="interview-workspace" style={workspaceStyle}>
        <section style={listPanelStyle}>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '6px', fontSize: '0.7rem' }}>
            <Link to="/" style={crumbStyle}>SplashRide</Link>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <Link to="/interview-prep" style={crumbStyle}>Interview Prep</Link>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <span style={{ color: 'var(--color-text-muted)' }}>{tech?.label ?? selectedSection.technologyLabel}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <span style={{ color: 'var(--color-text-muted)' }}>{topicGroupLabel}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 800 }}>{topicLabel}</span>
          </nav>

          <header style={{ marginBottom: '6px' }}>
            <h1 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.38rem', lineHeight: 1.12 }}>
              {topicLabel}
            </h1>
          </header>

          <div className="interview-topic-metrics" style={topicMetricGridStyle}>
            <TopicMetric icon={<BookOpen size={13} />} value={topicQuestions.length} label="Questions" />
            <TopicMetric icon={<Clock3 size={13} />} value={`${estimatedMinutes} mins`} label="Est. Time" />
            <TopicMetric icon={<CheckSquare size={13} />} value={`${topicCompletedCount}/${topicQuestions.length}`} label="Completed" />
            <TopicMetric icon={<Target size={13} />} value={topicLevelLabel} label="Level" />
          </div>

          <div className="interview-toolbar" style={toolbarStyle}>
            <label style={searchBoxStyle}>
              <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${topicLabel} questions`}
                style={searchInputStyle}
              />
            </label>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value)}
              style={filterSelectStyle}
              aria-label="Filter questions"
            >
              <option value="all">All Questions</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Architect">Architect</option>
            </select>
          </div>

          <div ref={questionListRef} style={questionListStyle}>
            {visibleQuestions.length === 0 ? (
              <div style={{ padding: '20px', color: 'var(--color-text-secondary)' }}>No questions match the current search.</div>
            ) : paginatedQuestions.map((question, index) => (
              <QuestionListRow
                key={question.id}
                question={question}
                index={pageStartIndex + index}
                selected={selectedQuestion?.id === question.id}
                completed={completedIds.has(question.id)}
                onSelect={() => setSelectedQuestionId(question.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label={`${topicLabel} question pages`} style={paginationContainerStyle}>
              <span style={paginationSummaryStyle}>
                {pageStartIndex + 1}-{Math.min(pageStartIndex + pageSize, visibleQuestions.length)} of {visibleQuestions.length}
              </span>
              <div style={paginationControlsStyle}>
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={getPaginationButtonStyle(false, currentPage === 1)}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => changePage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    style={getPaginationButtonStyle(currentPage === page, false)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={getPaginationButtonStyle(false, currentPage === totalPages)}
                >
                  Next
                </button>
              </div>
            </nav>
          )}
        </section>

        <aside className="interview-detail" style={detailPanelStyle}>
          {selectedQuestion ? (
            <>
              <div style={detailHeaderStyle}>
                <div style={detailMetadataStyle}>
                  <Badge tone={selectedQuestion.difficultyLevel === 'Advanced' || selectedQuestion.difficultyLevel === 'Architect' ? 'hard' : 'done'}>{selectedQuestion.difficultyLevel}</Badge>
                  <Badge>{selectedQuestion.category}</Badge>
                  <Badge tone={selectedQuestion.isMostAsked ? 'hot' : 'default'}>{selectedFrequency} Frequency</Badge>
                </div>
              </div>

              <DetailSection title="Short Answer" icon={<BookOpen size={13} />}>
                <SupportingText text={selectedQuestion.shortAnswer} />
              </DetailSection>

              <AccordionDetailSection
                id="detailed-explanation"
                title="Detailed Explanation"
                icon={<Target size={13} />}
                isOpen={openDetailSection === 'detailed-explanation'}
                onToggle={() => setOpenDetailSection((current) => current === 'detailed-explanation' ? null : 'detailed-explanation')}
              >
                <AnswerBreakdown items={selectedQuestion.detailedAnswer} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="production-scenario"
                title="Production Scenario"
                icon={<Flame size={13} />}
                isOpen={openDetailSection === 'production-scenario'}
                onToggle={() => setOpenDetailSection((current) => current === 'production-scenario' ? null : 'production-scenario')}
              >
                <SupportingText text={selectedQuestion.productionScenario} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="real-project-example"
                title="Real Project Example"
                icon={<CheckSquare size={13} />}
                isOpen={openDetailSection === 'real-project-example'}
                onToggle={() => setOpenDetailSection((current) => current === 'real-project-example' ? null : 'real-project-example')}
              >
                <SupportingText text={selectedQuestion.realProjectExample} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="interviewer-expectation"
                title="Interviewer Expectation"
                icon={<Bookmark size={13} />}
                isOpen={openDetailSection === 'interviewer-expectation'}
                onToggle={() => setOpenDetailSection((current) => current === 'interviewer-expectation' ? null : 'interviewer-expectation')}
              >
                <SupportingText text={selectedQuestion.interviewerExpectation} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="common-mistakes"
                title="Common Mistakes"
                icon={<AlertTriangle size={13} />}
                isOpen={openDetailSection === 'common-mistakes'}
                onToggle={() => setOpenDetailSection((current) => current === 'common-mistakes' ? null : 'common-mistakes')}
              >
                <TextList items={selectedQuestion.commonMistakes} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="follow-up-questions"
                title="Follow-Up Questions"
                icon={<ChevronRight size={13} />}
                isOpen={openDetailSection === 'follow-up-questions'}
                onToggle={() => setOpenDetailSection((current) => current === 'follow-up-questions' ? null : 'follow-up-questions')}
              >
                <TextList items={selectedQuestion.followUpQuestions} />
              </AccordionDetailSection>

              <AccordionDetailSection
                id="architect-perspective"
                title="Architect Perspective"
                icon={<Building2 size={13} />}
                isOpen={openDetailSection === 'architect-perspective'}
                onToggle={() => setOpenDetailSection((current) => current === 'architect-perspective' ? null : 'architect-perspective')}
              >
                <SupportingText text={selectedQuestion.architectPerspective} />
              </AccordionDetailSection>

              <div style={answerFeedbackStyle}>
                <span>Was this answer helpful?</span>
                <button type="button" style={iconButtonStyle} aria-label="Helpful answer"><CheckCircle size={14} /></button>
                <button type="button" style={iconButtonStyle} aria-label="Bookmark answer"><Bookmark size={14} /></button>
              </div>

              <div style={detailFooterStyle}>
                <button type="button" onClick={() => goToQuestion('previous')} disabled={selectedIndex <= 0} style={secondaryButtonStyle}>
                  <ChevronLeft size={14} />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => toggleCompleted(selectedQuestion.id)}
                  style={markButtonStyle}
                >
                  <CheckCircle size={14} />
                  {completedIds.has(selectedQuestion.id) ? 'Completed' : 'Mark as Completed'}
                </button>
                <button type="button" onClick={() => goToQuestion('next')} disabled={selectedIndex >= visibleQuestions.length - 1} style={secondaryButtonStyle}>
                  Next Question
                  <ChevronRight size={14} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--color-text-secondary)', padding: '2rem', textAlign: 'center' }}>
              Select a question to view the answer and interview coaching notes.
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .interview-question-row:hover {
          background: var(--color-bg-secondary) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
        }
        .interview-question-row--selected:hover {
          background: rgba(99, 102, 241, 0.075) !important;
        }
        .interview-detail-accordion:hover {
          background: var(--color-bg-secondary) !important;
        }
        .interview-detail-accordion__content {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 220ms ease, opacity 180ms ease;
        }
        .interview-detail-accordion__content--open {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .interview-detail-accordion__inner {
          min-height: 0;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .interview-detail-accordion,
          .interview-detail-accordion__content {
            transition: none !important;
          }
        }
        @media (max-width: 980px) {
          .interview-workspace {
            grid-template-columns: 1fr !important;
            padding: 0 12px !important;
          }
          .interview-detail {
            position: static !important;
            max-height: none !important;
          }
          .interview-topic-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .interview-toolbar {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
      <p style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: 900, fontSize: '1.1rem' }}>{value}</p>
      <p style={{ margin: '3px 0 0', color: 'var(--color-text-muted)', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase' }}>{label}</p>
    </div>
  );
}

function TopicMetric({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div style={topicMetricStyle}>
      <span style={topicMetricIconStyle}>{icon}</span>
      <span style={{ minWidth: 0 }}>
        <span style={{
          display: 'block',
          color: 'var(--color-text-primary)',
          fontSize: '0.75rem',
          fontWeight: 750,
          lineHeight: 1.12,
          overflowWrap: 'anywhere',
        }}>
          {value}
        </span>
        <span style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.58rem', fontWeight: 700, lineHeight: 1.1 }}>{label}</span>
      </span>
    </div>
  );
}

function DetailSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section style={detailSectionStyle}>
      <h3 style={detailTitleStyle}><span style={detailIconStyle}>{icon}</span>{title}</h3>
      {children}
    </section>
  );
}

function AccordionDetailSection({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  id: DetailAccordionId;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const contentId = `interview-detail-${id}`;

  return (
    <section style={accordionSectionStyle}>
      <button
        type="button"
        className="interview-detail-accordion"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        style={accordionButtonStyle}
      >
        <span style={detailIconStyle}>{icon}</span>
        <span style={{ flex: 1 }}>{title}</span>
        <ChevronDown
          size={15}
          style={{
            color: 'var(--color-text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 180ms ease',
          }}
        />
      </button>
      <div
        id={contentId}
        aria-hidden={!isOpen}
        className={`interview-detail-accordion__content${isOpen ? ' interview-detail-accordion__content--open' : ''}`}
      >
        <div className="interview-detail-accordion__inner">
          <div style={accordionContentStyle}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function getPaginationButtonStyle(active: boolean, disabled: boolean): CSSProperties {
  return {
    minWidth: active ? '30px' : undefined,
    height: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: active ? 'var(--color-accent)' : 'var(--color-bg-primary)',
    color: active ? '#fff' : 'var(--color-text-secondary)',
    border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
    borderRadius: '6px',
    padding: active ? '0 8px' : '0 10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '12px',
    fontWeight: active ? 800 : 700,
    opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
  };
}

const eyebrowStyle: CSSProperties = {
  margin: '0 0 5px',
  color: 'var(--color-accent)',
  fontSize: '0.7rem',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.09em',
};

const crumbStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
};

const workspaceStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(560px, 1.65fr) minmax(360px, 0.95fr)',
  gap: '12px',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 10px',
  boxSizing: 'border-box',
};

const listPanelStyle: CSSProperties = {
  minWidth: 0,
};

const detailPanelStyle: CSSProperties = {
  background: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '0',
  position: 'sticky',
  top: '68px',
  alignSelf: 'start',
  maxHeight: 'calc(100vh - 78px)',
  overflowY: 'auto',
};

const detailHeaderStyle: CSSProperties = {
  padding: '7px 14px',
  borderBottom: '1px solid var(--color-border)',
};

const detailMetadataStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '5px',
  minWidth: 0,
};

const topicMetricGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '4px',
  marginBottom: '6px',
};

const topicMetricStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '15px minmax(0, 1fr)',
  alignItems: 'center',
  gap: '5px',
  minHeight: '24px',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  borderRadius: '6px',
  padding: '2px 5px',
};

const topicMetricIconStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  borderRadius: '5px',
  color: 'var(--color-accent)',
  background: 'transparent',
  flexShrink: 0,
};

const toolbarStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 150px',
  gap: '7px',
  marginBottom: '6px',
};

const searchBoxStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  borderRadius: '7px',
  padding: '4px 8px',
  minHeight: '30px',
};

const searchInputStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--color-text-primary)',
  fontSize: '0.82rem',
  width: '100%',
};

const filterSelectStyle: CSSProperties = {
  background: 'var(--color-bg-primary)',
  border: '1px solid var(--color-border)',
  borderRadius: '7px',
  color: 'var(--color-text-primary)',
  fontSize: '0.78rem',
  fontWeight: 700,
  padding: '0 10px',
  outline: 'none',
};

const questionListStyle: CSSProperties = {
  display: 'grid',
  gap: '3px',
};

const paginationContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  marginTop: '6px',
  paddingTop: '6px',
  borderTop: '1px solid var(--color-border)',
};

const paginationSummaryStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '12px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
};

const paginationControlsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: '5px',
};

const detailSectionStyle: CSSProperties = {
  margin: 0,
  padding: '8px 14px',
  borderBottom: '1px solid var(--color-border)',
};

const accordionSectionStyle: CSSProperties = {
  margin: 0,
  borderBottom: '1px solid var(--color-border)',
};

const accordionButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  width: '100%',
  background: 'var(--color-bg-primary)',
  border: 0,
  padding: '8px 14px',
  color: 'var(--color-text-primary)',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 650,
  lineHeight: 1.3,
  textAlign: 'left',
  transition: 'background 150ms ease',
};

const accordionContentStyle: CSSProperties = {
  padding: '0 14px 10px 40px',
};

const detailTitleStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  margin: '0 0 6px',
  color: 'var(--color-text-primary)',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: 1.3,
};

const detailBodyStyle: CSSProperties = {
  margin: 0,
  maxWidth: '72ch',
  color: 'var(--color-text-secondary)',
  fontSize: '14px',
  lineHeight: 1.6,
};

const supportingTextStyle: CSSProperties = {
  display: 'grid',
  gap: '6px',
};

const answerBreakdownStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  maxWidth: '72ch',
};

const answerPointStyle: CSSProperties = {
  display: 'grid',
  gap: '4px',
};

const answerPointLabelStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: 1.3,
};

const answerBulletStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '7px minmax(0, 1fr)',
  alignItems: 'start',
  gap: '8px',
};

const answerBulletMarkerStyle: CSSProperties = {
  width: '4px',
  height: '4px',
  marginTop: '8px',
  borderRadius: '50%',
  background: 'var(--color-accent)',
};

const detailIconStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '19px',
  height: '19px',
  borderRadius: '5px',
  color: 'var(--color-accent)',
  background: 'var(--color-accent-light)',
};

const markButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border)',
  borderRadius: '6px',
  padding: '6px 8px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 800,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
};

const secondaryButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  background: 'var(--color-bg-secondary)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border)',
  borderRadius: '7px',
  padding: '7px 10px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 800,
  whiteSpace: 'nowrap',
};

const iconButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  background: 'transparent',
  color: 'var(--color-text-muted)',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const answerFeedbackStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: 0,
  padding: '7px 14px',
  borderBottom: '1px solid var(--color-border)',
  color: 'var(--color-text-secondary)',
  fontSize: '13px',
};

const detailFooterStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  padding: '7px 14px',
  background: 'var(--color-bg-secondary)',
};

const landingPathStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '14px',
  textDecoration: 'none',
  color: 'inherit',
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '18px',
};
