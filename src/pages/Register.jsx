import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { api } from '../firebase.js'
import { Link, useNavigate } from 'react-router-dom'
// import net from '../images/net1.jpg'
import '../style/login.css'
import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [file, setFile] = useState('')
  const navigate = useNavigate()

  const auth = getAuth(api);
  const storage = getStorage(api);
  const db = getFirestore(api);

  const getLoginPassword = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password, fullName)
      .then((userCredential) => {
        const user = userCredential.user

        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDoc(doc(db, "users", user.uid), {
              name: fullName,
              email,
              password,
              photo: downloadURL
            });
            console.log('File available at', downloadURL);
            navigate('/')
          })
        });
        setEmail('')
        setFullName('')
        setPassword('')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  return (
    <div className='login'>
      {/* <img src={net} alt="net" /> */}
      <form className='login_container' onSubmit={getLoginPassword}>
        <h1>Register</h1>
        <input type="text" placeholder='Name...'
          onChange={(e) => setFullName(e.target.value)} value={fullName} />
        <input type="text" placeholder='Email...'
          onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="text" placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>register</button>
        <p>You have  login?<span><Link to={'/login'}> Login</Link></span> </p>
      </form>

    </div>
  )
}

export default Register
