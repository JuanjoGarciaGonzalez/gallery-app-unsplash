import React, { useEffect, useState } from 'react'
import { fetchData } from '../services/ApiService'
import Logo from '../svg/Logo'

const Header = () => {
    const [photo, setPhoto] = useState([])
    const [loading, setLoading] = useState(true)
    const options = {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
        }
      }

    useEffect(() => {
        fetchData('https://api.unsplash.com/photos/random', options)
          .then(data => {
            setPhoto(data)
            setLoading(false)
            console.log(data)
          })
          .catch(error => {
            setLoading(false)
            console.error(error)
          })
      }, [])
  return (
    <>
    {!loading && (<header style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),url(${photo?.urls.full})` }} className='header h-[50dvh] px-[16px] md:px-[50px] py-4 relative'>
      <nav className='rounded-[100px] p-[7px] bg-[rgba(0,0,0,.4)] backdrop-blur mx-auto w-[300px] flex justify-center items-center'>
        <div className='w-[50%] flex justify-center items-center backdrop-blur rounded-[100px] h-full p-[10px] cursor-pointer'>
            <span className='text-white text-sm bree-serif-regular'>Images</span>
        </div>

        <div className='w-[50%] flex justify-center items-center rounded-[100px] h-full p-[10px] cursor-pointer'>
            <span className='text-white text-sm bree-serif-regular'>Videos</span>
        </div>
      </nav>

        <div className='mt-[100px] flex flex-col items-center gap-3'>
            <div className='flex items-center justify-center gap-3'><Logo /> <span className='text-white text-2xl bree-serif-regular'>Unsplash</span></div>
            <p className='text-center mb-1 mt-1 text-[hsla(0,0%,100%,.79)] text-xl bree-serif-regular'>The source of images of the internet. With resources from creators around the world</p>
            <input type='text' placeholder='Search for high resolution images' className='rounded-[8px] py-[.8rem] px-[3rem] w-[85%] md:w-[50%] mt-[20px] bree-serif-regular search-input relative' />
        </div>

        <a className='absolute bottom-4 right-4 backdrop-blur bg-[rgba(38,38,38,.4)] rounded-[8px] flex items-center justify-center gap-2 text-white text-xs bree-serif-regular p-3' href={photo?.user.links.html} target='_blank'>
          <span>Image by</span> <img src={photo?.user.profile_image.small} alt={photo?.alt_description} className='w-[20px] h-[20px] rounded-[50%]'/> <span>{photo?.user.first_name} {photo?.user.last_name}</span>
        </a>
    </header>
    )}
    </>
)}

export default Header