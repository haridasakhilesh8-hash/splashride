import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { CodeExample } from '../content/types';

interface CodeBlockProps {
  examples: CodeExample[];
}

export default function CodeBlock({ examples }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(examples[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const current = examples[activeTab];

  return (
    <div
      style={{
        border: '1px solid #2d3748',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}
    >
      {/* Tabs */}
      {examples.length > 1 && (
        <div
          style={{
            display: 'flex',
            background: '#161b22',
            borderBottom: '1px solid #2d3748',
            overflowX: 'auto',
          }}
        >
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '8px 16px',
                background: 'none',
                border: 'none',
                borderBottom: i === activeTab ? '2px solid #e8520a' : '2px solid transparent',
                color: i === activeTab ? '#e2e8f0' : '#6c7086',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Code header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1a1f2e',
          padding: '8px 16px',
          borderBottom: '1px solid #2d3748',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            color: '#6c7086',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {current.language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: '1px solid #2d3748',
            borderRadius: '4px',
            color: copied ? '#a6e3a1' : '#6c7086',
            padding: '3px 8px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <pre
        style={{
          background: '#0d1117',
          margin: 0,
          padding: '1.25rem',
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.65,
          fontFamily: 'var(--font-mono)',
        }}
      >
        <code style={{ color: '#cdd6f4' }}>{current.code}</code>
      </pre>
    </div>
  );
}
