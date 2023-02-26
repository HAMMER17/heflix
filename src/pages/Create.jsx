import React, { useState } from 'react'
// import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../style/create.css'
import { api } from '../firebase'

const Create = () => {
  const [file, setFile] = useState('')
  const [title, setTitle] = useState('')
  const [film, setFilm] = useState('')
  const [area, setArea] = useState('')
  const [urlVideo, setUrlVideo] = useState('')

  // const auth = getAuth(api);
  const db = getFirestore(api);
  const storage = getStorage(api);

  const addData = (e) => {
    e.preventDefault()

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, 'image/jpeg');
    const storageRef2 = ref(storage, 'video/' + urlVideo.name);
    const uploadTask2 = uploadBytesResumable(storageRef2, urlVideo, 'image/mp4');

    uploadTask2.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        // eslint-disable-next-line
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {// eslint-disable-next-line
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL2) => {

            addDoc(collection(db, "collections"), {
              title,
              film,
              text: area,
              video: downloadURL,
              url: downloadURL2,
            })
            console.log('File available at', downloadURL);
            setArea('')
            setFile(0)
            setTitle('')
            setFilm('')
            setUrlVideo(0)
          })
        })
      }
    );
  }
  return (
    <div className='create'>
      <form onSubmit={addData}>
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Film' value={film} onChange={(e) => setFilm(e.target.value)} />
        <input type="file" id='file' onChange={(e) => setFile(e.target.files[0])} />
        <textarea name="text" id="text" cols="30" value={area} rows="10" onChange={(e) => setArea(e.target.value)}></textarea>
        <input type="file" id='file' onChange={(e) => setUrlVideo(e.target.files[0])} />
        <button>create</button>
      </form>

    </div>
  )
}

export default Create;
