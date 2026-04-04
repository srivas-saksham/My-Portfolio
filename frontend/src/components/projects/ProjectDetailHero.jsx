import Tag    from '@components/ui/Tag'
import Button from '@components/ui/Button'

export default function ProjectDetailHero({ project }) {
  return (
    <section style={{
      padding:  'clamp(4rem, 8vw, 8rem) 2.5rem clamp(3rem, 5vw, 5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Project number watermark */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          top:           '-0.1em',
          right:         '-0.05em',
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(12rem, 28vw, 26rem)',
          fontWeight:    700,
          lineHeight:    1,
          color:         'var(--indigo)',
          opacity:       0.07,
          pointerEvents: 'none',
          userSelect:    'none',
          letterSpacing: '-0.05em',
        }}
      >
        {project.id}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Meta row */}
        <div
          data-gsap="fade-in"
          style={{
            display:       'flex',
            alignItems:    'center',
            gap:           '1rem',
            marginBottom:  '2rem',
            flexWrap:      'wrap',
          }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            color:         'var(--indigo)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity:       0.8,
          }}>
            // Project {project.id}
          </span>
          <span style={{
            width:      '1px',
            height:     '12px',
            background: 'var(--border)',
          }} />
          <Tag variant={project.status === 'Live' ? 'indigo' : 'default'}>
            {project.status}
          </Tag>
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        {/* Title */}
        <h1
          data-gsap="fade-up"
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(3rem, 8vw, 7rem)',
            fontWeight:    600,
            letterSpacing: '-0.04em',
            lineHeight:    0.9,
            color:         'var(--text)',
            marginBottom:  '1.5rem',
            maxWidth:      '900px',
          }}
        >
          {project.title}
        </h1>

        {/* Tagline */}
        <p
          data-gsap="fade-up"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.85rem',
            color:         'var(--muted)',
            lineHeight:    1.8,
            maxWidth:      '560px',
            marginBottom:  '3rem',
          }}
        >
          {project.tagline}
        </p>

        {/* Tags */}
        <div
          data-gsap="fade-up"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}
        >
          {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>

        {/* Links */}
        <div
          data-gsap="fade-up"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
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
          {!project.live && !project.github && (
            <Tag variant="ghost">In Progress — Links Soon</Tag>
          )}
        </div>

      </div>
    </section>
  )
}