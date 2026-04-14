/**
 * ProjectCardMini.jsx — Mobile-only 2-column grid card
 *
 * Designed exclusively for the mobile grid view (< 640px).
 * Compact, touch-friendly, visually intentional — not a scaled-down desktop card.
 *
 * Features:
 * - Square-ish aspect ratio cover image with gradient overlay
 * - Tag strip (max 2 tags to avoid overflow in narrow columns)
 * - Title with tight clamping
 * - Status badge + arrow in footer
 * - No 3D tilt (touch devices don't support hover:hover)
 * - No radial glow (performance + touch UX)
 * - Large tap target (entire card is the link)
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'
import { useProjectAssets } from '@hooks/useProjectAssets'

function MiniImagePlaceholder({ project }) {
  return (
    <div style={{
      position:       'absolute',
      inset:          0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     `linear-gradient(135deg, ${project.accentColor ?? 'rgba(71,49,152,0.15)'} 0%, rgba(8,8,8,0) 100%)`,
    }}>
      <span style={{
        fontFamily:       'var(--font-display)',
        fontSize:         'clamp(2.5rem, 10vw, 4rem)',
        fontWeight:       700,
        letterSpacing:    '-0.05em',
        color:            'transparent',
        WebkitTextStroke: '1px rgba(245,245,245,0.08)',
        userSelect:       'none',
        lineHeight:       1,
      }}>
        {project.id}
      </span>
    </div>
  )
}

export default function ProjectCardMini({ project }) {
  const [imgError, setImgError] = useState(false)
  const { screenshots } = useProjectAssets(project.slug)
  const coverImage = screenshots[0]?.url ?? null
  const accent = project.accentColor ?? 'rgba(71,49,152,0.15)'

  return (
    <Link
      to={`/projects/${project.slug}`}
      style={{
        display:        'flex',
        flexDirection:  'column',
        background:     'var(--bg-2)',
        border:         '1px solid var(--border)',
        textDecoration: 'none',
        overflow:       'hidden',
        position:       'relative',
        // Ensure full height for equal-height grid rows
        height:         '100%',
        // Subtle accent on left edge
        borderLeft:     `2px solid ${accent.replace(/[\d.]+\)$/, '0.5)')}`,
      }}
    >
      {/* Cover image */}
      <div style={{
        position:    'relative',
        width:       '100%',
        aspectRatio: '4/3',
        overflow:    'hidden',
        background:  'var(--bg-3)',
        flexShrink:  0,
      }}>
        {coverImage && !imgError ? (
          <>
            <img
              src={coverImage}
              alt={`${project.title} screenshot`}
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
            {/* Bottom gradient fade into card body */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(180deg, transparent 30%, rgba(8,8,8,0.75) 100%)',
            }} />
            {/* Subtle accent tint */}
            <div style={{
              position:     'absolute',
              inset:        0,
              background:   accent,
              mixBlendMode: 'multiply',
              opacity:      0.3,
            }} />
          </>
        ) : (
          <MiniImagePlaceholder project={project} />
        )}

        {/* Project ID badge — top left */}
        <div style={{
          position:      'absolute',
          top:           '0.5rem',
          left:          '0.5rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          color:         'rgba(245,245,245,0.5)',
          letterSpacing: '0.1em',
          zIndex:        2,
        }}>
          {project.id}
        </div>

        {/* Status badge — top right */}
        <div style={{
          position: 'absolute',
          top:      '0.5rem',
          right:    '0.5rem',
          zIndex:   2,
        }}>
          <Tag variant={project.status === 'Live' ? 'live' : 'default'} style={{ fontSize: '0.45rem' }}>
            {project.status}
          </Tag>
        </div>
      </div>

      {/* Card body */}
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        flex:          1,
        padding:       '0.7rem 0.65rem 0.65rem',
        gap:           '0.4rem',
      }}>
        {/* Tags — max 2 to avoid overflow in narrow columns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {project.tags.slice(0, 2).map(tag => (
            <Tag key={tag} style={{ fontSize: '0.42rem', padding: '0.15rem 0.4rem' }}>
              {tag}
            </Tag>
          ))}
          {project.tags.length > 2 && (
            <Tag variant="ghost" style={{ fontSize: '0.42rem', padding: '0.15rem 0.4rem' }}>
              +{project.tags.length - 2}
            </Tag>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(0.9rem, 3.5vw, 1.1rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1.1,
          color:         'var(--text)',
          // Clamp to 2 lines max
          display:              '-webkit-box',
          WebkitLineClamp:      2,
          WebkitBoxOrient:      'vertical',
          overflow:             'hidden',
          marginBottom:         'auto',
        }}>
          {project.title}
        </h3>

        {/* Footer — year + arrow */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          paddingTop:     '0.5rem',
          borderTop:      '1px solid var(--border)',
          marginTop:      '0.35rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            color:         'var(--ghost)',
            letterSpacing: '0.06em',
          }}>
            {project.year}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.8rem',
            color:      'var(--muted)',
            transform:  'rotate(-45deg)',
            display:    'inline-block',
          }}>
            ↗
          </span>
        </div>
      </div>
    </Link>
  )
}