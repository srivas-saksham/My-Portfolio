import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Tag from '@components/ui/Tag'

/**
 * ProjectCard
 * Card layout for displaying a project in a grid.
 * Used on ProjectsPage when a grid layout is preferred.
 * Features: 3D tilt on hover, mouse-following glow, smooth reveal.
 *
 * Props:
 *   project  — project data object from projects.js
 *   index    — numeric position (0-based) for stagger delay
 */
export default function ProjectCard({ project, index = 0 }) {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height

    // Tilt
    const rotX = (y - 0.5) * -8
    const rotY = (x - 0.5) *  8
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`

    // Glow
    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`
      glowRef.current.style.top  = `${y * 100}%`
    }
  }

  const onMouseLeave = () => {
    setHovered(false)
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

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
        padding:        '1.75rem',
        background:     hovered ? 'rgba(255,255,255,0.03)' : 'var(--bg-2)',
        border:         `1px solid ${hovered ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        textDecoration: 'none',
        cursor:         'none',
        position:       'relative',
        overflow:       'hidden',
        transition:     'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow:      hovered
          ? '0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 2px 8px rgba(0,0,0,0.15)',
        willChange:     'transform',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Mouse-following glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position:     'absolute',
          width:        '180px',
          height:       '180px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)',
          transform:    'translate(-50%,-50%)',
          pointerEvents:'none',
          opacity:      hovered ? 1 : 0,
          transition:   'opacity 0.3s ease',
          zIndex:       0,
        }}
      />

      {/* Indigo accent top-left */}
      <div
        aria-hidden="true"
        style={{
          position:  'absolute',
          top:       0,
          left:      0,
          width:     '2px',
          height:    hovered ? '100%' : '0%',
          background:'var(--indigo)',
          transition:'height 0.5s cubic-bezier(0.19,1,0.22,1)',
          zIndex:    0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          marginBottom:   '1.25rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            color:         hovered ? 'rgba(71,49,152,0.9)' : 'var(--ghost)',
            letterSpacing: '0.08em',
            transition:    'color 0.25s ease',
          }}>
            {project.id}
          </span>

          <Tag variant={project.status === 'Live' ? 'live' : 'ghost'}>
            {project.status}
          </Tag>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
          {project.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color:         'var(--text)',
          marginBottom:  '0.75rem',
        }}>
          {project.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.7rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          flex:       1,
        }}>
          {project.tagline}
        </p>

        {/* Footer */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginTop:      '1.5rem',
          paddingTop:     '1rem',
          borderTop:      '1px solid var(--border)',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            color:         'var(--ghost)',
            letterSpacing: '0.06em',
          }}>
            {project.year}
          </span>
          <span style={{
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.85rem',
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