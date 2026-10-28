import styles from './Container.module.css'

/** The page column. Every section puts its content in one of these. */
export default function Container({ as = 'div', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag className={`${styles.container} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
