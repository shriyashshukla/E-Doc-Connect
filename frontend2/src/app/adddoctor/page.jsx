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
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const router = useRouter();
  const docForm = useFormik({
    initialValues: {
      name: "",
      specialty: "",
      address: "",
      phone: "",
      
      
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      

      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);

      // send the data to the server

      const res = await fetch('http://localhost:5000/doctor/add', {
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
          text: 'Doctor added  sucessfully'
        })
          .then((result) => {
            router.push('/Docpage');

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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );

  };
export default DoctorForm;
