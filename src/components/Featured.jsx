import React, { useState } from 'react'
import { BsFillPlayCircleFill, BsInfoCircleFill } from 'react-icons/bs'
// import matrix from '../images/matrix.png'
import '../style/featured.css'

// import agent from '../images/agent.jpg'
import title from '../images/title2.png'
import { useNavigate } from 'react-router-dom'
import Input from './Input'


const Featured = () => {
  const [info, setInfo] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='featured_home' >
      <h1>NETFLIX</h1>
      <Input />
      {/* <Matrix /> */}
      <div className="featured">
        {/* <img src={matrix} alt="title" /> */}
        <div className="buttons">
          <button onClick={() => navigate('/play')}>
            <BsFillPlayCircleFill size={25} />
            <span>Play</span>
          </button>

          <button onClick={() => setInfo(!info)}>
            <BsInfoCircleFill size={25} />
            <span>Info</span>
          </button>

        </div>
      </div>
      <div className={info ? 'info' : 'into_none'}>
        {/* <img src={agent} alt="img" /> */}
        <p>
          <img src={title} alt="title" />
          "Bond's loyalty to his boss M is under threat from her past,
          which will suddenly come to light. MI6 is under attack and
          007 must deal with the threat, no matter the cost."
        </p>
      </div>
    </div>
  )
}

export default Featured
