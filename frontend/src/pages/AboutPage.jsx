import PageWrapper  from '@components/layout/PageWrapper'
import SEO         from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag         from '@components/ui/Tag'
import Button      from '@components/ui/Button'
import { STACK }   from '@data/stack'
import { META }    from '@data/meta'
import { SITE }    from '@utils/constants'

const CATEGORIES = [...new Set(STACK.map(s => s.category))]

export default function AboutPage() {
  return (
    <PageWrapper>
      <SEO title={META.about.title} description={META.about.description} />

      {/* Hero */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="01" label="About" />

          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 'clamp(3rem, 6vw, 7rem)',
            alignItems:          'start',
          }}
            className="about-grid"
          >
            {/* Left */}
            <div>
              <h1
                data-gsap="fade-up"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight:    600,
                  letterSpacing: '-0.04em',
                  lineHeight:    0.9,
                  color:         'var(--text)',
                  marginBottom:  '2.5rem',
                }}
              >
                Builder.{' '}
                <span style={{
                  fontStyle:        'italic',
                  fontWeight:       300,
                  color:            'transparent',
                  WebkitTextStroke: '1px rgba(245,245,245,0.25)',
                }}>
                  Not just a
                </span>
                {' '}Dev.
              </h1>

              <div data-gsap="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  BCA 2nd year at Vivekanand Institute of Professional Studies, New Delhi.
                  Not waiting to graduate to build real things.
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  I build production-level systems — AI-driven workflows, full-stack platforms,
                  automation pipelines. The stack is always in service of the product, never
                  the other way around.
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  6 days a week in the gym. Same discipline, different domain.
                </p>
              </div>

              <div data-gsap="fade-up" style={{ marginTop: '2.5rem' }}>
                <Button href={SITE.resume} variant="ghost" external>
                  Download Resume ↓
                </Button>
              </div>
            </div>

            {/* Right — cards */}
            <div
              data-gsap="fade-up"
              style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}
            >
              {[
                {
                  index: '01',
                  title: 'Full-Stack Engineering',
                  body:  'React, Next.js, Node, Express, Supabase, PostgreSQL. End-to-end ownership from schema to UI.',
                },
                {
                  index: '02',
                  title: 'AI Integration',
                  body:  'Self-hosted LLMs via Ollama, AI workflow automation via Relay.app, embedded intelligence into products — not bolted on.',
                },
                {
                  index: '03',
                  title: 'Systems Thinking',
                  body:  'Building Rizara from zero. Cloudflare tunnels, Android TV pipelines, automation at scale.',
                },
              ].map(card => (
                <div
                  key={card.index}
                  style={{
                    background: 'var(--bg-1)',
                    padding:    '1.75rem',
                    borderRadius: 0,
                  }}
                >
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6rem',
                    color:         'var(--indigo)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity:       0.8,
                    display:       'block',
                    marginBottom:  '0.75rem',
                  }}>
                    {card.index}
                  </span>
                  <h3 style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      '1.1rem',
                    fontWeight:    600,
                    letterSpacing: '-0.02em',
                    color:         'var(--text)',
                    marginBottom:  '0.6rem',
                    lineHeight:    1.1,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '0.75rem',
                    color:      'var(--muted)',
                    lineHeight: 1.85,
                  }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section style={{
        padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-1)',
        borderTop:  '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="02" label="Stack" />

          {CATEGORIES.map(cat => (
            <div key={cat} data-gsap="fade-up" style={{ marginBottom: '2.5rem' }}>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                color:         'var(--muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '0.85rem',
              }}>
                {cat}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {STACK.filter(s => s.category === cat).map(s => (
                  <Tag key={s.name}>{s.name}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}