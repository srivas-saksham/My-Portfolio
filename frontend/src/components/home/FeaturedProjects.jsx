import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@data/projects'
import SectionLabel from '@components/ui/SectionLabel'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = PROJECTS.slice(0, 3)

// ─── Single Project Row ───────────────────────────────────────────────────────
function ProjectRow({ project, index }) {
  const rowRef   = useRef(null)
  const glowRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mouseLocal, setMouseLocal] = useState({ x: 0.5, y: 0.5 })

  // 3D tilt on hover
  const onMouseMove = (e) => {
    const rect = rowRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top)  / rect.height
    setMouseLocal({ x, y })

    const rotX = (y - 0.5) * -6
    const rotY = (x - 0.5) *  6

    gsap.to(rowRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power2.out',
      transformStyle: 'preserve-3d',
    })

    // Move white glow to mouse position
    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`
      glowRef.current.style.top  = `${y * 100}%`
    }
  }

  const onMouseLeave = () => {
    setHovered(false)
    gsap.to(rowRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'expo.out',
    })
  }

  return (
    <div
      data-gsap="fade-up"
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
    >
      <Link
        ref={rowRef}
        to={`/projects/${project.slug}`}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          display:             'grid',
          gridTemplateColumns: '3.5rem 1fr auto',
          gap:                 '1.75rem',
          alignItems:          'start',
          padding:             '2.25rem 2rem',
          marginBottom:        '1px',
          background:          hovered
            ? 'rgba(255,255,255,0.035)'
            : 'rgba(255,255,255,0.015)',
          border:              `1px solid ${hovered
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(255,255,255,0.045)'}`,
          borderRadius:        '16px',
          cursor:              'none',
          textDecoration:      'none',
          position:            'relative',
          overflow:            'hidden',
          transition:          'background 0.35s ease, border-color 0.35s ease',
          backdropFilter:      hovered ? 'blur(8px)' : 'blur(2px)',
          transformStyle:      'preserve-3d',
          willChange:          'transform',
          boxShadow:           hovered
            ? '0 24px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)'
            : '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Radial white glow that follows mouse */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position:      'absolute',
            width:         '240px',
            height:        '240px',
            borderRadius:  '50%',
            background:    'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
            transform:     'translate(-50%,-50%)',
            pointerEvents: 'none',
            transition:    'opacity 0.3s ease',
            opacity:       hovered ? 1 : 0,
            zIndex:        0,
            left:          `${mouseLocal.x * 100}%`,
            top:           `${mouseLocal.y * 100}%`,
          }}
        />

        {/* Top edge shine */}
        {hovered && (
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              top:        0,
              left:       '10%',
              right:      '10%',
              height:     '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              zIndex:     0,
            }}
          />
        )}

        {/* Number */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         hovered ? 'rgba(255,255,255,0.25)' : 'var(--ghost)',
          letterSpacing: '0.08em',
          paddingTop:    '0.25rem',
          transition:    'color 0.3s ease',
          position:      'relative',
          zIndex:        1,
          transform:     'translateZ(8px)',
        }}>
          {project.id}
        </span>

        {/* Body */}
        <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(12px)' }}>
          <div style={{
            display:      'flex',
            flexWrap:     'wrap',
            gap:          '0.35rem',
            marginBottom: '0.8rem',
          }}>
            {project.tags.slice(0, 4).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <h3 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.5rem, 2.8vw, 2.2rem)',
            fontWeight:    600,
            letterSpacing: '-0.03em',
            lineHeight:    0.95,
            color:         'var(--text)',
            marginBottom:  '0.65rem',
            transition:    'color 0.25s ease',
            // Subtle white light on hover
            textShadow:    hovered
              ? '0 0 40px rgba(255,255,255,0.12), 0 1px 0 rgba(255,255,255,0.05)'
              : 'none',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.73rem',
            color:      'var(--muted)',
            lineHeight: 1.85,
            maxWidth:   '560px',
            transition: 'color 0.3s ease',
          }}>
            {project.tagline}
          </p>

          {/* Status + Year */}
          <div style={{
            display:    'flex',
            gap:        '0.5rem',
            marginTop:  '1rem',
            alignItems: 'center',
          }}>
            <Tag variant={project.status === 'Live' ? 'indigo' : 'ghost'}>
              {project.status}
            </Tag>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              color:         'var(--ghost)',
              letterSpacing: '0.08em',
            }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          paddingTop:  '0.25rem',
          position:    'relative',
          zIndex:      1,
          transform:   `translateZ(16px) rotate(${hovered ? '0' : '-45'}deg)`,
          transition:  'transform 0.3s cubic-bezier(0.19,1,0.22,1)',
          display:     'flex',
          flexDirection:'column',
          alignItems:  'center',
          gap:         '0.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '1.1rem',
            color:      hovered ? 'var(--text)' : 'var(--ghost)',
            display:    'block',
            transition: 'color 0.25s ease',
          }}>
            ↗
          </span>
        </div>
      </Link>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Section-level mouse tracking for background blobs
  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding:    'clamp(5rem, 8vw, 9rem) 2.5rem',
        background: 'var(--bg-1)',
        position:   'relative',
        overflow:   'hidden',
        borderTop:  '1px solid rgba(255,255,255,0.035)',
      }}
    >
      {/* Background: slow parallax white bloom following mouse */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          width:      '50vw',
          height:     '50vw',
          borderRadius:'50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex:     0,
          left:       `${(mousePos.x / window.innerWidth) * 30 + 30}%`,
          top:        `${(mousePos.y / window.innerHeight) * 30 + 10}%`,
          transform:  'translate(-50%,-50%)',
          transition: 'left 1.8s ease, top 1.8s ease',
          filter:     'blur(2px)',
        }}
      />

      {/* Floating geometric accent — section level */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          top:         '10%',
          right:       '-2%',
          width:       'clamp(100px, 12vw, 200px)',
          height:      'clamp(100px, 12vw, 200px)',
          borderRadius:'50%',
          border:      '1px solid rgba(255,255,255,0.04)',
          background:  'radial-gradient(ellipse at 35% 35%, rgba(255,255,255,0.025) 0%, transparent 65%)',
          animation:   'floatA 10s ease-in-out infinite',
          zIndex:      0,
          pointerEvents:'none',
        }}
      />

      {/* Indigo dim glow bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position:    'absolute',
          bottom:      '-5%',
          left:        '-5%',
          width:       '35vw',
          height:      '35vw',
          borderRadius:'50%',
          background:  'radial-gradient(ellipse, rgba(71,49,152,0.06) 0%, transparent 65%)',
          pointerEvents:'none',
          zIndex:      0,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div
          data-gsap="fade-up"
          style={{
            display:         'flex',
            alignItems:      'flex-end',
            justifyContent:  'space-between',
            flexWrap:        'wrap',
            gap:             '2rem',
            marginBottom:    '3.5rem',
          }}
        >
          <div>
            <SectionLabel index="02" label="Selected Work" />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.73rem',
              color:      'var(--muted)',
              lineHeight: 1.8,
              maxWidth:   '380px',
              marginTop:  '-1.5rem',
            }}>
              Production projects — AI systems, web platforms, and brand infrastructure.
            </p>
          </div>

          <Button to="/projects" variant="ghost">
            View All Work →
          </Button>
        </div>

        {/* Project rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FEATURED.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA — centered */}
        <div
          data-gsap="fade-up"
          style={{
            marginTop:      '4rem',
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            gap:            '1.5rem',
          }}
        >
          {/* Divider lines */}
          <div style={{
            flex:       1,
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06))',
            maxWidth:   '200px',
          }} />

          <Button to="/projects" variant="ghost" style={{ fontSize: '0.68rem', letterSpacing: '0.12em' }}>
            All {PROJECTS.length} Projects ↗
          </Button>

          <div style={{
            flex:       1,
            height:     '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)',
            maxWidth:   '200px',
          }} />
        </div>
      </div>

      {/* Inject floatA keyframe if not already in DOM */}
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  )
}