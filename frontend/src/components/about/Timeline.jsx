import { useRef, useState } from 'react'

/**
 * Timeline
 * Vertical timeline for achievements, certifications, and career milestones.
 * Accepts an array of event items or falls back to a default dataset.
 *
 * Item shape: { year, title, body, tag, type }
 * type values: 'internship' | 'certification' | 'award' | 'milestone'
 */

const TYPE_CONFIG = {
  internship:   { dot: 'var(--indigo)',          label: 'Internship'   },
  certification:{ dot: 'rgba(104,211,145,0.9)',  label: 'Certification'},
  award:        { dot: 'rgba(246,173,85,0.9)',   label: 'Award'        },
  milestone:    { dot: 'rgba(160,174,192,0.7)',  label: 'Milestone'    },
}

function TimelineItem({ item, isLast }) {
  const [hovered, setHovered] = useState(false)
  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.milestone

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:  'grid',
        gridTemplateColumns: '80px 20px 1fr',
        gap:      '0 1.5rem',
        position: 'relative',
      }}
    >
      {/* Year */}
      <div style={{ paddingTop: '0.1rem', textAlign: 'right' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         hovered ? 'var(--text)' : 'var(--ghost)',
          letterSpacing: '0.06em',
          transition:    'color 0.25s ease',
        }}>
          {item.year}
        </span>
      </div>

      {/* Spine + Dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Dot */}
        <div style={{
          width:        '8px',
          height:       '8px',
          borderRadius: '50%',
          background:   cfg.dot,
          flexShrink:   0,
          marginTop:    '0.15rem',
          boxShadow:    hovered ? `0 0 12px ${cfg.dot}` : 'none',
          transition:   'box-shadow 0.3s ease',
          zIndex:       1,
        }} />
        {/* Line */}
        {!isLast && (
          <div style={{
            flex:       1,
            width:      '1px',
            background: 'var(--border)',
            marginTop:  '6px',
            marginBottom:'0',
            minHeight:  '2.5rem',
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : '2.5rem' }}>
        {/* Tag */}
        <span style={{
          display:       'inline-block',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.52rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         cfg.dot,
          marginBottom:  '0.4rem',
        }}>
          {item.tag ?? cfg.label}
        </span>

        {/* Title */}
        <h4 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1rem, 1.8vw, 1.2rem)',
          fontWeight:    600,
          letterSpacing: '-0.02em',
          lineHeight:    1.15,
          color:         'var(--text)',
          marginBottom:  '0.55rem',
          transition:    'color 0.25s ease',
        }}>
          {item.title}
        </h4>

        {/* Body */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          maxWidth:   '560px',
        }}>
          {item.body}
        </p>
      </div>
    </div>
  )
}

export default function Timeline({ items }) {
  // Default fallback data if no items prop is passed
  const data = items ?? [
    {
      year:  '2025',
      title: 'IBM AI Agent Internship',
      body:  'Hands-on internship in AI applications and real-world problem-solving. Built PathForge as the capstone project.',
      tag:   'Internship',
      type:  'internship',
    },
    {
      year:  '2025',
      title: 'IBM — Rise of Multiagent AI Agents',
      body:  'Specialized training on Multiagent AI systems — collaboration, communication, and deployment strategies.',
      tag:   'Certification',
      type:  'certification',
    },
    {
      year:  '2025',
      title: 'IBM — Unleashing the Power of AI Agents',
      body:  'Advanced training on developing and optimizing AI Agents — efficiency, scalability, and automation.',
      tag:   'Certification',
      type:  'certification',
    },
    {
      year:  '2025',
      title: 'IBM — Getting Started with AI Agents',
      body:  'Foundational training on AI Agent concepts, workflows, and practical implementations.',
      tag:   'Certification',
      type:  'certification',
    },
    {
      year:  '2023',
      title: 'MSI Creator Awards — Top 10',
      body:  'Ranked in the Top 10 Creations globally in the Animation Category.',
      tag:   'Award',
      type:  'award',
    },
    {
      year:  '2023',
      title: 'ByteTalks — Presentation Award',
      body:  'Recognized for outstanding presentation on Emotional Intelligence and Critical Thinking.',
      tag:   'Award',
      type:  'award',
    },
    {
      year:  '2022',
      title: 'MSI Creator Awards — Top 50',
      body:  'Ranked in the Top 50 Creations globally in the Animation Category.',
      tag:   'Award',
      type:  'award',
    },
  ]

  return (
    <div data-gsap="fade-up" style={{ display: 'flex', flexDirection: 'column' }}>
      {data.map((item, i) => (
        <TimelineItem
          key={i}
          item={item}
          isLast={i === data.length - 1}
        />
      ))}
    </div>
  )
}