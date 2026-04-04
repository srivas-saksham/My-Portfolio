import PageWrapper  from '@components/layout/PageWrapper'
import SEO         from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag         from '@components/ui/Tag'
import { PROJECTS } from '@data/projects'
import { META }    from '@data/meta'
import { Link }    from 'react-router-dom'

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <SEO title={META.projects.title} description={META.projects.description} />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div data-gsap="fade-up" style={{ marginBottom: '5rem' }}>
            <SectionLabel index="01" label="All Work" />
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h1 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(3rem, 8vw, 7rem)',
                fontWeight:    600,
                letterSpacing: '-0.04em',
                lineHeight:    0.9,
                color:         'var(--text)',
              }}>
                Things I've{' '}
                <span style={{
                  fontStyle:        'italic',
                  fontWeight:       300,
                  color:            'transparent',
                  WebkitTextStroke: '1px rgba(245,245,245,0.3)',
                }}>
                  Built
                </span>
              </h1>
              <p style={{
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.7rem',
                color:       'var(--muted)',
                letterSpacing:'0.06em',
                paddingBottom:'0.5rem',
              }}>
                {PROJECTS.length} projects
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROJECTS.map((project, i) => (
              <ProjectFullRow key={project.slug} project={project} index={i} />
            ))}
          </div>

        </div>
      </section>
    </PageWrapper>
  )
}

function ProjectFullRow({ project, index }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-gsap="fade-up"
      data-cursor
      style={{
        display:             'grid',
        gridTemplateColumns: '3.5rem 1fr auto',
        gap:                 '2rem',
        alignItems:          'start',
        padding:             '2.25rem 1rem',
        borderBottom:        '1px solid var(--border)',
        borderTop:           index === 0 ? '1px solid var(--border)' : 'none',
        borderLeft:          '2px solid transparent',
        cursor:              'none',
        textDecoration:      'none',
        transition:          'all 0.3s cubic-bezier(0.19,1,0.22,1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background      = 'rgba(71,49,152,0.04)'
        e.currentTarget.style.borderLeftColor = 'var(--indigo)'
        e.currentTarget.style.paddingLeft     = '1.75rem'
        const arrow = e.currentTarget.querySelector('.proj-arrow')
        if (arrow) { arrow.style.color = 'var(--text)'; arrow.style.transform = 'rotate(0deg)' }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background      = 'transparent'
        e.currentTarget.style.borderLeftColor = 'transparent'
        e.currentTarget.style.paddingLeft     = '1rem'
        const arrow = e.currentTarget.querySelector('.proj-arrow')
        if (arrow) { arrow.style.color = 'var(--ghost)'; arrow.style.transform = 'rotate(-45deg)' }
      }}
    >
      <div style={{ paddingTop: '0.25rem' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '1.18rem',
          color:         'var(--indigo)',
          letterSpacing: '0.08em',
          display:       'block',
          marginBottom:  '0.35rem',
        }}>
          {project.id}
        </span>
        <div style={{ width: '16px', height: '1px', background: 'var(--border)' }} />
      </div>

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem', alignItems: 'center' }}>
          {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.5rem, 3vw, 2.3rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color:         'var(--text)',
          marginBottom:  '0.6rem',
        }}>
          {project.title}
        </h2>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.85,
          maxWidth:   '580px',
        }}>
          {project.tagline}
        </p>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
            {project.status}
          </Tag>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            color:         'var(--ghost)',
            letterSpacing: '0.06em',
          }}>
            {project.stack.join(' · ')}
          </span>
        </div>
      </div>

      <span
        className="proj-arrow"
        style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '1rem',
          color:       'var(--ghost)',
          paddingTop:  '0.25rem',
          transition:  'color 0.25s ease, transform 0.25s ease',
          transform:   'rotate(-45deg)',
          display:     'inline-block',
        }}
      >
        ↗
      </span>
    </Link>
  )
}