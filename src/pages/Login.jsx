import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { api } from "../firebase";
import { Link, useNavigate } from 'react-router-dom'
import net from '../images/net5.jpg'
import '../style/login.css'
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('Login')
  const auth = getAuth(api);
  const getLogin = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate('/')
        }
        console.log(user)
      })
      .catch((error) => {
        setErr(<h1 style={{ color: 'red' }}>Error</h1>)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  return (
    <div className='login'>
      <img src={net} alt="net" />
      <form className='login_container' onSubmit={getLogin}>
        <h1 >{err}</h1>
        <input type="text" placeholder='Email...' value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder='Password...' value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button>login</button>
        <p>You have not at account?<span> Here<Link to={'/register'}>Register</Link></span> </p>
      </form>

    </div>
  )
}

export default Login
