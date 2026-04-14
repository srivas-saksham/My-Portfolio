import PageWrapper  from '@components/layout/PageWrapper'
import SEO          from '@components/seo/SEO'
import SectionLabel from '@components/ui/SectionLabel'
import Tag          from '@components/ui/Tag'
import Button       from '@components/ui/Button'
import SceneBackground from '@components/layout/SceneBackground'

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
      <SEO
        title={META.about.title}
        description={META.about.description}
        path={META.about.path}
        image={META.about.image}
        keywords={META.about.keywords}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 2.5rem' }} className="about-hero-section">
        <SceneBackground
          gridSize={72}
          gridOpacity={0.11}
          glow1Color="rgba(71,49,152,0.20)"
          glow2Color="rgba(71,49,152,0.10)"
          glow1Pos={{ top: '-10%', right: '-5%' }}
          glow2Pos={{ bottom: '-20%', left: '-12%' }}
          scanLine
          parallaxStrength={0.9}
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="02" label="About" />

          {/*
            Desktop: 2-col grid (title left, cards right)
            Mobile:  single column — title first, then CTA buttons, then cards below
          */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 'clamp(3rem, 6vw, 7rem)',
              alignItems:          'start',
              marginBottom:        'clamp(3rem, 5vw, 5rem)',
            }}
            className="about-hero-grid"
          >
            {/* Left — title */}
            <div>
              <h1
                data-gsap="fade-up"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(2.6rem, 6vw, 5.5rem)',
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
              <div
                data-gsap="fade-up"
                style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
                className="about-cta-buttons"
              >
                <Button href={SITE.resume}   variant="ghost" external>Resume ↓</Button>
                <Button href={SITE.github}   variant="ghost" external>GitHub ↗</Button>
                <Button href={SITE.linkedin} variant="ghost" external>LinkedIn ↗</Button>
              </div>
            </div>

            {/* Right — AboutCards */}
            <AboutCards />
          </div>

          {/* Bio block — portrait + detail rows */}
          <div style={{
            paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
            borderTop:  '1px solid var(--border)',
          }}>
            <AboutBio />
          </div>
        </div>
      </section>

      {/* ── Stack ─────────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
          background: 'var(--bg-1)',
          borderTop:  '1px solid var(--border)',
        }}
        className="about-stack-section"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="I" label="Tech Stack" />
          <StackGrid />
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────── */}
      <section
        style={{
          padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
          background: 'var(--bg-base)',
          borderTop:  '1px solid var(--border)',
        }}
        className="about-edu-section"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="II" label="Education" />

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
                fontSize:      'clamp(1.15rem, 3vw, 1.4rem)',
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
                fontSize:     '0.72rem',
                color:        'var(--muted)',
                marginBottom: '0.5rem',
                lineHeight:   1.7,
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
      <section
        style={{
          padding:    'clamp(4rem, 6vw, 6rem) 2.5rem',
          background: 'var(--bg-1)',
          borderTop:  '1px solid var(--border)',
        }}
        className="about-achievements-section"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel index="III" label="Achievements" />
          <Timeline items={ACHIEVEMENTS} />
        </div>
      </section>

      {/* ── Responsive styles ─────────────────────────────────── */}
      <style>{`
        /* ── Mobile (< 640px) ─────────────────────────────────── */
        @media (max-width: 639px) {

          /* Hero section padding */
          .about-hero-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /* Stack, edu, achievements sections */
          .about-stack-section,
          .about-edu-section,
          .about-achievements-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          /*
            Hero grid: single column
            Order: title → CTA (stay inside left col) → cards
          */
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          /* CTA buttons: wrap and stack on very small screens */
          .about-cta-buttons {
            gap: 0.6rem !important;
          }

          /*
            AboutBio inner grid is handled by its own component
            but the bio-inner-grid override in globals.css handles it.
            We ensure bio section doesn't overflow.
          */
        }

        /* ── Tablet (640px – 1023px) ─────────────────────────── */
        @media (min-width: 640px) and (max-width: 1023px) {

          .about-hero-section {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }

          .about-stack-section,
          .about-edu-section,
          .about-achievements-section {
            padding-left: 1.75rem !important;
            padding-right: 1.75rem !important;
          }

          /*
            Tablet: collapse the 2-col hero grid to single column.
            The about cards take up too much space on tablet otherwise.
          */
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </PageWrapper>
  )
}