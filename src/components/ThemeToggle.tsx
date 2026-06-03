import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.78rem',
        fontWeight: 500,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
      }}
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
