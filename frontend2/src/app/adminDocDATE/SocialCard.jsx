'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SocialCard = ({ userData }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/availableDocform/${userData._id}`);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-sm m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-32 h-32 object-cover md:w-48 md:h-48" src={`http://localhost:5000/${userData.avatar}`} alt="User" />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-indigo-500">{userData.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{userData.phone}</p>
            <p className="mt-2 text-sm text-gray-600">{userData.Spe}</p>
            <p className="mt-2 text-sm text-gray-600">{userData.socialMedia}</p>
          </div>
          <div className="mt-4">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={handleClick}>
              Add Date and Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
