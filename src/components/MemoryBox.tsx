import { Archive, Camera, Heart, LockKeyhole, Mail, Music2, StickyNote, Star } from 'lucide-react'
import { SectionTitle } from './SectionTitle'

const shelves = [
  { label: 'Photos', detail: 'Frames from the camera roll', target: 'memories', icon: Camera },
  { label: 'Letters', detail: 'Words for the right day', target: 'letter-vault', icon: Mail },
  { label: 'Notes', detail: 'Little thoughts to keep', target: 'little-notes', icon: StickyNote },
  { label: 'Songs', detail: 'A soundtrack, when you choose', target: 'soundtrack', icon: Music2 },
  { label: 'Favorite moments', detail: 'A growing timeline', target: 'moments', icon: Star },
  { label: 'Secrets', detail: 'A date only we know', target: 'surprise', icon: LockKeyhole },
]

export function MemoryBox() {
  function openShelf(target: string) {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="memory-box-section section-pad" id="memory-box">
      <div className="page-width memory-box-inner">
        <div className="memory-box-heading"><Archive size={20} /><SectionTitle eyebrow="KEEPING THE SMALL THINGS SAFE" title="Our Memory Box" description="A few drawers for the parts of our little universe we want to come back to." /></div>
        <div className="memory-box-shelves">{shelves.map(({ label, detail, target, icon: Icon }, index) => <button key={label} onClick={() => openShelf(target)}><span className="memory-shelf-icon"><Icon size={17} /></span><span className="memory-shelf-count">0{index + 1}</span><strong>{label}</strong><span>{detail}</span><Heart className="memory-shelf-heart" size={12} fill="currentColor" /></button>)}</div>
      </div>
    </section>
  )
}