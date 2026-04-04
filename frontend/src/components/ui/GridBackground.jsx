// Subtle grid — used only on hero. Not repeated across sections.
export default function GridBackground({ opacity = 0.18 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize:  '64px 64px',
        opacity,
        pointerEvents:   'none',
        zIndex:          0,
      }}
    />
  )
}