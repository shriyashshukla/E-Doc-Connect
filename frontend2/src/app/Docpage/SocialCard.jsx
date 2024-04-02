import React from 'react';
import './style.css';
import Link from 'next/link';

const handleClick = () => {
  alert('Doctor has been added to your list');
};

const SocialCard = ({ userData }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-32 h-32 object-cover md:w-48 md:h-48" src={userData.avatar} alt="User" />
        </div>
        <div className="p-4 md:p-6">
          <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">{userData.name}</div>
          <p className="block mt-1 text-sm leading-tight font-medium text-black">{userData.phone}</p>
          <p className="mt-2 text-xs text-gray-500">{userData.Spe}</p>
          <p className="mt-2 text-xs text-gray-500">{userData.socialMedia}</p>
          <div className="flex mt-3">
            <button onClick={handleClick}>Book for  consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
