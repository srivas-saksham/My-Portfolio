import { useRef, useState, useEffect } from 'react'
import { ArrowUpDown } from 'lucide-react'
import gsap from 'gsap'

/**
 * FlipToggle
 *
 * A physical card that flips vertically (rotateX) between three states:
 *   null  → neutral  (indigo tint, shows "tap to answer")
 *   true  → YES      (green)
 *   false → NO       (red/rose)
 *
 * Uses GSAP for the flip so it is frame-accurate and glitch-free.
 * backface-visibility:hidden on each face ensures only one is ever visible.
 *
 * Props:
 *   value    — null | true | false
 *   onChange — (null | true | false) => void
 *   label    — string   e.g. "Prefer WhatsApp contact over emails?"
 */

const H = 44 // card height in px

const FACES = {
  null:  { label: 'Tap to answer', bg: 'rgba(71,49,152,0.10)', border: 'rgba(71,49,152,0.35)', color: 'rgba(138,122,255,0.75)', dot: null },
  true:  { label: 'Yes',           bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.35)', color: 'rgba(74,222,128,0.9)',  dot: 'rgba(74,222,128,0.8)' },
  false: { label: 'No',            bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.3)', color: 'rgba(248,113,113,0.85)', dot: 'rgba(248,113,113,0.8)' },
}

// Cycle: null → true → false → null
function nextValue(v) {
  if (v === null)  return true
  if (v === true)  return false
  return null
}

export default function FlipToggle({ value, onChange, label }) {
  const wrapRef  = useRef(null)   // the 3-D scene wrapper
  const frontRef = useRef(null)   // face currently showing
  const backRef  = useRef(null)   // face about to appear
  const spinning = useRef(false)

  // Keep a ref to the *incoming* value so the animation callback can read it
  const nextVal  = useRef(null)

  const handleFlip = () => {
    if (spinning.current) return
    spinning.current = true

    const incoming = nextValue(value)
    nextVal.current = incoming

    const face = FACES[String(incoming)]

    // Pre-position back face: rotated 180° around X, already hidden
    gsap.set(backRef.current, { rotateX: -180, opacity: 1 })

    // Apply incoming colours to back face before it becomes visible
    const back = backRef.current
    back.style.background   = face.bg
    back.style.borderColor  = face.border
    back.querySelector('.ft-label').style.color = face.color
    const dot = back.querySelector('.ft-dot')
    if (dot) dot.style.background = face.dot || 'transparent'

    // Show/hide dot
    if (face.dot) {
      dot.style.display = 'inline-block'
    } else {
      dot.style.display = 'none'
    }
    back.querySelector('.ft-label').textContent = face.label

    const tl = gsap.timeline({
      onComplete: () => {
        // Swap refs conceptually by updating React state,
        // then reset both faces for the next flip
        onChange(incoming)
        spinning.current = false

        // Snap wrap back to 0 instantly so next flip starts clean
        gsap.set(wrapRef.current, { rotateX: 0 })
        // Reset back face so it's hidden again
        gsap.set(backRef.current, { rotateX: -180 })
      },
    })

    tl.to(wrapRef.current, {
      rotateX:  90,
      duration: 0.18,
      ease:     'power2.in',
    })
    .call(() => {
      // At the halfway point swap front face visuals instantly
      // (it's edge-on so invisible to the user)
      const front = frontRef.current
      front.style.background  = face.bg
      front.style.borderColor = face.border
      front.querySelector('.ft-label').style.color = face.color
      const fdot = front.querySelector('.ft-dot')
      if (face.dot) {
        fdot.style.display    = 'inline-block'
        fdot.style.background = face.dot
      } else {
        fdot.style.display = 'none'
      }
      front.querySelector('.ft-label').textContent = face.label
    })
    .to(wrapRef.current, {
      rotateX:  0,
      duration: 0.22,
      ease:     'power2.out',
    })
  }

  // Sync front face visuals with `value` on mount / external change
  useEffect(() => {
    if (spinning.current) return
    const face  = FACES[String(value)]
    const front = frontRef.current
    if (!front) return
    front.style.background  = face.bg
    front.style.borderColor = face.border
    front.querySelector('.ft-label').style.color = face.color
    const dot = front.querySelector('.ft-dot')
    if (face.dot) {
      dot.style.display    = 'inline-block'
      dot.style.background = face.dot
    } else {
      dot.style.display = 'none'
    }
    front.querySelector('.ft-label').textContent = face.label
  }, [value])

  const neutral = FACES['null']

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      gap:            '1rem',
      flexWrap:       'wrap',
    }}>

      {/* Question label */}
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.72rem',
        color:         'var(--ghost)',
        letterSpacing: '0.04em',
        lineHeight:    1.5,
        flex:          '1 1 180px',
      }}>
        {label}
      </span>

      {/* 3-D scene */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`${label} — currently: ${value === null ? 'unanswered' : value ? 'yes' : 'no'}. Click to change.`}
        onClick={handleFlip}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
        style={{
          perspective:    '600px',
          flexShrink:     0,
          cursor:         'pointer',
          userSelect:     'none',
          outline:        'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* Rotating wrapper — GSAP targets this */}
        <div
          ref={wrapRef}
          style={{
            position:        'relative',
            width:           '148px',
            height:          `${H}px`,
            transformStyle:  'preserve-3d',
            transformOrigin: `center ${H / 2}px`,
          }}
        >

          {/* FRONT face */}
          <div
            ref={frontRef}
            style={{
              position:          'absolute',
              inset:             0,
              display:           'flex',
              alignItems:        'center',
              justifyContent:    'space-between',
              padding:           '0 14px',
              border:            `1px solid ${neutral.border}`,
              background:        neutral.bg,
              backfaceVisibility:'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius:      '4px',
              gap:               '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                className="ft-dot"
                style={{
                  display:      'none',
                  width:        '6px',
                  height:       '6px',
                  borderRadius: '50%',
                  flexShrink:   0,
                }}
              />
              <span
                className="ft-label"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         neutral.color,
                  whiteSpace:    'nowrap',
                }}
              >
                Tap to answer
              </span>
            </div>
            <ArrowUpDown
              size={11}
              style={{
                color:     'rgba(138,122,255,0.45)',
                flexShrink: 0,
                transition: 'color 0.2s ease',
              }}
            />
          </div>

          {/* BACK face — pre-rotated, hidden until mid-flip */}
          <div
            ref={backRef}
            style={{
              position:          'absolute',
              inset:             0,
              display:           'flex',
              alignItems:        'center',
              justifyContent:    'space-between',
              padding:           '0 14px',
              border:            `1px solid ${neutral.border}`,
              background:        neutral.bg,
              backfaceVisibility:'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform:         'rotateX(-180deg)',
              borderRadius:      '4px',
              gap:               '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                className="ft-dot"
                style={{
                  display:      'none',
                  width:        '6px',
                  height:       '6px',
                  borderRadius: '50%',
                  flexShrink:   0,
                }}
              />
              <span
                className="ft-label"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         neutral.color,
                  whiteSpace:    'nowrap',
                }}
              >
                Tap to answer
              </span>
            </div>
            <ArrowUpDown
              size={11}
              style={{
                color:      'rgba(138,122,255,0.45)',
                flexShrink: 0,
              }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}