import React from 'react'
import king from '../video/king.mp4'
import alice from '../video/alica.mp4'
import aladdin from '../video/aladdin.mp4'
import chip from '../video/chip.mp4'
import fire from '../video/fire.mp4'
import heard from '../video/heard.mp4'

import '../style/moves.css'

const Moves = () => {
  let array = [king, alice, heard, chip, fire, aladdin]

  return (
    <div className='move'>
      <h3>Cartoons for Kids</h3>
      {array.map((el, id) => (
        <div className="move_container" key={id}>
          <video src={el} muted autoPlay loop />
        </div>

      ))}

    </div>
  )
}

export default Moves;
