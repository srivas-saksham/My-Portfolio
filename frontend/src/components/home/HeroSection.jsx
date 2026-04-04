import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvailableBadge from './AvailableBadge'
import HeroStats from './HeroStats'
import Button from '@components/ui/Button'
import SceneBackground from '@components/layout/SceneBackground'
import { SITE } from '@utils/constants'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef  = useRef(null)
  const nameRef     = useRef(null)
  const subRef      = useRef(null)
  const actionsRef  = useRef(null)
  const badgeRef    = useRef(null)
  const statsRef    = useRef(null)

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }
    )

    const lines = nameRef.current.querySelectorAll('.hero-line-inner')
    tl.fromTo(lines,
      { y: '110%', skewY: 4 },
      { y: '0%', skewY: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 },
      '-=0.35'
    )

    tl.fromTo(subRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
      '-=0.6'
    )

    tl.fromTo(actionsRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
      '-=0.5'
    )

    tl.fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
      '-=0.4'
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        padding:    'clamp(7rem, 10vw, 10rem) 2.5rem 5rem',
        position:   'relative',
        overflow:   'hidden',
        background: 'var(--bg-base)',
      }}
    >
      <SceneBackground
        gridSize={72}
        gridOpacity={0.13}
        glow1Color="rgba(71,49,152,0.22)"
        glow2Color="rgba(71,49,152,0.14)"
        glow1Pos={{ top: '-15%', right: '-5%' }}
        glow2Pos={{ bottom: '-20%', left: '-10%' }}
        scanLine
        parallaxStrength={1}
      />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto' }}>

        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0, marginBottom: '2.5rem' }}>
          <AvailableBadge />
        </div>

        {/* Name */}
        <div ref={nameRef} style={{ marginBottom: '2.5rem' }}>

          {/* SAKSHAM */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <div
              className="hero-line-inner"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4.5rem, 14vw, 13rem)',
                fontWeight:    700,
                lineHeight:    0.88,
                letterSpacing: '-0.04em',
                color:         'var(--text)',
                display:       'block',
                transform:     'translateY(110%)',
              }}
            >
              SAKSHAM
            </div>
          </div>

          {/* SRIVASTAVA */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88, marginTop: '0.1em' }}>
            <div
              className="hero-line-inner"
              style={{
                fontFamily:           'var(--font-display)',
                fontSize:             'clamp(4.5rem, 14vw, 13rem)',
                fontWeight:           300,
                fontStyle:            'italic',
                lineHeight:           0.88,
                letterSpacing:        '-0.04em',
                color:                'transparent',
                WebkitTextStroke:     '1px rgba(245,245,245,0.45)',
                display:              'block',
                transform:            'translateY(110%)',
                paddingLeft:          'clamp(1.5rem, 5vw, 7rem)',
                backgroundImage:      'linear-gradient(135deg, rgba(245,245,245,0.45) 0%, rgba(71,49,152,0.6) 50%, rgba(245,245,245,0.45) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundSize:       '200% 100%',
              }}
            >
              SRIVASTAVA
            </div>
          </div>
        </div>

        {/* Divider line with gradient */}
        <div
          ref={subRef}
          style={{ opacity: 0 }}
        >
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '1.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              width:      '32px',
              height:     '1px',
              background: 'linear-gradient(90deg, transparent, var(--indigo))',
            }} />
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              color:         'var(--muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight:    1,
            }}>
              Full-stack developer
              <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
              Builder
              <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
              New Delhi
              <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
              2026
            </p>
          </div>
        </div>

        {/* Actions */}
        <div
          ref={actionsRef}
          style={{
            display:      'flex',
            gap:          '1rem',
            flexWrap:     'wrap',
            alignItems:   'center',
            opacity:      0,
            marginBottom: '0rem',
          }}
        >
          <Button to="/projects" variant="primary">
            View Work ↗
          </Button>
          <Button href={SITE.resume} variant="ghost" external>
            Resume ↓
          </Button>

          {/* Inline social hint */}
          <div style={{
            marginLeft: 'auto',
            display:    'flex',
            gap:        '1rem',
            alignItems: 'center',
          }}>
            {[
              { label: 'GH', href: SITE.github },
              { label: 'LI', href: SITE.linkedin },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.12em',
                  color:         'var(--ghost)',
                  textTransform: 'uppercase',
                  transition:    'color 0.2s ease',
                  textDecoration:'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--muted)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ghost)'}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{ opacity: 0 }}>
          <HeroStats />
        </div>

      </div>
    </section>
  )
}