// import { Link } from 'react-router-dom'
// import { scrollToTop } from '../../lib/anim'

// export function Logo({ compact = false }: { compact?: boolean }) {
//   return (
//     <Link to="/" className="group flex items-center gap-3" onClick={() => scrollToTop(true)}>
//       <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-aqua/30 bg-gradient-to-br from-aqua/25 to-gold/10">
//         <svg viewBox="0 0 64 64" className="h-7 w-7">
//           <path
//             d="M12 40c5-6 9-6 14 0s9 6 14 0 9-6 12-2"
//             stroke="#7ff0e8"
//             strokeWidth="5"
//             fill="none"
//             strokeLinecap="round"
//           />
//           <path
//             d="M12 50c5-6 9-6 14 0s9 6 14 0 9-6 12-2"
//             stroke="#d6ab62"
//             strokeWidth="5"
//             fill="none"
//             strokeLinecap="round"
//             opacity="0.75"
//           />
//           <path
//             d="M22 30V16h9a7 7 0 0 1 0 14h-9m9-14 8 14"
//             stroke="#f6f2ea"
//             strokeWidth="5"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//         <span className="absolute inset-0 scale-0 rounded-2xl bg-aqua/20 transition-transform duration-500 group-hover:scale-100" />
//       </span>
//       <span className="leading-none">
//         <span className="block font-display text-2xl font-600 tracking-[0.18em] text-cream">
//           RES
//         </span>
//         {!compact && (
//           <span className="mt-0.5 block text-[9px] font-500 uppercase tracking-[0.26em] text-mist">
//             Water Engineering
//           </span>
//         )}
//       </span>
//     </Link>
//   )
// }

// export default Logo






// import { Link } from 'react-router-dom'
// import { scrollToTop } from '../../lib/anim'

// export function Logo({ compact = false }: { compact?: boolean }) {
//   return (
//     <Link to="/" className="group flex items-center gap-3" onClick={() => scrollToTop(true)}>
//       <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full">
//         <img
//           src="/images/logo.svg"
//           alt="Reliance Engineering Solution logo"
//           className="h-full w-full object-contain"
//         />
//         <span className="absolute inset-0 scale-0 rounded-full bg-aqua/20 transition-transform duration-500 group-hover:scale-100" />
//       </span>
//       <span className="leading-none">
//         <span className="block font-display text-2xl font-600 tracking-[0.18em] text-cream">
//           RES
//         </span>
//         {!compact && (
//           <span className="mt-0.5 block text-[9px] font-500 uppercase tracking-[0.26em] text-mist">
//             Water Engineering
//           </span>
//         )}
//       </span>
//     </Link>
//   )
// }

// export default Logo


























import { Link } from 'react-router-dom'
import { scrollToTop } from '../../lib/anim'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" onClick={() => scrollToTop(true)}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-aqua/30 bg-gradient-to-br from-aqua/25 to-gold/10">
        <img src="/images/logo.svg" alt="RES logo" className="h-7 w-7 object-contain" />
        <span className="absolute inset-0 scale-0 rounded-2xl bg-aqua/20 transition-transform duration-500 group-hover:scale-100" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-2xl font-600 tracking-[0.18em] text-cream">
          RES
        </span>
        {!compact && (
          <span className="mt-0.5 block text-[9px] font-500 uppercase tracking-[0.26em] text-mist">
            Water Engineering
          </span>
        )}
      </span>
    </Link>
  )
}

export default Logo