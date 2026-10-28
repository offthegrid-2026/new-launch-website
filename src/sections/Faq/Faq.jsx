import { useState } from 'react'
import { faqSection } from '../../content/site'
import { faqs } from '../../content/faqs'
import Container from '../../components/Container/Container'
import Glow from '../../components/Glow/Glow'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import FaqItem from './FaqItem'
import styles from './Faq.module.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title">
      <Glow x="100%" y="70%" opacity={0.16} duration={15} />
      <Glow x="30%" y="0%" color="190, 190, 255" opacity={0.14} duration={18} delay={2} />
      <Container>
        <SectionTitle id="faq-title" script={faqSection.script} align="left" />
        <ul className={styles.list}>
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
