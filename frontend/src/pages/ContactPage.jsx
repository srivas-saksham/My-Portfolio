import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageWrapper    from '@components/layout/PageWrapper'
import SEO            from '@components/seo/SEO'
import SceneBackground from '@components/layout/SceneBackground'
import SectionLabel   from '@components/ui/SectionLabel'

import ContactForm  from '@components/contact/ContactForm'
import ContactLinks from '@components/contact/ContactLinks'

import { META } from '@data/meta'
import { SITE } from '@utils/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * ContactPage
 * Full redesign matching the dark editorial aesthetic of the portfolio.
 *
 * Structure:
 *   01 — Hero         (large display title + availability + subtext)
 *   02 — Form + Links (two-column grid — form left, links right)
 *   03 — Footer strip  (CTA watermark row)
 *
 * Visual language:
 *   - SceneBackground grid (same as ProjectsPage + HeroSection)
 *   - GSAP entrance animations (same as all other pages)
 *   - Watermark number in hero background
 *   - Accent indigo rules and pulse dot — consistent with system
 *   - Cormorant Garamond display + Geist Mono body
 */

// ── Floating stat dots — decorative, parallax-driven ─────────────────────────
function FloatingAccents() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX / W - 0.5) * 2
      const dy = (e.clientY / H - 0.5) * 2
      gsap.to(el, {
        x: dx * 28,
        y: dy * 18,
        duration: 2.0,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           '12%',
        right:         '8%',
        pointerEvents: 'none',
        zIndex:        0,
        willChange:    'transform',
      }}
    >
      {/* Scattered dot cluster */}
      {[
        { top: '0px',   left: '0px',  size: 3, opacity: 0.35 },
        { top: '22px',  left: '48px', size: 2, opacity: 0.18 },
        { top: '48px',  left: '12px', size: 4, opacity: 0.28 },
        { top: '8px',   left: '80px', size: 2, opacity: 0.14 },
        { top: '64px',  left: '56px', size: 3, opacity: 0.22 },
      ].map((d, i) => (
        <span key={i} style={{
          position:     'absolute',
          top:          d.top,
          left:         d.left,
          width:        `${d.size}px`,
          height:       `${d.size}px`,
          borderRadius: '50%',
          background:   'rgba(71,49,152,0.9)',
          opacity:      d.opacity,
        }} />
      ))}
    </div>
  )
}

// ── Stat item — used in hero strip ────────────────────────────────────────────
function StatItem({ num, label, isLast }) {
  return (
    <div style={{
      flex:        '1 1 100px',
      padding:     '0 2rem 0 0',
      borderRight: !isLast ? '1px solid var(--border)' : 'none',
      marginRight: !isLast ? '2rem' : '0',
    }}>
      <span style={{
        display:       'block',
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight:    600,
        letterSpacing: '-0.04em',
        lineHeight:    1,
        color:         'var(--text)',
        marginBottom:  '0.4rem',
      }}>
        {num}
      </span>
      <span style={{
        display:       'block',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.55rem',
        color:         'var(--ghost)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight:    1.5,
        whiteSpace:    'pre-line',
      }}>
        {label}
      </span>
    </div>
  )
}

export default function ContactPage() {
  const titleRef   = useRef(null)
  const subRef     = useRef(null)
  const statsRef   = useRef(null)

  // Entrance animations — mirrors HeroSection approach
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    const lines = titleRef.current?.querySelectorAll('.contact-line-inner')
    if (lines?.length) {
      tl.fromTo(lines,
        { y: '110%', skewY: 3 },
        { y: '0%', skewY: 0, duration: 1.0, ease: 'expo.out', stagger: 0.1 },
      )
    }

    if (subRef.current) {
      tl.fromTo(subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.55'
      )
    }

    if (statsRef.current) {
      tl.fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
        '-=0.4'
      )
    }
  }, [])

  return (
    <PageWrapper>
      <SEO title={META.contact.title} description={META.contact.description} />

      {/* ── 01 HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(5rem, 9vw, 9rem) 2.5rem clamp(3rem, 5vw, 5rem)',
        position:   'relative',
        overflow:   'hidden',
        background: 'var(--bg-base)',
      }}>
        <SceneBackground
          gridSize={72}
          gridOpacity={0.11}
          glow1Color="rgba(71,49,152,0.20)"
          glow2Color="rgba(71,49,152,0.10)"
          glow1Pos={{ top: '-10%', right: '-5%' }}
          glow2Pos={{ bottom: '-20%', left: '-12%' }}
          scanLine
          parallaxStrength={0.9}
        />

        {/* Background watermark */}
        <div
          aria-hidden="true"
          style={{
            position:         'absolute',
            top:              '-0.2em',
            right:            '-0.08em',
            fontFamily:       'var(--font-display)',
            fontSize:         'clamp(10rem, 28vw, 26rem)',
            fontWeight:       700,
            lineHeight:       1,
            letterSpacing:    '-0.05em',
            color:            'transparent',
            WebkitTextStroke: '1px rgba(71,49,152,0.18)',
            pointerEvents:    'none',
            userSelect:       'none',
            zIndex:           0,
          }}
        >
          03
        </div>

        {/* Floating decorative accents */}
        <FloatingAccents />

        <div style={{
          maxWidth:  '1200px',
          margin:    '0 auto',
          position:  'relative',
          zIndex:    2,
        }}>

          {/* Section label */}
          <SectionLabel index="03" label="Contact" />

          {/* Display title — same split-line reveal as HeroSection */}
          <div
            ref={titleRef}
            style={{ marginBottom: '2.5rem', marginTop: '-1rem' }}
          >
            {/* LET'S */}
            <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
              <div
                className="contact-line-inner"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(4rem, 12vw, 10.5rem)',
                  fontWeight:    700,
                  lineHeight:    0.88,
                  letterSpacing: '-0.04em',
                  color:         'var(--text)',
                  display:       'block',
                  transform:     'translateY(110%)',
                }}
              >
                Let's Build
              </div>
            </div>

            {/* SOMETHING REAL */}
            <div style={{ overflow: 'hidden', lineHeight: 0.88, marginTop: '0.08em' }}>
              <div
                className="contact-line-inner pb-4"
                style={{
                  fontFamily:       'var(--font-mono)',
                  fontSize:         'clamp(4rem, 8vw, 10.5rem)',
                  fontWeight:       300,
                  fontStyle:        'italic',
                  lineHeight:       0.88,
                  letterSpacing:    '-0.04em',
                  color:            'transparent',
                  WebkitTextStroke: '1px rgba(245,245,245,0.35)',
                  display:          'block',
                  transform:        'translateY(110%)',
                  paddingLeft:      'clamp(1rem, 4vw, 5rem)',
                }}
              >
                Something Real.
              </div>
            </div>
          </div>

          {/* Subtext + divider — mirrors HeroSection treatment */}
          <div ref={subRef} style={{ opacity: 0 }}>
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
                flexShrink: 0,
              }} />
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--muted)',
                letterSpacing: '0.08em',
                lineHeight:    1,
              }}>
                Open to freelance
                <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
                Collaboration
                <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
                Full-time
                <span style={{ color: 'var(--ghost)', margin: '0 0.6rem' }}>·</span>
                New Delhi, IST
              </p>
            </div>
          </div>

          {/* Stats strip — mirrors HeroStats */}
          <div
            ref={statsRef}
            style={{
              display:    'flex',
              flexWrap:   'wrap',
              paddingTop: '2rem',
              marginTop:  '1rem',
              position:   'relative',
              gap:        '0',
              opacity:    0,
            }}
          >
            {/* Gradient rule */}
            <div style={{
              position:   'absolute',
              top:        0,
              left:       0,
              right:      0,
              height:     '1px',
              background: 'linear-gradient(90deg, transparent, var(--border) 25%, rgba(71,49,152,0.5) 50%, var(--border) 75%, transparent)',
            }} />
            <StatItem num="24h"  label={'Response\nTime'}      />
            <StatItem num="IST"  label={'Timezone\nUTC+5:30'}  />
            <StatItem num="6+"   label={'Projects\nCompleted'}  />
            <StatItem num="Open" label={'Available\nRight Now'} isLast />
          </div>
        </div>
      </section>

      {/* ── 02 FORM + LINKS ──────────────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(4rem, 7vw, 7rem) 2.5rem',
        background: 'var(--bg-1)',
        borderTop:  '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Subtle glow accent — right side */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '10%',
            right:         '-8%',
            width:         '45vw',
            height:        '45vw',
            background:    'radial-gradient(ellipse, rgba(71,49,152,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex:        0,
          }}
        />

        <div style={{
          maxWidth:  '1200px',
          margin:    '0 auto',
          position:  'relative',
          zIndex:    1,
        }}>
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 'clamp(3rem, 6vw, 7rem)',
              alignItems:          'start',
            }}
            className="contact-grid"
          >
            <ContactForm />
            <ContactLinks />
          </div>
        </div>
      </section>

      {/* ── 03 CLOSING STRIP ─────────────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(3rem, 5vw, 5rem) 2.5rem',
        background: 'var(--bg-base)',
        borderTop:  '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Top gradient rule */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '1px',
          background: 'linear-gradient(90deg, transparent, rgba(71,49,152,0.4) 50%, transparent)',
          pointerEvents:'none',
        }} />

        <div style={{
          maxWidth:       '1200px',
          margin:         '0 auto',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            '1.5rem',
        }}>
          <div data-gsap="fade-up">
            <p style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.2rem, 2.5vw, 1.75rem)',
              fontWeight:    600,
              letterSpacing: '-0.02em',
              lineHeight:    1.1,
              color:         'var(--text)',
              marginBottom:  '0.35rem',
            }}>
              Prefer direct contact?
            </p>
            <a
              href={`mailto:${SITE.email}`}
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--muted)',
                textDecoration:'none',
                letterSpacing: '0.02em',
                transition:    'color 0.2s ease',
                borderBottom:  '1px solid var(--border)',
                paddingBottom: '2px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {SITE.email} →
            </a>
          </div>

          <div data-gsap="fade-up" style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { label: 'GitHub',   href: SITE.github   },
              { label: 'LinkedIn', href: SITE.linkedin  },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         'var(--ghost)',
                  textDecoration:'none',
                  border:        '1px solid var(--border)',
                  padding:       '0.5rem 1rem',
                  transition:    'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.borderColor = 'var(--muted)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--ghost)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}