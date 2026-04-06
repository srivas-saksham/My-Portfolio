import { useRef, useState } from 'react'
import Button from '@components/ui/Button'

/**
 * ContactForm
 * Redesigned to match the dark editorial aesthetic of the portfolio.
 * Preserves all validation logic, status states, and EmailJS stub.
 * Adds: animated field focus indicator, refined label treatment,
 * monospaced field counter, hover-glow submit row.
 */

const FIELDS = [
  {
    name:        'name',
    label:       'Your Name',
    type:        'text',
    placeholder: 'Saksham Srivastava',
    autoComplete:'name',
  },
  {
    name:        'email',
    label:       'Email Address',
    type:        'email',
    placeholder: 'you@domain.com',
    autoComplete:'email',
  },
]

const validate = ({ name, email, message }) => {
  const e = {}
  if (!name.trim())               e.name    = 'Name is required.'
  if (!email.trim())              e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.'
  if (!message.trim())            e.message = 'Message is required.'
  else if (message.trim().length < 15) e.message = 'At least 15 characters, please.'
  return e
}

function FieldLabel({ name, label, error }) {
  return (
    <label
      htmlFor={name}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.6rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.52rem',
        color:         error ? 'rgba(248,113,113,0.8)' : 'var(--ghost)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        marginBottom:  '0.6rem',
        transition:    'color 0.2s ease',
      }}
    >
      <span style={{
        width:        '3px',
        height:       '3px',
        borderRadius: '50%',
        background:   error ? 'rgba(248,113,113,0.8)' : 'var(--ghost)',
        flexShrink:   0,
        transition:   'background 0.2s ease',
      }} />
      {label}
      {error && (
        <span style={{
          textTransform: 'none',
          letterSpacing: '0.02em',
          color:         'rgba(248,113,113,0.8)',
          fontSize:      '0.6rem',
        }}>
          — {error}
        </span>
      )}
    </label>
  )
}

export default function ContactForm() {
  const formRef = useRef(null)
  const [fields,  setFields]  = useState({ name: '', email: '', message: '' })
  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState('idle') // idle | sending | sent | error
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')
    try {
      // ── Swap this stub for real EmailJS ──────────────────────────
      // await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...fields }, PUBLIC_KEY)
      await new Promise(r => setTimeout(r, 1400))
      setStatus('sent')
      setFields({ name: '', email: '', message: '' })
      formRef.current?.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (name) => ({
    width:           '100%',
    background:      focused === name
      ? 'rgba(71,49,152,0.04)'
      : 'rgba(255,255,255,0.018)',
    border:          'none',
    borderBottom:    `1px solid ${
      errors[name]
        ? 'rgba(248,113,113,0.4)'
        : focused === name
          ? 'rgba(71,49,152,0.7)'
          : 'var(--border)'
    }`,
    borderTop:       `1px solid ${
      errors[name]
        ? 'rgba(248,113,113,0.08)'
        : focused === name
          ? 'rgba(71,49,152,0.12)'
          : 'rgba(255,255,255,0.03)'
    }`,
    borderLeft:      `2px solid ${
      focused === name
        ? errors[name]
          ? 'rgba(248,113,113,0.5)'
          : 'rgba(71,49,152,0.6)'
        : 'transparent'
    }`,
    borderRight:     '1px solid rgba(255,255,255,0.03)',
    padding:         '0.9rem 1.1rem',
    fontFamily:      'var(--font-mono)',
    fontSize:        '0.78rem',
    color:           'var(--text)',
    outline:         'none',
    lineHeight:      1.6,
    transition:      'border-color 0.25s ease, background 0.25s ease, border-left-color 0.25s ease',
    caretColor:      'var(--indigo)',
  })

  if (status === 'sent') {
    return (
      <div
        data-gsap="fade-up"
        style={{
          padding:      '3.5rem 2.5rem',
          border:       '1px solid rgba(74,222,128,0.2)',
          background:   'rgba(74,222,128,0.03)',
          position:     'relative',
          overflow:     'hidden',
        }}
      >
        {/* Accent corner */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          width:      '40px',
          height:     '40px',
          borderRight:'1px solid rgba(74,222,128,0.25)',
          borderBottom:'1px solid rgba(74,222,128,0.25)',
          pointerEvents:'none',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.52rem',
            color:         'rgba(74,222,128,0.6)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display:       'flex',
            alignItems:    'center',
            gap:           '0.5rem',
          }}>
            <span style={{
              width:        '5px',
              height:       '5px',
              borderRadius: '50%',
              background:   'rgba(74,222,128,0.8)',
              display:      'inline-block',
              boxShadow:    '0 0 6px rgba(74,222,128,0.5)',
            }} />
            Message delivered
          </span>

          <p style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.5rem, 3vw, 2rem)',
            fontWeight:    600,
            letterSpacing: '-0.03em',
            lineHeight:    1.05,
            color:         'var(--text)',
          }}>
            I'll get back to you<br />
            <span style={{
              fontStyle:  'italic',
              fontWeight: 300,
              color:      'rgba(245,245,245,0.45)',
            }}>
              within 24 hours.
            </span>
          </p>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.68rem',
            color:      'var(--ghost)',
            lineHeight: 1.8,
            maxWidth:   '32ch',
          }}>
            Thanks for reaching out. I read every message personally.
          </p>

          <div style={{ marginTop: '0.5rem' }}>
            <Button variant="ghost" onClick={() => setStatus('idle')}>
              Send another ↩
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      data-gsap="fade-up"
      style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '1.75rem',
        position:       'relative',
      }}
    >
      {/* Section index label */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.75rem',
        marginBottom:  '0.25rem',
      }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.82rem',
          color:         'var(--ghost)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}>
          Write a message
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Text fields */}
      {FIELDS.map(field => (
        <div key={field.name}>
          <FieldLabel name={field.name} label={field.label} error={errors[field.name]} />
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            value={fields[field.name]}
            onChange={handleChange}
            onFocus={() => setFocused(field.name)}
            onBlur={() => setFocused(null)}
            style={inputStyle(field.name)}
          />
        </div>
      ))}

      {/* Textarea */}
      <div>
        <FieldLabel name="message" label="Message" error={errors.message} />
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What are you building? What do you need?"
          value={fields.message}
          onChange={handleChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle('message'),
            resize:    'vertical',
            minHeight: '148px',
          }}
        />
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          marginTop:      '0.4rem',
          alignItems:     'center',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.52rem',
            color:         'var(--ghost)',
            letterSpacing: '0.08em',
            opacity:       0.6,
          }}>
            {fields.message.length < 15
              ? `${15 - fields.message.length} more characters needed`
              : 'Ready to send'}
          </span>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.52rem',
            color:         fields.message.length < 15
              ? 'var(--ghost)'
              : 'rgba(74,222,128,0.55)',
            letterSpacing: '0.04em',
            transition:    'color 0.3s ease',
          }}>
            {fields.message.length}
          </span>
        </div>
      </div>

      {/* Submit row */}
      <div style={{
        display:     'flex',
        alignItems:  'center',
        gap:         '1.25rem',
        flexWrap:    'wrap',
        paddingTop:  '0.5rem',
        borderTop:   '1px solid var(--border)',
      }}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {status === 'sending' ? (
            <>
              <span style={{
                display:     'inline-block',
                width:       '8px',
                height:      '8px',
                border:      '1px solid rgba(8,8,8,0.3)',
                borderTop:   '1px solid #080808',
                borderRadius:'50%',
                animation:   'btn-spin 0.7s linear infinite',
                flexShrink:  0,
              }} />
              <style>{`@keyframes btn-spin { to { transform: rotate(360deg) } }`}</style>
              Sending…
            </>
          ) : 'Send Message →'}
        </Button>

        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.58rem',
          color:         'var(--ghost)',
          letterSpacing: '0.06em',
        }}>
          No spam. Ever.
        </span>

        {status === 'error' && (
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.62rem',
            color:         'rgba(248,113,113,0.8)',
            letterSpacing: '0.04em',
            marginLeft:    'auto',
          }}>
            ✕ Something went wrong — try again
          </span>
        )}
      </div>
    </form>
  )
}