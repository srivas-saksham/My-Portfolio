import { useEffect, useRef, useState } from 'react'
import { Link, useLocation }           from 'react-router-dom'
import { NAV_LINKS, SITE }             from '@utils/constants'
import { cn }                          from '@utils/cn'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const location = useLocation()
  const navRef   = useRef(null)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          right:      0,
          zIndex:     1000,
          padding:    '1.25rem 2.5rem',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          background:   scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.8rem',
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--text)',
          }}
        >
          SS<span style={{ color: 'var(--indigo)' }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display:    'flex',
          gap:        '2.5rem',
          listStyle:  'none',
          alignItems: 'center',
        }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                to={link.href}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  fontWeight:    400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: location.pathname === link.href
                    ? 'var(--text)'
                    : 'var(--muted)',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — pill */}
        <Link
          to="/contact"
          className="hidden md:inline-flex"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.72rem',
            fontWeight:    500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--text)',
            border:        '1px solid var(--border)',
            padding:       '0.5rem 1.25rem',
            borderRadius:  'var(--radius-pill)',
            transition:    'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--muted)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: 'none',
            border:     'none',
            cursor:     'none',
            display:    'flex',
            flexDirection: 'column',
            gap:        '5px',
            padding:    '4px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display:    'block',
                width:      '22px',
                height:     '1px',
                background: 'var(--text)',
                transition: 'all 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position:   'fixed',
          inset:      0,
          background: 'var(--bg-base)',
          zIndex:     999,
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap:        '2.5rem',
          transform:  menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.19,1,0.22,1)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            to={link.href}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.5rem, 8vw, 5rem)',
              fontWeight:    600,
              letterSpacing: '-0.03em',
              color:         'var(--text)',
              lineHeight:    1,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--muted)',
            border:        '1px solid var(--border)',
            padding:       '0.6rem 1.5rem',
            borderRadius:  'var(--radius-pill)',
            marginTop:     '1rem',
          }}
        >
          Hire Me
        </Link>
      </div>
    </>
  )
}