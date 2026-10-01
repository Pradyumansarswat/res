import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export { gsap, ScrollTrigger, SplitText }

/** Global smooth-scroll (Lenis) wired into the GSAP ticker + ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.35 })
      }
    }
    document.addEventListener('click', onAnchorClick)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 700)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}

/** Scroll a page back to the top (respects Lenis). */
export function scrollToTop(instant = true) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(0, { duration: instant || reduce ? 0 : 1.1 })
  } else {
    window.scrollTo({ top: 0, behavior: instant || reduce ? 'auto' : 'smooth' })
  }
}

/** Split a heading into lines/chars and reveal it with a masked stagger. */
export function useSplitReveal<T extends HTMLElement>(
  options?: {
    delay?: number
    stagger?: number
    y?: number
    duration?: number
    start?: string
  },
) {
  const ref = useRef<T | null>(null)
  const { delay = 0, stagger = 0.018, y = 110, duration = 1.05, start = 'top 88%' } = options || {}

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    let ctx: gsap.Context | null = null
    const run = () => {
      ctx = gsap.context(() => {
        const split = new SplitText(el, {
          type: 'lines,chars',
          linesClass: 'split-line',
          charsClass: 'split-char',
        })
        gsap.set(split.chars, { yPercent: y, opacity: 0 })
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        })
      })
    }

    const fonts = document.fonts
    if (fonts && fonts.ready) {
      fonts.ready.then(run).catch(run)
    } else {
      run()
    }

    return () => {
      ctx?.revert()
    }
  }, [delay, stagger, y, duration, start])

  return ref
}

/** Generic fade/slide-up reveal for blocks of content. */
export function useReveal<T extends HTMLElement>(y = 42, delay = 0, start = 'top 88%') {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 1.05,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      })
    })
    return () => ctx.revert()
  }, [y, delay, start])

  return ref
}

/** Stagger-reveal direct children of a container. */
export function useStaggerReveal<T extends HTMLElement>(start = 'top 86%', y = 46) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(el.children) as HTMLElement[]
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          immediateRender: false,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [start, y])

  return ref
}

/** Scroll-scrubbed parallax for an image inside a masked frame. */
export function useParallaxImage<T extends HTMLElement>(amount = 14) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const img = el.querySelector('img')
    if (!img) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -amount, scale: 1.18 },
        {
          yPercent: amount,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [amount])

  return ref
}

/** Animated numeric counter driven by ScrollTrigger. */
export function useCounter<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = Number(el.dataset.value || '0')
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const display = el.dataset.display
    if (display) {
      el.textContent = display
      return
    }
    const isYear = target > 1900 && target < 2200
    const obj = { val: isYear ? target - 12 : 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return ref
}

/** Refresh ScrollTrigger after route/content changes. */
export function useRefreshScrollTriggers(deps: unknown[]) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 260)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
