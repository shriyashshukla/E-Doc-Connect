'use client';
import React from 'react';
import './style.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const SocialCard = ({ userData }) => {
  
  const router = useRouter();

  const handleClick = () => {
    // alert('Doctor has been added to your list');
    router.push('/availableDocform/'+userData._id);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-32 h-32 object-cover md:w-48 md:h-48" src={`http://localhost:5000/${userData.avatar}`} alt="User" />
        </div>
        <div className="p-4 md:p-6">
          <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">{userData.name}</div>
          <p className="block mt-1 text-sm leading-tight font-medium text-black">{userData.phone}</p>
          <p className="mt-2 text-xs text-gray-500">{userData.Spe}</p>
          <p className="mt-2 text-xs text-gray-500">{userData.socialMedia}</p>
          <div className="flex mt-3">
            <button onClick={handleClick}>Add Date and Time </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
