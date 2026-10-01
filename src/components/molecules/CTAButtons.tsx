import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

export default CTAButtons
