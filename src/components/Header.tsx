import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useTech } from '../lib/TechContext';
import { technologies } from '../lib/navigation';

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

  const technologyGroups = [
    { label: 'Frontend', techIds: ['react', 'nextjs'] },
    { label: 'Backend', techIds: ['java', 'springboot'] },
    { label: 'Cloud', techIds: ['aws', 'docker', 'kubernetes'] },
    { label: 'Enterprise', techIds: ['aem'] },
    { label: 'AI', techIds: ['ai'] },
  ];

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
      background: 'var(--color-bg-primary)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      gap: '0.75rem',
      zIndex: 50,
    }}>
      {/* Mobile menu toggle */}
      {showMenuButton && (
        <button
          onClick={onSidebarToggle}
          aria-label="Toggle navigation"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
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
        <div style={{
          width: '30px',
          height: '30px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={16} color="white" fill="white" />
        </div>
        <span style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}>
          Splash<span style={{ color: '#6366f1' }}>Ride</span>
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
              color: 'var(--color-text-secondary)',
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

        {[
          { label: 'Learning Paths', target: 'choose-goal' },
          { label: 'Interview Prep', target: 'interview-prep' },
          { label: 'Projects', target: 'projects' },
        ].map(item => (
          <button
            key={item.label}
            type="button"
            onClick={() => scrollToHomeSection(item.target)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
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
          background: var(--color-bg-secondary) !important;
          color: var(--color-text-primary) !important;
        }
        .header-nav a:hover {
          background: var(--color-bg-secondary) !important;
          color: var(--color-text-primary) !important;
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
