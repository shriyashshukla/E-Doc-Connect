import React from 'react';

import './globals.css'; 

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a href="/">
        <div className="button">
          
  <div className="box">M</div>
  <div className="box">E</div>
  <div className="box">D</div>
  <div className="box">A</div>
  <div className="box">S</div>
  <div className="box">S</div>
  <div className="box">U</div>
  <div className="box">R</div>
  <div className="box">E</div>
</div>
</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#about">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Card">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Doctors">Doctors</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Contact">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Departments
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
         <div>
          <a href="login">
          <button className='but hover-button'>Appointment</button>
          </a>
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default Nav;
