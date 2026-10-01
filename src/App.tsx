import { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import { useSmoothScroll, scrollToTop, ScrollTrigger, gsap } from './lib/anim'
import ParticleCursor from './components/ParticleCursor'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const ServicesPage = lazy(() =>
  import('./pages/Services').then((module) => ({ default: module.ServicesPage })),
)
const ServiceDetail = lazy(() =>
  import('./pages/Services').then((module) => ({ default: module.ServiceDetail })),
)
const ProjectsPage = lazy(() =>
  import('./pages/Projects').then((module) => ({ default: module.ProjectsPage })),
)
const GalleryPage = lazy(() =>
  import('./pages/Projects').then((module) => ({ default: module.GalleryPage })),
)
const ContactPage = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.ContactPage })),
)
const NotFound = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.NotFound })),
)
const PrivacyPolicyPage = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.PrivacyPolicyPage })),
)

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

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-abyss">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ParticleCursor />
      <ScrollManager />
      <Navbar />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <PageTransition>
          <Suspense
            fallback={
              <div className="grid min-h-[50vh] place-items-center text-mist" role="status">
                Loading page...
              </div>
            }
          >
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
