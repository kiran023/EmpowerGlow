import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

export const Signinpage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const clearData=()=>{
    setemail('');
    setpassword('')
  }
  const navigate= useNavigate()


  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const submit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        localStorage.setItem("email",JSON.stringify(response.user.email));
        localStorage.setItem("name",JSON.stringify(response.user.email.split('@')[0]))
        clearData();
        navigate('/')

      })
      .catch((error) => {
        alert(error.message);
      });
  }

  provider.setCustomParameters({
    prompt: 'select_account'
  });
  const googlesubmit = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response.user);
        console.log(response.user.displayName);
        localStorage.setItem("name",JSON.stringify(response.user.displayName));
        localStorage.setItem("email",JSON.stringify(response.user.email));
        clearData();
        navigate('/')
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <>
      <Navbar></Navbar>
      <div className='form'>
        <div className='form-item'>
          <h1>Login</h1>
          <div className='fill'>
          <div>Email </div>
          <input type="email" onChange={(e) => { setemail(e.target.value) }} value={email} />
          </div>
          <div className='fill'>
          <div> Password</div>
          <input type="password" onChange={(e) => { setpassword(e.target.value) }} value={password} />
          </div>

          {/* <div>Forgot Your password</div> */}
          <button onClick={submit} className='submit-btn'>Signin</button>
          <button onClick={googlesubmit} className='submit-btn'>Sign in with Google</button>
          <div style={{display:"flex"}}>
          <div>don't have an account ?</div>
          <Link to='/register'><div className='alter'>create account</div></Link>
          </div>
          
        </div>
      </div>
      <Footer></Footer>
    </>

  )
}
