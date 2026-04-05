/**
 * FeaturedProjects.jsx
 *
 * Homepage section — top 3 featured projects.
 *
 * Design decisions:
 *   - Cover image is full-bleed right column: fills the row from top-right to
 *     bottom-right corner, clipped by the card's border-radius.
 *   - No grid / SceneBackground — replaced with a single interactive parallax
 *     white radial gradient that follows the mouse.
 *   - "Live" status tag uses green border treatment (matching /projects row).
 *   - All existing hover interactions, 3-D tilt, glow, tag, arrow — preserved.
 */

import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@data/projects'
import { useProjectAssets } from '@hooks/useProjectAssets'
import SectionLabel from '@components/ui/SectionLabel'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = PROJECTS.slice(0, 3)

// ─── Interactive parallax white radial glow ──────────────────────────────────
function ParallaxGlow() {
  const glow1 = useRef(null)
  const glow2 = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX / W - 0.5) * 2
      const dy = (e.clientY / H - 0.5) * 2

      if (glow1.current) {
        gsap.to(glow1.current, {
          x: dx * 60,
          y: dy * 40,
          duration: 1.8,
          ease: 'power2.out',
        })
      }
      if (glow2.current) {
        gsap.to(glow2.current, {
          x: dx * -40,
          y: dy * -28,
          duration: 2.2,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    >
      {/* Primary white radial — top-left */}
      <div
        ref={glow1}
        style={{
          position:   'absolute',
          top:        '-20%',
          left:      '-10%',
          width:      '55vw',
          height:     '55vw',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.032) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
      {/* Secondary white radial — bottom-left */}
      <div
        ref={glow2}
        style={{
          position:   'absolute',
          bottom:     '-15%',
          left:       '-8%',
          width:      '40vw',
          height:     '40vw',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.018) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

// ─── Cover image — right-aligned full-bleed ───────────────────────────────────
// The image itself is masked via CSS mask-image so its left edge fades to
// transparent naturally — no colour overlay, no gradient div.
// The mask is a linear-gradient on the alpha channel:
//   transparent 0% → black (fully opaque) ~42%
// "black" in a mask means keep the pixel; "transparent" means discard it.
function CoverImage({ slug, accentColor, hovered, borderRadius }) {
  const { screenshots } = useProjectAssets(slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)
  const accent = accentColor ?? 'rgba(71,49,152,0.25)'

  // Smooth perceptual ramp — eased stops so the fade feels natural
  const maskImage = `linear-gradient(
    90deg,
    transparent        0%,
    rgba(0,0,0,0.06)  12%,
    rgba(0,0,0,0.28)  26%,
    rgba(0,0,0,0.62)  40%,
    rgba(0,0,0,0.88)  54%,
    black             68%
  )`

  return (
    <div
      style={{
        position:     'absolute',
        top:          0,
        right:        0,
        width:        '40%',
        height:       '100%',
        overflow:     'hidden',
        borderRadius: `0 ${borderRadius} ${borderRadius} 0`,
        zIndex:       0,
        pointerEvents:'none',
      }}
    >
      {cover && !imgError ? (
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          onError={() => setImgError(true)}
          style={{
            width:              '100%',
            height:             '100%',
            objectFit:          'cover',
            objectPosition:     'top center',
            display:            'block',
            // Alpha-channel mask — fades the image itself, touches nothing else
            maskImage,
            WebkitMaskImage:    maskImage,
            maskRepeat:         'no-repeat',
            WebkitMaskRepeat:   'no-repeat',
            maskSize:           '100% 100%',
            WebkitMaskSize:     '100% 100%',
            filter:             hovered
              ? 'brightness(0.8) saturate(0.92)'
              : 'brightness(0.44) saturate(0.68)',
            transform:          hovered ? 'scale(1.05)' : 'scale(1.02)',
            transition:         'filter 0.5s ease, transform 0.75s cubic-bezier(0.19,1,0.22,1)',
          }}
        />
      ) : (
        <div
          style={{
            width:           '100%',
            height:          '100%',
            maskImage,
            WebkitMaskImage: maskImage,
            background:      `radial-gradient(ellipse at 70% 50%, ${accent} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Accent wash on hover — also masked so it respects the fade edge */}
      <div
        style={{
          position:        'absolute',
          inset:           0,
          background:      accent,
          mixBlendMode:    'multiply',
          maskImage,
          WebkitMaskImage: maskImage,
          opacity:         hovered ? 0.32 : 0,
          transition:      'opacity 0.45s ease',
          zIndex:          1,
          pointerEvents:   'none',
        }}
      />
    </div>
  )
}

// ─── Single Project Row ───────────────────────────────────────────────────────
function ProjectRow({ project }) {
  const rowRef  = useRef(null)
  const glowRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mouseLocal, setMouseLocal] = useState({ x: 0.5, y: 0.5 })

  const CARD_RADIUS = '16px'

  const onMouseMove = (e) => {
    const rect = rowRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setMouseLocal({ x, y })

    gsap.to(rowRef.current, {
      rotateX: (y - 0.5) * -4,
      rotateY: (x - 0.5) *  4,
      duration: 0.45,
      ease: 'power2.out',
      transformStyle: 'preserve-3d',
    })

    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`
      glowRef.current.style.top  = `${y * 100}%`
    }
  }

  const onMouseLeave = () => {
    setHovered(false)
    gsap.to(rowRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: 'expo.out',
    })
  }

  const accent = project.accentColor ?? 'rgba(71,49,152,0.18)'

  // Green "Live" tag — inline style matching ProjectRow.jsx treatment
  const statusTag =
    project.status === 'Live' ? (
      <span style={{
        display:       'inline-flex',
        alignItems:    'center',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.62rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding:       '0.25rem 0.75rem',
        borderRadius:  'var(--radius-pill)',
        whiteSpace:    'nowrap',
        lineHeight:    1,
        background:    'rgba(74,222,128,0.08)',
        border:        '1px solid rgba(74,222,128,0.3)',
        color:         '#4ade80',
      }}>
        {project.status}
      </span>
    ) : (
      <Tag variant="ghost">{project.status}</Tag>
    )

  return (
    <div
      data-gsap="fade-up"
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
    >
      <Link
        ref={rowRef}
        to={`/projects/${project.slug}`}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          display:             'grid',
          // 3-col: number | content | spacer for the cover image area
          gridTemplateColumns: '3.5rem 1fr 0px',
          gap:                 '0 1.75rem',
          alignItems:          'center',
          // Generous padding; right padding leaves room for the cover image
          padding:             '2rem 2.25rem 2rem 2rem',
          paddingRight:        'calc(38% + 2.25rem)', // keep text clear of cover
          marginBottom:        '1px',
          background:          hovered
            ? 'rgba(255,255,255,0.034)'
            : 'rgba(255,255,255,0.014)',
          border:              `1px solid ${hovered
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.045)'}`,
          borderRadius:        CARD_RADIUS,
          cursor:              'none',
          textDecoration:      'none',
          position:            'relative',
          overflow:            'hidden',
          transition:          'background 0.35s ease, border-color 0.35s ease',
          backdropFilter:      hovered ? 'blur(8px)' : 'blur(2px)',
          transformStyle:      'preserve-3d',
          willChange:          'transform',
          boxShadow:           hovered
            ? `0 24px 60px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${accent}`
            : '0 2px 12px rgba(0,0,0,0.22)',
          minHeight:           '130px',
        }}
      >
        {/* Cover image — right-aligned, full-bleed */}
        <CoverImage
          slug={project.slug}
          accentColor={project.accentColor}
          hovered={hovered}
          borderRadius={CARD_RADIUS}
        />

        {/* Mouse-following radial glow (text-side only) */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position:      'absolute',
            width:         '260px',
            height:        '260px',
            borderRadius:  '50%',
            background:    `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
            transform:     'translate(-50%,-50%)',
            pointerEvents: 'none',
            opacity:       hovered ? 1 : 0,
            transition:    'opacity 0.3s ease',
            zIndex:        1,
            left:          `${mouseLocal.x * 100}%`,
            top:           `${mouseLocal.y * 100}%`,
          }}
        />

        {/* Top-edge shine */}
        {hovered && (
          <div aria-hidden="true" style={{
            position:   'absolute',
            top:        0,
            left:       '8%',
            right:      '38%', // stop before image
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            zIndex:     1,
            pointerEvents:'none',
          }} />
        )}

        {/* ── Number ── */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          color:         hovered ? 'rgba(255,255,255,0.25)' : 'var(--ghost)',
          letterSpacing: '0.08em',
          transition:    'color 0.3s ease',
          position:      'relative',
          zIndex:        3,
          transform:     'translateZ(8px)',
          alignSelf:     'center',
        }}>
          {project.id}
        </span>

        {/* ── Body ── */}
        <div style={{ position: 'relative', zIndex: 3, transform: 'translateZ(12px)' }}>
          {/* Tags */}
          <div style={{
            display:      'flex',
            flexWrap:     'wrap',
            gap:          '0.32rem',
            marginBottom: '0.65rem',
          }}>
            {project.tags.slice(0, 4).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.4rem, 2.6vw, 2.1rem)',
            fontWeight:    600,
            letterSpacing: '-0.03em',
            lineHeight:    0.95,
            color:         'var(--text)',
            marginBottom:  '0.5rem',
            transition:    'color 0.25s ease',
            textShadow:    hovered ? '0 0 40px rgba(255,255,255,0.1)' : 'none',
          }}>
            {project.title}
          </h3>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.7rem',
            color:      'var(--muted)',
            lineHeight: 1.85,
            maxWidth:   '420px',
          }}>
            {project.tagline}
          </p>

          {/* Status + year */}
          <div style={{
            display:    'flex',
            gap:        '0.5rem',
            marginTop:  '0.8rem',
            alignItems: 'center',
          }}>
            {statusTag}
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.57rem',
              color:         'var(--ghost)',
              letterSpacing: '0.08em',
            }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* ── Arrow ── (overlaid at far right of text area) */}
        <div style={{
          position:   'absolute',
          right:      'calc(38% + 1.25rem)',
          top:        '50%',
          transform:  `translateY(-50%) translateZ(16px) rotate(${hovered ? '0' : '-45'}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.19,1,0.22,1)',
          zIndex:     3,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '1.1rem',
            color:      hovered ? 'var(--text)' : 'var(--ghost)',
            display:    'block',
            transition: 'color 0.25s ease',
          }}>
            ↗
          </span>
        </div>
      </Link>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  return (
    <section style={{
      padding:    'clamp(5rem, 8vw, 9rem) 2.5rem',
      background: 'var(--bg-1)',
      position:   'relative',
      overflow:   'hidden',
      borderTop:  '1px solid rgba(82, 30, 30, 0.04)',
    }}>
      {/* Interactive parallax white radial glow — no grid */}
      <ParallaxGlow />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div
          data-gsap="fade-up"
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '2rem',
            marginBottom:   '3rem',
          }}
        >
          <div>
            <SectionLabel index="02" label="Featured Work" />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.73rem',
              color:      'var(--muted)',
              lineHeight: 1.8,
              maxWidth:   '380px',
              marginTop:  '-1.5rem',
            }}>
              Production projects — AI systems, web platforms, and brand infrastructure.
            </p>
          </div>
          <Button to="/projects" variant="ghost">View All Work →</Button>
        </div>

        {/* Project rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {FEATURED.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-gsap="fade-up"
          style={{
            marginTop:      '3.5rem',
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            gap:            '1.5rem',
          }}
        >
          <div style={{
            flex:       1,
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06))',
            maxWidth:   '200px',
          }} />
          <Button to="/projects" variant="ghost" style={{ fontSize: '0.68rem', letterSpacing: '0.12em' }}>
            All {PROJECTS.length} Projects ↗
          </Button>
          <div style={{
            flex:       1,
            height:     '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)',
            maxWidth:   '200px',
          }} />
        </div>
      </div>
    </section>
  )
}