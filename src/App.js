import './App.css';
import React from 'react'
import { LandingPage } from './myComponent/LandingPage';
// import { app, database } from '../firebase';
// import { collection, getDocs} from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { Signinpage } from './myComponent/Signinpage';
import { Createpage } from './myComponent/Createpage';
import { Productpage } from './myComponent/Productpage';
import { Wishlist } from './myComponent/Wishlist';
import { Cart } from './myComponent/Cart';
import { Search } from './myComponent/Search';

function App() {
  // const localvariable = JSON.parse(localStorage.getItem("email"))
  // const navigate = useNavigate()
  // const fetchWishlist=()=>{
  //   if (localvariable === null) {
  //     useEffect(() => {
  //       navigate('/register')
  //     }, [])
  //   }
  //   else {
  //     const collectionRef = collection(database, localvariable)
  //     useEffect(() => {
  //       async function fetchdata() {
  //         const info = await getDocs(collectionRef)
  //         const arr = info.docs.map((e) => {
  //           return {
  //             ...e.data(), id: e.id
  //           }
  //         })
  //         var p = 0
  //         const filtereddata = arr.filter((e) => {
  
  //           if (e.type === "cart")
  
  //             p = p + parseInt(e.price);
  //           return e.type === "cart";
  //         })
  //         setcartdata(filtereddata)
  //         setprice(p)
  
  //       }
  //       fetchdata()
  
  //     }, [])
  
  //   }
  // }
  
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' exact Component={LandingPage}/>
      <Route path='/register' Component={Createpage}/>
      <Route path='/signin' Component={Signinpage}/>
      <Route path='/allProducts' Component={Productpage}/>
      <Route path='/wishlist' Component={Wishlist}/>
      <Route path='/cart' Component={Cart}/>
      <Route path='/search' Component={Search}/>
      </Routes>
    </Router>
    
    
    </>
  );
}

export default App;
