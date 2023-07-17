import React from 'react'
import logo from '../logo/logo-no-background.png'
import { Link } from 'react-router-dom';

export const Navbar = ({ props }) => {
  const humOpen=()=>{
    let menu=document.querySelector(".humburger-menu")
    menu.classList.add("activated")
    document.querySelector("body").style.overflowY="hidden"
    document.querySelector(".menu-icon-close").style.display="block";
    document.querySelector(".menu-icon").style.display="none";

  }
  const humClose=()=>{
    let menu=document.querySelector(".humburger-menu")
    menu.classList.remove("activated")
    document.querySelector("body").style.overflowY="auto"
    document.querySelector(".menu-icon-close").style.display="none";
    document.querySelector(".menu-icon").style.display="block";
  }


  return (
    <>
      <nav className='navbar' >
        <Link to='/'><div className='nav-img' onClick={humClose}> <img src={logo} id='logo' alt=''/></div></Link>
        <div onClick={humOpen} className='menu-icon'> <ion-icon name="menu-outline"></ion-icon></div>
        <div onClick={humClose} className='menu-icon-close'><ion-icon name="close-outline"></ion-icon></div>
        <div className='menu'>
          <ul className='list'>
            <Link to='/allProducts'><li>Products</li></Link>
            <li>Brand</li>
            <li>Bestseller</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className='nav-icon' >
          <Link to='/allProducts'><ion-icon name="search-outline"></ion-icon></Link>
          <Link to='/wishlist'><ion-icon name="heart-outline"></ion-icon></Link>
          <Link to='/cart'><ion-icon name="cart-outline"  ></ion-icon></Link>
          <Link to='/register'><ion-icon name="person-outline" ></ion-icon></Link>
        </div>
      </nav>
      <div className='humburger-menu'>
        <div >
          <ul>
            <Link to='/allProducts'><li onClick={humClose}>Products</li></Link>
            <Link to='/wishlist'><li onClick={humClose}>Wishlist</li></Link>
            <Link to='/cart'><li onClick={humClose}>Cart</li></Link>
            <Link to='/register'><li onClick={humClose}>Account</li></Link>
          </ul>
        </div>

        </div>
    </>
  )
}
