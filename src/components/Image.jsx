import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Image = ({photo}) => {
  const lightbox = useRef(null)
  const [relatedPhotos, setRelatedPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [mainPhoto, setMainPhoto] = useState(photo)

  const openLightbox = () => {
    lightbox.current.classList.toggle('active')

    if (lightbox.current.classList.contains('active')) {
      fetchRelatedPhotos()
    }
  }

  const changeLightbox = (photo) => {
    setMainPhoto(photo)
    fetchRelatedPhotos()
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
        console.log(data)
        setRelatedPhotos(data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <div className='relative group'>
      <img src={mainPhoto.urls.regular} alt={mainPhoto.alt_description} className='cursor-pointer' onClick={openLightbox}/>
      <div className='px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='p-3 flex justify-center items-center gap-3'>
          <img src={mainPhoto.user.profile_image.small} alt={mainPhoto.alt_description} className='w-10 h-10 rounded-[50%] inline-block'/>
          <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{mainPhoto.user.first_name} {mainPhoto.user.last_name}</span>
        </div>

        <div className='px-3 flex justify-center items-center'>
          <a href={mainPhoto.links.download} target='_blank' className='download-button'></a>
        </div>
      </div>

      <div className='lightbox' ref={lightbox}>
        <div className='relative h-full w-full'>
          <button onClick={openLightbox} className='close-button'></button>
          <div className='image-container'>
            <img src={mainPhoto.urls.regular} alt={mainPhoto.alt_description} className='image'/>
            <div className='py-[20px] px-[10%] '>
              <p className='text-[hsla(0,0%,100%,.79)] text-lg bree-serif-regular text-center'>{mainPhoto.description}</p>
            </div>

            <div className='related-photos px-[10%] pb-10'>
              <div className='separator mx-auto my-10'></div>
                {loading ? <div className="loader"></div> : <ResponsiveMasonry
                    columnsCountBreakPoints={{750: 1, 1000: 3, 1500: 4}}
                >
                    <Masonry gutter='16px'>
                    {relatedPhotos?.map(photo => (
                      <div className='relative group' key={photo.id} onClick={() => changeLightbox(photo)}>
                        <img src={photo.urls.small} alt={photo.alt_description} className='w-100 h-100 rounded-[8px] cursor-pointer'/>
                        <div className='px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-100 transition-opacity duration-300'>
                          <div className='p-3 flex justify-center items-center gap-3'>
                            <img src={photo.user.profile_image.small} alt={photo.alt_description} className='w-10 h-10 rounded-[50%] inline-block'/>
                            <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{photo.user.first_name} {photo.user.last_name}</span>
                          </div>

                          <div className='px-3 flex justify-center items-center'>
                            <a href={photo.links.download} target='_blank' className='download-button'></a>
                          </div>
                        </div>
                      </div>
                    ))}
                    </Masonry>
                </ResponsiveMasonry> }
            </div>
          </div>

          <div className='absolute left-2 md:right-[50px] top-2 md:top-[10%] flex flex-row md:flex-col justify-start items-center md:items-end gap-2 md:min-w-[15%] md:min-h-[50%]'>
            <a className='p-3 flex justify-center items-center gap-3' href={mainPhoto.user.links.html} target='_blank'>
              <img src={mainPhoto.user.profile_image.small} alt={mainPhoto.alt_description} className='w-[42px] h-[42px] rounded-[50%] inline-block'/>
            </a>

            <div className='px-3'>
              <a href={mainPhoto.links.download} download className='download-button inline-block' target='_blank'></a>
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