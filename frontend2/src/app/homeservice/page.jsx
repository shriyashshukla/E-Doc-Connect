// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ServiceCard = ({ serviceDetails }) => {
  const router = useRouter();

  const handleBuyClick = () => {
    const confirmation = window.confirm(`Are you sure you want to book ${serviceDetails.name}?`);
    if (confirmation) {
      // Navigate to the form page
      router.push('/Form');
    }
  };

  return (
    <div className="w-64 h-80 bg-gray-100 p-4 rounded-lg shadow-md m-4 mt-5">
      <div className="h-32 overflow-hidden">
        <img src={serviceDetails.image} alt={serviceDetails.name} className="w-full h-full object-cover" />
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold">{serviceDetails.name}</p>
        <p className="text-gray-600">{serviceDetails.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold">${serviceDetails.price}</span>
        <button onClick={handleBuyClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">Buy</button>
      </div>
    </div>
  );
};

const ListServices = () => {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    fetch(`http://localhost:5000/service/getall`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServicesList(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="flex justify-center items-start flex-wrap py-8">
      {loading && <p>Loading...</p>}
      {servicesList.map((service) => (
        <ServiceCard key={service.id} serviceDetails={service} />
      ))}
    </div>
  );
};

export default ListServices;
