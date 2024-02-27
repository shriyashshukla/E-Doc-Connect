"use client"
import  useState  from 'react';

export default function DoctorForm() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    hospital: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      specialization: '',
      email: '',
      phone: '',
      address: '',
      hospital: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Doctor Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="specialization" className="block mb-1">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="hospital" className="block mb-1">Hospital</label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
}
