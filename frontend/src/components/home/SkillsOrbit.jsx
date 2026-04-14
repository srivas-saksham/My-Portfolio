/**
 * TechMarquee.jsx — Fully Responsive
 *
 * Desktop: unchanged — logo morphs to large brand typography on hover, physics push
 * Mobile/Tablet: simplified marquee — logos only, no complex hover physics
 *                (touch devices can't hover anyway)
 */

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'

// ─── Font lazy-loader ─────────────────────────────────────────────────────────
const GOOGLE_FONT_URLS = {
  'Geist':           'https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap',
  'Inter':           'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'Source+Sans+3':   'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap',
  'Source+Code+Pro': 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap',
  'Signika':         'https://fonts.googleapis.com/css2?family=Signika:wght@400;600;700&display=swap',
  'Roboto':          'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
}
const _loaded = new Set()
function ensureFont(key) {
  if (!key || _loaded.has(key)) return
  _loaded.add(key)
  const url = GOOGLE_FONT_URLS[key]
  if (!url) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = url
  document.head.appendChild(l)
}

// ─── Brand data ───────────────────────────────────────────────────────────────
const ICONS = [
  { icon: 'react',       color: '#61DAFB', label: 'React',      font: "system-ui, 'Helvetica Neue', sans-serif",                  googleKey: null,              weight: 700, ls: '-0.03em' },
  { icon: 'nextdotjs',   color: '#ffffff', label: 'Next.js',    font: "'Geist', 'Inter', sans-serif",                             googleKey: 'Geist',           weight: 700, ls: '-0.05em' },
  { icon: 'tailwindcss', color: '#06B6D4', label: 'Tailwind',   font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 600, ls: '-0.02em' },
  { icon: 'nodedotjs',   color: '#339933', label: 'Node.js',    font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 600, ls: '-0.01em' },
  { icon: 'typescript',  color: '#3178C6', label: 'TypeScript', font: "'Segoe UI', 'Helvetica Neue', sans-serif",                 googleKey: null,              weight: 700, ls: '-0.02em' },
  { icon: 'supabase',    color: '#3ECF8E', label: 'Supabase',   font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 700, ls: '-0.03em' },
  { icon: 'postgresql',  color: '#4169E1', label: 'PostgreSQL', font: "'Source Sans 3', 'Source Sans Pro', sans-serif",           googleKey: 'Source+Sans+3',   weight: 600, ls: '0em'    },
  { icon: null, devicon: 'python', color: '#3776AB', label: 'Python',     font: "'Source Sans 3', 'Source Sans Pro', sans-serif", googleKey: 'Source+Sans+3',   weight: 600, ls: '0em'    },
  { icon: 'fastapi',     color: '#009688', label: 'FastAPI',    font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 700, ls: '-0.03em' },
  { icon: 'git',         color: '#F05032', label: 'Git',        font: "'Source Sans 3', 'Source Sans Pro', sans-serif",           googleKey: 'Source+Sans+3',   weight: 700, ls: '0em'    },
  { icon: 'cloudflare',  color: '#F38020', label: 'Cloudflare', font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 600, ls: '-0.02em' },
  { icon: 'greensock',   color: '#88CE02', label: 'GSAP',       font: "'Signika', sans-serif",                                    googleKey: 'Signika',         weight: 700, ls: '-0.01em' },
  { icon: 'php',         color: '#777BB4', label: 'PHP',        font: "'Inter', sans-serif",                                      googleKey: 'Inter',           weight: 700, ls: '-0.01em' },
  { icon: null, devicon: 'vitejs', color: '#646CFF', label: 'Vite',       font: "'Inter', sans-serif",                            googleKey: 'Inter',           weight: 700, ls: '-0.03em' },
  { icon: 'express',     color: '#ffffff', label: 'Express',    font: "'Source Code Pro', monospace",                             googleKey: 'Source+Code+Pro', weight: 500, ls: '0em'    },
  { icon: null, devicon: 'java',  color: '#ED8B00', label: 'Java',        font: "'Arial', 'Helvetica Neue', sans-serif",          googleKey: null,              weight: 700, ls: '-0.01em' },
  { icon: null, devicon: 'mysql', color: '#4479A1', label: 'MySQL',       font: "'Inter', sans-serif",                            googleKey: 'Inter',           weight: 600, ls: '-0.01em' },
  { icon: 'c',           color: '#A8B9CC', label: 'C',          font: "'Courier New', 'Courier', monospace",                      googleKey: null,              weight: 700, ls: '0.02em'  },
  { icon: 'vercel',      color: '#ffffff', label: 'Vercel',     font: "'Geist', 'Inter', sans-serif",                             googleKey: 'Geist',           weight: 700, ls: '-0.06em' },
  { icon: 'airtable',    color: '#18BFFF', label: 'Airtable',   font: "'Roboto', sans-serif",                                     googleKey: 'Roboto',          weight: 500, ls: '-0.01em' },
]

const TRACK = [...ICONS, ...ICONS]
const ITEM_GAP    = 36
const BASE_WIDTH  = 52
const FONT_SIZE   = 42
const SPRING_K    = 0.22
const SPRING_D    = 0.72

// ─── Physics hook ─────────────────────────────────────────────────────────────
function usePhysics(count, hotIdx, expansionPx) {
  const [offsets, setOffsets] = useState(() => new Array(count).fill(0))
  const velRef  = useRef(new Array(count).fill(0))
  const posRef  = useRef(new Array(count).fill(0))
  const rafRef  = useRef(null)
  const hotRef  = useRef(hotIdx)
  const expRef  = useRef(expansionPx)

  hotRef.current = hotIdx
  expRef.current = expansionPx

  const computeTarget = useCallback((idx) => {
    const h = hotRef.current
    if (h === null) return 0
    const dist = idx - h
    if (dist === 0) return 0
    const sign  = dist > 0 ? 1 : -1
    const absd  = Math.abs(dist)
    const reach = 4
    if (absd > reach) return 0
    const push  = expRef.current * 0.2 * Math.pow(1 - absd / (reach + 1), 1.6)
    return sign * push
  }, [])

  useEffect(() => {
    const step = () => {
      const pos = posRef.current
      const vel = velRef.current
      let changed = false

      for (let i = 0; i < count; i++) {
        const target = computeTarget(i)
        const spring = (target - pos[i]) * SPRING_K
        vel[i] = (vel[i] + spring) * SPRING_D
        if (Math.abs(vel[i]) > 0.01 || Math.abs(pos[i] - target) > 0.01) {
          pos[i] += vel[i]
          changed = true
        } else {
          pos[i] = target
          vel[i] = 0
        }
      }

      if (changed) {
        setOffsets([...pos])
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hotIdx, count, computeTarget])

  return offsets
}

// ─── Measure label width ──────────────────────────────────────────────────────
function useLabelWidth(label, font, weight, letterSpacing, active) {
  const [width, setWidth] = useState(BASE_WIDTH)
  const spanRef = useRef(null)

  useLayoutEffect(() => {
    if (!active || !spanRef.current) return
    setWidth(spanRef.current.getBoundingClientRect().width + 24)
  }, [active, label])

  return { width, spanRef }
}

// ─── Single logo item (desktop) ───────────────────────────────────────────────
function Logo({ item, isHot, offset, onEnter, onLeave }) {
  const { icon, devicon, color, label, font, googleKey, weight, ls } = item
  const hex = color ?? '#888'

  const { width: labelWidth, spanRef } = useLabelWidth(label, font, weight, ls, isHot)
  const slotWidth = isHot ? labelWidth : BASE_WIDTH

  const imgSrc = icon
    ? `https://cdn.simpleicons.org/${icon}/${hex.replace('#', '')}`
    : devicon
      ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-original.svg`
      : null

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={label}
      style={{
        flexShrink:     0,
        width:          `${slotWidth}px`,
        height:         `${BASE_WIDTH}px`,
        position:       'relative',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        transform:      `translateX(${offset}px)`,
        transition:     'width 0.38s cubic-bezier(0.34,1.56,0.64,1), transform 0s linear',
        cursor:         'default',
        overflow:       'visible',
      }}
    >
      <span
        ref={spanRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           '-9999px',
          left:          '-9999px',
          fontFamily:    font,
          fontWeight:    weight,
          fontSize:      `${FONT_SIZE}px`,
          letterSpacing: ls,
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          opacity:       0,
        }}
      >
        {label}
      </span>

      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        loading="lazy"
        style={{
          display:       'block',
          objectFit:     'contain',
          position:      'absolute',
          top: '50%', left: '50%',
          transform:     'translate(-50%, -50%)',
          filter:        isHot
            ? 'brightness(1) saturate(1)'
            : 'brightness(0.5) saturate(0.75)',
          opacity:       isHot ? 0 : 1,
          transition:    'opacity 0.3s ease, filter 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      <span
        aria-hidden="true"
        style={{
          position:      'absolute',
          top: '50%', left: '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    font,
          fontWeight:    weight,
          fontSize:      `${FONT_SIZE}px`,
          letterSpacing: ls,
          color:         hex,
          whiteSpace:    'nowrap',
          opacity:       isHot ? 1 : 0,
          transition:    'opacity 0.3s ease',
          userSelect:    'none',
          lineHeight:    1,
          textShadow:    `0 0 32px ${hex}44`,
          pointerEvents: 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Simplified mobile logo (just icon, no hover) ────────────────────────────
function MobileLogo({ item }) {
  const { icon, devicon, color } = item
  const hex = color ?? '#888'

  const imgSrc = icon
    ? `https://cdn.simpleicons.org/${icon}/${hex.replace('#', '')}`
    : devicon
      ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-original.svg`
      : null

  return (
    <div style={{
      flexShrink:     0,
      width:          '40px',
      height:         '40px',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={item.label}
          width={36}
          height={36}
          loading="lazy"
          style={{
            display:   'block',
            objectFit: 'contain',
            filter:    'brightness(0.55) saturate(0.75)',
          }}
        />
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TechMarquee() {
  const [paused,  setPaused]  = useState(false)
  const [hotIdx,  setHotIdx]  = useState(null)
  const [expPx,   setExpPx]   = useState(0)
  const offsets = usePhysics(TRACK.length, hotIdx, expPx)

  const handleEnter = useCallback((i, item) => {
    ensureFont(item.googleKey)
    setPaused(true)
    setHotIdx(i)
    const rough = FONT_SIZE * 0.6 * item.label.length + 24
    setExpPx(Math.max(rough - BASE_WIDTH, 0))
  }, [])

  const handleLeave = useCallback(() => {
    setPaused(false)
    setHotIdx(null)
    setExpPx(0)
  }, [])

  return (
    <div
      style={{
        padding:         'clamp(2.5rem, 4vw, 4rem) 0',
        overflow:        'hidden',
        maskImage:       'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      {/* ── Desktop marquee: full physics + label morph ── */}
      <div className="marquee-desktop">
        <div
          style={{
            display:            'flex',
            gap:                `${ITEM_GAP}px`,
            width:              'max-content',
            alignItems:         'center',
            animation:          'tm 55s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            willChange:         'transform',
          }}
        >
          {TRACK.map((item, i) => (
            <Logo
              key={`${item.label}-${i}`}
              item={item}
              isHot={hotIdx === i}
              offset={offsets[i] ?? 0}
              onEnter={() => handleEnter(i, item)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile marquee: simplified, icons only ── */}
      <div className="marquee-mobile" style={{ display: 'none' }}>
        <div style={{
          display:    'flex',
          gap:        '28px',
          width:      'max-content',
          alignItems: 'center',
          animation:  'tm 40s linear infinite',
          willChange: 'transform',
        }}>
          {TRACK.map((item, i) => (
            <MobileLogo key={`mob-${item.label}-${i}`} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tm {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Mobile: simplified logos only, faster speed */
        @media (max-width: 767px) {
          .marquee-desktop { display: none !important; }
          .marquee-mobile  { display: block !important; }
        }

        /* Tablet: desktop marquee but slightly smaller */
        @media (min-width: 768px) and (max-width: 1023px) {
          .marquee-desktop { display: block !important; }
          .marquee-mobile  { display: none !important; }
        }
      `}</style>
    </div>
  )
}