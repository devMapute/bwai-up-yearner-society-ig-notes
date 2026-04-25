import { useState } from 'react'
import { musicData, type Song } from './data/music'
import { getYearningRecommendation, type AISong } from './services/ai'
import { Heart, Music, Copy, Sparkles, RefreshCw, Search, Loader2 } from 'lucide-react'
import './styles/theme.css'
import './App.css'

function App() {
  const [mood, setMood] = useState('')
  const [matchedSong, setMatchedSong] = useState<Song | null>(null)
  const [aiSong, setAiSong] = useState<AISong | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNoteCopied, setIsNoteCopied] = useState(false)

  const findSong = async () => {
    if (!mood.trim()) return
    setIsLoading(true)
    setMatchedSong(null)
    setAiSong(null)

    try {
      // First, check local library for a perfect tag match (fast)
      const lowerMood = mood.toLowerCase()
      const localMatch = musicData.find(song => 
        song.moodTags.some(tag => lowerMood.includes(tag))
      )

      if (localMatch && Math.random() > 0.4) { // 60% chance to use local if it matches perfectly
        setMatchedSong(localMatch)
      } else {
        // Otherwise, ask the AI for a deeper recommendation
        const recommendation = await getYearningRecommendation(mood)
        setAiSong(recommendation)
      }
    } catch (error) {
      console.error("Discovery failed:", error)
      // Fallback to random local song
      const randomSong = musicData[Math.floor(Math.random() * musicData.length)]
      setMatchedSong(randomSong)
    } finally {
      setIsLoading(false)
      setIsNoteCopied(false)
    }
  }

  const copyNote = () => {
    const textToCopy = matchedSong?.noteSnippet || aiSong?.note
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setIsNoteCopied(true)
      setTimeout(() => setIsNoteCopied(false), 2000)
    }
  }

  const reset = () => {
    setMatchedSong(null)
    setAiSong(null)
    setMood('')
  }

  return (
    <div className="app-wrapper">
      <div className="grain" aria-hidden="true" />

      <div className="app-container">
        <header className="header">
          <div className="logo">
            <Heart className="logo-icon" fill="currentColor" />
            <span className="logo-label">UP Yearning Society</span>
          </div>
          <h1 className="header-title">
            What are you<br /><em>yearning</em> for?
          </h1>
          <p className="subtitle">IG Notes Generator powered by the Yearning Agent</p>
        </header>

        <main>
          {!matchedSong && !aiSong ? (
            <div className="prompt-section card">
              <p className="prompt-heading">Describe your mood and our AI Agent will explore the domain of music for you.</p>
              <div className="input-group">
                <textarea
                  placeholder="e.g. 'the feeling of walking along Academic Oval at sunset', 'a love that never was'..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && !isLoading && findSong()}
                  disabled={isLoading}
                />
                <button className="primary-button" onClick={findSong} disabled={isLoading || !mood.trim()}>
                  {isLoading ? (
                    <>Consulting... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <><Sparkles size={16} /> Discover Your Song</>
                  )}
                </button>
              </div>
              <p className="hint">The Agent searches beyond our curated library.</p>
            </div>
          ) : (
            <div className="result-section animate-fade-in">
              {aiSong && (
                <div className="ai-insight card">
                  <div className="ai-insight-header">
                    <Sparkles size={16} className="ai-icon" />
                    <span>Yearning Agent's Insight</span>
                  </div>
                  <p>"{aiSong.yearningInsight}"</p>
                </div>
              )}

              <div className="song-display card">
                <div className="song-header">
                  <div className="song-icon-wrap">
                    <Music className="music-icon" size={20} />
                  </div>
                  <div className="song-meta">
                    <h3>{matchedSong?.title || aiSong?.title}</h3>
                    <p>{matchedSong?.artist || aiSong?.artist}</p>
                  </div>
                </div>

                <div className="spotify-container">
                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(matchedSong?.spotifySearchQuery || aiSong?.spotifySearchQuery || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-search-link"
                  >
                    <Search size={16} />
                    Listen on Spotify
                  </a>
                </div>

                <div className="lyrics-snippet">
                  "{matchedSong?.lyrics || aiSong?.lyrics}"
                </div>
              </div>

              <div className="note-section card">
                <p className="note-section-title">Your IG Note</p>

                <div className="note-bubble-wrap">
                  <div className="note-bubble">
                    <div className="avatar-placeholder" />
                    <div className="bubble-content">{matchedSong?.noteSnippet || aiSong?.note}</div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className={`copy-button${isNoteCopied ? ' copied' : ''}`} onClick={copyNote}>
                    <Copy size={15} />
                    {isNoteCopied ? 'Copied!' : 'Copy to Note'}
                  </button>
                  <button className="secondary-button" onClick={reset}>
                    <RefreshCw size={15} />
                    New Mood
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          © 2024 UP Yearning Society · AI-Powered Discovery · Padayon!
        </footer>
      </div>
    </div>
  )
}

export default App
