"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DoctorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  specialty: Yup.string().required('Specialty is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
  hospital: Yup.string().required('Hospital is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Must be at least 8 characters')
});

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    address: '',
    phone: '',
    avatar: '',
  });
  const [selFile, setSelFile] = useState(""); 

  const router = useRouter();
  
  const docForm = useFormik({
    initialValues: {
      name: '',
      specialty: '',
      address: '',
      phone: '',
      hospital: '',
      email: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
  
      try {
        console.log('Sending request to server...');

        const res = await fetch('http://localhost:5000/doctor/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        console.log('Response:', res);
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Nice',
            text: 'Doctor added successfully'
          }).then(() => {
            router.push('/Docpage');
          });
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops!!',
          text: 'Something went wrong'
        });
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: DoctorSchema,
  });

  const uploadFile = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setSelFile(file.name);

    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);
  }

  

  return (
    <div className="bg-gray-100 min-h-screen">
  <div className="container mx-auto py-8">
    <h1 className="text-3xl text-center mb-8">Doctor Details</h1>
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <form onSubmit={docForm.handleSubmit} className="grid grid-cols-1 gap-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={docForm.handleChange}
            value={docForm.values.name}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.name && <div className="text-red-500">{docForm.errors.name}</div>}
        </div>
        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            onChange={docForm.handleChange}
            value={docForm.values.specialty}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.specialty && <div className="text-red-500">{docForm.errors.specialty}</div>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={docForm.handleChange}
            value={docForm.values.address}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.address && <div className="text-red-500">{docForm.errors.address}</div>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={docForm.handleChange}
            value={docForm.values.phone}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.phone && <div className="text-red-500">{docForm.errors.phone}</div>}
        </div>
        <div>
          <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">Hospital</label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            onChange={docForm.handleChange}
            value={docForm.values.hospital}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.hospital && <div className="text-red-500">{docForm.errors.hospital}</div>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={docForm.handleChange}
            value={docForm.values.email}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.email && <div className="text-red-500">{docForm.errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={docForm.handleChange}
            value={docForm.values.password}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {docForm.errors.password && <div className="text-red-500">{docForm.errors.password}</div>}
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File</label>
          <input type="file" id="file" onChange={uploadFile} className="mt-1" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default DoctorForm;
