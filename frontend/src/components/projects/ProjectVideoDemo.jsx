/**
 * ProjectVideoDemo.jsx
 *
 * Autoplay, muted, loop video demo player.
 * Click anywhere on the video to toggle pause/play.
 * No controls rendered by the browser.
 *
 * Conditionally rendered — parent must only mount this component
 * when videoSrc is non-null AND project.hasVideo is true.
 */

import { useRef, useState, useEffect } from 'react'

export default function ProjectVideoDemo({ videoSrc, accentColor }) {
  const videoRef  = useRef(null)
  const [paused,  setPaused]  = useState(false)
  const [loaded,  setLoaded]  = useState(false)
  const [opacity, setOpacity] = useState(0)

  const accent = accentColor ?? 'rgba(71,49,152,0.15)'

  // Fade in once video has loaded metadata
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onLoaded = () => {
      setLoaded(true)
      // Small delay so the fade starts after the element is painted
      requestAnimationFrame(() => setOpacity(1))
    }
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  const togglePause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
    }
  }

  return (
    <div style={{
      position:   'relative',
      width:      '100%',
      aspectRatio:'16/9',
      overflow:   'hidden',
      background: 'var(--bg-3)',
      border:     '1px solid var(--border)',
    }}>

      {/* Loading skeleton */}
      {!loaded && (
        <div style={{
          position:   'absolute',
          inset:      0,
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width:      '32px',
            height:     '32px',
            border:     '1px solid rgba(255,255,255,0.1)',
            borderTop:  '1px solid rgba(71,49,152,0.7)',
            borderRadius:'50%',
            animation:  'video-spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes video-spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePause}
        aria-label="Project demo video — click to pause or resume"
        style={{
          width:        '100%',
          height:       '100%',
          objectFit:    'cover',
          objectPosition:'top center',
          display:      'block',
          cursor:       'none',
          opacity,
          transition:   'opacity 0.6s ease',
        }}
      />

      {/* Paused overlay */}
      <div
        aria-hidden="true"
        onClick={togglePause}
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     paused ? 'rgba(0,0,0,0.55)' : 'transparent',
          backdropFilter: paused ? 'blur(4px)' : 'none',
          transition:     'background 0.3s ease, backdrop-filter 0.3s ease',
          cursor:         'none',
          pointerEvents:  loaded ? 'all' : 'none',
        }}
      >
        {paused && (
          <div style={{
            display:    'flex',
            flexDirection:'column',
            alignItems: 'center',
            gap:        '0.75rem',
            animation:  'video-pause-in 0.25s ease',
          }}>
            {/* Play icon */}
            <div style={{
              width:        '52px',
              height:       '52px',
              border:       '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display:      'flex',
              alignItems:   'center',
              justifyContent:'center',
              background:   'rgba(8,8,8,0.6)',
              backdropFilter:'blur(8px)',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 3.5L14.5 9L6 14.5V3.5Z" fill="rgba(245,245,245,0.85)" />
              </svg>
            </div>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.58rem',
              color:         'rgba(245,245,245,0.45)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Click to resume
            </span>
          </div>
        )}
        <style>{`@keyframes video-pause-in { from { opacity:0; transform:scale(0.9) } to { opacity:1; transform:scale(1) } }`}</style>
      </div>

      {/* Bottom-left label: DEMO */}
      <div style={{
        position:      'absolute',
        bottom:        '0.75rem',
        left:          '0.75rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.5rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color:         'rgba(245,245,245,0.35)',
        background:    'rgba(8,8,8,0.5)',
        padding:       '0.28rem 0.6rem',
        backdropFilter:'blur(6px)',
        border:        '1px solid rgba(255,255,255,0.05)',
        pointerEvents: 'none',
        display:       'flex',
        alignItems:    'center',
        gap:           '0.4rem',
      }}>
        {/* Live red dot */}
        <span style={{
          width:        '4px',
          height:       '4px',
          borderRadius: '50%',
          background:   paused ? 'rgba(255,255,255,0.2)' : '#ef4444',
          display:      'inline-block',
          boxShadow:    paused ? 'none' : '0 0 5px rgba(239,68,68,0.7)',
          transition:   'background 0.3s ease, box-shadow 0.3s ease',
        }} />
        {paused ? 'Paused' : 'Live Demo'}
      </div>

      {/* Click-to-pause hint — visible briefly on mount, then fades */}
      <div style={{
        position:      'absolute',
        bottom:        '0.75rem',
        right:         '0.75rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.5rem',
        letterSpacing: '0.1em',
        color:         'rgba(245,245,245,0.28)',
        pointerEvents: 'none',
      }}>
        Click to pause
      </div>
    </div>
  )
}