import { useState } from 'react'
import { STACK } from '@data/stack'

const CATEGORIES = [...new Set(STACK.map(s => s.category))]

const CATEGORY_ACCENTS = {
  Frontend: 'rgba(99,179,237,0.12)',
  Backend:  'rgba(154,117,235,0.12)',
  Systems:  'rgba(246,173,85,0.12)',
  AI:       'rgba(104,211,145,0.12)',
  Infra:    'rgba(252,129,74,0.12)',
  Data:     'rgba(237,137,54,0.12)',
  Tooling:  'rgba(160,174,192,0.08)',
}

function StackPill({ name, accent }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '0.5rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.7rem',
        letterSpacing: '0.04em',
        color:         hovered ? 'var(--text)' : 'var(--muted)',
        background:    hovered ? accent : 'transparent',
        border:        `1px solid ${hovered ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        padding:       '0.35rem 0.85rem',
        transition:    'all 0.22s ease',
        cursor:        'default',
        userSelect:    'none',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width:        '4px',
          height:       '4px',
          borderRadius: '50%',
          background:   hovered ? 'var(--text)' : 'var(--ghost)',
          flexShrink:   0,
          transition:   'background 0.22s ease',
        }}
      />
      {name}
    </div>
  )
}

/**
 * StackGrid
 * Renders the full tech stack grouped by category.
 * Each category gets a labeled row with pill-style tech badges.
 */
export default function StackGrid() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      {CATEGORIES.map(cat => {
        const items  = STACK.filter(s => s.category === cat)
        const accent = CATEGORY_ACCENTS[cat] ?? 'rgba(255,255,255,0.06)'

        return (
          <div
            key={cat}
            data-gsap="fade-up"
          >
            {/* Category header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              gap:            '0.75rem',
              marginBottom:   '0.85rem',
            }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                color:         'var(--ghost)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                minWidth:      '5rem',
              }}>
                {cat}
              </span>
              <div style={{
                flex:       1,
                height:     '1px',
                background: 'var(--border)',
              }} />
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                color:         'var(--ghost)',
                letterSpacing: '0.06em',
              }}>
                {items.length}
              </span>
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {items.map(s => (
                <StackPill key={s.name} name={s.name} accent={accent} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}