import React, { useEffect, useState } from 'react'
import { Navbar } from './navbar';
import { Footer } from './Footer'
import { app, database } from '../firebase';
import { collection, getDocs, deleteDoc ,doc} from 'firebase/firestore';

export const Wishlist = () => {
  const localvariable = JSON.parse(localStorage.getItem("email"))
  const collectionRef = collection(database, localvariable)
  const [wishlist, setwishlist] = useState([])

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
      setwishlist(filtereddata)
    }
    fetchdata()
  }, [])

  const deleteData=(e)=>{
    console.log("id",e.id);
   deleteDoc(doc(database,localvariable,e.id))
   .then(()=>{
    // alert("deleted")
    const deletedData = wishlist.filter((event) => {
      return event.id!=e.id
    })
    setwishlist(deletedData)
   })
   .catch((err)=>{
     alert(err.message)
   });


  }
  return(
    <>
    <Navbar></Navbar>
    <div></div>
    <Footer></Footer>
    </>
    
  )
}
