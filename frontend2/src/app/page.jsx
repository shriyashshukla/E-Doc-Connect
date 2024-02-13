import React from 'react';
import './page.module.css'; // Import the CSS file
import Image from '../../public/hero-bg.jpg';

const Page = () => {
  return (
    <>
    <div className="page-background" style={{ position: 'relative' }}>
      <img src="hero-bg.jpg" alt="A person sitting on a bench" className="page-image" style={{ width: '100%', height: 'auto' }} />
      <div className="text-overlay" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-120%, -50%)', textAlign: 'center', color: 'blue' }}>
        <h1>Welcome to our Website</h1>
        <p>Discover amazing things here!</p>
        
      </div>
    </div>
    </>
  );
}

export default Page;
