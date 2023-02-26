import React, { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { HiOutlineX } from 'react-icons/hi'
import '../style/accordion.css'

const Acc = ({ data }) => {
  const [show, setShow] = useState(true)
  const changeIcon = () => {
    setShow(!show)
  }
  return (
    <div className='acc_container' key={data.id}>
      <div className="acc_header">
        <h2>{data.header}</h2>
        {show ? <BsPlusLg size={20} onClick={changeIcon} /> :
          <HiOutlineX size={30} onClick={changeIcon} />}
      </div>

      <p style={{ display: show ? 'none' : 'flex' }}>{data.body}</p>

    </div>
  )
}

export default Acc
