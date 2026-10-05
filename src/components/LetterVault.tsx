import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart, X } from 'lucide-react'
import { letters } from '../data/letters'
import { SectionTitle } from './SectionTitle'

type LetterVaultProps = { onOpenLast?: () => void }

export function LetterVault({ onOpenLast }: LetterVaultProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? null : (index + 1) % letters.length)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? null : (index - 1 + letters.length) % letters.length)
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])')
        if (!controls?.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) returnFocusRef.current?.focus()
  }, [activeIndex])

  function openLetter(index: number) {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActiveIndex(index)
    if (index === letters.length - 1) onOpenLast?.()
  }

  return (
    <section className="letter-vault-section section-pad" id="letter-vault">
      <div className="page-width">
        <SectionTitle eyebrow="A SMALL ARCHIVE OF WORDS" title="Letters I Wrote For You" description="Some words are easier to keep in an envelope until the day they are needed." />
        <div className="letter-envelope-grid">
          {letters.map((letter, index) => (
            <button className="letter-envelope" key={letter.title} onClick={() => openLetter(index)} aria-label={`Open letter: ${letter.envelope}`}>
              <span className="envelope-mark"><Heart size={15} /></span>
              <span className="envelope-count">{String(index + 1).padStart(2, '0')}</span>
              <strong>{letter.envelope}</strong>
              <span>{letter.note}</span>
              <span className="envelope-action">OPEN LETTER <ArrowRight size={13} /></span>
            </button>
          ))}
        </div>
      </div>
      {activeIndex !== null && <motion.div ref={dialogRef} className="letter-reading" role="dialog" aria-modal="true" aria-label={letters[activeIndex].title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="letter-particles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <button ref={closeButtonRef} className="letter-reading-close icon-button" onClick={() => setActiveIndex(null)} aria-label="Close letter"><X /></button>
          <button className="letter-reading-arrow letter-reading-prev icon-button" onClick={() => setActiveIndex((activeIndex - 1 + letters.length) % letters.length)} aria-label="Previous letter"><ArrowLeft /></button>
          <motion.article className="letter-paper" key={activeIndex} initial={{ opacity: 0, y: 24, rotateX: 5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.55 }}>
            <span className="eyebrow">A LETTER FOR YUNO · {String(activeIndex + 1).padStart(2, '0')} / {String(letters.length).padStart(2, '0')}</span>
            <h2>{letters[activeIndex].title}</h2>
            <div className="letter-paper-copy">{letters[activeIndex].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <span className="letter-paper-signature">— Deepak <Heart size={13} fill="currentColor" /></span>
          </motion.article>
          <button className="letter-reading-arrow letter-reading-next icon-button" onClick={() => setActiveIndex((activeIndex + 1) % letters.length)} aria-label="Next letter"><ArrowRight /></button>
          <span className="letter-reading-hint">ESC TO CLOSE · ARROW KEYS TO WANDER</span>
      </motion.div>}
    </section>
  )
}