import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { api } from '../firebase';
import '../style/test.css'


const Test = () => {
  const [title, setTitle] = useState([])
  const [slider, setSlider] = useState(0)
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(true)

  const nextSlider = () => {
    setShow2(true)
    if (slider === 0) setShow(false)
    if (slider < 0)
      setSlider((n) => n + 100)

  }
  const backSlider = () => {
    setShow(true)
    if (slider === -500) setShow2(false)
    if (slider > -600)
      setSlider((n) => n - 100)

  }

  const db = getFirestore(api);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "collections"));
    let arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())

    });
    setTitle(arr)
  };

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <div className='test'>
      {show2 && <MdArrowBackIosNew size={50} className='test_icon left' onClick={backSlider} />}
      <div className="test_item" >
        {title.map((el, id) => (
          <div key={id} className='test_container'
            style={{ transform: `translateX(${slider}%)` }}>
            <div className="test_left">
              <img src={el.url} alt={el.film} />
            </div>
            <div className="test_right">
              <h2 style={{ color: 'red' }}>{el.film}</h2>
              <h5 style={{ color: 'red' }}>{el.title}</h5>
              <p>{el.text}</p>
            </div>
          </div>

        ))}

      </div>
      {show && <MdArrowForwardIos size={50} className='test_icon right' onClick={nextSlider} />}
    </div>
  )
}

export default Test
