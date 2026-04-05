import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'
import ProjectTagList from './ProjectTagList'
import { useProjectAssets } from '@hooks/useProjectAssets'

/**
 * ProjectRow
 * Single horizontal project row for the full list on /projects.
 *
 * Changes vs original:
 *  1. Cover image (right-aligned, CSS mask fade) — same pattern as FeaturedProjects.
 *  2. Hover transitions slowed to 0.55s expo-out throughout.
 *  3. data-gsap="fade-up" removed from the root Link.
 *     That attribute makes animations.css set opacity:0 / translateY(40px) on
 *     the element. PageWrapper's GSAP ScrollTrigger only fires once on mount —
 *     it never re-runs when filters or layout toggle cause a re-render, so every
 *     new item stays invisible. The entrance animation for the whole section is
 *     handled by the parent section's data-gsap wrapper in ProjectsPage instead.
 *
 * Props:
 *   project  — project data object
 *   index    — numeric position (0-based); first item gets a top border
 */

// ─── Cover image ──────────────────────────────────────────────────────────────
function CoverImage({ slug, accentColor, hovered }) {
  const { screenshots } = useProjectAssets(slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)
  const accent = accentColor ?? 'rgba(71,49,152,0.18)'

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
    <div style={{
      position:      'absolute',
      top:           0,
      right:         0,
      width:         '36%',
      height:        '100%',
      overflow:      'hidden',
      zIndex:        0,
      pointerEvents: 'none',
    }}>
      {cover && !imgError ? (
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          onError={() => setImgError(true)}
          style={{
            width:           '100%',
            height:          '100%',
            objectFit:       'cover',
            objectPosition:  'top center',
            display:         'block',
            maskImage,
            WebkitMaskImage: maskImage,
            maskRepeat:         'no-repeat',
            WebkitMaskRepeat:   'no-repeat',
            maskSize:           '100% 100%',
            WebkitMaskSize:     '100% 100%',
            filter:          hovered
              ? 'brightness(0.75) saturate(0.88)'
              : 'brightness(0.38) saturate(0.6)',
            transform:       hovered ? 'scale(1.04)' : 'scale(1.02)',
            transition:      'filter 0.65s ease, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
          }}
        />
      ) : (
        <div style={{
          width:           '100%',
          height:          '100%',
          maskImage,
          WebkitMaskImage: maskImage,
          background:      `radial-gradient(ellipse at 70% 50%, ${accent} 0%, transparent 70%)`,
        }} />
      )}

      {/* Accent wash on hover */}
      <div style={{
        position:        'absolute',
        inset:           0,
        background:      accent,
        mixBlendMode:    'multiply',
        maskImage,
        WebkitMaskImage: maskImage,
        opacity:         hovered ? 0.28 : 0,
        transition:      'opacity 0.55s ease',
        zIndex:          1,
        pointerEvents:   'none',
      }} />
    </div>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────
export default function ProjectRow({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/projects/${project.slug}`}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:             'grid',
        gridTemplateColumns: '3.5rem 1fr auto',
        gap:                 '2rem',
        alignItems:          'start',
        // right padding keeps text clear of the cover image
        padding:             `2rem ${hovered ? '1.75rem' : '1rem'}`,
        paddingLeft:         hovered ? '1.75rem' : '1rem',
        paddingRight:        'calc(34% + 2.5rem)',
        borderBottom:        '1px solid var(--border)',
        borderTop:           index === 0 ? '1px solid var(--border)' : 'none',
        borderLeft:          `2px solid ${hovered ? 'var(--indigo)' : 'transparent'}`,
        background:          hovered ? 'rgba(71,49,152,0.04)' : 'transparent',
        cursor:              'none',
        textDecoration:      'none',
        position:            'relative',
        overflow:            'hidden',
        // No opacity/transform here — avoids GSAP conflict on re-render
        transition:          'background 0.55s cubic-bezier(0.19,1,0.22,1), border-color 0.55s cubic-bezier(0.19,1,0.22,1), padding 0.55s cubic-bezier(0.19,1,0.22,1)',
      }}
    >
      <CoverImage slug={project.slug} accentColor={project.accentColor} hovered={hovered} />

      {/* Index */}
      <div style={{ paddingTop: '0.2rem', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '1.15rem',
          color:         hovered ? 'var(--indigo)' : 'var(--ghost)',
          letterSpacing: '0.06em',
          display:       'block',
          marginBottom:  '0.35rem',
          transition:    'color 0.45s ease',
          lineHeight:    1,
        }}>
          {project.id}
        </span>
        <div style={{
          width:      '16px',
          height:     '1px',
          background: hovered ? 'var(--indigo)' : 'var(--border)',
          transition: 'background 0.45s ease',
        }} />
      </div>

      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display:      'flex',
          flexWrap:     'wrap',
          gap:          '0.35rem',
          marginBottom: '0.85rem',
          alignItems:   'center',
        }}>
          <ProjectTagList tags={project.tags} />
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.4rem, 2.8vw, 2.2rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color:         'var(--text)',
          marginBottom:  '0.6rem',
        }}>
          {project.title}
        </h2>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          maxWidth:   '520px',
        }}>
          {project.tagline}
        </p>

        <div style={{
          marginTop:  '1rem',
          display:    'flex',
          gap:        '0.5rem',
          flexWrap:   'wrap',
          alignItems: 'center',
        }}>
          <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
            {project.status}
          </Tag>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            color:         'var(--ghost)',
            letterSpacing: '0.04em',
          }}>
            {project.stack.join(' · ')}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <span style={{
        fontFamily:  'var(--font-mono)',
        fontSize:    '1rem',
        color:       hovered ? 'var(--text)' : 'var(--ghost)',
        paddingTop:  '0.2rem',
        display:     'inline-block',
        position:    'relative',
        zIndex:      1,
        transform:   hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
        transition:  'color 0.45s ease, transform 0.55s cubic-bezier(0.19,1,0.22,1)',
      }}>
        ↗
      </span>
    </Link>
  )
}