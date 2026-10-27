/** Renders [{ t, hl }] segments; highlighted runs get `hlClassName`. */
export default function RichText({ segments, hlClassName }) {
  return segments.map((s, i) =>
    s.hl || s.accent ? (
      <span key={i} className={hlClassName}>
        {s.t}
      </span>
    ) : (
      <span key={i}>{s.t}</span>
    ),
  )
}
