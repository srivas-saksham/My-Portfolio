import { useState } from 'react'

const CARDS = [
  {
    index:  '01',
    title:  'Full-Stack Engineering',
    body:   'React, Next.js, Node, Express, FastAPI, Supabase, PostgreSQL. End-to-end ownership from schema to UI. Built in service of the product — never just for portfolio points.',
  },
  {
    index:  '02',
    title:  'AI Integration',
    body:   'IBM-certified. Self-hosted LLMs via Ollama, Relay.app automation, AI chatbots embedded into client products. Multiagent systems. AI that works — not demos.',
  },
  {
    index:  '03',
    title:  'Product & Brand Building',
    body:   'Founded Rizara Luxe — full e-commerce operations, brand identity, and storefront. Client projects from spec to deployment. Ownership is the differentiator.',
  },
]

function Card({ card, isHovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:        'grid',
        gridTemplateColumns: '3rem 1fr',
        gap:            '1.5rem',
        padding:        '1.5rem 0',
        borderBottom:   '1px solid var(--border)',
        cursor:         'default',
        transition:     'opacity 0.2s ease',
        opacity:        isHovered ? 1 : 0.72,
      }}
    >
      {/* Index */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '1.6rem',
        color:         'var(--indigo)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        paddingTop:    '0.2rem',
        opacity:       1.7,
      }}>
        {card.index}
      </span>

      {/* Text */}
      <div>
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1rem, 2vw, 1.2rem)',
          fontWeight:    600,
          letterSpacing: '-0.02em',
          lineHeight:    1.15,
          color:         'var(--text)',
          marginBottom:  '0.5rem',
          transition:    'color 0.2s ease',
        }}>
          {card.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          maxWidth:   '52ch',
        }}>
          {card.body}
        </p>
      </div>
    </div>
  )
}

export default function AboutCards() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div
      data-gsap="fade-up"
      style={{
        borderTop: '1px solid var(--border)',
      }}
    >
      {CARDS.map((card, i) => (
        <Card
          key={card.index}
          card={card}
          isHovered={hoveredIdx === i}
          onEnter={() => setHoveredIdx(i)}
          onLeave={() => setHoveredIdx(null)}
        />
      ))}
    </div>
  )
}