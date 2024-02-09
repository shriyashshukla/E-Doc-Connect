import React from 'react';
import styles from "./page.module.css";
import Image from '../../public/hero-bg.jpg';



export default function Home() {
  return (
    <>
      <div className="page-background">
        <img src="hero-bg.jpg" alt="Hero Background" className="centered-image" />
        <div className="left-content">
          <h1 className="centered-text">Welcome to the MedAssure</h1>
          <p className="centered-text2">Your Health, Our Assurance</p>
          <button className="get-started-button">Get Started</button>
        </div>

      </div>

      <div className="main-card-container">
        <div className="Main-card">
          <a className="Main-card1" href="#">
            <p>This is heading</p>
            <p className="small">
              Card description with lots of great facts and interesting details.
            </p>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>
        <div className="Main-card">
          <a className="Main-card1" href="#">
            <p>This is heading</p>
            <p className="small">
              Card description with lots of great facts and interesting details.
            </p>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>
        <div className="Main-card">
          <a className="Main-card1" href="#">
            <p>This is heading</p>
            <p className="small">
              Card description with lots of great facts and interesting details.
            </p>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>
        <div className="Main-card">
          <a className="Main-card1" href="#">
            <p>This is heading</p>
            <p className="small">
              Card description with lots of great facts and interesting details.
            </p>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </a>
        </div>

      </div>
      <h1>Our Doctors</h1>
      <div class="dcard-container">
        <div class="dcard">
          <div class="card-border-top"></div>
          <div class="img"></div>
          <span>Person</span>
          <p class="job">Job Title</p>
          <button>Click</button>
        </div>
        <div className='dcard-container'>
        <div class="dcard">
          <div class="card-border-top"></div>
          <div class="img"></div>
          <span>Person</span>
          <p class="job">Job Title</p>
          <button>Click</button>
        </div>
        </div>
      </div>
      
      

      



    </>

  );
}


