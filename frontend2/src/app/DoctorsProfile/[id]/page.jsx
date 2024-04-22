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
  const { id } = useParams();
  const [selSlot, setSelSlot] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  
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
  useEffect(() => {
    fetchDoctorData();
    fetchDoctorSlot();
  }, [id]);

  const handleShowAvailability = () => {
    setShowAvailability(true);
  };


  const handleBooking = async () => {
    if (selSlot === null)  {
      alert('Please select a date and time first.');
      return;
    }

    try {
      const bookingData = {
        user: currentUser._id,
        doctor: id,
        slot: slotData[selSlot]._id
      };

      const response = await axios.post('http://localhost:5000/appointment/add', bookingData);
      console.log(response.status);
      if (response.status === 200) {
        const res2 = await axios.put(`http://localhost:5000/slot/update/${slotData[selSlot]._id}`, { booked: true, status: 'booked' });
        console.log(res2.status);
        if(res2.status === 200){
          fetchDoctorSlot();
        }
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
      <>
      <div className="flex justify-start w-full">
       

          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date and Time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slotData.map((slot, index) => (
                <tr key={slot._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {new Date(slot.date).toLocaleDateString()} {new Date(slot.date).toLocaleTimeString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {slot.duration} hour
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    {slot.booked ? (
                      <span className="text-red-500">Booked</span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <button disabled={slot.booked} onClick={() => { setSelSlot(index) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      {index === selSlot ? 'Selected' : 'Select Slot'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

         
         
        </div>
        {selSlot !== null && (
        <button onClick={handleBooking} className="block mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
          Book Appointment
        </button>
      )}
      
          </>
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
