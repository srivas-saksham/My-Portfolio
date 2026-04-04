import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function SceneBackground({
  gridSize    = 72,
  gridOpacity = 0.13,
  glow1Color  = 'rgba(71,49,152,0.18)',
  glow2Color  = 'rgba(71,49,152,0.10)',
  glow1Pos    = { top: '-15%', right: '-5%' },
  glow2Pos    = { bottom: '-20%', left: '-10%' },
  scanLine    = false,
  parallaxStrength = 1,
}) {
  const containerRef = useRef(null)
  const glow1Ref     = useRef(null)
  const glow2Ref     = useRef(null)
  const gridRef      = useRef(null)

  const [hoveredCell, setHoveredCell] = useState(null)
  const [gridDims, setGridDims]       = useState({ rows: 0, cols: 0 })

  // Build grid dimensions from container size
  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      setGridDims({
        cols: Math.ceil(width  / gridSize) + 2,
        rows: Math.ceil(height / gridSize) + 2,
      })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [gridSize])

  // Mouse parallax for glows + hovered cell calculation
  useEffect(() => {
    const onMove = (e) => {
      const g1 = glow1Ref.current
      const g2 = glow2Ref.current
      const gr = gridRef.current
      if (!g1 || !g2 || !gr) return

      // Parallax glows
      const { innerWidth: W, innerHeight: H } = window
      const dx = (e.clientX / W - 0.5) * 2
      const dy = (e.clientY / H - 0.5) * 2

      gsap.to(g1, {
        x: dx *  50 * parallaxStrength,
        y: dy *  35 * parallaxStrength,
        duration: 1.6,
        ease: 'power2.out',
      })
      gsap.to(g2, {
        x: dx * -35 * parallaxStrength,
        y: dy * -25 * parallaxStrength,
        duration: 2.0,
        ease: 'power2.out',
      })
      gsap.to(gr, {
        x: dx *  10 * parallaxStrength,
        y: dy *   7 * parallaxStrength,
        duration: 2.2,
        ease: 'power2.out',
      })

      // Use the GRID element's bounding rect (not container)
      // so the cell lookup accounts for the -5% inset offset
      const gridRect = gr.getBoundingClientRect()
      const lx = e.clientX - gridRect.left
      const ly = e.clientY - gridRect.top

      setHoveredCell({
        col: Math.floor(lx / gridSize),
        row: Math.floor(ly / gridSize),
      })
    }

    const onLeave = () => setHoveredCell(null)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [gridSize, parallaxStrength])

  const totalCells = gridDims.rows * gridDims.cols

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    >
      {/* ── Interactive grid ── */}
      <div
        ref={gridRef}
        style={{
          position:  'absolute',
          inset:     '-5%',
          willChange:'transform',
        }}
      >
        {/* CSS grid lines */}
        <div style={{
          position:        'absolute',
          inset:           0,
          backgroundImage: `
            linear-gradient(rgba(206,206,206,${gridOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(71,49,152,${gridOpacity * 1.3}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }} />

        {/* Per-cell highlight layer */}
        {totalCells > 0 && totalCells < 1200 && Array.from({ length: gridDims.rows }).map((_, row) =>
          Array.from({ length: gridDims.cols }).map((_, col) => {
            const isHot = hoveredCell &&
              hoveredCell.row === row &&
              hoveredCell.col === col
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  position:      'absolute',
                  left:          `${col * gridSize}px`,
                  top:           `${row * gridSize}px`,
                  width:         `${gridSize}px`,
                  height:        `${gridSize}px`,
                  background:    isHot ? 'rgba(71,49,152,0.18)' : 'transparent',
                  border:        isHot ? '1px solid rgba(71,49,152,0.35)' : '1px solid transparent',
                  transition:    'background 0.0s ease, border-color 0.12s ease',
                  pointerEvents: 'none',
                }}
              />
            )
          })
        )}
      </div>

      {/* ── Glow orb 1 ── */}
      <div
        ref={glow1Ref}
        style={{
          position:   'absolute',
          top:        glow1Pos.top    || 'auto',
          bottom:     glow1Pos.bottom || 'auto',
          left:       glow1Pos.left   || 'auto',
          right:      glow1Pos.right  || 'auto',
          width:      '55vw',
          height:     '55vw',
          background: `radial-gradient(ellipse at center, ${glow1Color} 0%, transparent 65%)`,
          filter:     'blur(1px)',
          willChange: 'transform',
        }}
      />

      {/* ── Glow orb 2 ── */}
      <div
        ref={glow2Ref}
        style={{
          position:   'absolute',
          top:        glow2Pos.top    || 'auto',
          bottom:     glow2Pos.bottom || 'auto',
          left:       glow2Pos.left   || 'auto',
          right:      glow2Pos.right  || 'auto',
          width:      '40vw',
          height:     '40vw',
          background: `radial-gradient(ellipse at center, ${glow2Color} 0%, transparent 65%)`,
          filter:     'blur(2px)',
          willChange: 'transform',
        }}
      />

      {/* ── Optional scan line ── */}
      {scanLine && (
        <div style={{
          position:   'absolute',
          left:       0,
          right:      0,
          top:        '40%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(71,49,152,0.18) 30%, rgba(71,49,152,0.32) 50%, rgba(71,49,152,0.18) 70%, transparent 100%)',
        }} />
      )}
    </div>
  )
}