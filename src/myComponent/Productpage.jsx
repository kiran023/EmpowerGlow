import React, { useState, useEffect } from 'react'
import Products from './products.json'
import { Navbar } from './navbar'
import { Footer } from './Footer'
import { app, database, } from '../firebase'
import { setDoc, addDoc, collection, getDocs } from 'firebase/firestore';

export const Productpage = () => {
    const localvariable = JSON.parse(localStorage.getItem("email"))
    const collectionRef = collection(database, localvariable)
    // const [data, setdata] = useState([])
    const [cartData, setcartData] = useState([])
    const [wishlistData, setwishlistData] = useState([])

    useEffect(() => {
        async function fetchdata() {
            const info = await getDocs(collectionRef)
            const arr = info.docs.map((e) => {
                return {
                    ...e.data(), id: e.id
                }
            })
            setcartData(arr.filter((e) => {
                return e.type === "cart";
            }))
        
            setwishlistData(arr.filter((e) => {
                return e.type === "wishlist";
            }))
        }
        fetchdata()
    }, cartData)


    const addTocart = (e) => {

        let filterData=cartData.filter((eve)=>{
            console.log(eve.product_id,e.product_id)

            return eve.product_id===e.id
        })
        if(filterData.length===0) {
            addDoc(collectionRef, {
                type: "cart",
                product_id: e.id,
                img: e.img,
                name: e.name,
                productBrand: e.productBrand,
                category: e.category,
                price: e.price
            })    
                .then(() => {
                    setcartData(cartData)
                    alert("data added")

                })
                .catch((err) => {
                    alert(err.message)
                });

        }
        else alert("no")


       
    }


    const addToWishlist = () => {

    }
    const buyNow = () => {

    }

    return (
        <>
            <Navbar></Navbar>
            <div className='product-body'>
                <div className='product-filter'>
                    <select name="" id="">
                        <option value="">Brand</option>
                        <option value="">furr</option>
                        <option value="">Peesafe</option>
                    </select>
                    <div></div>
                    <select name="" id="">
                        <option value="">Category</option>
                        <option value="">pads</option>
                        <option value="">menstual cup</option>
                    </select>

                </div>
                <div className='product-container'>
                    {
                        Products.map((e) => {
                            return (
                                <div>
                                    <div><img src={e.img} alt="" /></div>
                                    <div>{e.name}</div>
                                    <div>{e.price}</div>
                                    <div style={{ display: 'flex', }}>
                                        <div onClick={addToWishlist}> <ion-icon name="heart-outline"></ion-icon></div>
                                        <div onClick={() => { addTocart(e) }}><ion-icon name="cart-outline"></ion-icon></div>
                                        <div onClick={buyNow}>buy now</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Footer></Footer>
        </>

    )
}
