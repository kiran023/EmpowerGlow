import './App.css';
import React from 'react'
import { LandingPage } from './myComponent/LandingPage';
import { app } from './firebase';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { Signinpage } from './myComponent/Signinpage';
import { Createpage } from './myComponent/Createpage';
import { Productpage } from './myComponent/Productpage';
import { Wishlist } from './myComponent/Wishlist';
import { Cart } from './myComponent/Cart';
import { Search } from './myComponent/Search';

function App() {
  
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
