import React, {useEffect, useState} from 'react'
import {fetchData} from '../services/ApiService'
import Image from './Image'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const options = {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
    }
  }

  useEffect(() => {
    fetchData('https://api.unsplash.com/photos/random?count=20', options)
      .then(data => {
        setPhotos(data)
        setLoading(false)
        console.log(data)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className='mt-10 px-[16px] md:px-[50px] py-4'>
          <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry gutter='16px'>
                    {photos.map(photo => (
                        <Image key={photo.id} photo={photo} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
      )}
    </div>
  )
}

export default Gallery