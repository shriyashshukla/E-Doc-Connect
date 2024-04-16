"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function MyForm() {
  const [serviceList, setServiceList] = useState([]);
  const router = useRouter();

  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/service/getall');
      const data = await res.json();
      setServiceList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const initialValues = {
    phone: '',
    message: '',
    date: '',
    hours: '',
    minutes: '',
    ampm: 'AM',
    user: JSON.parse(sessionStorage.getItem('user'))?.user?._id || '',
    service: ''
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
    date: Yup.date().required('Date is required'),
    hours: Yup.number().required('Hours are required').min(1, 'Hours must be between 1 and 12').max(12, 'Hours must be between 1 and 12'),
    minutes: Yup.number().required('Minutes are required').min(0, 'Minutes must be between 0 and 59').max(59, 'Minutes must be between 0 and 59'),
    ampm: Yup.string().required('AM/PM selection is required')
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Check if user ID is empty and retrieve from session storage if necessary
      if (!values.user) {
        const userId = JSON.parse(sessionStorage.getItem('user'))?.user?._id || '';
        values.user = userId;
      }
  
      const res = await fetch('http://localhost:5000/booking/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Nice',
          text: 'You have signed up successfully'
        }).then((result) => {
          router.push('/userappointment');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!!',
          text: 'Something went wrong'
        });
      }
  
      resetForm();
    } catch (error) {
      console.error('Form Submission Error:', error);
    } finally {
      setSubmitting(false);
    }
  };
 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="mt-20"> {/* Reduced margin-top */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Book Your Appointment</h2>

              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                  <Field
                    type="phone"
                    id="phone"
                    name="phone"
                    className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <ErrorMessage name="phone" component="span" className="text-red-500" />
                </div>

                <div className="w-1/2 pl-2">
                  <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Select Service:</label>
                  <Field
                    as="select"
                    id="service"
                    name="service"
                    className="border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="" className="text-gray-700">Select Service</option>
                    {serviceList.map((service, index) => (
                      <option key={index} value={service._id} className="text-gray-700">{service.name}</option>
                    ))}
                  </Field>
                </div>
              </div>

              <div className="mb-4 flex">
                <div className="w-1/2 pr-2">
                  <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <ErrorMessage name="date" component="span" className="text-red-500" />
                </div>

                <div className="w-1/2 pl-2">
                  <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                  <div className="flex items-center">
                    <Field
                      as="select"
                      id="hours"
                      name="hours"
                      className="border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                      required
                    >
                      <option value="" className="text-gray-700">HH</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <option key={hour} value={hour} className="text-gray-700">{hour}</option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      id="ampm"
                      name="ampm"
                      className="border rounded py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="AM" className="text-gray-700">AM</option>
                      <option value="PM" className="text-gray-700">PM</option>
                    </Field>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                  required
                />
                <ErrorMessage name="message" component="span" className="text-red-500" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={isSubmitting}
              >
                Submit
              </button>

              {initialValues.user && (
                <p className="mt-4 text-center">userid={initialValues.user}</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default MyForm;