import React, { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { api } from '../firebase';
import netflix from '../images/title2.png'
import { BsFillCartFill } from 'react-icons/bs'
import { IoSearch } from 'react-icons/io5'
import { AiOutlinePoweroff } from 'react-icons/ai'

import '../style/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const auth = getAuth(api);
  const db = getFirestore(api);
  const navigate = useNavigate()
  const length = useSelector(state => state.data.value)

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
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        // navigate('/home')
        if (docSnap.exists()) {
          setNames(docSnap.data().name)
          setPhoto(docSnap.data().photo)
          console.log("Document data:", docSnap.data());
          setErr(true)
        } else {
          setErr(<h4>your photo</h4>)
          console.log("No such document!");
        }
        // ...
      }
    });
    // eslint-disable-next-line
  }, [])
  const outUser = async () => {

    await signOut(auth).then(() => {
      navigate('/login')
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
          <li>Series</li>
          <li>Movies</li>
          <li>Popular</li>
          <li>List</li>
        </ul>
      </div>
      <div className="home_right">
        <IoSearch size={25} />
        <h3>{names}</h3>
        {err ? <img src={photo} alt="foto" /> : <h4>Your Photo</h4>}
        <div className="home_cart">
          <BsFillCartFill size={30} style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')} />
          <span>{length.length}</span>
        </div>
        <div className="profile">
          <button onClick={outUser}><AiOutlinePoweroff size={20} /></button>

        </div>

      </div>
    </div>
  )
}

export default Navbar