import { useRef, useState } from 'react'
import PageWrapper from '@components/layout/PageWrapper'
import SEO        from '@components/seo/SEO'
import Button     from '@components/ui/Button'
import { META }   from '@data/meta'
import { SITE }   from '@utils/constants'

const inputStyle = {
  width:          '100%',
  background:     'rgba(255,255,255,0.03)',
  border:         '1px solid var(--border)',
  borderRadius:   '10px',
  padding:        '0.85rem 1.1rem',
  fontFamily:     'var(--font-mono)',
  fontSize:       '0.78rem',
  color:          'var(--text)',
  outline:        'none',
  transition:     'border-color 0.2s ease, background 0.2s ease',
  lineHeight:     1.6,
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      formRef.current?.reset()
    }, 1200)
  }

  return (
    <PageWrapper>
      <SEO title={META.contact.title} description={META.contact.description} />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem', position: 'relative', overflow: 'hidden' }}>

        {/* Background glow */}
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

          {/* Heading */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '0.75rem',
              marginBottom:  '2rem',
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

          {/* Grid */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'clamp(3rem, 6vw, 7rem)',
            alignItems:          'start',
          }} className="contact-grid">

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              data-gsap="fade-up"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {[
                { name: 'name',  label: 'Your Name',     type: 'text',  placeholder: 'Saksham Srivastava' },
                { name: 'email', label: 'Email Address',  type: 'email', placeholder: 'you@domain.com'    },
              ].map(field => (
                <div key={field.name}>
                  <label style={{
                    display:       'block',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.58rem',
                    color:         'var(--muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom:  '0.55rem',
                  }}>
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(71,49,152,0.6)'
                      e.target.style.background  = 'rgba(71,49,152,0.04)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.background  = 'rgba(255,255,255,0.03)'
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{
                  display:       'block',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.58rem',
                  color:         'var(--muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom:  '0.55rem',
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="What are you building? What do you need?"
                  required
                  style={{ ...inputStyle, borderRadius: '10px', resize: 'vertical' }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(71,49,152,0.6)'
                    e.target.style.background  = 'rgba(71,49,152,0.04)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.background  = 'rgba(255,255,255,0.03)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary" style={{ alignSelf: 'flex-start' }}>
                  {status === 'sending' ? 'Sending...'
                    : status === 'sent'    ? 'Sent ✓'
                    : 'Send Message →'}
                </Button>
                {status === 'sent' && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '0.65rem',
                    color:      'rgba(74,222,128,0.8)',
                  }}>
                    I'll get back to you soon.
                  </span>
                )}
              </div>
            </form>

            {/* Links */}
            <div data-gsap="fade-up">
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                color:         'var(--ghost)',
                letterSpacing: '0.08em',
                marginBottom:  '1.5rem',
                textTransform: 'uppercase',
              }}>
                Or reach out directly
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { label: 'Email',    value: SITE.email,                href: `mailto:${SITE.email}`, arrow: '→', external: false },
                  { label: 'GitHub',   value: 'github.com/srivas-saksham', href: SITE.github,          arrow: '↗', external: true  },
                  { label: 'LinkedIn', value: 'linkedin.com/in/srivas-saksham', href: SITE.linkedin,   arrow: '↗', external: true  },
                  { label: 'Resume',   value: 'Download PDF',             href: SITE.resume,           arrow: '↓', external: false },
                ].map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display:         'flex',
                      justifyContent:  'space-between',
                      alignItems:      'center',
                      padding:         '1.4rem 0',
                      borderBottom:    '1px solid var(--border)',
                      borderTop:       i === 0 ? '1px solid var(--border)' : 'none',
                      textDecoration:  'none',
                      cursor:          'none',
                      transition:      'padding-left 0.25s ease, background 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.paddingLeft = '1rem'
                      e.currentTarget.style.background  = 'rgba(71,49,152,0.04)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.paddingLeft = '0'
                      e.currentTarget.style.background  = 'transparent'
                    }}
                  >
                    <div>
                      <span style={{
                        display:       'block',
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.55rem',
                        color:         'var(--ghost)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom:  '0.3rem',
                      }}>
                        {link.label}
                      </span>
                      <span style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      '1rem',
                        fontWeight:    500,
                        color:         'var(--text)',
                        letterSpacing: '-0.01em',
                      }}>
                        {link.value}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize:   '0.9rem',
                      color:      'var(--muted)',
                    }}>
                      {link.arrow}
                    </span>
                  </a>
                ))}
              </div>

              {/* Response time note */}
              <div style={{
                marginTop:   '2rem',
                padding:     '1rem 1.25rem',
                border:      '1px solid var(--border)',
                background:  'rgba(71,49,152,0.04)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.65rem',
                  color:      'var(--muted)',
                  lineHeight: 1.8,
                }}>
                  <span style={{ color: 'rgba(74,222,128,0.8)' }}>●</span>
                  {' '}Typically respond within 24 hours.
                  Based in New Delhi (IST, UTC+5:30).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}