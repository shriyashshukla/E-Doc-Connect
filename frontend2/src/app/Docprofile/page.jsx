"use client"
import  { useState, useEffect } from 'react';


export default function DoctorForm() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    hospital: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      specialization: '',
      email: '',
      phone: '',
      address: '',
      hospital: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Doc profile</h2>
      
    </div>
  );
}
