// pages/index.js
"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  // Sample data for appointments
  const [doctorAppointments, setDoctorAppointments] = useState([
    { id: 1, doctor: "Dr. Smith", date: "March 30, 2024", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Johnson", date: "April 1, 2024", time: "11:30 AM" },
  ]);

  const [homeServiceAppointments, setHomeServiceAppointments] = useState([
    { id: 1, day: "Monday", time: "2:00 PM", address: "123 Main St", phone: "555-1234" },
    { id: 2, day: "Wednesday", time: "10:00 AM", address: "456 Elm St", phone: "555-5678" },
  ]);

  // Function to cancel doctor appointment
  const cancelDoctorAppointment = (id) => {
    setDoctorAppointments(doctorAppointments.filter(appointment => appointment.id !== id));
  };

  // Function to join doctor appointment
  const joinDoctorAppointment = (id) => {
    alert(`Joining appointment with ID ${id}`);
  };

  // Function to cancel home service appointment
  const cancelHomeServiceAppointment = (id) => {
    setHomeServiceAppointments(homeServiceAppointments.filter(appointment => appointment.id !== id));
  };

  // Function to schedule home service appointment
  const scheduleHomeServiceAppointment = () => {
    alert("Scheduling home service appointment");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Appointment App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Doctor appointments card */}
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="bg-blue-500 px-4 py-3">
              <h3 className="font-semibold text-lg text-white text-center">Doctor Appointments</h3>
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Doctor</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping through doctor appointments */}
                  {doctorAppointments.map(appointment => (
                    <tr key={appointment.id} className="border-b border-gray-200">
                      <td className="py-3 text-center">{appointment.doctor}</td>
                      <td className="py-3 text-center">{appointment.date}</td>
                      <td className="py-3 text-center">{appointment.time}</td>
                      <td className="py-3 flex justify-center space-x-2">
                        <button onClick={() => cancelDoctorAppointment(appointment.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel</button>
                        <button onClick={() => joinDoctorAppointment(appointment.id)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Join</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Home service appointments card */}
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="bg-green-500 px-4 py-3">
              <h3 className="font-semibold text-lg text-white text-center">Home Service Appointments</h3>
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Day</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Address</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping through home service appointments */}
                  {homeServiceAppointments.map(appointment => (
                    <tr key={appointment.id} className="border-b border-gray-200">
                      <td className="py-3 text-center">{appointment.day}</td>
                      <td className="py-3 text-center">{appointment.time}</td>
                      <td className="py-3 text-center">{appointment.address}</td>
                      <td className="py-3 text-center">{appointment.phone}</td>
                      <td className="py-3 flex justify-center space-x-2">
                        <button onClick={() => cancelHomeServiceAppointment(appointment.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button onClick={scheduleHomeServiceAppointment} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Schedule Home Service</button>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}