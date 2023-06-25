import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { app, database } from '../firebase';
import { collection, getDocs, deleteDoc ,doc,updateDoc} from 'firebase/firestore';

export const Cart = () => {
  const localvariable = JSON.parse(localStorage.getItem("email"))
  const collectionRef = collection(database, localvariable)
  const [cartdata, setcartdata] = useState([])
  const [price,setprice]= useState(0)
  var p=0

  useEffect(() => {
    async function fetchdata() {
      const info = await getDocs(collectionRef)
      const arr = info.docs.map((e) => {
        return {
          ...e.data(), id: e.id
        }
      })
      const filtereddata = arr.filter((e) => {
        
        if(e.type === "cart")
        p=p+parseInt(e.price);
        return e.type === "cart";
      })
      setcartdata(filtereddata)
      setprice(p)
      
    }
    fetchdata()

  }, [])
  const deleteData=(e)=>{
    setprice(price-parseInt(e.price))
   deleteDoc(doc(database,localvariable,e.id))
   .then(()=>{
    // alert("deleted")
    const deletedData = cartdata.filter((event) => {
      return event.id!=e.id
    })
    setcartdata(deletedData)
   })
   .catch((err)=>{
     alert(err.message)
   });
  }

  const change=(e,q)=>{
    const newdata = cartdata.map((data) => {
      if (data.product_id === e.product_id) {
        return {...data, qty:q};
      }
      return data;
    });
  
    setcartdata(newdata);

  }
  const increment=(e)=>{
    
    const update=doc(database,localvariable,e.id)
    var q=parseInt(e.qty)+1;
    updateDoc(update,{
        "qty":q
    })
    .then(()=>{
          // alert("added")
          change(e,q)
          setprice(price+parseInt(e.price))
    })
    .catch((err)=>{
      alert(err.message)
    })
    
  
  }

  const decrement=(e)=>{
    
    const update=doc(database,localvariable,e.id)
    var q=parseInt(e.qty)-1;
    updateDoc(update,{
        "qty":q
    })
    .then(()=>{
          // alert("added")
          change(e,q)
          setprice(price-parseInt(e.price))
    })
    .catch((err)=>{
      alert(err.message)
    })


  }


  return (
    <>
      <Navbar></Navbar>
      <div className='cart-body'>
        <div className='cart-products'>
          {
            cartdata.map((e) => {
              return (
                <div  className='cart-subsec' key={e.product_id}>
                  <div className='cart-img'><img src={e.img} alt=""/></div>
                  <div className='cart-content' style={{ display: 'flex' , flexDirection:'column'}}>
                    <div style={{ display: 'flex',justifyContent:"space-between"}}>
                      <div>{e.name}</div>
                      
                    </div>
                    <div>{e.desc}</div>
                    <div style={{ display: 'flex' }}>
                      <div>{e.price}</div>
                      <div>
                        <button style={{cursor:'pointer'}} onClick={()=>{decrement(e)}}>-</button>
                        <span>{e.qty}</span>
                        <button style={{cursor:'pointer'}} onClick={()=>{increment(e)}}>+</button>
                      </div>
                    </div>
                  </div>
                  <div onClick={()=>{deleteData(e)}} style={{cursor:'pointer'}}><ion-icon name="close-outline"></ion-icon></div>
                </div>
              )
            })
          }
        </div>
        <div className='cart-checkout'>
          <div>
            <h2>Price summary</h2>
            <div style={{ display: 'flex' }}>
              <div>Total price: </div>
              <div>{price}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>shipping: </div>
              <div>100</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>Grand total: </div>
              <div>{price+100}</div>
            </div>
          </div>
          <button>Place order</button>


        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
