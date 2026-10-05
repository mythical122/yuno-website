import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart, X } from 'lucide-react'
import { memories, type Memory } from '../data/story'

const filters = ['All', 'Us', 'Her', 'Adventures', 'Random', 'Favorites'] as const
type Filter = (typeof filters)[number]

function MemoryImage({ memory, onDoubleClick }: { memory: Memory; onDoubleClick?: () => void }) {
  const [failed, setFailed] = useState(false)
  const color = `memory-tone-${((memory.id - 1) % 6) + 1}`

  return (
    <div className={`memory-image ${color}${failed ? ' is-placeholder' : ''}`} onDoubleClick={onDoubleClick}>
      {!failed && <img src={memory.image} alt={memory.title} loading="lazy" onError={() => setFailed(true)} />}
      {failed && <span className="image-mark">{String(memory.id).padStart(2, '0')}</span>}
      <span className="image-grain" aria-hidden="true" />
    </div>
  )
}

export function MemoryGallery({ onSecret }: { onSecret?: () => void }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [active, setActive] = useState<Memory | null>(null)
  const [heart, setHeart] = useState<number | null>(null)
  const visible = memories.filter((memory) => filter === 'All' || (filter === 'Favorites' ? memory.favorite : memory.category === filter))

  useEffect(() => {
    if (!active) return
    const step = (direction: number) => setActive((current) => {
      if (!current) return current
      const index = visible.findIndex((memory) => memory.id === current.id)
      return visible[(index + direction + visible.length) % visible.length]
    })
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [active, visible])

  function move(direction: number) {
    if (!active) return
    const index = visible.findIndex((memory) => memory.id === active.id)
    setActive(visible[(index + direction + visible.length) % visible.length])
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Filter memories">
          {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <span className="gallery-count">{String(visible.length).padStart(2, '0')} FRAMES</span>
      </div>
      <motion.div layout className="memory-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((memory, index) => (
            <motion.button
              layout
              key={memory.id}
              className={`memory-tile memory-tile-${(index % 4) + 1}`}
              onClick={() => setActive(memory)}
              onDoubleClick={(event) => { event.stopPropagation(); onSecret?.(); setHeart(memory.id); window.setTimeout(() => setHeart(null), 900) }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              aria-label={`Open memory: ${memory.title}`}
            >
              <MemoryImage memory={memory} />
              <span className="memory-tile-copy"><span>{memory.date}</span><strong>{memory.title}</strong></span>
              {heart === memory.id && <Heart className="double-heart" fill="currentColor" aria-hidden="true" />}
              {memory.favorite && <Heart className="favorite-mark" size={14} fill="currentColor" aria-label="Favorite" />}
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {active && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null) }}>
          <button className="lightbox-close icon-button" onClick={() => setActive(null)} aria-label="Close image"><X /></button>
          <button className="lightbox-arrow lightbox-prev icon-button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft /></button>
          <motion.div className="lightbox-content" key={active.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
            <MemoryImage memory={active} />
            <p className="eyebrow">{active.date}</p><h3>{active.title}</h3>{active.location && <p className="memory-location">{active.location}</p>}<p>{active.memory ?? active.caption}</p>
          </motion.div>
          <button className="lightbox-arrow lightbox-next icon-button" onClick={() => move(1)} aria-label="Next image"><ArrowRight /></button>
          <span className="lightbox-hint">Use ← → to wander</span>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}