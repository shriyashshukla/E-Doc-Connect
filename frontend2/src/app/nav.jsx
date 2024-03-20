import React, { useContext, useState, useRef } from 'react';
import './globals.css';
import { useRouter } from 'next/navigation';




const Nav = () => {
  const backend = 'http://localhost:5000'
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const logout = () => {
    sessionStorage.removeItem("user");
    setLoggedin(false);
    router.push('/')
  };

  const [loggedin, setLoggedin] = useState(currentUser ? true : false);

  const avatarUrl = useRef(
    "https:localhost5000/uploads/"
  );


  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const userJSON = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
  const user = userJSON !== null ? userJSON : null;


  return (
    <div>
      <nav class=" bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex items-center justify-between mx-auto p-2 ">
          <a href="/">
            <div className="homebutton">

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


          < div class="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
            <div>
              <label className="popup">

                <input type="checkbox" />
                <div className="avatar_background">
                  <div className="user-picture" tabIndex={0}>
                    {loggedin ? (<img
                      src={"http://localhost:5000/" + user.avatar}
                      alt="Avatar"
                      className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
                    />) : (<><img src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" /></>)}

                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <nav className="popup-window">

                  <ul>
                    {loggedin ? (<><li>
                      <a href="Userprofile" className='nounderline'>
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
                          <span>Profile</span>
                        </button>
                      </a>
                    </li>
                      <hr />
                      <li>
                        <button onClick={logout}>
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
                    </>) : (
                      <><li>
                        <a href="Userlogin" className='nounderline'>
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
                            <span>User Login</span>
                          </button>
                        </a>
                      </li>
                        <hr />
                        <li>
                          <a href="doctorlogin" className='nounderline'>
                            <button class="button-with-svg">
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
                              <span>Doctor Login</span>
                            </button>
                          </a>
                        </li>
                        <hr />
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
                      </>
                    )}
                    <hr />



                  </ul>
                </nav>
              </label>



            </div>







            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-1 w-8 h-8 justify-center text-xs text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-2 md:p-0 mt-2 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-serif ">
              
              <li>
                <a href="#about" class="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#Features" class="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#Doctors" class="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Our Doctors</a>
              </li>
              
               <li>
                <a href="#Contact" class="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  );
}

export default Nav;
