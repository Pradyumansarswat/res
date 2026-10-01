import { useParallaxImage } from '../../lib/anim'

export function ParallaxFrame({
  src,
  alt,
  className = '',
  ratio = 'aspect-[4/5]',
}: {
  src: string
  alt: string
  className?: string
  ratio?: string
}) {
  const ref = useParallaxImage<HTMLDivElement>(12)
  return (
    <div ref={ref} className={`mask-img relative overflow-hidden rounded-[26px] ${ratio} ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/42 via-transparent to-transparent" />
    </div>
  )
}

export default ParallaxFrame
