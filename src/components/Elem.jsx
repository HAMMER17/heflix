import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { api } from '../firebase';
import '../style/elem.css'

const Elem = ({ elem }) => {
  const auth = getAuth(api);
  const db = getFirestore(api);
  const [docs, setDocs] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "cart " + user.uid));
        onSnapshot(q, (querySnapshot) => {

          querySnapshot.forEach((doc) => {
            setDocs(doc.id);
          });
        })
      }
    })
    // eslint-disable-next-line 
  }, [])

  const deleteCart = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await deleteDoc(doc(db, "cart " + user.uid, docs))
      }
    })
  }
  return (
    <div className='elem_container' key={elem.film}>
      <h3>{elem.film}</h3>
      <img src={elem.url} alt='elem' />
      <video src={elem.video} controls />
      <h4>{elem.title}</h4>
      <button type='submit' onClick={deleteCart}>delete</button>
    </div>
  )
}

export default Elem
