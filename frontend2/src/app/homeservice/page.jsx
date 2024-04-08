// pages/index.js
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './style.css';

const ServiceCard = ({ serviceDetails, onBuy }) => {
  const handleBuyClick = () => {
    const confirmation = window.confirm(`Are you sure you want to book ${serviceDetails.name}?`);
    if (confirmation) {
      onBuy(serviceDetails);
    }
  };

  return (
    <div className="card">
      <div className="image-container">
        <img src={serviceDetails.image} alt={serviceDetails.name} className="card-image" />
      </div>
      <div className="card-info">
        <p className="text-title">{serviceDetails.name}</p>
        <p className="text-body">{serviceDetails.description}</p>
      </div>
      <div className="card-footer">
        <span className="text-title">${serviceDetails.price}</span>
        <div className="card-button">
          <button className="buy-button" onClick={handleBuyClick}>Buy</button>
        </div>
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

  const displayServices = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

 
  const handleBuy = (selectedService) => {
    // Here you can implement your buy logic
    alert(`${selectedService.name} has been booked!`);

    

    // Navigate to the appointment page
    window.location.href = '/userappointment';

  };
 
    return servicesList.map((service) => (
      <ServiceCard key={service.id} serviceDetails={service} onBuy={handleBuy} />
    ));
  };

  return (
    <div className="centered-container">
      <div className="md-width">
        <div className="grid">{displayServices()}</div>
      </div>
    </div>
  );
};

export default ListServices;
