import React from 'react';

const Admin = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center mt-28">
        <a href="addhomeservice" className="m-4 p-8 w-64 h-32 bg-red-500 rounded-lg text-white flex items-center justify-center hover:bg-red-600 transition duration-300">
          <p className="text-xl font-semibold">Add Home Services</p>
        </a>

        <a href="adddoctor" className="m-4 p-8 w-64 h-32 bg-blue-500 rounded-lg text-white flex items-center justify-center hover:bg-blue-600 transition duration-300">
          <p className="text-xl font-semibold">Add Doctors list</p>
        </a>

        <a href="/Bookingdetails" className="m-4 p-8 w-64 h-32 bg-green-500 rounded-lg text-white flex items-center justify-center hover:bg-green-600 transition duration-300">
          <p className="text-xl font-semibold">Check All the Home Service Booked</p>
        </a>

        <a href="/adminDocDATE" className="m-4 p-8 w-64 h-32 bg-yellow-500 rounded-lg text-white flex items-center justify-center hover:bg-yellow-600 transition duration-300">
          <p className="text-xl font-semibold">Add Date for Appointment Booking</p>
        </a>

        <a href="/allDocbooking" className="m-4 p-8 w-64 h-32 bg-red-500 rounded-lg text-white flex items-center justify-center hover:bg-red-600 transition duration-300">
          <p className="text-xl font-semibold">Check all the Doctor Booking</p>
        </a>
      </div>
    </>
  );
};

export default Admin;
