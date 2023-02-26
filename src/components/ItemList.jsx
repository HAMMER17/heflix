import React, { memo, useState } from 'react'
import { BsPlayCircleFill, BsFillPlusCircleFill, BsSuitHeartFill } from 'react-icons/bs'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addData } from '../redax/sliceRedux'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { api } from '../firebase'

const ItemList = ({ data }) => {
  const auth = getAuth(api);
  const db = getFirestore(api);

  const [col, setCol] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlerPlay = () => {
    dispatch(addData(data))
    navigate('/play')
  }
  const handlerPage = () => {
    dispatch(addData(data))
    navigate(`/${data.film}`)
  }
  const handlerCart = () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login')
      } else {
        await addDoc(collection(db, "cart " + user.uid), {
          title: data.title,
          url: data.url,
          film: data.film,
          video: data.video
        });
        console.log("Document written", data);
      }
    });
    setCol(!col)
  }
  const [show, setShow] = useState(true)
  const showItem = () => {
    setShow(!show)
  }

  return (
    <div className='itemlist' >
      <span onClick={showItem}>
        {show ? <img src={data.url} alt="van" /> :
          <video src={data.video} autoPlay loop />}
      </span>
      <h4>{data.film}</h4>
      <div className="item_icons">

        <BsPlayCircleFill size={20} className='itemIcon' onClick={handlerPlay} />
        <BsFillPlusCircleFill size={20} className='itemIcon' onClick={handlerPage} />
        <BsSuitHeartFill size={20} style={{ color: col ? 'red' : 'white' }} className='itemIcon' onClick={handlerCart} />

      </div>
    </div>
  )
}

export default memo(ItemList);
