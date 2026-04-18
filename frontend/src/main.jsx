import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import './styles/animations.css'
import App from './App.jsx'

// ── Theme-aware favicon — works in ALL browsers ──────────────────────────────
// Dark mode  → main_favicon_transparent_dark.png
// Light mode → main_favicon_transparent.png
const applyFavicon = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const href   = isDark
    ? '/main_favicon_transparent_dark.png'
    : '/main_favicon_transparent.png'

  // Remove every existing icon link so nothing conflicts
  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach(el => el.remove())

  const link   = document.createElement('link')
  link.rel     = 'icon'
  link.type    = 'image/png'
  link.href    = href
  document.head.appendChild(link)
}

applyFavicon()
// Re-run live when the OS theme changes (no page reload needed)
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', applyFavicon)
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')).render(<App />)