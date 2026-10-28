import { NAMED_LINKS } from '../../config/links'

/**
 * Renders [{ t, hl, strong, link }] segments.
 * `hl` / `accent` runs get `hlClassName`; `link` is a key in NAMED_LINKS.
 */
export default function RichText({ segments, hlClassName, linkClassName }) {
  return segments.map((s, i) => {
    let node = s.t
    if (s.strong) node = <strong>{node}</strong>
    if (s.link) {
      return (
        <a key={i} href={NAMED_LINKS[s.link]} className={linkClassName}>
          {node}
        </a>
      )
    }
    if (s.hl || s.accent) {
      return (
        <span key={i} className={hlClassName}>
          {node}
        </span>
      )
    }
    return <span key={i}>{node}</span>
  })
}
