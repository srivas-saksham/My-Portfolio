export default function SectionLabel({ index, label }) {
  return (
    <div
      data-gsap="fade-in"
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '1rem',
        marginBottom: '3.5rem',
      }}
    >
      <div style={{
        width:        '4px',
        height:       '4px',
        borderRadius: '50%',
        background:   'var(--indigo)',
        flexShrink:   0,
        boxShadow:    '0 0 8px rgba(71,49,152,0.6)',
      }} />

      {index && (
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.58rem',
          color:         'rgba(71,49,152,0.7)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          {index}
        </span>
      )}

      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.63rem',
        color:         'var(--muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>

      <div style={{
        flex:       1,
        height:     '1px',
        background: 'linear-gradient(90deg, var(--border) 0%, transparent 100%)',
      }} />
    </div>
  )
}