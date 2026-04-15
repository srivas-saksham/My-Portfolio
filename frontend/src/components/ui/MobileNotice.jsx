// MobileNotice.jsx
// Visible only on mobile & tablet (≤ 1024px)
// Dismissed via "Got it" (session) or "Don't show again" (localStorage)

import { useState, useEffect } from 'react'
import { LaptopMinimal } from 'lucide-react'

const STORAGE_KEY = 'mobile_notice_dismissed'

export default function MobileNotice() {
  const [visible, setVisible]   = useState(false)
  const [fadeOut, setFadeOut]   = useState(false)

  // Only show if not permanently dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      // Small delay so it appears after root mounts
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = (permanent = false) => {
    if (permanent) localStorage.setItem(STORAGE_KEY, 'true')
    setFadeOut(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <>
      <div
        className="mobile-notice-overlay"
        style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        {/* Background glow */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '-20%',
          left:          '50%',
          transform:     'translateX(-50%)',
          width:         '80vw',
          height:        '80vw',
          background:    'radial-gradient(ellipse at center, rgba(71,49,152,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Card */}
        <div style={{
          position:             'relative',
          zIndex:               2,
          background:           'rgba(255,255,255,0.028)',
          border:               '1px solid rgba(255,255,255,0.07)',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius:         '16px',
          padding:              '2.25rem 1.75rem 1.75rem',
          maxWidth:             '340px',
          width:                '88vw',
          display:              'flex',
          flexDirection:        'column',
          alignItems:           'center',
          gap:                  '1.25rem',
          textAlign:            'center',
          animation:            'noticeSlideUp 0.55s cubic-bezier(0.19,1,0.22,1) both',
        }}>

          {/* Icon */}
          <div style={{
            width:          '44px',
            height:         '44px',
            borderRadius:   '10px',
            background:     'rgba(71,49,152,0.15)',
            border:         '1px solid rgba(71,49,152,0.3)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '1.25rem',
          }}>
            <LaptopMinimal size={20} color="rgba(255, 255, 255, 0.85)" />
          </div>

          {/* Eyebrow */}
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.58rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'rgba(255, 255, 255, 0.85)',
            marginTop:     '-0.5rem',
          }}>
            Quick note
          </span>

          {/* Heading */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.5rem, 6vw, 1.9rem)',
            fontWeight:    700,
            letterSpacing: '-0.03em',
            lineHeight:    1,
            color:         'var(--text)',
            marginTop:     '-0.5rem',
          }}>
            Built for Desktop
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.67rem',
            color:      'var(--muted)',
            lineHeight: 1.9,
            maxWidth:   '255px',
          }}>
            This site is crafted for larger screens. For the full experience, visit on a desktop or laptop.
          </p>

          {/* Divider */}
          <div style={{
            width:      '100%',
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }} />

          {/* Actions */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '0.65rem',
            width:         '100%',
          }}>
            {/* Primary — Got it */}
            <button
              onClick={() => dismiss(false)}
              style={{
                width:         '100%',
                padding:       '0.75rem 1rem',
                borderRadius:  '8px',
                background:    'rgba(71,49,152,0.22)',
                border:        '1px solid rgba(71,49,152,0.45)',
                color:         'var(--text)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor:        'pointer',
                transition:    'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background    = 'rgba(71,49,152,0.35)'
                e.currentTarget.style.borderColor   = 'rgba(71,49,152,0.7)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background    = 'rgba(71,49,152,0.22)'
                e.currentTarget.style.borderColor   = 'rgba(71,49,152,0.45)'
              }}
            >
              Got it ↗
            </button>

            {/* Secondary — Never show again */}
            <button
              onClick={() => dismiss(true)}
              style={{
                width:         '100%',
                padding:       '0.65rem 1rem',
                borderRadius:  '8px',
                background:    'transparent',
                border:        '1px solid rgba(255,255,255,0.06)',
                color:         'var(--ghost)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor:        'pointer',
                transition:    'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color       = 'var(--muted)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color       = 'var(--ghost)'
              }}
            >
              Don't show <span className="text-white/80"> ever </span> again
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .mobile-notice-overlay {
          display:         none;
          position:        fixed;
          inset:           0;
          z-index:         9999;
          background:      rgba(8,8,8,0.82);
          backdrop-filter: blur(4px);
          align-items:     center;
          justify-content: center;
        }

        @media (max-width: 875px) {
          .mobile-notice-overlay {
            display: flex;
          }
        }

        @keyframes noticeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}