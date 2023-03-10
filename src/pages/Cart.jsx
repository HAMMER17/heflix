import React, { memo, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { api } from '../firebase'
import { ClockLoader } from 'react-spinners';

import Elem from '../components/Elem';
import '../style/cart.css'

const Cart = memo(() => {
  const auth = getAuth(api);
  const db = getFirestore(api);
  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "cart " + user.uid));
        onSnapshot(q, (querySnapshot) => {
          const array = [];
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
          setData(array)
          console.log("Current cities in CA: ", array);
          // setTimeout(() => {
          if (array.length === 0)
            setSpinner(true)
          else setSpinner(false)
          // }, 2000)
        })
      }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className='cart'>
      {spinner ? (<div className='spinner'><ClockLoader color="#ff0013" size={70} /><h3 style={{ color: 'white', margin: 30 }}>Add Film</h3></div>) :
        <span style={{ display: 'flex' }}> {data.map((el, id) => (
          <Elem elem={el} key={id} />
        ))}</span>
      }
    </div>
  )
})

export default Cart;
