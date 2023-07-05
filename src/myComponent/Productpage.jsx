import React, { useState, useEffect } from 'react'
import Products from './products.json'
import { Navbar } from './navbar'
import { Footer } from './Footer'
import { app, database, } from '../firebase'
import { setDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const Productpage = () => {
    const navigate = useNavigate()
    const localvariable = JSON.parse(localStorage.getItem("email"))
    const [data, setdata] = useState([])
    const [products, setproducts] = useState(Products)
    var collectionRef;
    if (localvariable != null) {
        collectionRef = collection(database, localvariable)
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
    }



    const addTo = (e, field) => {

        let filterData = data.filter((eve) => {
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
                Category: e.Category,
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
                        Category: e.Category,
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
    const accordion = [
        {
            name: 'Brand',
            type: ['Stayfree', 'Peesafe','Whisper','Sirona','Wow']
        },
        {
            name: 'Category',
            type: ['Pads', 'Menstual cup','Standpee','Panty-Liners','Tampons']
        },
        {
            name:'price',
            type:['Accending','decending']
        }
    ]
    
    const sort = (i, type) => {

        if(type==='price'){
            console.log(i);
            const filteredPrice = i === 'Accending'
            ? products.sort((a, b) => a.price - b.price)
            : products.sort((a, b) => b.price - a.price);
            console.log(filteredPrice)
            setproducts(filteredPrice)


        }

        else {
            const filtered = Products.filter((e) => {
                if (type === 'Category') {
                    console.log(e.Category)
                    return e.Category === i;
                }
                else return i === e.productBrand;
            })
            setproducts(filtered)
        }

    }

    const [searchKeyword, setsearchKeyword] = useState('')

    const searchProducts = (e) => {
        const keyword = e.target.value.toLowerCase();
        setsearchKeyword(keyword);

        const results = Products.filter(product => {
            const productName = product.name.toLowerCase();
            const productBrand = product.productBrand.toLowerCase();
            const productCategory = product.Category.toLowerCase();
            return (
                productName.includes(keyword) ||
                productBrand.includes(keyword) ||
                productCategory.includes(keyword)
            );
        });

        setproducts(results);

    }
    const check = (e, type) => {
        if (localvariable == null) {
                navigate('/register')
        }
        else {
            addTo(e, type)

        }

    }



    return (
        <>
            <Navbar></Navbar>
            <div className='product-body'>
                <div className='search'>
                    <input type="text" placeholder='Search Your brands..' onChange={searchProducts} value={searchKeyword} />
                </div>
                <div className='products'>
                    <div className='product-filter'>
                        <div>
                            {accordion.map((e) => {
                                const [active, setactive] = useState(false);
                                return (
                                    <div className='filter-1'>
                                        <div className='filter-name' onClick={() => { setactive(!active) }} style={{ cursor: 'pointer' }}>{e.name}</div>
                                        <div className='filters-item'>
                                            {active && e.type.map((i) => {
                                                return (
                                                    <div onClick={()=>{sort(i,e.name);setactive(!active);}} style={{ cursor: 'pointer' }}>{i}</div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    <div className='product-container'>
                        {
                            products.map((e) => {
                                return (
                                    <div className='pro-details'>
                                        <div className='pro-img'><img src={e.img} alt="" /></div>
                                        <div className='pro-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h4>{e.name}</h4>
                                            <div className='pro-icon' onClick={() => {
                                                check(e, "wishlist")}} style={{ cursor: 'pointer' }}><ion-icon name="heart-outline"></ion-icon></div>
                                        </div>
                                        <div className='pro-text'>{e.desc}</div>
                                        <div className='pro-text'> ₹{e.price}</div>

                                        <div style={{ display: 'flex' }} className='pro-text'>
                                            <div className='pro-icon' onClick={() => { check(e,"cart") }} style={{ cursor: 'pointer' }}><ion-icon name="bag-outline"></ion-icon></div>
                                            <div onClick={buyNow} style={{ cursor: 'pointer' }} className='pro-btn'> <button >Buy Now</button> </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>


            <Footer></Footer>
        </>

    )
}
