import React, {useEffect, useState} from 'react'
import {fetchData} from '../services/ApiService'
import Image from './Image'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Gallery = ({photos, setPhotos, loading, setLoading}) => {

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
  }, [setPhotos])

  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : ( photos.length > 0 ?
        <div className='mt-10 px-[16px] md:px-[50px] py-4'>
          <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 1000: 3, 1500: 4}}
            >
                <Masonry gutter='16px'>
                    {photos.map(photo => (
                        <Image key={photo.id} photo={photo} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div> : <div className='mt-10 px-[16px] md:px-[50px] py-4 text-center'>No photos found, please search another term.</div>
      )}
    </div>
  )
}

export default Gallery