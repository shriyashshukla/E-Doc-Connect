"use client"
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './style.css'; // Import CSS file for animations

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
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="relative flex flex-col items-center">
          <img
            src={`http://localhost:5000/${user.avatar}`}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-white -mt-20 mb-4 profile-img"
          />
          <div className="text-xl font-semibold">{user.name}</div>
          <div className="text-gray-500">{user.email}</div>
          <div className="mt-4">
            <a href="/Editprofile" className="text-blue-500 hover:text-blue-700 mr-4">
              <button className="btn">Edit Profile</button>
            </a>
            <a href="/userappiontment" className="text-blue-500 hover:text-blue-700">
              <button className="btn">View Appointments</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
