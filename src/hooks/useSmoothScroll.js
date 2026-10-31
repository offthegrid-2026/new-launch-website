import { useEffect } from 'react'
import Lenis from 'lenis'

/** Inertial page scrolling + smooth in-page anchor jumps, offset for the fixed header. */
export default function useSmoothScroll() {
  // arriving with a hash (e.g. /#speakers from a legal page): the browser looks for the
  // target before React has rendered it, so jump there once the page has laid out
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const jump = () => {
      const target = document.getElementById(id)
      if (!target) return
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'instant' })
    }
    if (document.readyState === 'complete') {
      const raf = requestAnimationFrame(jump)
      return () => cancelAnimationFrame(raf)
    }
    window.addEventListener('load', jump, { once: true })
    return () => window.removeEventListener('load', jump)
  }, [])

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
