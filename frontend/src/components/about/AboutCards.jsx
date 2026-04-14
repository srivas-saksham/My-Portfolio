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
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
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
      className="about-card-row"
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
          fontSize:      'clamp(0.95rem, 2vw, 1.2rem)',
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
    <>
      <div
        data-gsap="fade-up"
        className="about-cards-container"
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

      <style>{`
        /*
          On mobile/tablet: AboutCards is stacked below the title
          (handled by the parent grid collapsing to 1 column).
          No layout changes needed here — the cards themselves are
          already single-column rows and work well at any width.
          We just tweak padding and font sizes slightly.
        */
        @media (max-width: 639px) {
          .about-card-row {
            grid-template-columns: 2.25rem 1fr !important;
            gap: 1rem !important;
            padding: 1.15rem 0 !important;
          }
        }
      `}</style>
    </>
  )
}