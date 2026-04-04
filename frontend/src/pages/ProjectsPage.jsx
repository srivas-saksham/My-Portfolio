import PageWrapper   from '@components/layout/PageWrapper'
import SEO           from '@components/seo/SEO'
import SectionLabel  from '@components/ui/SectionLabel'

// ── New components wired in ───────────────────────────────────────────────────
import ProjectRow    from '@components/projects/ProjectRow'

import { PROJECTS } from '@data/projects'
import { META }     from '@data/meta'

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <SEO title={META.projects.title} description={META.projects.description} />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Page header — unchanged */}
          <div data-gsap="fade-up" style={{ marginBottom: '5rem' }}>
            <SectionLabel index="01" label="All Work" />
            <div style={{
              display:        'flex',
              alignItems:     'flex-end',
              justifyContent: 'space-between',
              flexWrap:       'wrap',
              gap:            '1rem',
            }}>
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
                fontFamily:   'var(--font-mono)',
                fontSize:     '0.7rem',
                color:        'var(--muted)',
                letterSpacing:'0.06em',
                paddingBottom:'0.5rem',
              }}>
                {PROJECTS.length} projects
              </p>
            </div>
          </div>

          {/* Project list — ProjectRow replaces the inline ProjectFullRow */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROJECTS.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} />
            ))}
          </div>

        </div>
      </section>
    </PageWrapper>
  )
}