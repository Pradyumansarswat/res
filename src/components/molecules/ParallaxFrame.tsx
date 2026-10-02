import { useParallaxImage } from '../../lib/anim'
import MediaRenderer from '../MediaRenderer'
import type { Media } from '../MediaRenderer'

export function ParallaxFrame({
  src,
  media,
  alt,
  className = '',
  ratio = 'aspect-[4/5]',
}: {
  src: string
  media?: Media
  alt: string
  className?: string
  ratio?: string
}) {
  const ref = useParallaxImage<HTMLDivElement>(12)
  return (
    <div ref={ref} className={`mask-img relative overflow-hidden rounded-[26px] ${ratio} ${className}`}>
      <MediaRenderer
        media={media}
        fallbackSrc={src}
        alt={alt}
        className="h-full w-full object-cover"
        wrapperClassName="absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/42 via-transparent to-transparent" />
    </div>
  )
}

export default ParallaxFrame
