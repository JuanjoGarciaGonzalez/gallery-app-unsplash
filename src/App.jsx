import './App.css'
import Gallery from './components/Gallery'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [topic, setTopic] = useState('')

  return (
    <>
      <Header setPhotos={setPhotos} setLoading={setLoading} setTerm={setTerm} term={term} setCurrentPage={setCurrentPage} setTopic={setTopic}/>
      <Gallery photos={photos} setPhotos={setPhotos} loading={loading} setLoading={setLoading} setTerm={setTerm} term={term} setCurrentPage={setCurrentPage} currentPage={currentPage} topic={topic}/>
    </>
  )
}

export default App