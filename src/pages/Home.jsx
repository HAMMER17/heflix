import React, { useEffect } from 'react'
// import Featured from '../components/Featured';
import List from '../components/List';
import Test from '../pages/Test'
import Show from '../pages/Show'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { api } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Accordion from './Accordion';


const Home = () => {
  const auth = getAuth(api);
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/')
      } else navigate('/login')
    });
    // eslint-disable-next-line
  }, [])

  return (
    <div className='home_container'>
      <Test />
      <List />
      <List />
      <Show />
      <Accordion />
      {/* <Featured /> */}
    </div>
  )
}

export default Home;
