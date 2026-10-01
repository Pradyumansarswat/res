import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const DROPLETS = [
  { size: 5, speed: 0.28, opacity: 0.75 },
  { size: 4, speed: 0.24, opacity: 0.62 },
  { size: 3.5, speed: 0.21, opacity: 0.52 },
  { size: 3, speed: 0.18, opacity: 0.44 },
  { size: 2.5, speed: 0.15, opacity: 0.36 },
  { size: 2, speed: 0.13, opacity: 0.28 },
  { size: 1.8, speed: 0.11, opacity: 0.22 },
  { size: 1.5, speed: 0.09, opacity: 0.16 },
]

export default function ParticleCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLSpanElement[]>([])

  const mouse = useRef({
    x: 0,
    y: 0,
  })

  const positions = useRef(
    DROPLETS.map(() => ({
      x: 0,
      y: 0,
    }))
  )

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMove)

    let animationFrame: number

    const animate = () => {
      const { x: mouseX, y: mouseY } = mouse.current

      // Main cursor follows mouse directly
      gsap.set(cursor, {
        x: mouseX,
        y: mouseY,
      })

      // First droplet follows cursor
      positions.current.forEach((position, index) => {
        const target =
          index === 0
            ? { x: mouseX, y: mouseY }
            : positions.current[index - 1]

        const speed = DROPLETS[index].speed

        position.x += (target.x - position.x) * speed
        position.y += (target.y - position.y) * speed

        const particle = particlesRef.current[index]

        if (particle) {
          gsap.set(particle, {
            x: position.x,
            y: position.y,
          })
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      {/* MAIN CURSOR */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-aqua
          md:block
        "
        style={{
          boxShadow:
            '0 0 10px rgba(127,240,232,1), 0 0 25px rgba(127,240,232,0.55)',
        }}
      />

      {/* TRAILING DROPLETS */}
      {DROPLETS.map((droplet, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) particlesRef.current[index] = el
          }}
          className="
            pointer-events-none
            fixed
            left-0
            top-0
            z-[9998]
            hidden
            rounded-full
            bg-aqua
            md:block
          "
          style={{
            width: droplet.size,
            height: droplet.size,
            opacity: droplet.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 8px rgba(127,240,232,0.6)',
          }}
        />
      ))}
    </>
  )
}