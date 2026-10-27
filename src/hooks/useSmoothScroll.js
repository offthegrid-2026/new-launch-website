import { useEffect } from 'react'
import Lenis from 'lenis'

/** Inertial page scrolling + smooth in-page anchor jumps. */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } })
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
