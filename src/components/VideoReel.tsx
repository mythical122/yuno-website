import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import { personalVideos } from '../data/videos'
import { SectionTitle } from './SectionTitle'

export function VideoReel() {
  return (
    <section className="video-reel-section section-pad" id="video-reel">
      <div className="page-width">
        <div className="video-reel-heading"><Film size={18} /><SectionTitle eyebrow="LITTLE MOVING MEMORIES" title="A Few Seconds, Kept Forever" description="Your clips are here when you want to revisit them. Each one plays only when you press play." /></div>
        <div className="video-reel-grid">
          {personalVideos.map((video, index) => <motion.article className="video-reel-item" key={video.src} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4, delay: index % 3 * 0.05 }}>
            <video controls preload="metadata" playsInline poster={video.poster} aria-label={`${video.title}, personal memory clip`}>
              <source src={video.src} type="video/mp4" />
              Your browser cannot play this video.
            </video>
            <div className="video-reel-caption"><span>{String(index + 1).padStart(2, '0')} / {String(personalVideos.length).padStart(2, '0')}</span><h3>{video.title}</h3></div>
          </motion.article>)}
        </div>
      </div>
    </section>
  )
}