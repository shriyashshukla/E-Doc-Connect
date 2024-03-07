'use client'
import { useState } from 'react';

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    console.log(doctor);
    // Reset form fields
    setDoctor({
      name: '',
      specialty: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div className="container">
      <h2>Doctor Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={doctor.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">Specialty</label>
          <input type="text" className="form-control" id="specialty" name="specialty" value={doctor.specialty} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={doctor.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={doctor.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default DoctorForm;
