"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function MyForm() {

  const [serviceList, setServiceList] = useState([]);

  const fetchServices = () => {
    fetch('http://localhost:5000/service/getall')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServiceList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const router = useRouter();

  const [formData, setFormData] = useState({
    phone:"",
    message: '',
    date: '',
    hours: '',
    minutes: '',
    ampm: 'AM' 
  });

  const schema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
    date: Yup.date().required('Date is required'),
    hours: Yup.number().required('Hours are required').min(1, 'Hours must be between 1 and 12').max(12, 'Hours must be between 1 and 12'),
    minutes: Yup.number().required('Minutes are required').min(0, 'Minutes must be between 0 and 59').max(59, 'Minutes must be between 0 and 59'),
    ampm: Yup.string().required('AM/PM selection is required')
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
     
      console.log('Form submitted:', formData);

    
      const res = await fetch('http://localhost:5000/booking/add', {
        method: 'POST',
        body: JSON.stringify(formData), 
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Nice',
          text: 'You have signed up successfully'
          
        })
          .then((result) => {
            router.push('/userappointment');
          }).catch((err) => {
            console.log(err);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!!',
          text: 'Something went wrong'
        });
      }
    
      setFormData({
        phone:"",
        message: '',
        date: '',
        hours: '',
        minutes: '',
        ampm: 'AM' 
      });
      // router.push('/homeservice'); 
    } catch (error) {
      console.error('Validation Error:', error.errors);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-96 mt-50">
        <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
          <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
          
          </span>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
         
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Select Service</label>
          <select
            id="service"
            value={formData.service}
            onChange={handleChange}
            className=" border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            required
          >
            {
              serviceList.map((service, index) => (
                <option key={index} value={service._id} className="text-gray-700">{service.name}</option>
              ))
            }
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="time" className="block text-gray-700 text-sm font-bold mr-2">Time:</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            min="1"
            max="12"
            className="appearance-none border rounded w-20 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            required
          />
          <span className="mr-1">:</span>
          <input
            type="number"
            id="minutes"
            name="minutes"
            value={formData.minutes}
            onChange={handleChange}
            min="0"
            max="59"
            className="appearance-none border rounded w-20 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            required
          />
          <select
            id="ampm"
            name="ampm"
            value={formData.ampm}
            onChange={handleChange}
            className="appearance-none border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            required
          >
            <option value="AM" className="text-gray-700">AM</option>
            <option value="PM" className="text-gray-700">PM</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
  );
}
export default MyForm;
