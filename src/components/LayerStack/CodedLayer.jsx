import { useId } from 'react'

/**
 * A Canva layer redrawn as SVG instead of shipping its export.
 * Coordinates are artboard px; the viewBox is the layer's own box,
 * so it drops into the same slot an <img> layer would.
 *
 *   kind "glow" — radial gradients fitted to the exported glow
 *                 (blob: cx, cy, r, optional ry, optional box, stops)
 *   kind "box"  — rounded rect with linear-gradient fill and inside stroke
 */
export default function CodedLayer({ layer, className }) {
  const id = useId().replace(/:/g, '')
  const { left, top, width, height } = layer

  return (
    <svg
      className={className}
      viewBox={`${left} ${top} ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {layer.kind === 'glow' && <Glow id={id} layer={layer} />}
      {layer.kind === 'box' && <Box id={id} shape={layer.shape} />}
    </svg>
  )
}

function Glow({ id, layer }) {
  return layer.blobs.map((b, i) => {
    const [x, y, w, h] = b.box || [layer.left, layer.top, layer.width, layer.height]
    // elliptical glows squash the circle around its centre
    const transform = b.ry
      ? `translate(${b.cx} ${b.cy}) scale(1 ${b.ry / b.r}) translate(${-b.cx} ${-b.cy})`
      : undefined
    return (
      <g key={i}>
        <defs>
          <radialGradient id={`${id}g${i}`} gradientUnits="userSpaceOnUse" cx={b.cx} cy={b.cy} r={b.r} gradientTransform={transform}>
            {b.stops.map(([offset, color, opacity], j) => (
              <stop key={j} offset={offset} stopColor={color} stopOpacity={opacity} />
            ))}
          </radialGradient>
        </defs>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}g${i})`} />
      </g>
    )
  })
}

// CSS linear-gradient angle → gradient line across the rect
function line({ x, y, w, h }, angle) {
  const a = (angle * Math.PI) / 180
  const dx = Math.sin(a), dy = -Math.cos(a)
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2
  const cx = x + w / 2, cy = y + h / 2
  return { x1: cx - dx * half, y1: cy - dy * half, x2: cx + dx * half, y2: cy + dy * half }
}

function Box({ id, shape: s }) {
  const sw = s.stroke.width
  return (
    <>
      <defs>
        <linearGradient id={`${id}f`} gradientUnits="userSpaceOnUse" {...line(s, s.fill.angle)}>
          {s.fill.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <linearGradient id={`${id}k`} gradientUnits="userSpaceOnUse" {...line(s, s.stroke.angle)}>
          {s.stroke.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
      </defs>
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={`url(#${id}f)`} />
      {/* Canva strokes sit inside the edge */}
      <rect
        x={s.x + sw / 2}
        y={s.y + sw / 2}
        width={s.w - sw}
        height={s.h - sw}
        rx={s.rx - sw / 2}
        fill="none"
        stroke={`url(#${id}k)`}
        strokeWidth={sw}
      />
    </>
  )
}
