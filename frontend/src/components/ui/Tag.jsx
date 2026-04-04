import { cn } from '@utils/cn'

export default function Tag({ children, variant = 'default' }) {
  const base = {
    display:       'inline-flex',
    alignItems:    'center',
    fontFamily:    'var(--font-mono)',
    fontSize:      '0.62rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding:       '0.25rem 0.75rem',
    borderRadius:  'var(--radius-pill)',
    whiteSpace:    'nowrap',
    lineHeight:    1,
  }

  const variants = {
    default: {
      background: 'var(--bg-2)',
      border:     '1px solid var(--border)',
      color:      'var(--muted)',
    },
    indigo: {
      background: 'var(--indigo-dim)',
      border:     '1px solid rgba(71,49,152,0.25)',
      color:      'var(--text)',
    },
    ghost: {
      background: 'transparent',
      border:     '1px solid var(--ghost)',
      color:      'var(--ghost)',
    },
  }

  return (
    <span style={{ ...base, ...variants[variant] }}>
      {children}
    </span>
  )
}