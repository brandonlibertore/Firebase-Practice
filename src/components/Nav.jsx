import React from 'react'
import { auth } from "../firebase/init"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Logo from "./Frontend Simplified Logo.853fbda.png"

export default function Nav() {
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [logged, setLogged] = React.useState(false)
  
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
    </nav>
  )
}
