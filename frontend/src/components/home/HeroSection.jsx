import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvailableBadge from './AvailableBadge'
import HeroStats from './HeroStats'
import Button from '@components/ui/Button'
import { SITE } from '@utils/constants'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef  = useRef(null)
  const nameRef     = useRef(null)
  const subRef      = useRef(null)
  const actionsRef  = useRef(null)
  const badgeRef    = useRef(null)
  const gridRef     = useRef(null)
  const glow1Ref    = useRef(null)
  const glow2Ref    = useRef(null)
  const statsRef    = useRef(null)

  // Mouse parallax
  useEffect(() => {
    const section = sectionRef.current
    const glow1   = glow1Ref.current
    const glow2   = glow2Ref.current
    const grid    = gridRef.current
    if (!section || !glow1 || !glow2 || !grid) return

    const onMove = (e) => {
      const { clientX, clientY, currentTarget } = e
      const { width, height, left, top } = currentTarget.getBoundingClientRect()
      const x = (clientX - left) / width   // 0–1
      const y = (clientY - top)  / height  // 0–1
      const dx = (x - 0.5) * 2  // -1 to 1
      const dy = (y - 0.5) * 2

      gsap.to(glow1, {
        x: dx * 60,
        y: dy * 40,
        duration: 1.4,
        ease: 'power2.out',
      })
      gsap.to(glow2, {
        x: dx * -40,
        y: dy * -30,
        duration: 1.8,
        ease: 'power2.out',
      })
      gsap.to(grid, {
        x: dx * 12,
        y: dy * 8,
        duration: 2,
        ease: 'power2.out',
      })
    }

    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

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
      {/* ── Grid background — interactive parallax ── */}
      <div
        ref={gridRef}
        aria-hidden="true"
        style={{
          position:        'absolute',
          inset:           '-5%',
          backgroundImage: `
            linear-gradient(rgba(206, 206, 206, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71, 49, 152, 0.17) 1px, transparent 1px)
          `,
          backgroundSize:  '72px 72px',
          pointerEvents:   'none',
          zIndex:          0,
          willChange:      'transform',
        }}
      />

      {/* ── Glow 1 — top right, indigo ── */}
      <div
        ref={glow1Ref}
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '-15%',
          right:         '-5%',
          width:         '55vw',
          height:        '55vw',
          background:    'radial-gradient(ellipse at center, rgba(71,49,152,0.22) 0%, rgba(71,49,152,0.06) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:        0,
          willChange:    'transform',
          filter:        'blur(1px)',
        }}
      />

      {/* ── Glow 2 — bottom left, cooler/deeper indigo ── */}
      <div
        ref={glow2Ref}
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        '-20%',
          left:          '-10%',
          width:         '45vw',
          height:        '45vw',
          background:    'radial-gradient(ellipse at center, rgba(71,49,152,0.14) 0%, rgba(40,20,100,0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex:        0,
          willChange:    'transform',
          filter:        'blur(2px)',
        }}
      />

      {/* ── Horizontal scan line — subtle atmosphere ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          left:       0,
          right:      0,
          top:        '38%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(71,49,152,0.18) 30%, rgba(71,49,152,0.35) 50%, rgba(71,49,152,0.18) 70%, transparent 100%)',
          pointerEvents: 'none',
          zIndex:     0,
        }}
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

          {/* SRIVASTAVA — offset + visible stroke + gradient fill */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88, marginTop: '0.1em' }}>
            <div
              className="hero-line-inner"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4.5rem, 14vw, 13rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                lineHeight:    0.88,
                letterSpacing: '-0.04em',
                // Gradient stroke effect: visible at 50% instead of 25%
                color:         'transparent',
                WebkitTextStroke: '1px rgba(245,245,245,0.45)',
                display:       'block',
                transform:     'translateY(110%)',
                paddingLeft:   'clamp(1.5rem, 5vw, 7rem)',
                // Subtle indigo shimmer on the text via background-clip
                backgroundImage: 'linear-gradient(135deg, rgba(245,245,245,0.45) 0%, rgba(71,49,152,0.6) 50%, rgba(245,245,245,0.45) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundSize: '200% 100%',
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
            display:    'flex',
            alignItems: 'center',
            gap:        '1.5rem',
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
            display:    'flex',
            gap:        '1rem',
            flexWrap:   'wrap',
            alignItems: 'center',
            opacity:    0,
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
            marginLeft:    'auto',
            display:       'flex',
            gap:           '1rem',
            alignItems:    'center',
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