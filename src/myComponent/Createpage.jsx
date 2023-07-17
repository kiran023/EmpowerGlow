import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export const Createpage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [checkpassword, setcheckpassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const navigate = useNavigate()
  const username=  JSON.parse(localStorage.getItem("name"))
  const useremail=  JSON.parse(localStorage.getItem("email"))
  let auth = getAuth();

  const submit = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        localStorage.setItem("name", JSON.stringify(firstName));
        localStorage.setItem("email", JSON.stringify(email));
        alert("account have been created")
        navigate('/')

      })
      .catch((err) => {
        alert(err.message);

      })


  }
  const logout=()=>{
    alert("Logout Successfully")
    localStorage.clear();
    navigate('/')

  }
  return (
    <>
    {
      username===null ? 
      <div>
        <Navbar></Navbar>
      <div className='form'>
        <div className='form-item'>
          <h1>Create account</h1>
          <div >
            <div className='fill'>
              <div >User Name</div>
              <input type="text"  value={firstName} onChange={(e) => { setfirstName(e.target.value) }} />
            </div>

            <div className='fill'>
              <div >Email  </div>
              <input type="email"  value={email} onChange={(e) => { setemail(e.target.value) }} />
            </div>

            <div className='fill'>
              <div>New password</div>
              <input type="password"  value={password} onChange={(e) => { setpassword(e.target.value) }} />
            </div>


            <div className='fill'>
              <div > Confirm password  </div>
              <input type="password"  value={checkpassword} onChange={(e) => { setcheckpassword(e.target.value) }} />
            </div>

          </div>
          <button onClick={submit} className='submit-btn'>Create</button>
          <div style={{display:"flex"}}>
          <div>already have an account ?</div>
          <Link to='/signin'><div className='alter'>Login</div></Link>
          </div>
          

        </div>

      </div>
      <Footer></Footer>
      </div>
      
      : 
      <div>
        <Navbar></Navbar>
        <div className='form'>
          <h2>Hello!!! {username} </h2>
          <h3>Email: {useremail}</h3>
        
        <div>
          <Link to='/wishlist' ><button className='btn'>Go to your wishlist</button></Link>
          <Link to='/cart' ><button className='btn'>Go to your cart</button></Link>
        </div>
        <button onClick={logout} className='submit-btn'> Log out</button>
        </div>
        
        <Footer></Footer>
      </div>
    }
      
    </>

  )
}
