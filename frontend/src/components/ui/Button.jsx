import { Link } from 'react-router-dom'

const styles = {
  base: {
    display:       'inline-flex',
    alignItems:    'center',
    gap:           '0.5rem',
    fontFamily:    'var(--font-mono)',
    fontSize:      '0.72rem',
    fontWeight:    500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderRadius:  'var(--radius-pill)',
    padding:       '0.7rem 1.75rem',
    cursor:        'none',
    transition:    'all 0.25s cubic-bezier(0.19,1,0.22,1)',
    textDecoration: 'none',
    border:        'none',
    lineHeight:    1,
    whiteSpace:    'nowrap',
  },
  primary: {
    background: 'var(--text)',
    color:      'var(--bg-base)',
  },
  ghost: {
    background:  'transparent',
    color:       'var(--muted)',
    border:      '1px solid var(--border)',
  },
  indigo: {
    background: 'var(--indigo)',
    color:      'var(--text)',
  },
}

const hoverStyles = {
  primary: { background: '#d4d4d4' },
  ghost:   { borderColor: 'var(--muted)', color: 'var(--text)' },
  indigo:  { opacity: 0.85 },
}

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
  const combined = { ...styles.base, ...styles[variant], ...style }

  const handleEnter = (e) => {
    Object.assign(e.currentTarget.style, hoverStyles[variant])
  }
  const handleLeave = (e) => {
    Object.assign(e.currentTarget.style, styles[variant])
  }

  if (to) {
    return (
      <Link
        to={to}
        style={combined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={combined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      style={combined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  )
}