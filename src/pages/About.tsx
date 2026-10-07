import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Award,
  Compass,
  DraftingCompass,
  Leaf,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react'
import PageHero from '../components/templates/PageHero'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { Marquee } from '../components/molecules/Marquee'
import { CTAButtons } from '../components/molecules/CTAButtons'
import { ParallaxFrame } from '../components/molecules/ParallaxFrame'
import { StatsBand } from '../components/ui'
import {
  useParallaxImage,
  useReveal,
  useSplitReveal,
  useStaggerReveal,
  useRefreshScrollTriggers,
  gsap,
  ScrollTrigger,
} from '../lib/anim'
import { useEffect, useRef } from 'react'
import { process, timeline, values } from '../lib/site'
import SEO from '../components/SEO'
import { pageSEO } from '../config/seo'
import { siteProfile } from '../config/site'

const strengths = [
  {
    icon: DraftingCompass,
    title: 'Experience',
    text: `Established in ${siteProfile.established} with experience in swimming pool and water engineering services.`,
  },
  {
    icon: Wrench,
    title: 'Complete Solutions',
    text: 'Design, construction, equipment, heating, lighting, renovation and related services.',
  },
  {
    icon: ShieldCheck,
    title: 'Engineering Focus',
    text: 'Combining design, technical planning and execution around project requirements and site conditions.',
  },
  {
    icon: Leaf,
    title: 'Quality Approach',
    text: 'Quality-focused products and project execution.',
  },
  {
    icon: Users,
    title: 'Client-Centric Approach',
    text: 'Solutions developed around project requirements and site conditions.',
  },
  {
    icon: Compass,
    title: 'North India Service Area',
    text: 'Serving Delhi, Noida, Gurugram, Ghaziabad and Faridabad.',
  },
]

export default function About() {
  useRefreshScrollTriggers([])

  const storyImg = useParallaxImage<HTMLDivElement>(11)
  const storyTitle = useSplitReveal<HTMLHeadingElement>({ stagger: 0.021 })
  const storyText = useReveal<HTMLDivElement>(32, 0.16)
  const strengthsRef = useStaggerReveal<HTMLDivElement>('top 86%', 40)
  const timelineWrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = timelineWrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tl-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 72%',
            scrub: 0.55,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        path="/about"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
      />
      <PageHero
        eyebrow="About RES"
        title="Engineering water with"
        highlight="precision & pride"
        description={`Established in ${siteProfile.established}, ${siteProfile.name} serves swimming pool and water engineering requirements across ${siteProfile.serviceAreaName}.`}
        image="/images/pool-about-hero.jpg"
      >
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            Work With Us
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
          <Link
            to="/projects"
            className="btn-ghost inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[11px] font-700 uppercase tracking-[0.2em]"
          >
            Our Projects
          </Link>
        </div>
      </PageHero>

      {/* ---------- Story ---------- */}
      <section className="section-light relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div ref={storyText} className="order-2 lg:order-1">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-abyss/35" />
              <p className="eyebrow text-abyss/65">Our story</p>
            </div>

            <h2
              ref={storyTitle}
              className="display-xl mt-5 text-[clamp(2.25rem,4.9vw,4.15rem)] text-abyss"
            >
              A complete provider of{' '}
              <span className="italic text-gradient">premium water engineering</span>
            </h2>

            <div className="mt-8 space-y-5 text-[15.5px] leading-[1.92] text-abyss/72 sm:text-[16.4px]">
              <p>
                Established in {siteProfile.established}, {siteProfile.name} provides swimming pool
                design, construction and engineering solutions for residential, commercial,
                hospitality and institutional projects.
              </p>
              <p>
                RES is led by {siteProfile.owner}, offering services covering
                pool design, construction, renovation, repair, equipment, heating, lighting,
                covering, waterproofing and expansion joint services.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-abyss/12 bg-cream/70 p-6">
                <Award className="h-8 w-8 text-abyss/72" strokeWidth={1.6} />
                <p className="mt-4 text-[12px] font-700 uppercase tracking-[0.17em] text-abyss">
                  Quality Approach
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-abyss/64">
                  Quality-focused products and project execution.
                </p>
              </div>
              <div className="rounded-2xl border border-abyss/12 bg-cream/70 p-6">
                <Leaf className="h-8 w-8 text-abyss/72" strokeWidth={1.6} />
                <p className="mt-4 text-[12px] font-700 uppercase tracking-[0.17em] text-abyss">
                  Client-Centric
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-abyss/64">
                  Solutions developed around project requirements and site conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div ref={storyImg} className="mask-img overflow-hidden rounded-[30px]">
                <img
                  src="/images/team.jpg"
                  alt="RES engineering team"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-10 -left-4 w-[62%] overflow-hidden rounded-[24px] border-[8px] border-cream shadow-[0_42px_90px_-38px_rgba(4,18,26,0.6)] sm:-left-12">
                <img
                  src="/images/engineering.jpg"
                  alt="Site engineering review"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -right-2 top-8 rounded-2xl border border-abyss/12 bg-abyss px-7 py-6 text-cream shadow-[0_32px_70px_-32px_rgba(4,18,26,0.7)] sm:-right-8">
                <p className="font-display text-[2.55rem] font-600 leading-none text-bright">
                  {siteProfile.established}
                </p>
                <p className="mt-2 text-[9.5px] font-700 uppercase tracking-[0.19em] text-mist">
                  Established
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBand light />
      <Marquee />

      {/* ---------- Values ---------- */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="What drives us"
            title="Three principles behind"
            highlight="every project"
            text="They are not posters on a wall — they are the checklist our engineers use before anything is approved."
            align="center"
          />

          <div ref={strengthsRef} className="mt-16 grid gap-7 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.number}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] p-9 transition-all duration-500 hover:-translate-y-2 hover:border-aqua/32 hover:bg-white/[0.075]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      i === 1
                        ? 'radial-gradient(circle, rgba(214,171,98,0.32), transparent 70%)'
                        : 'radial-gradient(circle, rgba(79,209,207,0.32), transparent 70%)',
                  }}
                />

                <p className="font-display text-[4.25rem] font-600 leading-none text-white/10 transition-colors duration-500 group-hover:text-aqua/30">
                  {v.number}
                </p>

                <h3 className="mt-6 font-display text-[1.95rem] font-600 leading-tight text-cream">
                  {v.title}
                </h3>

                <p className="mt-5 text-[13.9px] leading-[1.88] text-mist">{v.text}</p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-aqua/60 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* strengths grid */}
          <div className="mt-24">
            <SectionHeading
              eyebrow="Why choose RES"
              title="Capability that covers the"
              highlight="whole project"
              text="Most contractors do one part well. We engineered RES to do all of it well — with one accountable team."
            />

            <div ref={strengthsRef} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {strengths.map((s) => (
                <div
                  key={s.title}
                  className="tilt-card group rounded-[22px] border border-white/9 bg-white/[0.032] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-aqua/28 hover:bg-white/[0.07]"
                >
                  <span className="grid h-13 w-13 place-items-center rounded-2xl border border-aqua/22 bg-aqua/10 text-aqua transition-transform duration-500 group-hover:-translate-y-1">
                    <s.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.52rem] font-600 leading-tight text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[13.4px] leading-[1.84] text-mist">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/water-texture.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep/88 to-abyss" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Established"
            title="Established in"
            highlight={siteProfile.address.addressLocality}
            text={`${siteProfile.name} was established in ${siteProfile.established}.`}
            align="center"
          />

          <div ref={timelineWrap} className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute left-[19px] top-0 h-full w-px bg-white/10 sm:left-1/2">
              <div className="tl-progress h-full w-full bg-gradient-to-b from-aqua via-aqua to-gold" />
            </div>

            <div className="space-y-12">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative flex flex-col gap-5 sm:flex-row ${
                    i % 2 === 1 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 pl-12 sm:pl-0">
                    <div className={`${i % 2 === 1 ? 'sm:pl-14' : 'sm:pr-14'} sm:text-${i % 2 === 1 ? 'left' : 'right'}`}>
                      <div className={`${i % 2 === 1 ? '' : 'sm:flex sm:flex-col sm:items-end'}`}>
                        <span className="inline-flex items-center rounded-full border border-aqua/35 bg-aqua/10 px-5 py-2 text-[10.5px] font-700 uppercase tracking-[0.22em] text-bright">
                          {t.year}
                        </span>
                        <h3 className="mt-4 font-display text-[1.85rem] font-600 leading-tight text-cream">
                          {t.title}
                        </h3>
                        <p className="mt-3.5 max-w-md text-[13.9px] leading-[1.86] text-mist">
                          {t.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="absolute left-[11px] top-2.5 grid h-[19px] w-[19px] place-items-center rounded-full border border-aqua/60 bg-abyss sm:left-1/2 sm:-ml-[9.5px]">
                    <span className="h-[7px] w-[7px] rounded-full bg-aqua" />
                  </span>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Leadership ---------- */}
      <section className="section-light relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ParallaxFrame
              src="/images/engineering.jpg"
              alt="Leadership at RES"
              ratio="aspect-[4/5]"
            />
            <div className="mt-8 grid grid-cols-3 gap-4">
              {['Design', 'Build', 'Care'].map((k) => (
                <div
                  key={k}
                  className="rounded-2xl border border-abyss/12 bg-cream/70 px-5 py-4 text-center"
                >
                  <p className="text-[10.5px] font-700 uppercase tracking-[0.19em] text-abyss/72">
                    {k}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-abyss/35" />
              <p className="eyebrow text-abyss/65">Leadership</p>
            </div>

            <h2 className="display-xl mt-5 text-[clamp(2.15rem,4.5vw,3.75rem)] text-abyss">
              Guided by vision, delivered with{' '}
              <span className="italic text-gradient">discipline</span>
            </h2>

            <div className="relative mt-9 rounded-[24px] border border-abyss/12 bg-cream/80 p-9">
              <p className="eyebrow text-abyss/65">Owner / Director</p>
              <div className="mt-7 flex items-center gap-4">
                <div className="grid h-13 w-13 place-items-center rounded-full bg-abyss font-display text-lg text-bright">
                  UK
                </div>
                <div>
                  <p className="text-[12px] font-700 uppercase tracking-[0.19em] text-abyss">
                    {siteProfile.owner}
                  </p>
                  <p className="mt-1 text-[11.5px] uppercase tracking-[0.15em] text-abyss/58">
                    Owner / Director, RES
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <CTAButtons
                primaryLabel="Start a Conversation"
                primaryTo="/contact"
                secondaryLabel="Explore Services"
                secondaryTo="/services"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Process strip ---------- */}
      <section className="section-deep noise relative overflow-hidden py-24 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="How we deliver"
            title="Four stages. Zero"
            highlight="guesswork."
            align="center"
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.step}
                className="group rounded-[22px] border border-white/10 bg-white/[0.038] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-aqua/30"
              >
                <p className="font-display text-[2.75rem] font-600 leading-none text-aqua/80">
                  {p.step}
                </p>
                <h3 className="mt-5 font-display text-[1.42rem] font-600 leading-tight text-cream">
                  {p.title}
                </h3>
                <p className="mt-4 text-[13.1px] leading-[1.82] text-mist">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* tree-shaking safety */
export const __st = ScrollTrigger
