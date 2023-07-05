import React from 'react'
import logoblack from '../logo/logo-no-background.png'
import {Link} from 'react-router-dom';

export const Navbar = ({props}) => {
  

  return (
    <>
      <nav className='navbar' >
        <Link to='/'><div> <img src={logoblack} alt=""  id='logo' /></div></Link>
        <div className='menu'>
          <ul className='list'>
            <Link to='/allProducts'><li>Product</li></Link>
            <li>Brand</li>
            <li>Bestseller</li>
            <li>blog</li>
          </ul>
        </div>
        <div className='nav-icon' >
          <Link to='/allProducts'><ion-icon name="search-outline"></ion-icon></Link>
          <Link to='/wishlist'><ion-icon name="heart-outline"></ion-icon></Link>
          <Link to='/cart'><ion-icon name="cart-outline"  ></ion-icon></Link>
        <Link to='/register'><ion-icon name="person-outline" ></ion-icon></Link>
        
        </div>
      </nav>
    </>
  )
}
