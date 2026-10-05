import { motion } from 'framer-motion'
import { littleThings } from '../data/littleThings'
import { SectionTitle } from './SectionTitle'

export function LittleThings() {
  return (
    <section className="little-things-section section-pad" id="little-things">
      <div className="page-width">
        <SectionTitle eyebrow="NO GRAND GESTURE REQUIRED" title="The Little Things That Became Everything" description="A collection of familiar kinds of moments. Keep the ones that feel like yours, and add your own in the story data." />
        <div className="little-things-grid">{littleThings.map((item, index) => <motion.article className="little-thing" key={item} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index % 4 * 0.04 }}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p><i aria-hidden="true">✦</i></motion.article>)}</div>
      </div>
    </section>
  )
}