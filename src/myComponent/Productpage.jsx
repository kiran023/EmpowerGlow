import React, { useState} from 'react'
import Products from './products.json'
import { Navbar } from './navbar'
import { Footer } from './Footer'
// import { database, } from '../firebase'
// import {collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const Productpage = (props) => {
    const navigate = useNavigate()
    const localvariable = JSON.parse(localStorage.getItem("email"))
    // const [data, setdata] = useState([])
    const [products, setproducts] = useState(Products)
    // var collectionRef;
    // if (localvariable !== null) {
    //     collectionRef = collection(database, localvariable)
    //     useEffect(() => {
    //         async function fetchdata() {
    //             const info = await getDocs(collectionRef)
    //             const arr = info.docs.map((e) => {
    //                 return {
    //                     ...e.data(), id: e.id
    //                 }
    //             })
    //             setdata(arr)
    //         }
    //         fetchdata()
    //     }, [])
    // }

    const accordion = [
        {
            id:10,
            name: 'Brand',
            type: ['Stayfree', 'Peesafe','Whisper','Sirona','Wow']
        },
        {
            id:21,
            name: 'Category',
            type: ['Pads', 'Menstual cup','Standpee','Panty-Liners','Tampons']
        },
        {
            id:32,
            name:'price',
            type:['Accending','Decending']
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
        if (localvariable === null) {
                navigate('/register')
        }
        else {
            if(type==="wishlist"){

            }
            props.addTo(e, type)

        }

    }



    return (
        <>
            <Navbar></Navbar>
            <div className='product-body'>
                <div className='search'>
                    <input type="text" placeholder='Search Your brands,category' onChange={searchProducts} value={searchKeyword} />
                </div>
                <div className='products'>
                    <div className='product-filter'>
                    
                            {accordion.map((e) => {
                                const [active, setactive] = useState(false);
                                return (
                                    <div className='filter-1' key={e.id}>
                                        <div className='filter-name' onClick={() => { setactive(!active) }} style={{ cursor: 'pointer' }}>{e.name}</div>
                                        <div className='filters-item'>
                                            {active && e.type.map((i) => {
                                                return (
                                                    <div onClick={()=>{sort(i,e.name);setactive(!active);}} style={{ cursor: 'pointer' }} key={e.id[0]}>{i}</div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )

                            })}
                    </div>
                    <div className='product-container'>
                        {
                            products.map((e) => {
                                return (
                                    <div className='pro-details' key={e.id}>
                                        <div className='pro-img'><img src={e.img} alt="" /></div>
                                        <div className='pro-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h4>{e.name}</h4>
                                            <div className='pro-icon' onClick={() => {
                                                check(e, "wishlist")}} style={{ cursor: 'pointer' }}><ion-icon name="heart-outline"></ion-icon></div>
                                        </div>
                                        <div className='pro-text'>{e.desc}</div>
                                        <div className='pro-text'> ₹{e.price}</div>

                                        <div style={{ display: 'flex' }} className='pro-text'>
                                            <div className='pro-icon'><ion-icon name="bag-outline"></ion-icon></div>
                                            <div style={{ cursor: 'pointer' }} className='pro-btn' onClick={() => { check(e,"cart") }}> <button >Add to cart</button></div>
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
