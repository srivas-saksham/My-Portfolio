import { useState } from 'react'

export default function Tag({ children, variant = 'default', interactive = false }) {
  const [hovered, setHovered] = useState(false)

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
    cursor:        interactive ? 'default' : 'inherit',
    transition:    'background 0.22s ease, color 0.22s ease, border-color 0.22s ease',
  }

  const variants = {
    default: {
      background:  hovered && interactive ? '#f5f5f5' : 'var(--bg-2)',
      border:      `1px solid ${hovered && interactive ? '#f5f5f5' : 'var(--border)'}`,
      color:       hovered && interactive ? '#080808' : 'var(--muted)',
    },
    indigo: {
      background:  hovered && interactive ? '#f5f5f5' : 'var(--indigo-dim)',
      border:      `1px solid ${hovered && interactive ? '#f5f5f5' : 'rgba(71,49,152,0.25)'}`,
      color:       hovered && interactive ? '#080808' : 'var(--text)',
    },
    ghost: {
      background:  hovered && interactive ? '#f5f5f5' : 'transparent',
      border:      `1px solid ${hovered && interactive ? '#f5f5f5' : 'var(--ghost)'}`,
      color:       hovered && interactive ? '#080808' : 'var(--ghost)',
    },
    live: {
      background:  hovered && interactive ? '#f5f5f5' : 'rgba(74,222,128,0.08)',
      border:      `1px solid ${hovered && interactive ? '#f5f5f5' : 'rgba(74,222,128,0.3)'}`,
      color:       hovered && interactive ? '#080808' : '#4ade80',
    },
  }

  return (
    <span
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
    >
      {children}
    </span>
  )
}