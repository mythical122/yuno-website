import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Music2, Plus, Sparkles, Star, Trash2, UnlockKeyhole } from 'lucide-react'
import { Intro, CursorGlow, ScrollProgress, SiteNav } from './components/SiteChrome'
import { MemoryGallery } from './components/MemoryGallery'
import { MusicPlayer } from './components/MusicPlayer'
import { SectionTitle } from './components/SectionTitle'
import { LetterVault } from './components/LetterVault'
import { DailyNote } from './components/DailyNote'
import { LittleThings } from './components/LittleThings'
import { MemoryBox } from './components/MemoryBox'
import { CinematicEnding } from './components/CinematicEnding'
import { VideoReel } from './components/VideoReel'
import { chaosQuestions, constellation, futureList, polaroids, story } from './data/story'
import { bucketList } from './data/bucketList'
import { moments } from './data/moments'
import { letters } from './data/letters'
import { notes } from './data/notes'
import { hiddenNotes } from './data/secrets'
import { reasons } from './data/reasons'
import { letterParagraphs } from './data/letter'
import { siteConfig } from './data/siteConfig'
import './App.css'
import './experience.css'

type BucketItem = { text: string; done: boolean }

function LocalArt({ src, className, label }: { src: string; className?: string; label: string }) {
  const [failed, setFailed] = useState(false)
  return <div className={`local-art${className ? ` ${className}` : ''}${failed ? ' is-placeholder' : ''}`}>
    {!failed && <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />}
    {failed && <span className="art-placeholder-mark" aria-hidden="true"><Sparkles size={18} /> <i>ADD PHOTO</i></span>}
  </div>
}

function App() {
  const [intro, setIntro] = useState(true)
  const [openReason, setOpenReason] = useState<number | null>(null)
  const [openStar, setOpenStar] = useState<number | null>(null)
  const [openChaos, setOpenChaos] = useState<number | null>(null)
  const [bucketInput, setBucketInput] = useState('')
  const [scrapbookItems, setScrapbookItems] = useState(polaroids)
  const [draggedCaption, setDraggedCaption] = useState('')
  const [polaroidOffsets, setPolaroidOffsets] = useState<Record<string, { x: number; y: number }>>({})
  const polaroidDrag = useRef<{ caption: string; pointerId: number; startX: number; startY: number; offsetX: number; offsetY: number } | null>(null)
  const [bucketItems, setBucketItems] = useState<BucketItem[]>(() => {
    try {
      const saved = localStorage.getItem('yuno-bucket-list')
      return saved ? (JSON.parse(saved) as Array<string | BucketItem>).map((item) => typeof item === 'string' ? { text: item, done: false } : item) : bucketList.map((text) => ({ text, done: false }))
    } catch {
      return bucketList.map((text) => ({ text, done: false }))
    }
  })
  const [notice, setNotice] = useState('')
  const [starTaps, setStarTaps] = useState<Record<number, number>>({})

  function showSecret(index: number) {
    setNotice(hiddenNotes[index]?.message ?? '')
    window.setTimeout(() => setNotice(''), 3600)
  }

  function openConstellationStar(index: number) {
    const taps = (starTaps[index] ?? 0) + 1
    setStarTaps((current) => ({ ...current, [index]: taps }))
    if (index === 0 && taps % 3 === 0) showSecret(0)
    if (index === constellation.length - 1 && taps % 3 === 0) showSecret(8)
    setOpenStar(openStar === index ? null : index)
  }

  useEffect(() => {
    localStorage.setItem('yuno-bucket-list', JSON.stringify(bucketItems))
  }, [bucketItems])

  useEffect(() => {
    let sequence: string[] = []
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
    const onKeyDown = (event: KeyboardEvent) => {
      sequence = [...sequence, event.key].slice(-konami.length)
      if (konami.every((key, index) => sequence[index] === key)) {
        showSecret(0)
      }
      if (event.altKey && event.key.toLowerCase() === 'y') {
        showSecret(3)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function addBucketItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = bucketInput.trim()
    if (!value) return
    setBucketItems((items) => [...items, { text: value, done: false }])
    setBucketInput('')
  }

  function moveScrapbookItem(sourceCaption: string, targetCaption: string) {
    setScrapbookItems((items) => {
      const sourceIndex = items.findIndex((item) => item.caption === sourceCaption)
      const targetIndex = items.findIndex((item) => item.caption === targetCaption)
      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return items
      const reordered = [...items]
      const [item] = reordered.splice(sourceIndex, 1)
      reordered.splice(targetIndex, 0, item)
      return reordered
    })
    setDraggedCaption('')
  }

  function startScrapbookDrag(event: ReactPointerEvent<HTMLDivElement>, caption: string) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const offset = polaroidOffsets[caption] ?? { x: 0, y: 0 }
    polaroidDrag.current = { caption, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, offsetX: offset.x, offsetY: offset.y }
    setDraggedCaption(caption)
  }

  function moveScrapbookDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = polaroidDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return
    setPolaroidOffsets((offsets) => ({
      ...offsets,
      [drag.caption]: {
        x: Math.max(-160, Math.min(160, drag.offsetX + event.clientX - drag.startX)),
        y: Math.max(-120, Math.min(120, drag.offsetY + event.clientY - drag.startY)),
      },
    }))
  }

  function finishScrapbookDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = polaroidDrag.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const target = document.elementsFromPoint(event.clientX, event.clientY)
      .map((element) => element.closest<HTMLElement>('.polaroid'))
      .find((card) => card && card.dataset.caption !== drag.caption)
    const targetCaption = target?.dataset.caption
    if (targetCaption && targetCaption !== drag.caption) {
      moveScrapbookItem(drag.caption, targetCaption)
      setPolaroidOffsets((offsets) => ({ ...offsets, [drag.caption]: { x: 0, y: 0 } }))
    } else {
      setDraggedCaption('')
    }
    polaroidDrag.current = null
  }

  function moveScrapbookWithKeyboard(event: ReactKeyboardEvent<HTMLDivElement>, caption: string, index: number) {
    if (!event.altKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    const targetIndex = index + (event.key === 'ArrowRight' ? 1 : -1)
    if (targetIndex >= 0 && targetIndex < scrapbookItems.length) moveScrapbookItem(caption, scrapbookItems[targetIndex].caption)
  }

  return (
    <div className="site-shell">
      <ScrollProgress />
      <CursorGlow />
      {intro && <Intro onEnter={() => setIntro(false)} />}
      {!intro && <SiteNav onLogoClick={() => showSecret(2)} onLogoHold={() => showSecret(9)} />}
      <main inert={intro} aria-hidden={intro}>
        <section className="hero-section" id="home">
          <div className="hero-star-field" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="hero-shell page-width">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dash" /> A LOVE LETTER IN MANY LITTLE FORMS</p>
              <h1>To the girl who became my <em>favorite part</em> of life.</h1>
              <p className="hero-description">{siteConfig.girlfriendName}, this is a tiny universe made from our memories, our chaos, our laughter, and all the little moments that became everything.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo('story')}>Explore our story <ArrowDown size={16} /></button>
                <button className="button button-quiet" onClick={() => scrollTo('soundtrack')}><span className="play-mini"><Music2 size={13} fill="currentColor" /></span> Play our song</button>
              </div>
              <div className="hero-footnote"><span className="hero-footnote-line" /><span>EST. {siteConfig.anniversaryDate}</span><span className="hero-footnote-dot">·</span><span>AND STILL BECOMING</span></div>
            </div>
            <div className="hero-art" aria-label="A moonlit universe made for Yuno">
              <div className="hero-planet-orbit orbit-a" /><div className="hero-planet-orbit orbit-b" />
              <div className="hero-moon"><span className="moon-crater crater-a" /><span className="moon-crater crater-b" /><span className="moon-crater crater-c" /></div>
              <div className="hero-glow" /><span className="hero-star star-a">✦</span><span className="hero-star star-b">✧</span><span className="hero-star star-c">✦</span>
              <div className="hero-caption"><span>01 / ∞</span><span>our own little orbit</span></div>
            </div>
            <span className="hero-side-note">A WORLD THAT ONLY HAS TO MAKE SENSE TO US</span>
          </div>
        </section>

        <RelationshipStats />

        <section className="story-section section-pad" id="story">
          <div className="page-width">
            <SectionTitle eyebrow="CHAPTER 01 · THE BEGINNING" title="It started with a date. Then it became a thousand little things." description="Some beginnings are quiet. This one became my favorite story to keep telling." />
            <div className="story-intro-line"><span className="date-stamp">10<br /><i>APR</i><br />{siteConfig.anniversaryDate.slice(-2)}</span><p>One day on the calendar. A whole world after it.</p><button className="timeline-secret-star" onClick={() => showSecret(5)} aria-label="A small hidden note beside the timeline"><Star size={15} /></button></div>
            <div className="timeline">
              {story.map((item, index) => <motion.article className={`timeline-entry${index === 0 ? ' is-origin' : ''}`} key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.04 }}>
                <span className="timeline-marker">{index === 0 ? <Heart size={12} fill="currentColor" /> : `0${index + 1}`}</span>
                <div className="timeline-date">{item.date}</div><div className="timeline-copy"><h3>{item.title}</h3><p>{item.description}</p>{item.quote && <span className="timeline-quote">“{item.quote}”</span>}</div>
              </motion.article>)}
            </div>
            <p className="edit-reminder">The best parts are still yours to fill in.</p>
          </div>
        </section>

        <section className="memories-section section-pad" id="memories">
          <div className="page-width">
            <SectionTitle eyebrow="CHAPTER 02 · THE MEMORY BOX" title="Little frames. Whole worlds inside." description="A place for the photos you keep coming back to. Double-tap a frame to leave a little heart." />
            <MemoryGallery onSecret={() => showSecret(1)} />
          </div>
        </section>

        <VideoReel />

        <section className="reasons-section section-pad" id="reasons">
          <div className="page-width">
            <SectionTitle eyebrow="CHAPTER 03 · THE LITTLE THINGS" title="There are a hundred little reasons." description="Tap one. There is a little more behind each of them." />
            <div className="reasons-layout"><div className="reasons-note"><span className="handwritten-mark">Y.</span><p>Not grand gestures.<br />Just the details that<br />make you <em>you.</em></p><span className="note-rule" /><span className="note-caption">A VERY INCOMPLETE LIST</span></div>
              <div className="reason-grid">{reasons.map((reason, index) => <button key={reason.title} className={`reason-tile${openReason === index ? ' is-open' : ''}`} onClick={() => setOpenReason(openReason === index ? null : index)} aria-expanded={openReason === index}><span className="reason-index">{String(index + 1).padStart(2, '0')}</span><span className="reason-title">{reason.title}</span><ChevronDown size={14} className="reason-chevron" /><AnimatePresence>{openReason === index && <motion.span className="reason-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{reason.note}</motion.span>}</AnimatePresence></button>)}</div>
            </div>
          </div>
        </section>

        <section className="constellation-section section-pad">
          <div className="page-width constellation-wrap">
            <SectionTitle eyebrow="A MAP OF US" title="Every little moment became a star." description="Some are already named. The rest are waiting for their stories." centered />
            <div className="constellation-map">
              <svg className="constellation-lines" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path d="M90 165 L280 87 L480 183 L680 99 L890 162" /></svg>
              {constellation.map((star, index) => <button key={star.title} className={`constellation-star constellation-star-${index + 1}${openStar === index ? ' is-selected' : ''}`} style={{ left: `${star.x}%`, top: `${star.y}%` }} onClick={() => openConstellationStar(index)} aria-label={`Open memory: ${star.title}`}><span className="star-spark">✦</span><span className="star-label">{star.title}</span></button>)}
              <span className="constellation-dust dust-a" /><span className="constellation-dust dust-b" /><span className="constellation-dust dust-c" />
              <AnimatePresence>{openStar !== null && <motion.aside className="star-popover" style={{ left: `${constellation[openStar].x}%`, top: `${constellation[openStar].y}%` }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><span>{constellation[openStar].date}</span><strong>{constellation[openStar].title}</strong><p>{constellation[openStar].message}</p><button onClick={() => setOpenStar(null)} aria-label="Close memory">×</button></motion.aside>}</AnimatePresence>
            </div>
            <div className="constellation-foot"><span>THE SKY IS STILL GROWING</span><span>✦ &nbsp; 05 STARS SO FAR</span></div>
          </div>
        </section>

        <section className="moments-section section-pad" id="moments">
          <div className="page-width">
            <div className="moments-heading"><SectionTitle eyebrow="CHAPTER 04 · THE REPLAY" title="Moments I Never Want To Forget" description="A real beginning, and room to add the days only we can name." /><div className="carousel-hint"><ArrowLeft size={15} /><span>SCROLL TO WANDER</span><ArrowRight size={15} /></div></div>
            <div className="moments-track">{moments.map((moment, index) => <article className="moment-card" key={moment.title}><LocalArt src={moment.image} label={moment.title} className={`moment-art moment-art-${(index % 4) + 1}`} /><div className="moment-card-copy"><span>{moment.category} · {moment.date}</span><h3>{moment.title}</h3><p>{moment.story}</p>{moment.quote && <blockquote>{moment.quote}</blockquote>}</div><span className="moment-number">0{index + 1}</span></article>)}</div>
          </div>
        </section>

        <LittleThings />

        <section className="chaos-section section-pad">
          <div className="page-width chaos-inner"><div className="chaos-copy"><SectionTitle eyebrow="CHAPTER 05 · OUR LITTLE CHAOS" title="Because we're not always romantic." description="Six very important questions. Absolutely no official answers." /><span className="chaos-doodle" aria-hidden="true">(probably you)</span></div>
            <div className="chaos-list">{chaosQuestions.map((item, index) => <button key={item.question} className={`chaos-row${openChaos === index ? ' is-open' : ''}`} onClick={() => setOpenChaos(openChaos === index ? null : index)} aria-expanded={openChaos === index}><span className="chaos-count">0{index + 1}</span><span className="chaos-question">{item.question}<AnimatePresence>{openChaos === index && <motion.span className="chaos-answer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{item.answer}</motion.span>}</AnimatePresence></span><ArrowUpRight size={16} /></button>)}</div>
          </div>
        </section>

        <section className="soundtrack-section section-pad" id="soundtrack">
          <div className="page-width"><div className="soundtrack-heading"><SectionTitle eyebrow="A SMALL PAUSE · PRESS PLAY WHENEVER" title="Our soundtrack." description="No autoplay. This one only starts when you say so." /></div><MusicPlayer onSecret={() => showSecret(6)} /></div>
        </section>

        <DailyNote />

        <section className="letter-section section-pad" id="letter">
          <div className="page-width letter-layout"><div className="letter-heading"><span className="eyebrow">CHAPTER 06 · FROM ME TO YOU</span><span className="letter-big-mark">“</span><h2>A letter I could never say <em>perfectly.</em></h2><span className="letter-stamp">FOR YUNO<br />WITH LOVE</span></div>
            <div className="letter-body">{letterParagraphs.map((paragraph, index) => <motion.p key={index} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.1 }}>{paragraph}</motion.p>)}<p className="letter-closing">With you, even ordinary days feel like memories worth keeping.</p><span className="letter-signature">— Yours, {siteConfig.signature} <Heart size={13} fill="currentColor" /></span></div>
          </div>
        </section>

        <LetterVault onOpenLast={() => showSecret(7)} />

        <section className="future-section section-pad" id="future">
          <div className="page-width"><SectionTitle eyebrow="CHAPTER 07 · STILL AHEAD" title="Things I still want to experience with you." description="No grand itinerary. Just more life, side by side." />
            <div className="future-roadmap"><span className="future-road-line" /><div className="future-start"><span className="future-dot"><Heart size={12} fill="currentColor" /></span><span>{siteConfig.anniversaryDate}</span><strong>HERE WE ARE</strong></div><div className="future-items">{futureList.map((item, index) => <motion.div className="future-item" key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.04 }}><span className="future-dot"><i /></span><p>{item}</p></motion.div>)}</div><div className="future-end"><span className="future-dot"><Sparkles size={14} /></span><span>TO BE CONTINUED</span><strong>MORE US</strong></div></div>
          </div>
        </section>

        <section className="bucket-section section-pad">
          <div className="page-width bucket-layout"><div><SectionTitle eyebrow="THE LIST WE KEEP ADDING TO" title="Things we have to do together." description="A little list for the days ahead. Add your own; it saves right here." /><form className="bucket-form" onSubmit={addBucketItem}><label className="sr-only" htmlFor="bucket-new">Add a bucket-list idea</label><input id="bucket-new" value={bucketInput} onChange={(event) => setBucketInput(event.target.value)} placeholder="Something we should do..." maxLength={90} /><button className="icon-button" type="submit" aria-label="Add bucket-list idea"><Plus size={19} /></button></form></div>
            <div className="bucket-list" aria-label="Our bucket list">{bucketItems.map((item, index) => <div className={`bucket-item${item.done ? ' is-done' : ''}`} key={`${item.text}-${index}`}><label><input type="checkbox" checked={item.done} onChange={() => setBucketItems((items) => items.map((entry, itemIndex) => itemIndex === index ? { ...entry, done: !entry.done } : entry))} /><span className="custom-checkbox"><Check size={12} /></span><span>{item.text}</span></label><button className="bucket-delete icon-button" onClick={() => setBucketItems((items) => items.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${item.text}`}><Trash2 size={15} /></button></div>)}</div>
          </div>
        </section>

        <section className="polaroid-section section-pad">
          <div className="page-width"><div className="polaroid-heading"><SectionTitle eyebrow="FROM THE MEMORY BOX" title="Pinned up, so it stays close." description="A little wall for the pictures we will add." /><span className="polaroid-scribble">keep these</span></div>
            <div className="polaroid-wall">{scrapbookItems.map((polaroid, index) => { const offset = polaroidOffsets[polaroid.caption] ?? { x: 0, y: 0 }; return <div className={`polaroid polaroid-${index + 1}${draggedCaption === polaroid.caption ? ' is-dragging' : ''}`} key={polaroid.caption} data-caption={polaroid.caption} style={{ '--drag-x': `${offset.x}px`, '--drag-y': `${offset.y}px` } as CSSProperties} role="group" tabIndex={0} aria-label={`Photo note: ${polaroid.caption}`} aria-roledescription="scrapbook photo" aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight" onPointerDown={(event) => startScrapbookDrag(event, polaroid.caption)} onPointerMove={moveScrapbookDrag} onPointerUp={finishScrapbookDrag} onPointerCancel={() => { polaroidDrag.current = null; setDraggedCaption('') }} onKeyDown={(event) => moveScrapbookWithKeyboard(event, polaroid.caption, index)}><LocalArt src={polaroid.image} label={polaroid.caption} className="polaroid-image" /><p>{polaroid.caption}</p><span className="polaroid-pin" />{index === 1 && <Heart className="polaroid-heart" size={18} fill="currentColor" />}</div> })}</div>
          </div>
        </section>

        <MemoryBox />

        <section className="secret-section section-pad" id="surprise">
          <div className="page-width secret-inner"><span className="secret-ornament"><Star size={14} /><i /><Star size={14} /></span><span className="eyebrow">P.S. THERE IS SOMETHING HERE FOR YOU</span><h2>Some dates become part of your story.</h2><p>{hiddenNotes[4].message}</p>
            <div className="secret-unlocked"><UnlockKeyhole size={18} /><span>YOU FOUND YOUR WAY IN</span><span className="confetti confetti-a" /><span className="confetti confetti-b" /><span className="confetti confetti-c" /></div>
            <span className="secret-footnote">{siteConfig.relationshipDate} · and still becoming</span>
          </div>
        </section>

        <section className="final-section">
          <div className="final-grain" aria-hidden="true" /><span className="final-kicker">AND FINALLY</span><p className="final-line">If I had to choose my favorite memory...</p><p className="final-line final-emphasis">...I'd probably choose all the ones that have you in them.</p><span className="final-spark">✦</span><h2>Happy us, <em>{siteConfig.girlfriendName}.</em></h2><p className="final-last">Here's to everything we've already lived...<br />and everything we haven't lived yet.</p><button className="button button-primary" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIntro(false) }}>Start our story again <Heart size={15} /></button>
        </section>

        <CinematicEnding />
      </main>
      <footer className="site-footer" inert={intro} aria-hidden={intro}><div className="footer-top"><span className="footer-brand">YUNO <i>&</i> ME</span><span>Made with love, memories, and probably too much code.</span><button className="footer-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUpRight size={17} /></button></div><div className="footer-bottom"><span>{siteConfig.girlfriendName} × {siteConfig.yourName}</span><span>{siteConfig.anniversaryDate} <i>→</i> ∞</span></div></footer>
      <AnimatePresence>{notice && <motion.div className="keyboard-notice" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><Heart size={14} fill="currentColor" />{notice}</motion.div>}</AnimatePresence>
    </div>
  )
}

export default App

function RelationshipStats() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const updateDays = () => {
      const started = new Date(siteConfig.relationshipDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      setDays(Math.floor((today.getTime() - started.getTime()) / 86_400_000))
    }
    updateDays()
    const timer = window.setInterval(updateDays, 60_000)
    return () => window.clearInterval(timer)
  }, [])
  const stats = [
    { value: days?.toLocaleString() ?? '...', label: `DAYS SINCE ${siteConfig.relationshipDate.toUpperCase()}` },
    { value: String(letters.length).padStart(2, '0'), label: 'LETTERS READY WHEN NEEDED' },
    { value: String(notes.length).padStart(2, '0'), label: 'LITTLE NOTES TO FIND' },
    { value: String(futureList.length).padStart(2, '0'), label: 'DREAMS ON OUR LIST' },
  ]
  return <section className="relationship-stats section-pad" aria-label="Our relationship, in little numbers"><div className="page-width stats-grid"><div className="stat-intro"><span className="eyebrow">A FEW THINGS WE ARE KEEPING</span><h2>Not a score.<br /><em>Just a little time, together.</em></h2></div>{stats.map((stat) => <div className="stat-counter" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>
}
