import { useMemo, useState, useRef } from 'react';
import { Search, X, Hash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTech } from '../lib/TechContext';
import { technologies } from '../lib/navigation';
import { getActiveInterviewPrepSections, getAllInterviewQuestions, getInterviewPrepSection } from '../content/interview-prep';
import { getInterviewPrepTechnologyConfig } from '../content/interview-prep/sidebarConfig';

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  techId: string;
  techLabel: string;
  kind: 'topic' | 'interview' | 'scenario';
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTech } = useTech();
  const activeInterviewTechnologyId = location.pathname.match(/^\/interview-prep\/([^/]+)/)?.[1];
  const activeInterviewSection = activeInterviewTechnologyId
    ? getInterviewPrepSection(activeInterviewTechnologyId)
    : null;
  const activeInterviewConfig = activeInterviewTechnologyId
    ? getInterviewPrepTechnologyConfig(activeInterviewTechnologyId)
    : null;
  const activeLearningTech = activeInterviewConfig?.learningTechnologyId
    ? technologies.find((tech) => tech.id === activeInterviewConfig.learningTechnologyId)
    : activeTech;
  const activeInterviewFilterId = activeInterviewSection?.technologyId ?? activeTech?.id;
  const activeSearchLabel = activeInterviewSection?.technologyLabel ?? activeTech?.label;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const found: SearchResult[] = [];
    const techsToSearch = activeLearningTech ? [activeLearningTech] : technologies;

    for (const tech of techsToSearch) {
      for (const cat of tech.categories) {
        for (const item of cat.items) {
          if (!item.badge && (item.title.toLowerCase().includes(q) || item.slug.includes(q))) {
            found.push({
              slug: item.slug,
              title: item.title,
              category: cat.title,
              techId: tech.id,
              techLabel: tech.label,
              kind: 'topic',
            });
          }
        }
      }
    }

    for (const item of getAllInterviewQuestions()) {
      if (activeInterviewFilterId && item.technologyId !== activeInterviewFilterId) continue;
      const searchable = [
        item.question,
        item.shortAnswer,
        item.category,
        item.topicGroup,
        item.questionType,
        item.difficultyLevel,
        item.experienceLevel,
        item.relatedTopics.join(' '),
        Object.values(item.roleAnswers).join(' '),
        item.isMostAsked ? 'most asked top questions important' : '',
      ].join(' ').toLowerCase();
      if (searchable.includes(q)) {
        const section = getInterviewPrepSection(item.technologyId);
        const tech = technologies.find(t => t.id === item.technologyId);
        found.push({
          slug: item.id,
          title: item.question,
          category: `Interview Prep - ${item.category}`,
          techId: item.technologyId,
          techLabel: tech?.label ?? section?.technologyLabel ?? item.technologyId.toUpperCase(),
          kind: 'interview',
        });
      }
    }

    for (const section of getActiveInterviewPrepSections()) {
      if (activeInterviewFilterId && section.technologyId !== activeInterviewFilterId) continue;
      for (const scenario of section.productionScenarios) {
        const searchable = [
          scenario.title,
          scenario.topic,
          scenario.problem,
          scenario.rootCauseAnalysis.join(' '),
          scenario.troubleshootingSteps.join(' '),
          scenario.expectedInterviewAnswer,
          scenario.seniorApproach,
          scenario.architectApproach,
          'production scenario troubleshooting support incident',
        ].join(' ').toLowerCase();
        if (searchable.includes(q)) {
          const tech = technologies.find(t => t.id === section.technologyId);
          found.push({
            slug: scenario.id,
            title: scenario.title,
            category: `Production Scenario - ${scenario.topic}`,
            techId: section.technologyId,
            techLabel: tech?.label ?? section.technologyLabel,
            kind: 'scenario',
          });
        }
      }
    }

    return found.slice(0, 8);
  }, [query, activeLearningTech, activeInterviewFilterId]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.kind === 'interview' || result.kind === 'scenario'
      ? `/interview-prep/${result.techId}#${result.slug}`
      : `/technology/${result.techId}/topic/${result.slug}`
    );
    setQuery('');
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--color-bg-secondary)',
          border: `1px solid ${focused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: '8px',
          padding: '5px 10px',
          cursor: 'text',
          transition: 'border-color 0.15s',
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
          minWidth: '200px',
        }}
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        <Search size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => { setIsOpen(true); setFocused(true); }}
          onBlur={() => { setTimeout(() => setIsOpen(false), 200); setFocused(false); }}
          placeholder={activeSearchLabel ? `Search ${activeSearchLabel}...` : 'Search topics...'}
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '0.8rem',
            width: '160px',
          }}
        />
        {query && (
          <button
            onClick={e => { e.stopPropagation(); setQuery(''); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0, display: 'flex' }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          width: '280px',
          background: 'var(--color-bg-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          zIndex: 100,
          overflow: 'hidden',
        }}>
          {results.map(r => (
            <button
              key={`${r.techId}-${r.slug}`}
              onMouseDown={() => handleSelect(r)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderBottom: '1px solid var(--color-border)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <Hash size={13} style={{ color: '#6366f1', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '0.825rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{r.title}</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  {r.techLabel} - {r.category}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
