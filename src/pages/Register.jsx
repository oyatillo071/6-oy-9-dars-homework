import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const notify = (text) => toast(`${text}`);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validate(data) {
    if (!isValidEmail(data.email)) {
      notify("Email noto'g'ri kiritildi");
      return false;
    }
    if (data.username.length < 4) {
      notify("Username 4 ta belgidan ko'p bo'lishi kerak");
      return false;
    }
    if (data.password.length < 8) {
      notify("Parol 8 belgidan iborat bo'lishi kerak");
      return false;
    }
    if (data.password !== data.rePassword) {
      notify("Parol mos emas");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate(formData)) {
      const { username, email, password } = formData;

      axios
        .post("https://auth-rg69.onrender.com/api/auth/signup", {
          username,
          email,
          password,
        })
        .then((response) => {
          console.log("Serverdan javob:", response.data);

          localStorage.setItem("user", JSON.stringify({ username, email }));
          localStorage.setItem("userLogged", true);

          notify("Ro'yxatdan o'tish muvaffaqiyatli!");
          navigate(`/login`);
        })
        .catch((error) => {
          console.error("Xatolik:", error.response?.data || error.message);
          notify("Ro'yxatdan o'tishda xatolik yuz berdi");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-96 p-8 bg-base-100 container mx-auto mt-20 shadow-2xl flex flex-col gap-y-4"
    >
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <h4 className="text-center text-3xl font-bold">Register</h4>

      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text capitalize">Username</span>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="input input-bordered"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text capitalize">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="input input-bordered"
          value={formData.email}
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
        <label htmlFor="rePassword" className="label mt-2 ">
          <span className="label-text capitalize text-nowrap">
            Confirm Password
          </span>
        </label>
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          className="input input-bordered"
          value={formData.rePassword}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </div>

      <p className="text-center">
        Already a member?
        <NavLink to="/login" className="ml-2 link link-hover link-primary">
          Login
        </NavLink>
      </p>
    </form>
  );
}

export default Register;
