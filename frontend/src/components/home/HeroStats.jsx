const STATS = [
  { num: '5+',  label: 'Projects Built'     },
  { num: '2+',  label: 'Years Building'     },
  { num: '3',   label: 'AI Systems'         },
  { num: '∞',   label: 'Problems to Solve'  },
]

export default function HeroStats() {
  return (
    <div
      data-gsap="fade-up"
      style={{
        display:       'flex',
        gap:           '3rem',
        flexWrap:      'wrap',
        paddingTop:    '3rem',
        marginTop:     '3rem',
        borderTop:     '1px solid var(--border)',
      }}
    >
      {STATS.map((stat, i) => (
        <div key={i}>
          <span style={{
            display:       'block',
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight:    600,
            color:         'var(--text)',
            letterSpacing: '-0.03em',
            lineHeight:    1,
          }}>
            {stat.num}
          </span>
          <span style={{
            display:       'block',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            color:         'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop:     '0.5rem',
          }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}