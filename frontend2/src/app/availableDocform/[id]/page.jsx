"use client"
import { useState } from 'react';

function DoctorAvailability() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // Function to check doctor availability
    const handleAvailabilityCheck = () => {
        // Simulating doctor availability check, for now always assuming available
        const isAvailable = true;
        if (isAvailable) {
            setShowAddForm(true);
        } else {
            alert("Sorry, the doctor is not available at the selected date and time.");
        }
    };

    // Function to handle form submission
    const handleAddAppointment = (event) => {
        event.preventDefault();
        // Here you can handle adding the appointment to the database or perform other actions
        alert("Appointment added successfully!");
        // Reset the form
        event.target.reset();
        setShowAddForm(false);
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Check Doctor Availability</h2>
                    <form className="mb-8">
                        <div className="mb-4">
                            <label htmlFor="appointmentDate" className="block mb-2">Appointment Date:</label>
                            <input type="date" id="appointmentDate" name="appointmentDate" className="border border-gray-300 rounded-md p-2" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        </div>
                        <button type="button" onClick={handleAvailabilityCheck} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Check Availability</button>
                    </form>

                    {showAddForm && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
                                    <form onSubmit={handleAddAppointment}>
                                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Appointment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorAvailability;
