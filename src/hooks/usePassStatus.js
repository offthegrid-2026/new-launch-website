import { useEffect, useState } from 'react'

// one request per page load, shared by every pass card
let request

/**
 * For the passes with a cap (CAPS in scripts/application-form.gs): `remaining` maps a pass name to
 * the applications it has left, `soldOut` lists the full ones. Null while asking. If the answer
 * can't be had, nothing counts as sold out and no count shows: the script still refuses
 * applications past the cap, so the form never takes more than it should.
 */
export default function usePassStatus() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    request ||= fetch('/api/register')
      .then((res) => (res.ok ? res.json() : {}))
      .then((result) => ({ remaining: result.remaining || {}, soldOut: result.soldOut || [] }))
      .catch(() => ({ remaining: {}, soldOut: [] }))
    let live = true
    request.then((result) => live && setStatus(result))
    return () => {
      live = false
    }
  }, [])

  return status
}
