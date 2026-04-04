import { SITE } from '@utils/constants'

const LINKS = [
  {
    label:    'Email',
    value:    SITE.email,
    href:     `mailto:${SITE.email}`,
    arrow:    '→',
    external: false,
    hint:     'Primary contact',
  },
  {
    label:    'GitHub',
    value:    'github.com/srivas-saksham',
    href:     SITE.github,
    arrow:    '↗',
    external: true,
    hint:     'Open-source work',
  },
  {
    label:    'LinkedIn',
    value:    'linkedin.com/in/saksham-srivastava',
    href:     SITE.linkedin,
    arrow:    '↗',
    external: true,
    hint:     'Professional profile',
  },
  {
    label:    'Resume',
    value:    'Download PDF',
    href:     SITE.resume,
    arrow:    '↓',
    external: false,
    hint:     'Latest version',
  },
]

function LinkRow({ link, isFirst }) {
  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '1.4rem 0',
        borderBottom:   '1px solid var(--border)',
        borderTop:      isFirst ? '1px solid var(--border)' : 'none',
        textDecoration: 'none',
        cursor:         'none',
        transition:     'padding-left 0.3s cubic-bezier(0.19,1,0.22,1), background 0.3s ease',
        position:       'relative',
        overflow:       'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.paddingLeft = '1.25rem'
        e.currentTarget.style.background  = 'rgba(71,49,152,0.04)'
        const arrow = e.currentTarget.querySelector('.link-arrow')
        if (arrow) arrow.style.color = 'var(--text)'
        const label = e.currentTarget.querySelector('.link-label')
        if (label) label.style.color = 'var(--text)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.paddingLeft = '0'
        e.currentTarget.style.background  = 'transparent'
        const arrow = e.currentTarget.querySelector('.link-arrow')
        if (arrow) arrow.style.color = 'var(--muted)'
        const label = e.currentTarget.querySelector('.link-label')
        if (label) label.style.color = 'var(--muted)'
      }}
    >
      <div>
        {/* Category label + hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.52rem',
            color:         'var(--ghost)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            {link.label}
          </span>
          {link.hint && (
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.52rem',
              color:         'var(--ghost)',
              letterSpacing: '0.04em',
              opacity:       0.6,
            }}>
              · {link.hint}
            </span>
          )}
        </div>

        {/* Value */}
        <span
          className="link-label"
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(0.9rem, 1.6vw, 1.1rem)',
            fontWeight:    500,
            color:         'var(--muted)',
            letterSpacing: '-0.01em',
            transition:    'color 0.25s ease',
          }}
        >
          {link.value}
        </span>
      </div>

      <span
        className="link-arrow"
        style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '1rem',
          color:       'var(--muted)',
          transition:  'color 0.25s ease',
          flexShrink:  0,
          marginLeft:  '1rem',
        }}
      >
        {link.arrow}
      </span>
    </a>
  )
}

/**
 * ContactLinks
 * Right-column link list for the Contact page.
 * Also includes a response-time badge and timezone note.
 */
export default function ContactLinks() {
  return (
    <div data-gsap="fade-up">
      {/* Heading hint */}
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.62rem',
        color:         'var(--ghost)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom:  '0.25rem',
      }}>
        Or reach out directly
      </p>

      {/* Link rows */}
      <div>
        {LINKS.map((link, i) => (
          <LinkRow key={link.label} link={link} isFirst={i === 0} />
        ))}
      </div>

      {/* Response-time badge */}
      <div style={{
        marginTop:   '2rem',
        padding:     '1rem 1.25rem',
        border:      '1px solid var(--border)',
        background:  'rgba(71,49,152,0.03)',
        display:     'flex',
        flexDirection:'column',
        gap:         '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width:        '6px',
            height:       '6px',
            borderRadius: '50%',
            background:   'rgba(74,222,128,0.8)',
            flexShrink:   0,
            boxShadow:    '0 0 6px rgba(74,222,128,0.5)',
          }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            color:         'var(--muted)',
          }}>
            Available for work
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.65rem',
          color:      'var(--ghost)',
          lineHeight: 1.7,
        }}>
          Typically respond within 24 hours.
          Based in New Delhi (IST, UTC+5:30).
        </p>
      </div>

      {/* Social hint row */}
      <div style={{
        marginTop:  '1.5rem',
        display:    'flex',
        gap:        '1rem',
        flexWrap:   'wrap',
      }}>
        {[
          { label: 'GitHub',   href: SITE.github   },
          { label: 'LinkedIn', href: SITE.linkedin  },
          { label: 'LeetCode', href: SITE.leetcode  },
        ].map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--ghost)',
              textDecoration:'none',
              transition:    'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--muted)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ghost)'}
          >
            {s.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}