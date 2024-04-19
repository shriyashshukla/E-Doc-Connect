"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [homeServiceAppointments, setHomeServiceAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/appointment/getall/')
      .then(response => response.json())
      .then(data => setHomeServiceAppointments(data))
      .catch(error => console.error('Error fetching home service appointments:', error));
  }, []);

  const cancelHomeServiceAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      fetch(`http://localhost:5000/booking/cancel/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setHomeServiceAppointments(prevAppointments => 
              prevAppointments.filter(appointment => appointment._id !== id)
            );
          } else {
            console.error('Error cancelling appointment:', data.message);
          }
        })
        .catch(error => {
          console.error('Error cancelling appointment:', error);
        });
    }
  };

  const rescheduleHomeServiceAppointment = (id) => {
    if (window.confirm('Are you sure you want to reschedule this appointment?')) {
      fetch(`http://localhost:5000/booking/reschedule/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          days: 1 // Reschedule for 1 day later
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Appointment rescheduled successfully');
          } else {
            console.error('Error rescheduling appointment:', data.message);
          }
        })
        .catch(error => {
          console.error('Error rescheduling appointment:', error);
        });
    }
  };

  const BookingDetails = () => {
    return (
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="bg-blue-500 px-4 py-3 mt-14">
          <h3 className="font-semibold text-lg text-white text-center">Home Service Appointments</h3>
        </div>
        <div className="px-4 py-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">User</th>
                <th className="py-2">Created At</th>
                <th className="py-2">Message</th>
                <th className="py-2">Date</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {homeServiceAppointments.map(appointment => (
                <tr key={appointment._id} className="border-b border-gray-200">
                  <td className="py-3 text-center">{appointment.user}</td>
                  <td className="py-3 text-center">{new Date(appointment.created_at).toLocaleDateString()} {new Date(appointment.created_at).toLocaleTimeString()}</td>
                  <td className="py-3 text-center">{appointment.message}</td>
                  <td className="py-3 text-center">{new Date(appointment.date).toLocaleDateString()} {new Date(appointment.date).toLocaleTimeString()}</td>
                  <td className="py-3 text-center">{appointment.phone}</td>
                  <td className="py-3 flex justify-center space-x-2">
                    <button onClick={() => cancelHomeServiceAppointment(appointment._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel</button>
                    <button onClick={() => rescheduleHomeServiceAppointment(appointment._id)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Reschedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Home Service Appointments</title>
      </Head>
      <main className="container mx-auto mt-8">
        <BookingDetails />
      </main>
    </div>
  );
}
