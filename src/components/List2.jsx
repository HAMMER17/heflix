import { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { api } from '../firebase';
// import axios from 'axios'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import ItemList from './ItemList';
import '../style/list.css'


const List2 = () => {
  const [data, setData] = useState([])
  const db = getFirestore(api);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cartoon"));
    const array = []
    querySnapshot.forEach((doc) => {
      array.push(doc.data())
      // console.log(doc.data());
    });
    setData(array.concat(array))
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  const listRef = useRef()
  const [slider, setSlider] = useState(0)
  const [show, setShow] = useState(false)

  const nextSlider = (type) => {
    let distance = listRef.current.getBoundingClientRect().x

    if (type === 'left' && slider > 0) {

      setSlider((n) => n - 1)
      listRef.current.style.transform = `translateX(${300 + distance}px)`
    }
    if (type === 'right' && slider < 4) {
      setShow(true)
      setSlider((n) => n + 1)
      listRef.current.style.transform = `translateX(${-300 + distance}px)`
    }
    else if (slider === 0) {
      setShow(false)
    }
  }

  return (
    <div className='list_home'>
      <div className="list left1">
        {show && <BiLeftArrow size={35} onClick={() => nextSlider('left')} />}
      </div>
      <div className="list_container" ref={listRef}>
        {data.map((el, id) => {
          return <ItemList key={id} data={el} />
        })}

      </div>
      <div className="list right1">
        <BiRightArrow size={35} onClick={() => nextSlider('right')} />
      </div>

    </div>
  )
}

export default List2;
