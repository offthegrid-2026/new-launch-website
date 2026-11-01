import { useEffect, useId, useRef } from 'react'
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import eyeless from '../../assets/images/logo-eyeless.webp'

// Geometry measured from design/exports/otg-logo.svg, in its 1768×1183 px.
// The image has the inside of the eye erased (scripts/export-logo.mjs); the iris and pupil are drawn here.
const W = 1768
const H = 1183
const IRIS = { cx: 446, cy: 213.15, r: 123.82 }
const PUPIL = { dx: 39.5, dy: 47.35, r: 24 } // offset from the iris centre at rest
const PUPIL_REACH = IRIS.r - PUPIL.r - 14 // the pupil keeps a 14px rim of iris around it
const IRIS_REACH = { left: 90, right: 40 } // more room on the left of the opening than the right
const PULL = 350 // cursor distance (px) at which the eye looks fully that way

const irisSpring = { stiffness: 140, damping: 18, mass: 0.7 }
const pupilSpring = { stiffness: 220, damping: 20, mass: 0.5 }

/**
 * The OTG logo with an eye that follows the mouse: the iris slides left and right inside
 * the opening, the pupil roams within the iris. Touch and reduced motion leave it at rest.
 */
export default function OtgLogo({ className }) {
  const ref = useRef(null)
  const maskId = `otg-eye-${useId().replace(/[^\w-]/g, '')}`
  const reduce = useReducedMotion()

  const irisX = useSpring(0, irisSpring)
  const pupilX = useSpring(PUPIL.dx, pupilSpring)
  const pupilY = useSpring(PUPIL.dy, pupilSpring)

  const irisCx = useTransform(irisX, (x) => IRIS.cx + x)
  const pupilCx = useTransform([irisX, pupilX], ([ix, px]) => IRIS.cx + ix + px)
  const pupilCy = useTransform(pupilY, (py) => IRIS.cy + py)

  useEffect(() => {
    if (reduce) return

    const rest = () => {
      irisX.set(0)
      pupilX.set(PUPIL.dx)
      pupilY.set(PUPIL.dy)
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch' || !ref.current) return
      const box = ref.current.getBoundingClientRect()
      const dx = e.clientX - (box.left + (box.width * IRIS.cx) / W)
      const dy = e.clientY - (box.top + (box.height * IRIS.cy) / H)
      const dist = Math.hypot(dx, dy)
      if (!dist) return
      const s = Math.min(dist / PULL, 1)
      const ux = dx / dist
      const uy = dy / dist

      irisX.set(ux * s * (ux < 0 ? IRIS_REACH.left : IRIS_REACH.right))
      // blends from the resting offset towards the rim, so it never leaves the iris
      pupilX.set(PUPIL.dx * (1 - s) + ux * PUPIL_REACH * s)
      pupilY.set(PUPIL.dy * (1 - s) + uy * PUPIL_REACH * s)
    }

    const onOut = (e) => !e.relatedTarget && rest()

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
    }
  }, [reduce, irisX, pupilX, pupilY])

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        {/* the pupil is a hole in the iris, so whatever is behind the logo shows through */}
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill="#fff" />
          <motion.circle cx={pupilCx} cy={pupilCy} r={PUPIL.r} fill="#000" />
        </mask>
      </defs>
      <image href={eyeless} width={W} height={H} />
      <motion.circle cx={irisCx} cy={IRIS.cy} r={IRIS.r} fill="#fff" mask={`url(#${maskId})`} />
    </svg>
  )
}
