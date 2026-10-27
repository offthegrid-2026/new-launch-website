import { motion, useScroll, useTransform } from 'framer-motion'
import CodedLayer from './CodedLayer'
import styles from './LayerStack.module.css'

// Every section's extracted layers (see scripts/extract-layers.mjs);
// manifest entries with a `kind` are drawn in code by CodedLayer.
const files = import.meta.glob('../../assets/images/*/layer*.webp', { eager: true, import: 'default' })
const manifests = import.meta.glob('../../assets/images/*/layers.json', { eager: true, import: 'default' })

/**
 * Renders a section's Canva layers bottom → top on an artboard that
 * scales to cover the section box.
 *
 *   section    folder name under src/assets/images (e.g. "hero")
 *   height     section height in artboard px
 *   behaviour  { [layerIndex]: { className, intro, parallax } }
 *              className — CSS module class with the looping animation
 *              intro     — framer-motion props for the entrance
 *              parallax  — px the layer drifts over one viewport of scroll
 *              skip      — the section renders this layer itself
 */
export default function LayerStack({ section, height, behaviour = {}, children }) {
  const layers = manifests[`../../assets/images/${section}/layers.json`] || []
  const { scrollY } = useScroll()

  return (
    <div className={styles.viewport} aria-hidden="true">
      <div className={styles.artboard} style={{ '--ah': height }}>
        {layers.filter((l) => !behaviour[l.index]?.skip).map((l) => (
          <Layer
            key={l.index}
            layer={l}
            src={l.file && files[`../../assets/images/${section}/${l.file}`]}
            b={behaviour[l.index] || {}}
            scrollY={scrollY}
          />
        ))}
        {children}
      </div>
    </div>
  )
}

function Layer({ layer, src, b, scrollY }) {
  const y = useTransform(scrollY, (v) => (b.parallax ? (v / 900) * b.parallax : 0))
  return (
    <motion.div
      className={styles.layer}
      style={{ '--l': layer.left, '--t': layer.top, '--w': layer.width, '--h': layer.height, y }}
      {...(b.intro || {})}
    >
      {layer.kind ? (
        <CodedLayer layer={layer} className={`${styles.img} ${b.className || ''}`} />
      ) : (
        <img src={src} alt="" className={`${styles.img} ${b.className || ''}`} draggable="false" />
      )}
    </motion.div>
  )
}
