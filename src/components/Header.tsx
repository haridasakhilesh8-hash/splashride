import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useTech } from '../lib/TechContext';
import { getTechById, technologies } from '../lib/navigation';
import { technologyCategoryGroups } from '../lib/catalogOrder';
import { getTechnologyPath } from '../lib/routes';
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'technologies' | 'interview-prep' | 'career-paths' | null>(null);
  const headerNavRef = useRef<HTMLElement | null>(null);
  const headerTextColor = 'rgba(255,244,235,0.92)';
  const headerActiveColor = '#F59E0B';
  const pathname = location.pathname;

  const technologyGroups = technologyCategoryGroups.map((group) => ({
    label: group.label,
    techIds: group.technologyIds,
  }));
  const interviewPrepSections = getActiveInterviewPrepSections();
  const interviewPrepGroups = technologyCategoryGroups.map((group) => ({
    label: group.label,
    techIds: group.interviewPrepTechnologyIds,
  }));
  const careerPathGroups = [
    {
      label: 'Enterprise CMS',
      items: [
        { slug: 'aem-developer', technologyId: 'aem' },
        { slug: 'contentful-developer', technologyId: 'contentful' },
        { slug: 'sitecore-developer', technologyId: 'sitecore' },
      ],
    },
    {
      label: 'Frontend',
      items: [
        { slug: 'frontend-engineer', technologyId: 'react' },
      ],
    },
    {
      label: 'Backend',
      items: [
        { slug: 'backend-engineer', technologyId: 'java' },
        { slug: 'python-developer', technologyId: 'python' },
        { slug: 'full-stack-java', technologyId: 'springboot' },
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: [
        { slug: 'cloud-engineer', technologyId: 'aws' },
        { slug: 'aws-engineer', technologyId: 'aws' },
        { slug: 'azure-engineer', technologyId: 'azure' },
        { slug: 'devops-engineer', technologyId: 'docker' },
      ],
    },
    {
      label: 'AI',
      items: [
        { slug: 'ai-engineer', technologyId: 'ai-llm' },
      ],
    },
  ];
  const interviewPrepSectionMap = new Map(interviewPrepSections.map((section) => [section.technologyId, section] as const));
  const careerRoadmapMap = new Map(careerRoadmaps.map((roadmap) => [roadmap.slug, roadmap] as const));
  const isTechnologiesActive = pathname.startsWith('/technologies') || pathname.startsWith('/technology');
  const isInterviewPrepActive = pathname.startsWith('/interview-prep');
  const isCareerPathsActive =
    pathname.startsWith('/career-paths')
    || pathname.startsWith('/career-path')
    || pathname.startsWith('/roadmaps');
  const isLearningPathsActive = pathname.startsWith('/learning-paths') || pathname.startsWith('/learning-path');
  const isAboutActive = pathname === '/about' || pathname.startsWith('/about/');
  const showSearchBar = pathname === '/technologies' || pathname.startsWith('/technologies/');

  useEffect(() => {
    setMobileNavOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerNavRef.current) return;
      if (headerNavRef.current.contains(event.target as Node)) return;
      setOpenDropdown(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (dropdown: 'technologies' | 'interview-prep' | 'career-paths') => {
    setOpenDropdown((current) => current === dropdown ? null : dropdown);
  };

  const compactMenuContainerStyle: CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    width: '320px',
    background: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    boxShadow: 'var(--shadow-popup)',
    padding: '10px',
    zIndex: 100,
  };

  const compactMenuHeaderActionStyle: CSSProperties = {
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
  };

  const compactGroupLabelStyle: CSSProperties = {
    margin: '0 0 6px',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'var(--color-text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  };

  const compactPillLinkStyle: CSSProperties = {
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
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const scrollToHomeSection = (sectionId: string) => {
    setMobileNavOpen(false);
    setOpenDropdown(null);
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
      height: '58px',
      background: 'linear-gradient(90deg, rgba(5,9,20,0.96) 0%, rgba(10,16,32,0.94) 56%, rgba(20,17,27,0.94) 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.15rem',
      gap: '0.9rem',
      zIndex: 50,
      boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
      backdropFilter: 'blur(18px)',
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
        className="header-logo-button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          padding: '2px 0',
        }}
      >
        <img
          src="/splashride-reference-mark.png"
          alt=""
          aria-hidden="true"
          className="header-logo-mark"
          style={{
            width: '42px',
            height: '34px',
            objectFit: 'contain',
            flexShrink: 0,
            filter: 'hue-rotate(-38deg) saturate(0.86) brightness(1.06) contrast(1.04) drop-shadow(0 0 8px rgba(249,115,22,0.18))',
          }}
        />
        <span className="header-logo-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
          <span style={{
              fontSize: '1.08rem',
              fontWeight: 900,
              color: '#FFF8F2',
              letterSpacing: '-0.025em',
            }}>
            Splash<span style={{ color: '#FF9A3D' }}>Ride</span>
          </span>
          <span className="header-logo-tagline" style={{
            marginTop: '4px',
            fontSize: '0.43rem',
            fontWeight: 800,
            color: 'rgba(226,232,240,0.56)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}>
            Ride Your Tech Journey
          </span>
        </span>
      </button>

      {/* Primary navigation */}
      <nav
        ref={headerNavRef}
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
            aria-expanded={openDropdown === 'technologies'}
            aria-haspopup="menu"
            onClick={() => toggleDropdown('technologies')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: isTechnologiesActive ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '10px',
              padding: '8px 10px',
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
              ...compactMenuContainerStyle,
              opacity: openDropdown === 'technologies' ? 1 : 0,
              pointerEvents: openDropdown === 'technologies' ? 'auto' : 'none',
              transform: openDropdown === 'technologies' ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <div style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <button
                type="button"
                onClick={() => scrollToHomeSection('technology-cards')}
                style={compactMenuHeaderActionStyle}
              >
                View All Technologies
              </button>
            </div>
            {technologyGroups.map(group => (
              <div key={group.label} style={{ padding: '6px 0', borderBottom: group.label === 'AI' ? 'none' : '1px solid var(--color-border)' }}>
                <p style={compactGroupLabelStyle}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.techIds.map(techId => {
                    const tech = technologies.find(t => t.id === techId);
                    if (!tech || !tech.active) return null;

                    return (
                      <Link
                        key={tech.id}
                        to={getTechnologyPath(tech.id)}
                        onClick={() => {
                          closeDropdowns();
                          setActiveTechId(tech.id);
                          window.scrollTo(0, 0);
                        }}
                        style={compactPillLinkStyle}
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
            aria-expanded={openDropdown === 'interview-prep'}
            aria-haspopup="menu"
            onClick={() => toggleDropdown('interview-prep')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: isInterviewPrepActive ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '10px',
              padding: '8px 10px',
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
              ...compactMenuContainerStyle,
              opacity: openDropdown === 'interview-prep' ? 1 : 0,
              pointerEvents: openDropdown === 'interview-prep' ? 'auto' : 'none',
              transform: openDropdown === 'interview-prep' ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <div style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <Link
                to="/interview-prep"
                onClick={() => {
                  closeDropdowns();
                  window.scrollTo(0, 0);
                }}
                style={{
                  ...compactMenuHeaderActionStyle,
                  marginBottom: '6px',
                }}
              >
                View All Interview Prep
              </Link>
            </div>
            {interviewPrepGroups.map((group, index) => (
              <div
                key={group.label}
                style={{
                  padding: '6px 0',
                  borderBottom: index === interviewPrepGroups.length - 1 ? 'none' : '1px solid var(--color-border)',
                }}
              >
                <p style={compactGroupLabelStyle}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.techIds.map((techId) => {
                    const section = interviewPrepSectionMap.get(techId);
                    if (!section) return null;
                    const technology = getTechById(section.technologyId);

                    return (
                      <Link
                        key={section.technologyId}
                        to={`/interview-prep/${section.technologyId}`}
                        onClick={() => {
                          closeDropdowns();
                          setActiveTechId(section.technologyId);
                          window.scrollTo(0, 0);
                        }}
                        style={compactPillLinkStyle}
                      >
                        <span>{technology?.icon ?? section.technologyLabel.slice(0, 2).toUpperCase()}</span>
                        {section.technologyLabel}
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
            aria-expanded={openDropdown === 'career-paths'}
            aria-haspopup="menu"
            onClick={() => toggleDropdown('career-paths')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: isCareerPathsActive ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '10px',
              padding: '8px 10px',
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
              ...compactMenuContainerStyle,
              opacity: openDropdown === 'career-paths' ? 1 : 0,
              pointerEvents: openDropdown === 'career-paths' ? 'auto' : 'none',
              transform: openDropdown === 'career-paths' ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <div style={{ padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <Link
                to="/career-paths"
                onClick={() => {
                  closeDropdowns();
                  window.scrollTo(0, 0);
                }}
                style={compactMenuHeaderActionStyle}
              >
                View All Career Paths
              </Link>
            </div>
            {careerPathGroups.map((group, index) => (
              <div
                key={group.label}
                style={{
                  padding: '6px 0',
                  borderBottom: index === careerPathGroups.length - 1 ? 'none' : '1px solid var(--color-border)',
                }}
              >
                <p style={compactGroupLabelStyle}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {group.items.map((item) => {
                    const roadmap = careerRoadmapMap.get(item.slug);
                    if (!roadmap) return null;
                    const technology = getTechById(item.technologyId);

                    return (
                      <Link
                        key={roadmap.slug}
                        to={`/career-paths/${roadmap.slug}`}
                        onClick={() => {
                          closeDropdowns();
                          window.scrollTo(0, 0);
                        }}
                        style={compactPillLinkStyle}
                      >
                        <span>{technology?.icon ?? roadmap.icon}</span>
                        {roadmap.shortTitle}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
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
              color: isLearningPathsActive ? headerActiveColor : headerTextColor,
              cursor: 'pointer',
              borderRadius: '10px',
              padding: '8px 10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        ))}
        <Link
          to="/about"
          onClick={() => {
            closeDropdowns();
            window.scrollTo(0, 0);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            color: isAboutActive ? headerActiveColor : headerTextColor,
            cursor: 'pointer',
            borderRadius: '10px',
            padding: '8px 10px',
            fontSize: '0.8rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          About
        </Link>
      </nav>

      {/* Right side */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {showSearchBar && (
          <div className="header-search">
            <SearchBar />
          </div>
        )}
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        {!showMenuButton && (
          <button
            type="button"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(open => !open)}
            className="header-mobile-nav-toggle"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '10px',
              color: '#ffffff',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {!showMenuButton && mobileNavOpen && (
        <div
          className="header-mobile-drawer"
          style={{
            position: 'fixed',
            top: '56px',
            left: '0.75rem',
            right: '0.75rem',
            background: 'linear-gradient(180deg, rgba(8,10,15,0.98), rgba(17,24,39,0.98))',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            boxShadow: '0 18px 40px rgba(2,6,23,0.28)',
            padding: '0.75rem',
            display: 'none',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 70,
          }}
        >
          <button
            type="button"
            onClick={() => scrollToHomeSection('technology-cards')}
            className="header-mobile-link"
            style={mobileLinkStyle}
          >
            Explore Technologies
          </button>
          <button
            type="button"
            onClick={() => scrollToHomeSection('choose-goal')}
            className="header-mobile-link"
            style={mobileLinkStyle}
          >
            Learning Paths
          </button>
          <Link
            to="/interview-prep"
            onClick={() => {
              setMobileNavOpen(false);
              window.scrollTo(0, 0);
            }}
            className="header-mobile-link"
            style={mobileLinkStyle}
          >
            Interview Prep
          </Link>
          <Link
            to="/career-paths"
            onClick={() => {
              setMobileNavOpen(false);
              window.scrollTo(0, 0);
            }}
            className="header-mobile-link"
            style={mobileLinkStyle}
          >
            Career Paths
          </Link>
          <Link
            to="/about"
            onClick={() => {
              setMobileNavOpen(false);
              window.scrollTo(0, 0);
            }}
            className="header-mobile-link"
            style={mobileLinkStyle}
          >
            About
          </Link>
        </div>
      )}

      <style>{`
        .header-nav button:hover {
          background: rgba(255,255,255,0.06) !important;
          color: #fff7ed !important;
        }
        .header-nav a:hover {
          background: rgba(255,255,255,0.06) !important;
          color: #fff7ed !important;
        }
        .nav-dropdown-menu a:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
        .nav-dropdown-menu button:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
        }
        .app-header .header-search > div > div {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.14) !important;
          box-shadow: none !important;
        }
        .app-header .header-search input {
          color: #fff7ed !important;
        }
        .app-header .header-search input::placeholder {
          color: rgba(255,237,213,0.58) !important;
        }
        @media (max-width: 1024px) {
          .header-nav { display: none !important; }
          .header-mobile-nav-toggle { display: inline-flex !important; }
          .header-mobile-drawer { display: flex !important; }
        }
        @media (max-width: 768px) {
          .header-search { display: none; }
          .app-header {
            height: 52px !important;
            padding: 0 0.75rem !important;
            gap: 0.5rem !important;
          }
          .header-logo-button,
          .mobile-menu-btn,
          .header-mobile-nav-toggle {
            min-width: 48px;
            min-height: 48px;
          }
          .header-logo-mark {
            width: 38px !important;
            height: 30px !important;
          }
          .header-logo-tagline {
            display: none !important;
          }
          .header-right {
            gap: 0.4rem !important;
            margin-left: auto;
          }
          .header-mobile-drawer {
            top: 52px !important;
          }
        }
        @media (max-width: 430px) {
          .header-logo-text > span:first-child {
            font-size: 0.92rem !important;
          }
          .theme-toggle-btn {
            min-width: 40px !important;
            min-height: 40px !important;
            padding: 6px 8px !important;
            gap: 0 !important;
          }
          .theme-toggle-label {
            display: none !important;
          }
          .header-mobile-drawer {
            left: 0.5rem !important;
            right: 0.5rem !important;
          }
        }
        @media (max-width: 380px) {
          .theme-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

const mobileLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '48px',
  width: '100%',
  padding: '0.75rem 0.9rem',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.04)',
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.92rem',
  fontWeight: 700,
  textAlign: 'left' as const,
  cursor: 'pointer',
} satisfies CSSProperties;
