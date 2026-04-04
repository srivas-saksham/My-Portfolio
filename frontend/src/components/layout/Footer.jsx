import { Link }       from 'react-router-dom'
import { SITE }       from '@utils/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop:  '1px solid var(--border)',
        padding:    '1.75rem 2.5rem',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap:   'wrap',
        gap:        '1rem',
      }}
    >
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.68rem',
        color:         'var(--muted)',
        letterSpacing: '0.06em',
      }}>
        © {year} Saksham Srivastava
      </span>

      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.68rem',
        color:         'var(--ghost)',
        letterSpacing: '0.06em',
      }}>
        Built with{' '}
        <span style={{ color: 'var(--indigo)' }}>precision</span>
        {' '}— no shortcuts.
      </span>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { label: 'GitHub',   href: SITE.github   },
          { label: 'LinkedIn', href: SITE.linkedin  },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.68rem',
              color:         'var(--muted)',
              letterSpacing: '0.06em',
              transition:    'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </footer>
  )
}