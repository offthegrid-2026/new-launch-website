import RichText from '../../components/RichText/RichText'
import styles from './FaqItem.module.css'

function Block({ block }) {
  if (typeof block === 'string') return <p>{block}</p>
  if (Array.isArray(block)) {
    return (
      <p>
        <RichText segments={block} linkClassName={styles.link} />
      </p>
    )
  }
  if (block.list) {
    return (
      <ul className={styles.bullets}>
        {block.list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    )
  }
  return null
}

/** One accordion row. The panel stays in the DOM; closed panels are hidden from AT and tab order. */
export default function FaqItem({ item, open, onToggle, index }) {
  const buttonId = `faq-q-${index}`
  const panelId = `faq-a-${index}`
  return (
    <li className={`${styles.item} ${open ? styles.open : ''}`}>
      <h3 className={styles.heading}>
        <button id={buttonId} type="button" className={styles.head} onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
          <span className={styles.sign} aria-hidden="true">
            <span className={styles.bar} />
            <span className={`${styles.bar} ${styles.vertical}`} />
          </span>
          <span className={styles.q}>{item.q}</span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!open}>
        <div className={styles.clip}>
          <div className={styles.answer}>
            {item.a.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}
