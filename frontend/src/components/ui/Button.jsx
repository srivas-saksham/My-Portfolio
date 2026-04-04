import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant  = 'primary',
  href,
  to,
  external = false,
  onClick,
  style    = {},
  ...props
}) {
  const base = {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '0.5rem',
    fontFamily:     'var(--font-mono)',
    fontSize:       '0.7rem',
    fontWeight:     500,
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    borderRadius:   'var(--radius-pill)',
    padding:        '0.72rem 1.8rem',
    cursor:         'none',
    transition:     'all 0.25s cubic-bezier(0.19,1,0.22,1)',
    textDecoration: 'none',
    lineHeight:     1,
    whiteSpace:     'nowrap',
    position:       'relative',
    overflow:       'hidden',
  }

  const variants = {
    primary: {
      background: 'var(--text)',
      color:      'var(--bg-base)',
      border:     'none',
    },
    ghost: {
      background: 'transparent',
      color:      'var(--muted)',
      border:     '1px solid var(--border)',
    },
    indigo: {
      background: 'var(--indigo)',
      color:      '#fff',
      border:     'none',
    },
  }

  const hover = {
    primary: {
      background: '#e0e0e0',
      transform:  'translateY(-1px)',
    },
    ghost: {
      borderColor: 'var(--muted)',
      color:        'var(--text)',
      background:  'rgba(255,255,255,0.04)',
    },
    indigo: {
      background: '#5a3db8',
      transform:  'translateY(-1px)',
    },
  }

  const combined = { ...base, ...variants[variant], ...style }

  const onEnter = (e) => Object.assign(e.currentTarget.style, hover[variant])
  const onLeave = (e) => Object.assign(e.currentTarget.style, variants[variant])

  if (to) return (
    <Link to={to} style={combined} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </Link>
  )

  if (href) return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={combined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </a>
  )

  return (
    <button onClick={onClick} style={combined} onMouseEnter={onEnter} onMouseLeave={onLeave} {...props}>
      {children}
    </button>
  )
}