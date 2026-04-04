import PageWrapper  from '@components/layout/PageWrapper'
import SEO          from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag          from '@components/ui/Tag'
import Button       from '@components/ui/Button'
import { STACK }    from '@data/stack'
import { META }     from '@data/meta'
import { SITE }     from '@utils/constants'

const CATEGORIES = [...new Set(STACK.map(s => s.category))]

const ACHIEVEMENTS = [
  {
    year:  '2025',
    title: 'IBM AI Agent Internship',
    body:  'Completed hands-on internship in AI applications and real-world problem-solving. Built PathForge as the internship project.',
    tag:   'Internship',
  },
  {
    year:  '2025',
    title: 'IBM — Rise of Multiagent AI Agents',
    body:  'Completed specialized training on Multiagent AI systems — collaboration, communication, and deployment strategies for complex AI ecosystems.',
    tag:   'Certification',
  },
  {
    year:  '2025',
    title: 'IBM — Unleashing the Power of AI Agents',
    body:  'Advanced training on developing and optimizing AI Agents. Focused on efficiency, scalability, and automation.',
    tag:   'Certification',
  },
  {
    year:  '2025',
    title: 'IBM — Getting Started with AI Agents',
    body:  'Foundational training on AI Agent concepts, workflows, and practical implementations.',
    tag:   'Certification',
  },
  {
    year:  '2023',
    title: 'MSI Creator Awards — Top 10',
    body:  'Ranked in the Top 10 Creations globally in the Animation Category.',
    tag:   'Award',
  },
  {
    year:  '2023',
    title: 'ByteTalks — Presentation Award',
    body:  'Recognized for outstanding presentation on Emotional Intelligence and Critical Thinking. Strong communication, teamwork, and leadership.',
    tag:   'Award',
  },
  {
    year:  '2022',
    title: 'MSI Creator Awards — Top 50',
    body:  'Ranked in the Top 50 Creations globally in the Animation Category.',
    tag:   'Award',
  },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <SEO title={META.about.title} description={META.about.description} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="01" label="About" />

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 'clamp(3rem, 6vw, 7rem)',
              alignItems:          'start',
            }}
            className="about-grid"
          >
            {/* Left — bio */}
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
                  WebkitTextStroke: '1px rgba(245,245,245,0.2)',
                }}>
                  Not just a
                </span>
                {' '}Dev.
              </h1>

              <div
                data-gsap="fade-up"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  BCA 2nd year at Vivekananda Institute of Professional Studies, New Delhi (Indraprastha University). Not waiting to graduate to build real things.
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  I build production-level systems — AI-driven workflows, full-stack platforms, documentation automation, e-commerce brands. The stack is always in service of the product.
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.82rem',
                  color:      'var(--muted)',
                  lineHeight: 2,
                }}>
                  IBM-certified AI Agent developer. Founder of Rizara Luxe. 6 days a week in the gym — same discipline, different domain.
                </p>
              </div>

              {/* Contact info row */}
              <div
                data-gsap="fade-up"
                style={{
                  display:   'flex',
                  flexWrap:  'wrap',
                  gap:       '1rem',
                  marginTop: '2rem',
                }}
              >
                {[
                  { label: SITE.email,    href: `mailto:${SITE.email}` },
                  { label: SITE.location, href: null },
                ].map(item => (
                  item.href
                    ? (
                      <a
                        key={item.label}
                        href={item.href}
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.65rem',
                          color:         'var(--muted)',
                          letterSpacing: '0.05em',
                          transition:    'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        key={item.label}
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.65rem',
                          color:         'var(--ghost)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.label}
                      </span>
                    )
                ))}
              </div>

              <div data-gsap="fade-up" style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button href={SITE.resume}   variant="ghost" external>Resume ↓</Button>
                <Button href={SITE.github}   variant="ghost" external>GitHub ↗</Button>
                <Button href={SITE.linkedin} variant="ghost" external>LinkedIn ↗</Button>
              </div>
            </div>

            {/* Right — specialization cards */}
            <div
              data-gsap="fade-up"
              style={{
                display:    'flex',
                flexDirection: 'column',
                gap:        '1px',
                background: 'var(--border)',
              }}
            >
              {[
                {
                  index: '01',
                  title: 'Full-Stack Engineering',
                  body:  'React, Next.js, Node, Express, FastAPI, Supabase, PostgreSQL. End-to-end ownership from schema to UI.',
                },
                {
                  index: '02',
                  title: 'AI Integration',
                  body:  'IBM-certified. Self-hosted LLMs via Ollama, Relay.app automation, AI chatbots embedded into client products. Multiagent systems.',
                },
                {
                  index: '03',
                  title: 'Product & Brand Building',
                  body:  'Founded Rizara Luxe — full e-commerce operations, brand identity, and storefront. Built client products from spec to deployment.',
                },
              ].map(card => (
                <div
                  key={card.index}
                  style={{
                    background: 'var(--bg-1)',
                    padding:    '1.75rem',
                  }}
                >
                  <span style={{
                    display:       'block',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6rem',
                    color:         'var(--indigo)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity:       0.8,
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

      {/* ── Stack ─────────────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-1)',
        borderTop:  '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="02" label="Tech Stack" />

          {CATEGORIES.map(cat => (
            <div key={cat} data-gsap="fade-up" style={{ marginBottom: '2rem' }}>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                color:         'var(--muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom:  '0.75rem',
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

      {/* ── Education ─────────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-base)',
        borderTop:  '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="03" label="Education" />

          <div data-gsap="fade-up" style={{
            display:   'flex',
            gap:       '2rem',
            alignItems:'flex-start',
            flexWrap:  'wrap',
          }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--ghost)',
              letterSpacing: '0.08em',
              paddingTop:    '0.2rem',
              minWidth:      '4rem',
            }}>
              2024–27
            </span>
            <div>
              <h3 style={{
                fontFamily:    'var(--font-display)',
                fontSize:      '1.4rem',
                fontWeight:    600,
                letterSpacing: '-0.02em',
                color:         'var(--text)',
                marginBottom:  '0.35rem',
                lineHeight:    1.1,
              }}>
                Bachelor of Computer Applications
              </h3>
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.75rem',
                color:         'var(--muted)',
                marginBottom:  '0.5rem',
              }}>
                Vivekananda Institute of Professional Studies – TC, Indraprastha University, New Delhi
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Tag>2nd Year</Tag>
                <Tag>4th Semester</Tag>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievements ──────────────────────────────────────── */}
      <section style={{
        padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-1)',
        borderTop:  '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="04" label="Achievements" />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ACHIEVEMENTS.map((item, i) => (
              <div
                key={i}
                data-gsap="fade-up"
                style={{
                  display:       'grid',
                  gridTemplateColumns: '3.5rem 1fr auto',
                  gap:           '1.75rem',
                  alignItems:    'start',
                  padding:       '1.75rem 0',
                  borderBottom:  '1px solid var(--border)',
                  borderTop:     i === 0 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.62rem',
                  color:         'var(--ghost)',
                  letterSpacing: '0.06em',
                  paddingTop:    '0.15rem',
                }}>
                  {item.year}
                </span>

                <div>
                  <h4 style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      '1.1rem',
                    fontWeight:    600,
                    letterSpacing: '-0.02em',
                    color:         'var(--text)',
                    marginBottom:  '0.45rem',
                    lineHeight:    1.1,
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '0.72rem',
                    color:      'var(--muted)',
                    lineHeight: 1.8,
                    maxWidth:   '560px',
                  }}>
                    {item.body}
                  </p>
                </div>

                <Tag variant={
                  item.tag === 'Internship'    ? 'indigo'
                  : item.tag === 'Certification' ? 'default'
                  : 'ghost'
                }>
                  {item.tag}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}