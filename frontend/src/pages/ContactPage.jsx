import { useRef, useState } from 'react'
import PageWrapper          from '@components/layout/PageWrapper'
import SEO                 from '@components/seo/SEO'
import Button              from '@components/ui/Button'
import { META }            from '@data/meta'
import { SITE }            from '@utils/constants'

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const data = {
      name:    e.target.name.value,
      email:   e.target.email.value,
      message: e.target.message.value,
    }

    // EmailJS or your own handler — wire up in .env.local
    // For now, simulates success after 1.2s
    setTimeout(() => {
      setStatus('sent')
      formRef.current?.reset()
    }, 1200)
  }

  return (
    <PageWrapper>
      <SEO title={META.contact.title} description={META.contact.description} />

      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Heading */}
          <div style={{ marginBottom: '5rem' }}>
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
              Let's build
              <br />
              <span style={{
                fontStyle:        'italic',
                fontWeight:       300,
                color:            'transparent',
                WebkitTextStroke: '1px rgba(245,245,245,0.25)',
              }}>
                something.
              </span>
            </h1>
            <p
              data-gsap="fade-up"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize:   '0.78rem',
                color:      'var(--muted)',
                lineHeight: 1.9,
                maxWidth:   '420px',
              }}
            >
              Open to freelance, collaboration, and full-time.
              If you're building something serious, let's talk.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'clamp(3rem, 6vw, 7rem)',
            alignItems:          'start',
          }}
            className="contact-grid"
          >
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              data-gsap="fade-up"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {[
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your name'          },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com'     },
              ].map(field => (
                <div key={field.name}>
                  <label style={{
                    display:       'block',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.62rem',
                    color:         'var(--muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom:  '0.5rem',
                  }}>
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    style={{
                      width:         '100%',
                      background:    'var(--bg-1)',
                      border:        '1px solid var(--border)',
                      borderRadius:  'var(--radius-pill)',
                      padding:       '0.75rem 1.25rem',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.78rem',
                      color:         'var(--text)',
                      outline:       'none',
                      transition:    'border-color 0.2s ease',
                    }}
                    onFocus={e  => e.target.style.borderColor = 'var(--muted)'}
                    onBlur={e   => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              ))}

              {/* Message */}
              <div>
                <label style={{
                  display:       'block',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.62rem',
                  color:         'var(--muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom:  '0.5rem',
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="What are you building?"
                  required
                  style={{
                    width:         '100%',
                    background:    'var(--bg-1)',
                    border:        '1px solid var(--border)',
                    borderRadius:  '16px',
                    padding:       '0.85rem 1.25rem',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.78rem',
                    color:         'var(--text)',
                    outline:       'none',
                    resize:        'vertical',
                    transition:    'border-color 0.2s ease',
                    lineHeight:    1.8,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--muted)'}
                  onBlur={e  => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <Button
                variant="primary"
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
              >
                {status === 'sending' ? 'Sending...'
                  : status === 'sent' ? 'Sent ✓'
                  : 'Send Message →'}
              </Button>

              {status === 'error' && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.7rem',
                  color:      '#ef4444',
                }}>
                  Something went wrong. Email me directly.
                </span>
              )}
            </form>

            {/* Right — direct links */}
            <div data-gsap="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Email',    value: SITE.email,    href: `mailto:${SITE.email}`, arrow: '→' },
                { label: 'GitHub',   value: 'github.com/saksham', href: SITE.github,   arrow: '↗' },
                { label: 'LinkedIn', value: 'linkedin.com/in/saksham', href: SITE.linkedin, arrow: '↗' },
                { label: 'Resume',   value: 'Download PDF', href: SITE.resume, arrow: '↓' },
              ].map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' && link.label !== 'Resume' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display:       'flex',
                    justifyContent:'space-between',
                    alignItems:    'center',
                    padding:       '1.5rem 0',
                    borderBottom:  '1px solid var(--border)',
                    borderTop:     i === 0 ? '1px solid var(--border)' : 'none',
                    textDecoration:'none',
                    cursor:        'none',
                    transition:    'background 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = '0.75rem'}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
                >
                  <div>
                    <span style={{
                      display:       'block',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.6rem',
                      color:         'var(--muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom:  '0.3rem',
                    }}>
                      {link.label}
                    </span>
                    <span style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      '1.1rem',
                      fontWeight:    500,
                      color:         'var(--text)',
                      letterSpacing: '-0.01em',
                    }}>
                      {link.value}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '1rem',
                    color:      'var(--muted)',
                  }}>
                    {link.arrow}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}