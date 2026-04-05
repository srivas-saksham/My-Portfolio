/**
 * ProjectCard.jsx
 *
 * Grid card for the projects overview page.
 * Primary visual: first screenshot from the project's asset folder.
 * Falls back to a styled placeholder if no screenshots are present.
 *
 * All project data comes from props — nothing hardcoded.
 */

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'
import { useProjectAssets } from '@hooks/useProjectAssets'

// ─── Image placeholder ───────────────────────────────────────────────────────
function CardImagePlaceholder({ project }) {
  return (
    <div
      style={{
        position:   'absolute',
        inset:      0,
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${project.accentColor ?? 'rgba(71,49,152,0.15)'} 0%, rgba(8,8,8,0) 100%)`,
      }}
    >
      {/* Watermark index */}
      <span style={{
        fontFamily:       'var(--font-display)',
        fontSize:         'clamp(5rem, 12vw, 9rem)',
        fontWeight:       700,
        letterSpacing:    '-0.05em',
        color:            'transparent',
        WebkitTextStroke: '1px rgba(245,245,245,0.06)',
        userSelect:       'none',
        lineHeight:       1,
      }}>
        {project.id}
      </span>
    </div>
  )
}

// ─── Main card ───────────────────────────────────────────────────────────────
export default function ProjectCard({ project, index = 0 }) {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const { screenshots } = useProjectAssets(project.slug)
  const coverImage = screenshots[0]?.url ?? null

  // ── 3-D tilt
  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    const rotX = (y - 0.5) * -7
    const rotY = (x - 0.5) *  7
    cardRef.current.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`
    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`
      glowRef.current.style.top  = `${y * 100}%`
    }
  }

  const onMouseLeave = () => {
    setHovered(false)
    cardRef.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  const accent = project.accentColor ?? 'rgba(71,49,152,0.15)'

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.slug}`}
      data-gsap="fade-up"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        display:        'flex',
        flexDirection:  'column',
        background:     hovered ? 'rgba(255,255,255,0.028)' : 'var(--bg-2)',
        border:         `1px solid ${hovered ? 'rgba(255,255,255,0.09)' : 'var(--border)'}`,
        textDecoration: 'none',
        cursor:         'none',
        position:       'relative',
        overflow:       'hidden',
        transition:     'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow:      hovered
          ? `0 28px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${accent}`
          : '0 2px 12px rgba(0,0,0,0.18)',
        willChange:     'transform',
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* ── Mouse-following radial glow ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position:      'absolute',
          width:         '220px',
          height:        '220px',
          borderRadius:  '50%',
          background:    `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
          transform:     'translate(-50%,-50%)',
          pointerEvents: 'none',
          opacity:       hovered ? 1 : 0,
          transition:    'opacity 0.3s ease',
          zIndex:        0,
        }}
      />

      {/* ── Left accent strip ── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0,
          left:       0,
          width:      '2px',
          height:     hovered ? '100%' : '0%',
          background: `linear-gradient(180deg, transparent 0%, ${accent.replace('0.', '0.8').replace('rgba(', 'rgba(').replace(/,[^,)]+\)/, ', 0.7)')} 50%, transparent 100%)`,
          transition: 'height 0.55s cubic-bezier(0.19,1,0.22,1)',
          zIndex:     1,
        }}
      />

      {/* ── Screenshot hero image ── */}
      <div style={{
        position:   'relative',
        width:      '100%',
        aspectRatio:'16/9',
        overflow:   'hidden',
        background: 'var(--bg-3)',
        flexShrink: 0,
      }}>
        {coverImage && !imgError ? (
          <>
            <img
              src={coverImage}
              alt={`${project.title} screenshot`}
              onError={() => setImgError(true)}
              style={{
                width:      '100%',
                height:     '100%',
                objectFit:  'cover',
                objectPosition: 'top center',
                display:    'block',
                transition: 'transform 0.55s cubic-bezier(0.19,1,0.22,1), filter 0.35s ease',
                transform:  hovered ? 'scale(1.04)' : 'scale(1)',
                filter:     hovered ? 'brightness(0.85)' : 'brightness(0.72) saturate(0.9)',
              }}
            />
            {/* Overlay gradient — always present, intensifies on hover */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: `linear-gradient(
                180deg,
                transparent 0%,
                rgba(8,8,8,0.2) 60%,
                rgba(8,8,8,0.85) 100%
              )`,
              transition: 'opacity 0.3s ease',
            }} />
            {/* Hover: accent wash */}
            {hovered && (
              <div style={{
                position:   'absolute',
                inset:      0,
                background: accent,
                mixBlendMode:'multiply',
                transition: 'opacity 0.3s ease',
              }} />
            )}
          </>
        ) : (
          <CardImagePlaceholder project={project} />
        )}

        {/* Screenshot count badge */}
        {screenshots.length > 1 && (
          <div style={{
            position:      'absolute',
            bottom:        '0.65rem',
            right:         '0.65rem',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.52rem',
            color:         'rgba(245,245,245,0.55)',
            letterSpacing: '0.08em',
            background:    'rgba(8,8,8,0.6)',
            padding:       '0.25rem 0.55rem',
            backdropFilter:'blur(8px)',
            borderRadius:  '2px',
            border:        '1px solid rgba(255,255,255,0.06)',
          }}>
            +{screenshots.length - 1} screenshots
          </div>
        )}

        {/* Project ID watermark on image */}
        <div style={{
          position:      'absolute',
          top:           '0.75rem',
          left:          '0.75rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          color:         'rgba(245,245,245,0.4)',
          letterSpacing: '0.12em',
          zIndex:        2,
        }}>
          {project.id}
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{
        position:      'relative',
        zIndex:        1,
        display:       'flex',
        flexDirection: 'column',
        flex:          1,
        padding:       '1.5rem',
        gap:           '0',
      }}>

        {/* Tags row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.9rem' }}>
          {project.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.tags.length > 3 && (
            <Tag variant="ghost">+{project.tags.length - 3}</Tag>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.35rem, 2.2vw, 1.7rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color:         'var(--text)',
          marginBottom:  '0.65rem',
          transition:    'color 0.25s ease',
        }}>
          {project.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.68rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          flex:       1,
          marginBottom:'1.25rem',
        }}>
          {project.tagline}
        </p>

        {/* Footer */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          paddingTop:     '1rem',
          borderTop:      `1px solid ${hovered ? 'rgba(255,255,255,0.07)' : 'var(--border)'}`,
          transition:     'border-color 0.3s ease',
        }}>
          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
            <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
              {project.status}
            </Tag>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.57rem',
              color:         'var(--ghost)',
              letterSpacing: '0.06em',
            }}>
              {project.year}
            </span>
          </div>

          <span style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.9rem',
            color:       hovered ? 'var(--text)' : 'var(--ghost)',
            transform:   hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
            transition:  'transform 0.3s ease, color 0.25s ease',
            display:     'inline-block',
          }}>
            ↗
          </span>
        </div>
      </div>
    </Link>
  )
}