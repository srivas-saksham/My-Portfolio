import { useEffect, useRef, useState } from 'react'

/**
 * useScrollProgress
 *
 * Returns the scroll progress of either:
 *   - The page             (when no ref is provided)
 *   - A specific element   (when a containerRef is provided)
 *
 * progress — number 0.0 → 1.0
 *
 * Usage (page):
 *   const progress = useScrollProgress()
 *   // Use for a reading-progress bar, parallax multiplier, etc.
 *
 * Usage (element):
 *   const containerRef = useRef(null)
 *   const progress = useScrollProgress({ ref: containerRef })
 *   <section ref={containerRef}>...</section>
 */
export function useScrollProgress({ ref = null, throttleMs = 16 } = {}) {
  const [progress, setProgress] = useState(0)
  const lastUpdateRef = useRef(0)
  const rafRef        = useRef(null)

  useEffect(() => {
    const calc = () => {
      const now = performance.now()
      if (now - lastUpdateRef.current < throttleMs) return
      lastUpdateRef.current = now

      if (ref?.current) {
        // Element progress: how far through the element we've scrolled
        const el   = ref.current
        const rect = el.getBoundingClientRect()
        const vh   = window.innerHeight
        // 0 when el top hits viewport bottom, 1 when el bottom hits viewport top
        const raw  = 1 - rect.top / (vh + rect.height)
        setProgress(Math.min(1, Math.max(0, raw)))
      } else {
        // Page progress
        const scrollTop    = window.scrollY
        const docHeight    = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight
        const scrollable   = docHeight - windowHeight
        setProgress(scrollable > 0 ? Math.min(1, scrollTop / scrollable) : 0)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(calc)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    calc() // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ref, throttleMs])

  return progress
}

/**
 * ScrollProgressBar — optional ready-to-use thin bar component.
 * Mount it at the top level; it reads page scroll automatically.
 *
 * Usage:
 *   import { ScrollProgressBar } from '@hooks/useScrollProgress'
 *   <ScrollProgressBar />
 */
export function ScrollProgressBar({
  color     = 'var(--indigo)',
  height    = '2px',
  zIndex    = 9998,
}) {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        height,
        width:      `${progress * 100}%`,
        background: color,
        zIndex,
        pointerEvents: 'none',
        transition: 'width 0.05s linear',
        transformOrigin: 'left',
      }}
    />
  )
}