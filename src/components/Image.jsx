import React from 'react'

const Image = ({photo}) => {
  return (
    <img src={photo.urls.regular} alt={photo.alt_description}/>
  )
}

export default Image