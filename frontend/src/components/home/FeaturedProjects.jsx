/**
 * FeaturedProjects.jsx
 *
 * Homepage section — top 3 featured projects.
 * Each row now shows a small cover thumbnail from the project's screenshot folder.
 * All content from the original is preserved; thumbnails are purely additive.
 */

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@data/projects'
import { useProjectAssets } from '@hooks/useProjectAssets'
import SectionLabel from '@components/ui/SectionLabel'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'
import SceneBackground from '@components/layout/SceneBackground'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = PROJECTS.slice(0, 3)

// ─── Thumbnail ───────────────────────────────────────────────────────────────
function ProjectThumbnail({ slug, accentColor, hovered }) {
  const { screenshots } = useProjectAssets(slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)
  const accent = accentColor ?? 'rgba(71,49,152,0.15)'

  return (
    <div style={{
      width:        '120px',
      height:       '72px',
      flexShrink:   0,
      overflow:     'hidden',
      background:   'var(--bg-3)',
      border:       `1px solid ${hovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)'}`,
      position:     'relative',
      transition:   'border-color 0.3s ease',
    }}>
      {cover && !imgError ? (
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          onError={() => setImgError(true)}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            objectPosition: 'top center',
            display:    'block',
            filter:     hovered
              ? 'brightness(0.8) saturate(0.85)'
              : 'brightness(0.55) saturate(0.7)',
            transform:  hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'filter 0.4s ease, transform 0.55s cubic-bezier(0.19,1,0.22,1)',
          }}
        />
      ) : (
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `radial-gradient(ellipse at center, ${accent} 0%, transparent 80%)`,
        }} />
      )}
      {/* Bottom gradient fade */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(180deg, transparent 30%, rgba(8,8,8,0.6) 100%)',
        pointerEvents:'none',
      }} />
    </div>
  )
}

// ─── Single Project Row ───────────────────────────────────────────────────────
function ProjectRow({ project }) {
  const rowRef  = useRef(null)
  const glowRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mouseLocal, setMouseLocal] = useState({ x: 0.5, y: 0.5 })

  const onMouseMove = (e) => {
    const rect = rowRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setMouseLocal({ x, y })
    gsap.to(rowRef.current, {
      rotateX: (y - 0.5) * -5,
      rotateY: (x - 0.5) *  5,
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
      duration: 0.65, ease: 'expo.out',
    })
  }

  const accent = project.accentColor ?? 'rgba(71,49,152,0.15)'

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
          gridTemplateColumns: '3.5rem auto 1fr auto',
          gap:                 '1.75rem',
          alignItems:          'center',
          padding:             '1.75rem 2rem',
          marginBottom:        '1px',
          background:          hovered
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.012)',
          border:              `1px solid ${hovered
            ? 'rgba(255,255,255,0.09)'
            : 'rgba(255,255,255,0.04)'}`,
          borderRadius:        '16px',
          cursor:              'none',
          textDecoration:      'none',
          position:            'relative',
          overflow:            'hidden',
          transition:          'background 0.35s ease, border-color 0.35s ease',
          backdropFilter:      hovered ? 'blur(8px)' : 'blur(2px)',
          transformStyle:      'preserve-3d',
          willChange:          'transform',
          boxShadow:           hovered
            ? `0 24px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${accent}`
            : '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Radial glow */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position:      'absolute',
            width:         '280px',
            height:        '280px',
            borderRadius:  '50%',
            background:    `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
            transform:     'translate(-50%,-50%)',
            pointerEvents: 'none',
            opacity:       hovered ? 1 : 0,
            transition:    'opacity 0.3s ease',
            zIndex:        0,
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
            right:      '8%',
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            zIndex:     0,
          }} />
        )}

        {/* Number */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         hovered ? 'rgba(255,255,255,0.22)' : 'var(--ghost)',
          letterSpacing: '0.08em',
          transition:    'color 0.3s ease',
          position:      'relative',
          zIndex:        1,
          transform:     'translateZ(8px)',
        }}>
          {project.id}
        </span>

        {/* Thumbnail */}
        <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(10px)' }}>
          <ProjectThumbnail
            slug={project.slug}
            accentColor={project.accentColor}
            hovered={hovered}
          />
        </div>

        {/* Body */}
        <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(12px)' }}>
          {/* Tags */}
          <div style={{
            display:      'flex',
            flexWrap:     'wrap',
            gap:          '0.32rem',
            marginBottom: '0.7rem',
          }}>
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
            marginBottom:  '0.55rem',
            transition:    'color 0.25s ease',
            textShadow:    hovered
              ? '0 0 40px rgba(255,255,255,0.1)'
              : 'none',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.7rem',
            color:      'var(--muted)',
            lineHeight: 1.85,
            maxWidth:   '480px',
          }}>
            {project.tagline}
          </p>

          <div style={{
            display:    'flex',
            gap:        '0.5rem',
            marginTop:  '0.85rem',
            alignItems: 'center',
          }}>
            <Tag variant={project.status === 'Live' ? 'indigo' : 'ghost'}>
              {project.status}
            </Tag>
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
          position:   'relative',
          zIndex:     1,
          transform:  `translateZ(16px) rotate(${hovered ? '0' : '-45'}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.19,1,0.22,1)',
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
      borderTop:  '1px solid rgba(255,255,255,0.035)',
    }}>
      <SceneBackground
        gridOpacity={0.09}
        glow1Color="rgba(255,255,255,0.025)"
        glow2Color="rgba(71,49,152,0.06)"
        glow1Pos={{ top: '10%', right: '30%' }}
        glow2Pos={{ bottom: '-5%', left: '-5%' }}
        parallaxStrength={0.6}
      />

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
            <SectionLabel index="02" label="Selected Work" />
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