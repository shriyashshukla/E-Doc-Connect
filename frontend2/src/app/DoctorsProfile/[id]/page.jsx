"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const Page = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [slotData, setSlotData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

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

    const fetchDoctorSlot = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/slot/getbydoctor/${id}`);
        if (response.status === 200) {
          setSlotData(response.data);
        }
      } catch (error) {
        console.error('Error fetching slot data:', error);
      }
    };

    fetchDoctorData();
    fetchDoctorSlot();
  }, [id]);

  const handleShowAvailability = () => {
    setShowAvailability(true);
  };

  const handleDateTimeSelection = (slotId) => {
    setSelectedSlotId(slotId);
    setSelectedDoctorId(id);
    const selectedSlot = slotData.find(slot => slot._id === slotId);
    setSelectedDateTime(new Date(selectedSlot.date));
  };

  const handleBooking = async () => {
    if (!selectedDateTime || !selectedDoctorId || !selectedSlotId) {
      alert('Please select a date and time first.');
      return;
    }

    try {
      const bookingData = {
        doctorId: selectedDoctorId,
        slotId: selectedSlotId,
        dateTime: selectedDateTime.toISOString(),
      };

      const response = await axios.post('http://localhost:5000/appointment/add', bookingData);

      if (response.status === 201) {
        alert('Booking successful!');
        router.push('/userappointment');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred while booking the appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
        {doctorData && (
          <>
            <img
              src={`http://localhost:5000/${doctorData.avatar}`}
              alt="Avatar"
              className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-gray-200"
            />
            <h2 className="text-xl font-semibold text-center mb-2">{doctorData.name}</h2>
            <p className="text-gray-600 text-sm text-center mb-4">{doctorData.email}</p>
            <p className="text-gray-600 text-sm text-center mb-4">{doctorData.specialty}</p>
            <button onClick={handleShowAvailability} className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Check Availability
            </button>
          </>
        )}
      </div>

      {showAvailability && (
        <div className="max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Select Date and Time for Booking</h3>

          {slotData.map(slot => (
            <div key={slot._id} className="flex justify-between items-center border-b border-gray-200 py-2">
              <p>{new Date(slot.date).toLocaleDateString()} {new Date(slot.date).toLocaleTimeString()}</p>
              <p>{slot.duration}</p>
              <button onClick={() => handleDateTimeSelection(slot._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Select
              </button>
            </div>
          ))}

          {selectedDateTime && (
            <button onClick={handleBooking} className="block mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Book Appointment
            </button>
          )}
        </div>
      )}

      {selectedDateTime && (
        <div className="mt-4">
          <p>Selected Date and Time: {selectedDateTime.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
