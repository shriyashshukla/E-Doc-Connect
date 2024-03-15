
'useState'
import React from 'react';
import './page.module.css'; // Import the CSS file
import Image from '../../public/hero-bg.jpg';
import Card from './Features/page';
import Gallery from './Gallery/page';
import About from './About/page';
import Doctors from './Doctors/page';
import TestimonialsPage from './Testimonials/page';
import Contact from './Contact/page';
import Counter from './Components/counter/Counter';




const Page = () => {
  return (
    <>
    <div>
    <div className="page-background" style={{ position: '' }}>
      <img src="hero-bg.jpg" alt="" className="page-image" style={{ width: '100%', height: 'auto' }} />
      <div className="text-overlay" style={{ position: 'absolute', top: '40%', left: '55%', transform: 'translate(-120%, -50%)', textAlign: 'center', color: 'rgb(54, 196, 236)' }}>
        <h1>Welcome to our MedAssure</h1>
        <div className="text-overlay" style={{color: 'black' }}><p>Care for U!</p></div>
        <div>
          <a href="Option">
          <button className='nav-button  hover-button'>GET STARTED</button></a>
          </div> 
      </div>
    </div>
    <About/>
    </div>
    <Card/>
    <Counter/>
    <Doctors/>
    <TestimonialsPage/>
    <Gallery/>
   
    <Contact/>
    </>
  );
}

export default Page;
