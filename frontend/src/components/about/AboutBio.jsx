import { useRef, useState } from 'react'
import { SITE } from '@utils/constants'

/**
 * AboutBio
 * Personal biography block with a portrait placeholder, short intro text,
 * and a set of detail rows (location, availability, education).
 * Designed to match the dark editorial system of the portfolio.
 *
 * Responsive:
 *   Desktop: 2-col grid (text left, portrait right)
 *   Tablet:  2-col grid but portrait shrinks
 *   Mobile:  single column — portrait first (as a banner), text below
 */
export default function AboutBio() {
  const [hovered, setHovered] = useState(false)
  const portraitRef = useRef(null)

  return (
    <>
      <div
        data-gsap="fade-up"
        style={{
          display:        'grid',
          gridTemplateColumns: '1fr 260px',
          gap:            'clamp(2rem, 4vw, 4rem)',
          alignItems:     'start',
        }}
        className="bio-inner-grid"
      >
        {/* ── Text side ── */}
        <div>
          <p style={{
            fontFamily:   'var(--font-display)',
            fontSize:     'clamp(1.15rem, 2.5vw, 1.75rem)',
            fontWeight:   300,
            fontStyle:    'italic',
            letterSpacing:'-0.02em',
            lineHeight:   1.5,
            color:        'var(--text)',
            marginBottom: '1.5rem',
            borderLeft:   '2px solid rgba(71,49,152,0.6)',
            paddingLeft:  '1.25rem',
          }}>
            "I don't wait to be ready. I build until I am."
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              'BCA 2nd year at VIPS, New Delhi — Indraprastha University.',
              'Full-stack developer with a bias toward shipping production-grade systems, not just tutorial projects.',
              'IBM-certified AI Agent developer. Founder of Rizara Luxe. 6 days a week at the gym — same discipline, different domain.',
              'I care about precision: in design, in architecture, in how a product makes someone feel when they use it.',
            ].map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.78rem',
                  color:      i === 0 ? 'var(--muted)' : 'var(--ghost)',
                  lineHeight: 1.95,
                  transition: 'color 0.3s ease',
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* ── Detail rows ── */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '0.75rem',
            marginTop:           '2.5rem',
            paddingTop:          '2rem',
            borderTop:           '1px solid var(--border)',
          }}
          className="bio-detail-grid"
          >
            {[
              { label: 'Location',      value: 'New Delhi, India'          },
              { label: 'Email',         value: SITE.email                  },
              { label: 'Availability',  value: 'Open to work'              },
              { label: 'Status',        value: '2nd Year · 4th Semester'   },
            ].map(item => (
              <div key={item.label}>
                <span style={{
                  display:       'block',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.55rem',
                  color:         'var(--ghost)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom:  '0.3rem',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--muted)',
                  letterSpacing: '0.02em',
                  wordBreak:     'break-all',
                }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Portrait placeholder ── */}
        <div
          ref={portraitRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={(e) => {
            const rect = portraitRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            portraitRef.current.style.setProperty('--mx', `${x}%`)
            portraitRef.current.style.setProperty('--my', `${y}%`)
          }}
          className="bio-portrait"
          style={{
            position:   'relative',
            aspectRatio:'3/4',
            overflow:   'hidden',
            background: 'var(--bg-2)',
            border:     `1px solid ${hovered ? 'rgba(71,49,152,0.4)' : 'var(--border)'}`,
            transition: 'border-color 0.3s ease',
          }}
        >
          {/* Grid pattern inside portrait */}
          <div
            aria-hidden="true"
            style={{
              position:        'absolute',
              inset:           0,
              backgroundImage: `
                linear-gradient(rgba(71,49,152,0.10) 1px, transparent 1px),
                linear-gradient(90deg, rgba(71,49,152,0.10) 1px, transparent 1px)
              `,
              backgroundSize:  '32px 32px',
              zIndex:          2,
            }}
          />

          {/* Glow layer — follows cursor */}
          <div
            aria-hidden="true"
            style={{
              position:        'absolute',
              inset:           0,
              backgroundImage: `
                linear-gradient(rgba(71,49,152,0.55) 2px, transparent 1px),
                linear-gradient(90deg, rgba(71,49,152,0.55) 2px, transparent 1px)
              `,
              backgroundSize:  '32px 32px',
              WebkitMaskImage: 'radial-gradient(circle 60px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)',
              maskImage:       'radial-gradient(circle 60px at var(--mx, 50%) var(--my, 50%), black 0%, transparent 100%)',
              zIndex:          3,
              opacity:         hovered ? 1 : 0,
              transition:      'opacity 0.3s ease',
            }}
          />

          {/* Transparent character cutout — above grid */}
          <img  
            src="/assets/portraits/1 (5) T.png"
            alt=""
            aria-hidden="true"
            style={{
              position:       'absolute',
              inset:          0,
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center 50%',
              zIndex:         4,
            }}
          />

          {/* Portrait image */}
          <img
            src="/assets/portraits/1 (5).png"
            alt="Saksham Srivastava"
            style={{
              position:       'absolute',
              inset:          0,
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center 50%',
              zIndex:         1,
              opacity:        0.85,
            }}
          />

          {/* Initials watermark */}
          <div style={{
            position:         'absolute',
            inset:            0,
            display:          'flex',
            alignItems:       'start',
            justifyContent:   'end',
            fontFamily:       'var(--font-display)',
            fontSize:         'clamp(4rem, 10vw, 7rem)',
            fontWeight:       700,
            letterSpacing:    '-0.06em',
            color:            'transparent',
            WebkitTextStroke: '1px rgba(71,49,152,0.25)',
            userSelect:       'none',
            zIndex:           4,
            transition:       'color 0.3s ease',
          }}>
            SS
          </div>

          {/* Bottom label */}
          <div style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            padding:    '0.75rem',
            background: 'linear-gradient(transparent, rgba(8,8,8,0.9))',
            zIndex:     5,
          }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.58rem',
              color:         'var(--ghost)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Saksham Srivastava — 2026
            </span>
          </div>

          {/* Hover overlay */}
          {hovered && (
            <div
              aria-hidden="true"
              style={{
                position:   'absolute',
                inset:      0,
                background: 'linear-gradient(135deg, rgba(71,49,152,0.07) 0%, transparent 60%)',
                zIndex:     4,
                transition: 'opacity 0.3s ease',
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        /* ── Mobile (< 640px) ───────────────────────────────── */
        @media (max-width: 639px) {
          .bio-inner-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          /*
            On mobile: portrait renders below text (default DOM order
            puts text first which is better for content priority).
            We keep it that way — no reordering needed.
            Portrait takes full width but is capped in height.
          */
          .bio-portrait {
            width: 100% !important;
            max-width: 280px !important;
            margin: 0 auto !important;
            aspect-ratio: 3/4 !important;
          }

          /* Detail grid: 2-col still works on mobile at this size */
          .bio-detail-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem 1.5rem !important;
          }
        }

        /* ── Tablet (640px – 1023px) ─────────────────────────── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .bio-inner-grid {
            grid-template-columns: 1fr 200px !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  )
}