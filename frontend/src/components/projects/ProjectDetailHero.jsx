import Tag    from '@components/ui/Tag'
import Button from '@components/ui/Button'

export default function ProjectDetailHero({ project }) {
  return (
    <section style={{
      padding:  'clamp(3rem, 6vw, 6rem) 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Watermark number */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '-0.15em',
        right:         '-0.05em',
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(12rem, 30vw, 28rem)',
        fontWeight:    700,
        lineHeight:    1,
        color:         'transparent',
        WebkitTextStroke: '1px rgba(71,49,152,0.42)',
        pointerEvents: 'none',
        userSelect:    'none',
        letterSpacing: '-0.05em',
      }}>
        {project.id}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Breadcrumb */}
        <div data-gsap="fade-in" style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.6rem',
          marginBottom:  '2.5rem',
          flexWrap:      'wrap',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.99rem',
            color:         'var(--indigo)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Project {project.id}
          </span>
          <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>—</span>
          <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
            {project.status}
          </Tag>
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        {/* Title */}
        <h1 data-gsap="fade-up" style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(3rem, 8vw, 7rem)',
          fontWeight:    600,
          letterSpacing: '-0.04em',
          lineHeight:    0.9,
          color:         'var(--text)',
          marginBottom:  '1.75rem',
          maxWidth:      '900px',
        }}>
          {project.title}
        </h1>

        {/* Tagline */}
        <p data-gsap="fade-up" style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.85rem',
          color:         'var(--muted)',
          lineHeight:    1.85,
          maxWidth:      '540px',
          marginBottom:  '2.5rem',
          paddingLeft:   '1rem',
          borderLeft:    '2px solid rgba(71, 49, 152, 0.73)',
        }}>
          {project.tagline}
        </p>

        {/* Tags */}
        <div data-gsap="fade-up" style={{
          display:       'flex',
          flexWrap:      'wrap',
          gap:           '0.5rem',
          marginBottom:  '2.5rem',
        }}>
          {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>

        {/* Links */}
        <div data-gsap="fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.live && (
            <Button href={project.live} variant="primary" external>Live Site ↗</Button>
          )}
          {project.github && (
            <Button href={project.github} variant="ghost" external>GitHub →</Button>
          )}
          {!project.live && !project.github && (
            <div style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.5rem',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--muted)',
              letterSpacing: '0.08em',
            }}>
              <span style={{
                width:        '6px',
                height:       '6px',
                borderRadius: '50%',
                background:   'var(--muted)',
                display:      'inline-block',
              }} />
              In Progress — Links coming soon
            </div>
          )}
        </div>
      </div>
    </section>
  )
}