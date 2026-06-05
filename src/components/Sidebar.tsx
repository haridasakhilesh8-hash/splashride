import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
import { getInterviewPrepSection } from '../content/interview-prep';
import {
  getInterviewPrepCategoryForSlug,
  getInterviewPrepDefaultTopicSlug,
  getInterviewPrepTopicGroups,
} from '../content/interview-prep/topicNavigation';
import type { NavCategory } from '../lib/navigation';
import { useTech } from '../lib/TechContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { techId, slug: currentSlug } = useParams<{ techId: string; slug: string }>();
  const { activeTech } = useTech();
  const isInterviewPrep = location.pathname.startsWith('/interview-prep/');
  const interviewTopicSlug = new URLSearchParams(location.search).get('topic');
  const interviewTopicGroups = useMemo(
    () => getInterviewPrepTopicGroups(activeTech?.id ?? ''),
    [activeTech?.id],
  );
  const activeSidebarSlug = isInterviewPrep
    ? (interviewTopicSlug ?? getInterviewPrepDefaultTopicSlug(activeTech?.id ?? ''))
    : currentSlug;
  const interviewPrepSection = isInterviewPrep && activeTech?.id ? getInterviewPrepSection(activeTech.id) : null;
  const [interviewCompletedCount, setInterviewCompletedCount] = useState(0);

  // Only show categories belonging to the active technology
  const interviewCategories = useMemo<NavCategory[]>(() => (
    interviewTopicGroups.length > 0
      ? interviewTopicGroups.map((group) => ({
          id: `interview-${group.id}`,
          title: group.title,
          icon: '',
          items: group.topics.map((topic) => ({ slug: topic.slug, title: topic.title })),
        }))
      : []
  ), [interviewTopicGroups]);
  const categories = useMemo(() => (
    isInterviewPrep && interviewCategories.length > 0
      ? interviewCategories
      : activeTech?.categories ?? []
  ), [activeTech?.categories, interviewCategories, isInterviewPrep]);
  const interviewQuestionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!interviewPrepSection) return counts;

    for (const group of interviewTopicGroups) {
      for (const topic of group.topics) {
        counts.set(
          topic.slug,
          interviewPrepSection.questions.filter((question) => question.category === topic.category).length
        );
      }
    }

    return counts;
  }, [interviewPrepSection, interviewTopicGroups]);
  const totalInterviewQuestions = interviewPrepSection?.questions.length ?? 0;
  const interviewProgress = totalInterviewQuestions > 0
    ? Math.round((interviewCompletedCount / totalInterviewQuestions) * 100)
    : 0;
  const liveTopicCount = categories
    .flatMap(c => c.items)
    .filter(i => !i.badge).length;

  useEffect(() => {
    if (!isInterviewPrep || !activeTech?.id) return;

    const readCompletedCount = () => {
      try {
        const stored = window.localStorage.getItem(`splashride-interview-prep-${activeTech.id}-completed`);
        return stored ? (JSON.parse(stored) as string[]).length : 0;
      } catch {
        return 0;
      }
    };

    const updateProgress = () => setInterviewCompletedCount(readCompletedCount());
    const timeout = window.setTimeout(updateProgress, 0);
    window.addEventListener('storage', updateProgress);
    window.addEventListener('splashride-interview-prep-progress', updateProgress);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('storage', updateProgress);
      window.removeEventListener('splashride-interview-prep-progress', updateProgress);
    };
  }, [activeTech?.id, isInterviewPrep]);

  // Auto-expand the category that contains the current topic
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const cat of categories) {
      if (cat.items.some(item => item.slug === activeSidebarSlug)) {
        initial.add(cat.id);
      }
    }
    if (initial.size === 0 && categories.length > 0) initial.add(categories[0].id);
    return initial;
  });

  // Re-expand when route changes
  useEffect(() => {
    if (!activeSidebarSlug) return;
    const activeCategory = categories.find(cat => cat.items.some(item => item.slug === activeSidebarSlug));
    if (!activeCategory) return;

    const timeout = window.setTimeout(() => {
      setExpandedCategories(prev => {
        if (prev.has(activeCategory.id)) return prev;
        return new Set([...prev, activeCategory.id]);
      });
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [activeSidebarSlug, categories]);

  // Expand first category when tech changes and nothing is active
  useEffect(() => {
    if (categories.length > 0) {
      const timeout = window.setTimeout(() => setExpandedCategories(prev => {
        const hasActive = categories.some(cat =>
          cat.items.some(item => item.slug === activeSidebarSlug)
        );
        if (!hasActive) return new Set([categories[0].id]);
        return prev;
      }), 0);

      return () => window.clearTimeout(timeout);
    }
  }, [activeSidebarSlug, activeTech?.id, categories]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTopicClick = (slug: string) => {
    const targetTechId = techId ?? activeTech?.id;
    if (!targetTechId) return;

    navigate(isInterviewPrep
      ? `/interview-prep/${targetTechId}?topic=${slug}`
      : `/technology/${targetTechId}/topic/${slug}`
    );
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <aside
        id="sidebar"
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'var(--color-bg-sidebar)',
          borderRight: '1px solid var(--color-border)',
          height: 'calc(100vh - 56px)',
          position: 'sticky',
          top: '56px',
          overflowY: 'auto',
          padding: isInterviewPrep ? '0.65rem 0' : '1rem 0',
          flexShrink: 0,
        }}
      >
        {/* Technology header */}
        {activeTech && (
          <div style={{
            padding: isInterviewPrep ? '0 0.65rem 0.55rem' : '0 0.75rem 0.75rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: isInterviewPrep ? '0.5rem' : '0.75rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: isInterviewPrep ? '7px 9px' : '8px 10px',
              background: 'var(--color-bg-primary)',
              borderRadius: '7px',
              border: '1px solid var(--color-border)',
            }}>
              <span style={{ fontSize: isInterviewPrep ? '1.05rem' : '1.25rem' }}>{activeTech.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: isInterviewPrep ? '0.84rem' : '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {activeTech.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {isInterviewPrep ? 'Interview Preparation' : `${liveTopicCount} topic${liveTopicCount !== 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={() => navigate(`/technology/${activeTech.id}`)}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '2px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="View all topics"
              >
                <Layers size={13} />
              </button>
            </div>
            <button
              onClick={() => {
                navigate(`/interview-prep/${activeTech.id}`);
                onClose();
                window.scrollTo(0, 0);
              }}
              style={{
                width: '100%',
                marginTop: '8px',
                background: isInterviewPrep ? 'var(--color-accent-light)' : 'var(--color-bg-primary)',
                border: `1px solid ${isInterviewPrep ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: isInterviewPrep ? 'var(--color-accent)' : 'var(--color-text-primary)',
                borderRadius: '7px',
                padding: isInterviewPrep ? '7px 9px' : '8px 10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: isInterviewPrep ? '0.74rem' : '0.78rem',
                fontWeight: 700,
              }}
            >
              Interview Prep
            </button>
            {isInterviewPrep && (
              <div style={{ marginTop: '9px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.2 }}>
                  <span>Overall Progress</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>{interviewProgress}%</span>
                </div>
                <div style={{ height: '3px', marginTop: '6px', background: 'var(--color-border)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${interviewProgress}%`, height: '100%', background: '#22c55e', borderRadius: '999px' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories — scoped to active technology only */}
        {categories.map(cat => {
          const isExpanded = expandedCategories.has(cat.id);
          return (
            <div key={cat.id} style={{ marginBottom: '2px' }}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: isInterviewPrep ? '5px 11px' : '6px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  fontSize: isInterviewPrep ? '0.68rem' : '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: isInterviewPrep ? '0.055em' : '0.07em',
                  lineHeight: 1.25,
                  textAlign: 'left',
                }}
              >
                {cat.icon && <span style={{ fontSize: '0.9rem' }}>{cat.icon}</span>}
                <span style={{ flex: 1 }}>{cat.title}</span>
                {isExpanded
                  ? <ChevronDown size={12} style={{ opacity: 0.5 }} />
                  : <ChevronRight size={12} style={{ opacity: 0.5 }} />
                }
              </button>

              {/* Topics */}
              {isExpanded && (
                <div style={{ paddingBottom: '4px' }}>
                  {cat.items.map(item => {
                    const isActive = item.slug === activeSidebarSlug;
                    const topicQuestionCount = isInterviewPrep
                      ? (interviewQuestionCounts.get(item.slug)
                        ?? interviewPrepSection?.questions.filter((question) => question.category === getInterviewPrepCategoryForSlug(activeTech?.id ?? '', item.slug)).length
                        ?? 0)
                      : null;
                    const isDisabled = !isInterviewPrep && !!item.badge;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => !isDisabled && handleTopicClick(item.slug)}
                        disabled={isDisabled}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px',
                          padding: isInterviewPrep ? '5px 10px 5px 24px' : '6px 12px 6px 28px',
                          minHeight: isInterviewPrep ? '27px' : undefined,
                          background: isActive ? 'var(--color-accent-light)' : 'none',
                          border: 'none',
                          borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                          cursor: isDisabled ? 'default' : 'pointer',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                          fontSize: isInterviewPrep ? '0.78rem' : '0.875rem',
                          fontWeight: isActive ? 700 : 500,
                          lineHeight: 1.3,
                          textAlign: 'left',
                          opacity: isDisabled ? 0.55 : 1,
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                          if (!isActive && !isDisabled) {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg-primary)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'none';
                          }
                        }}
                      >
                        <span>{item.title}</span>
                        {isInterviewPrep && topicQuestionCount !== null && (
                          <span style={{
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            background: isActive ? 'rgba(99,102,241,0.1)' : 'var(--color-bg-primary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '999px',
                            padding: '1px 5px',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums',
                            minWidth: '26px',
                            lineHeight: 1.25,
                            textAlign: 'center',
                            flexShrink: 0,
                          }}>
                            {topicQuestionCount}
                          </span>
                        )}
                        {!isInterviewPrep && item.badge && (
                          <span style={{
                            fontSize: '0.6rem',
                            background: 'var(--color-tag-bg)',
                            color: 'var(--color-tag-text)',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            fontWeight: 600,
                            flexShrink: 0,
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        {!isInterviewPrep && <div style={{
          margin: '1rem 0.75rem 0',
          padding: '0.75rem',
          background: 'var(--color-bg-primary)',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          fontSize: '0.72rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}>
          📚 Learn {activeTech?.label ?? 'tech'} the way senior developers explain it.
        </div>}
      </aside>

      <style>{`
        @media (max-width: 768px) {
          #sidebar {
            position: fixed !important;
            top: 56px !important;
            left: 0 !important;
            z-index: 45;
            transform: translateX(${isOpen ? '0' : '-100%'});
            transition: transform 0.25s ease;
            height: calc(100vh - 56px) !important;
            box-shadow: 4px 0 20px rgba(0,0,0,0.15);
          }
        }
      `}</style>
    </>
  );
}
