"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const Page = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const router = useRouter();
  const { id } = useParams();

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

  // Sample availability data - replace this with your actual availability data
  const availabilityData = [
    { date: '2024-04-15', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
    { date: '2024-04-16', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
    { date: '2024-04-17', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
    // Add more dates and slots as needed
  ];

  const handleShowAvailability = () => {
    setShowAvailability(true);
  };

  const handleDateTimeSelection = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  const handleBooking = () => {
    // Add your booking logic here
    alert(`Booking doctor for ${selectedDateTime}`);
    // Redirect to user profile page
    router.push('/userappointment');
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 py-2">Date</th>
                  <th className="border-b-2 border-gray-300 py-2">Available Slots</th>
                </tr>
              </thead>
              <tbody>
                {availabilityData.map((daySlot, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {daySlot.date}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <ul className="list-disc list-inside">
                        {daySlot.slots.map((slot, slotIndex) => (
                          <li key={slotIndex}>
                            <button onClick={() => handleDateTimeSelection(`${daySlot.date} ${slot}`)} className="text-blue-500 hover:underline">
                              {slot}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedDateTime && (
            <button onClick={handleBooking} className="block mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Book Appointment
            </button>
          )}
        </div>
      )}

      {selectedDateTime && (
        <div className="mt-4">
          <p>Selected Date and Time: {selectedDateTime}</p>
          {/* Additional booking form or functionality can be added here */}
        </div>
      )}
    </div>
  );
};

export default Page;
