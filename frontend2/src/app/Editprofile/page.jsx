"use client"; // Assuming this is for Vercel Next.js environment

import { useFormik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; // Changed from next/navigation to next/router for routing

const UpdateSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Minimum 3 characters required'),
  email: Yup.string().email('Invalid email'),
  address: Yup.string(),
  phone: Yup.string(),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
  avatar: Yup.mixed(), // For file upload, so no specific validation
  pincode: Yup.string().matches(/^\d{6}$/, 'Invalid PIN code'),
  // Add more Yup validations for other fields as necessary
});

const Update = () => {
  const router = useRouter();
  // Remove the declaration of the 'selFile' variable
  const [, setSelFile] = useState('');

  const UpdateForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      avatar: "",
      address: "",
      pincode: "",
      // Add more fields here
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      // Here you should send your form data to the server, including the uploaded file
      try {
        // Example: Sending form data to a server endpoint
        const response = await fetch('http://localhost:5000/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Sending form data as JSON
        });

        if (response.ok) {
          // Assuming the server responds with success message
          const data = await response.json();
          Swal.fire('Success', data.message, 'success');
          router.push('/dashboard'); // Redirecting to dashboard after successful submission
        } else {
          // Handling server errors
          const errorData = await response.json();
          Swal.fire('Error', errorData.error, 'error');
        }
      } catch (error) {
        // Handling fetch errors
        console.error('Error:', error);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }

      setSubmitting(false);
    },
    validationSchema: UpdateSchema,
  });

  const uploadFile = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setSelFile(file.name);

    // File upload logic can be implemented here if necessary
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={UpdateForm.handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={UpdateForm.values.name}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your name"
              />
              {UpdateForm.errors.name && UpdateForm.touched.name && (
                <p className="text-red-500">{UpdateForm.errors.name}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={UpdateForm.values.email}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your email"
              />
              {UpdateForm.errors.email && UpdateForm.touched.email && (
                <p className="text-red-500">{UpdateForm.errors.email}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="phone" className="block">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={UpdateForm.values.phone}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your phone"
              />
              {UpdateForm.errors.phone && UpdateForm.touched.phone && (
                <p className="text-red-500">{UpdateForm.errors.phone}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={UpdateForm.values.password}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your password"
              />
              {UpdateForm.errors.password && UpdateForm.touched.password && (
                <p className="text-red-500">{UpdateForm.errors.password}</p>
              )}
            </div>
            <div className="w-full px-2 mb-4">
              <label htmlFor="address" className="block">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={UpdateForm.values.address}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your address"
              />
              {UpdateForm.errors.address && UpdateForm.touched.address && (
                <p className="text-red-500">{UpdateForm.errors.address}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="pincode" className="block">
                PIN Code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={UpdateForm.values.pincode}
                onChange={UpdateForm.handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter your PIN code"
              />
              {UpdateForm.errors.pincode && UpdateForm.touched.pincode && (
                <p className="text-red-500">{UpdateForm.errors.pincode}</p>
              )}
            </div>
            {/* Add more fields here */}
          </div>
          
          {/* File input for uploading avatar */}
          <input type="file" onChange={uploadFile} />

          <button
            type="submit"
            disabled={UpdateForm.isSubmitting}
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {UpdateForm.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
