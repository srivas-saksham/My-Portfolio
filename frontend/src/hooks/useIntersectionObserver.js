import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useIntersectionObserver
 *
 * Lightweight wrapper around the native IntersectionObserver API.
 * Useful for scroll-triggered reveals, lazy loading, and analytics.
 *
 * Usage (single ref):
 *   const [ref, isVisible, entry] = useIntersectionObserver({ threshold: 0.2 })
 *   <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>...</div>
 *
 * Usage (multiple refs):
 *   const [ref, isVisible] = useIntersectionObserver({ once: true })
 *   // attach ref to any element; each mount creates its own observer
 *
 * Options:
 *   root        — ancestor element (default: viewport)
 *   rootMargin  — margin around root (default: '0px')
 *   threshold   — intersection ratio 0–1 or array (default: 0.15)
 *   once        — stop observing after first intersection (default: true)
 */
export function useIntersectionObserver({
  root       = null,
  rootMargin = '0px',
  threshold  = 0.15,
  once       = true,
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [entry,     setEntry]     = useState(null)
  const ref        = useRef(null)
  const observerRef = useRef(null)

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      // Graceful degradation: treat everything as visible
      setIsVisible(true)
      return
    }

    observerRef.current = new IntersectionObserver(
      ([e]) => {
        setEntry(e)
        if (e.isIntersecting) {
          setIsVisible(true)
          if (once) disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { root, rootMargin, threshold }
    )

    observerRef.current.observe(el)

    return disconnect
  }, [root, rootMargin, threshold, once, disconnect])

  return [ref, isVisible, entry]
}

/**
 * useIntersectionObserverMultiple
 *
 * Observe multiple elements at once.
 * Returns a Map<Element, boolean> of visibility states.
 *
 * Usage:
 *   const { observe, visibilityMap } = useIntersectionObserverMultiple({ threshold: 0.2 })
 *   <div ref={el => observe(el)}>...</div>
 */
export function useIntersectionObserverMultiple({
  root       = null,
  rootMargin = '0px',
  threshold  = 0.15,
  once       = true,
} = {}) {
  const [visibilityMap, setVisibilityMap] = useState(new Map())
  const observerRef    = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisibilityMap(prev => {
          const next = new Map(prev)
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
              next.set(target, true)
              if (once) observerRef.current?.unobserve(target)
            } else if (!once) {
              next.set(target, false)
            }
          })
          return next
        })
      },
      { root, rootMargin, threshold }
    )

    return () => observerRef.current?.disconnect()
  }, [root, rootMargin, threshold, once])

  const observe = useCallback((el) => {
    if (el && observerRef.current) observerRef.current.observe(el)
  }, [])

  return { observe, visibilityMap }
}