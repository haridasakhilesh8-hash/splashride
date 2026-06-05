import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import TechLandingPage from './pages/TechLandingPage';
import TopicPage from './pages/TopicPage';
import { getInitialTheme, applyTheme } from './lib/theme';
import { TechProvider } from './lib/TechContext';
import { getTechForSlug } from './lib/navigation';

function AppShell() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Show sidebar on both tech learning pages and technology-specific interview prep pages
  const isTechPage = location.pathname.startsWith('/technology/');
  const isInterviewPrepTechPage = /^\/interview-prep\/[^/]+/.test(location.pathname);
  const showSidebar = isTechPage || isInterviewPrepTechPage;

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (!showSidebar) setSidebarOpen(false);
  }, [showSidebar]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(p => !p)}
        showMenuButton={showSidebar}
      />

      <div style={{ display: 'flex', marginTop: '56px', minHeight: 'calc(100vh - 56px)' }}>
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={showSidebar ? 'main-content-topic' : ''}
          style={{
            flex: 1,
            minWidth: 0,
            padding: showSidebar ? '0 2rem' : '0',
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/interview-prep/:techId" element={<InterviewPrepPage />} />
            {/* Tech landing page */}
            <Route path="/technology/:techId" element={<TechLandingPage />} />
            {/* Topic page — nested under technology */}
            <Route path="/technology/:techId/topic/:slug" element={<TopicPage />} />
            {/* Legacy redirect shim: old /topic/:slug links still work */}
            <Route path="/topic/:slug" element={<LegacyTopicRedirect />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/** Redirects old /topic/:slug URLs to the new /technology/:techId/topic/:slug */
function LegacyTopicRedirect() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const tech = slug ? getTechForSlug(slug) : null;
    const techId = tech?.id ?? 'aem';
    window.location.replace(`/technology/${techId}/topic/${slug}`);
  }, [slug]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      Redirecting…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TechProvider>
        <AppShell />
      </TechProvider>
    </BrowserRouter>
  );
}
