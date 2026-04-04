import PageWrapper     from '@components/layout/PageWrapper'
import Button          from '@components/ui/Button'
import SceneBackground from '@components/layout/SceneBackground'

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <section style={{
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        padding:    'clamp(4rem, 8vw, 8rem) 2.5rem',
        position:   'relative',
        overflow:   'hidden',
      }}>
        <SceneBackground
          gridOpacity={0.13}
          glow1Color="rgba(71,49,152,0.20)"
          glow2Color="rgba(71,49,152,0.10)"
          glow1Pos={{ top: '5%', right: '-5%' }}
          glow2Pos={{ bottom: '-10%', left: '-5%' }}
          scanLine
          parallaxStrength={0.9}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

          <span data-gsap="fade-in" style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.63rem',
            color:         'rgba(71,49,152,0.7)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display:       'block',
            marginBottom:  '1.5rem',
          }}>
            // Error 404
          </span>

          <h1 data-gsap="fade-up" style={{
            fontFamily:       'var(--font-display)',
            fontSize:         'clamp(8rem, 25vw, 22rem)',
            fontWeight:       700,
            letterSpacing:    '-0.05em',
            lineHeight:       0.85,
            color:            'transparent',
            WebkitTextStroke: '1px rgba(245,245,245,0.1)',
            marginBottom:     '3rem',
            userSelect:       'none',
            display:          'block',
          }}>
            404
          </h1>

          <div data-gsap="fade-up" style={{
            maxWidth:    '480px',
            borderLeft:  '2px solid var(--border)',
            paddingLeft: '1.5rem',
            marginBottom:'3rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.8rem',
              color:      'var(--muted)',
              lineHeight: 1.9,
            }}>
              This page doesn't exist. Either you typed something wrong,
              followed a broken link, or I haven't built it yet.
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.72rem',
              color:      'var(--ghost)',
              lineHeight: 1.8,
              marginTop:  '0.75rem',
            }}>
              The rest of the site is very much alive.
            </p>
          </div>

          <div data-gsap="fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button to="/"         variant="primary">← Back to Home</Button>
            <Button to="/projects" variant="ghost">View Projects →</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}