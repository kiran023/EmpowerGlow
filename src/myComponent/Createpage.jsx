import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export const Createpage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [checkpassword, setcheckpassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const navigate= useNavigate()
  let auth = getAuth();

  const submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        localStorage.setItem("name",JSON.stringify(firstName));
        localStorage.setItem("email",JSON.stringify(email));
        // setfirstName('')
        // setlastName('')
        // setemail('')
        // setpassword('')
        // setcheckpassword('')
        navigate('/')
        
      })
      .catch((err) => {
        alert(err.message);

      })


  }
  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>Create account</h1>
        <div>
          <div>first name<input type="text" placeholder='your first name' value={firstName} onChange={(e) => { setfirstName(e.target.value) }} /></div>

          <div>last name<input type="text" placeholder='your last name' value={lastName} onChange={(e) => { setlastName(e.target.value) }} /></div>

          <div>email<input type="email" placeholder='enter your email' value={email} onChange={(e) => { setemail(e.target.value) }} /></div>

          <div>new password<input type="password" placeholder='enter your password' value={password} onChange={(e) => { setpassword(e.target.value) }} /></div>

          <div> new password<input type="password" placeholder='enter your password again' value={checkpassword} onChange={(e) => { setcheckpassword(e.target.value) }} /></div>
        </div>
        <button onClick={submit}>create</button>
        <div>already have an account ?</div>
        <Link to='/signin'><div>Login</div></Link>
      </div>
      <Footer></Footer>
    </>

  )
}
