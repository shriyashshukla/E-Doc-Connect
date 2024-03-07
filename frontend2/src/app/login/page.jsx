'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import  {useRouter}  from "next/navigation";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:5000/user/authenticate", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          sessionStorage.setItem("user", JSON.stringify(data));

          if (data.email === "shriyash@gmail.com") {
            setIsAdmin(true);
            Swal.fire({
              icon: "success",
              title: "Admin Login Successful",

            });
            router.push("/adddoctor");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "You are not authorized to access the admin panel",
            });
          }
        } else if (res.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Email or password is incorrect",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    },
  });

 

  return (
    <div className="col-md-3 mx-auto mt-5 pt-5">
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={loginForm.handleSubmit}>
            <h2 className="text-center">Login Here</h2>
            <label>Email</label>
            <input
              id="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              type="email"
              className="form-control mb-4"
            />
            <label>Password</label>
            <input
              id="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              type="password"
              className="form-control mb-4"
            />
            <p className="text-center">
              Don't have an account?
              <Link href="/signup" className="text-primary text-decoration-none">
                Signup Here
              </Link>
            </p>
            <button type="submit" className="btn btn-primary mx-auto w-100 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Render the form for adding doctor details if the user is an admin */}
      {isAdmin && (
        <div className="card shadow mt-5">
          <div className="card-body">
            <h2 className="text-center">Add Doctor Details</h2>
            <Link href="/adddoctor"className="btn btn-primary mx-auto w-100 mt-2" passHref>
              Go to Doctor Form
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
