import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE } from '@utils/constants'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const location = useLocation()
  const navRef   = useRef(null)

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) => location.pathname === href

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         1000,
          padding:        '0 2.5rem',
          height:         '68px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          borderBottom:   scrolled
            ? '1px solid rgba(56,56,56,0.6)'
            : '1px solid transparent',
          background: scrolled
            ? 'rgba(8,8,8,0.88)'
            : 'transparent',
          backdropFilter:  scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          transition:      'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.5rem',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width:        '28px',
            height:       '28px',
            borderRadius: '6px',
            background:   'var(--indigo)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            flexShrink:   0,
          }}>
            <span style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '0.9rem',
              fontWeight:    700,
              color:         '#fff',
              lineHeight:    1,
              letterSpacing: '-0.02em',
            }}>S</span>
          </div>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.75rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--text)',
          }}>
            Saksham<span style={{ color: 'var(--muted)', marginLeft: '2px' }}>.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{
          display:    'flex',
          gap:        '0',
          listStyle:  'none',
          alignItems: 'center',
        }}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <Link
                to={link.href}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.7rem',
                  fontWeight:     400,
                  letterSpacing:  '0.1em',
                  textTransform:  'uppercase',
                  color:          isActive(link.href)
                    ? 'var(--text)'
                    : activeIdx === i
                      ? 'var(--text)'
                      : 'var(--muted)',
                  textDecoration: 'none',
                  padding:        '0.5rem 1.25rem',
                  position:       'relative',
                  transition:     'color 0.2s ease',
                  display:        'block',
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{
                    position:     'absolute',
                    bottom:       '-1px',
                    left:         '1.25rem',
                    right:        '1.25rem',
                    height:       '1px',
                    background:   'var(--indigo)',
                    borderRadius: '1px',
                  }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       '0.68rem',
            fontWeight:     500,
            letterSpacing:  '0.1em',
            textTransform:  'uppercase',
            color:          'var(--text)',
            border:         '1px solid var(--border)',
            padding:        '0.45rem 1.1rem',
            borderRadius:   'var(--radius-pill)',
            textDecoration: 'none',
            transition:     'border-color 0.2s ease, background 0.2s ease',
            display:        'none',
          }}
          className="md-show"
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--muted)'
            e.currentTarget.style.background  = 'rgba(255,255,255,0.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.background  = 'transparent'
          }}
        >
          Hire me
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            background:     'none',
            border:         'none',
            cursor:         'none',
            padding:        '6px',
            display:        'flex',
            flexDirection:  'column',
            gap:            '4px',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:         'block',
              width:           i === 1 ? '14px' : '20px',
              height:          '1px',
              background:      'var(--text)',
              transition:      'all 0.35s cubic-bezier(0.19,1,0.22,1)',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(5px) rotate(45deg)'
                : i === 2 ? 'translateY(-5px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
              marginLeft: i === 1 ? 'auto' : '0',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position:      'fixed',
        inset:         0,
        background:    'rgba(8,8,8,0.97)',
        zIndex:        998,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-start',
        justifyContent:'center',
        padding:       '0 2.5rem',
        gap:           '0',
        transform:     menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition:    'transform 0.5s cubic-bezier(0.19,1,0.22,1)',
        pointerEvents: menuOpen ? 'all' : 'none',
        backdropFilter:'blur(20px)',
      }}>
        <div style={{
          position:   'absolute',
          bottom:     '10%',
          right:      '-5%',
          width:      '40vw',
          height:     '40vw',
          background: 'radial-gradient(circle, rgba(71,49,152,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            to={link.href}
            style={{
              fontFamily:     'var(--font-display)',
              fontSize:       'clamp(3rem, 10vw, 6rem)',
              fontWeight:     600,
              letterSpacing:  '-0.04em',
              lineHeight:     1.05,
              color:          isActive(link.href) ? 'var(--text)' : 'rgba(245,245,245,0.3)',
              textDecoration: 'none',
              transition:     'color 0.2s ease',
              display:        'block',
              padding:        '0.1em 0',
              borderBottom:   '1px solid var(--border)',
              width:          '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = isActive(link.href) ? 'var(--text)' : 'rgba(245,245,245,0.3)'}
          >
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              color:         'var(--muted)',
              letterSpacing: '0.12em',
              verticalAlign: 'super',
              marginRight:   '0.5rem',
            }}>
              0{i + 1}
            </span>
            {link.label}
          </Link>
        ))}

        <div style={{
          marginTop:  '3rem',
          display:    'flex',
          gap:        '1.5rem',
          alignItems: 'center',
        }}>
          <a href={`mailto:${SITE.email}`} style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       '0.65rem',
            color:          'var(--muted)',
            letterSpacing:  '0.08em',
            textDecoration: 'none',
          }}>
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  )
}