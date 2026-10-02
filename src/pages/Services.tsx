import { Link, Navigate, useParams } from 'react-router-dom'
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
  Check,
  ArrowRight,
} from 'lucide-react'
import PageHero from '../components/templates/PageHero'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { Marquee } from '../components/molecules/Marquee'
import { CTAButtons } from '../components/molecules/CTAButtons'
import { StatsBand } from '../components/ui'
import { useReveal, useSplitReveal, useRefreshScrollTriggers } from '../lib/anim'
import { faqs, services } from '../lib/site'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import SEO from '../components/SEO'
import { pageSEO, serviceSEO } from '../config/seo'
import { SITE_URL, siteProfile } from '../config/site'
import MediaRenderer from '../components/MediaRenderer'

export const iconMap: Record<string, LucideIcon> = {
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

/* ---------------- Accordion (shared with contact) ---------------- */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-[20px] border transition-all duration-500 ${
              isOpen
                ? 'border-aqua/34 bg-aqua/[0.075]'
                : 'border-white/10 bg-white/[0.032] hover:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-5">
                <span
                  className={`mt-0.5 font-display text-[1.15rem] font-600 leading-none transition-colors duration-400 ${
                    isOpen ? 'text-aqua' : 'text-white/28'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[1.28rem] font-600 leading-snug text-cream sm:text-[1.42rem]">
                  {item.q}
                </span>
              </span>

              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? 'rotate-45 border-aqua/50 bg-aqua/16 text-aqua'
                    : 'border-white/14 text-cream/80'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <div className={`accordion-panel px-7 ${isOpen ? 'open' : ''}`}>
              <div>
                <p className="pb-7 pl-0 text-[14px] leading-[1.9] text-mist sm:pl-[3.4rem]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================ SERVICES PAGE ============================ */
export function ServicesPage() {
  useRefreshScrollTriggers([])
  const introRef = useSplitReveal<HTMLHeadingElement>({ stagger: 0.02 })
  const introText = useReveal<HTMLParagraphElement>(28, 0.14)

  return (
    <>
      <SEO
        title={pageSEO.services.title}
        description={pageSEO.services.description}
        path="/services"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
      />
      <PageHero
        eyebrow="Our Services"
        title="Complete water engineering,"
        highlight="under one roof"
        description="Swimming pool design, construction, renovation, repair, equipment, heating, lighting, covering, waterproofing and expansion joint services for residential, commercial, hospitality and institutional projects."
        image="/images/pool-aerial.jpg"
      >
        <div className="flex flex-wrap gap-3">
          {services.slice(0, 6).map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/16 bg-white/[0.055] px-5 py-2.5 text-[10.5px] font-700 uppercase tracking-[0.17em] text-cream/86 backdrop-blur-md transition-all duration-400 hover:-translate-y-0.5 hover:border-aqua/42 hover:text-bright"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      {/* intro */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3.5">
                <span className="h-px w-9 bg-aqua/70" />
                <p className="eyebrow text-aqua">What we deliver</p>
              </div>
              <h2
                ref={introRef}
                className="display-xl mt-5 text-[clamp(2.15rem,4.6vw,3.85rem)] text-cream"
              >
                From first sketch to lifetime{' '}
                <span className="italic text-gradient">maintenance</span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p ref={introText} className="text-[15.4px] leading-[1.92] text-mist">
                RES is a service provider, trader and supplier of services. Our solutions cover
                swimming pool design, construction and specialized engineering requirements for
                residential, commercial, hospitality and institutional projects.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {['Pool design & planning', 'Construction solutions', 'Equipment & heating', 'Repair & renovation'].map(
                  (f) => (
                    <div
                      key={f}
                      className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.038] px-4 py-3.5"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" strokeWidth={2.5} />
                      <span className="text-[11.5px] font-600 leading-relaxed tracking-[0.06em] text-cream/88">
                        {f}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* alternating service rows */}
      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1400px] space-y-20 px-5 sm:space-y-28 sm:px-8">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Waves
            const flip = i % 2 === 1
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-28 items-center gap-11 lg:grid-cols-2 lg:gap-16"
              >
                <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
                  <div className="group relative overflow-hidden rounded-[28px] border border-white/10">
                    <MediaRenderer
                      media={s.media}
                      fallbackSrc={s.image}
                      alt={`${s.title} service in ${siteProfile.serviceAreaName}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/72 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <div className="rounded-2xl border border-white/16 bg-abyss/58 px-5 py-4 backdrop-blur-md">
                        <p className="font-display text-[1.85rem] font-600 leading-none text-bright">
                          {s.stat.value}
                        </p>
                        <p className="mt-2 text-[9.5px] font-700 uppercase tracking-[0.19em] text-cream/82">
                          {s.stat.label}
                        </p>
                      </div>

                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/18 bg-abyss/58 text-aqua backdrop-blur-md">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full blur-2xl"
                    style={{
                      background: flip
                        ? 'radial-gradient(circle, rgba(214,171,98,0.28), transparent 70%)'
                        : 'radial-gradient(circle, rgba(79,209,207,0.28), transparent 70%)',
                    }}
                  />
                </div>

                <div className={flip ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3.5">
                    <span className="font-display text-[1.15rem] font-600 text-aqua/85">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-10 bg-aqua/42" />
                    <p className="eyebrow text-mist">{s.stat.label}</p>
                  </div>

                  <h2 className="display-xl mt-5 text-[clamp(1.95rem,3.7vw,3.05rem)] text-cream">
                    {s.title}
                  </h2>

                  <p className="mt-6 text-[15px] leading-[1.92] text-mist">{s.description}</p>

                  <ul className="mt-8 space-y-3.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3.5">
                        <span className="mt-1 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border border-aqua/38 bg-aqua/12">
                          <Check className="h-3 w-3 text-aqua" strokeWidth={3} />
                        </span>
                        <span className="text-[13.6px] leading-[1.78] text-cream/84">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${s.slug}`}
                      className="btn-primary group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[10.5px] font-700 uppercase tracking-[0.19em]"
                    >
                      Service Details
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
                        strokeWidth={2.4}
                      />
                    </Link>
                    <Link
                      to="/contact"
                      className="link-sweep text-[10.5px] font-700 uppercase tracking-[0.19em] text-aqua"
                    >
                      Request a quote
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <Marquee reverse />

      {/* FAQ */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQs"
              title="Answers before you"
              highlight="ask"
              text="Everything clients usually want to know before starting a project with RES."
            />
            <div className="mt-10">
              <CTAButtons
                primaryLabel="Ask a Question"
                primaryTo="/contact"
                secondaryLabel="See Our Work"
                secondaryTo="/projects"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <StatsBand />
    </>
  )
}

/* ============================ SERVICE DETAIL ============================ */
export function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  useRefreshScrollTriggers([slug])

  if (!service) return <Navigate to="/services" replace />

  const Icon = iconMap[service.icon] ?? Waves
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)
  const metadata = serviceSEO(service.title)

  return (
    <>
      <SEO
        title={metadata.title}
        description={metadata.description}
        path={`/services/${service.slug}`}
        image={service.image}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: siteProfile.serviceArea,
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title={service.title}
        highlight=""
        description={service.description}
        image={service.image}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            Get a Quote
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
          <a
            href={`tel:${siteProfile.phoneHref}`}
            className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            Call {siteProfile.phone}
          </a>
        </div>
      </PageHero>

      {/* overview */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3.5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-aqua/28 bg-aqua/12 text-aqua">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                </span>
                <p className="eyebrow text-aqua">Service overview</p>
              </div>

              <h2 className="display-xl mt-6 text-[clamp(2.15rem,4.4vw,3.55rem)] text-cream">
                Engineered for performance, finished for{' '}
                <span className="italic text-gradient">beauty</span>
              </h2>

              <p className="mt-7 text-[15.4px] leading-[1.94] text-mist">{service.short}</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {service.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-3.5 rounded-[18px] border border-white/10 bg-white/[0.038] p-5"
                  >
                    <span className="mt-1 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border border-aqua/38 bg-aqua/12">
                      <Check className="h-3 w-3 text-aqua" strokeWidth={3} />
                    </span>
                    <span className="text-[13.3px] leading-[1.76] text-cream/86">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-dark rounded-[26px] p-8">
                <div className="rounded-[20px] border border-aqua/22 bg-aqua/[0.09] p-7">
                  <p className="font-display text-[2.2rem] font-600 leading-none text-bright">
                    {service.stat.value}
                  </p>
                  <p className="mt-3 text-[10.5px] font-700 uppercase tracking-[0.2em] text-cream/82">
                    {service.stat.label}
                  </p>
                </div>

                <div className="mt-7 space-y-5">
                  <div className="flex gap-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-aqua" />
                    <div>
                      <p className="text-[12px] font-700 uppercase tracking-[0.15em] text-cream">
                        Discuss your requirements
                      </p>
                      <p className="mt-2 text-[12.8px] leading-relaxed text-mist">
                        Contact RES to confirm the scope and next steps for your project.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="btn-primary mt-8 flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[10.5px] font-700 uppercase tracking-[0.19em]"
                >
                  Request This Service
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-white/10">
                <MediaRenderer
                  media={service.media}
                  fallbackSrc={service.image}
                  alt={`${service.title} in ${siteProfile.serviceAreaName}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="section-deep noise relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Explore more"
            title="Other services by"
            highlight="RES"
            action={
              <Link
                to="/services"
                className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
              >
                All Services
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
              </Link>
            }
          />

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {related.map((s) => {
              const RIcon = iconMap[s.icon] ?? Waves
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.036] transition-all duration-500 hover:-translate-y-2 hover:border-aqua/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <MediaRenderer
                      media={s.media}
                      fallbackSrc={s.image}
                      alt={`${s.title} service in ${siteProfile.serviceAreaName}`}
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.08]"
                      wrapperClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/86 to-transparent" />
                    <span className="absolute bottom-4 left-5 grid h-11 w-11 place-items-center rounded-xl border border-white/18 bg-abyss/55 text-aqua backdrop-blur-md">
                      <RIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="font-display text-[1.55rem] font-600 leading-tight text-cream">
                      {s.title}
                    </h3>
                    <p className="mt-3.5 text-[13.1px] leading-[1.8] text-mist">{s.short}</p>
                    <div className="mt-6 flex items-center gap-2 text-[10.5px] font-700 uppercase tracking-[0.19em] text-aqua">
                      <span className="link-sweep">Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <StatsBand />
    </>
  )
}
