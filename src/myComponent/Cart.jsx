import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { database } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const [cartdata, setcartdata] = useState([])
  const [price, setprice] = useState(0)
  const navigate = useNavigate()
  const localvariable = JSON.parse(localStorage.getItem("email"))
  console.log(localvariable)
  if (localvariable === null) {
    useEffect(() => {
      navigate('/register')
    }, [])
  }
  else {
    const collectionRef = collection(database, localvariable)
    useEffect(() => {
      async function fetchdata() {
        const info = await getDocs(collectionRef)
        const arr = info.docs.map((e) => {
          return {
            ...e.data(), id: e.id
          }
        })
        var p = 0
        const filtereddata = arr.filter((e) => {

          if (e.type === "cart")

            p = p + parseInt(e.price);
          return e.type === "cart";
        })
        setcartdata(filtereddata)
        setprice(p)

      }
      fetchdata()

    }, [])

  }

  const deleteData = (e) => {
    setprice(price - parseInt(e.price))
    deleteDoc(doc(database, localvariable, e.id))
      .then(() => {
        // alert("deleted")
        const deletedData = cartdata.filter((event) => {
          return event.id !== e.id
        })
        setcartdata(deletedData)
      })
      .catch((err) => {
        alert(err.message)
      });
  }

  const change = (e, q) => {
    const newdata = cartdata.map((data) => {
      if (data.product_id === e.product_id) {
        return { ...data, qty: q };
      }
      return data;
    });

    setcartdata(newdata);

  }
  const increment = (e) => {

    const update = doc(database, localvariable, e.id)
    var q = parseInt(e.qty) + 1;
    updateDoc(update, {
      "qty": q
    })
      .then(() => {
        // alert("added")
        change(e, q)
        setprice(price + parseInt(e.price))
      })
      .catch((err) => {
        alert(err.message)
      })


  }

  const decrement = (e) => {

    const update = doc(database, localvariable, e.id)
    var q = parseInt(e.qty) - 1;
    updateDoc(update, {
      "qty": q
    })
      .then(() => {
        // alert("added")
        change(e, q)
        setprice(price - parseInt(e.price))
      })
      .catch((err) => {
        alert(err.message)
      })


  }


  return (
    <>
      <Navbar></Navbar>
      {
        cartdata.length > 0 ? <div className='cart-body'>
          <div className='cart-products'>
            {
              cartdata.map((e) => {
                return (

                  <div className='cart-subsec' key={e.product_id}>
                    <div onClick={() => { deleteData(e) }} style={{ cursor: 'pointer' ,textAlign:'right' }}><ion-icon name="close-outline"></ion-icon></div>
                  <div className='cart-details'>
                    <div className='cart-img'><img src={e.img} alt="" /></div>
                    <div className='cart-content' style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className='cart-info' style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ fontWeight: 'bold' }}>{e.name}</div>
                      </div>
                      <div className='cart-info'>{e.desc}</div>
                      <div className='cart-info' style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ fontWeight: 'bold' }}>₹{e.price}</div>
                        <div>
                          <button style={{ cursor: 'pointer' }} onClick={() => { decrement(e) }}>-</button>
                          <span >{e.qty}</span>
                          <button style={{ cursor: 'pointer' }} onClick={() => { increment(e) }}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  
                )
              })
            }
          </div>
          <div className='cart-checkout'>
            <div>
              <h3>Price summary</h3>
              <div>
                <div className='checkout-details'>
                  <div>Total MRP </div>
                  <div>{price}</div>
                </div>
                <div className='checkout-details'>
                  <div>Discount on MRP </div>
                  <div style={{ color: "rgb(16, 209, 36)" }}>-2000</div>
                </div>
                <div className='checkout-details'>
                  <div>Coupon </div>
                  <div style={{ color: "rgb(16, 209, 36)" }}>-200</div>
                </div>
                <div className='checkout-details'>
                  <div>Shipping </div>
                  <div>100</div>
                </div>
                <div className='checkout-details' style={{ borderTop: "solid 0.05px rgba(145, 144, 144, 0.283)" }}>
                  <div>Grand total: </div>
                  <div>{price - 100}</div>
                </div>
              </div>

            </div>

            <button className='cart-btn'>Place Order</button>


          </div>
        </div>
          : <div className='empty'> <h1> Your Cart is empty</h1></div>
      }

      <Footer></Footer>
    </>
  )
}


