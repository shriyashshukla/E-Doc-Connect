"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ServiceSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  image: Yup.string().required('Image is required'),
});

const AddHomeService = () => {
  const router = useRouter();
  const [selFile, setSelFile] = useState(null); 

  const serviceForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting form with values:", values); 

      setSubmitting(true);

      try {
        console.log('Sending request to server...');
        values.image = selFile;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Service Details</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={serviceForm.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                onChange={serviceForm.handleChange}
                value={serviceForm.values.name}
              />
              {serviceForm.errors.name && <p className="mt-2 text-sm text-red-600" id="name-error">{serviceForm.errors.name}</p>}
            </div>
            <div>
              <label htmlFor="price" className="sr-only">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                autoComplete="price"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="price"
                onChange={serviceForm.handleChange}
                value={serviceForm.values.price}
              />
              {serviceForm.errors.price && <p className="mt-2 text-sm text-red-600" id="price-error">{serviceForm.errors.price}</p>}
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                autoComplete="description"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
                onChange={serviceForm.handleChange}
                value={serviceForm.values.description}
              />
              {serviceForm.errors.description && <p className="mt-2 text-sm text-red-600" id="description-error">{serviceForm.errors.description}</p>}
            </div>
            <div>
              <label htmlFor="image" className="sr-only">Image</label>
              <input
                type="file"
                id="file"
                name="image"
                onChange={uploadFile}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M13.293 6.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomeService;
