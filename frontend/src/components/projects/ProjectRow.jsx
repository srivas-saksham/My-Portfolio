/**
 * ProjectRow.jsx — Fully Responsive
 *
 * Desktop: unchanged — horizontal grid with cover image bleeding from right,
 *          left accent strip, 3D-style hover transitions
 * Tablet:  same layout but cover image reduced, padding tightened
 * Mobile:  card-style layout — cover image becomes a top thumbnail strip,
 *          content stacks vertically below it, no complex tilt/parallax
 *
 * Key insight: on mobile the cover-image approach (absolute positioned,
 * bleeding from the right) breaks because there isn't enough horizontal
 * space. We switch to a top-thumbnail + body-below layout.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'
import ProjectTagList from './ProjectTagList'
import { useProjectAssets } from '@hooks/useProjectAssets'

// ─── Cover image (desktop/tablet) ─────────────────────────────────────────────
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

// ─── Mobile thumbnail (replaces absolute cover image on small screens) ─────────
function MobileThumbnail({ slug, accentColor }) {
  const { screenshots } = useProjectAssets(slug)
  const cover = screenshots[0]?.url ?? null
  const [imgError, setImgError] = useState(false)
  const accent = accentColor ?? 'rgba(71,49,152,0.15)'

  return (
    <div style={{
      width:       '100%',
      aspectRatio: '16/9',
      overflow:    'hidden',
      background:  'var(--bg-2)',
      flexShrink:  0,
      position:    'relative',
    }}>
      {cover && !imgError ? (
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          onError={() => setImgError(true)}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top center',
            display:        'block',
            filter:         'brightness(0.55) saturate(0.75)',
          }}
        />
      ) : (
        <div style={{
          width:      '100%',
          height:     '100%',
          background: `linear-gradient(135deg, ${accent} 0%, rgba(8,8,8,0) 100%)`,
        }} />
      )}
      {/* Bottom fade into card body */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     '50%',
        background: 'linear-gradient(transparent, rgba(8,8,8,0.85))',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────
export default function ProjectRow({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {/* ── Desktop / Tablet layout ── */}
      <Link
        to={`/projects/${project.slug}`}
        data-cursor
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="project-row-desktop"
        style={{
          display:             'grid',
          gridTemplateColumns: '3.5rem 1fr auto',
          gap:                 '2rem',
          alignItems:          'start',
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

      {/* ── Mobile layout ── */}
      <Link
        to={`/projects/${project.slug}`}
        className="project-row-mobile"
        style={{
          display:        'flex',
          flexDirection:  'column',
          background:     'rgba(255,255,255,0.014)',
          border:         '1px solid rgba(255,255,255,0.045)',
          borderRadius:   '12px',
          textDecoration: 'none',
          overflow:       'hidden',
          position:       'relative',
          marginBottom:   '0.75rem',
        }}
      >
        {/* Thumbnail */}
        <MobileThumbnail slug={project.slug} accentColor={project.accentColor} />

        {/* Content */}
        <div style={{
          padding:       '1.25rem',
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.55rem',
        }}>
          {/* Index + year row */}
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '0.6rem',
            marginBottom:'0.1rem',
          }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.75rem',
              color:         'var(--indigo)',
              letterSpacing: '0.08em',
            }}>
              {project.id}
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              color:         'var(--ghost)',
              letterSpacing: '0.06em',
            }}>
              · {project.year}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            <ProjectTagList tags={project.tags} limit={3} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.5rem, 6vw, 2rem)',
            fontWeight:    600,
            letterSpacing: '-0.03em',
            lineHeight:    1,
            color:         'var(--text)',
          }}>
            {project.title}
          </h2>

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
            paddingTop:     '0.85rem',
            borderTop:      '1px solid var(--border)',
            marginTop:      '0.25rem',
          }}>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
                {project.status}
              </Tag>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.85rem',
              color:      'var(--muted)',
            }}>
              ↗
            </span>
          </div>
        </div>
      </Link>

      <style>{`
        /* Desktop: show row, hide mobile card */
        .project-row-desktop { display: grid !important; }
        .project-row-mobile  { display: none !important; }

        /* Mobile: hide row, show card */
        @media (max-width: 639px) {
          .project-row-desktop { display: none !important; }
          .project-row-mobile  { display: flex !important; }
        }

        /* Tablet: show desktop row but tighten padding */
        @media (min-width: 640px) and (max-width: 1023px) {
          .project-row-desktop {
            padding-right: calc(30% + 1.5rem) !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </>
  )
}