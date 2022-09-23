import React from 'react'
import { auth, db } from "../firebase/init"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Logo from "./Frontend Simplified Logo.853fbda.png"
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from "firebase/firestore"

export default function Nav() {
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [logged, setLogged] = React.useState(false)

    // FIREBASE CLOUD FIRESTORE
    function createPost(){
      const post = {
        title: "Land a $500k job",
        description: "Finish FS"
      };
      addDoc(collection(db, "posts"), post)
    }

    async function getAllPost(){
      const { docs } = await getDocs(collection(db, "posts"))
      const post = docs.map(elem => ({...elem.data(), id:elem.id}))
      console.log(post)
    }

    async function getPostById(){
      const hardCodedId = "2JgTXVnOyerIQnyTf514"
      const postRef = doc(db, "posts", hardCodedId)
      const postSnap = await getDoc(postRef)
      const post = postSnap.data()
      console.log(post)
    }

    async function getPostByQuery(){
      const postCollectionRef = await query(
        collection(db, "posts"),
        where("title", "==", "Land a $100k job")
      )
      const { docs } = await getDocs(postCollectionRef)
      console.log(docs.map(doc => doc.data()))
    }

    async function updatePost(){
      const hardCodedId = "2JgTXVnOyerIQnyTf514"
      const postRef = doc(db, "posts", hardCodedId)
      const post = await getPostById(hardCodedId)
      const newPost = {
        ...post,
        title: "Land a $2mil job"
      }
      updateDoc(postRef, newPost)
    }

    function deletePost(){
      const hardCodedId = "2JgTXVnOyerIQnyTf514"
      const postRef = doc(db, "posts", hardCodedId)
      deleteDoc(postRef)
    }
  
    // FIREBASE PRACTICE
    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setLoading(false)
        console.log(user)
        if (user){
          setUser(user)
        }
      })
    }, [])
  
    function register(){
      createUserWithEmailAndPassword(auth, "doi@email.com", "test123")
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      });
    }
  
    function login(){
      signInWithEmailAndPassword(auth, "doi@email.com", "test123")
      .then((user) => {
        console.log(user)
        setUser(user)
        loadUserLogo()
      })
      .catch((error) => {
        console.log(error)
      });
    }
  
    function logout(){
      signOut(auth)
      setUser({})
      const btn = document.getElementsByClassName("btn")
      for (let i = 0; i < btn.length; i++){
        btn[i].classList.remove("hide__btn")
      }
      setLogged(false)
    }

    function loadUserLogo(){
      const btn = document.getElementsByClassName("btn")
      for (let i = 0; i < btn.length; i++){
        btn[i].classList.add("hide__btn")
      }
      setLogged(true)
    }

  return (
    <nav>
      {/* FIREBASE PRACTICE */}
      <div className="row">
        <figure className='logo__wrapper--img'>
          <img src={Logo} alt="" className='logo__img'/>
        </figure>
        <div className='account__management'>
          {loading ? 
            <div>
              <button className="btn__loading">Login</button>
              <button className="btn__loading">Register</button>
            </div>
            :
            <div>
              <button className="btn login__btn" onClick={login}>Login</button>
              <button className="btn register__btn" onClick={register}>Register</button>
            </div>
          }
          {
            logged ? <button className='circle' onClick={logout}>D</button> : ""
          }
        </div>
      </div>

      {/* CLOUD FIRESTORE Practice */}
      <div className="row">
        <button onClick={createPost}>Create post</button>
        <button onClick={getAllPost}>Get All post</button>
        <button onClick={getPostById}>Get Post By Id</button>
        <button onClick={getPostByQuery}>Get Post By Query</button>
        <button onClick={updatePost}>Update Post</button>
        <button onClick={deletePost}>Delete Post</button>
      </div>
    </nav>
  )
}
