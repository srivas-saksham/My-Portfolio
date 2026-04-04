import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const animate = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      raf = requestAnimationFrame(animate)
    }

    // Scale ring on hoverable elements
    const onEnter = () => {
      ring.style.width  = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'var(--indigo)'
    }
    const onLeave = () => {
      ring.style.width  = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'var(--muted)'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '8px',
          height:          '8px',
          background:      'var(--text)',
          borderRadius:    '50%',
          pointerEvents:   'none',
          zIndex:          10000,
          willChange:      'transform',
          mixBlendMode:    'difference',
        }}
      />
      {/* Lag ring */}
      <div
        ref={ringRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '36px',
          height:          '36px',
          border:          '1px solid var(--muted)',
          borderRadius:    '50%',
          pointerEvents:   'none',
          zIndex:          9999,
          willChange:      'transform',
          transition:      'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}