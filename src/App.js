import './App.css';
import React,{useEffect,useState} from 'react'
import { database } from './firebase';
import { collection, getDocs,addDoc,deleteDoc,doc} from 'firebase/firestore';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { LandingPage } from './myComponent/LandingPage';
import { Signinpage } from './myComponent/Signinpage';
import { Createpage } from './myComponent/Createpage';
import { Productpage } from './myComponent/Productpage';
import { Wishlist } from './myComponent/Wishlist';
import { Cart } from './myComponent/Cart';

function App() {
  const [data, setdata] = useState([])
  const localvariable = JSON.parse(localStorage.getItem("email"))
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
                alert("add to your"+ " " +field)

            })
            .catch((err) => {
                alert(err.message)
            });

    }
    else alert("Already present in your " + field)

}

const deleteData=(e)=>{
  console.log("id",e.id);
 deleteDoc(doc(database,localvariable,e.id))
 .then(()=>{
  alert("deleted")
    const newwishlist = data.filter((event) => {
      return event.id!==e.id
    })
    setdata(newwishlist)
  
 })
 .catch((err)=>{
   alert(err.message)
 });
}

  
  return (
    < div className='app'>
    <Router>
      <Routes>
      <Route path='/' exact Component={LandingPage}/>
      <Route path='/register' Component={Createpage}/>
      <Route path='/signin' Component={Signinpage}/>
      <Route path='/allProducts' Component={()=><Productpage addTo={addTo}/>}/>
      <Route path='/wishlist' Component={()=> <Wishlist data={data} addTo={addTo} deleteData={deleteData}/>}/>
      <Route path='/cart' Component={Cart}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
