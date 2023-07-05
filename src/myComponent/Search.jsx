// import React, { useState } from 'react'
// import { Navbar } from './navbar';
// import { Footer } from './Footer'
// import Products from './products.json'

// export const Search = () => {
//   cosnt [productdata,setproductdata]=useState(Products)
//   const searchProducts=(keyword)=> {
//     keyword = keyword.toLowerCase();
//     const results = Products.filter(product => {
//         const productName = product.name.toLowerCase();
//         const productBrand = product.productBrand.toLowerCase();
//         const productCategory = product.Category.toLowerCase();
//         return (
//             productName.includes(keyword) ||
//             productBrand.includes(keyword) ||
//             productCategory.includes(keyword)
//         );
//     });
//     setproductdata(results)

// }
//   return (
//     <>
//     <Navbar></Navbar>
//     <div>
//       <input type="text" placeholder='Search Your brands..' onChange={()=>{searchProducts()}}/>

//       <div className='product-container'>
//                     {
//                         productdata.map((e) => {
//                             return (
//                                 <div className='pro-details'>
//                                     <div className='pro-img'><img src={e.img} alt="" /></div>
//                                     <div className='pro-text' style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                         <div >{e.name}</div>
//                                         <div className='pro-icon' onClick={() => { addTo(e, "wishlist") }} style={{ cursor: 'pointer' }}><ion-icon name="heart-outline"></ion-icon></div>
//                                     </div>
//                                     <div className='pro-text'>{e.desc}</div>
//                                     <div className='pro-text'> ₹{e.price}</div>

//                                     <div style={{ display: 'flex' }} className='pro-text'>
//                                         <div className='pro-icon' onClick={() => { addTo(e, "cart") }} style={{ cursor: 'pointer' }}><ion-icon name="bag-outline"></ion-icon></div>
//                                         <div onClick={buyNow} style={{ cursor: 'pointer' }} className='pro-btn'> <button >Buy Now</button> </div>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>

//     </div>
//     <Footer></Footer>
//     </>
    
//   )
// }
