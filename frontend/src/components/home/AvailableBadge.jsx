export default function AvailableBadge() {
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <div style={{
        position:     'absolute',
        inset:        '-1px',
        borderRadius: 'var(--radius-pill)',
        background:   'linear-gradient(135deg, rgba(71,49,152,0.7) 0%, rgba(71,49,152,0.15) 50%, rgba(71,49,152,0.7) 100%)',
        zIndex:       0,
      }} />
      <div style={{
        position:       'relative',
        zIndex:         1,
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '0.65rem',
        background:     'var(--bg-base)',
        borderRadius:   'var(--radius-pill)',
        padding:        '0.4rem 1.1rem 0.4rem 0.85rem',
      }}>
        <span className="pulse-dot" />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--text)',
          opacity:       0.75,
        }}>
          Available for work
        </span>
      </div>
    </div>
  )
}