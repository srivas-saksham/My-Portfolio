export default function AvailableBadge() {
  return (
    <div
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '0.6rem',
        background:   'var(--indigo-dim)',
        border:       '1px solid rgba(71,49,152,0.25)',
        borderRadius: 'var(--radius-pill)',
        padding:      '0.35rem 1rem 0.35rem 0.75rem',
        marginBottom: '2.5rem',
      }}
    >
      {/* Pulse dot */}
      <span className="pulse-dot" />

      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'var(--text)',
        opacity:       0.8,
      }}>
        Available for work
      </span>
    </div>
  )
}