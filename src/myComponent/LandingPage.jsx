import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import landingImage from './landingImage.json'
import { Navbar } from './navbar';
import { Footer } from './Footer'
import { Bycategory } from './Bycategory';
import category from './category.json'

export const LandingPage = () => {
  const images=[
    {
      id:1,
      url:"https://www.peesafe.com/cdn/shop/files/Brand_Cards_Pee_Safe_28aaa2d0-26a6-4dbe-bec5-974d8c503cfe_415x.jpg?v=1644419276"

    },
    {
      id:2,
      url:"https://files.thesirona.com/site-images/1200x1200/Collection-Banner-(Best-Seller)_1.jpg"

    },
    {
      id:3,
      url:"https://images.ctfassets.net/285b4h6rshof/3Kz3FC7yS1XlQNwjBLO7GY/ad98edd74a76c65def4745f45a6e4e42/Home_Page_Banner_Our_No1_Protection_Range_Tab_2x.png"

    },
    {
      id:4,
      url:"https://www.jnjconsumer.co.za/sites/brandhub_za/files/taco-images/03-stayfree-taco-cards-pads-ultra-thin-r2-small.png"

    },
    {
      id:5,
      url:"https://cdn.shopify.com/s/files/1/1375/4957/files/freedom_L_banner_970x300.jpg?v=1598024747"

    }

  ]
  

  const scrollLeft = () => {
    let box = document.querySelector("#box-container");
    // console.log(box);
    let width = box.clientWidth;
    console.log(width);

    box.scrollLeft =  box.scrollLeft-400;
  };
 
  const scrollRight=()=>{
    let box = document.querySelector("#box-container");
    let width = box.clientWidth;
    box.scrollLeft =  box.scrollLeft+400;

  }
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

        <div className='sec-aboutus'>
          <h2 className='about-heading'>Our Story</h2>
          <div className='about-box'>
            <div className='about-img'>
              <img src="https://cdn.shopify.com/s/files/1/0055/7855/5503/files/Journey_banner-01_copy_-_Copy_2048x.jpg?v=1648016934" alt="" />
            </div>
            <div className='about-text'>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam at cumque iure tempora dolores soluta alias voluptas necessitatibus quis esse id molestias, maxime facere quam suscipit totam nisi excepturi itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, sapiente voluptatum? Repudiandae soluta nihil placeat dolore molestias deserunt ipsam culpa harum sit fugit suscipit nostrum minima, repellat eius tenetur assumenda.</div>
              <div style={{ textDecoration: " underline", cursor: "pointer" }} >know more...</div>
            </div>
          </div>
        </div>

        <div className='sec-brand'>
          <h2 className='brand-heading'>Explore by Brand</h2>
          <section>
            <div className='carousel-brand'>
              <div className='next-prev'>
              <button className='prev' onClick={scrollLeft}><p>&lt;</p></button>
              <button className='next' onClick={scrollRight}><p>&gt;</p></button>
              </div>
             <div className='all-container' id='box-container'>
             {
                images.map((i) => {
                  return (
                    <div className='container-brand'>
                      <img src={i.url} alt="" />
                    </div>
                  )

                })
              }
             </div>
              
            </div>
          </section>
        </div>
        <Footer></Footer>

      </div>
    </>
  );
}
