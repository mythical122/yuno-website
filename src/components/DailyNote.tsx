import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Shuffle } from 'lucide-react'
import { notes } from '../data/notes'
import { SectionTitle } from './SectionTitle'

function savedNote() {
  try {
    return localStorage.getItem('yuno-daily-note') ?? notes[0]
  } catch {
    return notes[0]
  }
}

export function DailyNote() {
  const [note, setNote] = useState(savedNote)

  function revealNote() {
    const choices = notes.filter((candidate) => candidate !== note)
    const next = choices[Math.floor(Math.random() * choices.length)] ?? notes[0]
    setNote(next)
    try {
      localStorage.setItem('yuno-daily-note', next)
    } catch {
      // The note remains available for this visit when storage is disabled.
    }
  }

  return (
    <section className="daily-note-section section-pad" id="little-notes">
      <div className="page-width daily-note-layout">
        <div><SectionTitle eyebrow="A NOTE, JUST BECAUSE" title="Little Notes For You" description="A small thought from my day to yours. Keep the one you need, or ask for another." />
          <button className="button button-primary" onClick={revealNote}><Shuffle size={15} /> Give Me A Note <ArrowRight size={15} /></button>
        </div>
        <div className="daily-note-paper" aria-live="polite" aria-atomic="true">
          <span className="daily-note-date"><Heart size={13} fill="currentColor" /> TODAY'S NOTE</span>
          <motion.p key={note} initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.35 }}>{note}</motion.p>
          <span className="daily-note-signature">— Deepak, on an ordinary day</span>
        </div>
      </div>
    </section>
  )
}