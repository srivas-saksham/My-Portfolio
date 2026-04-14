import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE } from '@utils/constants'

const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/projects',label: 'Work'    },
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const location  = useLocation()
  const navRef    = useRef(null)
  const linkRefs  = useRef([])
  const centerRef = useRef(null)

  // underline state: { left, width, opacity }
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 })

  const isActive = useCallback((href) => location.pathname === href, [location.pathname])

  const activeIdx = NAV_LINKS.findIndex(l => isActive(l.href))

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── close mobile menu on route change ── */
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  /* ── measure underline position ── */
  const measureLink = useCallback((idx) => {
    const el     = linkRefs.current[idx]
    const center = centerRef.current
    if (!el || !center) return

    const elRect     = el.getBoundingClientRect()
    const centerRect = center.getBoundingClientRect()

    setUnderline({
      left:    elRect.left - centerRect.left + (elRect.width / 2),
      width:   elRect.width - 20,
      opacity: 1,
    })
  }, [])

  /* ── reposition underline to active link on mount / route change ── */
  useEffect(() => {
    if (activeIdx >= 0) {
      // rAF to ensure DOM is laid out
      requestAnimationFrame(() => measureLink(activeIdx))
    } else {
      setUnderline(u => ({ ...u, opacity: 0 }))
    }
  }, [activeIdx, measureLink])

  /* ── hover handlers ── */
  const handleMouseEnter = (idx) => {
    setHoveredIdx(idx)
    measureLink(idx)
  }

  const handleMouseLeave = () => {
    setHoveredIdx(null)
    if (activeIdx >= 0) {
      measureLink(activeIdx)
    } else {
      setUnderline(u => ({ ...u, opacity: 0 }))
    }
  }

  return (
    <>
      <style>{`
        .nav-link-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.19,1,0.22,1);
          pointer-events: none;
        }
        .nav-link-inner:hover::before { opacity: 0.10; }
        .nav-link-inner.is-active::before { opacity: 0.07; }

        .md-show { display: none !important; }
        @media (min-width: 768px) {
          .md-show { display: block !important; }
          .hamburger { display: none !important; }
          .center-nav { display: flex !important; }
        }

        .mobile-link:hover { color: var(--text) !important; }
      `}</style>

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
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          transition:     'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '0.5rem',
            textDecoration: 'none',
            flexShrink:     0,
          }}
        >
          <div style={{
            width:          '28px',
            height:         '28px',
            borderRadius:   '6px',
            background:     'var(--indigo)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
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

        {/* ── Desktop center nav ── */}
        <div
          className="center-nav"
          ref={centerRef}
          style={{
            display:    'none',          /* overridden by .center-nav media query */
            position:   'absolute',
            left:       '50%',
            transform:  'translateX(-50%)',
            alignItems: 'center',
            gap:        '0',
          }}
        >
          {/* Shared animated underline */}
          <span
            aria-hidden="true"
            style={{
              position:   'absolute',
              bottom:     '-1px',
              height:     '1px',
              background: 'var(--indigo)',
              borderRadius: '1px',
              /* center-relative: shift left by half width so we can use translateX(left) */
              left:       0,
              transform:  `translateX(calc(${underline.left}px - 50%))`,
              width:      `${underline.width}px`,
              opacity:    underline.opacity,
              transition: 'transform 0.55s cubic-bezier(0.19,1,0.22,1), width 0.55s cubic-bezier(0.19,1,0.22,1), opacity 0.3s ease',
              pointerEvents: 'none',
            }}
          />

          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              ref={el => (linkRefs.current[i] = el)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              className={`nav-link-inner${isActive(link.href) ? ' is-active' : ''}`}
              style={{
                position:       'relative',
                fontFamily:     'var(--font-mono)',
                fontSize:       '0.7rem',
                fontWeight:     400,
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                color: isActive(link.href) || hoveredIdx === i
                  ? 'var(--text)'
                  : 'var(--muted)',
                textDecoration: 'none',
                padding:        '0.45rem 1.1rem',
                transition:     'color 0.25s ease',
                display:        'block',
                borderRadius:   '6px',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right: CTA + Hamburger ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link
            to="/contact"
            className="md-show"
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
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--indigo)'
              e.currentTarget.style.background  = 'var(--indigo)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background  = 'transparent'
            }}
          >
            Hire me
          </Link>

          {/* Hamburger */}
          <button
            className="hamburger"
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
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div style={{
        position:       'fixed',
        inset:          0,
        background:     'rgba(8,8,8,0.97)',
        zIndex:         998,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'flex-start',
        justifyContent: 'center',
        padding:        '0 2.5rem',
        transform:      menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition:     'transform 0.5s cubic-bezier(0.19,1,0.22,1)',
        pointerEvents:  menuOpen ? 'all' : 'none',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Ambient glow */}
        <div style={{
          position:      'absolute',
          bottom:        '10%',
          right:         '-5%',
          width:         '40vw',
          height:        '40vw',
          background:    'radial-gradient(circle, rgba(71,49,152,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            to={link.href}
            className="mobile-link"
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

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a
            href={`mailto:${SITE.email}`}
            style={{
              fontFamily:     'var(--font-mono)',
              fontSize:       '0.65rem',
              color:          'var(--muted)',
              letterSpacing:  '0.08em',
              textDecoration: 'none',
            }}
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  )
}