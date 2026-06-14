import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Activity,
  AppWindow,
  Blocks,
  Bot,
  Boxes,
  Brain,
  Cpu,
  Cloud,
  Code2,
  Database,
  ChevronDown,
  ChevronRight,
  FolderCog,
  Gauge,
  HardDrive,
  HelpCircle,
  Lock,
  Layers,
  Network,
  Rocket,
  Server,
  Sparkles,
  Waypoints,
  Workflow,
} from 'lucide-react';
import { getInterviewPrepTechnologyConfig } from '../content/interview-prep/sidebarConfig';
import {
  getInterviewPrepDefaultTopicSlug,
} from '../content/interview-prep/topicNavigation';
import type { NavCategory } from '../lib/navigation';
import { useTech } from '../lib/TechContext';
import {
  getLegacyTechnologyTopicPath,
  getTechnologyPath,
  getTechnologyTopicPath,
} from '../lib/routes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarCategoryIcons = {
  AI: Brain,
  APP: AppWindow,
  ARC: Waypoints,
  AWS: Cloud,
  CI: Workflow,
  CPU: Cpu,
  DB: Database,
  Fn: Sparkles,
  IaC: FolderCog,
  ID: Lock,
  PY: Code2,
  ML: Network,
  MON: Activity,
  OPS: Gauge,
  OBJ: Blocks,
  PRD: Rocket,
  PV: HardDrive,
  'Q&A': HelpCircle,
  S3: HardDrive,
  SCL: Gauge,
  SEC: Lock,
  DL: Layers,
  LLM: Bot,
  PM: Sparkles,
  RAG: Database,
  VDB: Database,
  AZ: Cloud,
  VM: Server,
  ST: Database,
  NET: Network,
  CFG: FolderCog,
  K8s: Boxes,
  AKS: Boxes,
  WRK: Boxes,
} as const;

function renderSidebarCategoryIcon(iconToken: string) {
  const Icon = sidebarCategoryIcons[iconToken as keyof typeof sidebarCategoryIcons];
  if (Icon) {
    return (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: 'var(--color-accent)',
        }}
        aria-hidden="true"
      >
        <Icon size={14} strokeWidth={2} />
      </span>
    );
  }

  if (/^[A-Z0-9&/+.-]{2,4}$/i.test(iconToken)) {
    return null;
  }

  return <span style={{ fontSize: '0.9rem' }}>{iconToken}</span>;
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { techId, slug: currentSlug } = useParams<{ techId: string; slug: string }>();
  const { activeTech } = useTech();
  const isInterviewPrep = location.pathname.startsWith('/interview-prep/');
  const routeInterviewTechnologyId = isInterviewPrep
    ? location.pathname.match(/^\/interview-prep\/([^/]+)/)?.[1]
    : undefined;
  const interviewTopicSlug = new URLSearchParams(location.search).get('topic');
  const interviewConfig = useMemo(
    () => (routeInterviewTechnologyId ? getInterviewPrepTechnologyConfig(routeInterviewTechnologyId) : null),
    [routeInterviewTechnologyId],
  );
  const activeSidebarSlug = isInterviewPrep
    ? (interviewTopicSlug
      ?? interviewConfig?.topics[0]?.slug
      ?? getInterviewPrepDefaultTopicSlug(routeInterviewTechnologyId ?? ''))
    : currentSlug;
  const [interviewCompletedCount, setInterviewCompletedCount] = useState(0);
  const sidebarTechnology = isInterviewPrep && interviewConfig
    ? {
        id: interviewConfig.technologyId,
        label: interviewConfig.displayName,
        icon: interviewConfig.icon,
        learningTechnologyId: interviewConfig.learningTechnologyId,
      }
    : activeTech
      ? {
          id: activeTech.id,
          label: activeTech.label,
          icon: activeTech.icon,
          learningTechnologyId: activeTech.id,
        }
      : null;

  // Only show categories belonging to the active technology
  const interviewCategories = useMemo<NavCategory[]>(() => (
    interviewConfig
      ? interviewConfig.categories.map((category) => ({
          id: category.id,
          title: category.title,
          icon: '',
          items: category.topics.map((topic) => ({ slug: topic.slug, title: topic.title })),
        }))
      : []
  ), [interviewConfig]);
  const categories = useMemo(() => (
    isInterviewPrep && interviewCategories.length > 0
      ? interviewCategories
      : activeTech?.categories ?? []
  ), [activeTech?.categories, interviewCategories, isInterviewPrep]);
  const interviewQuestionCounts = useMemo(() => {
    return new Map(Object.entries(interviewConfig?.questionCounts ?? {}));
  }, [interviewConfig]);
  const totalInterviewQuestions = interviewConfig?.totalQuestions ?? 0;
  const interviewProgress = totalInterviewQuestions > 0
    ? Math.round((interviewCompletedCount / totalInterviewQuestions) * 100)
    : 0;
  const liveTopicCount = categories
    .flatMap(c => c.items)
    .filter(i => !i.badge).length;
  const normalizedPathname = normalizePathname(location.pathname);
  const activeTechnologyId = sidebarTechnology?.learningTechnologyId
    ?? sidebarTechnology?.id
    ?? techId
    ?? activeTech?.id
    ?? null;

  const activeTopicSlug = useMemo(() => {
    if (isInterviewPrep) return interviewTopicSlug ?? activeSidebarSlug ?? null;
    if (!activeTechnologyId) return activeSidebarSlug ?? null;

    for (const category of categories) {
      for (const item of category.items) {
        const canonicalPath = normalizePathname(
          getTechnologyTopicPath(activeTechnologyId, item.slug),
        );
        const legacyPath = normalizePathname(
          getLegacyTechnologyTopicPath(activeTechnologyId, item.slug),
        );

        if (normalizedPathname === canonicalPath || normalizedPathname === legacyPath) {
          return item.slug;
        }
      }
    }

    return activeSidebarSlug ?? null;
  }, [
    activeSidebarSlug,
    activeTechnologyId,
    categories,
    interviewTopicSlug,
    isInterviewPrep,
    normalizedPathname,
  ]);

  const activeCategoryId = useMemo(() => {
    if (!activeTopicSlug) return null;

    const activeCategory = categories.find(cat =>
      cat.items.some(item => item.slug === activeTopicSlug)
    );

    return activeCategory?.id ?? null;
  }, [activeTopicSlug, categories]);

  useEffect(() => {
    if (!isInterviewPrep || !interviewConfig) return;

    const readCompletedCount = () => {
      try {
        const stored = window.localStorage.getItem(`splashride-interview-prep-${interviewConfig.technologyId}-completed`);
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
  }, [interviewConfig, isInterviewPrep]);

  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    () => activeCategoryId ?? categories[0]?.id ?? null,
  );

  useEffect(() => {
    setExpandedCategoryId(activeCategoryId ?? categories[0]?.id ?? null);
  }, [activeCategoryId, categories, normalizedPathname, sidebarTechnology?.id]);

  const toggleCategory = (id: string) => {
    setExpandedCategoryId(prev => (prev === id ? null : id));
  };

  const handleTopicClick = (slug: string) => {
    const targetTechId = isInterviewPrep
      ? interviewConfig?.technologyId
      : techId ?? activeTech?.id;
    if (!targetTechId) return;

    navigate(isInterviewPrep
      ? `/interview-prep/${targetTechId}?topic=${slug}`
      : getTechnologyTopicPath(targetTechId, slug)
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
        {sidebarTechnology && (
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
              <span style={{ fontSize: isInterviewPrep ? '1.05rem' : '1.25rem' }}>{sidebarTechnology.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: isInterviewPrep ? '0.84rem' : '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {sidebarTechnology.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {isInterviewPrep ? 'Interview Preparation' : `${liveTopicCount} topic${liveTopicCount !== 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={() => navigate(getTechnologyPath(sidebarTechnology.learningTechnologyId ?? sidebarTechnology.id))}
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
                navigate(`/interview-prep/${sidebarTechnology.id}`);
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
          const isExpanded = expandedCategoryId === cat.id;
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
                {cat.icon && renderSidebarCategoryIcon(cat.icon)}
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
                    const isActive = item.slug === activeTopicSlug;
                    const topicQuestionCount = isInterviewPrep
                      ? (interviewQuestionCounts.get(item.slug) ?? 0)
                      : null;
                    const isDisabled = !isInterviewPrep && !!item.badge;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => !isDisabled && handleTopicClick(item.slug)}
                        disabled={isDisabled}
                        className={isActive ? 'sidebar-active' : undefined}
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
