import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  //popups
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/v1/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.response.data.message);
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-lg p-3">
            <div className="container d-flex px-0">
              <i class="bi bi-lightbulb-fill text-warning pe-2 fs-4"></i>
              <h3 className="m-0">
                Live<span className="text-warning">Pet</span>
              </h3>
            </div>
            <p className="m-0 text-secondary">
              Please enter credentials to sign up
            </p>
            <hr />
            <form onSubmit={handleSubmit} id="login-form">
              <div class="form-group mb-2">
                <label htmlFor="email" class="mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  value={email}
                  name="email"
                  placeholder="Enter email"
                  onChange={handleOnChange}
                />
              </div>
              <div class="form-group mb-2">
                <label htmlFor="password" class="mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  value={password}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleOnChange}
                />
              </div>

              <div class="form-group my-4">
                <button type="submit" class="btn btn-warning w-100">
                  Login <i class="bi bi-umbrella-fill"></i>
                </button>
              </div>
              <div className="d-flex flex-column align-items-center">
                <p className="mt-2 mb-0 text-secondary account-text">
                  Don&apos;t have an account?
                </p>
                <a href="/signup" className="text-warning account-text mt-0">
                  Create an account
                </a>
              </div>
              <div className="mt-4 mb-2 text-center text-secondary">
                Copyright &copy; 2024. All rights reserved.
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
