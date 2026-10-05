import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { ArrowDown, ArrowUpRight, Heart, LockKeyhole, Menu, X } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Our story', id: 'story' },
  { label: 'Memories', id: 'memories' },
  { label: 'Little things', id: 'reasons' },
  { label: 'Future', id: 'future' },
  { label: 'Letters', id: 'letter-vault' },
  { label: 'Notes', id: 'little-notes' },
  { label: 'Surprise', id: 'surprise' },
]

export function ScrollProgress() {
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="scroll-progress" aria-hidden="true" />
}

export function CursorGlow() {
  useEffect(() => {
    const update = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => window.removeEventListener('pointermove', update)
  }, [])
  return <div className="cursor-glow" aria-hidden="true" />
}

export function SiteNav({ onLogoClick, onLogoHold }: { onLogoClick?: () => void; onLogoHold?: () => void }) {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const holdTimer = useRef<number | null>(null)
  const logoWasHeld = useRef(false)

  function startLogoHold() {
    logoWasHeld.current = false
    holdTimer.current = window.setTimeout(() => {
      logoWasHeld.current = true
      onLogoHold?.()
      holdTimer.current = null
    }, 750)
  }

  function cancelLogoHold() {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current)
    holdTimer.current = null
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.2, 0.5] })
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  function navigate(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label={`${siteConfig.websiteTitle} home`} onPointerDown={startLogoHold} onPointerUp={cancelLogoHold} onPointerLeave={cancelLogoHold} onContextMenu={(event) => event.preventDefault()} onClick={(event) => { event.preventDefault(); if (logoWasHeld.current) { logoWasHeld.current = false; return }; onLogoClick?.(); navigate('home') }}>
        <span className="wordmark-mark"><Heart size={13} fill="currentColor" /></span>
        <span>YUNO <i>&</i> ME</span>
      </a>
      <button className="mobile-menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {navItems.map((item) => <button key={item.id} className={active === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>)}
      </nav>
      <button className="nav-note" onClick={() => navigate('little-notes')}>A little note <ArrowUpRight size={14} /></button>
    </header>
  )
}

type IntroProps = { onEnter: () => void }

export function Intro({ onEnter }: IntroProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [unlocking, setUnlocking] = useState(false)
  const codeInput = useRef<HTMLInputElement>(null)

  useEffect(() => codeInput.current?.focus(), [])

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const beginning = new Date(siteConfig.relationshipDate)
    const expectedCode = `${String(beginning.getDate()).padStart(2, '0')}${String(beginning.getMonth() + 1).padStart(2, '0')}${beginning.getFullYear()}`
    if (code !== expectedCode) {
      setError('Not quite. Think of the day our story began.')
      return
    }
    setError('')
    setUnlocking(true)
    window.setTimeout(onEnter, 650)
  }

  return (
    <section className={`intro-screen${unlocking ? ' is-unlocking' : ''}`} role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="intro-stars" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--star-index': index } as CSSProperties} />)}</div>
      <span className="intro-orbit intro-orbit-one" aria-hidden="true" />
      <span className="intro-orbit intro-orbit-two" aria-hidden="true" />
      <p className="intro-kicker">A PRIVATE LITTLE UNIVERSE</p>
      <div className="intro-copy" id="intro-title">
        <p>Some stories are written<span className="intro-period">.</span></p>
        <p className="intro-line-two">Some are lived<span className="intro-period">.</span></p>
        <p className="intro-line-three">And then there is ours.</p>
      </div>
      <div className="intro-bottom">
        <p>Welcome to our little universe, <em>{siteConfig.girlfriendName}</em></p>
        <form className="intro-gate-form" onSubmit={unlock}>
          <div className="intro-code-field"><LockKeyhole size={16} /><label className="sr-only" htmlFor="intro-code">Enter the date our story began</label><input ref={codeInput} id="intro-code" type="password" inputMode="numeric" autoComplete="off" maxLength={8} value={code} onChange={(event) => { setCode(event.target.value.replace(/\D/g, '')); setError('') }} placeholder="· · · · · · · ·" disabled={unlocking} aria-describedby={error ? 'intro-code-error' : undefined} /></div>
          <button className="button button-primary" type="submit" disabled={unlocking}>{unlocking ? 'Opening our story...' : 'Enter our story'} <ArrowDown size={16} /></button>
          {error && <span className="intro-gate-error" id="intro-code-error" role="alert">{error}</span>}
        </form>
      </div>
      <span className="intro-coordinate">{siteConfig.anniversaryDate} &nbsp;·&nbsp; ALWAYS</span>
    </section>
  )
}