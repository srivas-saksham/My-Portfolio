import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvailableBadge from './AvailableBadge'
import HeroStats from './HeroStats'
import Button from '@components/ui/Button'
import SceneBackground from '@components/layout/SceneBackground'
import { SITE } from '@utils/constants'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef   = useRef(null)
  const nameRef      = useRef(null)
  const subRef       = useRef(null)
  const actionsRef   = useRef(null)
  const badgeRef     = useRef(null)
  const statsRef     = useRef(null)
  const videoRef     = useRef(null)
  const videoWrapRef = useRef(null)
  const [playing, setPlaying] = useState(true)

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

    if (videoWrapRef.current) {
      gsap.fromTo(videoWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.5, ease: 'power2.inOut', delay: 0.6 }
      )
    }
  }, [])

  // Subtle mouse parallax on video — desktop only
  useEffect(() => {
    const section   = sectionRef.current
    const videoWrap = videoWrapRef.current
    if (!section || !videoWrap) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const dx = (clientX / innerWidth  - 0.5) * 18
      const dy = (clientY / innerHeight - 0.5) * 12
      gsap.to(videoWrap, {
        x: dx,
        y: dy,
        duration: 1.8,
        ease: 'power2.out',
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      playing ? videoRef.current.pause() : videoRef.current.play()
      setPlaying(!playing)
    }
  }

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
      {/* ── Layer 1: Scene grid ── */}
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

      {/* ── Layer 2: Desktop cinematic video ── */}
      <div
        ref={videoWrapRef}
        aria-hidden="true"
        className="hero-video-layer hero-video-desktop"
        style={{
          position:  'absolute',
          top:       '-10%',
          left:      '55%',
          width:     'clamp(320px, 55vw, 720px)',
          aspectRatio:'9/16',
          zIndex:    1,
          opacity:   0,
          WebkitMaskImage: `radial-gradient(
            ellipse 72% 78% at 50% 46%,
            black 0%,
            black 28%,
            rgba(0,0,0,0.85) 45%,
            rgba(0,0,0,0.4)  62%,
            rgba(0,0,0,0.1)  78%,
            transparent      100%
          )`,
          maskImage: `radial-gradient(
            ellipse 72% 78% at 50% 46%,
            black 0%,
            black 28%,
            rgba(0,0,0,0.85) 45%,
            rgba(0,0,0,0.4)  62%,
            rgba(0,0,0,0.1)  78%,
            transparent      100%
          )`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width:        '100%',
            height:       '100%',
            objectFit:    'cover',
            display:      'block',
            filter:       'brightness(0.38) saturate(0.25) contrast(1.15) blur(0.4px)',
            mixBlendMode: 'lighten',
          }}
        >
          <source src="/assets/portraits/vidMR1E.mp4" type="video/mp4" />
        </video>

        <div style={{
          position:     'absolute',
          inset:        0,
          background:   'radial-gradient(ellipse 60% 60% at 50% 44%, rgba(71,49,152,0.13) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          pointerEvents:'none',
        }} />
      </div>

      {/* ── Layer 2b: Mobile video — full-bleed background ── */}
      <div
        aria-hidden="true"
        className="hero-video-mobile"
        style={{ display: 'none' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position:       'absolute',
            transform:     'translateX(50%) translateY(-60%)',
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 15%',
            display:        'block',
            filter:         'brightness(0.28) saturate(0.2) contrast(1.1)',
            mixBlendMode:   'lighten',
            zIndex:         0,
            scale:          '50%',
          }}
        >
          <source src="/assets/portraits/vidMR1E.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer mobile overlay for readability */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `
            linear-gradient(
              180deg,
              rgba(8,8,8,0.62)   0%,
              rgba(8,8,8,0.28)  30%,
              rgba(8,8,8,0.18)  55%,
              rgba(8,8,8,0.72)  80%,
              rgba(8,8,8,0.96) 100%
            )
          `,
          zIndex:     1,
          pointerEvents: 'none',
        }} />

        {/* Purple accent tint */}
        <div style={{
          position:     'absolute',
          inset:        0,
          background:   'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(71,49,152,0.18) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          zIndex:       2,
          pointerEvents:'none',
        }} />
      </div>

      {/* Pause/Play toggle — desktop only */}
      <button
        onClick={toggleVideo}
        className="hero-video-toggle"
        style={{
          position:             'absolute',
          top:                  '5rem',
          right:                '2.5rem',
          zIndex:               10,
          display:              'flex',
          alignItems:           'center',
          gap:                  '0.45rem',
          background:           'rgba(8,8,8,0.55)',
          border:               '1px solid rgba(255,255,255,0.08)',
          backdropFilter:       'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding:              '0.35rem 0.65rem',
          cursor:               'pointer',
          transition:           'border-color 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(71,49,152,0.5)'
          e.currentTarget.style.background  = 'rgba(71,49,152,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.background  = 'rgba(8,8,8,0.55)'
        }}
      >
        <span style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '8px',
          color:          'rgba(245,245,245,0.5)',
          fontSize:       '0.5rem',
          lineHeight:     1,
        }}>
          {playing ? '❙❙' : '▶'}
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.48rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'rgba(245,245,245,0.35)',
        }}>
          {playing ? 'pause' : 'play'}
        </span>
      </button>

      {/* ── Layer 3: Content ── */}
      <div style={{
        position:  'relative',
        zIndex:    2,
        maxWidth:  '1200px',
        width:     '100%',
        margin:    '0 auto',
      }}>

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
                fontSize:      'clamp(3.2rem, 14vw, 13rem)',
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
                fontSize:             'clamp(3.2rem, 14vw, 13rem)',
                fontWeight:           300,
                fontStyle:            'italic',
                lineHeight:           0.88,
                letterSpacing:        '-0.04em',
                color:                'transparent',
                WebkitTextStroke:     '0px rgba(245,245,245,0.45)',
                display:              'block',
                transform:            'translateY(110%)',
                paddingLeft:          'clamp(0.8rem, 5vw, 7rem)',
                backgroundImage:      'linear-gradient(135deg, rgba(245,245,245,0.45) 0%, rgba(71,49,152,0.6) 50%, rgba(245,245,245,0.45) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundSize:       '200% 100%',
              }}
            >
              SRIVASTAVA
            </div>
          </div>
        </div>

        {/* Divider + tagline */}
        <div ref={subRef} style={{ opacity: 0 }}>
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '1.5rem',
            marginBottom: '2rem',
            flexWrap:     'wrap',
          }}>
            <div style={{
              width:      '32px',
              height:     '1px',
              background: 'linear-gradient(90deg, transparent, var(--indigo))',
              flexShrink: 0,
            }} />
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.72rem',
              color:         'var(--muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight:    1,
              flexWrap:      'wrap',
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

          <div
            className="hero-social-links"
            style={{
              marginLeft: 'auto',
              display:    'flex',
              gap:        '1rem',
              alignItems: 'center',
            }}
          >
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
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.6rem',
                  letterSpacing:  '0.12em',
                  color:          'var(--ghost)',
                  textTransform:  'uppercase',
                  transition:     'color 0.2s ease',
                  textDecoration: 'none',
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

      <style>{`
        /* ─────────────────────────────────────────────────
           MOBILE HERO REDESIGN  (≤ 767px)
        ───────────────────────────────────────────────── */
        @media (max-width: 767px) {

          /* Hide desktop video, show mobile video */
          .hero-video-desktop { display: none !important; }
          .hero-video-mobile  { display: block !important; }

          /* Hide desktop-only toggle */
          .hero-video-toggle { display: none !important; }

          /* Section: full-viewport, centered column, generous padding */
          section {
            min-height:      100svh !important;
            display:         flex !important;
            flex-direction:  column !important;
            justify-content: flex-end !important;
            align-items:     flex-start !important;
            padding:         5rem 1.5rem 3rem !important;
          }

          /* Content wrapper: push to bottom of video */
          section > div:last-of-type {
            width: 100% !important;
          }

          /* Badge: smaller bottom gap on mobile */
          section [style*="marginBottom: '2.5rem'"] {
            margin-bottom: 1.75rem !important;
          }

          /* Name block: tighten slightly — already responsive via clamp */
          /* tagline / sub area: wrap dots gracefully */
          section p[style*="letterSpacing: '0.14em'"] {
            line-height: 2 !important;
          }

          /* Actions row: full-width column on mobile */
          section [style*="flexWrap: 'wrap'"][style*="alignItems: 'center'"] {
            flex-direction: column !important;
            align-items:    flex-start !important;
            gap:            0.85rem !important;
          }

          /* CTA buttons: full-width */
          section [style*="flexWrap: 'wrap'"][style*="alignItems: 'center'"] > a,
          section [style*="flexWrap: 'wrap'"][style*="alignItems: 'center'"] > button {
            width:           100% !important;
            justify-content: center !important;
            text-align:      center !important;
          }

          /* Social links: row, below buttons, no auto-margin */
          .hero-social-links {
            margin-left:     0 !important;
            width:           100% !important;
            justify-content: flex-start !important;
            padding-top:     0.25rem !important;
          }
        }

        /* ─────────────────────────────────────────────────
           TABLET  (768px – 1023px)
        ───────────────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-video-desktop {
            width: 45vw !important;
            left: 52% !important;
          }
          .hero-video-mobile { display: none !important; }
        }
      `}</style>
    </section>
  )
}