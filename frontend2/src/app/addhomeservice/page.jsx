"use client"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ServiceSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  image: Yup.mixed().required('Image is required'),
});

const AddHomeService = () => {
  const router = useRouter();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: "",
    },
    validationSchema: ServiceSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Submitting form with values:', values);
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('image', values.image);

        const res = await fetch('http://localhost:5000/service/add', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Nice',
            text: 'Service added successfully',
          }).then(() => {
            router.push('/admin');
          });
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops!!',
          text: error.message || 'Something went wrong',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Service Details</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                onChange={formik.handleChange}
                value={formik.values.name}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
              {formik.errors.name && <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>}
            </div>
            <div>
              <label htmlFor="price" className="sr-only">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                autoComplete="price"
                required
                onChange={formik.handleChange}
                value={formik.values.price}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
              />
              {formik.errors.price && <p className="mt-2 text-sm text-red-600">{formik.errors.price}</p>}
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                autoComplete="description"
                required
                onChange={formik.handleChange}
                value={formik.values.description}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
              />
              {formik.errors.description && <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>}
            </div>
            <div>
              <label htmlFor="image" className="sr-only">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {formik.errors.image && <p className="mt-2 text-sm text-red-600">{formik.errors.image}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHomeService;
