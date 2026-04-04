import { useEffect, useRef }  from 'react'
import gsap                   from 'gsap'
import AvailableBadge         from './AvailableBadge'
import HeroStats              from './HeroStats'
import Button                 from '@components/ui/Button'
import { SITE }               from '@utils/constants'

export default function HeroSection() {
  const nameRef    = useRef(null)
  const subRef     = useRef(null)
  const actionsRef = useRef(null)
  const badgeRef   = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    // Badge
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    )

    // Name — clip reveal per line
    const lines = nameRef.current.querySelectorAll('.hero-line')
    tl.fromTo(lines,
      { y: '105%' },
      { y: '0%', duration: 1, ease: 'expo.out', stagger: 0.08 },
      '-=0.3'
    )

    // Subline
    tl.fromTo(subRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
      '-=0.5'
    )

    // Actions
    tl.fromTo(actionsRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      '-=0.4'
    )
  }, [])

  return (
    <section
      style={{
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        padding:    'clamp(6rem, 10vw, 10rem) 2.5rem 4rem',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Subtle radial glow — indigo, very faint */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        '-20%',
          right:      '-10%',
          width:      '60vw',
          height:     '60vw',
          background: 'radial-gradient(circle, rgba(71,49,152,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:     0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto' }}>

        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0 }}>
          <AvailableBadge />
        </div>

        {/* Name — oversized, clips right edge intentionally */}
        <div
          ref={nameRef}
          style={{
            marginBottom: '2rem',
            overflow:     'hidden',
          }}
        >
          {/* Line 1 — SAKSHAM */}
          <div style={{ overflow: 'hidden' }}>
            <div
              className="hero-line"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(5rem, 16vw, 14rem)',
                fontWeight:    600,
                lineHeight:    0.88,
                letterSpacing: '-0.04em',
                color:         'var(--text)',
                whiteSpace:    'nowrap',
                transform:     'translateY(105%)',
              }}
            >
              SAKSHAM
            </div>
          </div>

          {/* Line 2 — SRIVASTAVA, slightly offset right */}
          <div style={{ overflow: 'hidden' }}>
            <div
              className="hero-line"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(5rem, 16vw, 14rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                lineHeight:    0.88,
                letterSpacing: '-0.04em',
                color:         'transparent',
                WebkitTextStroke: '1px rgba(245,245,245,0.25)',
                whiteSpace:    'nowrap',
                transform:     'translateY(105%)',
                paddingLeft:   'clamp(2rem, 6vw, 8rem)',
              }}
            >
              SRIVASTAVA
            </div>
          </div>
        </div>

        {/* Subline — one tight mono line */}
        <p
          ref={subRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.78rem',
            color:         'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom:  '2.5rem',
            opacity:       0,
          }}
        >
          Full-stack developer<span style={{ color: 'var(--ghost)', margin: '0 0.75rem' }}>—</span>
          Builder<span style={{ color: 'var(--ghost)', margin: '0 0.75rem' }}>—</span>
          New Delhi, India<span style={{ color: 'var(--ghost)', margin: '0 0.75rem' }}>—</span>
          2026
        </p>

        {/* CTA Actions */}
        <div
          ref={actionsRef}
          style={{
            display:    'flex',
            gap:        '1rem',
            flexWrap:   'wrap',
            alignItems: 'center',
            opacity:    0,
          }}
        >
          <Button to="/projects" variant="primary">
            View Work ↗
          </Button>
          <Button href={SITE.resume} variant="ghost" external>
            Resume ↓
          </Button>
        </div>

        {/* Stats */}
        <HeroStats />
      </div>
    </section>
  )
}