import React, { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, } from "firebase/firestore";
import { api } from '../firebase';
import netflix from '../images/title2.png'
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlinePoweroff } from 'react-icons/ai'

import '../style/navbar.css'
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const auth = getAuth(api);
  const db = getFirestore(api);
  const navigate = useNavigate()

  const [length, setLength] = useState([])
  const [scrolls, setScrolls] = useState(false)
  const [names, setNames] = useState('')
  const [photo, setPhoto] = useState('')
  const [err, setErr] = useState(false)
  window.onscroll = () => {
    setScrolls(window.pageYOffset === 0 ? false : true)
    return () => window.onscroll = null
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "cart " + user.uid));
        onSnapshot(q, (querySnapshot) => {
          const cities = [];
          querySnapshot.forEach((doc) => {
            cities.push(doc.data());
          });
          setLength(cities)
        });
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNames(docSnap.data().name)
          setPhoto(docSnap.data().photo)
          console.log("Document data:", docSnap.data());
          setErr(true)
        } else {
          setNames('Your Name')
          setPhoto(0)
          setErr(false)
          console.log("No such document!");
        }
        // ...
      }
    });
    // eslint-disable-next-line
  }, [])
  const outUser = async () => {
    await signOut(auth).then(() => {
      setErr(false)

      console.log('OK')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className={scrolls ? 'theme' : 'home'}>
      <div className="home_left">
        <img src={netflix} alt="title" />

        <ul className='home_list'>
          <Link to={'/'}><li>Home</li></Link>
        </ul>
      </div>
      {err ? <div className="home_right">

        <h3>{names}</h3>
        <img src={photo} alt="foto" />
        <div className="home_cart">
          <BsFillCartFill size={30} style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')} />
          <span>{length.length}</span>
        </div>
        <div className="profile">
          <button onClick={() => outUser()}><AiOutlinePoweroff size={20} /></button>
        </div>
      </div> : <span><button className='btn' onClick={() => navigate('/register')}>sign up</button>
        <button className='btn' onClick={() => navigate('/login')}>sign in</button></span>}

    </div>
  )
}

export default Navbar
