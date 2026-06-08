import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import CareerPathsPage from './pages/CareerPathsPage';
import RoadmapPage from './pages/RoadmapPage';
import TechLandingPage from './pages/TechLandingPage';
import TopicPage from './pages/TopicPage';
import { getInitialTheme, applyTheme } from './lib/theme';
import { TechProvider } from './lib/TechContext';
import { getTechById, getTechForSlug } from './lib/navigation';
import { getTechnologyPath, getTechnologyTopicPath } from './lib/routes';

function AppShell() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getInitialTheme());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Show sidebar on both tech learning pages and technology-specific interview prep pages
  const isTechPage = location.pathname.startsWith('/technologies/') || location.pathname.startsWith('/technology/');
  const isInterviewPrepTechPage = /^\/interview-prep\/[^/]+/.test(location.pathname);
  const showSidebar = isTechPage || isInterviewPrepTechPage;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

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
          <Sidebar isOpen={showSidebar && sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
            <Route path="/career-paths" element={<CareerPathsPage />} />
            <Route path="/career-paths/:careerSlug" element={<RoadmapPage />} />
            <Route path="/roadmaps/:roadmapSlug" element={<LegacyRoadmapRedirect />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/interview-prep/:techId" element={<InterviewPrepPage />} />
            <Route path="/technologies/:techId" element={<TechLandingPage />} />
            <Route path="/technologies/:techId/topic/:slug" element={<TopicPage />} />
            <Route path="/technology/:techId" element={<LegacyTechnologyRedirect />} />
            <Route path="/technology/:techId/topic/:slug" element={<LegacyTechnologyTopicRedirect />} />
            <Route path="/topic/:slug" element={<LegacyTopicRedirect />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/** Redirects old /topic/:slug URLs to the new /technologies/:techId/topic/:slug */
function LegacyTopicRedirect() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const tech = slug ? getTechForSlug(slug) : null;
    const techId = tech?.id ?? 'aem';
    if (!slug) return;
    window.location.replace(getTechnologyTopicPath(techId, slug));
  }, [slug]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      Redirecting…
    </div>
  );
}

function LegacyTechnologyRedirect() {
  const { techId } = useParams<{ techId: string }>();

  useEffect(() => {
    if (!techId) return;
    window.location.replace(getTechnologyPath(getTechById(techId)?.id ?? techId));
  }, [techId]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      Redirecting...
    </div>
  );
}

function LegacyTechnologyTopicRedirect() {
  const { techId, slug } = useParams<{ techId: string; slug: string }>();

  useEffect(() => {
    if (!techId || !slug) return;
    window.location.replace(getTechnologyTopicPath(getTechById(techId)?.id ?? techId, slug));
  }, [slug, techId]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      Redirecting...
    </div>
  );
}

function LegacyRoadmapRedirect() {
  const { roadmapSlug } = useParams<{ roadmapSlug: string }>();

  useEffect(() => {
    if (!roadmapSlug) return;
    window.location.replace(`/career-paths/${roadmapSlug}`);
  }, [roadmapSlug]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      Redirecting...
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

