/**
 * ProjectLivePreview.jsx — Fully Responsive
 *
 * Desktop: unchanged — 620px iframe with browser chrome mockup
 * Tablet:  same, slightly shorter
 * Mobile:  iframe hidden (iframes are unusable on mobile at any reasonable height),
 *          replaced with a prominent "Open live site" CTA card that is more
 *          useful and honest for mobile users
 *
 * Design rationale: embedding an iframe on mobile is a poor UX pattern —
 * sites rarely render well in a small scaled iframe, and the interaction
 * model is terrible. The honest, clean solution is a card that links out.
 */

import { useState, useRef } from 'react'

// ─── Browser chrome ───────────────────────────────────────────────────────────
function BrowserChrome({ url }) {
  const displayUrl = url.replace(/^https?:\/\//, '')

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      gap:            '0.75rem',
      padding:        '0.65rem 1rem',
      background:     'var(--bg-3)',
      borderBottom:   '1px solid var(--border)',
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
          minHeight:     '32px',
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

// ─── Mobile CTA card (replaces iframe on small screens) ───────────────────────
function MobileLiveCTA({ url, title }) {
  return (
    <div style={{
      border:         '1px solid var(--border)',
      background:     'rgba(255,255,255,0.012)',
      padding:        '2rem 1.5rem',
      display:        'flex',
      flexDirection:  'column',
      gap:            '1.25rem',
      position:       'relative',
      overflow:       'hidden',
    }}>
      {/* Top accent line */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        height:     '2px',
        background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)',
      }} />

      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   'rgba(74,222,128,0.85)',
          boxShadow:    '0 0 6px rgba(74,222,128,0.5)',
          display:      'inline-block',
          flexShrink:   0,
        }} />
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'rgba(74,222,128,0.75)',
        }}>
          Live Site
        </span>
      </div>

      {/* URL display */}
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.7rem',
        color:         'var(--ghost)',
        letterSpacing: '0.02em',
        wordBreak:     'break-all',
        lineHeight:    1.6,
      }}>
        {url.replace(/^https?:\/\//, '')}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize:   '0.65rem',
        color:      'var(--ghost)',
        lineHeight: 1.75,
      }}>
        Visit the live site directly for the best experience. Embedded previews are disabled on mobile.
      </p>

      {/* CTA button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '0.5rem',
          fontFamily:     'var(--font-mono)',
          fontSize:       '0.7rem',
          fontWeight:     500,
          letterSpacing:  '0.1em',
          textTransform:  'uppercase',
          color:          'var(--bg-base)',
          background:     'var(--text)',
          border:         'none',
          padding:        '0.9rem 2rem',
          borderRadius:   'var(--radius-pill)',
          textDecoration: 'none',
          transition:     'background 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
      >
        Open {title} ↗
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
    <div>
      {/* Desktop iframe preview */}
      <div
        className="live-preview-desktop"
        style={{
          border:   '1px solid var(--border)',
          overflow: 'hidden',
          background:'var(--bg-2)',
        }}
      >
        <BrowserChrome url={url} />

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

          <iframe
            ref={iframeRef}
            src={url}
            title={`Live preview of ${title}`}
            loading="lazy"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setErrored(true) }}
            style={{
              width:           '133%',
              height:          '133%',
              border:          'none',
              display:         'block',
              opacity:         loading || errored ? 0 : 1,
              transition:      'opacity 0.5s ease',
              pointerEvents:   'auto',
              transform:       'scale(0.75)',
              transformOrigin: 'top left',
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox"
          />

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

        {/* Footer */}
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

      {/* Mobile CTA card */}
      <div className="live-preview-mobile" style={{ display: 'none' }}>
        <MobileLiveCTA url={url} title={title} />
      </div>

      <style>{`
        /* Mobile: replace iframe with CTA card */
        @media (max-width: 767px) {
          .live-preview-desktop { display: none !important; }
          .live-preview-mobile  { display: block !important; }
        }

        /* Tablet: show iframe but make it shorter */
        @media (min-width: 768px) and (max-width: 1023px) {
          .live-preview-desktop { display: block !important; }
          .live-preview-mobile  { display: none !important; }
        }
      `}</style>
    </div>
  )
}