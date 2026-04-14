/**
 * ProjectDetailPage.jsx — Fully Responsive
 *
 * Desktop: unchanged — all sections, 2-col technical grid, full parallax logo
 * Tablet:  same sections, narrowed padding, technical grid tightened
 * Mobile:  single column throughout, technical metadata stacks above description,
 *          screenshots gallery spans full width, simplified hero layout
 *
 * Sections:
 *   01 — Hero             (always)
 *   02 — Screenshots      (if screenshots.length > 0)
 *   03 — Video Demo       (if project.hasVideo && videoSrc exists)
 *   04 — Live Preview     (if project.live !== null)
 *   05 — Technical Detail (always)
 *   06 — Next Project     (always)
 */

import { useParams, Link } from 'react-router-dom'
import PageWrapper               from '@components/layout/PageWrapper'
import SEO                       from '@components/seo/SEO'
import Button                    from '@components/ui/Button'
import Tag                       from '@components/ui/Tag'
import SectionLabel              from '@components/ui/SectionLabel'
import SceneBackground           from '@components/layout/SceneBackground'

import ProjectDetailHero         from '@components/projects/ProjectDetailHero'
import ProjectLinks              from '@components/projects/ProjectLinks'
import ProjectScreenshotsGallery from '@components/projects/ProjectScreenshotsGallery'
import ProjectVideoDemo          from '@components/projects/ProjectVideoDemo'
import ProjectLivePreview        from '@components/projects/ProjectLivePreview'

import { useProjectAssets } from '@hooks/useProjectAssets'
import { PROJECTS } from '@data/projects'
import { getProjectMeta } from '@data/meta'

function parseAccent(raw) {
  return raw ?? 'rgba(71,49,152,0.15)'
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ children, bg = 'var(--bg-base)', style = {}, className = '', ...rest }) {
  return (
    <section
      className={`detail-section ${className}`}
      style={{
        padding:    'clamp(3.5rem, 6vw, 6rem) 2.5rem',
        background: bg,
        borderTop:  '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
        ...style,
      }}
      {...rest}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </section>
  )
}

// ─── Screenshots section ──────────────────────────────────────────────────────
function ScreenshotsSection({ project, screenshots }) {
  const accent = parseAccent(project.accentColor)

  return (
    <section
      className="detail-section screenshots-section"
      style={{
        padding:    'clamp(3.5rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-base)',
        borderTop:  '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      <SceneBackground
        gridOpacity={0.08}
        glow1Color={accent.replace(/[\d.]+\)$/, '0.1)')}
        glow2Color="rgba(71,49,152,0.05)"
        glow1Pos={{ top: '-15%', right: '-5%' }}
        glow2Pos={{ bottom: '0%', left: '-10%' }}
        parallaxStrength={0.5}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <SectionLabel index="02" label="Screenshots" />

        {/* Count + keyboard hint — stacks on mobile */}
        <div
          className="screenshots-header"
          data-gsap="fade-up"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginBottom:   '1.75rem',
            flexWrap:       'wrap',
            gap:            '0.75rem',
            marginTop:      '-2rem',
          }}
        >
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.72rem',
            color:         'var(--ghost)',
            letterSpacing: '0.08em',
          }}>
            {screenshots.length} screenshot{screenshots.length !== 1 ? 's' : ''} — click to expand
          </span>
          {screenshots.length > 1 && (
            <span
              className="screenshots-kbd-hint"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.75rem',
                color:         'var(--ghost)',
                letterSpacing: '0.08em',
                display:       'flex',
                alignItems:    'center',
                gap:           '0.4rem',
              }}
            >
              <kbd style={{
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.72rem',
                border:      '1px solid var(--border)',
                padding:     '0.15rem 0.4rem',
                background:  'var(--bg-2)',
                color:       'var(--ghost)',
              }}>←</kbd>
              <kbd style={{
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.82rem',
                border:      '1px solid var(--border)',
                padding:     '0.15rem 0.4rem',
                background:  'var(--bg-2)',
                color:       'var(--ghost)',
              }}>→</kbd>
              Navigate
            </span>
          )}
        </div>

        <div data-gsap="fade-up">
          <ProjectScreenshotsGallery
            screenshots={screenshots}
            accentColor={project.accentColor}
          />
        </div>
      </div>
    </section>
  )
}

// ─── Video section ───────────────────────────────────────────────────────────
function VideoSection({ project, videoSrc }) {
  return (
    <Section bg="var(--bg-1)" className="video-section">
      <SectionLabel index="03" label="Demo Video" />

      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginBottom:   '1.75rem',
        marginTop:      '-2rem',
        flexWrap:       'wrap',
        gap:            '0.75rem',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         'var(--ghost)',
          letterSpacing: '0.08em',
        }}>
          Autoplay · muted · click to pause
        </span>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          color:         'var(--ghost)',
          letterSpacing: '0.08em',
          display:       'flex',
          alignItems:    'center',
          gap:           '0.4rem',
        }}>
          <span style={{
            width:        '5px',
            height:       '5px',
            borderRadius: '50%',
            background:   '#ef4444',
            boxShadow:    '0 0 5px rgba(239,68,68,0.6)',
            display:      'inline-block',
          }} />
          Recording
        </span>
      </div>

      <div data-gsap="fade-up">
        <ProjectVideoDemo
          videoSrc={videoSrc}
          accentColor={project.accentColor}
        />
      </div>
    </Section>
  )
}

// ─── Live preview section ─────────────────────────────────────────────────────
function LivePreviewSection({ project, sectionIndex }) {
  return (
    <Section bg="var(--bg-base)" className="live-preview-section">
      <SectionLabel index={sectionIndex} label="Live Preview" />

      <div style={{
        marginBottom: '1.75rem',
        marginTop:    '-2rem',
        display:      'flex',
        alignItems:   'center',
        gap:          '0.75rem',
      }}>
        <span style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   'rgba(74,222,128,0.8)',
          boxShadow:    '0 0 6px rgba(74,222,128,0.5)',
          flexShrink:   0,
        }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.72rem',
          color:         'var(--ghost)',
          letterSpacing: '0.08em',
        }}>
          Embedded live site — fully interactive
        </span>
      </div>

      <div data-gsap="fade-up">
        <ProjectLivePreview url={project.live} title={project.title} />
      </div>
    </Section>
  )
}

// ─── Technical details section ────────────────────────────────────────────────
function TechnicalSection({ project, sectionIndex }) {
  const accent = parseAccent(project.accentColor)

  return (
    <Section bg="var(--bg-1)" className="technical-section">
      <SectionLabel index={sectionIndex} label="Technical Details" />

      <div
        className="technical-grid"
        style={{
          display:             'grid',
          gridTemplateColumns: '220px 1fr',
          gap:                 'clamp(3rem, 6vw, 6rem)',
          alignItems:          'start',
        }}
      >
        {/* Left — sticky metadata */}
        <div
          data-gsap="fade-up"
          className="technical-meta"
          style={{
            position:      'sticky',
            top:           '100px',
            display:       'flex',
            flexDirection: 'column',
            gap:           '2rem',
          }}
        >
          {[
            { label: 'Stack',   value: project.stack.join('\n') },
            { label: 'Year',    value: project.year             },
            { label: 'Status',  value: project.status           },
            { label: 'Type',    value: project.type             },
            ...(project.client ? [{ label: 'Client', value: project.client }] : []),
          ].map(item => (
            <div key={item.label}>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.52rem',
                color:         'var(--ghost)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom:  '0.55rem',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily:   'var(--font-mono)',
                fontSize:     '0.72rem',
                color:        'var(--muted)',
                lineHeight:   1.85,
                whiteSpace:   'pre-line',
                display:      'block',
                letterSpacing:'0.02em',
              }}>
                {item.value}
              </span>
            </div>
          ))}

          {/* Links */}
          <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.52rem',
              color:         'var(--ghost)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom:  '0.85rem',
            }}>
              Links
            </span>
            <ProjectLinks project={project} compact />
          </div>
        </div>

        {/* Right — description + tags */}
        <div data-gsap="fade-up" className="technical-body">
          {/* Accent rule */}
          <div style={{
            width:        '2rem',
            height:       '2px',
            background:   accent.replace(/[\d.]+\)$/, '0.7)'),
            marginBottom: '1.5rem',
          }} />

          <p style={{
            fontFamily:   'var(--font-mono)',
            fontSize:     '0.82rem',
            color:        'var(--muted)',
            lineHeight:   2.1,
            maxWidth:     '620px',
            marginBottom: '2.5rem',
          }}>
            {project.description}
          </p>

          {/* Divider */}
          <div style={{
            height:       '1px',
            background:   'var(--border)',
            marginBottom: '2.5rem',
            maxWidth:     '620px',
          }} />

          {/* Tech tags */}
          <div>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.52rem',
              color:         'var(--ghost)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom:  '1rem',
            }}>
              Technologies Used
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '620px' }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.68rem',
                    color:         'var(--muted)',
                    padding:       '0.3rem 0.85rem',
                    border:        '1px solid var(--border)',
                    letterSpacing: '0.04em',
                    transition:    'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = accent.replace(/[\d.]+\)$/, '0.5)')
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--muted)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Next Project ─────────────────────────────────────────────────────────────
function NextProject({ current }) {
  const currentIndex = PROJECTS.findIndex(p => p.slug === current.slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]
  const { screenshots: nextShots } = useProjectAssets(next.slug)
  const nextCover = nextShots[0]?.url ?? null

  return (
    <section style={{
      borderTop:  '1px solid var(--border)',
      padding:    'clamp(3rem, 5vw, 5rem) 2.5rem',
      background: 'var(--bg-base)',
      position:   'relative',
      overflow:   'hidden',
    }}
    className="next-project-section"
    >
      <SceneBackground
        gridOpacity={0.09}
        glow1Color="rgba(71,49,152,0.12)"
        glow2Color="rgba(71,49,152,0.06)"
        glow1Pos={{ top: '-10%', right: '-5%' }}
        glow2Pos={{ bottom: '-10%', left: '-8%' }}
        parallaxStrength={0.6}
      />

      {nextCover && (
        <div
          aria-hidden="true"
          style={{
            position:           'absolute',
            inset:              0,
            backgroundImage:    `url(${nextCover})`,
            backgroundSize:     'cover',
            backgroundPosition: 'top center',
            filter:             'brightness(0.08) saturate(0.3)',
            transform:          'scale(1.04)',
            zIndex:             0,
          }}
        />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <span style={{
          display:       'block',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          color:         'var(--ghost)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom:  '1.5rem',
        }}>
          Next Project
        </span>

        <Link
          to={`/projects/${next.slug}`}
          data-cursor
          className="next-project-link"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            gap:            '1.5rem',
            textDecoration: 'none',
            cursor:         'none',
          }}
          onMouseEnter={e => e.currentTarget.querySelector('.next-title').style.color = 'var(--muted)'}
          onMouseLeave={e => e.currentTarget.querySelector('.next-title').style.color = 'var(--text)'}
        >
          <div>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.85rem',
              color:         'var(--ghost)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display:       'block',
              marginBottom:  '0.5rem',
            }}>
              {next.id} — {next.type}
            </span>
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
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.68rem',
              color:      'var(--ghost)',
              marginTop:  '0.6rem',
              maxWidth:   '400px',
              lineHeight: 1.7,
            }}>
              {next.tagline}
            </p>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '1.8rem',
            color:      'var(--muted)',
            flexShrink: 0,
          }}>
            ↗
          </span>
        </Link>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project  = PROJECTS.find(p => p.slug === slug)

  const { screenshots, videoSrc } = useProjectAssets(slug ?? '')

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

  const hasScreenshots = screenshots.length > 0
  const showVideo      = project.hasVideo && !!videoSrc
  const showLive       = !!project.live

  let sectionIdx = 1

  const screenshotIdx = hasScreenshots ? ++sectionIdx : null  // eslint-disable-line no-unused-vars
  const videoIdx      = showVideo      ? ++sectionIdx : null  // eslint-disable-line no-unused-vars
  const liveIdx       = showLive       ? ++sectionIdx : null
  const techIdx       = ++sectionIdx

  const fmt = (n) => String(n).padStart(2, '0')
  const seo = getProjectMeta(project)
  
  return (
    <PageWrapper style={{ paddingTop: '80px' }}>
      <SEO
        title={seo.title}
        description={seo.description}
        path={seo.path}
        image={seo.image}
        type={seo.type}
        keywords={seo.keywords}
      />

      {/* Back link */}
      <div
        className="back-link-bar"
        style={{ padding: '1.5rem 2.5rem 0', maxWidth: '1200px', margin: '0 auto' }}
      >
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

      {/* 01 — Hero */}
      <ProjectDetailHero project={project} />

      {/* 02 — Screenshots */}
      {hasScreenshots && (
        <ScreenshotsSection project={project} screenshots={screenshots} />
      )}

      {/* 03 — Video Demo */}
      {showVideo && (
        <VideoSection project={project} videoSrc={videoSrc} />
      )}

      {/* 04 — Live Preview */}
      {showLive && (
        <LivePreviewSection project={project} sectionIndex={fmt(liveIdx)} />
      )}

      {/* 05 — Technical Details */}
      <TechnicalSection project={project} sectionIndex={fmt(techIdx)} />

      {/* 06 — Next Project */}
      <NextProject current={project} />

      <style>{`
        /* ── Mobile (< 640px) ──────────────────────────────────────────── */
        @media (max-width: 639px) {

          .detail-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          .screenshots-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Hide keyboard navigation hint on mobile — touch devices don't use it */
          .screenshots-kbd-hint {
            display: none !important;
          }

          .back-link-bar {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Technical section: stack metadata above description on mobile */
          .technical-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }

          /* Remove sticky positioning on mobile — it causes scroll issues */
          .technical-meta {
            position: static !important;
            top: auto !important;
            /* On mobile: display as a compact horizontal wrap instead of vertical stack */
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.25rem !important;
          }

          /* Links row inside metadata goes full width */
          .technical-meta > div:last-child {
            grid-column: 1 / -1 !important;
          }

          .next-project-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Next project: stack arrow below text on very small screens */
          .next-project-link {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }

        /* ── Tablet (640px – 1023px) ────────────────────────────────────── */
        @media (min-width: 640px) and (max-width: 1023px) {

          .detail-section {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }

          .screenshots-section {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }

          .back-link-bar {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }

          /* Technical grid: narrower meta column on tablet */
          .technical-grid {
            grid-template-columns: 160px 1fr !important;
            gap: 2.5rem !important;
          }

          .next-project-section {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }
        }
      `}</style>
    </PageWrapper>
  )
}