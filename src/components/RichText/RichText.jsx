import { NAMED_LINKS, enquiryHref } from '../../config/links'

/**
 * Renders [{ t, hl, strong, link }] segments.
 * `hl` / `accent` runs get `hlClassName`; `link` is a key in NAMED_LINKS.
 */
export default function RichText({ segments, hlClassName, linkClassName }) {
  return segments.map((s, i) => {
    let node = s.t
    if (s.strong) node = <strong>{node}</strong>
    if (s.link) {
      const { enquiry } = NAMED_LINKS[s.link]
      return (
        <a key={i} href={enquiry ? enquiryHref(enquiry) : NAMED_LINKS[s.link]} data-enquiry={enquiry} className={linkClassName}>
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
