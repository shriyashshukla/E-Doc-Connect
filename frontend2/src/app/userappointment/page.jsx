"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [homeServiceAppointments, setHomeServiceAppointments] = useState([]);
  const [currentuser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  );


  useEffect(() => {
    fetch('http://localhost:5000/appointment/getall')
      .then(response => response.json())
      .then(data => setDoctorAppointments(data))
      .catch(error => console.error('Error fetching doctor appointments:', error));

    fetch('http://localhost:5000/booking/getbyuser/' + currentuser._id)
      .then(response => response.json())
      .then(data => setHomeServiceAppointments(data))
      .catch(error => console.error('Error fetching home service appointments:', error));
  }, []);

  const cancelDoctorAppointment = (id) => {
    setDoctorAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
  };

  const joinDoctorAppointment = (id) => {
    alert(`Joining appointment with ID ${id}`);
  };

  const cancelHomeServiceAppointment = (id) => {
    fetch(`http://localhost:5000/booking/delete/${id}`, { method: 'DELETE' })
    // setHomeServiceAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
  };

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

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="bg-green-500 px-4 py-3">
              <h3 className="font-semibold text-lg text-white text-center">Home Service Appointments</h3>
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Date/Time</th>
                    <th className="py-2">Message</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {homeServiceAppointments.map(appointment => (
                    <tr key={appointment.id} className="border-b border-gray-200">

                      <td className="py-3 text-center">{new Date(appointment.created_at).toLocaleDateString()} {new Date(appointment.created_at).toLocaleTimeString()}</td>
                      <td className="py-3 text-center">{appointment.message}</td>
                      <td className="py-3 text-center">{new Date(appointment.date).toLocaleDateString()} {new Date(appointment.date).toLocaleTimeString()}</td>
                      <td className="py-3 text-center">{appointment.phone}</td>
                      <td className="py-3 flex justify-center space-x-2">
                        <button onClick={() => cancelHomeServiceAppointment(appointment._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel</button>
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
