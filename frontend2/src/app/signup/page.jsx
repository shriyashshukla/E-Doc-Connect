"use client";
import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "./signup.css";



const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 chracters required')
    .required('Name is Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string().required('Required').min(10, 'Invalid Phone Number'),

});



const Signup = () => {
  const router = useRouter();

  const [selFile, setSelFile] = useState('');


  // initialize the formik
  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      avatar: "",
      address: "",
      pincode: "",
    },




    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      values.avatar = selFile;

      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);

      // send the data to the server

      const res = await fetch('http://localhost:5000/user/add', {
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
            router.push('/Userlogin');

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
    validationSchema: SignupSchema,
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
    <>
      <div className="background-image">


        <div className="main-card">
          <div className="col-md-6 mx-auto mt-2 pt-5">
            <div className="card shadow">
              <div className="card-body">

                <form onSubmit={signupForm.handleSubmit}>
                  <h2 className="form-heading ">Signup</h2>
                  <label className="custum-file-upload" htmlFor="file">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                        <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          id="SVGRepo_tracerCarrier"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            fill=""
                            d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          />{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <input type="file" id="file" onChange={uploadFile} />
                  </label>
                  <label >Name </label>

                  <span style={{ fontSize: "0.7em", color: "red", margineLeft: 20 }}>
                    {signupForm.touched.name && signupForm.errors.name}
                  </span>
                  <input
                    type="text"
                    className="form-control mb-4"
                    name="name"
                    id="name"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.name}
                    placeholder="Enter your name"
                  />
                  <label >Email </label>

                  <span style={{ fontSize: "0.7em", color: "red", margineLeft: 20 }}>
                    {signupForm.touched.email && signupForm.errors.email}
                  </span>
                  <input
                    className="form-control mb-4"
                    name="email"
                    id="email"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    placeholder="Enter your email"
                  />
                  <label >Phone number </label>

                  <span style={{ fontSize: "0.7em", color: "red", margineLeft: 20 }}>
                    {signupForm.touched.phone && signupForm.errors.phone}
                  </span>
                  <input
                    className="form-control mb-4"
                    name="phone"
                    id="phone"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.phone}
                    placeholder="Enter your Phone Number"
                  />
                  
                  <label >Address</label>

                  <span style={{ fontSize: "0.7em", color: "red", margineLeft: 20 }}>
                    {signupForm.touched.address && signupForm.errors.address}
                  </span>
                  <input
                    className="form-control mb-4"
                    name="address"
                    id="address"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.address}
                    placeholder="Enter your address with the City"
                  />
                  <label >Pin code</label>

                  <input
                    className="form-control mb-4"
                    name="pincode"
                    id="pincode"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.pincode}
                    placeholder="Enter your Pin code"
                  />




                  <label >Password </label>

                  <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>
                    {signupForm.errors.password}
                  </span>


                  <input
                    type="password"
                    className="form-control mb-4"
                    name="password"
                    id="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    placeholder="********"
                  />




                  <button
                    disabled={signupForm.isSubmitting}
                    type="submit"
                    className="signinbutton"
                  >
                    {signupForm.isSubmitting ? (
                      <>
                        <span
                          class="spinner-border spinner-border-sm "
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span> Loading ...</span>
                      </>
                    ) : (
                      "Sumbit"
                    )}
                  </button>


                </form>
              </div>
            </div>
          </div >

        </div>
      </div>
    </>
  );
};

export default Signup;
