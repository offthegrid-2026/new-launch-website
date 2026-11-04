import { useEffect, useId, useRef, useState } from 'react'
import styles from './RegisterPage.module.css'

/**
 * Dropdown of checkboxes with a search box, picking one or more `options`.
 * The choice is posted as one `name` field joined with '; ' (some options contain commas).
 * A hidden text input carries `required`, so the browser blocks the submit and points at the
 * trigger when nothing is picked, like any other required field.
 */
export default function MultiSelect({ name, label, options, placeholder, searchLabel, emptyLabel, required }) {
  const [picked, setPicked] = useState([])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const root = useRef(null)
  const trigger = useRef(null)
  const id = useId()

  // close on a click outside or Escape
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!root.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      trigger.current.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = (option) =>
    setPicked((list) => (list.includes(option) ? list.filter((o) => o !== option) : [...list, option]))

  const shown = options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div ref={root} className={styles.multi}>
      <span id={`${id}-label`} className={styles.multiLabel}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>

      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((o) => !o)}
      >
        <span id={`${id}-value`} className={picked.length ? styles.value : styles.placeholder}>
          {picked.length ? picked.join(' · ') : placeholder}
        </span>
      </button>

      <input
        className={styles.proxy}
        name={name}
        value={picked.join('; ')}
        onChange={() => {}}
        onInvalid={() => setOpen(true)}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
      />

      {open && (
        <div id={`${id}-panel`} className={styles.panel} role="group" aria-labelledby={`${id}-label`}>
          <input
            type="search"
            className={styles.search}
            placeholder={searchLabel}
            aria-label={searchLabel}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul className={styles.options}>
            {shown.map((o) => (
              <li key={o}>
                <label className={styles.option}>
                  <input type="checkbox" checked={picked.includes(o)} onChange={() => toggle(o)} />
                  <span>{o}</span>
                </label>
              </li>
            ))}
            {!shown.length && <li className={styles.empty}>{emptyLabel}</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
