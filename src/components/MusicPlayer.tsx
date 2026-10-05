import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'

export function MusicPlayer({ onSecret }: { onSecret?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const [volume, setVolume] = useState(0.72)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/audio/yuno1.mpeg', { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const type = response.headers.get('content-type') ?? ''
        if (!response.ok || (!type.startsWith('audio/') && type !== 'video/mpeg')) setUnavailable(true)
      })
      .catch(() => { if (!controller.signal.aborted) setUnavailable(true) })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setUnavailable(true)
      setPlaying(false)
    }
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} src="/audio/yuno1.mpeg" preload="none" onCanPlay={() => setUnavailable(false)} onError={() => setUnavailable(true)} onEnded={() => setPlaying(false)} />
      <div className="record-art"><button className="record-label" onClick={onSecret} aria-label="A small note on the record"><span>Y + D</span></button><span className={`record-groove${playing ? ' is-playing' : ''}`} /></div>
      <div className="music-info"><span className="eyebrow">A SONG FOR US</span><h3>{unavailable ? 'Our song is ready' : 'Our soundtrack'}</h3><p>{unavailable ? 'Could not load /public/audio/yuno1.mpeg' : 'A little music, whenever you want it.'}</p>
        <div className="sound-wave" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ '--bar': `${9 + ((index * 17) % 19)}px` } as CSSProperties} />)}</div>
      </div>
      <div className="music-controls"><button className="play-control" onClick={toggle} aria-label={playing ? 'Pause song' : 'Play song'} disabled={unavailable}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><label className="volume-control" aria-label="Volume"><Volume2 size={16} /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => { const next = Number(event.target.value); setVolume(next); if (audioRef.current) audioRef.current.volume = next }} /></label></div>
    </div>
  )
}