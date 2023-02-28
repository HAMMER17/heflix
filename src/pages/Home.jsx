import React, { useEffect } from 'react'
// import Featured from '../components/Featured';
import List from '../components/List';
import Test from '../pages/Test'
import Show from '../pages/Show'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { api } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Accordion from './Accordion';
import List2 from '../components/List2';
import Moves from './Moves';


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
      <List2 />
      <Show />
      <Accordion />
      <Moves />
      {/* <Featured /> */}
    </div>
  )
}

export default Home;
