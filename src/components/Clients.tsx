import { clients } from '../lib/site'
import type { Client } from '../lib/site'
import { useStaggerReveal } from '../lib/anim'

/* ------------------------------------------------------------------ */
/*  ClientLogo – rounded tile with the client's own background colour */
/* ------------------------------------------------------------------ */
export function ClientLogo({ client, size = 'md' }: { client: Client; size?: 'md' | 'sm' }) {
  const isSm = size === 'sm'
  /* Cap rendered dimensions to never exceed the logo's natural pixels */
  const maxH = isSm ? 48 : 56
  const maxW = isSm ? 100 : 128
  const scale = Math.min(1, maxH / client.h, maxW / client.w)
  const renderedW = Math.round(client.w * scale)
  const renderedH = Math.round(client.h * scale)

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl border border-white/10 ${
        isSm ? 'h-16 w-32 sm:h-20 sm:w-40' : 'h-20 w-40 sm:h-24 sm:w-48'
      }`}
      style={{ backgroundColor: client.bg }}
    >
      <img
        src={client.logo}
        alt={`${client.name} logo`}
        width={renderedW}
        height={renderedH}
        loading="lazy"
        decoding="async"
        className="max-h-[62%] max-w-[78%] object-contain"
        style={{ width: renderedW, height: renderedH }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ClientsMarquee – infinite horizontal loop, pure CSS animation     */
/* ------------------------------------------------------------------ */
export function ClientsMarquee() {
  /* Duplicate the list so the seam is invisible */
  const list = [...clients, ...clients]

  return (
    <div
      className="clients-marquee group relative overflow-hidden"
      role="marquee"
      aria-label="Client logos"
    >
      {/* Soft fade masks on left and right edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-abyss to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-abyss to-transparent sm:w-24" />

      {/* Animated track */}
      <div
        className="clients-marquee__track flex w-max gap-5"
        /* pause on hover/focus within */
        tabIndex={0}
        aria-label="Client logos, pauses on hover or focus"
      >
        {list.map((c, i) => (
          <ClientLogo key={`${c.name}-${i}`} client={c} />
        ))}
      </div>

      {/* Static fallback for reduced motion (rendered above the animated track via CSS) */}
      <div className="clients-marquee__static hidden flex-wrap items-center justify-center gap-5">
        {clients.map((c) => (
          <ClientLogo key={c.name} client={c} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ClientsGrid – responsive grid with GSAP stagger reveal            */
/* ------------------------------------------------------------------ */
export function ClientsGrid() {
  const gridRef = useStaggerReveal<HTMLDivElement>('top 86%', 42)

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {clients.map((c) => (
        <ClientLogo key={c.name} client={c} />
      ))}
    </div>
  )
}
