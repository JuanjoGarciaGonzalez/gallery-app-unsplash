import React, {useEffect, useState} from 'react'
import {fetchData} from '../services/ApiService'
import Image from './Image'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Gallery = ({photos, setPhotos, loading, setLoading, setTerm, term, setCurrentPage, currentPage, topic}) => {

  const options = {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
    }
  }

  useEffect(() => {
    fetchData('https://api.unsplash.com/photos/random?count=20&page=${currentPage}', options)
      .then(data => {
        setPhotos(data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  const fetchMoreData = () => {
    setLoading(true)
    setCurrentPage(currentPage + 1)
    let url = ''
    if(term === '' && topic === '') {
      url = `https://api.unsplash.com/photos/random?count=20&page=${currentPage + 1}`
    }else if(topic !== '') {
      url = `https://api.unsplash.com/topics/${topic}/photos?per_page=20&page=${currentPage + 1}`
    }else {
      url = `https://api.unsplash.com/search/photos?query=${term}&per_page=20&page=${currentPage + 1}`
    }
    fetchData(url, options)
      .then(data => {
        if(term === '' || topic !== '') {
          setPhotos([...photos, ...data])
        }else {
          setPhotos([...photos, ...data.results])
        }
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  };

  return (
    <div>
      {photos.length > 0 ?
        <div className='mt-10 px-[16px] md:px-[50px] py-4'>
          <ResponsiveMasonry
                columnsCountBreakPoints={{750: 1, 1000: 3, 1500: 4}}
            >
                <Masonry gutter='16px'>
                    {photos.map(photo => (
                        <Image key={photo.id} photo={photo} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div> : <div className='mt-10 px-[16px] md:px-[50px] py-4 text-center bree-serif-regular'>No photos found, please search another term.</div>
      }
      {loading && <div className="loader"></div>}
      {photos.length > 0 && !loading &&  
          <div className='paginate h-[100px] flex justify-center items-center'>
            <button onClick={() => fetchMoreData()} className='text-center border-solid border-[1px] border-[rgb(64 64 64)] bree-serif-regular rounded-3xl bg-white hover:bg-[#e5e5e5] transition-all outline-none py-1 px-3 w-[150px] cursor-pointer text-[#404040cc]'>Load More</button>
          </div>
      }
    </div>
  )
}

export default Gallery