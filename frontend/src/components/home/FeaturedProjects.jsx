import { Link }        from 'react-router-dom'
import { PROJECTS }    from '@data/projects'
import SectionLabel    from '@components/ui/SectionLabel'
import Tag             from '@components/ui/Tag'
import Button          from '@components/ui/Button'

// Show only first 3 on homepage
const FEATURED = PROJECTS.slice(0, 3)

export default function FeaturedProjects() {
  return (
    <section
      style={{
        padding:    'clamp(5rem, 8vw, 8rem) 2.5rem',
        background: 'var(--bg-1)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel index="02" label="Selected Work" />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FEATURED.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div
          data-gsap="fade-up"
          style={{
            marginTop:  '4rem',
            display:    'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button to="/projects" variant="ghost">
            All Projects →
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, index }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-gsap="fade-up"
      data-cursor
      style={{
        display:       'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap:           '2rem',
        alignItems:    'start',
        padding:       '2.25rem 0',
        borderBottom:  '1px solid var(--border)',
        borderTop:     index === 0 ? '1px solid var(--border)' : 'none',
        cursor:        'none',
        textDecoration: 'none',
        transition:    'background 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.015)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Index */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        color:         'var(--ghost)',
        paddingTop:    '0.25rem',
        minWidth:      '2rem',
        letterSpacing: '0.06em',
      }}>
        {project.id}
      </span>

      {/* Body */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
          {project.tags.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight:    600,
          letterSpacing: '-0.02em',
          color:         'var(--text)',
          marginBottom:  '0.5rem',
          lineHeight:    1,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.75rem',
          color:      'var(--muted)',
          lineHeight: 1.8,
          maxWidth:   '560px',
        }}>
          {project.tagline}
        </p>
      </div>

      {/* Arrow */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize:   '1rem',
        color:      'var(--ghost)',
        paddingTop: '0.25rem',
        transition: 'color 0.2s ease, transform 0.2s ease',
      }}>
        ↗
      </span>
    </Link>
  )
}