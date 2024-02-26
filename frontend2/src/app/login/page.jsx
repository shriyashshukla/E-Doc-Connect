'use client';
import React from "react";
import "./login.css";
import Link from "next/link";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import UseAppContext from "../../../src/app/AppContext";
import { useRouter } from "next/navigation";



const Login = () => {
  const router = useRouter();
  const { setLoggedin } = UseAppContext();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
        });

        const data = await res.json();

        console.log(data);

        sessionStorage.setItem("user", JSON.stringify(data));

        setLoggedin(true);
        router.push("/");
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
              <Link
                href="/signup"
                className="text-primary text-decoration-none"
              >
                Signup Here
              </Link>
            </p>
            <button
              type="sumbit"
              className="btn btn-primary mx-auto w-100 mt-2"
            >
              Sumbit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
