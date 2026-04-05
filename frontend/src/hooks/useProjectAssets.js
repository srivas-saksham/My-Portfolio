/**
 * useProjectAssets.js
 *
 * Resolves all media assets for a given project slug at build-time via
 * Vite's import.meta.glob. No hardcoding — add files to the correct folder
 * and they are automatically discovered on the next build/HMR cycle.
 *
 * Expected folder layout:
 *
 *   src/assets/screenshots/{slug}/*.{jpg,jpeg,png,webp,avif}
 *   src/assets/videos/{slug}.mp4
 *
 * Usage:
 *   const { screenshots, videoSrc, isLoading } = useProjectAssets('rizara-luxe')
 */

import { useMemo } from 'react'

// ─── Static glob maps ────────────────────────────────────────────────────────
// Vite resolves these at build time. The paths must be string literals —
// no variables inside the glob string itself.
//
// eager: true  → returns the module directly (no dynamic import promise)
// import: 'default' → grab the default export (the resolved asset URL)

const screenshotModules = import.meta.glob(
  '../assets/screenshots/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' }
)

const videoModules = import.meta.glob(
  '../assets/videos/*.mp4',
  { eager: true, import: 'default' }
)

// ─── Helper: normalise a glob key to a comparable path segment ───────────────
const slugFrom = (key) => {
  // key looks like: ../assets/screenshots/rizara-luxe/shot-01.jpg
  const parts = key.split('/')
  // For screenshots: parts[3] = slug folder
  // For videos:      parts[3] = slug.mp4
  return parts
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useProjectAssets(slug) {

  const screenshots = useMemo(() => {
    if (!slug) return []

    return Object.entries(screenshotModules)
      .filter(([key]) => {
        // key: ../assets/screenshots/rizara-luxe/01.jpg
        const segments = key.split('/')
        // segments[3] is the slug folder name
        return segments[3] === slug
      })
      .map(([key, url]) => ({
        url,
        // filename without extension — used as alt text
        name: key.split('/').pop().replace(/\.[^.]+$/, ''),
      }))
      // Sort by filename so ordering is deterministic (01, 02, 03…)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  }, [slug])

  const videoSrc = useMemo(() => {
    if (!slug) return null

    const entry = Object.entries(videoModules).find(([key]) => {
      // key: ../assets/videos/rizara-luxe.mp4
      const filename = key.split('/').pop() // rizara-luxe.mp4
      return filename === `${slug}.mp4`
    })

    return entry ? entry[1] : null
  }, [slug])

  return {
    screenshots,
    videoSrc,
    hasScreenshots: screenshots.length > 0,
    hasVideo:       videoSrc !== null,
  }
}