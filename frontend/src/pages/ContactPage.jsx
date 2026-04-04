import PageWrapper    from '@components/layout/PageWrapper'
import SEO            from '@components/seo/SEO'

// ── New components wired in ───────────────────────────────────────────────────
import ContactForm  from '@components/contact/ContactForm'
import ContactLinks from '@components/contact/ContactLinks'

import { META } from '@data/meta'

export default function ContactPage() {
  return (
    <PageWrapper>
      <SEO title={META.contact.title} description={META.contact.description} />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem', position: 'relative', overflow: 'hidden' }}>

        {/* Background glow — unchanged */}
        <div style={{
          position:      'absolute',
          top:           '20%',
          right:         '-10%',
          width:         '50vw',
          height:        '50vw',
          background:    'radial-gradient(ellipse, rgba(71,49,152,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Heading — unchanged */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '0.75rem',
              marginBottom: '2rem',
            }}>
              <div style={{
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   'var(--indigo)',
                boxShadow:    '0 0 8px rgba(71,49,152,0.8)',
              }} />
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                color:         'var(--muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                04 — Contact
              </span>
            </div>

            <h1
              data-gsap="fade-up"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4rem, 10vw, 9rem)',
                fontWeight:    600,
                letterSpacing: '-0.04em',
                lineHeight:    0.88,
                color:         'var(--text)',
                marginBottom:  '2rem',
              }}
            >
              Let's build<br />
              <span style={{
                fontStyle:        'italic',
                fontWeight:       300,
                color:            'transparent',
                WebkitTextStroke: '1px rgba(245,245,245,0.3)',
              }}>
                something real.
              </span>
            </h1>

            <p data-gsap="fade-up" style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.78rem',
              color:      'var(--muted)',
              lineHeight: 1.9,
              maxWidth:   '420px',
            }}>
              Open to freelance, collaboration, and full-time opportunities.
              If you're building something serious — let's talk.
            </p>
          </div>

          {/* Two-column grid — ContactForm left, ContactLinks right */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'clamp(3rem, 6vw, 7rem)',
            alignItems:          'start',
          }} className="contact-grid">

            {/* Left — ContactForm component (replaces inline form) */}
            <ContactForm />

            {/* Right — ContactLinks component (replaces inline links) */}
            <ContactLinks />

          </div>
        </div>
      </section>
    </PageWrapper>
  )
}