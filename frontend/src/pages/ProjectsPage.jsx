import PageWrapper   from '@components/layout/PageWrapper'
import SEO          from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag          from '@components/ui/Tag'
import { PROJECTS } from '@data/projects'
import { META }     from '@data/meta'
import { Link }     from 'react-router-dom'

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <SEO
        title={META.projects.title}
        description={META.projects.description}
      />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Page heading */}
          <div data-gsap="fade-up" style={{ marginBottom: '5rem' }}>
            <SectionLabel index="01" label="All Work" />
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(3rem, 8vw, 7rem)',
              fontWeight:    600,
              letterSpacing: '-0.04em',
              lineHeight:    0.9,
              color:         'var(--text)',
              maxWidth:      '800px',
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
          </div>

          {/* Project list */}
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
        gridTemplateColumns: '3rem 1fr auto',
        gap:                 '2rem',
        alignItems:          'start',
        padding:             '2.5rem 0',
        borderBottom:        '1px solid var(--border)',
        borderTop:           index === 0 ? '1px solid var(--border)' : 'none',
        cursor:              'none',
        textDecoration:      'none',
        transition:          'background 0.2s ease',
        borderRadius:        0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.015)'
        e.currentTarget.querySelector('.row-arrow').style.color     = 'var(--text)'
        e.currentTarget.querySelector('.row-arrow').style.transform = 'rotate(0deg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.querySelector('.row-arrow').style.color     = 'var(--ghost)'
        e.currentTarget.querySelector('.row-arrow').style.transform = 'rotate(-45deg)'
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        color:         'var(--ghost)',
        letterSpacing: '0.06em',
        paddingTop:    '0.3rem',
      }}>
        {project.id}
      </span>

      {/* Content */}
      <div>
        {/* Tags row */}
        <div style={{
          display:       'flex',
          flexWrap:      'wrap',
          gap:           '0.4rem',
          marginBottom:  '0.85rem',
        }}>
          {project.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight:    600,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color:         'var(--text)',
          marginBottom:  '0.65rem',
        }}>
          {project.title}
        </h2>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.75rem',
          color:      'var(--muted)',
          lineHeight: 1.8,
          maxWidth:   '580px',
        }}>
          {project.tagline}
        </p>

        {/* Status pill */}
        <div style={{ marginTop: '1rem' }}>
          <Tag variant={project.status === 'Live' ? 'indigo' : 'default'}>
            {project.status}
          </Tag>
        </div>
      </div>

      {/* Arrow */}
      <span
        className="row-arrow"
        style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '1.1rem',
          color:       'var(--ghost)',
          paddingTop:  '0.25rem',
          transition:  'color 0.2s ease, transform 0.2s ease',
          transform:   'rotate(-45deg)',
          display:     'inline-block',
        }}
      >
        ↗
      </span>
    </Link>
  )
}