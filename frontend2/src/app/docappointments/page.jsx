"use client"
import React, { useEffect, useState } from 'react';

const AppointmentCard = ({ doctorName, appointmentTime, slot, status }) => {
  // Define a status color based on the appointment status
  let statusColor = '';
  switch (status) {
    case 'pending':
      statusColor = 'text-yellow-600';
      break;
    case 'confirmed':
      statusColor = 'text-green-600';
      break;
    case 'cancelled':
      statusColor = 'text-red-600';
      break;
    default:
      statusColor = 'text-gray-600';
  }

  // Get current time and appointment time
  const currentTime = new Date();
  const appointmentDateTime = new Date(appointmentTime);

  // Determine if the appointment time has passed
  const isPastAppointment = currentTime > appointmentDateTime;

  const handleReschedule = () => {
    console.log('Reschedule button clicked');
    // Add logic to handle rescheduling
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    // Add logic to handle cancellation
  };

  const handleJoin = () => {
    console.log('Join button clicked');
    // Add logic to handle joining appointment
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{doctorName}</h2>
      <p className={`text-gray-600 mb-2 ${statusColor}`}>Appointment Time: {appointmentTime}</p>
      <p className={`text-gray-600 mb-2 ${statusColor}`}>Slot: {slot}</p>
      {status === 'confirmed' && !isPastAppointment && (
        <>
          <button onClick={handleReschedule} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Reschedule
          </button>
          <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Cancel
          </button>
        </>
      )}
      {status === 'confirmed' && (
        <button onClick={handleJoin} disabled={isPastAppointment} className={`bg-green-500 text-white px-4 py-2 rounded ${isPastAppointment ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {isPastAppointment ? 'Join (Available at Appointment Time)' : 'Join'}
        </button>
      )}
    </div>
  );
};

const DateCard = ({ date, appointments }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-8">
      <h2 className="text-lg font-semibold mb-2">{date}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            doctorName={appointment.doctorName}
            appointmentTime={appointment.appointmentTime}
            slot={appointment.slot}
            status={appointment.status}
          />
        ))}
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  // Dummy data for demonstration
  const appointmentsByDate = [
    {
      date: '2024-04-01',
      appointments: [
        { doctorName: 'Dr. Smith', appointmentTime: '2024-04-01T10:00:00', slot: 'Morning', status: 'confirmed' },
        { doctorName: 'Dr. Johnson', appointmentTime: '2024-04-01T14:00:00', slot: 'Afternoon', status: 'confirmed' },
      ],
    },
    {
      date: '2024-04-02',
      appointments: [
        { doctorName: 'Dr. Patel', appointmentTime: '2024-04-02T16:00:00', slot: 'Evening', status: 'confirmed' },
      ],
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Doctor Appointments</h1>
      {appointmentsByDate.map((dateData, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{dateData.date}</h2>
          <DateCard date={dateData.date} appointments={dateData.appointments} />
        </div>
      ))}
    </div>
  );
};

export default AppointmentsPage;
