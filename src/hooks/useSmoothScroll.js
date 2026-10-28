import { useEffect } from 'react'
import Lenis from 'lenis'

/** Inertial page scrolling + smooth in-page anchor jumps, offset for the fixed header. */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const headerHeight = document.querySelector('header')?.offsetHeight ?? 0
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -headerHeight } })
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
