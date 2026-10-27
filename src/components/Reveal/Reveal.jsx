import { motion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(14px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
}

/** Scroll-triggered entrance. Renders as any motion element via `as`. */
export default function Reveal({
  as = 'div',
  from = 'up',
  delay = 0,
  duration = 0.9,
  amount = 0.3,
  once = true,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[from]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
