const STATS = [
  { num: '5+',  label: 'Projects\nBuilt'     },
  { num: '3',   label: 'AI Systems\nDeployed' },
  { num: '2nd', label: 'Year @\nVIPS Delhi'  },
  { num: '∞',   label: 'Problems\nto Solve'  },
]

export default function HeroStats() {
  return (
    <>
      <div
        className="hero-stats-container"
        style={{
          display:    'flex',
          flexWrap:   'wrap',
          paddingTop: '2.5rem',
          marginTop:  '2.5rem',
          position:   'relative',
          gap:        '0',
        }}
      >
        {/* Gradient rule */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '1px',
          background: 'linear-gradient(90deg, transparent, var(--border) 25%, rgba(71,49,152,0.5) 50%, var(--border) 75%, transparent)',
        }} />

        {STATS.map((stat, i) => (
          <div
            key={i}
            className="hero-stat-item"
            style={{
              flex:        '1 1 100px',
              padding:     '0 2rem 0 0',
              borderRight: i < STATS.length - 1
                ? '1px solid var(--border)'
                : 'none',
              marginRight: i < STATS.length - 1 ? '2rem' : '0',
            }}
          >
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight:    600,
              color:         'var(--text)',
              letterSpacing: '-0.04em',
              lineHeight:    1,
              marginBottom:  '0.45rem',
            }}>
              {stat.num}
            </span>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.58rem',
              color:         'var(--muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight:    1.5,
              whiteSpace:    'pre-line',
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        /* Mobile: 2×2 grid instead of horizontal row */
        @media (max-width: 639px) {
          .hero-stats-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0 !important;
            flex-wrap: unset !important;
          }

          .hero-stat-item {
            flex: unset !important;
            padding: 1.25rem 0.75rem 1.25rem 0 !important;
            margin-right: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }

          /* Remove bottom border on last two items */
          .hero-stat-item:nth-child(3),
          .hero-stat-item:nth-child(4) {
            border-bottom: none !important;
          }

          /* Add right border to items in left column */
          .hero-stat-item:nth-child(1),
          .hero-stat-item:nth-child(3) {
            border-right: 1px solid var(--border) !important;
          }
        }

        /* Tablet: keep horizontal but allow wrapping */
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-stat-item {
            flex: 1 1 80px !important;
            padding-right: 1.25rem !important;
            margin-right: 1.25rem !important;
          }
        }
      `}</style>
    </>
  )
}