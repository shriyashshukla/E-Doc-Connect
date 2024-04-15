"use client"

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  duration: Yup.number()
    .required('Duration is required')
    .min(1, 'Duration should be at least 1 hour')
    .max(24, 'Duration should not exceed 24 hours'),
});

export default function DoctorAvailabilityForm() {
  const [formError, setFormError] = useState('');

  const handleSubmit = async (values, actions) => {
    console.log('Submitting form with values:', values); 
    try {
      const response = await axios.post('http:/localhost:5000/slots/add', values);
      console.log('Response:', response.data); 
      if (response.data.message) {
        setFormError(response.data.message);
        actions.resetForm();
      }
    } catch (error) {
      console.error('Error submitting form:', error); 
      if (error.response && error.response.data && error.response.data.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <Formik
      initialValues={{ date: '', time: '', duration: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl mb-4">Doctor Availability Input</h1>
          
          {formError && (
            <div className="mb-4 text-red-500 text-sm">
              {formError}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <Field
              type="date"
              id="date"
              name="date"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
              Time
            </label>
            <Field
              type="time"
              id="time"
              name="time"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
              Duration (hours)
            </label>
            <Field
              type="number"
              id="duration"
              name="duration"
              min="1"
              max="24"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
              disabled={isSubmitting}
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
