import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Analytics } from "@vercel/analytics/react";

import Navbar      from '@components/layout/Navbar'
import Footer      from '@components/layout/Footer'
import CustomCursor from '@components/layout/CustomCursor'
import MobileNotice from '@components/ui/MobileNotice'

import HomePage          from '@pages/HomePage'
import ProjectsPage      from '@pages/ProjectsPage'
import ProjectDetailPage from '@pages/ProjectDetailPage'
import AboutPage         from '@pages/AboutPage'
import ContactPage       from '@pages/ContactPage'
import NotFoundPage      from '@pages/NotFoundPage'

// ── New hook wired in ─────────────────────────────────────────────────────────
import { ScrollProgressBar } from '@hooks/useScrollProgress.jsx'

gsap.registerPlugin(ScrollTrigger)

function ScrollReset() {
  const location = useLocation()

  useEffect(() => {
    // Kill all existing triggers first
    ScrollTrigger.getAll().forEach(t => t.kill())

    // Force scroll to top — instant to win against ScrollTrigger
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Double-tap on next frame to catch any late fighters
    const id = requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })

    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return null
}

function AppShell() {
  return (
    <>
      <Analytics/>
      <MobileNotice />
      {/* Thin indigo reading-progress bar at the very top */}
      <ScrollProgressBar color="var(--indigo)" height="2px" zIndex={9998} />

      <CustomCursor />
      <ScrollReset />
      <Navbar />

      <main>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/projects"       element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="*"               element={<NotFoundPage />} />
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