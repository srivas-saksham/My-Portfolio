export default function SectionLabel({ index, label }) {
  return (
    <div
      data-gsap="fade-in"
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '1rem',
        marginBottom: '3.5rem',
      }}
    >
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        color:         'var(--indigo)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        opacity:       0.8,
      }}>
        {index && `// ${index} — `}{label}
      </span>

      <div style={{
        flex:       1,
        height:     '1px',
        background: 'var(--border)',
      }} />
    </div>
  )
}