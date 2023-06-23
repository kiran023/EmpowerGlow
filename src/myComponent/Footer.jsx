import React from 'react'


export const Footer = () => {
  return (
    <footer style={{marginTop:"5%"}}>
        <div className='foot-sec1' style={{display:"flex",padding:"5% 0%"}}>
            <div className='foot-sub1'>
                <h1>Since you're already here, lets take your hygiene up a notch.</h1>
                <div className='foot-mail'><input type="text"  placeholder='Write your email here'/>
                <button className='foot-btn'>Subscribe</button>
                </div>
            </div>
            <div className='foot-sub2'>
                <h1>Follow Us Here</h1>
                <div className='social-media'>
                <ion-icon name="logo-facebook" ></ion-icon>
                <ion-icon name="logo-instagram" ></ion-icon>
                <ion-icon name="logo-linkedin" ></ion-icon>
                <ion-icon name="logo-github" ></ion-icon>
                </div>
            </div>
        </div > 

        <div className='foot-sec2' style={{display:"flex"}}>
            <div className='usefullinks' style={{width:"50%", marginLeft:"5%"}}>
                <h2>Useful Links</h2>
                <div className='foot-link'>About Us</div>
                <div className='foot-link'>Contact Us</div>
                <div className='foot-link'>Term and Conditions</div>
                <div className='foot-link'>product</div>
                <div className='foot-link'>brand</div>
                <div className='foot-link'>bestseller</div>
                <div className='foot-link'>blog</div>
            </div>
            <div className='find-us'style={{width:"50%" ,marginLeft:"5%"}}>
                <h2>Find Us</h2>
                <div>
                <ion-icon name="location-outline"></ion-icon>
                <div>Maulana Azad National Institue of bhopal</div>
                <div>9876789872</div>
                </div>
            </div>

        </div>
       
    </footer>
  );
}
