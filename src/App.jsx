import './App.css'
import Gallery from './components/Gallery'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Header setPhotos={setPhotos} setLoading={setLoading}/>
      <Gallery photos={photos} setPhotos={setPhotos} loading={loading} setLoading={setLoading}/>
    </>
  )
}

export default App