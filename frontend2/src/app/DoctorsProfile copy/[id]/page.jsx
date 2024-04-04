"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const Page = () => {
  const [doctorData, setDoctorData] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctor/getbyid/${id}`);
        if (response.status === 200) {
          setDoctorData(response.data);
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctorData();
  }, []);

  // const doctorJSON = sessionStorage.doctor ? JSON.parse(sessionStorage.doctor) : null;
  // const doctor = doctorJSON !== null ? doctorJSON : null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300">
      {doctorData && (
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
          <img
            src={`http://localhost:5000/${doctorData.avatar}`}
            alt="Avatar"
            className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-gray-200"
          />
          <h2 className="text-xl font-semibold text-center mb-2">{doctorData.name}</h2>
          <p className="text-gray-600 text-sm text-center mb-4">{doctorData.email}</p>
          <p className="text-gray-600 text-sm text-center mb-4">{doctorData.specialty}</p>
        
        </div>
      )}
    </div>
  );
};

export default Page;
