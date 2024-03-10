'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const DoctorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  specialty: Yup.string().required('Specialty is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
});

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    address: '',
    phone: '',
    
  });

  

  const router = useRouter();
  
  const docForm = useFormik({
    initialValues: {
      name: "",
      specialty: "",
      address: "",
      phone: "",
      hospital : '',
      email: '',
      password : ""
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
  
  

  return (
    <div className="container">
      <h2>Doctor Details</h2>
      <form onSubmit={docForm.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={docForm.handleChange}
            value={docForm.values.name}
          />
          {docForm.errors.name ? <div className="text-danger">{docForm.errors.name}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            className="form-control"
            id="specialty"
            name="specialty"
            onChange={docForm.handleChange}
            value={docForm.values.specialty}
          />
          {docForm.errors.specialty ? <div className="text-danger">{docForm.errors.specialty}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            onChange={docForm.handleChange}
            value={docForm.values.address}
          />
          {docForm.errors.address ? <div className="text-danger">{docForm.errors.address}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={docForm.handleChange}
            value={docForm.values.phone}
          />
          {docForm.errors.phone ? <div className="text-danger">{docForm.errors.phone}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">hospital</label>
          <input
            type="text"
            className="form-control"
            id="hospital"
            name="hospital"
            onChange={docForm.handleChange}
            value={docForm.values.hospital}
          />
          {docForm.errors.hospital ? <div className="text-danger">{docForm.errors.hospital}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={docForm.handleChange}
            value={docForm.values.email}
          />
          {docForm.errors.email ? <div className="text-danger">{docForm.errors.email}</div> : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Passwaord</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            onChange={docForm.handleChange}
            value={docForm.values.password}
          />
          {docForm.errors.password ? <div className="text-danger">{docForm.errors.password}</div> : null}
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );

  };
export default DoctorForm;
