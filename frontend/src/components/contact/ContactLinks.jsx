import { useState, useRef, useEffect } from 'react'
import { SITE } from '@utils/constants'
import gsap from 'gsap'

const LINKS = [
  {
    label:    'Email',
    value:    SITE.email,
    href:     `mailto:${SITE.email}`,
    arrow:    '→',
    external: false,
    hint:     'Primary contact',
    index:    '01',
  },
  {
    label:    'GitHub',
    value:    'github.com/srivas-saksham',
    href:     SITE.github,
    arrow:    '↗',
    external: true,
    hint:     'Open-source work',
    index:    '02',
  },
  {
    label:    'LinkedIn',
    value:    'linkedin.com/in/saksham-srivastava',
    href:     SITE.linkedin,
    arrow:    '↗',
    external: true,
    hint:     'Professional profile',
    index:    '03',
  },
  {
    label:    'Resume',
    value:    'Download PDF',
    href:     SITE.resume,
    arrow:    '↓',
    external: false,
    hint:     'Latest version',
    index:    '04',
  },
]

function LinkRow({ link, isFirst }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:     'grid',
        gridTemplateColumns: '2.5rem 1fr 1.5rem',
        gap:         '0 1.25rem',
        alignItems:  'center',
        padding:     '1.25rem 0',
        borderBottom:'1px solid var(--border)',
        borderTop:   isFirst ? '1px solid var(--border)' : 'none',
        textDecoration:'none',
        cursor:      'none',
        position:    'relative',
        overflow:    'hidden',
        transition:  'padding-left 0.4s cubic-bezier(0.19,1,0.22,1)',
        paddingLeft: hovered ? '0.75rem' : '0',
      }}
    >
      {/* Left border accent */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        width:      '2px',
        height:     hovered ? '100%' : '0%',
        background: 'linear-gradient(180deg, transparent, rgba(71,49,152,0.8), transparent)',
        transition: 'height 0.4s cubic-bezier(0.19,1,0.22,1)',
      }} />

      {/* Index */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.55rem',
        color:         hovered ? 'var(--indigo)' : 'var(--ghost)',
        letterSpacing: '0.1em',
        transition:    'color 0.25s ease',
        userSelect:    'none',
      }}>
        {link.index}
      </span>

      {/* Content */}
      <div>
        <div style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.5rem',
          marginBottom:  '0.25rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            color:         'var(--ghost)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            {link.label}
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            color:         'var(--ghost)',
            letterSpacing: '0.04em',
            opacity:       0.55,
          }}>
            · {link.hint}
          </span>
        </div>

        <span style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(0.9rem, 1.5vw, 1.05rem)',
          fontWeight:    500,
          letterSpacing: '-0.01em',
          color:         hovered ? 'var(--text)' : 'var(--muted)',
          transition:    'color 0.25s ease',
          display:       'block',
          lineHeight:    1.1,
        }}>
          {link.value}
        </span>
      </div>

      {/* Arrow */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.9rem',
        color:         hovered ? 'var(--text)' : 'var(--ghost)',
        transition:    'color 0.25s ease, transform 0.3s ease',
        transform:     hovered ? 'translate(1px,-1px)' : 'translate(0,0)',
        display:       'block',
        textAlign:     'center',
      }}>
        {link.arrow}
      </span>
    </a>
  )
}

function SocialLink({ s, i }) {
  const blobRef  = useRef(null)
  const labelRef = useRef(null)
  
  useEffect(() => {
    // Capture the original color once, before GSAP ever touches it
    labelRef.current._ghost = getComputedStyle(labelRef.current).color
  }, [])

  const handleEnter = () => {
    gsap.killTweensOf(blobRef.current)
    gsap.killTweensOf(labelRef.current)  // ← kill any in-progress leave tween
    gsap.to(blobRef.current, { scale: 40, duration: 1.55, ease: 'power3.out' })
    gsap.to(labelRef.current, { 
      color: s.textColor, 
      duration: 1.25, 
      ease: 'power2.out',
      overwrite: true,  // ← force overwrite
    })
  }

  const handleLeave = () => {
    gsap.killTweensOf(blobRef.current)
    gsap.killTweensOf(labelRef.current)  // ← kill color tween too
    gsap.to(blobRef.current, { scale: 0, duration: 0.45, ease: 'power3.inOut' })
    gsap.to(labelRef.current, { 
      color: labelRef.current._ghost, 
      duration: 0.3, 
      ease: 'power2.out',
      overwrite: true,  // ← force overwrite any lingering tween
    })
  }

  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flex:           1,
        fontFamily:     'var(--font-mono)',
        fontSize:       '0.55rem',
        letterSpacing:  '0.12em',
        textTransform:  'uppercase',
        textDecoration: 'none',
        padding:        '0.85rem 0',
        textAlign:      'center',
        borderRight:    i < 2 ? '1px solid var(--border)' : 'none',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        position:       'relative',
        overflow:       'hidden',
        cursor:         'none',
      }}
    >
      <span
        ref={blobRef}
        style={{
          position:     'absolute',
          width:        '10px',
          height:       '10px',
          borderRadius: '50%',
          background:   s.brandColor,
          transform:    'scale(0)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />
      <span
        ref={labelRef}
        style={{
          position: 'relative',
          zIndex:   1,
          color:    'var(--ghost)',
        }}
      >
        {s.label} ↗
      </span>
    </a>
  )
}

export default function ContactLinks() {
  return (
    <div data-gsap="fade-up">

      {/* Header label */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.75rem',
        marginBottom:  '0',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.82rem',
          color:         'var(--ghost)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}>
          Or reach out directly
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Link rows */}
      <div style={{ marginBottom: '2rem' }}>
        {LINKS.map((link, i) => (
          <LinkRow key={link.label} link={link} isFirst={i === 0} />
        ))}
      </div>

      {/* Availability card */}
      <div style={{
        padding:    '1.25rem 1.5rem',
        background: 'rgba(71,49,152,0.03)',
        border:     '1px solid var(--border)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Top accent rule */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       '1.5rem',
          right:      '1.5rem',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent, rgba(71,49,152,0.5), transparent)',
        }} />

        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '0.6rem',
          marginBottom: '0.75rem',
        }}>
          {/* Live pulse dot */}
          <span style={{
            position:  'relative',
            display:   'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            flexShrink:0,
          }}>
            <span style={{
              position:     'absolute',
              width:        '12px',
              height:       '12px',
              borderRadius: '50%',
              background:   'rgba(74,222,128,0.25)',
              animation:    'contact-pulse 2s ease-out infinite',
            }} />
            <span style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   'rgba(74,222,128,0.9)',
              boxShadow:    '0 0 6px rgba(74,222,128,0.5)',
              position:     'relative',
              zIndex:       1,
              display:      'block',
            }} />
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.62rem',
            color:         'rgba(74,222,128,0.8)',
            letterSpacing: '0.08em',
          }}>
            Available for work
          </span>
          <style>{`
            @keyframes contact-pulse {
              0%   { transform: scale(1); opacity: 0.7; }
              100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.62rem',
          color:      'var(--ghost)',
          lineHeight: 1.8,
        }}>
          Typically respond within 24 hours.<br />
          Based in New Delhi (IST, UTC+5:30).
        </p>
      </div>

      {/* Social links row */}
      <div style={{
        marginTop:   '1.5rem',
        display:     'flex',
        gap:         '0',
        borderTop:   '1px solid var(--border)',
        borderBottom:'1px solid var(--border)',
      }}>
        {[
          { label: 'GitHub',   href: SITE.github,   brandColor: '#24292e', textColor: '#ffffff' },
          { label: 'LinkedIn', href: SITE.linkedin,  brandColor: '#0A66C2', textColor: '#ffffff' },
          { label: 'LeetCode', href: SITE.leetcode,  brandColor: '#FFA116', textColor: '#1a1a1a' },
        ].map((s, i) => (
          <SocialLink key={s.label} s={s} i={i} />
        ))}
      </div>

    </div>
  )
}