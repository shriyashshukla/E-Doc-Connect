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
            router.push('/login');

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
    <div className="main-card">
      <div className="col-md-6 mx-auto mt-2 pt-5">
        <div className="card shadow">
          <div className="card-body">
            <form onSubmit={signupForm.handleSubmit}>
              <h2 className="text-center">Signup</h2>
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
                {signupForm.touched.phone && signupForm.errors.phone}
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

              <span style={{ fontSize: "0.7em", color: "red", margineLeft: 20 }}>
                {signupForm.touched.phone && signupForm.errors.phone}
              </span>
              <input
                className="form-control mb-4"
                name="pincode"
                id="pincode"
                onChange={signupForm.handleChange}
                value={signupForm.values.pincode}
                placeholder="Enter your Pin code"
              />

              <div className="mydict">
                <div>
                  <label>
                    <input type="radio" name="radio" defaultChecked="" />
                    <span>Women</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" />
                    <span>Men</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" />
                    <span>Divided</span>
                  </label>
                </div>
              </div>



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

               <input type="file" onChange={uploadFile} /> 


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
      <div className="filecontainer">
        <div className="header">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>{" "}
          <p>Browse File to upload!</p>
        </div>
        <label htmlFor="file" className="footer">
          <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
              <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
            </g>
          </svg>
          <p>Not selected file</p>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                stroke="#000000"
                strokeWidth={2}
              />{" "}
              <path
                d="M19.5 5H4.5"
                stroke="#000000"
                strokeWidth={2}
                strokeLinecap="round"
              />{" "}
              <path
                d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                stroke="#000000"
                strokeWidth={2}
              />{" "}
            </g>
          </svg>
        </label>
        <input id="file" type="file" />
      </div>


    </div>

  );
};

export default Signup;
