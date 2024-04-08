import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

function MyForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone:"",
    message: '',
    date: '',
    hours: '',
    minutes: '',
    ampm: 'AM' 
  });

  const schema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
    date: Yup.date().required('Date is required'),
    hours: Yup.number().required('Hours are required').min(1, 'Hours must be between 1 and 12').max(12, 'Hours must be between 1 and 12'),
    minutes: Yup.number().required('Minutes are required').min(0, 'Minutes must be between 0 and 59').max(59, 'Minutes must be between 0 and 59'),
    ampm: Yup.string().required('AM/PM selection is required')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  onSubmit: async (values, { setSubmitting }) => {
    setSubmitting(true);
    values.avatar = selFile;

    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 3000);

    // send the data to the server

    const res = await fetch('http://localhost:5000/booking/add', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Nice',
        text: 'You have signed up sucessfully'
      })
        .then((result) => {
          router.push('');

        }).catch((err) => {
          console.log(err);
        });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!!',
        text: 'Something went wrong'
      })
    }
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      // Handle form submission here, you can send the formData to your backend or do any other logic
      console.log('Form submitted:', formData);
      // Reset form fields
      setFormData({
        phone:"",
        message: '',
        date: '',
        hours: '',
        minutes: '',
        ampm: 'AM' 
      });
      // router.push('/homeservice'); 
    } catch (error) {
      console.error('Validation Error:', error.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
        <div className="flex">
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            min="1"
            max="12"
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <span className="mx-2">:</span>
          <input
            type="number"
            id="minutes"
            name="minutes"
            value={formData.minutes}
            onChange={handleChange}
            min="0"
            max="59"
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mt-2">
          <select
            id="ampm"
            name="ampm"
            value={formData.ampm}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
  );
}

export default MyForm;
