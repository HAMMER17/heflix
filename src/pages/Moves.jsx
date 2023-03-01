import React, { useState } from 'react'
import king from '../video/king.mp4'
import alice from '../video/alica.mp4'
import aladdin from '../video/aladdin.mp4'
import chip from '../video/chip.mp4'
import fire from '../video/fire.mp4'
import heard from '../video/heard.mp4'

import '../style/moves.css'


const Moves = () => {
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState('')
  let array = [king, alice, heard, chip, fire, aladdin]
  const showData = (data) => {
    setShow(!show)
    setUrl(data)
  }
  return (
    <div className='move'>
      <h3>Cartoons for Kids</h3>
      {array.map((el, id) => (
        <div className="move_container" key={id} onClick={() => showData(el)}>
          <video src={el} muted autoPlay loop />
        </div>

      ))}
      {show ? <span className='video' onClick={showData}>
        <video className='video_url' src={url} autoPlay loop /></span> : null}
    </div>
  )
}

export default Moves;
