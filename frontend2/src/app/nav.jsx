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
      <label className="popup">
 
      <input type="checkbox" />
  <div className="user-picture" tabIndex={0}>
  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
        </svg>
    <span />
    <span />
    <span />
    
  </div>
  
  <nav className="popup-window">
    
    <ul>
      <li>
        <a href="login" className='nounderline'>
        <button>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle r={4} cy={7} cx={9} />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Login</span>
        </button>
        </a>
      </li>
      <li>
        <a href="signup" className='nounderline'>
        <button>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>Sign up</span>
        </button>
        </a>
      </li>
      <hr />
      {/* <li>
        <button>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect ry={2} rx={2} height={13} width={13} y={9} x={9} />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Check </span>
        </button>
      </li> */}
      <li>
        <button>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
          </svg>
          <span>Edit Profile</span>
        </button>
      </li>
      <hr />
      <li>
        <button>
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={14}
            width={14}
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y2={18} x2={6} y1={6} x1={18} />
            <line y2={18} x2={18} y1={6} x1={6} />
          </svg>
          <span>Log Out</span>
        </button>
      </li>
    </ul>
  </nav>
</label>

        
        
      </div>

        </div>
      </nav>
    </div>
  );
}

export default Nav;
