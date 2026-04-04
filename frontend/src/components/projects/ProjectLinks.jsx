import Button from '@components/ui/Button'

/**
 * ProjectLinks
 * Renders the live/GitHub/demo call-to-action buttons for a project.
 * Handles all null-state edge cases gracefully.
 *
 * Props:
 *   project — project data object
 *   compact — if true, renders a tighter inline layout
 */
export default function ProjectLinks({ project, compact = false }) {
  const hasLinks = project.live || project.github

  if (!hasLinks) {
    return (
      <div style={{
        display:    'inline-flex',
        alignItems: 'center',
        gap:        '0.65rem',
        padding:    compact ? '0' : '0.85rem 1.25rem',
        border:     compact ? 'none' : '1px dashed var(--border)',
      }}>
        {/* Pulsing "in progress" dot */}
        <span style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   'var(--ghost)',
          display:      'inline-block',
          flexShrink:   0,
          animation:    'blink 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          color:         'var(--ghost)',
          letterSpacing: '0.06em',
        }}>
          In Progress — Links coming soon
        </span>
        <style>{`
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{
      display:    'flex',
      gap:        '0.85rem',
      flexWrap:   'wrap',
      alignItems: 'center',
    }}>
      {project.live && (
        <Button href={project.live} variant="primary" external>
          Live Site ↗
        </Button>
      )}

      {project.github && (
        <Button href={project.github} variant="ghost" external>
          GitHub →
        </Button>
      )}

      {/* Type badge */}
      {!compact && project.type && (
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          color:         'var(--ghost)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginLeft:    'auto',
        }}>
          {project.type}
        </span>
      )}
    </div>
  )
}