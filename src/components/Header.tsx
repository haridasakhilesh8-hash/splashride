import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useTech } from '../lib/TechContext';
import { technologies } from '../lib/navigation';
import { getActiveInterviewPrepSections } from '../content/interview-prep';
import { careerRoadmaps } from '../content/careerPaths';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  showMenuButton?: boolean;
}

export default function Header({ theme, onThemeToggle, sidebarOpen, onSidebarToggle, showMenuButton }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveTechId } = useTech();
  const headerTextColor = 'rgba(255,255,255,0.92)';
  const headerActiveColor = '#38bdf8';

  const technologyGroups = [
    { label: 'Frontend', techIds: ['react', 'nextjs'] },
    { label: 'Backend', techIds: ['java', 'springboot'] },
    { label: 'Cloud', techIds: ['aws', 'docker', 'kubernetes'] },
    { label: 'Enterprise', techIds: ['aem'] },
    { label: 'AI', techIds: ['ai'] },
  ];
  const interviewPrepSections = getActiveInterviewPrepSections();
  const futureInterviewPrep: string[] = [];
  const isCareerPathsActive = location.pathname.startsWith('/career-paths') || location.pathname.startsWith('/roadmaps');

  const scrollToHomeSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '56px',
      background: 'linear-gradient(90deg, #020a2a 0%, #070a35 48%, #14072f 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.12)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      gap: '0.75rem',
      zIndex: 50,
      boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
    }} className="app-header">
      {/* Mobile menu toggle */}
      {showMenuButton && (
        <button
          onClick={onSidebarToggle}
          aria-label="Toggle navigation"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
          className="mobile-menu-btn"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          padding: 0,
        }}
      >
        <img
          src="/splashride-reference-mark.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '38px',
            height: '30px',
            objectFit: 'contain',
            flexShrink: 0,
            filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.35))',
          }}
        />
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
          <span style={{
              fontSize: '1rem',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
            Splash<span style={{ color: '#0ea5ff' }}>Ride</span>
          </span>
          <span style={{
            marginTop: '3px',
            fontSize: '0.42rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.68)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Ride Your Tech Journey
          </span>
        </span>
      </button>

      {/* Primary navigation */}
      <nav
        className="header-nav"
        aria-label="Primary navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flex: 1,
          minWidth: 0,
        }}
      >
        <div className="nav-dropdown" style={{ position: 'relative' }}>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: headerTextColor,
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '7px 9px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Technologies
            <ChevronDown size={13} />
          </button>

          <div
            className="nav-dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '300px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-popup)',
              padding: '10px',
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
              zIndex: 100,
            }}
          >
            {technologyGroups.map(group => (
              <div key={group.label} style={{ padding: '6px 0', borderBottom: group.label === 'AI' ? 'none' : '1px solid var(--color-border)' }}>
                <p style={{
                  margin: '0 0 6px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.techIds.map(techId => {
                    const tech = technologies.find(t => t.id === techId);
                    if (!tech || !tech.active) return null;

                    return (
                      <Link
                        key={tech.id}
                        to={`/technology/${tech.id}`}
                        onClick={() => {
                          setActiveTechId(tech.id);
                          window.scrollTo(0, 0);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none',
                          background: 'var(--color-bg-secondary)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-primary)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          padding: '7px 9px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        <span>{tech.icon}</span>
                        {tech.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nav-dropdown" style={{ position: 'relative' }}>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: location.pathname.startsWith('/interview-prep') ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '7px 9px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Interview Prep
            <ChevronDown size={13} />
          </button>

          <div
            className="nav-dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '260px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-popup)',
              padding: '10px',
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
              zIndex: 100,
            }}
          >
            <div style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <p style={{
                margin: '0 0 6px',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Available Now
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {interviewPrepSections.map(section => (
                  <Link
                    key={section.technologyId}
                    to={`/interview-prep/${section.technologyId}`}
                    onClick={() => {
                      setActiveTechId(section.technologyId);
                      window.scrollTo(0, 0);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      padding: '7px 9px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    {section.technologyLabel}
                  </Link>
                ))}
              </div>
            </div>
            {futureInterviewPrep.length > 0 && (
              <div style={{ padding: '8px 0 0' }}>
                <p style={{
                  margin: '0 0 6px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Future Ready
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {futureInterviewPrep.map(label => (
                    <span key={label} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-muted)',
                      borderRadius: '8px',
                      padding: '7px 9px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      opacity: 0.72,
                    }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="nav-dropdown" style={{ position: 'relative' }}>
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: isCareerPathsActive ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '7px 9px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Career Paths
            <ChevronDown size={13} />
          </button>

          <div
            className="nav-dropdown-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '320px',
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-popup)',
              padding: '10px',
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
              zIndex: 100,
            }}
          >
            <div style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <p style={{
                margin: '0 0 6px',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Explore Career Paths
              </p>
              <Link
                to="/career-paths"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  padding: '7px 9px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                View All Career Paths
              </Link>
            </div>

            <div style={{ padding: '8px 0 0' }}>
              <p style={{
                margin: '0 0 6px',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Available Roles
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {careerRoadmaps.map((roadmap) => (
                  <Link
                    key={roadmap.slug}
                    to={`/career-paths/${roadmap.slug}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      padding: '7px 9px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    {roadmap.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {[{ label: 'Learning Paths', target: 'choose-goal' }].map(item => (
          <button
            key={item.label}
            type="button"
            onClick={() => scrollToHomeSection(item.target)}
            style={{
              background: 'none',
              border: 'none',
              color: headerTextColor,
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '7px 9px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="header-search">
          <SearchBar />
        </div>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      <style>{`
        .header-nav button:hover {
          background: rgba(255,255,255,0.08) !important;
          color: #ffffff !important;
        }
        .header-nav a:hover {
          background: rgba(255,255,255,0.08) !important;
          color: #ffffff !important;
        }
        .nav-dropdown:hover .nav-dropdown-menu,
        .nav-dropdown:focus-within .nav-dropdown-menu {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateY(0) !important;
        }
        .nav-dropdown-menu a:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
        .app-header .header-search > div > div {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.18) !important;
          box-shadow: none !important;
        }
        .app-header .header-search input {
          color: #ffffff !important;
        }
        .app-header .header-search input::placeholder {
          color: rgba(255,255,255,0.62) !important;
        }
        @media (max-width: 1040px) {
          .header-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          .header-search { display: none; }
        }
      `}</style>
    </header>
  );
}
