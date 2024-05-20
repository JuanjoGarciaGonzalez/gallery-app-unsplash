import React from 'react'

const Image = ({photo}) => {

  const openLightbox = () => {
    const lightbox = document.createElement('div')
    lightbox.classList.add('lightbox')
    document.body.appendChild(lightbox)

    const img = document.createElement('img')
    img.src = photo.urls.regular
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)

    img.addEventListener('click', e => {
      if (e.target !== e.currentTarget) return
      lightbox.classList.remove('active')
    })

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active')
    })

    setTimeout(() => {
      lightbox.classList.add('active')
    }, 1)
  }

  return (
    <div className='relative group' onClick={openLightbox}>
      <img src={photo.urls.regular} alt={photo.alt_description} className='cursor-pointer'/>
      <div className='px-1 absolute bottom-0 w-full h-15 flex justify-between align-middle bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7))] opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='p-3 flex justify-center items-center gap-3'>
          <img src={photo.user.profile_image.small} alt={photo.alt_description} className='w-10 h-10 rounded-[50%] inline-block'/>
          <span className='text-[hsla(0,0%,100%,.79)] text-sm bree-serif-regular'>{photo.user.first_name} {photo.user.last_name}</span>
        </div>

        <div className='px-3 flex justify-center items-center'>
          <a href={photo.links.download} target='_blank' className='download-button'></a>
        </div>
      </div>
    </div>
  )
}

export default Image