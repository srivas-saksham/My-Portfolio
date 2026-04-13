/**
 * brevo.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Brevo transactional email service.
 *
 * Templates are imported at build time via Vite's ?raw suffix.
 * This resolves them from src/components/templates/ with zero runtime fetch,
 * no SPA catch-all ambiguity, and no dependency on /public.
 *
 * ─── .env.local ──────────────────────────────────────────────────────────────
 *  VITE_BREVO_API_KEY         xkeysib-...
 *  VITE_BREVO_SENDER_EMAIL    s.saksham.x@gmail.com
 *  VITE_BREVO_SENDER_NAME     Saksham Srivastava
 *  VITE_OWNER_EMAIL           s.saksham.x@gmail.com
 *  VITE_OWNER_NAME            Saksham
 */

import ownerRaw  from '@/components/templates/owner-notification.html?raw'
import clientRaw from '@/components/templates/client-confirmation.html?raw'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

// ─── Timestamp ────────────────────────────────────────────────────────────────

function formatTimestamp() {
  return new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

// ─── Interpolation ────────────────────────────────────────────────────────────
/**
 * Replaces every {{ params.key }} token in the HTML string with the
 * matching value from the params map.
 * Handles optional whitespace inside the braces.
 * Unmatched keys are replaced with '' — never left as raw tokens.
 */
function interpolate(html, params) {
  return html.replace(
    /\{\{\s*params\.(\w+)\s*\}\}/g,
    (_, key) => (params[key] != null ? String(params[key]) : ''),
  )
}

// ─── Preference pill ──────────────────────────────────────────────────────────
/**
 * Maps boolean | null to the four CSS values injected into the owner
 * template's preference pill cells.
 *
 * The HTML template must use these tokens WITHOUT surrounding single quotes:
 *   background-color:{{ params.whatsAppBg }};        ✓ correct
 *   background-color:'{{ params.whatsAppBg }}';      ✗ invalid CSS, Brevo rejects
 */
function prefPill(value) {
  if (value === true) {
    return {
      bg:     'rgba(74,222,128,0.08)',
      border: '1px solid rgba(74,222,128,0.35)',
      color:  'rgba(74,222,128,0.9)',
      label:  'Yes',
    }
  }
  if (value === false) {
    return {
      bg:     'rgba(248,113,113,0.08)',
      border: '1px solid rgba(248,113,113,0.3)',
      color:  'rgba(248,113,113,0.85)',
      label:  'No',
    }
  }
  return {
    bg:     'rgba(71,49,152,0.08)',
    border: '1px solid rgba(71,49,152,0.25)',
    color:  'rgba(138,122,255,0.6)',
    label:  'Not answered',
  }
}

// ─── Phone row ────────────────────────────────────────────────────────────────
/**
 * Returns a complete table-row HTML snippet for the phone field,
 * or '' when no phone was provided.
 * Injected into the owner template via {{ params.phoneRow }}.
 */
function buildPhoneRow(phone) {
  if (!phone) return ''
  return (
    `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:14px;">` +
      `<tr>` +
        `<td width="56" style="vertical-align:top;padding-top:2px;">` +
          `<span style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#717171;">Phone</span>` +
        `</td>` +
        `<td>` +
          `<a href="tel:${phone}" style="font-family:'Courier New',monospace;font-size:13px;color:#8a7aff;letter-spacing:0.02em;text-decoration:none;border-bottom:1px solid rgba(138,122,255,0.3);padding-bottom:1px;">${phone}</a>` +
        `</td>` +
      `</tr>` +
    `</table>`
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
/**
 * sendContactEmails
 *
 * Sends two transactional emails:
 *   1. Owner notification  → VITE_OWNER_EMAIL (your inbox)
 *   2. Client confirmation → the submitter's email address
 *
 * Sent sequentially so a failure in one surfaces a clear error
 * without silently suppressing the other.
 *
 * @param {{
 *   name:         string
 *   email:        string
 *   phone?:       string
 *   message:      string
 *   prefWhatsApp: boolean | null
 *   prefCall:     boolean | null
 * }} payload
 */
export async function sendContactEmails({
  name,
  email,
  phone        = '',
  message,
  prefWhatsApp = null,
  prefCall     = null,
}) {
  const apiKey      = import.meta.env.VITE_BREVO_API_KEY
  const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL
  const senderName  = import.meta.env.VITE_BREVO_SENDER_NAME  || 'Saksham Srivastava'
  const ownerEmail  = import.meta.env.VITE_OWNER_EMAIL
  const ownerName   = import.meta.env.VITE_OWNER_NAME         || 'Saksham'

  if (!apiKey)      throw new Error('[Brevo] Missing VITE_BREVO_API_KEY')
  if (!senderEmail) throw new Error('[Brevo] Missing VITE_BREVO_SENDER_EMAIL')
  if (!ownerEmail)  throw new Error('[Brevo] Missing VITE_OWNER_EMAIL')

  const headers = {
    accept:         'application/json',
    'content-type': 'application/json',
    'api-key':      apiKey,
  }

  const sender    = { email: senderEmail, name: senderName }
  const firstName = name.split(' ')[0]
  const timestamp = formatTimestamp()
  const replyUrl  = `mailto:${email}?subject=Re%3A%20Your%20message%20to%20Saksham`

  const whatsApp  = prefPill(prefWhatsApp)
  const call      = prefPill(prefCall)

  // ── Build owner HTML ───────────────────────────────────────────────────────
  const ownerHtml = interpolate(ownerRaw, {
    senderName,
    senderFirstName: firstName,
    senderEmail:     email,
    message,
    timestamp,
    replyUrl,
    phoneRow:        buildPhoneRow(phone),
    whatsAppBg:      whatsApp.bg,
    whatsAppBorder:  whatsApp.border,
    whatsAppColor:   whatsApp.color,
    whatsAppLabel:   whatsApp.label,
    callBg:          call.bg,
    callBorder:      call.border,
    callColor:       call.color,
    callLabel:       call.label,
  })

  // ── Build client HTML ──────────────────────────────────────────────────────
  const clientHtml = interpolate(clientRaw, {
    firstName,
    fullName:  name,
    message,
    timestamp,
  })

  // ── Send owner notification ────────────────────────────────────────────────
  const ownerRes = await fetch(BREVO_API_URL, {
    method:  'POST',
    headers,
    body: JSON.stringify({
      sender,
      to:          [{ email: ownerEmail, name: ownerName }],
      replyTo:     { email, name },
      subject:     `${firstName} reached out — new inquiry`,
      htmlContent: ownerHtml,
    }),
  })

  if (!ownerRes.ok) {
    const body = await ownerRes.json().catch(() => ({}))
    throw new Error(
      `[Brevo] Owner email failed (${ownerRes.status}): ${body.message ?? 'Unknown error'}`,
    )
  }

  // ── Send client confirmation ───────────────────────────────────────────────
  const clientRes = await fetch(BREVO_API_URL, {
    method:  'POST',
    headers,
    body: JSON.stringify({
      sender,
      to:      [{ email, name }],
      subject: `Got your message, ${firstName} — I'll be in touch`,
      htmlContent: clientHtml,
    }),
  })

  if (!clientRes.ok) {
    const body = await clientRes.json().catch(() => ({}))
    throw new Error(
      `[Brevo] Client email failed (${clientRes.status}): ${body.message ?? 'Unknown error'}`,
    )
  }
}