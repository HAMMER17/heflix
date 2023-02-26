import React from 'react'
import { useSelector } from 'react-redux'
import '../style/play.css'


const Play = () => {
  const data = useSelector(state => state.data.value)
  return (
    <div className='play'>
      <h2 style={{ marginTop: 100 }}>{data.film}</h2>
      <video src={data.video} loading='lazy' autoPlay style={{ border: 'none', margin: 20 }} title='title' />

    </div>
  )
}

export default Play;
