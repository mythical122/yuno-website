import { motion } from 'framer-motion'

type SectionTitleProps = {
  eyebrow: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionTitle({ eyebrow, title, description, centered = false }: SectionTitleProps) {
  return (
    <motion.div
      className={`section-title${centered ? ' section-title--center' : ''}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  )
}