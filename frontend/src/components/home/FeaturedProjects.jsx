/**
 * FeaturedProjects.jsx — Fully Responsive
 *
 * Desktop: unchanged — full-bleed cover image, 3-col grid, 3D tilt
 * Tablet:  cover image shrinks, text stacks gracefully
 * Mobile:  single-column cards, no cover image overlap, no 3D tilt
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

// ─── Interactive parallax white radial glow ───────────────────────────────────
function ParallaxGlow() {
  const glow1 = useRef(null)
  const glow2 = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX / W - 0.5) * 2
      const dy = (e.clientY / H - 0.5) * 2

      if (glow1.current) {
        gsap.to(glow1.current, { x: dx * 60, y: dy * 40, duration: 1.8, ease: 'power2.out' })
      }
      if (glow2.current) {
        gsap.to(glow2.current, { x: dx * -40, y: dy * -28, duration: 2.2, ease: 'power2.out' })
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
      <div
        ref={glow1}
        style={{
          position:   'absolute',
          top:        '-20%',
          left:       '-10%',
          width:      '55vw',
          height:     '55vw',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.032) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
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

// ─── Cover Image ─────────────────────────────────────────────────────────────
function CoverImage({ slug, accentColor, hovered, borderRadius }) {
  const { screenshots } = useProjectAssets(slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)
  const accent = accentColor ?? 'rgba(71,49,152,0.25)'

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

// ─── Mobile Card (replaces the row on small screens) ─────────────────────────
function MobileProjectCard({ project }) {
  const { screenshots } = useProjectAssets(project.slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)

  const accent = project.accentColor ?? 'rgba(71,49,152,0.15)'

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
    <Link
      to={`/projects/${project.slug}`}
      style={{
        display:        'flex',
        flexDirection:  'column',
        background:     'rgba(255,255,255,0.014)',
        border:         '1px solid rgba(255,255,255,0.045)',
        borderRadius:   '12px',
        textDecoration: 'none',
        overflow:       'hidden',
        position:       'relative',
      }}
    >
      {/* Thumbnail */}
      {cover && !imgError ? (
        <div style={{
          width:       '100%',
          aspectRatio: '16/9',
          overflow:    'hidden',
          flexShrink:  0,
          background:  'var(--bg-2)',
        }}>
          <img
            src={cover}
            alt={`${project.title} preview`}
            onError={() => setImgError(true)}
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'top center',
              display:        'block',
              filter:         'brightness(0.65) saturate(0.85)',
            }}
          />
          <div style={{
            position:   'absolute',
            top:        0,
            left:       0,
            right:      0,
            height:     '45%',
            background: 'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.5) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      ) : (
        <div style={{
          width:       '100%',
          aspectRatio: '16/9',
          background:  `linear-gradient(135deg, ${accent} 0%, rgba(8,8,8,0) 100%)`,
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          flexShrink:  0,
        }}>
          <span style={{
            fontFamily:       'var(--font-display)',
            fontSize:         '5rem',
            fontWeight:       700,
            color:            'transparent',
            WebkitTextStroke: '1px rgba(245,245,245,0.06)',
          }}>
            {project.id}
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {project.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.4rem, 6vw, 1.9rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    0.95,
          color:         'var(--text)',
        }}>
          {project.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.68rem',
          color:      'var(--muted)',
          lineHeight: 1.75,
        }}>
          {project.tagline}
        </p>

        {/* Footer */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          paddingTop:     '0.75rem',
          borderTop:      '1px solid var(--border)',
          marginTop:      '0.25rem',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.9rem',
            color:      'var(--muted)',
          }}>
            ↗
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Desktop Project Row ─────────────────────────────────────────────────────
function ProjectRow({ project }) {
  const rowRef  = useRef(null)
  const glowRef = useRef(null)
  const [hovered,    setHovered]    = useState(false)
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
          gridTemplateColumns: '3.5rem 1fr 0px',
          gap:                 '0 1.75rem',
          alignItems:          'center',
          padding:             '2rem 2.25rem 2rem 2rem',
          paddingRight:        'calc(38% + 2.25rem)',
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
        <CoverImage
          slug={project.slug}
          accentColor={project.accentColor}
          hovered={hovered}
          borderRadius={CARD_RADIUS}
        />

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

        {hovered && (
          <div aria-hidden="true" style={{
            position:      'absolute',
            top:           0,
            left:          '8%',
            right:         '38%',
            height:        '1px',
            background:    'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            zIndex:        1,
            pointerEvents: 'none',
          }} />
        )}

        {/* Number */}
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

        {/* Body */}
        <div style={{ position: 'relative', zIndex: 3, transform: 'translateZ(12px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.32rem', marginBottom: '0.65rem' }}>
            {project.tags.slice(0, 4).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

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

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.7rem',
            color:      'var(--muted)',
            lineHeight: 1.85,
            maxWidth:   '420px',
          }}>
            {project.tagline}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem', alignItems: 'center' }}>
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

        {/* Arrow */}
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

        {/* ── Desktop rows (hidden on mobile) ── */}
        <div className="featured-desktop-rows" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {FEATURED.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>

        {/* ── Mobile cards (hidden on desktop) ── */}
        <div className="featured-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
          {FEATURED.map((project) => (
            <MobileProjectCard key={project.slug} project={project} />
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

      <style>{`
        /* Mobile: show cards, hide rows; tighten padding */
        @media (max-width: 767px) {
          .featured-desktop-rows { display: none !important; }
          .featured-mobile-cards { display: flex !important; }

          section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }

        /* Tablet: show rows but reduce cover image */
        @media (min-width: 768px) and (max-width: 1023px) {
          .featured-desktop-rows { display: flex !important; }
          .featured-mobile-cards { display: none !important; }
        }
      `}</style>
    </section>
  )
}