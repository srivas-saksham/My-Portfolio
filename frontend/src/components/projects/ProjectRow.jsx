import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'
import ProjectTagList from './ProjectTagList'

/**
 * ProjectRow
 * Single horizontal project row for the full list on /projects.
 * Matches the editorial row aesthetic: index | body | arrow.
 *
 * Props:
 *   project  — project data object
 *   index    — numeric position (0-based) for border-top on first item
 */
export default function ProjectRow({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/projects/${project.slug}`}
      data-gsap="fade-up"
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'grid',
        gridTemplateColumns: '3.5rem 1fr auto',
        gap:            '2rem',
        alignItems:     'start',
        padding:        `2rem ${hovered ? '1.75rem' : '1rem'}`,
        paddingLeft:    hovered ? '1.75rem' : '1rem',
        borderBottom:   '1px solid var(--border)',
        borderTop:      index === 0 ? '1px solid var(--border)' : 'none',
        borderLeft:     `2px solid ${hovered ? 'var(--indigo)' : 'transparent'}`,
        background:     hovered ? 'rgba(71,49,152,0.04)' : 'transparent',
        cursor:         'none',
        textDecoration: 'none',
        transition:     'all 0.3s cubic-bezier(0.19,1,0.22,1)',
      }}
    >
      {/* Index column */}
      <div style={{ paddingTop: '0.2rem' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '1.15rem',
          color:         hovered ? 'var(--indigo)' : 'var(--ghost)',
          letterSpacing: '0.06em',
          display:       'block',
          marginBottom:  '0.35rem',
          transition:    'color 0.25s ease',
          lineHeight:    1,
        }}>
          {project.id}
        </span>
        <div style={{
          width:      '16px',
          height:     '1px',
          background: hovered ? 'var(--indigo)' : 'var(--border)',
          transition: 'background 0.25s ease',
        }} />
      </div>

      {/* Body */}
      <div>
        {/* Tags + year row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem', alignItems: 'center' }}>
          <ProjectTagList tags={project.tags} />
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        {/* Title */}
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

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          maxWidth:   '580px',
        }}>
          {project.tagline}
        </p>

        {/* Status + stack */}
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
        transform:   hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
        transition:  'color 0.25s ease, transform 0.3s cubic-bezier(0.19,1,0.22,1)',
      }}>
        ↗
      </span>
    </Link>
  )
}