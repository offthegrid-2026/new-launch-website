import { useEffect, useState } from 'react'

// one request per page load, shared by every pass card
let request

/**
 * Names of the passes that have hit their cap (CAPS in scripts/application-form.gs), or null while
 * asking. If the answer can't be had, nothing counts as sold out: the script still refuses
 * applications past the cap, so the form never takes more than it should.
 */
export default function useSoldOut() {
  const [soldOut, setSoldOut] = useState(null)

  useEffect(() => {
    request ||= fetch('/api/register')
      .then((res) => (res.ok ? res.json() : {}))
      .then((result) => result.soldOut || [])
      .catch(() => [])
    let live = true
    request.then((list) => live && setSoldOut(list))
    return () => {
      live = false
    }
  }, [])

  return soldOut
}
