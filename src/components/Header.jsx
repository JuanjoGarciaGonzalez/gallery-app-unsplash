import React, { useEffect, useState, useRef } from 'react'
import { fetchData } from '../services/ApiService'
import Logo from '../svg/Logo'

const Header = ({setPhotos, setLoading, setTerm, term, setCurrentPage, setTopic}) => {
    const [photo, setPhoto] = useState([])
    const [topics, setTopics] = useState([])
    const [loadingHeader, setLoadingHeader] = useState(true)
    const searchInput = useRef(null)

    const options = {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`
        }
      }

    useEffect(() => {
        fetchData('https://api.unsplash.com/photos/random', options)
          .then(data => {
            setPhoto(data)
            setLoadingHeader(false)
            console.log(data)
          })
          .catch(error => {
            setLoadingHeader(false)
            console.error(error)
          })

        fetchData('https://api.unsplash.com/topics?per_page=50', options)
          .then(data => {
            data.sort((a, b) => a.title.localeCompare(b.title))
            setTopics(data)
            setLoading(false)
            console.log(data)
          })
          .catch(error => {
            console.error(error)
            setLoading(false)
          })
      }, [])

    const handleSearch = (e) => {
      e.preventDefault()
      setLoading(true)
      const inputValue = searchInput.current.value
      setTerm(inputValue)
      setCurrentPage(1)
      setTopic('')
      fetchData(`https://api.unsplash.com/search/photos?query=${inputValue}&per_page=20`, options)
        .then(data => {
          console.log(data)
          setPhotos(data.results)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    }

    const handleTopic = (e) => {
      searchInput.current.value = ''
      setLoading(true)
      const topicId = e.target.value
      setTopic(topicId)
      fetchData(`https://api.unsplash.com/topics/${topicId}/photos?per_page=20`, options)
        .then(data => {
          console.log(data)
          setPhotos(data)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    }
  return (
    <>
    {!loadingHeader && (<header style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),url(${photo?.urls.full})` }} className='header h-[50dvh] px-[16px] md:px-[50px] py-4 relative'>
      <nav className='rounded-[100px] p-[7px] bg-[rgba(0,0,0,.4)] backdrop-blur mx-auto w-[150px] flex justify-center items-center'>
        <div className='w-[100%] flex justify-center items-center backdrop-blur rounded-[100px] h-full p-[10px] cursor-pointer'>
            <span className='text-[hsla(0,0%,100%,1)] text-sm bree-serif-regular'>Images</span>
        </div>
      </nav>

        <div className='mt-[100px] flex flex-col items-center gap-3'>
            <div className='flex items-center justify-center gap-3'><Logo /> <span className='text-white text-2xl bree-serif-regular'>Unsplash</span></div>
            <p className='text-center mb-1 mt-1 text-[hsla(0,0%,100%,.79)] text-xl bree-serif-regular'>The source of images of the internet. With resources from creators around the world</p>
            <form onSubmit={handleSearch} className='w-[85%] md:w-[50%] mt-[20px] mx-auto relative'>
              <input ref={searchInput} type='text' placeholder='Search for high resolution images' className='rounded-[8px] py-[.8rem] px-[3rem] bree-serif-regular search-input relative w-full'/>
              <select onChange={handleTopic} className='hidden md:block topic-select rounded-3xl bg-white hover:bg-[#e5e5e5] transition-all outline-none py-1 px-3 absolute right-3 top-0 bottom-0 m-auto text-sm bree-serif-regular w-[150px] cursor-pointer h-[70%] text-[#404040]'>
                <option value=''>Topics</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.title}</option>
                ))}
              </select>
              <input type="submit" hidden />
            </form>
        </div>

        <a className='absolute bottom-4 right-[1rem] md:right-[50px] backdrop-blur bg-[rgba(38,38,38,.4)] rounded-[8px] flex items-center justify-center gap-2 text-[hsla(0,0%,100%,.79)] text-xs bree-serif-regular p-3' href={photo?.user.links.html} target='_blank'>
          <span>Image by</span> <img src={photo?.user.profile_image.small} alt={photo?.alt_description} className='w-[20px] h-[20px] rounded-[50%]'/> <span>{photo?.user.first_name} {photo?.user.last_name}</span>
        </a>
    </header>
    )}
    </>
)}

export default Header