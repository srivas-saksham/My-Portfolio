import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Tag    from '@components/ui/Tag'
import Button from '@components/ui/Button'
import { useProjectAssets } from '@hooks/useProjectAssets'

// ─── Parallax floating logo ───────────────────────────────────────────────────
function ParallaxLogo({ logoSrc, accentColor }) {
  const containerRef = useRef(null)
  const logoRef      = useRef(null)
  const floatRef     = useRef(null)

  const accent = accentColor ?? 'rgba(71,49,152,0.15)'

  // Autonomous floating animation
  useEffect(() => {
    if (!logoRef.current) return

    floatRef.current = gsap.to(logoRef.current, {
      y:        '-18px',
      rotation: '1.5deg',
      duration: 3.8,
      ease:     'sine.inOut',
      yoyo:     true,
      repeat:   -1,
    })

    return () => floatRef.current?.kill()
  }, [])

  // Mouse parallax
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX / W - 0.5) * 2   // -1 → 1
      const dy = (e.clientY / H - 0.5) * 2

      gsap.to(el, {
        x:        dx * -4,
        y:        dy * -2,
        duration: 1.6,
        ease:     'power2.out',
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!logoSrc) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        bottom:        '-8%',
        right:         '-6%',
        width:         'clamp(280px, 38vw, 540px)',
        aspectRatio:   '1 / 1',
        pointerEvents: 'none',
        zIndex:        0,
        willChange:    'transform',
      }}
      ref={containerRef}
    >
      {/* Glow bloom behind the logo */}
      <div
        style={{
          position:   'absolute',
          inset:      '10%',
          background: `radial-gradient(ellipse at center, ${accent.replace(/[\d.]+\)$/, '0.22)')} 0%, transparent 68%)`,
          filter:     'blur(32px)',
          borderRadius:'50%',
          zIndex:     0,
        }}
      />

      <img
        ref={logoRef}
        src={logoSrc}
        alt=""
        style={{
          position:   'relative',
          zIndex:     1,
          width:      '100%',
          height:     '100%',
          objectFit:  'contain',
          objectPosition: 'center',
          display:    'block',
          // Clip so only bottom-right quarter bleeds off-screen naturally
          // The parent's overflow:hidden on the section handles the rest
          opacity:    0.13,
          filter:     'grayscale(0.3) brightness(1.65)',
          willChange: 'transform',
          maskImage:  'radial-gradient(ellipse 80% 80% at 65% 60%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 65% 60%, black 30%, transparent 75%)',
          transition: 'opacity 0.4s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.22'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.13'}
      />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProjectDetailHero({ project }) {
  const { logoSrc } = useProjectAssets(project.slug)

  return (
    <section style={{
      padding:  'clamp(3rem, 6vw, 6rem) 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Watermark number */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '-0.40em',
        right:         '-0.05em',
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(12rem, 30vw, 28rem)',
        fontWeight:    700,
        lineHeight:    1,
        color:         'transparent',
        WebkitTextStroke: '1px rgba(71,49,152,0.22)',
        pointerEvents: 'none',
        userSelect:    'none',
        letterSpacing: '-0.05em',
        // Push behind the logo
        zIndex:        0,
      }}>
        {project.id}
      </div>

      {/* Floating parallax logo — sits above watermark, below content */}
      <ParallaxLogo
        logoSrc={logoSrc}
        accentColor={project.accentColor}
      />

      {/* ── All existing content — zIndex raised above logo ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Breadcrumb */}
        <div data-gsap="fade-in" style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.6rem',
          marginBottom:  '2.5rem',
          flexWrap:      'wrap',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.99rem',
            color:         'var(--indigo)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Project {project.id}
          </span>
          <span style={{ color: 'var(--border)', fontSize: '0.6rem' }}>—</span>
          <Tag variant={project.status === 'Live' ? 'live' : 'default'}>
            {project.status}
          </Tag>
          <Tag variant="ghost">{project.year}</Tag>
        </div>

        {/* Title */}
        <h1 data-gsap="fade-up" style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(3rem, 8vw, 7rem)',
          fontWeight:    600,
          letterSpacing: '-0.04em',
          lineHeight:    0.9,
          color:         'var(--text)',
          marginBottom:  '1.75rem',
          maxWidth:      '900px',
        }}>
          {project.title}
        </h1>

        {/* Tagline */}
        <p data-gsap="fade-up" style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.85rem',
          color:         'var(--muted)',
          lineHeight:    1.85,
          maxWidth:      '540px',
          marginBottom:  '2.5rem',
          paddingLeft:   '1rem',
          borderLeft:    '2px solid rgba(71, 49, 152, 0.73)',
        }}>
          {project.tagline}
        </p>

        {/* Tags */}
        <div data-gsap="fade-up" style={{
          display:       'flex',
          flexWrap:      'wrap',
          gap:           '0.5rem',
          marginBottom:  '2.5rem',
        }}>
          {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>

        {/* Links */}
        <div data-gsap="fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.live && (
            <Button href={project.live} variant="primary" external>Live Site ↗</Button>
          )}
          {project.github && (
            <Button href={project.github} variant="ghost" external>GitHub →</Button>
          )}
          {!project.live && !project.github && (
            <div style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.5rem',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              color:         'var(--muted)',
              letterSpacing: '0.08em',
            }}>
              <span style={{
                width:        '6px',
                height:       '6px',
                borderRadius: '50%',
                background:   'var(--muted)',
                display:      'inline-block',
              }} />
              In Progress — Links coming soon
            </div>
          )}
        </div>
      </div>
    </section>
  )
}