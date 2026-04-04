import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import CustomCursor from '@components/layout/CustomCursor'

import HomePage from '@pages/HomePage'
import ProjectsPage from '@pages/ProjectsPage'
import ProjectDetailPage from '@pages/ProjectDetailPage'
import AboutPage from '@pages/AboutPage'
import ContactPage from '@pages/ContactPage'
import NotFoundPage from '@pages/NotFoundPage'

gsap.registerPlugin(ScrollTrigger)

// ── Curtain transition controller ─────────────────────────────────────────────
function PageTransitionCurtain() {
  const curtainRef = useRef(null)
  const location   = useLocation()
  const isFirst    = useRef(true)

  useEffect(() => {
    // Skip the very first render — no transition on initial page load
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const curtain = curtainRef.current
    if (!curtain) return

    const tl = gsap.timeline()
    tl.set(curtain, { yPercent: 100, pointerEvents: 'all' })
      .to(curtain, {
        yPercent:  0,
        duration:  0.35,
        ease:      'expo.inOut',
      })
      .to(curtain, {
        yPercent:  -100,
        duration:  0.35,
        ease:      'expo.inOut',
        delay:     0.05,
      })
      .set(curtain, { pointerEvents: 'none' })
  }, [location.pathname])

  return (
    <div
      ref={curtainRef}
      style={{
        position:      'fixed',
        inset:         0,
        background:    'var(--indigo)',
        zIndex:        9999,
        transform:     'translateY(100%)',
        pointerEvents: 'none',
        willChange:    'transform',
      }}
    />
  )
}

// ── Scroll to top on route change ─────────────────────────────────────────────
function ScrollReset() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Kill all ScrollTriggers on route change, let pages re-init their own
    ScrollTrigger.getAll().forEach(t => t.kill())
  }, [location.pathname])
  return null
}

// ── App shell ─────────────────────────────────────────────────────────────────
function AppShell() {
  return (
    <>
      <CustomCursor />
      <PageTransitionCurtain />
      <ScrollReset />
      <Navbar />

      <main>
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/projects"          element={<ProjectsPage />} />
          <Route path="/projects/:slug"    element={<ProjectDetailPage />} />
          <Route path="/about"             element={<AboutPage />} />
          <Route path="/contact"           element={<ContactPage />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  )
}