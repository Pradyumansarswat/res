import type { ReactNode } from 'react'
import { useReveal, useSplitReveal } from '../../lib/anim'

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

export default SectionHeading
