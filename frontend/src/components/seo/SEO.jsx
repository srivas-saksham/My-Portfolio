/**
 * SEO.jsx — Production-grade metadata system
 *
 * Features:
 *  - Unique title / description per route
 *  - Full Open Graph tags (og:title, og:description, og:image, og:url, og:type)
 *  - Twitter Card tags (summary_large_image)
 *  - Canonical URL
 *  - JSON-LD structured data (Person schema on homepage, BreadcrumbList on inner pages)
 *  - Keywords meta
 *  - robots / theme-color
 *
 * Usage:
 *   <SEO
 *     title="Saksham Srivastava — Full-Stack Developer"
 *     description="..."
 *     path="/"                   // relative path, e.g. "/projects"
 *     image="/og/og-default.png" // optional override
 *     type="website"             // "website" | "article"
 *     keywords="React, Node.js, AI"
 *     noindex={false}
 *   />
 */

import { Helmet } from 'react-helmet-async'

// ─── Site-wide constants ──────────────────────────────────────────────────────
const SITE_URL    = 'https://sakshams.me'   // ← swap when domain is live
const SITE_NAME   = 'Saksham Srivastava'
const TWITTER_HANDLE = '@saksham_dev'       // ← update if you have one
const DEFAULT_IMAGE  = `${SITE_URL}/og/og-default.png`  // 1200×630

const DEFAULT_KEYWORDS = [
  'Saksham Srivastava',
  'Full Stack Developer',
  'React Developer',
  'Node.js',
  'AI Developer',
  'New Delhi',
  'Portfolio',
  'Web Development',
  'JavaScript',
  'TypeScript',
].join(', ')

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────
const personSchema = {
  '@context':  'https://schema.org',
  '@type':     'Person',
  name:        'Saksham Srivastava',
  url:         SITE_URL,
  email:       's.saksham.x@gmail.com',
  jobTitle:    'Full-Stack Developer',
  description: 'Full-stack developer and builder focused on AI systems, web platforms, and scalable digital products.',
  sameAs: [
    'https://github.com/srivas-saksham',
    'https://linkedin.com/in/saksham-srivastava',
    'https://leetcode.com/SrivasSaksham',
  ],
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'New Delhi',
    addressCountry:    'IN',
  },
  knowsAbout: [
    'React', 'Node.js', 'Next.js', 'Supabase', 'PostgreSQL',
    'Python', 'FastAPI', 'AI Agents', 'Full-Stack Development',
  ],
}

function buildBreadcrumb(path, title) {
  const parts = [
    { name: 'Home', item: SITE_URL },
  ]
  if (path && path !== '/') {
    parts.push({ name: title, item: `${SITE_URL}${path}` })
  }
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   parts.map((p, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      p.name,
      item:      p.item,
    })),
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SEO({
  title,
  description,
  path        = '/',
  image,
  type        = 'website',
  keywords,
  noindex     = false,
  isHomePage  = false,
}) {
  const resolvedTitle       = title       || `${SITE_NAME} — Full-Stack Developer`
  const resolvedDescription = description || 'Full-stack developer and builder focused on AI-driven systems, scalable web platforms, and high-performance digital products.'
  const resolvedImage       = image       || DEFAULT_IMAGE
  const canonicalUrl        = `${SITE_URL}${path}`
  const resolvedKeywords    = keywords    || DEFAULT_KEYWORDS

  const breadcrumbSchema = buildBreadcrumb(path, resolvedTitle.split('—')[0].trim())

  return (
    <Helmet>
      {/* ── Standard ───────────────────────────────────────────────────── */}
      <title>{resolvedTitle}</title>
      <meta name="description"         content={resolvedDescription} />
      <meta name="keywords"            content={resolvedKeywords} />
      <meta name="author"              content="Saksham Srivastava" />
      <meta name="theme-color"         content="#080808" />
      <meta name="color-scheme"        content="dark" />
      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {/* ── Canonical ──────────────────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ─────────────────────────────────────────────────── */}
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:type"         content={type} />
      <meta property="og:url"          content={canonicalUrl} />
      <meta property="og:title"        content={resolvedTitle} />
      <meta property="og:description"  content={resolvedDescription} />
      <meta property="og:image"        content={resolvedImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={resolvedTitle} />
      <meta property="og:locale"       content="en_US" />

      {/* ── Twitter Card ───────────────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:creator"     content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image"       content={resolvedImage} />
      <meta name="twitter:image:alt"   content={resolvedTitle} />

      {/* ── Favicons (add these files to /public) ──────────────────────── */}
      <link rel="icon"             type="image/svg+xml"  href="/favicon.svg" />
      <link rel="icon"             type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon"             type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180"  href="/apple-touch-icon.png" />
      <link rel="manifest"                          href="/site.webmanifest" />

      {/* ── JSON-LD structured data ─────────────────────────────────────── */}
      {isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  )
}