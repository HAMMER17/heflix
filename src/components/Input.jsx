import React, { useState } from 'react'
import '../style/input.css'

const Input = () => {

  const [item, setItem] = useState(true)
  const changeItem = (e) => {
    e.preventDefault()
    setItem(!item)
  }
  return (
    <form className='input_container'>
      {item ? <input type="text" placeholder='Email...' /> :
        <input type="text" placeholder='Password...' />}
      <button onClick={changeItem}>try it now</button>
    </form>
  )
}

export default Input
