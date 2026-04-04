import { useRef, useState } from 'react'
import Button from '@components/ui/Button'

/**
 * ContactForm
 * Self-contained, polished contact form.
 * Handles its own state internally; no prop drilling needed.
 * In production: wire up emailjs or a backend endpoint in handleSubmit.
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

const inputBaseStyle = {
  width:        '100%',
  background:   'rgba(255,255,255,0.025)',
  border:       '1px solid var(--border)',
  borderRadius: '8px',
  padding:      '0.9rem 1.1rem',
  fontFamily:   'var(--font-mono)',
  fontSize:     '0.78rem',
  color:        'var(--text)',
  outline:      'none',
  lineHeight:   1.6,
  transition:   'border-color 0.2s ease, background 0.2s ease',
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

  const fieldFocus = (name) => ({
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(null),
  })

  const fieldStyle = (name) => ({
    ...inputBaseStyle,
    borderColor: errors[name]
      ? 'rgba(248,113,113,0.5)'
      : focused === name
        ? 'rgba(71,49,152,0.6)'
        : 'var(--border)',
    background: focused === name
      ? 'rgba(71,49,152,0.04)'
      : 'rgba(255,255,255,0.025)',
  })

  if (status === 'sent') {
    return (
      <div
        data-gsap="fade-up"
        style={{
          padding:     '3rem 2rem',
          border:      '1px solid rgba(74,222,128,0.25)',
          background:  'rgba(74,222,128,0.04)',
          textAlign:   'center',
          display:     'flex',
          flexDirection:'column',
          alignItems:  'center',
          gap:         '1rem',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>✓</span>
        <p style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '1.5rem',
          fontWeight:    600,
          color:         'var(--text)',
          letterSpacing: '-0.02em',
        }}>
          Message sent.
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--muted)',
          lineHeight: 1.8,
        }}>
          I'll get back to you within 24 hours.
        </p>
        <Button
          variant="ghost"
          onClick={() => setStatus('idle')}
          style={{ marginTop: '0.5rem' }}
        >
          Send another ↩
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      data-gsap="fade-up"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}
    >
      {FIELDS.map(field => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            style={{
              display:       'block',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.57rem',
              color:         errors[field.name] ? 'rgba(248,113,113,0.8)' : 'var(--muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '0.55rem',
              transition:    'color 0.2s ease',
            }}
          >
            {field.label}
            {errors[field.name] && (
              <span style={{ marginLeft: '0.75rem', textTransform: 'none', letterSpacing: 0 }}>
                — {errors[field.name]}
              </span>
            )}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            value={fields[field.name]}
            onChange={handleChange}
            {...fieldFocus(field.name)}
            style={fieldStyle(field.name)}
          />
        </div>
      ))}

      {/* Textarea */}
      <div>
        <label
          htmlFor="message"
          style={{
            display:       'block',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.57rem',
            color:         errors.message ? 'rgba(248,113,113,0.8)' : 'var(--muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom:  '0.55rem',
            transition:    'color 0.2s ease',
          }}
        >
          Message
          {errors.message && (
            <span style={{ marginLeft: '0.75rem', textTransform: 'none', letterSpacing: 0 }}>
              — {errors.message}
            </span>
          )}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What are you building? What do you need?"
          value={fields.message}
          onChange={handleChange}
          {...fieldFocus('message')}
          style={{
            ...fieldStyle('message'),
            borderRadius: '8px',
            resize:       'vertical',
            minHeight:    '140px',
          }}
        />
        {/* Character count hint */}
        <div style={{
          display:       'flex',
          justifyContent:'flex-end',
          marginTop:     '0.35rem',
        }}>
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.55rem',
            color:         fields.message.length < 15 ? 'var(--ghost)' : 'rgba(74,222,128,0.5)',
            letterSpacing: '0.04em',
          }}>
            {fields.message.length} / 15 min
          </span>
        </div>
      </div>

      {/* Submit row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          style={{ alignSelf: 'flex-start' }}
          onClick={handleSubmit}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message →'}
        </Button>

        {status === 'error' && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.65rem',
            color:      'rgba(248,113,113,0.8)',
          }}>
            Something went wrong. Try again.
          </span>
        )}
      </div>

      {/* Sending overlay shimmer */}
      {status === 'sending' && (
        <div
          aria-live="polite"
          aria-label="Sending message..."
          style={{
            position:   'absolute',
            inset:      0,
            background: 'rgba(8,8,8,0.3)',
            backdropFilter: 'blur(2px)',
            zIndex:     10,
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
    </form>
  )
}