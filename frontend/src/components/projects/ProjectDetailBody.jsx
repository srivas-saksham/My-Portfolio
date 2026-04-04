export default function ProjectDetailBody({ project }) {
  return (
    <section style={{
      padding:     'clamp(3rem, 5vw, 5rem) 2.5rem clamp(5rem, 8vw, 8rem)',
      borderTop:   '1px solid var(--border)',
      background:  'var(--bg-1)',
    }}>
      <div style={{
        maxWidth:            '1200px',
        margin:              '0 auto',
        display:             'grid',
        gridTemplateColumns: '1fr 2fr',
        gap:                 'clamp(3rem, 6vw, 7rem)',
        alignItems:          'start',
      }}
        className="project-body-grid"
      >

        {/* Left — metadata column */}
        <div data-gsap="fade-up">

          {/* Stack */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              color:         'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '0.85rem',
            }}>
              Stack
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {project.stack.map(item => (
                <span key={item} style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.78rem',
                  color:         'var(--text)',
                  letterSpacing: '0.04em',
                }}>
                  — {item}
                </span>
              ))}
            </div>
          </div>

          {/* Year */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              color:         'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '0.85rem',
            }}>
              Year
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.78rem',
              color:         'var(--text)',
            }}>
              {project.year}
            </span>
          </div>

          {/* Status */}
          <div>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.62rem',
              color:         'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '0.85rem',
            }}>
              Status
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.78rem',
              color:         'var(--text)',
            }}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Right — description column */}
        <div data-gsap="fade-up">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.88rem',
            color:      'var(--muted)',
            lineHeight: 2,
            maxWidth:   '620px',
          }}>
            {project.description}
          </p>
        </div>

      </div>
    </section>
  )
}