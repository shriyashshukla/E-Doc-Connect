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
          <div>
            <button class="button">
              Button
            </button>
          </div>

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
          <div class="img">
            <img src="doctros-1.jpg" alt="Description" />
          </div>
          <span>Person</span>
          <p class="job">Job Title</p>
          <button>Click</button>
        </div>
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



      <form className="form">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input className="input" type="text" placeholder="" required="" />
            <span>Firstname</span>
          </label>
          <label>
            <input className="input" type="text" placeholder="" required="" />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input className="input" type="email" placeholder="" required="" />
          <span>Email</span>
        </label>
        <label>
          <input className="input" type="password" placeholder="" required="" />
          <span>Password</span>
        </label>
        <label>
          <input className="input" type="password" placeholder="" required="" />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <a href="#">Signin</a>{" "}
        </p>
      </form>







    </>

  );
}


