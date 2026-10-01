import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  gsap,
  ScrollTrigger,
  useCounter,
  useParallaxImage,
  useReveal,
  useSplitReveal,
  useStaggerReveal,
} from '../lib/anim'
import { useEffect, useRef, useState } from 'react'
import { marqueeWords, stats, testimonials } from '../lib/site'

/* ---------------- Page hero (inner pages) ---------------- */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  children,
}: {
  eyebrow: string
  title: string
  highlight?: string
  description: string
  image: string
  children?: ReactNode
}) {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ start: 'top 92%', stagger: 0.022 })
  const imgWrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = imgWrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const img = el.querySelector('img')
    if (!img) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.28, yPercent: -6 },
        {
          scale: 1.12,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative isolate flex min-h-[74vh] items-end overflow-hidden pb-16 pt-36 sm:pt-40">
      <div ref={imgWrap} className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/78 to-abyss/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/45 to-transparent" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(127,240,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(127,240,232,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <nav className="flex items-center gap-2 text-[11px] font-600 uppercase tracking-[0.22em] text-mist">
          <Link to="/" className="transition-colors hover:text-aqua">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-aqua/70" />
          <span className="text-aqua">{eyebrow}</span>
        </nav>

        <h1
          ref={titleRef}
          className="display-xl mt-7 max-w-5xl text-[clamp(2.75rem,7.2vw,6.2rem)] text-cream"
        >
          {title} {highlight && <span className="italic text-gradient">{highlight}</span>}
        </h1>

        <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.85] text-mist sm:text-[17.5px]">
          {description}
        </p>

        {children && <div className="mt-9">{children}</div>}
      </div>

      <div className="hairline absolute bottom-0 left-0 h-px w-full" />
    </section>
  )
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  align = 'left',
  light = false,
  action,
}: {
  eyebrow: string
  title: string
  highlight?: string
  text?: string
  align?: 'left' | 'center'
  light?: boolean
  action?: ReactNode
}) {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ stagger: 0.02 })
  const textRef = useReveal<HTMLParagraphElement>(26, 0.12)

  return (
    <div
      className={`flex flex-col gap-8 ${
        align === 'center' ? 'items-center text-center' : 'items-start justify-between lg:flex-row lg:items-end'
      }`}
    >
      <div className={align === 'center' ? 'max-w-3xl' : 'max-w-3xl'}>
        <div
          className={`flex items-center gap-3.5 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className={`h-px w-9 ${light ? 'bg-abyss/35' : 'bg-aqua/70'}`} />
          <p className={`eyebrow ${light ? 'text-abyss/65' : 'text-aqua'}`}>{eyebrow}</p>
        </div>

        <h2
          ref={titleRef}
          className={`display-xl mt-5 text-[clamp(2.15rem,4.7vw,3.95rem)] ${
            light ? 'text-abyss' : 'text-cream'
          }`}
        >
          {title} {highlight && <span className="italic text-gradient">{highlight}</span>}
        </h2>

        {text && (
          <p
            ref={textRef}
            className={`mt-6 text-[15.5px] leading-[1.9] sm:text-[16.5px] ${
              light ? 'text-abyss/72' : 'text-mist'
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ---------------- Marquee band ---------------- */
export function Marquee({
  reverse = false,
  light = false,
  words = marqueeWords,
}: {
  reverse?: boolean
  light?: boolean
  words?: string[]
}) {
  return (
    <div
      className={`marquee-wrap relative overflow-hidden border-y py-6 ${
        light ? 'border-abyss/12 bg-cream/60' : 'border-white/10 bg-deep/40'
      }`}
    >
      <div
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{ ['--marquee-duration' as string]: '46s' }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-8 pr-8">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-8">
                <span
                  className={`whitespace-nowrap font-display text-[clamp(1.55rem,3.1vw,2.55rem)] font-500 ${
                    light ? 'text-abyss/85' : 'text-cream/92'
                  }`}
                >
                  {w}
                </span>
                <span
                  className={`h-2 w-2 rotate-45 ${
                    i % 2 === 0 ? 'bg-aqua' : light ? 'bg-abyss/45' : 'bg-gold'
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-24 ${
          light
            ? 'bg-gradient-to-r from-cream to-transparent'
            : 'bg-gradient-to-r from-abyss to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-24 ${
          light
            ? 'bg-gradient-to-l from-cream to-transparent'
            : 'bg-gradient-to-l from-abyss to-transparent'
        }`}
      />
    </div>
  )
}

/* ---------------- Stats band ---------------- */
export function StatsBand({ light = false }: { light?: boolean }) {
  const wrap = useStaggerReveal<HTMLDivElement>('top 88%', 34)

  return (
    <div
      ref={wrap}
      className={`grid gap-px overflow-hidden rounded-[26px] border sm:grid-cols-2 lg:grid-cols-5 ${
        light ? 'border-abyss/12 bg-abyss/6' : 'border-white/10 bg-white/5'
      }`}
    >
      {stats.map((s) => (
        <StatItem key={s.label} {...s} light={light} />
      ))}
    </div>
  )
}

function StatItem({
  value,
  suffix,
  prefix,
  display,
  label,
  light,
}: {
  value: number
  suffix: string
  prefix: string
  display?: string
  label: string
  light?: boolean
}) {
  const ref = useCounter<HTMLDivElement>()
  return (
    <div
      className={`group relative px-7 py-9 transition-colors duration-500 ${
        light ? 'bg-cream/70 hover:bg-cream' : 'bg-abyss/35 hover:bg-aqua/8'
      }`}
    >
      <div
        ref={ref}
        data-value={value}
        data-prefix={prefix}
        data-suffix={suffix}
        data-display={display}
        className={`font-display text-[clamp(2.35rem,4.4vw,3.35rem)] font-600 leading-none ${
          light ? 'text-abyss' : 'text-cream'
        }`}
      >
        {display ?? `${prefix}${value}${suffix}`}
      </div>
      <p
        className={`mt-3.5 text-[12px] font-600 uppercase leading-relaxed tracking-[0.15em] ${
          light ? 'text-abyss/62' : 'text-mist'
        }`}
      >
        {label}
      </p>
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-aqua to-gold transition-all duration-700 group-hover:w-full`}
      />
    </div>
  )
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [active, setActive] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (testimonials.length === 0) return
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % testimonials.length)
    }, 7200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return
    const el = wrapRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
      )
    })
    return () => ctx.revert()
  }, [active])

  if (testimonials.length === 0) {
    return (
      <div className="relative min-h-[240px] content-center text-center">
        <p className="font-display text-[clamp(1.55rem,3.15vw,2.55rem)] font-500 leading-[1.42] text-cream">
          Project references are available on request.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute -top-6 left-0 font-display text-[7rem] leading-none text-aqua/18">
        “
      </div>

      <div ref={wrapRef} className="relative min-h-[240px]">
        <p className="font-display text-[clamp(1.55rem,3.15vw,2.55rem)] font-500 leading-[1.42] text-cream">
          {testimonials[active].quote}
        </p>
        <div className="mt-9 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-aqua/35 bg-aqua/12 font-display text-lg text-aqua">
            {testimonials[active].name.charAt(0)}
          </div>
          <div>
            <p className="text-[13px] font-700 uppercase tracking-[0.19em] text-cream">
              {testimonials[active].name}
            </p>
            <p className="mt-1 text-[12.5px] tracking-[0.11em] text-mist">
              {testimonials[active].org}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? 'w-12 bg-gradient-to-r from-aqua to-gold' : 'w-6 bg-white/18 hover:bg-white/35'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- CTA button pair ---------------- */
export function CTAButtons({
  primaryLabel = 'Explore Our Services',
  primaryTo = '/services',
  secondaryLabel = 'Talk to an Engineer',
  secondaryTo = '/contact',
}: {
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        to={primaryTo}
        className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
      >
        {primaryLabel}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
          strokeWidth={2.4}
        />
      </Link>
      <Link
        to={secondaryTo}
        className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
      >
        {secondaryLabel}
      </Link>
    </div>
  )
}

/* ---------------- Parallax image frame ---------------- */
export function ParallaxFrame({
  src,
  alt,
  className = '',
  ratio = 'aspect-[4/5]',
}: {
  src: string
  alt: string
  className?: string
  ratio?: string
}) {
  const ref = useParallaxImage<HTMLDivElement>(12)
  return (
    <div ref={ref} className={`mask-img relative overflow-hidden rounded-[26px] ${ratio} ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/42 via-transparent to-transparent" />
    </div>
  )
}

/* ---------------- Scroll progress for page content ---------------- */
export function usePageIntro() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])
}
