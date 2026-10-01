// import { Link } from 'react-router-dom'
// import { ChevronRight } from 'lucide-react'
// import type { ReactNode } from 'react'
// import { useEffect, useRef } from 'react'
// import { gsap, useSplitReveal } from '../../lib/anim'

// export function PageHero({
//   eyebrow,
//   title,
//   highlight,
//   description,
//   image,
//   children,
// }: {
//   eyebrow: string
//   title: string
//   highlight?: string
//   description: string
//   image: string
//   children?: ReactNode
// }) {
//   const titleRef = useSplitReveal<HTMLHeadingElement>({ start: 'top 92%', stagger: 0.022 })
//   const imgWrap = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const el = imgWrap.current
//     if (!el) return
//     const img = el.querySelector('img')
//     if (!img) return
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         img,
//         { scale: 1.28, yPercent: -6 },
//         {
//           scale: 1.12,
//           yPercent: 6,
//           ease: 'none',
//           scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
//         },
//       )
//     })
//     return () => ctx.revert()
//   }, [])

//   return (
//     <section className="relative isolate flex min-h-[74vh] items-end overflow-hidden pb-16 pt-36 sm:pt-40">
//       <div ref={imgWrap} className="absolute inset-0 -z-10">
//         <img src={image} alt="" className="h-full w-full object-cover opacity-55" />
//         <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/78 to-abyss/45" />
//         <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/45 to-transparent" />
//         <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(127,240,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(127,240,232,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
//       </div>

//       <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
//         <nav className="flex items-center gap-2 text-[11px] font-600 uppercase tracking-[0.22em] text-mist">
//           <Link to="/" className="transition-colors hover:text-aqua">
//             Home
//           </Link>
//           <ChevronRight className="h-3.5 w-3.5 text-aqua/70" />
//           <span className="text-aqua">{eyebrow}</span>
//         </nav>

//         <h1
//           ref={titleRef}
//           className="display-xl mt-7 max-w-5xl text-[clamp(2.75rem,7.2vw,6.2rem)] text-cream"
//         >
//           {title} {highlight && <span className="italic text-gradient">{highlight}</span>}
//         </h1>

//         <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.85] text-mist sm:text-[17.5px]">
//           {description}
//         </p>

//         {children && <div className="mt-9">{children}</div>}
//       </div>

//       <div className="hairline absolute bottom-0 left-0 h-px w-full" />
//     </section>
//   )
// }

// export default PageHero







import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { gsap, useSplitReveal } from '../../lib/anim'

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
  const titleRef = useSplitReveal<HTMLSpanElement>({
    start: 'top 92%',
    stagger: 0.022,
  })

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
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative isolate flex min-h-[74vh] items-end overflow-hidden pb-16 pt-36 sm:pt-40">
      <div ref={imgWrap} className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-55"
          fetchPriority="high"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/78 to-abyss/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/45 to-transparent" />

        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(127,240,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(127,240,232,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-600 uppercase tracking-[0.22em] text-mist">
          <Link
            to="/"
            className="transition-colors hover:text-aqua"
          >
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-aqua/70" />

          <span className="text-aqua">{eyebrow}</span>
        </nav>

        <h1 className="display-xl mt-7 max-w-5xl text-[clamp(2.75rem,7.2vw,6.2rem)] text-cream">
          <span ref={titleRef}>{title}</span>

          {highlight && (
            <>
              {' '}
              <span className="italic text-gradient">
                {highlight}
              </span>
            </>
          )}
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

export default PageHero