/**
 * projects.js
 * Single source of truth for all project data.
 *
 * Media assets are resolved at build-time via import.meta.glob in useProjectAssets.js
 * — this file only declares what *should* exist, not the resolved URLs.
 *
 * screenshots : images live at  src/assets/screenshots/{slug}/*.{jpg,jpeg,png,webp,avif}
 * video       : video lives at  src/assets/videos/{slug}.mp4   (null = no video section)
 * iframe      : derived from   live URL (null live = no iframe section)
 */

export const PROJECTS = [
  {
    id:          '01',
    slug:        'rizara-luxe',
    title:       'Rizara Luxe',
    tagline:     'Premium jewelry e-commerce brand — founded, designed, and built end-to-end.',
    description: 'Built and scaled a premium jewelry brand from zero — including the men\'s line Rira Men. End-to-end ownership: product design, pricing strategy, inventory management, and customer experience. Deployed a high-conversion React storefront with optimized UI/UX, product storytelling, and distinct brand positioning. Also handled marketing, content, and brand identity.',
    tags:        ['React', 'Tailwind CSS', 'E-Commerce', 'Founder', 'Razorpay API', 'Supabase'],
    stack:       ['React', 'Tailwind CSS', 'ExpressJS', 'Razorpay API', 'Supabase'],
    type:        'Founder & Developer',
    client:      null,
    status:      'Live',
    year:        '2026',
    live:        'https://www.rizara.in/',
    github:      'https://github.com/srivas-saksham/The-Petal-Pouches',
    // media
    hasVideo:    true,   // expects src/assets/videos/rizara-luxe.mp4
    accentColor: 'rgba(212, 55, 126, 0.15)',   // pink tint
  },
  {
    id:          '02',
    slug:        'vyan-security',
    title:       'Vyaan Security',
    tagline:     'Client web platform for a professional security services firm.',
    description: 'Modern, responsive website for Vyaan Security — a professional guard services company operating across India. Integrated an AI-powered assistant for instant client support and an email-based query system for direct communication. Highlights certified personnel, real-world threat training, and flexible security solutions for events, businesses, and residences.',
    tags:        ['React', 'Chatbot Integration', 'Client Project', 'Email System'],
    stack:       ['React', 'Tailwind CSS', 'AI Chatbot', 'Email API'],
    type:        'Client Project',
    client:      'Vyaan Security',
    status:      'Live',
    year:        '2025',
    live:        'https://vyan-security.vercel.app/',
    github:      'https://srivas-saksham.github.io/Vyan-Security/',
    hasVideo:    true,
    accentColor: 'rgba(59, 130, 246, 0.12)',   // steel-blue
  },
  {
    id:          '03',
    slug:        'docslayer',
    title:       'DocSlayer',
    tagline:     'Convert source code into structured documentation — automatically.',
    description: 'A documentation automation platform that converts source code across 40+ languages into structured Word documents. Built a FastAPI backend with asynchronous processing and real-time progress tracking. Implemented modular templates, syntax highlighting, and auto-indexing so output is actually readable — not just a raw code dump.',
    tags:        ['React', 'FastAPI', 'Python', 'REST APIs', 'Async'],
    stack:       ['React', 'FastAPI', 'Python', 'REST APIs', 'Async Processing'],
    type:        'Personal Project',
    client:      null,
    status:      'Live',
    year:        '2025',
    live:        'https://docslayer.vercel.app/',
    github:      'https://github.com/srivas-saksham/DocSlayer',
    hasVideo:    true,
    accentColor: 'rgba(255, 242, 221, 0.12)',   // brown
  },
  {
    id:          '04',
    slug:        'pathforge',
    title:       'PathForge',
    tagline:     'AI-driven personalized learning roadmaps, built for real upskilling.',
    description: 'An AI-powered platform that generates personalized skill-learning roadmaps based on user goals, current level, and target role. Built with React and Relay AI Automation during an IBM Summer Internship. Features progress tracking, curated resource integration, and intelligent roadmap generation — not just a list of links, but a structured execution system.',
    tags:        ['React', 'Relay.app', 'AI Automation', 'IBM Internship'],
    stack:       ['React', 'Relay AI Automation', 'Airtable', 'REST APIs'],
    type:        'Internship Project',
    client:      'IBM Summer Internship',
    status:      'Live',
    year:        '2025',
    live:        'https://srivas-saksham.github.io/PathForge-Roadmap/',
    github:      'https://github.com/srivas-saksham/PathForge-Roadmap',
    hasVideo:    true,
    accentColor: 'rgba(16, 185, 129, 0.12)',   // emerald
  },
  {
    id:          '05',
    slug:        'ar-pose-system',
    title:       'AR Pose System',
    tagline:     'Real-time pose tracking pipeline, streamed live to Android TV.',
    description: 'A combined Python system with server, pose AR, and viewer components. Uses a Cloudflare tunnel to expose the server publicly without a dedicated host. Target device: Android TV. Built for real-time pose tracking on constrained hardware — the kind of project that exists nowhere in a resume because it\'s purely technical curiosity executed end to end.',
    tags:        ['Python', 'Cloudflare', 'Android TV', 'AR', 'Pose Tracking'],
    stack:       ['Python', 'Cloudflare Tunnel', 'OpenCV'],
    type:        'Personal Project',
    client:      null,
    status:      'In Progress',
    year:        '2025',
    live:        null,   // no iframe — no live URL
    github:      null,
    hasVideo:    false,  // no video
    accentColor: 'rgba(245, 158, 11, 0.12)',   // amber
  },
  {
    id:          '06',
    slug:        'sancturia-wildlife',
    title:       'Sancturia Wildlife',
    tagline:     'Donation-driven platform supporting Indian wildlife sanctuaries.',
    description: 'A prototype frontend web application to support wildlife conservation in India by enabling donations and symbolic animal adoptions. Focused on increasing public awareness and facilitating direct contributions to selected wildlife sanctuaries. Built using the FAST model — clean architecture, real-world impact focus from day one.',
    tags:        ['React', 'Donations', 'FAST Model', 'Conservation'],
    stack:       ['React', 'JavaScript', 'CSS'],
    type:        'Personal Project',
    client:      null,
    status:      'Live',
    year:        '2025',
    live:        'https://srivas-saksham.github.io/SancturiaWildlife/',
    github:      'https://github.com/srivas-saksham/SancturiaWildlife',
    hasVideo:    true,
    accentColor: 'rgba(34, 197, 94, 0.10)',    // forest-green
  },
]