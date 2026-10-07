import { Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import { useSmoothScroll, scrollToTop, ScrollTrigger, gsap } from './lib/anim'
import ParticleCursor from './components/ParticleCursor'
import PoolLoader from './components/PoolLoader'
import WhatsAppButton from './components/WhatsAppButton'
import { lazyMin } from './lib/lazyMin'

const Home = lazyMin(() => import('./pages/Home'))
const About = lazyMin(() => import('./pages/About'))
const ServicesPage = lazyMin(() =>
  import('./pages/Services').then((module) => ({ default: module.ServicesPage })),
)
const ServiceDetail = lazyMin(() =>
  import('./pages/Services').then((module) => ({ default: module.ServiceDetail })),
)
const ProjectsPage = lazyMin(() =>
  import('./pages/Projects').then((module) => ({ default: module.ProjectsPage })),
)
const GalleryPage = lazyMin(() =>
  import('./pages/Projects').then((module) => ({ default: module.GalleryPage })),
)
const ContactPage = lazyMin(() =>
  import('./pages/Contact').then((module) => ({ default: module.ContactPage })),
)
const NotFound = lazyMin(() =>
  import('./pages/Contact').then((module) => ({ default: module.NotFound })),
)
const PrivacyPolicyPage = lazyMin(() =>
  import('./pages/Contact').then((module) => ({ default: module.PrivacyPolicyPage })),
)

type IntroPhase = 'show' | 'leave' | 'done'

function hasSeenIntro() {
  try {
    return Boolean(sessionStorage.getItem('res-intro'))
  } catch {
    return false
  }
}

function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    return hasSeenIntro() ? 'done' : 'show'
  })

  useEffect(() => {
    if (phase !== 'show') return

    let active = true
    let resolveMinimum!: () => void
    const minimumDuration = new Promise<void>((resolve) => {
      resolveMinimum = resolve
    })
    const minimumTimer = window.setTimeout(resolveMinimum, 4000)
    let onLoad: (() => void) | undefined
    const pageLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve()
        return
      }
      onLoad = resolve
      window.addEventListener('load', onLoad, { once: true })
    })

    void Promise.all([minimumDuration, pageLoad]).then(() => {
      if (active) setPhase('leave')
    })

    return () => {
      active = false
      window.clearTimeout(minimumTimer)
      if (onLoad) window.removeEventListener('load', onLoad)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leave') return

    let active = true
    const exitTimer = window.setTimeout(() => {
      if (!active) return
      try {
        sessionStorage.setItem('res-intro', '1')
      } catch {
        // The intro still completes when session storage is unavailable.
      }
      setPhase('done')
      onDone()
    }, 850)

    return () => {
      active = false
      window.clearTimeout(exitTimer)
    }
  }, [phase, onDone])

  if (phase === 'done') return null

  return <PoolLoader intro leaving={phase === 'leave'} label="Crafting your dream pool…" />
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    scrollToTop(true)
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 160)
    return () => window.clearTimeout(t)
  }, [location.pathname])

  return null
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: 'power2.out',
        clearProps: 'transform',
      },
    )
  }, [location.pathname])

  return (
    <div ref={ref} key={location.pathname}>
      {children}
    </div>
  )
}

function AppRoutes() {
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(hasSeenIntro)

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-abyss">
      <IntroLoader onDone={() => setIntroDone(true)} />
      <div className="app-content" aria-hidden={!introDone}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ParticleCursor />
        <ScrollManager />
        <Navbar />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          <PageTransition>
            <Suspense fallback={<PoolLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
