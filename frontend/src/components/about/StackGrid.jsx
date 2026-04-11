'use client'

import { useState } from 'react'
import { STACK } from '@/data/stack'

// Derived once at module level — never changes
const ALL_CATEGORIES = [...new Set(STACK.map(s => s.category))]

// Converts a 6-char hex string to an rgba() with the given alpha
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilterBar({ active, onChange }) {
  return (
    <div
      style={{
        display:       'flex',
        gap:           '0.5rem',
        flexWrap:      'wrap',
        marginBottom:  'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        borderBottom:  '1px solid var(--border)',
      }}
    >
      {['All', ...ALL_CATEGORIES].map(cat => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         isActive ? 'var(--text)' : 'var(--muted)',
              background:    isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
              border:        `1px solid ${isActive ? 'rgba(255,255,255,0.12)' : 'var(--border)'}`,
              borderRadius:  '2px',
              padding:       '0.4rem 0.9rem',
              cursor:        'pointer',
              transition:    'all 0.18s ease',
              whiteSpace:    'nowrap',
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

function TechCard({ name, icon, devicon, color }) {
  const [hovered, setHovered] = useState(false)
  const iconUrl = icon
  ? `https://cdn.simpleicons.org/${icon}/${color}`
  : devicon
  ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-original.svg`
  : null

  // color is a 6-char hex like 'F05032' — derive tinted bg and border from it
  const bgColor     = color ? hexToRgba(color, 0.10) : 'rgba(255,255,255,0.03)'
  const borderColor = color ? hexToRgba(color, 0.35) : 'rgba(255,255,255,0.1)'
  const iconBg      = color ? hexToRgba(color, 0.18) : 'rgba(255,255,255,0.05)'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   hovered ? bgColor     : 'transparent',
        border:       `1px solid ${hovered  ? borderColor : 'var(--border)'}`,
        borderRadius: '4px',
        padding:      '1rem 0.9rem 0.85rem',
        display:      'flex',
        flexDirection:'column',
        gap:          '0.65rem',
        cursor:       'default',
        transition:   'background 0.25s ease, border-color 0.25s ease',
        userSelect:   'none',
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width:          '32px',
          height:         '32px',
          borderRadius:   '6px',
          background:     hovered ? iconBg : 'rgba(255,255,255,0.03)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          transition:     'background 0.25s ease',
          flexShrink:     0,
        }}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            alt=""
            aria-hidden="true"
            style={{
              width:      '17px',
              height:     '17px',
              opacity:    hovered ? 1 : 0.7,
              transition: 'opacity 0.25s ease',
              display:    'block',
            }}
          />
        ) : (
          <span
            style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   'var(--ghost)',
              display:      'block',
            }}
          />
        )}
      </div>

      {/* Name */}
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.7rem',
          fontWeight:    500,
          letterSpacing: '0.02em',
          color:         hovered ? 'var(--text)' : 'var(--muted)',
          lineHeight:    1.25,
          transition:    'color 0.25s ease',
        }}
      >
        {name}
      </span>
    </div>
  )
}

function CategorySection({ category, items }) {
  const count = String(items.length).padStart(2, '0')

  return (
    // data-gsap="fade-up" intentionally removed — GSAP ScrollTrigger fires
    // once on mount and sets opacity:0. Re-rendered sections (after a filter
    // change) never get re-animated and stay invisible forever.
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: '120px 1fr',
        gap:                 '0',
        borderTop:           '1px solid var(--border)',
        padding:             'clamp(1.25rem, 2.5vw, 1.75rem) 0',
      }}
    >
      {/* Left — category meta */}
      <div style={{ paddingRight: '1.5rem', paddingTop: '2px' }}>
        <span
          style={{
            display:       'block',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--ghost)',
            marginBottom:  '0.5rem',
          }}
        >
          {category}
        </span>
        <span
          style={{
            display:    'block',
            fontFamily: 'var(--font-display)',
            fontSize:   'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 600,
            color:      'var(--text)',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      </div>

      {/* Right — cards */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap:                 '8px',
        }}
      >
        {items.map(s => (
          <TechCard key={s.name} name={s.name} icon={s.icon} devicon={s.devicon} color={s.color} />
        ))}
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function StackGrid() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredStack =
    activeFilter === 'All'
      ? STACK
      : STACK.filter(s => s.category === activeFilter)

  const visibleCategories = [...new Set(filteredStack.map(s => s.category))]

  return (
    <div>
      <FilterBar
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div>
        {visibleCategories.map(cat => (
          <CategorySection
            key={cat}
            category={cat}
            items={filteredStack.filter(s => s.category === cat)}
          />
        ))}
      </div>

      {/* Footer stat row */}
      <div
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '1.5rem',
          marginTop:  'clamp(1rem, 2vw, 1.5rem)',
          paddingTop: 'clamp(1rem, 2vw, 1.5rem)',
          borderTop:  '1px solid var(--border)',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.08em',
            color:         'var(--ghost)',
          }}
        >
          {filteredStack.length} technologies
          {' · '}
          {visibleCategories.length} {visibleCategories.length === 1 ? 'category' : 'categories'}
        </p>
      </div>
    </div>
  )
}