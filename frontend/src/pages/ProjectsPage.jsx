/**
 * ProjectsPage.jsx
 *
 * Full projects listing.  Offers two layout modes:
 *   - List (default): editorial row layout — preserved exactly from original
 *   - Grid: card grid with screenshot cover images
 *
 * The layout toggle is purely cosmetic — all data flows from PROJECTS array.
 */

import { useState } from 'react'
import PageWrapper   from '@components/layout/PageWrapper'
import SEO           from '@components/seo/SEO'
import SectionLabel  from '@components/ui/SectionLabel'
import ProjectRow    from '@components/projects/ProjectRow'
import ProjectCard   from '@components/projects/ProjectCard'
import SceneBackground from '@components/layout/SceneBackground'

import { PROJECTS } from '@data/projects'
import { META }     from '@data/meta'

// ─── View toggle button ──────────────────────────────────────────────────────
function LayoutToggle({ mode, setMode }) {
  return (
    <div style={{
      display:     'flex',
      alignItems:  'center',
      gap:         '0',
      border:      '1px solid var(--border)',
      overflow:    'hidden',
    }}>
      {[
        { id: 'list', icon: '≡', label: 'List view' },
        { id: 'grid', icon: '⊞', label: 'Grid view' },
      ].map(({ id, icon, label }) => (
        <button
          key={id}
          aria-label={label}
          onClick={() => setMode(id)}
          style={{
            background:  mode === id ? 'rgba(71,49,152,0.25)' : 'transparent',
            border:      'none',
            color:       mode === id ? 'var(--text)' : 'var(--ghost)',
            fontFamily:  'var(--font-mono)',
            fontSize:    '0.95rem',
            padding:     '0.45rem 0.85rem',
            cursor:      'none',
            transition:  'background 0.2s ease, color 0.2s ease',
            lineHeight:  1,
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [layout, setLayout] = useState('list')

  return (
    <PageWrapper>
      <SEO title={META.projects.title} description={META.projects.description} />

      <section style={{
        padding:  'clamp(4rem, 8vw, 8rem) 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Scene background — dark bg-base section */}
        <SceneBackground
          gridOpacity={0.10}
          glow1Color="rgba(71,49,152,0.14)"
          glow2Color="rgba(71,49,152,0.07)"
          glow1Pos={{ top: '-10%', right: '-5%' }}
          glow2Pos={{ bottom: '5%',  left: '-8%' }}
          parallaxStrength={0.7}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

          {/* Page header */}
          <div data-gsap="fade-up" style={{ marginBottom: '4.5rem' }}>
            <SectionLabel index="01" label="All Work" />
            <div style={{
              display:        'flex',
              alignItems:     'flex-end',
              justifyContent: 'space-between',
              flexWrap:       'wrap',
              gap:            '1.5rem',
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

              {/* Controls: count + toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '0.5rem' }}>
                <span style={{
                  fontFamily:   'var(--font-mono)',
                  fontSize:     '0.65rem',
                  color:        'var(--ghost)',
                  letterSpacing:'0.1em',
                  textTransform:'uppercase',
                }}>
                  {PROJECTS.length} projects
                </span>
                <LayoutToggle mode={layout} setMode={setLayout} />
              </div>
            </div>

            {/* Filter pills — status */}
            <div style={{
              display:    'flex',
              gap:        '0.5rem',
              flexWrap:   'wrap',
              marginTop:  '2.5rem',
              paddingTop: '2rem',
              borderTop:  '1px solid var(--border)',
            }}>
              {['All', 'Live', 'In Progress'].map(filter => {
                const count = filter === 'All'
                  ? PROJECTS.length
                  : PROJECTS.filter(p => p.status === filter).length
                return (
                  <div
                    key={filter}
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         filter === 'All' ? 'var(--text)' : 'var(--ghost)',
                      border:        `1px solid ${filter === 'All' ? 'rgba(71,49,152,0.5)' : 'var(--border)'}`,
                      background:    filter === 'All' ? 'rgba(71,49,152,0.1)' : 'transparent',
                      padding:       '0.4rem 1rem',
                      display:       'flex',
                      alignItems:    'center',
                      gap:           '0.5rem',
                    }}
                  >
                    {filter}
                    <span style={{
                      background:    'rgba(255,255,255,0.06)',
                      padding:       '0.1rem 0.4rem',
                      fontSize:      '0.52rem',
                    }}>
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── List layout ── */}
          {layout === 'list' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PROJECTS.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i} />
              ))}
            </div>
          )}

          {/* ── Grid layout ── */}
          {layout === 'grid' && (
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap:                 '1px',
              background:          'var(--border)',
              border:              '1px solid var(--border)',
            }}>
              {PROJECTS.map((project, i) => (
                <div key={project.slug} style={{ background: 'var(--bg-base)' }}>
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </PageWrapper>
  )
}