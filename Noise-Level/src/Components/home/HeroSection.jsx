
import { useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import backgroundMusic from '../../assets/sound/water.mp3'


export default function HeroSection() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set background music volume
    audio.volume = 0.5
    audio.loop = true

    // Attempt automatic playback
    const playMusic = async () => {
      if (!audio.paused) return

      try {
        await audio.play()
      } catch (error) {
        if (error.name !== 'NotAllowedError') {
          console.error('Audio error:', error)
        }
      }
    }

    playMusic()

    // If autoplay is blocked, start after interaction
    const handleInteraction = () => {
      playMusic()
    }

    document.addEventListener('pointerdown', handleInteraction)
    document.addEventListener('keydown', handleInteraction)

    return () => {
      document.removeEventListener('pointerdown', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      audio.pause()
    }
  }, [])

  return (
    <section id="home" className="bg-light py-5">
      <Container className="text-center py-5">

        <h1 className="display-4">
          Welcome to Noise Level
        </h1>

        <p className="lead mt-3">
          Dive into a new underwater adventure.
        </p>

        <Button variant="primary" href="#story">
          Explore Our Game
        </Button>

        
<audio
  ref={audioRef}
  src={backgroundMusic}
  autoPlay
  loop
  preload="auto"
  onError={() =>
    console.error('Background audio failed to load')
  }
/>


      </Container>
    </section>
  )
}
