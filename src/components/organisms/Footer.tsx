import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowUp,
} from 'lucide-react'
import { Logo } from '../atoms/Logo'
import { services, site, navLinks } from '../../lib/site'
import { scrollToTop, useReveal } from '../../lib/anim'

const socialIcons: Record<string, typeof Facebook> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
}

export default function Footer() {
  const ctaRef = useReveal<HTMLDivElement>(36, 0, 'top 92%')

  return (
    <footer className="relative overflow-hidden bg-abyss pt-24">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={ctaRef}
          className="noise relative overflow-hidden rounded-[32px] border border-aqua/18 bg-gradient-to-br from-reef via-deep to-abyss px-7 py-14 sm:px-12 lg:px-16 lg:py-16"
        >
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-aqua/16 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow text-aqua">Let us build together</p>
              <h2 className="display-xl mt-4 text-[clamp(2.15rem,4.6vw,3.9rem)] text-cream">
                Ready to bring water <span className="italic text-gradient">to life</span> in your
                space?
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
                From pool construction to water features, RES serves requirements across Delhi NCR.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
              >
                Book a Consultation
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
              >
                <Phone className="h-4 w-4" strokeWidth={2.2} />
                Call the Team
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-mist">
                {site.fullName} ({site.name}) — established {site.established} in {site.address.locality}. Swimming pool
                and water engineering services across Delhi NCR.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.label] ?? ArrowUpRight
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-cream/80 transition-all duration-400 hover:-translate-y-1 hover:border-aqua/50 hover:bg-aqua/12 hover:text-bright"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-700 uppercase tracking-[0.24em] text-gold">Company</h3>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-sweep text-[14px] text-mist transition-colors duration-300 hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="link-sweep text-[14px] text-mist transition-colors hover:text-cream"
                >
                  Pool Equipment
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-700 uppercase tracking-[0.24em] text-gold">
              Services
            </h3>
            <ul className="mt-6 space-y-3.5">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="link-sweep inline-flex items-center gap-1.5 text-[14px] text-mist transition-colors duration-300 hover:text-cream"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-700 uppercase tracking-[0.24em] text-gold">
              Get in Touch
            </h3>
            <ul className="mt-6 space-y-5 text-[14px] text-mist">
              <li className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aqua/22 bg-aqua/10">
                  <MapPin className="h-4 w-4 text-aqua" />
                </span>
                <span className="leading-relaxed">
                  {site.address.full}
                </span>
              </li>
              <li className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aqua/22 bg-aqua/10">
                  <Phone className="h-4 w-4 text-aqua" />
                </span>
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-cream">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aqua/22 bg-aqua/10">
                  <Mail className="h-4 w-4 text-aqua" />
                </span>
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-aqua/22 bg-aqua/10">
                  <Clock className="h-4 w-4 text-aqua" />
                </span>
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="text-[12.5px] tracking-wide text-mist/75">
            © {new Date().getFullYear()} {site.fullName} (RES). All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12px] uppercase tracking-[0.16em] text-mist/75">
            <Link to="/about" className="link-sweep transition-colors hover:text-cream">
              About
            </Link>
            <Link to="/contact" className="link-sweep transition-colors hover:text-cream">
              Contact
            </Link>
            <Link to="/services" className="link-sweep transition-colors hover:text-cream">
              Services
            </Link>
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              className="group inline-flex items-center gap-2 text-aqua transition-colors hover:text-bright"
            >
              Back to top
              <span className="grid h-9 w-9 place-items-center rounded-full border border-aqua/35 transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden pb-6 pt-4">
        <div className="marquee-wrap select-none">
          <div className="marquee-track" style={{ ['--marquee-duration' as string]: '58s' }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-10 pr-10">
                {['RES', 'WATER ENGINEERING', 'SWIMMING POOLS', 'WELLNESS', 'FOUNTAINS'].map(
                  (w, i) => (
                    <span
                      key={`${k}-${w}-${i}`}
                      className="whitespace-nowrap font-display text-[clamp(3.2rem,9vw,8.4rem)] font-600 leading-none text-transparent"
                      style={{
                        WebkitTextStroke: '1px rgba(127,240,232,0.16)',
                      }}
                    >
                      {w}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
