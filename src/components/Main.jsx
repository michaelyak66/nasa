import React from 'react'

export default function Main(props) {
    const {data} = props
  return (
    <div className='imgContainer'>
        <img src={data?.hdurl} className="bgImage" alt={data?.title || 'bg-img'} />
    </div>
  )
}
