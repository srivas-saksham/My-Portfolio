/**
 * meta.js — Per-route SEO metadata
 *
 * Every page imports from here. Keep descriptions 150–160 chars max.
 * OG images: 1200×630 recommended. Place them in /public/og/
 */

const SITE_URL = 'https://sakshams.me'  // ← swap when live

export const META = {
  home: {
    title:       'Saksham Srivastava — Full-Stack Developer & Builder',
    description: 'Full-stack developer from New Delhi building production-grade AI systems, web platforms, and scalable digital products. Available for freelance and collaboration.',
    path:        '/',
    image:       `${SITE_URL}/og/og-home.png`,
    keywords:    'Saksham Srivastava, Full Stack Developer, React Developer, AI Developer, New Delhi, Portfolio, Web Development',
    isHomePage:  true,
  },
  projects: {
    title:       'Projects — Saksham Srivastava',
    description: 'Production-level applications: AI systems, automation workflows, e-commerce platforms, and scalable web products. Built by Saksham Srivastava.',
    path:        '/projects',
    image:       `${SITE_URL}/og/og-projects.png`,
    keywords:    'Projects, Portfolio, React Projects, AI Projects, Full Stack Projects, Web Apps',
  },
  about: {
    title:       'About — Saksham Srivastava',
    description: 'BCA 2nd year developer at VIPS Delhi. IBM-certified AI agent developer. Founder of Rizara Luxe. Building real systems with React, Node.js, Supabase, and AI.',
    path:        '/about',
    image:       `${SITE_URL}/og/og-about.png`,
    keywords:    'About Saksham Srivastava, Developer Story, Skills, Tech Stack, IBM Certification',
  },
  contact: {
    title:       'Contact — Saksham Srivastava',
    description: 'Open to freelance, collaboration, and full-time opportunities. Based in New Delhi (IST). Reach out — I respond within 24 hours.',
    path:        '/contact',
    image:       `${SITE_URL}/og/og-contact.png`,
    keywords:    'Contact Saksham Srivastava, Hire Developer, Freelance Developer, Collaboration',
  },
}

/**
 * Helper: generate per-project SEO data
 * Usage in ProjectDetailPage:
 *   const seo = getProjectMeta(project)
 *   <SEO {...seo} />
 */
export function getProjectMeta(project) {
  return {
    title:       `${project.title} — Saksham Srivastava`,
    description: project.tagline,
    path:        `/projects/${project.slug}`,
    image:       `${SITE_URL}/og/og-default.png`,
    type:        'article',
    keywords:    [project.title, ...project.tags, 'Saksham Srivastava', 'Project'].join(', '),
  }
}