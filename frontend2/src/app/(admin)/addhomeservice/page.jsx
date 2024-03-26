"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import './style.css'; 

const ServiceSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  specialty: Yup.string().required('Specialty is required'),
  discription: Yup.string().required('Discription is required'),
});

const AddHomeService = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null); // Define selected file state

  const serviceForm = useFormik({
    initialValues: {
      name: "",
      specialty: "",
      discription: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
  
      try {
        console.log('Sending request to server...');

        const res = await fetch('http://localhost:5000/service/add', {
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
            text: 'service added successfully'
          }).then(() => {
            router.push('/admin');
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
    validationSchema: ServiceSchema,
  });

  const uploadFile = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    console.log(file.name);
    setSelectedFile(file); // Set selected file
    serviceForm.setFieldValue("image", file); // Set image field value in formik
    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);
  }

  return (
    <div className="formcontainer">
      <h1 className='heading'>Add Service Details</h1>
      <div className='form'>
        <form onSubmit={serviceForm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={serviceForm.handleChange}
              value={serviceForm.values.name}
            />
            {serviceForm.errors.name ? <div className="text-danger">{serviceForm.errors.name}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <input
              type="text"
              className="form-control"
              id="specialty"
              name="specialty"
              onChange={serviceForm.handleChange}
              value={serviceForm.values.specialty}
            />
            {serviceForm.errors.specialty ? <div className="text-danger">{serviceForm.errors.specialty}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="discription">Discription</label>
            <input
              type="text"
              className="form-control"
              id="discription"
              name="discription"
              onChange={serviceForm.handleChange}
              value={serviceForm.values.discription}
            />
            {serviceForm.errors.discription ? <div className="text-danger">{serviceForm.errors.discription}</div> : null}
          </div>
          <input type="file" onChange={uploadFile} /> 
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHomeService;
