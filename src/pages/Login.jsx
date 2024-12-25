import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const notify = (text) => toast(text);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://auth-rg69.onrender.com/api/auth/signin", {
        username: formData.identifier,
        password: formData.password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("accessToken", response.data.accessToken);
          notify("Login successful!");
          navigate("/products");
        } else {
          notify("Invalid credentials or no account found.");
          navigate("/register");
        }
      })
      .catch((error) => {
        console.error("Login error:", error.response?.data || error.message);
        notify("Login failed. Please try again.");
      });
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    notify("Logged in as guest!");
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-96 p-8 bg-base-100 container mx-auto shadow-lg flex flex-col gap-y-4"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h4 className="text-center text-3xl font-bold">Login</h4>

      <div className="form-control">
        <label htmlFor="identifier" className="label">
          <span className="label-text capitalize">Username</span>
        </label>
        <input
          type="text"
          name="identifier"
          id="identifier"
          className="input input-bordered"
          value={formData.identifier}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text capitalize">Password</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="input input-bordered"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={handleGuestLogin}
      >
        Guest User
      </button>

      <p className="text-center">
        Not a member yet?
        <NavLink
          to="/register"
          className="ml-2 link link-hover link-primary capitalize"
        >
          Register
        </NavLink>
      </p>
    </form>
  );
}

export default Login;
