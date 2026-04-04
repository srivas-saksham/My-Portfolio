import { useEffect, useRef, useState } from 'react'

/**
 * useCursorTracker
 *
 * Tracks the raw mouse position and provides a smoothed "lagged" position
 * suitable for custom cursor rings / parallax effects.
 *
 * Returns:
 *   pos     — { x, y }  raw mouse position in px
 *   lagged  — { x, y }  smoothed position (lerped each frame)
 *   norm    — { x, y }  normalised 0-1 relative to viewport
 *   isOver  — boolean   whether the cursor is inside the window
 */
export function useCursorTracker({ lerpFactor = 0.1 } = {}) {
  const [pos,    setPos]    = useState({ x: 0, y: 0 })
  const [lagged, setLagged] = useState({ x: 0, y: 0 })
  const [norm,   setNorm]   = useState({ x: 0.5, y: 0.5 })
  const [isOver, setIsOver] = useState(false)

  const rawRef    = useRef({ x: 0, y: 0 })
  const laggedRef = useRef({ x: 0, y: 0 })
  const rafRef    = useRef(null)

  useEffect(() => {
    const onMove = ({ clientX: x, clientY: y }) => {
      rawRef.current = { x, y }
      setPos({ x, y })
      setNorm({
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      })
    }

    const onEnter = () => setIsOver(true)
    const onLeave = () => setIsOver(false)

    const tick = () => {
      const { x: rx, y: ry } = rawRef.current
      const { x: lx, y: ly } = laggedRef.current
      const nx = lx + (rx - lx) * lerpFactor
      const ny = ly + (ry - ly) * lerpFactor
      laggedRef.current = { x: nx, y: ny }
      setLagged({ x: nx, y: ny })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mouseenter', onEnter, { passive: true })
    window.addEventListener('mouseleave', onLeave, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [lerpFactor])

  return { pos, lagged, norm, isOver }
}