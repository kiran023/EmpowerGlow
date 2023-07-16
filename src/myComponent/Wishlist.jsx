import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';


export const Wishlist = (props) => {
  // console.log(props.data)
  const navigate = useNavigate()
  const localvariable = JSON.parse(localStorage.getItem("email"))
  const [wishlist, setwishlist] = useState([])
  if (localvariable === null) {

    navigate('/register')

  }
  else {
    useEffect(() => {
      const filteredData = props.data.filter((e) => e.type === "wishlist");
      setwishlist(filteredData);
    }, []);

  }




  console.log(wishlist);
  return (
    <>
      <Navbar></Navbar>
      { wishlist.length >0 ?
         <div className='wishlist-container'>
          {
            wishlist.map((e) => {
              return (
                <div className='pro-details'>
                  <div className='pro-img'><img src={e.img} alt="" /></div>
                  <div className='pro-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>{e.name}</h4>
                  </div>
                  <div className='pro-text'>{e.desc}</div>
                  <div className='pro-text'> ₹{e.price}</div>

                  <div style={{ display: 'flex' }} className='pro-text'>
                    <div style={{ cursor: 'pointer' }} className='pro-btn'> <button onClick={() => {
                      props.addTo(e, 'cart')
                      props.deleteData(e)
                    }}>Add to cart</button> </div>
                  </div>
                </div>
              )
            })
         }
        </div>
       
        :
        <div className='empty'> <h1>Your Wishlist is empty</h1></div>

      }

      <Footer></Footer>
    </>

  )
}
