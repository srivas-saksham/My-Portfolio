/**
 * ProjectsPage.jsx
 *
 * Full projects listing with working filter + layout toggle.
 *
 * Equal-height grid fix:
 *   CSS Grid stretches each cell to the tallest item in the row by default
 *   (align-items: stretch). For the card to actually fill that height, the
 *   chain must be unbroken:
 *
 *     grid container (display:grid, align-items:stretch — default)
 *       └─ wrapper div  → height: 100%   ← this was missing
 *            └─ ProjectCard  → height: 100%, display:flex, flex-direction:column
 *                 └─ card body  → flex: 1
 *                      └─ tagline  → flex: 1  (pushes footer to bottom)
 *
 * Filter / visibility fix:
 *   ProjectRow and ProjectCard no longer have data-gsap="fade-up" on their
 *   root elements. That attribute sets opacity:0 via animations.css, and
 *   GSAP ScrollTrigger only fires once on mount — re-rendered items stay
 *   invisible forever. The header data-gsap wrapper here fires once and is
 *   unaffected by list re-renders.
 */

import { useState, useMemo } from 'react'
import PageWrapper     from '@components/layout/PageWrapper'
import SEO             from '@components/seo/SEO'
import SectionLabel    from '@components/ui/SectionLabel'
import ProjectRow      from '@components/projects/ProjectRow'
import ProjectCard     from '@components/projects/ProjectCard'
import SceneBackground from '@components/layout/SceneBackground'

import { PROJECTS } from '@data/projects'
import { META }     from '@data/meta'

// ─── Layout toggle ────────────────────────────────────────────────────────────
function LayoutToggle({ mode, setMode }) {
  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      border:     '1px solid var(--border)',
      overflow:   'hidden',
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
            background: mode === id ? 'rgba(71,49,152,0.25)' : 'transparent',
            border:     'none',
            color:      mode === id ? 'var(--text)' : 'var(--ghost)',
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.95rem',
            padding:    '0.45rem 0.85rem',
            cursor:     'none',
            transition: 'background 0.2s ease, color 0.2s ease',
            lineHeight: 1,
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}

// ─── Filter pill ──────────────────────────────────────────────────────────────
function FilterPill({ label, count, active, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.6rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         active ? 'var(--text)' : hovered ? 'var(--muted)' : 'var(--ghost)',
        border:        `1px solid ${
          active   ? 'rgba(71,49,152,0.5)' :
          hovered  ? 'rgba(71,49,152,0.25)' :
                     'var(--border)'
        }`,
        background:    active ? 'rgba(71,49,152,0.1)' : 'transparent',
        padding:       '0.4rem 1rem',
        display:       'flex',
        alignItems:    'center',
        gap:           '0.5rem',
        cursor:        'none',
        transition:    'color 0.25s ease, border-color 0.25s ease, background 0.25s ease',
      }}
    >
      {label}
      <span style={{
        background: 'rgba(255,255,255,0.06)',
        padding:    '0.1rem 0.4rem',
        fontSize:   '0.52rem',
      }}>
        {count}
      </span>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [layout,       setLayout]       = useState('list')
  const [activeFilter, setActiveFilter] = useState('All')

  const filterCounts = useMemo(() => ({
    'All':         PROJECTS.length,
    'Live':        PROJECTS.filter(p => p.status === 'Live').length,
    'In Progress': PROJECTS.filter(p => p.status === 'In Progress').length,
  }), [])

  const displayedProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter(p => p.status === activeFilter)
  }, [activeFilter])

  return (
    <PageWrapper>
      <SEO title={META.projects.title} description={META.projects.description} />

      <section style={{
        padding:  'clamp(4rem, 8vw, 8rem) 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <SceneBackground
          gridOpacity={0.10}
          glow1Color="rgba(71,49,152,0.14)"
          glow2Color="rgba(71,49,152,0.07)"
          glow1Pos={{ top: '-10%', right: '-5%' }}
          glow2Pos={{ bottom: '5%', left: '-8%' }}
          parallaxStrength={0.7}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

          {/* Header — data-gsap here is fine; renders once */}
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

              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '1.25rem',
                paddingBottom:'0.5rem',
              }}>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.65rem',
                  color:         'var(--ghost)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {displayedProjects.length}
                  {activeFilter !== 'All' && ` / ${PROJECTS.length}`} projects
                </span>
                <LayoutToggle mode={layout} setMode={setLayout} />
              </div>
            </div>

            {/* Filter pills */}
            <div style={{
              display:    'flex',
              gap:        '0.5rem',
              flexWrap:   'wrap',
              marginTop:  '2.5rem',
              paddingTop: '2rem',
              borderTop:  '1px solid var(--border)',
            }}>
              {['All', 'Live', 'In Progress'].map(filter => (
                <FilterPill
                  key={filter}
                  label={filter}
                  count={filterCounts[filter]}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
          </div>

          {/* Empty state */}
          {displayedProjects.length === 0 && (
            <div style={{
              padding:       '5rem 0',
              textAlign:     'center',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           '1rem',
            }}>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                color:         'var(--ghost)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                No projects match this filter
              </span>
            </div>
          )}

          {/* List layout — no data-gsap on container or children */}
          {layout === 'list' && displayedProjects.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {displayedProjects.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i} />
              ))}
            </div>
          )}

          {/* Grid layout — wrapper div must be height:100% to pass cell height to card */}
          {layout === 'grid' && displayedProjects.length > 0 && (
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap:                 '1px',
              background:          'var(--border)',
              border:              '1px solid var(--border)',
              // align-items:stretch is the CSS Grid default — cells stretch to
              // the tallest item in the row. The wrapper div and card both
              // need height:100% to propagate this height down.
              alignItems:          'stretch',
            }}>
              {displayedProjects.map((project, i) => (
                <div
                  key={project.slug}
                  style={{
                    background: 'var(--bg-base)',
                    height:     '100%',   // ← passes grid cell height to ProjectCard
                  }}
                >
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