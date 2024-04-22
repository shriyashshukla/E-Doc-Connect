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
    fetch('http://localhost:5000/appointment/getbyuser/'+currentuser._id)
      .then(response => response.json())
      .then(data => {
        const appointmentsWithMeetUrl = data.map(appointment => ({
          ...appointment,
          meetUrl: `https://meet.google.com/qye-tyws-zic${appointment.meetCode}`
        }));
        setDoctorAppointments(appointmentsWithMeetUrl);
      })
      .catch(error => console.error('Error fetching doctor appointments:', error));

    fetch('http://localhost:5000/booking/getbyuser/' + currentuser._id)
      .then(response => response.json())
      .then(data => setHomeServiceAppointments(data))
      .catch(error => console.error('Error fetching home service appointments:', error));
  }, []);

  const joinDoctorAppointment = (id) => {
    const appointment = doctorAppointments.find(appointment => appointment.id === id);
    if (appointment && appointment.meetUrl) {
      window.open(appointment.meetUrl, '_blank');
    } else {
      alert('No meeting URL found for this appointment.');
    }
  };

  const cancelHomeServiceAppointment = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to cancel this home service appointment?');
    
    if (isConfirmed) {
      const updatedAppointments = homeServiceAppointments.filter(appointment => appointment._id !== id);
      setHomeServiceAppointments(updatedAppointments);
    }
  };

  const cancelDoctorAppointment = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to cancel this appointment?');
    
    if (isConfirmed) {
      const updatedAppointments = doctorAppointments.filter(appointment => appointment._id !== id);
      setDoctorAppointments(updatedAppointments);
    }
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

      <main className="w-full max-w-7xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="bg-blue-500 px-4 py-3">
              <h3 className="font-semibold text-lg text-white text-center">Doctor Appointments</h3>
            </div>
            <div className="px-4 py-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-4 border">Doctor</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Time</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorAppointments.map(appointment => (
                    <tr key={appointment._id} className="border-b">
                      <td className="py-3 px-4">{appointment.doctor.name}</td>
                      <td className="py-3 px-4">{new Date(appointment.slot.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{appointment.slot.time}</td>
                      <td className="py-3 px-4 flex justify-center space-x-2">
                        <button onClick={() => cancelDoctorAppointment(appointment._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel</button>
                        <button onClick={() => joinDoctorAppointment(appointment._id)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Join</button>
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
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="py-2 px-4 border">Date/Time</th>
                    <th className="py-2 px-4 border">Message</th>
                    <th className="py-2 px-4 border">Phone</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {homeServiceAppointments.map(appointment => (
                    <tr key={appointment._id} className="border-b">
                      <td className="py-3 px-4">{new Date(appointment.created_at).toLocaleString()}</td>
                      <td className="py-3 px-4">{appointment.message}</td>
                      <td className="py-3 px-4">{appointment.phone}</td>
                      <td className="py-3 px-4 flex justify-center space-x-2">
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
