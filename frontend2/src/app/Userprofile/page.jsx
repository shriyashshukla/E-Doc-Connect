'use client'
import React from 'react'
import { useState, useEffect , useRef} from 'react';
import "./style.css"


const page = () => {
  const [userData, setUserData] = useState(null);

  const avatarUrl = useRef(
    "https:localhost5000/uploads/"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const userJSON = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
  const user = userJSON !== null ? userJSON : null;





  // useEffect(() => {
  //   // Fetch data from backend when the component mounts
  //   fetch('http://localhost:5000/user/getall')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Update state with the fetched data
  //       setUserData(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  const id = JSON.parse(sessionStorage.user)._id;
  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5000/user/getbyid/${user._id}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return setUserData(data);
    };
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="card procontainer ">
        <div className="card__img">
          <svg width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect height={450} width={540} fill="#ffffff" />
            <defs>
              <linearGradient
                gradientTransform="rotate(222,648,379)"
                y2="100%"
                y1={0}
                x2={0}
                x1={0}
                gradientUnits="userSpaceOnUse"
                id="a"
              >
                <stop stopColor="#ffffff" offset={0} />
                <stop stopColor="#FC726E" offset={1} />
              </linearGradient>
              <pattern
                viewBox="0 0 1080 900"
                y={0}
                x={0}
                height={250}
                width={300}
                id="b"
                patternUnits="userSpaceOnUse"
              >
                <g fillOpacity="0.5">
                  <polygon points="90 150 0 300 180 300" fill="#444" />
                  <polygon points="90 150 180 0 0 0" />
                  <polygon points="270 150 360 0 180 0" fill="#AAA" />
                  <polygon points="450 150 360 300 540 300" fill="#DDD" />
                  <polygon points="450 150 540 0 360 0" fill="#999" />
                  <polygon points="630 150 540 300 720 300" />
                  <polygon points="630 150 720 0 540 0" fill="#DDD" />
                  <polygon points="810 150 720 300 900 300" fill="#444" />
                  <polygon points="810 150 900 0 720 0" fill="#FFF" />
                  <polygon points="990 150 900 300 1080 300" fill="#DDD" />
                  <polygon points="990 150 1080 0 900 0" fill="#444" />
                  <polygon points="90 450 0 600 180 600" fill="#DDD" />
                  <polygon points="90 450 180 300 0 300" />
                  <polygon points="270 450 180 600 360 600" fill="#666" />
                  <polygon points="270 450 360 300 180 300" fill="#AAA" />
                  <polygon points="450 450 360 600 540 600" fill="#DDD" />
                  <polygon points="450 450 540 300 360 300" fill="#999" />
                  <polygon points="630 450 540 600 720 600" fill="#999" />
                  <polygon points="630 450 720 300 540 300" fill="#FFF" />
                  <polygon points="810 450 720 600 900 600" />
                  <polygon points="810 450 900 300 720 300" fill="#DDD" />
                  <polygon points="990 450 900 600 1080 600" fill="#AAA" />
                  <polygon points="990 450 1080 300 900 300" fill="#444" />
                  <polygon points="90 750 0 900 180 900" fill="#222" />
                  <polygon points="270 750 180 900 360 900" />
                  <polygon points="270 750 360 600 180 600" fill="#DDD" />
                  <polygon points="450 750 540 600 360 600" />
                  <polygon points="630 750 540 900 720 900" />
                  <polygon points="630 750 720 600 540 600" fill="#444" />
                  <polygon points="810 750 720 900 900 900" fill="#AAA" />
                  <polygon points="810 750 900 600 720 600" fill="#666" />
                  <polygon points="990 750 900 900 1080 900" fill="#999" />
                  <polygon points="180 0 90 150 270 150" fill="#999" />
                  <polygon points="360 0 270 150 450 150" fill="#444" />
                  <polygon points="540 0 450 150 630 150" fill="#FFF" />
                  <polygon points="900 0 810 150 990 150" />
                  <polygon points="0 300 -90 450 90 450" fill="#222" />
                  <polygon points="0 300 90 150 -90 150" fill="#FFF" />
                  <polygon points="180 300 90 450 270 450" fill="#FFF" />
                  <polygon points="180 300 270 150 90 150" fill="#666" />
                  <polygon points="360 300 270 450 450 450" fill="#222" />
                  <polygon points="360 300 450 150 270 150" fill="#FFF" />
                  <polygon points="540 300 450 450 630 450" fill="#444" />
                  <polygon points="540 300 630 150 450 150" fill="#222" />
                  <polygon points="720 300 630 450 810 450" fill="#AAA" />
                  <polygon points="720 300 810 150 630 150" fill="#666" />
                  <polygon points="900 300 810 450 990 450" fill="#FFF" />
                  <polygon points="900 300 990 150 810 150" fill="#999" />
                  <polygon points="0 600 -90 750 90 750" />
                  <polygon points="0 600 90 450 -90 450" fill="#666" />
                  <polygon points="180 600 90 750 270 750" fill="#AAA" />
                  <polygon points="180 600 270 450 90 450" fill="#444" />
                  <polygon points="360 600 270 750 450 750" fill="#444" />
                  <polygon points="360 600 450 450 270 450" fill="#999" />
                  <polygon points="540 600 630 450 450 450" fill="#666" />
                  <polygon points="720 600 630 750 810 750" fill="#222" />
                  <polygon points="900 600 810 750 990 750" fill="#FFF" />
                  <polygon points="900 600 990 450 810 450" fill="#222" />
                  <polygon points="0 900 90 750 -90 750" fill="#DDD" />
                  <polygon points="180 900 270 750 90 750" fill="#444" />
                  <polygon points="360 900 450 750 270 750" fill="#FFF" />
                  <polygon points="540 900 630 750 450 750" fill="#AAA" />
                  <polygon points="720 900 810 750 630 750" fill="#FFF" />
                  <polygon points="900 900 990 750 810 750" fill="#222" />
                  <polygon points="1080 300 990 450 1170 450" fill="#222" />
                  <polygon points="1080 300 1170 150 990 150" fill="#FFF" />
                  <polygon points="1080 600 990 750 1170 750" />
                  <polygon points="1080 600 1170 450 990 450" fill="#666" />
                  <polygon points="1080 900 1170 750 990 750" fill="#DDD" />
                </g>
              </pattern>
            </defs>
            <rect height="100%" width="100%" fill="url(#a)" y={0} x={0} />
            <rect height="100%" width="100%" fill="url(#b)" y={0} x={0} />
          </svg>
        </div>
          
          <div className="flex">
            <div className="profile">
              <img
                src={"http://localhost:5000/" + user.avatar}
                alt="Avatar"
                className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
              />
            </div>
          </div>
          

          <div className="card__title">{user.name}</div>
          <div className="card__subtitle">{user.email}</div>

        </div>
        <div className="card__wrapper">
          <a href="/Editprofile" className='nounderline'>
          <button className='btn'>
            Edit profile
          </button>
          </a>
          <a href="/appiontment" className='nounderline'>
          <button className='btn'>
            View appiontment
          </button>
          </a>
        </div>

      </div>
      )
}

      export default page