import React from 'react'
import { useRef } from 'react'

const Image = ({photo}) => {
  const lightbox = useRef(null)

  const openLightbox = () => {
    console.log(lightbox.current)
    lightbox.current.classList.toggle('active')
  }

  return (
    <div className='relative group'>
      <img src={photo.urls.regular} alt={photo.alt_description} className='cursor-pointer' onClick={openLightbox}/>
      <div className='px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='p-3 flex justify-center items-center gap-3'>
          <img src={photo.user.profile_image.small} alt={photo.alt_description} className='w-10 h-10 rounded-[50%] inline-block'/>
          <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{photo.user.first_name} {photo.user.last_name}</span>
        </div>

        <div className='px-3 flex justify-center items-center'>
          <a href={photo.links.download} download className='download-button'></a>
        </div>
      </div>

      <div className='lightbox' ref={lightbox}>
        <div className='relative h-full w-full'>
          <button onClick={openLightbox} className='close-button'></button>
          <div className='image-container'>
            <img src={photo.urls.regular} alt={photo.alt_description} className='image'/>
            <div className='py-[20px]'>
              <p className='text-[hsla(0,0%,100%,.79)] text-lg bree-serif-regular text-center'>{photo.description}</p>
            </div>
          </div>

          <div className='absolute right-[50px] top-[10%] flex flex-col justify-start items-end gap-2 min-w-[15%] min-h-[50%]'>
            <a className='p-3 flex justify-center items-center gap-3' href={photo.user.links.html} target='_blank'>
              <img src={photo.user.profile_image.small} alt={photo.alt_description} className='w-[42px] h-[42px] rounded-[50%] inline-block'/>
            </a>

            <div className='px-3'>
              <a href={photo.links.download} download className='download-button inline-block'></a>
            </div>

            {photo.views && <div className='px-3 flex justify-end items-center gap-1'>
              <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{photo.views}</span> <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>Views</span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Image