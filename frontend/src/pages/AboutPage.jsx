import PageWrapper  from '@components/layout/PageWrapper'
import SEO          from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag          from '@components/ui/Tag'
import Button       from '@components/ui/Button'

// ── New components wired in ───────────────────────────────────────────────────
import AboutBio   from '@components/about/AboutBio'
import AboutCards from '@components/about/AboutCards'
import StackGrid  from '@components/about/StackGrid'
import Timeline   from '@components/about/Timeline'

import { META } from '@data/meta'
import { SITE } from '@utils/constants'

const ACHIEVEMENTS = [
  {
    year:  '2025',
    title: 'IBM AI Agent Internship',
    body:  'Completed hands-on internship in AI applications and real-world problem-solving. Built PathForge as the internship project.',
    tag:   'Internship',
    type:  'internship',
  },
  {
    year:  '2025',
    title: 'IBM — Rise of Multiagent AI Agents',
    body:  'Completed specialized training on Multiagent AI systems — collaboration, communication, and deployment strategies for complex AI ecosystems.',
    tag:   'Certification',
    type:  'certification',
  },
  {
    year:  '2025',
    title: 'IBM — Unleashing the Power of AI Agents',
    body:  'Advanced training on developing and optimizing AI Agents. Focused on efficiency, scalability, and automation.',
    tag:   'Certification',
    type:  'certification',
  },
  {
    year:  '2025',
    title: 'IBM — Getting Started with AI Agents',
    body:  'Foundational training on AI Agent concepts, workflows, and practical implementations.',
    tag:   'Certification',
    type:  'certification',
  },
  {
    year:  '2023',
    title: 'MSI Creator Awards — Top 10',
    body:  'Ranked in the Top 10 Creations globally in the Animation Category.',
    tag:   'Award',
    type:  'award',
  },
  {
    year:  '2023',
    title: 'ByteTalks — Presentation Award',
    body:  'Recognized for outstanding presentation on Emotional Intelligence and Critical Thinking. Strong communication, teamwork, and leadership.',
    tag:   'Award',
    type:  'award',
  },
  {
    year:  '2022',
    title: 'MSI Creator Awards — Top 50',
    body:  'Ranked in the Top 50 Creations globally in the Animation Category.',
    tag:   'Award',
    type:  'award',
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

          {/* Page title + bio copy — unchanged layout */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 'clamp(3rem, 6vw, 7rem)',
              alignItems:          'start',
              marginBottom:        'clamp(3rem, 5vw, 5rem)',
            }}
            className="about-grid"
          >
            {/* Left — title */}
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

              {/* CTA buttons */}
              <div data-gsap="fade-up" style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button href={SITE.resume}   variant="ghost" external>Resume ↓</Button>
                <Button href={SITE.github}   variant="ghost" external>GitHub ↗</Button>
                <Button href={SITE.linkedin} variant="ghost" external>LinkedIn ↗</Button>
              </div>
            </div>

            {/* Right — specialization cards (AboutCards replaces the inline cards) */}
            <AboutCards />
          </div>

          {/* Bio block — portrait + detail rows (AboutBio) */}
          <div style={{
            paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
            borderTop:  '1px solid var(--border)',
          }}>
            <AboutBio />
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
          {/* StackGrid replaces the inline category loop */}
          <StackGrid />
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
                fontFamily:   'var(--font-mono)',
                fontSize:     '0.75rem',
                color:        'var(--muted)',
                marginBottom: '0.5rem',
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

      {/* ── Achievements — Timeline replaces the inline grid ──── */}
      <section style={{
        padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
        background: 'var(--bg-1)',
        borderTop:  '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="04" label="Achievements" />
          <Timeline items={ACHIEVEMENTS} />
        </div>
      </section>
    </PageWrapper>
  )
}