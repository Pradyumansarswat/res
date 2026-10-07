import { useState, useEffect } from 'react'
import { site } from '../lib/site'

/**
 * Floating WhatsApp button – always visible in the bottom-right corner.
 * Opens WhatsApp with a pre-filled enquiry message.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Slide in after a short delay so the page loads first
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  const message = encodeURIComponent(
    'Hi, I visited your website and would like to enquire about your services.',
  )

  // Build the wa.me link – the config already stores the full URL
  const href = `${site.whatsApp}?text=${message}`

  return (
    <a
      id="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="whatsapp-fab"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.8)',
      }}
    >
      {/* Tooltip label */}
      <span
        className="whatsapp-fab__label"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(10px)',
        }}
      >
        Chat with us
      </span>

      {/* Pulse ring */}
      <span className="whatsapp-fab__pulse" />

      {/* WhatsApp icon (official path) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="none"
        aria-hidden="true"
      >
        <path
          fill="#fff"
          d="M16.004 2.002a13.89 13.89 0 0 0-12.05 20.77L2 30l7.418-1.916A13.89 13.89 0 1 0 16.004 2.002Zm0 25.48a11.55 11.55 0 0 1-5.89-1.61l-.42-.25-4.37 1.13 1.17-4.27-.28-.44a11.59 11.59 0 1 1 9.79 5.44Zm6.35-8.68c-.35-.17-2.06-1.01-2.38-1.13-.32-.12-.56-.17-.79.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09a9.56 9.56 0 0 1-4.72-4.13c-.36-.61.36-.57 1.02-1.9a.65.65 0 0 0-.03-.61c-.09-.18-.79-1.91-1.08-2.61-.29-.69-.58-.59-.79-.6h-.68a1.3 1.3 0 0 0-.95.45 3.98 3.98 0 0 0-1.24 2.96 6.92 6.92 0 0 0 1.45 3.67 15.88 15.88 0 0 0 6.08 5.38 4.6 4.6 0 0 0 2.82.59 3.63 3.63 0 0 0 2.39-1.68 2.94 2.94 0 0 0 .21-1.68c-.09-.16-.32-.25-.67-.42Z"
        />
      </svg>
    </a>
  )
}
