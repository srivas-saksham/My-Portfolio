/**
 * ProjectLivePreview.jsx
 *
 * Renders an iframe of the live site with:
 *   - Browser chrome mockup (address bar, traffic lights)
 *   - Loading skeleton while iframe paints
 *   - Error fallback if iframe fails or is blocked
 *   - "Open in new tab" escape hatch always visible
 *
 * Only rendered when project.live is non-null.
 * Parent is responsible for the null-check guard.
 */

import { useState, useRef } from 'react'

// ─── Browser chrome ───────────────────────────────────────────────────────────
function BrowserChrome({ url, onOpenExternal }) {
  // Strip protocol for display
  const displayUrl = url.replace(/^https?:\/\//, '')

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      gap:            '0.75rem',
      padding:        '0.65rem 1rem',
      background:     'var(--bg-3)',
      borderBottom:   '1px solid var(--border)',
      borderRadius:   '0',
      userSelect:     'none',
    }}>
      {/* Traffic lights */}
      <div style={{ display: 'flex', gap: '0.42rem', flexShrink: 0 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
          <div key={i} style={{
            width:        '10px',
            height:       '10px',
            borderRadius: '50%',
            background:   color,
            opacity:      0.8,
            boxShadow:    `0 0 4px ${color}44`,
          }} />
        ))}
      </div>

      {/* Address bar */}
      <div style={{
        flex:           1,
        display:        'flex',
        alignItems:     'center',
        gap:            '0.5rem',
        background:     'rgba(255,255,255,0.04)',
        border:         '1px solid rgba(255,255,255,0.07)',
        padding:        '0.3rem 0.75rem',
        minWidth:       0,
      }}>
        {/* Lock icon */}
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
          <rect x="1.5" y="4.5" width="7" height="6" rx="1" stroke="rgba(74,222,128,0.7)" strokeWidth="1"/>
          <path d="M3 4.5V3.5A2 2 0 0 1 7 3.5V4.5" stroke="rgba(74,222,128,0.7)" strokeWidth="1" fill="none"/>
        </svg>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          color:         'rgba(245,245,245,0.4)',
          letterSpacing: '0.02em',
          overflow:      'hidden',
          textOverflow:  'ellipsis',
          whiteSpace:    'nowrap',
          flex:          1,
        }}>
          {displayUrl}
        </span>
      </div>

      {/* External link button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title="Open in new tab"
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.58rem',
          letterSpacing: '0.1em',
          color:         'rgba(245,245,245,0.4)',
          textDecoration:'none',
          flexShrink:    0,
          display:       'flex',
          alignItems:    'center',
          gap:           '0.3rem',
          padding:       '0.3rem 0.6rem',
          border:        '1px solid rgba(255,255,255,0.07)',
          background:    'transparent',
          transition:    'color 0.2s ease, border-color 0.2s ease',
          cursor:        'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--text)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(245,245,245,0.4)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        }}
      >
        ↗ Open
      </a>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProjectLivePreview({ url, title }) {
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)
  const iframeRef = useRef(null)

  if (!url) return null

  return (
    <div style={{
      border:   '1px solid var(--border)',
      overflow: 'hidden',
      background:'var(--bg-2)',
    }}>
      {/* Browser chrome header */}
      <BrowserChrome url={url} />

      {/* Iframe container */}
      <div style={{
        position:   'relative',
        width:      '100%',
        height:     '620px',
        overflow:   'hidden',
        background: 'var(--bg-3)',
      }}>

        {/* Loading skeleton */}
        {loading && !errored && (
          <div style={{
            position:   'absolute',
            inset:      0,
            display:    'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap:        '1.25rem',
            background: 'var(--bg-3)',
            zIndex:     1,
          }}>
            <div style={{
              width:      '28px',
              height:     '28px',
              border:     '1px solid rgba(255,255,255,0.08)',
              borderTop:  '1px solid rgba(71,49,152,0.7)',
              borderRadius:'50%',
              animation:  'iframe-spin 0.8s linear infinite',
            }} />
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              color:         'var(--ghost)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Loading live site…
            </span>
            <style>{`@keyframes iframe-spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {/* Error fallback */}
        {errored && (
          <div style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '1rem',
            background:     'var(--bg-3)',
            zIndex:         1,
            padding:        '2rem',
            textAlign:      'center',
          }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.58rem',
              color:         'var(--ghost)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Preview unavailable
            </span>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize:   '0.65rem',
              color:      'var(--ghost)',
              lineHeight: 1.7,
              maxWidth:   '360px',
            }}>
              The site may block embedding via X-Frame-Options.
              <br />Open it directly to explore.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         'var(--text)',
                border:        '1px solid var(--border)',
                padding:       '0.6rem 1.25rem',
                textDecoration:'none',
                transition:    'border-color 0.2s ease',
                cursor:        'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--muted)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              Open {title} ↗
            </a>
          </div>
        )}

        {/* The actual iframe */}
        <iframe
          ref={iframeRef}
          src={url}
          title={`Live preview of ${title}`}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setErrored(true) }}
          style={{
            width:          '100%',
            height:         '100%',
            border:         'none',
            display:        'block',
            opacity:        loading || errored ? 0 : 1,
            transition:     'opacity 0.5s ease',
            pointerEvents:  'auto',
          }}
          // Best-effort: sandbox still allows scripts + same-origin but no pop-ups
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox"
        />

        {/* Interaction capture overlay — prevents iframe from stealing scroll */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        2,
            pointerEvents: 'none',
            border:        '1px solid transparent',
          }}
        />
      </div>

      {/* Footer note */}
      <div style={{
        padding:        '0.75rem 1rem',
        borderTop:      '1px solid var(--border)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        background:     'var(--bg-3)',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          color:         'var(--ghost)',
          letterSpacing: '0.08em',
        }}>
          Live embed · {url}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.55rem',
            color:         'rgba(74,222,128,0.6)',
            letterSpacing: '0.1em',
            textDecoration:'none',
            cursor:        'none',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(74,222,128,0.9)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(74,222,128,0.6)'}
        >
          Open full site ↗
        </a>
      </div>
    </div>
  )
}