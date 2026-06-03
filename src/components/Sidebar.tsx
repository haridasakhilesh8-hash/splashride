import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
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

  // Only show categories belonging to the active technology
  const categories = activeTech?.categories ?? [];
  const liveTopicCount = categories
    .flatMap(c => c.items)
    .filter(i => !i.badge).length;

  // Auto-expand the category that contains the current topic
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const cat of categories) {
      if (cat.items.some(item => item.slug === currentSlug)) {
        initial.add(cat.id);
      }
    }
    if (initial.size === 0 && categories.length > 0) initial.add(categories[0].id);
    return initial;
  });

  // Re-expand when route changes
  useEffect(() => {
    if (!currentSlug) return;
    for (const cat of categories) {
      if (cat.items.some(item => item.slug === currentSlug)) {
        setExpandedCategories(prev => new Set([...prev, cat.id]));
      }
    }
  }, [currentSlug, categories]);

  // Expand first category when tech changes and nothing is active
  useEffect(() => {
    if (categories.length > 0) {
      setExpandedCategories(prev => {
        const hasActive = categories.some(cat =>
          cat.items.some(item => item.slug === currentSlug)
        );
        if (!hasActive) return new Set([categories[0].id]);
        return prev;
      });
    }
  }, [activeTech?.id]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleTopicClick = (slug: string) => {
    navigate(`/technology/${techId ?? activeTech?.id}/topic/${slug}`);
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
          padding: '1rem 0',
          flexShrink: 0,
        }}
      >
        {/* Technology header */}
        {activeTech && (
          <div style={{
            padding: '0 0.75rem 0.75rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '0.75rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              background: 'var(--color-bg-primary)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
            }}>
              <span style={{ fontSize: '1.25rem' }}>{activeTech.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {activeTech.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {liveTopicCount} topic{liveTopicCount !== 1 ? 's' : ''}
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
                  padding: '6px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{cat.icon}</span>
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
                    const isActive = item.slug === currentSlug;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => !item.badge && handleTopicClick(item.slug)}
                        disabled={!!item.badge}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px',
                          padding: '6px 12px 6px 28px',
                          background: isActive ? 'var(--color-accent-light)' : 'none',
                          border: 'none',
                          borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                          cursor: item.badge ? 'default' : 'pointer',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 500 : 400,
                          textAlign: 'left',
                          opacity: item.badge ? 0.55 : 1,
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                          if (!isActive && !item.badge) {
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
                        {item.badge && (
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
        <div style={{
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
        </div>
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
