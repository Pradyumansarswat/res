import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ArrowUpRight, MapPin } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/anim'
import { navLinks, site } from '../../lib/site'
import { Logo } from '../atoms/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 420 && y > lastY.current && !open)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <>
      <div
        id="scroll-progress"
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-bright via-aqua to-gold"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-[650ms] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'border-b border-white/10 bg-abyss/85 py-3 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-b border-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo compact={scrolled} />

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `link-sweep relative text-[12px] font-600 uppercase tracking-[0.19em] transition-colors duration-300 ${
                      isActive ? 'active text-bright' : 'text-cream/80 hover:text-bright'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[11px] font-600 uppercase tracking-[0.16em] text-cream/85 transition-colors duration-300 hover:border-aqua/45 hover:text-bright xl:flex"
            >
              <Phone className="h-3.5 w-3.5 text-aqua" strokeWidth={2.2} />
              {site.phone}
            </a>

            <Link
              to="/contact"
              className="btn-primary hidden rounded-full px-6 py-3 text-[11px] font-700 uppercase tracking-[0.18em] sm:inline-flex"
            >
              Start a Project
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream transition-colors hover:border-aqua/45 hover:text-bright lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[59] transition-all duration-[600ms] lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-abyss/97 backdrop-blur-2xl" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-aqua/12 blur-3xl" />
          <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.to}
                className="overflow-hidden"
                style={{
                  transitionDelay: `${120 + i * 70}ms`,
                  transform: open ? 'translateY(0)' : 'translateY(28px)',
                  opacity: open ? 1 : 0,
                  transition: 'transform .7s cubic-bezier(0.22,1,0.36,1), opacity .7s ease',
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-white/8 py-4 font-display text-4xl font-500 ${
                      isActive ? 'text-bright' : 'text-cream'
                    }`
                  }
                >
                  {link.label}
                  <ArrowUpRight className="h-6 w-6 text-aqua/70" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-5">
            <Link
              to="/contact"
              className="btn-primary flex w-full items-center justify-center rounded-full px-8 py-4 text-xs font-700 uppercase tracking-[0.22em]"
            >
              Start a Project
            </Link>
            <div className="space-y-2 text-sm text-mist">
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-aqua" /> {site.phone}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                {site.address.full}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
