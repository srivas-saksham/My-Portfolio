/**
 * ProjectScreenshotsGallery.jsx
 *
 * Horizontal scroll strip + fullscreen lightbox for project screenshots.
 * Driven entirely by the screenshots array — no hardcoding.
 *
 * Features:
 *   - Horizontal filmstrip with keyboard nav (← →)
 *   - Click to open fullscreen lightbox
 *   - In lightbox: arrow navigation, close on Escape / backdrop click
 *   - Screenshot count indicator
 *   - Smooth transitions throughout
 */

import { useState, useEffect, useCallback, useRef } from 'react'

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ screenshots, activeIndex, onClose, onNavigate }) {
  const current = screenshots[activeIndex]

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % screenshots.length)
      if (e.key === 'ArrowLeft')  onNavigate((activeIndex - 1 + screenshots.length) % screenshots.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, screenshots.length, onClose, onNavigate])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         10000,
        background:     'rgba(0,0,0,0.94)',
        backdropFilter: 'blur(20px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        animation:      'lb-in 0.25s ease',
      }}
    >
      <style>{`
        @keyframes lb-in  { from { opacity:0 } to { opacity:1 } }
        @keyframes lb-img { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* Counter */}
      <div style={{
        position:      'absolute',
        top:           '1.5rem',
        left:          '50%',
        transform:     'translateX(-50%)',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.6rem',
        color:         'rgba(245,245,245,0.4)',
        letterSpacing: '0.12em',
        zIndex:        1,
      }}>
        {activeIndex + 1} / {screenshots.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position:   'absolute',
          top:        '1.25rem',
          right:      '1.5rem',
          background: 'none',
          border:     '1px solid rgba(255,255,255,0.12)',
          color:      'rgba(245,245,245,0.5)',
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.65rem',
          padding:    '0.4rem 0.85rem',
          cursor:     'none',
          letterSpacing: '0.1em',
          transition: 'color 0.2s ease, border-color 0.2s ease',
          zIndex:     1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--text)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(245,245,245,0.5)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        }}
      >
        ESC
      </button>

      {/* Main image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth:    '90vw',
          maxHeight:   '85vh',
          position:    'relative',
          animation:   'lb-img 0.3s ease',
        }}
        key={activeIndex} // force re-animate on change
      >
        <img
          src={current.url}
          alt={current.name}
          style={{
            display:   'block',
            maxWidth:  '90vw',
            maxHeight: '82vh',
            objectFit: 'contain',
            border:    '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        />

        {/* Caption */}
        <div style={{
          position:   'absolute',
          bottom:     '-2rem',
          left:       0,
          right:      0,
          textAlign:  'center',
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.58rem',
          color:      'rgba(245,245,245,0.3)',
          letterSpacing: '0.06em',
        }}>
          {current.name}
        </div>
      </div>

      {/* Prev / Next */}
      {screenshots.length > 1 && (
        <>
          <button
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((activeIndex - 1 + screenshots.length) % screenshots.length)
            }}
            style={{
              position:  'absolute',
              left:      '1.5rem',
              top:       '50%',
              transform: 'translateY(-50%)',
              background:'rgba(8,8,8,0.6)',
              border:    '1px solid rgba(255,255,255,0.1)',
              color:     'var(--text)',
              fontFamily:'var(--font-mono)',
              fontSize:  '1.2rem',
              padding:   '0.75rem 1rem',
              cursor:    'none',
              backdropFilter:'blur(8px)',
              transition:'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(71,49,152,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(8,8,8,0.6)'}
          >
            ←
          </button>
          <button
            aria-label="Next screenshot"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((activeIndex + 1) % screenshots.length)
            }}
            style={{
              position:  'absolute',
              right:     '1.5rem',
              top:       '50%',
              transform: 'translateY(-50%)',
              background:'rgba(8,8,8,0.6)',
              border:    '1px solid rgba(255,255,255,0.1)',
              color:     'var(--text)',
              fontFamily:'var(--font-mono)',
              fontSize:  '1.2rem',
              padding:   '0.75rem 1rem',
              cursor:    'none',
              backdropFilter:'blur(8px)',
              transition:'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(71,49,152,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(8,8,8,0.6)'}
          >
            →
          </button>
        </>
      )}

      {/* Dot navigation */}
      {screenshots.length > 1 && screenshots.length <= 12 && (
        <div style={{
          position:   'absolute',
          bottom:     '1.5rem',
          left:       '50%',
          transform:  'translateX(-50%)',
          display:    'flex',
          gap:        '0.5rem',
        }}>
          {screenshots.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to screenshot ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
              style={{
                width:        i === activeIndex ? '20px' : '6px',
                height:       '6px',
                background:   i === activeIndex ? 'var(--text)' : 'rgba(255,255,255,0.2)',
                border:       'none',
                borderRadius: '9999px',
                cursor:       'none',
                padding:      0,
                transition:   'width 0.3s ease, background 0.2s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Filmstrip thumb ─────────────────────────────────────────────────────────
function FilmstripThumb({ shot, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const active = isActive || hovered

  return (
    <button
      onClick={onClick}
      aria-label={`View screenshot ${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink:  0,
        width:       isActive ? '200px' : '160px',
        aspectRatio: '16/9',
        padding:     0,
        background:  'var(--bg-3)',
        border:      `1px solid ${active ? 'rgba(71,49,152,0.55)' : 'rgba(255,255,255,0.05)'}`,
        overflow:    'hidden',
        cursor:      'none',
        position:    'relative',
        transition:  'width 0.35s cubic-bezier(0.19,1,0.22,1), border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow:   active
          ? '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(71,49,152,0.3)'
          : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <img
        src={shot.url}
        alt={shot.name}
        style={{
          width:       '100%',
          height:      '100%',
          objectFit:   'cover',
          objectPosition:'top center',
          display:     'block',
          filter:      active ? 'brightness(0.95)' : 'brightness(0.55) saturate(0.8)',
          transition:  'filter 0.3s ease, transform 0.4s ease',
          transform:   active ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      {/* Bottom gradient */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     '40%',
        background: 'linear-gradient(transparent, rgba(8,8,8,0.7))',
      }} />
      {/* Index badge */}
      <div style={{
        position:      'absolute',
        bottom:        '0.4rem',
        left:          '0.5rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.52rem',
        color:         active ? 'var(--text)' : 'rgba(245,245,245,0.35)',
        letterSpacing: '0.06em',
        transition:    'color 0.2s ease',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      {/* Active dot */}
      {isActive && (
        <div style={{
          position:   'absolute',
          top:        '0.5rem',
          right:      '0.5rem',
          width:      '5px',
          height:     '5px',
          borderRadius:'50%',
          background: 'var(--indigo)',
          boxShadow:  '0 0 6px rgba(71,49,152,0.8)',
        }} />
      )}
    </button>
  )
}

// ─── Main gallery ─────────────────────────────────────────────────────────────
export default function ProjectScreenshotsGallery({ screenshots, accentColor }) {
  const [activeIdx,   setActiveIdx]   = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const stripRef = useRef(null)

  const accent = accentColor ?? 'rgba(71,49,152,0.15)'

  // Keyboard nav on the strip
  useEffect(() => {
    if (lightboxOpen) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') setActiveIdx(i => (i + 1) % screenshots.length)
      if (e.key === 'ArrowLeft')  setActiveIdx(i => (i - 1 + screenshots.length) % screenshots.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, screenshots.length])

  // Auto-scroll the strip to keep active thumb visible
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const thumb = strip.children[activeIdx]
    if (!thumb) return
    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIdx])

  if (!screenshots || screenshots.length === 0) return null

  const current = screenshots[activeIdx]

  return (
    <div>
      {/* ── Main preview ── */}
      <div
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label="Open fullscreen gallery"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        style={{
          position:   'relative',
          width:      '80%',
          margin:     '0 auto',
          aspectRatio:'16/9',
          overflow:   'hidden',
          background: 'var(--bg-2)',
          border:     '1px solid var(--border)',
          cursor:     'none',
        }}
      >
        <img
          key={activeIdx}
          src={current.url}
          alt={current.name}
          style={{
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top center',
            display:        'block',
            animation:      'screenshot-fade 0.3s ease',
          }}
        />

        {/* Subtle overlay */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.45) 100%)',
          pointerEvents:'none',
        }} />

        {/* Expand hint */}
        <div style={{
          position:      'absolute',
          top:           '1rem',
          right:         '1rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          color:         'rgba(245,245,245,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background:    'rgba(8,8,8,0.55)',
          padding:       '0.35rem 0.7rem',
          backdropFilter:'blur(8px)',
          border:        '1px solid rgba(255,255,255,0.06)',
          display:       'flex',
          alignItems:    'center',
          gap:           '0.4rem',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: '0.7rem' }}>⛶</span>
          Expand
        </div>

        {/* Screenshot name label */}
        <div style={{
          position:      'absolute',
          bottom:        '1rem',
          left:          '1rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          color:         'rgba(245,245,245,0.4)',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
        }}>
          {activeIdx + 1} of {screenshots.length}
          {' '}&nbsp;·&nbsp;{' '}
          {current.name}
        </div>

        <style>{`
          @keyframes screenshot-fade {
            from { opacity: 0.4; transform: scale(1.012); }
            to   { opacity: 1;   transform: scale(1); }
          }
        `}</style>
      </div>

      {/* ── Filmstrip ── */}
      {screenshots.length > 1 && (
        <div style={{ position: 'relative', marginTop: '0.85rem' }}>
          {/* Left fade mask */}
          <div style={{
            position:      'absolute',
            left:          0,
            top:           0,
            bottom:        0,
            width:         '3rem',
            background:    'linear-gradient(90deg, var(--bg-base), transparent)',
            zIndex:        1,
            pointerEvents: 'none',
          }} />
          {/* Right fade mask */}
          <div style={{
            position:      'absolute',
            right:         0,
            top:           0,
            bottom:        0,
            width:         '3rem',
            background:    'linear-gradient(270deg, var(--bg-base), transparent)',
            zIndex:        1,
            pointerEvents: 'none',
          }} />

          <div
            ref={stripRef}
            style={{
              display:    'flex',
              gap:        '0.5rem',
              overflowX:  'auto',
              paddingBottom:'0.5rem',
              scrollbarWidth:'none',
              msOverflowStyle:'none',
            }}
          >
            {screenshots.map((shot, i) => (
              <FilmstripThumb
                key={shot.name}
                shot={shot}
                index={i}
                isActive={i === activeIdx}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox
          screenshots={screenshots}
          activeIndex={activeIdx}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveIdx}
        />
      )}
    </div>
  )
}