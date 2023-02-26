import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClockLoader } from 'react-spinners'
import '../style/page.css'

const Page = () => {
  const [louder, setLouder] = useState(true)
  const navigate = useNavigate()
  const data = useSelector(state => state.data.value)
  console.log(data)
  const backPage = () => {
    navigate(-1)
  }
  setTimeout(() => {
    setLouder(false)
  }, 2000)
  return (
    <div className='page'>
      {louder ? <ClockLoader color="#ff0013" size={70} /> :
        <>
          <div className="page_left">
            <button onClick={backPage}>back</button>
            <img src={data.url} alt="f" />
          </div>
          <div className="page_right">
            <h1>{data.film}</h1>
            <p>{data.text}</p>
            <video style={{ width: 500 }} src={data.video} autoPlay />
          </div>
        </>}
    </div>
  )
}

export default Page;
