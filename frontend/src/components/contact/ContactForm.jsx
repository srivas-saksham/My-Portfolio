import { useRef, useState } from 'react'
import Button from '@components/ui/Button'
import FlipToggle from '@components/ui/FlipToggle'
import { sendContactEmails } from '@/services/brevo'

/**
 * ContactForm
 * ─ Phone field (optional)
 * ─ Two FlipToggle questions:
 *     "Prefer WhatsApp contact over emails?"
 *     "Want me to directly call you?"
 * ─ GSAP-safe success state (no data-gsap on toggled panels)
 */

const TEXT_FIELDS = [
  {
    name:        'name',
    label:       'Your Name',
    type:        'text',
    placeholder: 'Saksham Srivastava',
    autoComplete:'name',
    optional:    false,
  },
  {
    name:        'email',
    label:       'Email Address',
    type:        'email',
    placeholder: 'you@domain.com',
    autoComplete:'email',
    optional:    false,
  },
  {
    name:        'phone',
    label:       'Phone Number',
    type:        'tel',
    placeholder: '+91 98765 43210',
    autoComplete:'tel',
    optional:    true,
  },
]

const validate = ({ name, email, phone, message }) => {
  const e = {}
  if (!name.trim())    e.name    = 'Name is required.'
  if (!email.trim())   e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.'
  if (phone.trim() && !/^[+\d\s\-().]{7,20}$/.test(phone.trim()))
    e.phone = 'Enter a valid phone number.'
  if (!message.trim()) e.message = 'Message is required.'
  else if (message.trim().length < 15) e.message = 'At least 15 characters, please.'
  return e
}

function FieldLabel({ name, label, error, optional }) {
  return (
    <label
      htmlFor={name}
      style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '0.6rem',
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.62rem',
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
      {optional && !error && (
        <span style={{
          textTransform: 'none',
          letterSpacing: '0.02em',
          color:         'rgba(113,113,113,0.6)',
          fontSize:      '0.68rem',
          fontStyle:     'italic',
        }}>
          — optional
        </span>
      )}
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

  const [fields, setFields] = useState({
    name: '', email: '', phone: '', message: '',
  })
  const [errors,   setErrors]   = useState({})
  const [status,   setStatus]   = useState('idle')
  const [focused,  setFocused]  = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // FlipToggle state: null = unanswered, true = yes, false = no
  const [prefWhatsApp, setPrefWhatsApp] = useState(null)
  const [prefCall,     setPrefCall]     = useState(null)

  const isSent = status === 'sent'

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
    setErrorMsg('')

    try {
      await sendContactEmails({
        name:        fields.name.trim(),
        email:       fields.email.trim(),
        phone:       fields.phone.trim(),
        message:     fields.message.trim(),
        prefWhatsApp,
        prefCall,
      })
      setStatus('sent')
      setFields({ name: '', email: '', phone: '', message: '' })
      setPrefWhatsApp(null)
      setPrefCall(null)
      formRef.current?.reset()
    } catch (err) {
      console.error('[ContactForm]', err)
      setStatus('error')
      setErrorMsg(err.message?.replace(/^\[Brevo\] /, '') ?? 'Something went wrong.')
    }
  }

  const inputStyle = (name) => ({
    width:        '100%',
    background:   focused === name
      ? 'rgba(71,49,152,0.04)'
      : 'rgba(255,255,255,0.018)',
    border:       'none',
    borderBottom: `1px solid ${
      errors[name]    ? 'rgba(248,113,113,0.4)'
      : focused===name  ? 'rgba(71,49,152,0.7)'
      : 'var(--border)'
    }`,
    borderTop:    `1px solid ${
      errors[name]    ? 'rgba(248,113,113,0.08)'
      : focused===name  ? 'rgba(71,49,152,0.12)'
      : 'rgba(255,255,255,0.03)'
    }`,
    borderLeft:   `2px solid ${
      focused === name
        ? errors[name] ? 'rgba(248,113,113,0.5)' : 'rgba(71,49,152,0.6)'
        : 'transparent'
    }`,
    borderRight:  '1px solid rgba(255,255,255,0.03)',
    padding:      '0.9rem 1.1rem',
    fontFamily:   'var(--font-mono)',
    fontSize:     '0.78rem',
    color:        'var(--text)',
    outline:      'none',
    lineHeight:   1.6,
    transition:   'border-color 0.25s ease, background 0.25s ease, border-left-color 0.25s ease',
    caretColor:   'var(--indigo)',
  })

  return (
    <div style={{ position: 'relative' }}>

      {/* ── SUCCESS PANEL ────────────────────────────────────────────────────
          No data-gsap attribute — toggled via CSS opacity/height only.
          This prevents GSAP's initial scan from locking it invisible.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden={!isSent}
        style={{
          position:      isSent ? 'relative' : 'absolute',
          inset:         0,
          opacity:       isSent ? 1 : 0,
          pointerEvents: isSent ? 'auto' : 'none',
          transition:    'opacity 0.45s ease',
          height:        isSent ? 'auto' : 0,
          overflow:      isSent ? 'visible' : 'hidden',
          padding:       isSent ? '3.5rem 2.5rem' : 0,
          border:        isSent ? '1px solid rgba(74,222,128,0.2)' : 'none',
          background:    'rgba(74,222,128,0.03)',
        }}
      >
        <div style={{
          position:'absolute', top:0, left:0, width:'40px', height:'40px',
          borderRight:'1px solid rgba(74,222,128,0.25)',
          borderBottom:'1px solid rgba(74,222,128,0.25)',
          pointerEvents:'none',
        }} />

        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          <span style={{
            fontFamily:'var(--font-mono)', fontSize:'0.52rem',
            color:'rgba(74,222,128,0.6)', letterSpacing:'0.18em',
            textTransform:'uppercase', display:'flex', alignItems:'center', gap:'0.5rem',
          }}>
            <span style={{
              width:'5px', height:'5px', borderRadius:'50%',
              background:'rgba(74,222,128,0.8)', display:'inline-block',
              boxShadow:'0 0 6px rgba(74,222,128,0.5)',
            }} />
            Message delivered · Confirmation sent to your inbox
          </span>

          <p style={{
            fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem, 3vw, 2rem)',
            fontWeight:600, letterSpacing:'-0.03em', lineHeight:1.05,
            color:'var(--text)', margin:0,
          }}>
            I'll get back to you<br />
            <span style={{ fontStyle:'italic', fontWeight:300, color:'rgba(245,245,245,0.45)' }}>
              within 24 hours.
            </span>
          </p>

          <p style={{
            fontFamily:'var(--font-mono)', fontSize:'0.68rem',
            color:'var(--ghost)', lineHeight:1.8, maxWidth:'32ch', margin:0,
          }}>
            Thanks for reaching out. Check your inbox for a confirmation — I read every message personally.
          </p>

          <div style={{ marginTop:'0.5rem' }}>
            <Button variant="ghost" onClick={() => setStatus('idle')}>
              Send another ↩
            </Button>
          </div>
        </div>
      </div>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-hidden={isSent}
        style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '1.75rem',
          position:      'relative',
          opacity:       isSent ? 0 : 1,
          pointerEvents: isSent ? 'none' : 'auto',
          transition:    'opacity 0.3s ease',
          height:        isSent ? 0 : 'auto',
          overflow:      isSent ? 'hidden' : 'visible',
        }}
      >
        {/* Section label */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.25rem' }}>
          <span style={{
            fontFamily:'var(--font-mono)', fontSize:'0.82rem',
            color:'var(--ghost)', letterSpacing:'0.16em', textTransform:'uppercase',
          }}>
            Write a message
          </span>
          <div style={{ flex:1, height:'1px', background:'var(--border)' }} />
        </div>

        {/* Text + phone fields */}
        {TEXT_FIELDS.map(field => (
          <div key={field.name}>
            <FieldLabel
              name={field.name}
              label={field.label}
              error={errors[field.name]}
              optional={field.optional}
            />
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
            style={{ ...inputStyle('message'), resize:'vertical', minHeight:'148px' }}
          />
          <div style={{
            display:'flex', justifyContent:'space-between',
            marginTop:'0.4rem', alignItems:'center',
          }}>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.62rem',
              color:'var(--ghost)', letterSpacing:'0.08em', opacity:0.6,
            }}>
              {fields.message.length < 15
                ? `${15 - fields.message.length} more characters needed`
                : 'Ready to send'}
            </span>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.62rem',
              letterSpacing:'0.04em', transition:'color 0.3s ease',
              color: fields.message.length < 15 ? 'var(--ghost)' : 'rgba(74,222,128,0.55)',
            }}>
              {fields.message.length}
            </span>
          </div>
        </div>

        {/* ── FLIP TOGGLES ─────────────────────────────────────────────── */}
        <div style={{
          border:     '1px solid var(--border)',
          background: 'rgba(255,255,255,0.012)',
        }}>
          {/* Block label */}
          <div style={{ padding:'0.6rem 1.1rem', borderBottom:'1px solid var(--border)' }}>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.68rem',
              letterSpacing:'0.18em', textTransform:'uppercase',
              color:'var(--ghost)', opacity:0.55,
            }}>
              Contact preferences
            </span>
          </div>

          {/* WhatsApp toggle */}
          <div style={{ padding:'0.85rem 1.1rem', borderBottom:'1px solid var(--border)' }}>
            <FlipToggle
              value={prefWhatsApp}
              onChange={setPrefWhatsApp}
              label="Prefer whatsApp contact over emails?"
            />
          </div>

          {/* Call toggle */}
          <div style={{ padding:'0.85rem 1.1rem' }}>
            <FlipToggle
              value={prefCall}
              onChange={setPrefCall}
              label="Want me to directly call you?"
            />
          </div>
        </div>

        {/* ── SUBMIT ───────────────────────────────────────────────────── */}
        <div style={{
          display:'flex', alignItems:'center', gap:'1.25rem',
          flexWrap:'wrap', paddingTop:'0.5rem', borderTop:'1px solid var(--border)',
        }}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ position:'relative', overflow:'hidden' }}
          >
            {status === 'sending' ? (
              <>
                <span style={{
                  display:'inline-block', width:'8px', height:'8px',
                  border:'1px solid rgba(8,8,8,0.3)', borderTop:'1px solid #080808',
                  borderRadius:'50%', animation:'btn-spin 0.7s linear infinite', flexShrink:0,
                }} />
                <style>{`@keyframes btn-spin { to { transform: rotate(360deg) } }`}</style>
                Sending…
              </>
            ) : 'Send Message →'}
          </Button>

          <span style={{
            fontFamily:'var(--font-mono)', fontSize:'0.58rem',
            color:'var(--ghost)', letterSpacing:'0.06em',
          }}>
            No spam. Ever.
          </span>

          {status === 'error' && (
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'0.62rem',
              color:'rgba(248,113,113,0.8)', letterSpacing:'0.04em',
              marginLeft:'auto', maxWidth:'280px', lineHeight:1.5,
            }}>
              ✕ {errorMsg || 'Something went wrong — try again'}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}