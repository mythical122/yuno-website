import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { finalLetterParagraphs } from '../data/letters'
import { finalRevealLines } from '../data/secrets'
import { siteConfig } from '../data/siteConfig'
import { SectionTitle } from './SectionTitle'

type CinematicEndingProps = { onFinalSecret?: () => void }

export function CinematicEnding({ onFinalSecret }: CinematicEndingProps) {
  const [open, setOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    const timers = finalRevealLines.map(({ delay }, index) => window.setTimeout(() => setVisibleLines(index + 1), delay))
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
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
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) returnFocusRef.current?.focus()
  }, [open])

  function openEnding() {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setVisibleLines(0)
    setOpen(true)
    onFinalSecret?.()
  }

  return <>
    <section className="keep-moment-section section-pad">
      <div className="keep-moment-stars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <span className="eyebrow">A THOUGHT I KEEP COMING BACK TO</span>
      <p>If I could keep one thing forever...</p>
      <motion.h2 initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.2, delay: 0.35 }}>The feeling of having you in my life.</motion.h2>
      <span className="keep-moment-date">{siteConfig.relationshipDate.toUpperCase()} · AND STILL BECOMING</span>
    </section>
    <section className="final-letter-section section-pad" id="before-you-leave">
      <div className="page-width final-letter-inner"><SectionTitle eyebrow="ONE LAST LETTER, BEFORE YOU GO" title="Before You Leave..." description="From Deepak, written for Yuno." />
        <article className="final-letter-paper">{finalLetterParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="final-letter-signoff">Still you.<br />Still us.<br />Always my favorite story.<br /><span>— Deepak <Heart size={13} fill="currentColor" /></span></p></article>
      </div>
    </section>
    <section className="last-surprise-section">
      <span className="eyebrow">THE LAST LITTLE ENVELOPE</span><h2>One Last Thing...</h2><p>There is one more thing I want you to hear.</p><button className="button button-primary" onClick={openEnding}>Open It <Heart size={14} /></button>
    </section>
    {open && <motion.div ref={dialogRef} className="final-reveal" role="dialog" aria-modal="true" aria-label="One last thing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="reveal-particles" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--particle': index } as React.CSSProperties} />)}</div>
      <button ref={closeButtonRef} className="final-reveal-close icon-button" onClick={() => setOpen(false)} aria-label="Close final message"><X /></button>
      <div className="final-reveal-copy" aria-live="polite">{finalRevealLines.slice(0, visibleLines).map((line) => <motion.p key={line.text} initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9 }} className={line.text.includes('choose you') ? 'reveal-choice' : ''}>{line.text}</motion.p>)}</div>
    </motion.div>}
  </>
}