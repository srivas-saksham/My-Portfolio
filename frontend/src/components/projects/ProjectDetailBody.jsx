export default function ProjectDetailBody({ project }) {
  return (
    <section style={{
      padding:    'clamp(3rem, 5vw, 5rem) 2.5rem clamp(5rem, 8vw, 8rem)',
      borderTop:  '1px solid var(--border)',
      background: 'var(--bg-1)',
      position:   'relative',
    }}>
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        height:     '1px',
        background: 'linear-gradient(90deg, transparent, rgba(71,49,152,0.4) 50%, transparent)',
      }} />

      <div style={{
        maxWidth:            '1200px',
        margin:              '0 auto',
        display:             'grid',
        gridTemplateColumns: '200px 1fr',
        gap:                 'clamp(3rem, 6vw, 7rem)',
        alignItems:          'start',
      }} className="project-body-grid">

        {/* Left metadata */}
        <div data-gsap="fade-up" style={{
          position:  'sticky',
          top:       '100px',
          display:   'flex',
          flexDirection: 'column',
          gap:       '2rem',
        }}>
          {[
            { label: 'Stack',  value: project.stack.join('\n')  },
            { label: 'Year',   value: project.year               },
            { label: 'Status', value: project.status             },
          ].map(item => (
            <div key={item.label}>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                color:         'var(--ghost)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '0.6rem',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         'var(--muted)',
                letterSpacing: '0.02em',
                lineHeight:    1.8,
                whiteSpace:    'pre-line',
                display:       'block',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right description */}
        <div data-gsap="fade-up">
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.85rem',
            color:      'var(--muted)',
            lineHeight: 2.1,
            maxWidth:   '640px',
            marginBottom:'2.5rem',
          }}>
            {project.description}
          </p>

          {/* Divider */}
          <div style={{
            height:     '1px',
            background: 'var(--border)',
            marginBottom:'2.5rem',
            maxWidth:   '640px',
          }} />

          {/* Tags detail */}
          <div>
            <span style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              color:         'var(--ghost)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom:  '1rem',
            }}>
              Technologies Used
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.7rem',
                  color:         'var(--muted)',
                  padding:       '0.3rem 0.85rem',
                  border:        '1px solid var(--border)',
                  letterSpacing: '0.04em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}