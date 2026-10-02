import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Layers3, Clock3, LayoutGrid, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import {
  PageHero,
  SectionHeading,
  StatsBand,
  CTAButtons,
  Marquee,
  Testimonials,
} from '../components/ui'
import { useRefreshScrollTriggers, useStaggerReveal, gsap } from '../lib/anim'
import { galleryImages, projects } from '../lib/site'
import { useEffect, useRef } from 'react'
import SEO from '../components/SEO'
import { pageSEO } from '../config/seo'
import { siteProfile } from '../config/site'
import MediaRenderer from '../components/MediaRenderer'

/* ============================ PROJECTS ============================ */
const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Institutional']

export function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  useRefreshScrollTriggers([filter])

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { opacity: 0, y: 38, scale: 0.975 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          overwrite: true,
        },
      )
    })
    return () => ctx.revert()
  }, [filter])

  return (
    <>
      <SEO
        title={pageSEO.projects.title}
        description={pageSEO.projects.description}
        path="/projects"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]}
      />
      <PageHero
        eyebrow="Our Projects"
        title="Engineered work that"
        highlight="speaks for itself"
        description={`Explore swimming pool and water engineering applications supported by ${siteProfile.name}. Contact ${siteProfile.shortName} to discuss a project requirement.`}
        image="/images/hero-pool.jpg"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {[
              { icon: Layers3, label: 'Design + construction' },
              { icon: MapPin, label: 'North India service area' },
              { icon: Clock3, label: 'Engineering solutions' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 text-cream/88">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-aqua/30 bg-aqua/12">
                <f.icon className="h-4 w-4 text-aqua" strokeWidth={2} />
              </span>
              <span className="text-[10.5px] font-700 uppercase tracking-[0.18em]">{f.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* filters */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-9 bg-aqua/70" />
                <p className="eyebrow text-aqua">Portfolio</p>
              </div>
              <h2 className="display-xl mt-5 text-[clamp(2.15rem,4.5vw,3.65rem)] text-cream">
                Filter by <span className="italic text-gradient">category</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {categories.map((c) => {
                const active = filter === c
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    className={`rounded-full border px-6 py-3 text-[10.5px] font-700 uppercase tracking-[0.18em] transition-all duration-400 ${
                      active
                        ? 'border-aqua/60 bg-aqua text-abyss shadow-[0_18px_40px_-18px_rgba(79,209,207,0.85)]'
                        : 'border-white/12 bg-white/[0.036] text-cream/82 hover:-translate-y-0.5 hover:border-aqua/38 hover:text-bright'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          <div ref={gridRef} className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.title}
                to="/contact"
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.032] transition-all duration-500 hover:-translate-y-2 hover:border-aqua/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <MediaRenderer
                    media={p.media}
                    fallbackSrc={p.image}
                    alt={`${p.title}, ${p.category} swimming pool project`}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.1]"
                    wrapperClassName="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/22 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-abyss/58 px-4 py-1.5 text-[9.5px] font-700 uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                    {p.category}
                  </span>

                  <span
                    className={`absolute right-5 top-5 rounded-full px-4 py-1.5 text-[9.5px] font-700 uppercase tracking-[0.18em] ${
                      p.status === 'Ongoing' ? 'bg-gold text-abyss' : 'bg-aqua text-abyss'
                    }`}
                  >
                    {p.status}
                  </span>

                  <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-700 uppercase tracking-[0.18em] text-cream/92">
                    <MapPin className="h-3.5 w-3.5 text-aqua" strokeWidth={2.3} />
                    {p.location}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-[1.58rem] font-600 leading-tight text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[13.2px] leading-[1.82] text-mist">{p.scope}</p>

                  <div className="mt-6 flex items-center gap-2.5 text-[10.5px] font-700 uppercase tracking-[0.19em] text-aqua">
                    <span className="link-sweep">Enquire about similar work</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1"
                      strokeWidth={2.3}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-14 rounded-[24px] border border-dashed border-white/14 bg-white/[0.028] p-14 text-center">
              <LayoutGrid className="mx-auto h-10 w-10 text-aqua/60" />
              <p className="mt-6 font-display text-[1.75rem] font-600 text-cream">
                Projects coming soon
              </p>
              <p className="mx-auto mt-3 max-w-md text-[13.6px] leading-relaxed text-mist">
                We are currently documenting projects in this category. Reach out and we will share
                references directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <Marquee />

      {/* capability strip */}
      <section className="section-light relative overflow-hidden py-24 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Behind the work"
            title="What every RES project"
            highlight="shares"
            light
            text="These are service areas to discuss with RES based on your project requirements."
            align="center"
          />

          <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: 'Project Requirements',
                d: 'Discuss site conditions and project requirements with RES.',
              },
              {
                t: 'Service Scope',
                d: 'Confirm which pool and water engineering services suit your project.',
              },
              {
                t: 'Project Details',
                d: 'Ask RES for confirmed information about relevant project experience.',
              },
              {
                t: 'Enquiries',
                d: 'Contact RES to discuss next steps for your requirements.',
              },
            ].map((c) => (
              <div
                key={c.t}
                className="group rounded-[22px] border border-abyss/12 bg-cream/70 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-cream hover:shadow-[0_36px_80px_-38px_rgba(4,18,26,0.5)]"
              >
                <div className="h-[3px] w-11 rounded-full bg-gradient-to-r from-aqua to-gold transition-all duration-500 group-hover:w-20" />
                <h3 className="mt-6 font-display text-[1.52rem] font-600 leading-tight text-abyss">
                  {c.t}
                </h3>
                <p className="mt-4 text-[13.3px] leading-[1.84] text-abyss/66">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <SectionHeading eyebrow="RES capability" title="Swimming pool solutions across" highlight="India" align="center" />
          <div className="glass-dark mt-14 rounded-[30px] p-9 sm:p-12">
            <Testimonials />
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="glass-dark noise relative overflow-hidden rounded-[32px] px-8 py-16 sm:px-14">
            <div className="absolute -right-14 -top-16 h-72 w-72 rounded-full bg-aqua/16 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="eyebrow text-aqua">Your project next</p>
              <h2 className="display-xl mt-4 text-[clamp(2.15rem,4.6vw,3.75rem)] text-cream">
                Let us put your project on this <span className="italic text-gradient">page</span>
              </h2>
              <div className="mt-9">
                <CTAButtons
                  primaryLabel="Start a Project"
                  primaryTo="/contact"
                  secondaryLabel="About RES"
                  secondaryTo="/about"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================ GALLERY ============================ */
const tags = ['All', ...Array.from(new Set(galleryImages.map((g) => g.tag)))]

export function GalleryPage() {
  const [tag, setTag] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = useMemo(
    () => (tag === 'All' ? galleryImages : galleryImages.filter((g) => g.tag === tag)),
    [tag],
  )

  useRefreshScrollTriggers([tag, lightbox])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((v) => (v === null ? v : (v + 1) % filtered.length))
      if (e.key === 'ArrowLeft')
        setLightbox((v) => (v === null ? v : (v - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered.length])

  return (
    <>
      <SEO
        title={pageSEO.gallery.title}
        description={pageSEO.gallery.description}
        path="/gallery"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]}
      />
      <PageHero
        eyebrow="Gallery"
        title="A closer look at our"
        highlight="water craft"
        description="Pools, fountains, wellness suites, engineering on site and the details in between — a visual tour of the RES world."
        image="/images/fountain.jpg"
      />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3.5">
                <Camera className="h-5 w-5 text-aqua" strokeWidth={1.9} />
                <p className="eyebrow text-aqua">Visual portfolio</p>
              </div>
              <h2 className="display-xl mt-5 text-[clamp(2.15rem,4.5vw,3.65rem)] text-cream">
                Browse by <span className="italic text-gradient">category</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tags.map((t) => {
                const active = tag === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTag(t)}
                    className={`rounded-full border px-6 py-3 text-[10.5px] font-700 uppercase tracking-[0.18em] transition-all duration-400 ${
                      active
                        ? 'border-aqua/60 bg-aqua text-abyss'
                        : 'border-white/12 bg-white/[0.036] text-cream/82 hover:-translate-y-0.5 hover:border-aqua/38 hover:text-bright'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g, i) => (
              <button
                key={`${g.src}-${i}`}
                type="button"
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden rounded-[24px] border border-white/10 ${
                  i % 5 === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <MediaRenderer
                  media={g.media}
                  fallbackSrc={g.src}
                  alt={`${g.caption}, ${g.tag}`}
                  className={`w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.1] ${
                    i % 5 === 0 ? 'aspect-[3/4] lg:aspect-[3/5]' : 'aspect-[4/3]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/88 via-abyss/12 to-transparent opacity-82 transition-opacity duration-500 group-hover:opacity-96" />

                <span className="absolute left-5 top-5 rounded-full border border-white/18 bg-abyss/58 px-4 py-1.5 text-[9.5px] font-700 uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                  {g.tag}
                </span>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <p className="text-left font-display text-[1.38rem] font-600 leading-tight text-cream">
                    {g.caption}
                  </p>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/22 bg-abyss/52 text-cream backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-aqua/55 group-hover:text-aqua">
                    <Camera className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Marquee reverse />

      <section className="section-deep noise relative overflow-hidden py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-aqua">Want to see more?</p>
            <h2 className="display-xl mt-5 text-[clamp(2.35rem,5vw,4.15rem)] text-cream">
              We have plenty more where <span className="italic text-gradient">that came from</span>
            </h2>
            <p className="mt-7 max-w-xl text-[15.6px] leading-[1.9] text-mist">
              Tell us your project type and we will share relevant references, site photos and
              client contacts you can speak to.
            </p>
            <div className="mt-10">
              <CTAButtons
                primaryLabel="Request References"
                primaryTo="/contact"
                secondaryLabel="View Projects"
                secondaryTo="/projects"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss/96 p-5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/16 text-cream transition-colors hover:border-aqua/50 hover:text-aqua"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={() => setLightbox((v) => (v === null ? v : (v - 1 + filtered.length) % filtered.length))}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/16 text-cream transition-colors hover:border-aqua/50 hover:text-aqua sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <figure className="max-w-5xl">
            <MediaRenderer
              media={filtered[lightbox].media}
              fallbackSrc={filtered[lightbox].src}
              alt={`${filtered[lightbox].caption}, ${filtered[lightbox].tag}`}
              className="max-h-[74vh] w-full rounded-[22px] object-contain"
            />
            <figcaption className="mt-6 text-center">
              <p className="font-display text-[1.55rem] font-600 text-cream">
                {filtered[lightbox].caption}
              </p>
              <p className="mt-2 text-[10.5px] font-700 uppercase tracking-[0.21em] text-aqua">
                {filtered[lightbox].tag} · {lightbox + 1} / {filtered.length}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next"
            onClick={() => setLightbox((v) => (v === null ? v : (v + 1) % filtered.length))}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/16 text-cream transition-colors hover:border-aqua/50 hover:text-aqua sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  )
}

/* tree-shaking safety */
export const __stagger = useStaggerReveal
