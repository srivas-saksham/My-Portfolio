import { useEffect, useRef } from 'react'
import { useCursorTracker } from '@hooks/useCursorTracker'

/**
 * CustomCursor
 * Dot + lagged ring cursor.
 * Now powered by useCursorTracker — all raw RAF/event logic lives in the hook.
 * Visual output and hover-scale behaviour are identical to the original.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  // useCursorTracker provides smoothed positions we drive the ring with
  const { pos, lagged } = useCursorTracker({ lerpFactor: 0.1 })

  // Keep dot snapped to raw position
  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    dot.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`
  }, [pos])

  // Drive ring with lagged position
  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return
    ring.style.transform = `translate(${lagged.x - 18}px, ${lagged.y - 18}px)`
  }, [lagged])

  // Hover-scale on interactive elements — same logic as original
  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const onEnter = () => {
      ring.style.width       = '48px'
      ring.style.height      = '48px'
      ring.style.borderColor = 'var(--indigo)'
    }
    const onLeave = () => {
      ring.style.width       = '36px'
      ring.style.height      = '36px'
      ring.style.borderColor = 'var(--muted)'
    }

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot — snapped, mix-blend difference */}
      <div
        ref={dotRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '8px',
          height:        '8px',
          background:    'var(--text)',
          borderRadius:  '50%',
          pointerEvents: 'none',
          zIndex:        10000,
          willChange:    'transform',
          mixBlendMode:  'difference',
        }}
      />
      {/* Lagged ring */}
      <div
        ref={ringRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '36px',
          height:        '36px',
          border:        '1px solid var(--muted)',
          borderRadius:  '50%',
          pointerEvents: 'none',
          zIndex:        9999,
          willChange:    'transform',
          transition:    'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}