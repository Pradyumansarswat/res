import { marqueeWords } from '../../lib/site'

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
          light ? 'bg-gradient-to-r from-cream to-transparent' : 'bg-gradient-to-r from-abyss to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-24 ${
          light ? 'bg-gradient-to-l from-cream to-transparent' : 'bg-gradient-to-l from-abyss to-transparent'
        }`}
      />
    </div>
  )
}

export default Marquee
