import React from 'react';
import './page.module.css'; // Import the CSS file
import Image from '../../public/hero-bg.jpg';
import Card from './Card/page';

const Page = () => {
  return (
    <>
    <div className="page-background" style={{ position: 'relative' }}>
      <img src="hero-bg.jpg" alt="A person sitting on a bench" className="page-image" style={{ width: '100%', height: 'auto' }} />
      <div className="text-overlay" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-120%, -50%)', textAlign: 'center', color: 'rgb(54, 196, 236)' }}>
        <h1>Welcome to our Website</h1>
        <div className="text-overlay" style={{color: 'black' }}><p>Discover amazing things here!</p></div>
        
       
        <div>
          <button className='butt hover-button'>HOVER ME</button>
          </div>
        
      </div>
      
    </div>
    <Card/>
    <comments/>
    
    </>
  );
}

export default Page;
