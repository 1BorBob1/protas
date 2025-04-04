import { useState, useEffect, useRef } from 'react'
import './App.css'
import MainContent from './components/MainContent'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.5
      if (!isMuted && hasInteracted) {
        audioRef.current.play().catch(error => {
          console.error('Ошибка воспроизведения:', error)
        })
      }
    }
  }, [isMuted, hasInteracted])

  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setIsMuted(false)
    }
  }

  return (
    <div className="app" onClick={handleFirstInteraction}>
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
        onError={(e) => console.error('Ошибка загрузки аудио:', e)}
      >
        <source src="/song.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио элемент.
      </audio>
      
      <button 
        className="sound-toggle" 
        onClick={(e) => {
          e.stopPropagation()
          setIsMuted(!isMuted)
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <div className="stars-background"></div>
      <div className="site-image">
        <img src="/src/assets/img/site.png" alt="Протас Арена" />
      </div>
      
      <div className={`logo-container ${scrollPosition > 0 ? 'hidden' : ''}`}>
        <img src="/public/logo.png" alt="Протас Арена" />
      </div>
      <div className={`scroll-hint ${scrollPosition > 0 ? 'hidden' : ''}`}>
        Листай вниз
      </div>

      <MainContent />
    </div>
  )
}

export default App
