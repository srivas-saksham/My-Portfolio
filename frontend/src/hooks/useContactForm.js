import { useState, useRef } from 'react'

/**
 * useContactForm — manages contact form state, validation, and submission.
 * Integrates with EmailJS (or falls back to a dummy async for dev).
 *
 * Returns:
 *   formRef     — attach to <form> for resetting
 *   fields      — current field values
 *   errors      — per-field validation errors
 *   status      — 'idle' | 'sending' | 'sent' | 'error'
 *   handleChange — onChange handler
 *   handleSubmit — onSubmit handler
 *   reset        — clears form + status
 */
export function useContactForm({ onSuccess } = {}) {
  const formRef = useRef(null)

  const [fields, setFields] = useState({
    name:    '',
    email:   '',
    message: '',
  })

  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState('idle') // idle | sending | sent | error

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!fields.name.trim())
      e.name = 'Name is required.'
    if (!fields.email.trim())
      e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = 'Enter a valid email address.'
    if (!fields.message.trim())
      e.message = 'Message is required.'
    else if (fields.message.trim().length < 15)
      e.message = 'Message must be at least 15 characters.'
    return e
  }

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Clear error on edit
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    try {
      // ── Replace with real EmailJS call ──────────────────────────────────
      // import emailjs from 'emailjs-com'
      // await emailjs.send(
      //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
      //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      //   { from_name: fields.name, from_email: fields.email, message: fields.message },
      //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      // )
      await new Promise(r => setTimeout(r, 1400)) // dev stub
      setStatus('sent')
      setFields({ name: '', email: '', message: '' })
      formRef.current?.reset()
      onSuccess?.()
    } catch (err) {
      console.error('[useContactForm] submission failed:', err)
      setStatus('error')
    }
  }

  const reset = () => {
    setFields({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('idle')
    formRef.current?.reset()
  }

  return { formRef, fields, errors, status, handleChange, handleSubmit, reset }
}