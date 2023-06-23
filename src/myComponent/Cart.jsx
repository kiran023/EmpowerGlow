import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './Footer';
import { app, database } from '../firebase';
import { collection, getDocs, deleteDoc ,doc} from 'firebase/firestore';

export const Cart = () => {
  const localvariable = JSON.parse(localStorage.getItem("email"))
  const collectionRef = collection(database, localvariable)
  const [cartdata, setcartdata] = useState([])

  useEffect(() => {
    async function fetchdata() {
      const info = await getDocs(collectionRef)
      const arr = info.docs.map((e) => {
        return {
          ...e.data(), id: e.id
        }
      })
      const filtereddata = arr.filter((e) => {
        return e.type === "cart";
      })
      // console.log(filtereddata)
      setcartdata(filtereddata)
    }
    fetchdata()
  }, [])

  const deleteData=(e)=>{
    console.log("id",e.id);
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


  return (
    <>
      <Navbar></Navbar>
      <div className='cart-body'>
        <div className='cart-products'>
          {
            cartdata.map((e) => {
              return (
                <div style={{display:"flex",margin:'30px'}}>
                  <div><img src={e.img} alt="" style={{ width: "200px" }} /></div>
                  <div style={{ display: 'flex' , flexDirection:'column' }}>
                    <div style={{ display: 'flex'}}>
                      <div>{e.name}</div>
                      <div onClick={()=>{deleteData(e)}}><ion-icon name="trash-outline"></ion-icon></div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div>{e.price}</div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='cart-ckeckout'>
          <div>
            <h2>Price summary</h2>
            <div style={{ display: 'flex' }}>
              <div>Total price</div>
              <div>300</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>shipping</div>
              <div>100</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>Grand total</div>
              <div>400</div>
            </div>
          </div>
          <button>Place order</button>


        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
