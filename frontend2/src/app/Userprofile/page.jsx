'use client';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './style.css';

const Page = () => {
  const [userData, setUserData] = useState(null);
  const avatarUrl = useRef('http://localhost:5000/uploads/');
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const userJSON = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
  const user = userJSON !== null ? userJSON : null;

  const id = JSON.parse(sessionStorage.user)._id;
  
  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5000/user/getbyid/${user._id}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="card procontainer">
        <div className="card__img">
          <svg width="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Your SVG content */}
          </svg>
        </div>

        <div className="flex">
          <div className="profile">
            <img
              src={`http://localhost:5000/${user.avatar}`}
              alt="Avatar"
              className="w-40 h-40 rounded-full border-2 border-gray-400"
            />
          </div>
        </div>

        <div className="card__title mt-10 font-medium text-lg text-black">{user.name}</div>
        <div className="card__subtitle font-normal text-base text-gray-500">{user.email}</div>
      </div>
      
      <div className="mt-4">
        <a href="/Editprofile" className="text-blue-500 hover:text-blue-700 mr-4">
          <button className="btn">
            Edit Profile
          </button>
        </a>
        <a href="/appiontment" className="text-blue-500 hover:text-blue-700">
          <button className="btn">
            View Appointments
          </button>
        </a>
      </div>
    </div>
  );
};

export default Page;
