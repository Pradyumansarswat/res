import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Waves,
  Bath,
  Shield,
  Layers,
  Flame,
  Grid3x3,
  Sparkles,
  Droplets,
  Thermometer,
  Umbrella,
  MoveRight,
  Quote,
} from 'lucide-react'
import WaterScene from '../components/WaterScene'
import { CTAButtons } from '../components/molecules/CTAButtons'
import { Marquee } from '../components/molecules/Marquee'
import { ParallaxFrame } from '../components/molecules/ParallaxFrame'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { StatsBand, Testimonials } from '../components/ui'
import {
  gsap,
  ScrollTrigger,
  useReveal,
  useSplitReveal,
  useStaggerReveal,
} from '../lib/anim'
import { process, projects, services, values } from '../lib/site'
import type { LucideIcon } from 'lucide-react'
import SEO from '../components/SEO'
import { pageSEO } from '../config/seo'
import { siteProfile } from '../config/site'
import MediaRenderer from '../components/MediaRenderer'
import type { Media } from '../components/MediaRenderer'

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  spa: Bath,
  shield: Shield,
  layers: Layers,
  flame: Flame,
  grid: Grid3x3,
  sparkles: Sparkles,
  droplets: Droplets,
  thermometer: Thermometer,
  umbrella: Umbrella,
}

const motionPanels: { tag: string; title: string; text: string; image: string; media: Media }[] = [
  {
    tag: 'Design & Drawing',
    title: 'Pool design and architecture',
    text: 'Swimming pool design, layout planning, architectural planning, technical planning and 3D visualization.',
    image: '/images/engineering.jpg',
    media: { type: 'image', src: '/images/engineering.jpg' },
  },
  {
    tag: 'Construction',
    title: 'Swimming pool construction',
    text: 'Construction solutions covering structure, waterproofing, finishing, equipment installation and commissioning.',
    image: '/images/indoor-pool.jpg',
    media: { type: 'image', src: '/images/indoor-pool.jpg' },
  },
  {
    tag: 'Pool Heating',
    title: 'Comfortable pool temperatures',
    text: 'Pool heating solutions including heat pumps, heat exchangers and electrical pool heaters.',
    image: '/images/indoor-pool.jpg',
    media: { type: 'image', src: '/images/indoor-pool.jpg' },
  },
  {
    tag: 'Pool Lighting',
    title: 'Pool lighting systems',
    text: 'LED pool lights, underwater LED lights, fountain lights and pool lighting systems.',
    image: '/images/fountain.jpg',
    media: { type: 'image', src: '/images/fountain.jpg' },
  },
  {
    tag: 'Engineering',
    title: 'Specialized engineering services',
    text: 'Pool renovation, repair, equipment, covering, waterproofing and expansion joint services.',
    image: '/images/team.jpg',
    media: { type: 'image', src: '/images/team.jpg' },
  },
]

export default function Home() {
  /* ---------- hero intro timeline ---------- */
  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-line span', {
        yPercent: 118,
        opacity: 0,
        duration: 1.35,
        stagger: 0.13,
      })
        .from('.hero-sub', { y: 26, opacity: 0, duration: 1.1 }, '-=0.85')
        .from('.hero-cta > *', { y: 26, opacity: 0, duration: 0.95, stagger: 0.12 }, '-=0.8')
        .from('.hero-card', { y: 42, opacity: 0, duration: 1.15, stagger: 0.16 }, '-=0.95')
        .from('.hero-fade', { opacity: 0, duration: 1.1, stagger: 0.1 }, '-=1')

      gsap.to('.hero-bg', {
        yPercent: 16,
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  /* ---------- pinned horizontal scroll ---------- */
  const hSection = useRef<HTMLDivElement>(null)
  const hTrack = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = hSection.current
    const track = hTrack.current
    if (!section || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 860px)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96)

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      gsap.utils.toArray<HTMLElement>('.h-panel-img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.22 },
          {
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  /* ---------- process line scrub ---------- */
  const processWrap = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = processWrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: 'bottom 78%',
            scrub: 0.6,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const servicesRef = useStaggerReveal<HTMLDivElement>('top 84%', 52)
  const valuesRef = useStaggerReveal<HTMLDivElement>('top 86%', 40)
  const aboutTitle = useSplitReveal<HTMLHeadingElement>({ stagger: 0.021 })
  const aboutText = useReveal<HTMLParagraphElement>(30, 0.18)

  /* ---------- 3D tilt on service cards ---------- */
  useEffect(() => {
    const grid = servicesRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.tilt-card'))

    const cleanups = cards.map((el) => {
      let frame = 0

      const apply = (x: number, y: number, lift: number) => {
        el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translate3d(0, ${lift}px, 0)`
        el.style.transition = 'transform .18s ease-out'
      }

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        if (frame) cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => apply(px * 7, -py * 7, -9))
      }

      const onLeave = () => {
        el.style.transition = 'transform .7s cubic-bezier(0.22,1,0.36,1)'
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)'
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        if (frame) cancelAnimationFrame(frame)
      }
    })

    return () => cleanups.forEach((fn) => fn())
  }, [servicesRef])

  return (
    <>
      <SEO title={pageSEO.home.title} description={pageSEO.home.description} path="/" />
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-16"
      >
        <div className="hero-bg absolute inset-0 -z-10">
          <WaterScene className="absolute inset-0 h-full w-full opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/88 via-abyss/25 to-abyss" />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss/92 via-abyss/28 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="hero-fade inline-flex items-center gap-3 rounded-full border border-aqua/25 bg-aqua/10 px-5 py-2.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bright" />
                </span>
                <span className="text-[10.5px] font-700 uppercase tracking-[0.24em] text-bright">
                  Est. {siteProfile.established} · New Delhi · {siteProfile.serviceAreaName}
                </span>
              </div>

              <h1 className="display-xl mt-8 text-[clamp(3.15rem,8.4vw,7.4rem)] text-cream">
                <span className="hero-line block overflow-hidden">
                  <span className="block">We Build</span>
                </span>
                <span className="hero-line block overflow-hidden">
                  <span className="block italic text-gradient">Swimming Pool Solutions</span>
                </span>
                <span className="hero-line block overflow-hidden">
                  <span className="block">& Water Bodies</span>
                </span>
              </h1>

              <p className="hero-sub mt-8 max-w-xl text-[16px] leading-[1.9] text-mist sm:text-[17.5px]">
                {siteProfile.name} provides swimming pool construction and
                water engineering services for residential, commercial, hospitality and institutional
                projects.
              </p>

              <div className="hero-cta mt-10">
                <CTAButtons
                  primaryLabel="Start Your Project"
                  primaryTo="/contact"
                  secondaryLabel="Explore Services"
                  secondaryTo="/services"
                />
              </div>
            </div>

            {/* floating glass cards */}
            <div className="lg:col-span-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="hero-card glass-dark float-y rounded-[24px] p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-aqua/16 text-aqua">
                      <Waves className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-3xl font-600 leading-none text-cream">{siteProfile.established}</p>
                      <p className="mt-1.5 text-[10px] font-700 uppercase tracking-[0.19em] text-mist">
                        Established
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-[12.5px] leading-relaxed text-mist">
                    Swimming pool design, construction and specialized engineering solutions.
                  </p>
                </div>

                <div className="hero-card glass-dark float-y rounded-[24px] p-6" style={{ animationDelay: '1.2s' }}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/16 text-gold">
                      <Thermometer className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-3xl font-600 leading-none text-cream">{siteProfile.serviceAreaName}</p>
                      <p className="mt-1.5 text-[10px] font-700 uppercase tracking-[0.19em] text-mist">
                        Service area
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-[12.5px] leading-relaxed text-mist">
                    Service provider, trader and supplier of services for project requirements.
                  </p>
                </div>

                <div className="hero-card glass-dark rounded-[24px] p-6 sm:col-span-2">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 shrink-0 text-aqua/70" />
                    <div>
                      <p className="font-display text-[19px] italic leading-relaxed text-cream/92">
                        “Design, construction, equipment and specialized engineering solutions for
                        swimming pools and related structures.”
                      </p>
                      <p className="mt-3.5 text-[10px] font-700 uppercase tracking-[0.21em] text-gold">
                        {siteProfile.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div className="hero-fade mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-7">
            <div className="flex items-center gap-3.5 text-mist">
              <span className="pulse-ring relative grid h-10 w-10 place-items-center rounded-full border border-aqua/35">
                <MoveRight className="h-4 w-4 rotate-90 text-aqua" />
              </span>
              <span className="text-[10.5px] font-700 uppercase tracking-[0.24em]">
                Scroll to explore
              </span>
            </div>

            <div className="hidden items-center gap-8 text-[10.5px] font-700 uppercase tracking-[0.21em] text-mist sm:flex">
              <span>Swimming Pools</span>
              <span className="h-1 w-1 rounded-full bg-aqua/70" />
              <span>Water Features</span>
              <span className="h-1 w-1 rounded-full bg-gold/70" />
              <span>Wellness Systems</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ================= ABOUT PREVIEW (light) ================= */}
      <section className="section-light relative overflow-hidden py-24 sm:py-32">
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-aqua/12 blur-3xl" />

        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative">
            <div className="relative rounded-[30px] border border-abyss/10 bg-abyss/6 p-3">
              <ParallaxFrame
                src="/images/hero-pool.jpg"
                media={{ type: 'image', src: '/images/hero-pool.jpg' }}
                alt="Swimming pool"
                ratio="aspect-[5/6]"
                className="rounded-[22px]"
              />

              <div className="absolute -bottom-8 -right-2 w-[58%] overflow-hidden rounded-[22px] border-[7px] border-cream shadow-[0_36px_80px_-32px_rgba(4,18,26,0.55)] sm:-right-8">
                <MediaRenderer
                  media={{
                    type: 'youtube',
                    src: 'https://www.youtube.com/embed/4ZM-rod0GhQ?si=zqAJuglHapqTdN85',
                  }}
                  fallbackSrc="/images/water-texture.jpg"
                  alt="Water texture"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -left-3 top-8 rounded-2xl border border-abyss/10 bg-cream px-6 py-5 shadow-[0_28px_60px_-28px_rgba(4,18,26,0.5)] sm:-left-9">
                <p className="font-display text-[2.35rem] font-600 leading-none text-abyss">
                  {siteProfile.established}
                </p>
                <p className="mt-1.5 text-[10px] font-700 uppercase tracking-[0.19em] text-abyss/62">
                  Established in Delhi
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-abyss/35" />
              <p className="eyebrow text-abyss/65">Who we are</p>
            </div>

            <h2
              ref={aboutTitle}
              className="display-xl mt-5 text-[clamp(2.25rem,4.9vw,4.15rem)] text-abyss"
            >
              A swimming pool engineering company built on{' '}
              <span className="italic text-gradient">precision</span>
            </h2>

            <p
              ref={aboutText}
              className="mt-7 text-[15.5px] leading-[1.92] text-abyss/72 sm:text-[16.5px]"
            >
              Established in {siteProfile.established}, {siteProfile.name} provides swimming pool
              design, construction and engineering solutions for residential, commercial,
              hospitality and institutional projects. RES also offers pool renovation, repair,
              equipment, heating, lighting, covering, waterproofing and expansion joint services.
            </p>

            <div ref={valuesRef} className="mt-10 space-y-5">
              {values.slice(0, 3).map((v) => (
                <div
                  key={v.number}
                  className="group flex gap-5 rounded-2xl border border-abyss/10 bg-cream/70 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-abyss/22 hover:bg-cream hover:shadow-[0_28px_60px_-32px_rgba(4,18,26,0.42)]"
                >
                  <span className="font-display text-[1.65rem] font-600 leading-none text-abyss/32 transition-colors duration-500 group-hover:text-abyss/70">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="text-[13px] font-700 uppercase tracking-[0.19em] text-abyss">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-abyss/66">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2.5 rounded-full bg-abyss px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:-translate-y-1 hover:bg-reef"
              >
                More About RES
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={2.3}
                />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 rounded-full border border-abyss/22 px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em] text-abyss transition-all duration-500 hover:-translate-y-1 hover:border-abyss/50"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsBand light />

      {/* ================= SERVICES ================= */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Engineered water solutions,"
            highlight="end to end"
            text="From pool design and construction to equipment, heating, lighting, renovation, waterproofing and expansion joint services."
            action={
              <Link
                to="/services"
                className="btn-ghost group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
              >
                All Services
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={2.3}
                />
              </Link>
            }
          />

          <div ref={servicesRef} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Waves
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className={`tilt-card group relative overflow-hidden rounded-[24px] border border-white/9 bg-white/[0.035] p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.07] ${
                    i === 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(420px 220px at 12% 0%, rgba(79,209,207,0.16), transparent 70%)',
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-5">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua transition-all duration-500 group-hover:-translate-y-1 group-hover:border-aqua/45 group-hover:bg-aqua/18">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-[1.6rem] font-600 leading-none text-white/12 transition-colors duration-500 group-hover:text-aqua/38">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className={`relative mt-7 font-display font-600 leading-tight text-cream ${
                      i === 0 ? 'text-[clamp(1.75rem,2.9vw,2.35rem)]' : 'text-[1.62rem]'
                    }`}
                  >
                    {s.title}
                  </h3>

                  <p className="relative mt-4 text-[13.8px] leading-[1.82] text-mist">
                    {i === 0 ? s.description : s.short}
                  </p>

                  <div className="relative mt-7 flex items-center gap-2.5 text-[10.5px] font-700 uppercase tracking-[0.2em] text-aqua">
                    <span className="link-sweep">Explore</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1"
                      strokeWidth={2.3}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= HORIZONTAL MOTION ================= */}
      <section
        ref={hSection}
        className="relative overflow-hidden bg-abyss py-20 sm:py-24 lg:h-[100vh] lg:py-0"
      >
        <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-9 bg-aqua/70" />
                <p className="eyebrow text-aqua">Our world in motion</p>
              </div>
              <h2 className="display-xl mt-5 text-[clamp(2.25rem,5vw,4.35rem)] text-cream">
                Swimming pool design, <span className="italic text-gradient">drawing</span> &
                delivery
              </h2>
            </div>

            <div className="flex items-center gap-4 text-mist">
              <span className="text-[10.5px] font-700 uppercase tracking-[0.22em]">
                Drag through the journey
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-aqua/35 text-aqua">
                <MoveRight className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div
            ref={hTrack}
            className="h-scroll-track mt-14 overflow-x-auto pb-6 pt-2 lg:mt-16 lg:overflow-visible lg:pb-0 lg:pt-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {motionPanels.map((p, i) => (
              <article
                key={p.tag}
                className="group relative w-[82vw] shrink-0 overflow-hidden rounded-[28px] border border-white/10 sm:w-[62vw] lg:w-[30vw]"
              >
                <div className="relative h-[46vh] overflow-hidden lg:h-[46vh]">
                  <MediaRenderer
                    media={p.media}
                    fallbackSrc={p.image}
                    alt={p.title}
                    className="h-panel-img h-full w-full object-cover"
                    wrapperClassName="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/28 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full border border-white/18 bg-abyss/55 px-4 py-2 text-[9.5px] font-700 uppercase tracking-[0.21em] text-cream backdrop-blur-md">
                    {String(i + 1).padStart(2, '0')} · {p.tag}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-[1.72rem] font-600 leading-tight text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[13.2px] leading-[1.78] text-mist">{p.text}</p>
                </div>
              </article>
            ))}

            <div className="flex w-[70vw] shrink-0 items-center justify-center rounded-[28px] border border-dashed border-aqua/28 bg-aqua/[0.05] p-10 lg:w-[26vw]">
              <div className="text-center">
                <h3 className="font-display text-[2rem] font-600 leading-tight text-cream">
                  Have a project <span className="italic text-gradient">in mind?</span>
                </h3>
                <p className="mx-auto mt-4 max-w-xs text-[13.5px] leading-relaxed text-mist">
                  Let our engineers study your site and recommend the right system.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary mt-7 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[10.5px] font-700 uppercase tracking-[0.19em]"
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/water-texture.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.14]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep/85 to-abyss" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="How we work"
            title="A process refined over"
            highlight="a decade"
            text="Clear stages, documented quality and zero guesswork — this is how RES takes a project from idea to crystal-clear reality."
            align="center"
          />

          <div ref={processWrap} className="relative mx-auto mt-20 max-w-4xl">
            <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-white/10 sm:left-1/2 sm:-ml-px">
              <div className="process-line h-full w-full bg-gradient-to-b from-aqua via-aqua to-gold" />
            </div>

            <div className="space-y-12">
              {process.map((p, i) => (
                <div
                  key={p.step}
                  className={`relative flex flex-col gap-6 sm:flex-row ${
                    i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                >
                  <div className="flex-1 pl-12 sm:pl-0 sm:pr-14">
                    <div className={i % 2 === 1 ? 'sm:pl-14' : 'sm:pr-14'}>
                      <span className="font-display text-[2.15rem] font-600 leading-none text-aqua/85">
                        {p.step}
                      </span>
                      <h3 className="mt-3 font-display text-[1.72rem] font-600 leading-tight text-cream">
                        {p.title}
                      </h3>
                      <p className="mt-3.5 text-[14px] leading-[1.86] text-mist">{p.text}</p>
                    </div>
                  </div>

                  <span className="absolute left-[11px] top-2 grid h-[19px] w-[19px] place-items-center rounded-full border border-aqua/60 bg-abyss sm:left-1/2 sm:-ml-[9.5px]">
                    <span className="h-[7px] w-[7px] rounded-full bg-aqua" />
                  </span>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="section-light relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Pool types"
            title="Solutions designed for"
            highlight="different applications"
            text="Residential, commercial, hospitality and institutional swimming pool requirements supported by RES."
            light
            action={
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-abyss px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:-translate-y-1 hover:bg-reef"
              >
                View All Projects
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={2.3}
                />
              </Link>
            }
          />

          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCardLight key={p.title} index={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-32">
        <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-aqua/10 blur-3xl" />

        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Areas we serve"
              title="Pool services across"
              highlight={siteProfile.serviceAreaName}
              text={`${siteProfile.name} serves ${siteProfile.serviceArea.join(', ')}.`}
            />

            <div className="mt-12 grid grid-cols-2 gap-5">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-7">
                <p className="font-display text-[2.65rem] font-600 leading-none text-cream">
                  {siteProfile.serviceAreaName}
                </p>
                <p className="mt-3 text-[11px] font-700 uppercase leading-relaxed tracking-[0.17em] text-mist">
                  Service area
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-7">
                <p className="font-display text-[2.65rem] font-600 leading-none text-cream">
                  {siteProfile.established}
                </p>
                <p className="mt-3 text-[11px] font-700 uppercase leading-relaxed tracking-[0.17em] text-mist">
                  Established
                </p>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-[30px] p-9 sm:p-11">
            <Testimonials />
          </div>
        </div>
      </section>

      <Marquee reverse />

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/pool-aerial.jpg"
            alt=""
            className="h-full w-full object-cover opacity-32"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/88 to-abyss/42" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/72" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-aqua">Begin the journey</p>
            <h2 className="display-xl mt-5 text-[clamp(2.55rem,6vw,5.15rem)] text-cream">
              Let us design the water experience your space{' '}
              <span className="italic text-gradient">deserves</span>
            </h2>
            <p className="mt-7 max-w-xl text-[16px] leading-[1.9] text-mist">
              Share your site, your vision and your budget. Our engineers will come back with an
              honest, detailed plan — no obligation, no pressure.
            </p>
            <div className="mt-10">
              <CTAButtons
                primaryLabel="Discuss Your Project"
                primaryTo="/contact"
                secondaryLabel="See What We Build"
                secondaryTo="/gallery"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectCardLight({
  title,
  category,
  location,
  scope,
  image,
  media,
  status,
  index,
}: {
  title: string
  category: string
  location: string
  scope: string
  image: string
  media?: Media
  status: string
  index: number
}) {
  return (
    <Link
      to="/projects"
      className="group relative block overflow-hidden rounded-[26px] border border-abyss/10 bg-abyss/6 transition-all duration-600 hover:-translate-y-2 hover:shadow-[0_42px_90px_-42px_rgba(4,18,26,0.62)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaRenderer
          media={media}
          fallbackSrc={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.09]"
          wrapperClassName="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/78 via-abyss/10 to-transparent" />

        <span className="absolute left-5 top-5 rounded-full border border-white/22 bg-abyss/55 px-4 py-1.5 text-[9.5px] font-700 uppercase tracking-[0.19em] text-cream backdrop-blur-md">
          {category}
        </span>

        <span
          className={`absolute right-5 top-5 rounded-full px-4 py-1.5 text-[9.5px] font-700 uppercase tracking-[0.19em] ${
            status === 'Ongoing' ? 'bg-gold/90 text-abyss' : 'bg-aqua/90 text-abyss'
          }`}
        >
          {status}
        </span>

        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-700 uppercase tracking-[0.19em] text-cream/92">
          <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
          {location}
          <span className="opacity-60">·</span>
          <span className="opacity-80">Project {String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="p-7">
        <h3 className="font-display text-[1.58rem] font-600 leading-tight text-abyss">
          {title}
        </h3>
        <p className="mt-3.5 text-[13.4px] leading-[1.8] text-abyss/64">{scope}</p>

        <div className="mt-6 flex items-center gap-2.5 text-[10.5px] font-700 uppercase tracking-[0.19em] text-abyss">
          <span className="link-sweep">View details</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1"
            strokeWidth={2.3}
          />
        </div>
      </div>
    </Link>
  )
}

/* keep ScrollTrigger referenced for tree-shaking safety */
export const __scrollTrigger = ScrollTrigger
