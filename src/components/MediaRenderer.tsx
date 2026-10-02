import { useState } from 'react'
import { Play } from 'lucide-react'

export type Media =
  | { type: 'image'; src: string }
  | { type: 'youtube'; src: string }

type MediaRendererProps = {
  media?: Media
  fallbackSrc?: string
  alt: string
  className: string
  wrapperClassName?: string
  loading?: 'eager' | 'lazy'
}

function getYouTubeVideoId(src: string) {
  try {
    const url = new URL(src)
    const host = url.hostname.replace(/^www\./, '')
    let videoId: string | null = null

    if (host === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? null
    } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (url.pathname === '/watch') videoId = url.searchParams.get('v')
      else if (/^\/(shorts|embed)\//.test(url.pathname)) videoId = url.pathname.split('/')[2] ?? null
    }

    return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

export function MediaRenderer({
  media,
  fallbackSrc,
  alt,
  className,
  wrapperClassName = '',
  loading = 'lazy',
}: MediaRendererProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbnailFailed, setThumbnailFailed] = useState(false)
  const videoId = media?.type === 'youtube' ? getYouTubeVideoId(media.src) : null
  const imageSrc = media?.type === 'image' ? media.src : fallbackSrc

  if (!videoId || thumbnailFailed) {
    return imageSrc ? <img src={imageSrc} alt={alt} className={className} loading={loading} /> : null
  }

  return (
    <span className={`relative block ${wrapperClassName}`}>
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={playing ? '' : alt}
        aria-hidden={playing}
        className={`${className} block`}
        loading={loading}
        onError={() => setThumbnailFailed(true)}
      />
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={alt}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${alt}`}
          className="absolute inset-0 z-[1] grid w-full place-items-center border-0 bg-transparent p-0 text-white"
          onClick={(event) => {
            event.stopPropagation()
            setPlaying(true)
          }}
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-abyss/55 backdrop-blur-sm">
            <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={1.5} />
          </span>
        </button>
      )}
    </span>
  )
}

export default MediaRenderer