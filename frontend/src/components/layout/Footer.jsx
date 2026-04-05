import { Link } from 'react-router-dom'
import { SITE, NAV_LINKS } from '@utils/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      position:   'relative',
      background: '#2a1d5e',
      borderTop:  '1px solid rgba(255,255,255,0.08)',
      overflow:   'hidden',
    }}>
      {/* Deep indigo gradient overlay for depth */}
      <div style={{
        position:      'absolute',
        inset:         0,
        background:    'linear-gradient(135deg, #1e1248 0%, #2a1d5e 40%, #1a1040 100%)',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      {/* Top-right glow accent */}
      <div style={{
        position:      'absolute',
        top:           '-20%',
        right:         '-5%',
        width:         '45vw',
        height:        '45vw',
        background:    'radial-gradient(ellipse, rgba(138,100,255,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      {/* Bottom-left glow accent */}
      <div style={{
        position:      'absolute',
        bottom:        '-30%',
        left:          '50%',
        transform:     'translateX(-50%)',
        width:         '60vw',
        height:        '30vw',
        background:    'radial-gradient(ellipse, rgba(71,49,152,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      <div style={{
        maxWidth: '1200px',
        margin:   '0 auto',
        padding:  '4rem 2.5rem 2.5rem',
        position: 'relative',
        zIndex:   1,
      }}>

        {/* Top row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          flexWrap:       'wrap',
          gap:            '3rem',
          paddingBottom:  '3rem',
          borderBottom:   '1px solid rgba(255,255,255,0.1)',
          marginBottom:   '2rem',
        }}>

          {/* Left — identity */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2rem, 4vw, 3rem)',
              fontWeight:    600,
              letterSpacing: '-0.04em',
              lineHeight:    0.9,
              color:         '#ffffff',
              marginBottom:  '1.25rem',
            }}>
              Let's build<br />
              <span style={{
                fontStyle:        'italic',
                fontWeight:       300,
                color:            'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.45)',
              }}>
                together.
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.72rem',
              color:      'rgba(255,255,255,0.55)',
              lineHeight: 1.9,
            }}>
              Open to freelance, collaboration,<br />and serious opportunities.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '0.5rem',
                marginTop:     '1.5rem',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                color:         '#ffffff',
                textDecoration:'none',
                borderBottom:  '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '2px',
                transition:    'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.color = '#ffffff'
              }}
            >
              {SITE.email} →
            </a>
          </div>

          {/* Right — nav columns */}
          <div style={{
            display: 'flex',
            gap:     '4rem',
            flexWrap:'wrap',
          }}>
            <div>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.58rem',
                color:         'rgba(255,255,255,0.35)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '1.25rem',
              }}>
                Navigation
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={{
                      fontFamily:     'var(--font-mono)',
                      fontSize:       '0.72rem',
                      color:          'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition:     'color 0.2s ease',
                      letterSpacing:  '0.04em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.58rem',
                color:         'rgba(255,255,255,0.35)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '1.25rem',
              }}>
                Connect
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'GitHub',   href: SITE.github   },
                  { label: 'LinkedIn', href: SITE.linkedin  },
                  { label: 'Resume',   href: SITE.resume    },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:     'var(--font-mono)',
                      fontSize:       '0.72rem',
                      color:          'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition:     'color 0.2s ease',
                      letterSpacing:  '0.04em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            '1rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.63rem',
            color:         'rgba(255,255,255,0.3)',
            letterSpacing: '0.06em',
          }}>
            © {year} Saksham Srivastava — All rights reserved
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.63rem',
            color:         'rgba(255,255,255,0.3)',
            letterSpacing: '0.06em',
          }}>
            Built with{' '}
            <span style={{ color: 'rgba(178,151,255,0.9)' }}>precision</span>
            {' '}— New Delhi, India
          </span>
        </div>
      </div>
    </footer>
  )
}