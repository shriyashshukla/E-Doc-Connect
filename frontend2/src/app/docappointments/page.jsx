"use client"
import React, { useEffect, useState } from 'react';

const AppointmentCard = ({ user, slot, onDelete, onReschedule }) => {
  let statusColor = '';
  switch (slot.status) {
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

  const currentTime = new Date();
  const appointmentDateTime = new Date(slot.appointmentTime);
  const isPastAppointment = currentTime > appointmentDateTime;

  const [showModal, setShowModal] = useState(false);

  const handleReschedule = () => {
    setShowModal(true);
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmCancel) {
      try {
        const response = await fetch(`http://localhost:5000/appointment/${slot._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(slot._id);
        } else {
          console.error('Failed to cancel appointment');
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  const handleJoin = () => {
    window.location.href = 'https://meet.google.com/itb-foou-kdq?authuser=0';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className={`text-gray-600 mb-2 ${statusColor}`}>Appointment Time: {slot.appointmentTime}</p>
      {!isPastAppointment && (
        <>
          <button onClick={handleReschedule} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Reschedule
          </button>
          <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Cancel
          </button>
        </>
      )}
      {!isPastAppointment && (
        <button onClick={handleJoin} className="bg-green-500 text-white px-4 py-2 rounded">
          Join
        </button>
      )}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
            
            <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DateCard = ({ appointment, onDelete, onReschedule }) => {
  const { user, slot } = appointment;

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-8">
      <h2 className="text-lg font-semibold mb-2">{new Date(slot.date).toLocaleDateString()}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppointmentCard
          user={user}
          slot={slot}
          onDelete={onDelete}
          onReschedule={onReschedule}
        />
      </div>
    </div>
  );
};

const AppointmentsPage = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(JSON.parse(sessionStorage.getItem('doctor')));
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`http://localhost:5000/appointment/getbydoctor/${currentDoctor._id}`);
      const data = await response.json();
      setAppointmentList(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const onDelete = (deletedId) => {
    setAppointmentList(prevAppointments => prevAppointments.filter(appointment => appointment.slot._id !== deletedId));
  };

  const onReschedule = (rescheduledSlot) => {
    // Implement rescheduling logic here, e.g., showing a date picker modal
    console.log('Rescheduling slot:', rescheduledSlot);
  };

  const onViewAppointments = (date) => {
    setSelectedDate(date);
    const filtered = appointmentList.filter(
      (appointment) => new Date(appointment.slot.date).toLocaleDateString() === new Date(date).toLocaleDateString()
    );
    setFilteredAppointments(filtered);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Doctor Appointments</h1>
      {selectedDate ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{new Date(selectedDate).toLocaleDateString()}</h2>
          {filteredAppointments.map((appointment, index) => (
            <div key={appointment._id} className="mb-4">
              <AppointmentCard
                user={appointment.user}
                slot={appointment.slot}
                onDelete={onDelete}
                onReschedule={onReschedule}
              />
            </div>
          ))}
        </div>
      ) : (
        appointmentList.map((appointment, index) => (
          <div key={appointment._id} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{new Date(appointment.slot.date).toLocaleDateString()}</h2>
            <DateCard
              appointment={appointment}
              onDelete={onDelete}
              onReschedule={onReschedule}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentsPage;
