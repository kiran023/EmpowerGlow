import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import landingImage from './landingImage.json'
import { Navbar } from './navbar';
import { Footer } from './Footer'
import { Bycategory } from './Bycategory';
import { Bybrand } from './Bybrand';

export const LandingPage = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>

        <div className="App">
          <Carousel className='move'>
            {landingImage.map((e) => {
              return <div><img src={e.url} alt="Image 1" key={e.id} /></div>
            })
            }

          </Carousel>
        </div>

        <Bycategory></Bycategory>

        <div className='aboutus'>
          <h2>Our Story</h2>
          <div className='about'>
            <div className='about-img'>
              <img src="https://cdn.shopify.com/s/files/1/0055/7855/5503/files/Journey_banner-01_copy_-_Copy_2048x.jpg?v=1648016934" alt="" />
            </div>
            <div className='about-text'>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at cumque iure tempora dolores soluta alias voluptas necessitatibus quis esse id molestias, maxime facere quam suscipit totam nisi excepturi itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, sapiente voluptatum? Repudiandae soluta nihil placeat dolore molestias deserunt ipsam culpa harum sit fugit suscipit nostrum minima, repellat eius tenetur assumenda.</div>
              <div style={{ textDecoration: " underline", cursor: "pointer" }} >know more...</div>
            </div>
          </div>
        </div>

        <Bybrand></Bybrand>
        <Footer></Footer>

      </div>
    </>
  );
}
