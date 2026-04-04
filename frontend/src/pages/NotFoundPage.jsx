import PageWrapper from '@components/layout/PageWrapper'
import Button      from '@components/ui/Button'

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <section style={{
        minHeight:      '80vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'flex-start',
        justifyContent: 'center',
        padding:        'clamp(4rem, 8vw, 8rem) 2.5rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

          <span
            data-gsap="fade-in"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display:       'block',
              marginBottom:  '1.5rem',
            }}
          >
            // 404
          </span>

          <h1
            data-gsap="fade-up"
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(6rem, 20vw, 18rem)',
              fontWeight:    700,
              letterSpacing: '-0.05em',
              lineHeight:    0.85,
              color:         'transparent',
              WebkitTextStroke: '1px rgba(245,245,245,0.15)',
              marginBottom:  '3rem',
              userSelect:    'none',
            }}
          >
            404
          </h1>

          <p
            data-gsap="fade-up"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.8rem',
              color:         'var(--muted)',
              lineHeight:    1.8,
              maxWidth:      '360px',
              marginBottom:  '2.5rem',
            }}
          >
            This page doesn't exist. Either you typed something wrong
            or I haven't built it yet.
          </p>

          <div data-gsap="fade-up">
            <Button to="/" variant="ghost">← Back to Home</Button>
          </div>

        </div>
      </section>
    </PageWrapper>
  )
}