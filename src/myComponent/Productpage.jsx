import React, { useState, useEffect } from 'react'
import Products from './products.json'
import { Navbar } from './navbar'
import { Footer } from './Footer'
import { app, database, } from '../firebase'
import { setDoc, addDoc, collection, getDocs } from 'firebase/firestore';

export const Productpage = () => {
    const localvariable = JSON.parse(localStorage.getItem("email"))
    const collectionRef = collection(database, localvariable)
    const [data, setdata] = useState([])

    useEffect(() => {
        async function fetchdata() {
            const info = await getDocs(collectionRef)
            const arr = info.docs.map((e) => {
                return {
                    ...e.data(), id: e.id
                }
            })
            setdata(arr)
        }
        fetchdata()
    }, [])


    const addTo = (e, field) => {

        let filterData = data.filter((eve) => {
            console.log(eve.product_id, e.product_id)

            return ((eve.product_id === e.id) && (eve.type === field))
        })
        if (filterData.length === 0) {
            addDoc(collectionRef, {
                type: field,
                product_id: e.id,
                img: e.img,
                desc: e.desc,
                name: e.name,
                productBrand: e.productBrand,
                category: e.category,
                price: e.price,
                qty: 1,
                rating: e.rating
            })
                .then(() => {
                    const updatedCartData = [...data, {
                        type: field,
                        product_id: e.id,
                        img: e.img,
                        desc: e.desc,
                        name: e.name,
                        productBrand: e.productBrand,
                        category: e.category,
                        price: e.price,
                        qty: 1,
                        rating: e.rating
                    }];
                    setdata(updatedCartData);
                    alert("data added")

                })
                .catch((err) => {
                    alert(err.message)
                });

        }
        else alert("no")
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
                                <div className='pro-details'>
                                    <div className='pro-img'><img src={e.img} alt="" /></div>
                                    <div className='pro-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div >{e.name}</div>
                                        <div className='pro-icon' onClick={() => { addTo(e, "wishlist") }} style={{ cursor: 'pointer' }}><ion-icon name="heart-outline"></ion-icon></div>
                                    </div>
                                    <div className='pro-text'>{e.desc}</div>
                                    <div className='pro-text'> ₹{e.price}</div>

                                    <div style={{ display: 'flex' }} className='pro-text'>
                                        <div className='pro-icon' onClick={() => { addTo(e, "cart") }} style={{ cursor: 'pointer' }}><ion-icon name="bag-outline"></ion-icon></div>
                                        <div onClick={buyNow} style={{ cursor: 'pointer' }} className='pro-btn'> <button >Buy Now</button> </div>
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
