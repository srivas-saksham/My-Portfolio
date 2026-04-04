import { useParams, Link } from 'react-router-dom'
import PageWrapper         from '@components/layout/PageWrapper'
import SEO                from '@components/seo/SEO'
import ProjectDetailHero  from '@components/projects/ProjectDetailHero'
import ProjectDetailBody  from '@components/projects/ProjectDetailBody'
import Button             from '@components/ui/Button'
import { PROJECTS }       from '@data/projects'

export default function ProjectDetailPage() {
  const { slug }  = useParams()
  const project   = PROJECTS.find(p => p.slug === slug)

  if (!project) {
    return (
      <PageWrapper>
        <div style={{
          minHeight:      '60vh',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '1.5rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.72rem',
            color:         'var(--muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Project not found
          </span>
          <Button to="/projects" variant="ghost">← Back to Work</Button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper style={{ paddingTop: '80px' }}>
      <SEO
        title={`${project.title} — Saksham Srivastava`}
        description={project.tagline}
      />

      {/* Back link */}
      <div style={{ padding: '1.5rem 2.5rem 0', maxWidth: '1200px', margin: '0 auto' }}>
        <Link
          to="/projects"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            color:         'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.4rem',
            transition:    'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          ← All Work
        </Link>
      </div>

      <ProjectDetailHero project={project} />
      <ProjectDetailBody project={project} />

      {/* Next project */}
      <NextProject current={project} />
    </PageWrapper>
  )
}

function NextProject({ current }) {
  const currentIndex = PROJECTS.findIndex(p => p.slug === current.slug)
  const next         = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <section style={{
      borderTop:  '1px solid var(--border)',
      padding:    'clamp(3rem, 5vw, 5rem) 2.5rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span style={{
          display:       'block',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         'var(--muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom:  '1.25rem',
        }}>
          Next Project
        </span>
        <Link
          to={`/projects/${next.slug}`}
          data-cursor
          style={{
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
            gap:           '1rem',
            textDecoration:'none',
            cursor:        'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.querySelector('.next-title').style.color = 'var(--muted)'
          }}
          onMouseLeave={e => {
            e.currentTarget.querySelector('.next-title').style.color = 'var(--text)'
          }}
        >
          <h3
            className="next-title"
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 5vw, 4rem)',
              fontWeight:    600,
              letterSpacing: '-0.03em',
              color:         'var(--text)',
              lineHeight:    1,
              transition:    'color 0.3s ease',
            }}
          >
            {next.title}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '1.5rem',
            color:      'var(--muted)',
          }}>
            ↗
          </span>
        </Link>
      </div>
    </section>
  )
}