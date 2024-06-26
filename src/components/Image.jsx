import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Image = ({photo}) => {
  const lightbox = useRef(null)
  const lightboxBg = useRef(null)
  const infoLightbox = useRef(null)
  const [relatedPhotos, setRelatedPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [mainPhoto, setMainPhoto] = useState(photo)
  const [downloading, setDownloading] = useState(false)

  const openLightbox = () => {
    lightbox.current.classList.toggle('active')

    if (lightbox.current.classList.contains('active')) {
      fetchRelatedPhotos()
    }
  }

  const changeLightbox = (photo) => {
    setMainPhoto(photo)
    console.log(photo)
    fetchRelatedPhotos()
  }

  const handleBackgroundClick = (e) => {
    if (e.target === lightboxBg.current || e.target === infoLightbox.current) {
      openLightbox()
    }
  }

  const fetchRelatedPhotos = () => {
    setLoading(true)
    //fetch related photos
    fetch(`https://api.unsplash.com/photos/${mainPhoto.id}/related?per_page=4`, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setRelatedPhotos(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }

  const handleDownload = (photo) => {
    setDownloading(true)
    fetch(photo.links.download_location, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        //download photo
        fetch(data.url)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = photo.alt_description
            a.click()
            window.URL.revokeObjectURL(url)
            setDownloading(false)
          })
      }
      )
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='relative group'>
      <img src={mainPhoto.urls.regular} alt={mainPhoto.alt_description} className='cursor-pointer' onClick={openLightbox}/>
      <div className='px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='p-3 flex justify-center items-center gap-3'>
          <img src={mainPhoto.user.profile_image.small} alt={mainPhoto.alt_description} className='w-10 h-10 rounded-[50%] inline-block' loading='lazy'/>
          <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{mainPhoto.user.first_name} {mainPhoto.user.last_name}</span>
        </div>

        <div className='px-3 flex justify-center items-center'>
          <button className={`download-button ${downloading && 'downloading'}`} onClick={() => handleDownload(mainPhoto)}>
            {downloading ? <div className="loader-download"></div> : ''}
          </button>
        </div>
      </div>

      <div className='lightbox' ref={lightbox}>
        <div className='relative h-full w-full'>
          <button onClick={openLightbox} className='close-button'></button>
          <div className='image-container' onClick={handleBackgroundClick} ref={lightboxBg}>
            <img src={mainPhoto.urls.regular} alt={mainPhoto.alt_description} className='image' loading='lazy'/>
            <div className='py-[20px] px-[10%] '>
              <p className='text-[hsla(0,0%,100%,.79)] text-lg bree-serif-regular text-center'>{mainPhoto.description}</p>
            </div>

            <div className='related-photos px-[10%] pb-10'>
              <div className='separator mx-auto my-10'></div>
                {loading ? <div className="loader"></div> : <ResponsiveMasonry
                    columnsCountBreakPoints={{0: 1, 500: 2, 1000: 3, 1500: 4}}
                >
                    <Masonry gutter='16px'>
                    {relatedPhotos?.map(photo => (
                      <div className='relative related-photo' key={photo.id} onClick={() => changeLightbox(photo)}>
                        <img src={photo.urls.small} alt={photo.alt_description} className='w-100 h-100 cursor-pointer' loading='lazy'/>
                        <div className='related-info px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-0 transition-opacity duration-300'>
                          <div className='p-3 flex justify-center items-center gap-3'>
                            <img src={photo.user.profile_image.small} alt={photo.alt_description} className='w-10 h-10 rounded-[50%] inline-block'/>
                            <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{photo.user.first_name} {photo.user.last_name}</span>
                          </div>

                          <div className='px-3 flex justify-center items-center'>
                            <button className={`download-button ${downloading && 'downloading'}`} onClick={() => handleDownload(photo)}>
                              {downloading ? <div className="loader-download"></div> : ''}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </Masonry>
                </ResponsiveMasonry> }
            </div>
          </div>

          <div className='absolute ml-[10%] md:ml-0 md:right-[50px] top-2 md:top-[10%] w-[10%] inline-flex flex-row md:flex-col justify-start items-center md:items-end gap-2 md:min-w-[15%] md:min-h-[50%]' onClick={handleBackgroundClick} ref={infoLightbox}>
            <a className='md:px-3 py-3 inline md:flex gap-2 flex-col items-end justify-end' href={mainPhoto.user.links.html} target='_blank'>
              <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular hidden md:inline text-balance text-right'>Image upload on Unsplash by @{mainPhoto.user.username}</span>
              <img src={mainPhoto.user.profile_image.small} alt={mainPhoto.alt_description} className='w-[42px] h-[42px] rounded-[50%] inline-block profile-photo'/>
            </a>

            <div className='px-3'>
              <button className={`download-button ${downloading && 'downloading'}`} onClick={() => handleDownload(mainPhoto)}>
                {downloading ? <div className="loader-download"></div> : ''}
              </button>
            </div>

            {mainPhoto.views && <div className='px-3 flex justify-end items-center gap-1'>
              <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{mainPhoto.views}</span> <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>Views</span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Image