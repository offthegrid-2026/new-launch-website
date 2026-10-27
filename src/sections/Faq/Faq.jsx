import { useState } from 'react'
import { faqs } from '../../data/content'
import BrushText from '../../components/BrushText/BrushText'
import Glow from '../../components/Glow/Glow'
import GridBackdrop from '../../components/GridBackdrop/GridBackdrop'
import FaqItem from './FaqItem'
import styles from './Faq.module.css'

// Canva text box for "FAQs"
const SCRIPT_BOX = { left: 4.67, top: 82.84, width: 455.68, height: 120.85, rotate: -5.39, size: 100.83 }

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className={styles.section}>
      <GridBackdrop />
      <div className={`stage ${styles.stage}`}>
        <Glow x={1095.28} y={447.5} size={617} opacity={0.24} duration={15} />
        <Glow x={275.17} y={-352.66} size={617} opacity={0.24} color="190, 190, 255" duration={18} delay={2} />

        <BrushText as="h2" box={SCRIPT_BOX} className={styles.script} duration={1.2}>
          {faqs.script}
        </BrushText>

        <ul className={styles.list}>
          {faqs.items.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
