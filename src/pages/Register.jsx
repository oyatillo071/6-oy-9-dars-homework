import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    localStorage.setItem("user", JSON.stringify(formData));

    localStorage.setItem("userLogged", true);
    alert("Registration successful!");

    navigate(`/products`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-96 p-8 bg-base-100 container mx-auto shadow-lg flex flex-col gap-y-4">
      <h4 className="text-center text-3xl font-bold">Register</h4>

      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text capitalize">username</span>
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
          <span className="label-text capitalize">email</span>
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
          <span className="label-text capitalize">password</span>
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
          Register
        </button>
      </div>

      <p className="text-center">
        Already a member?
        <NavLink
          to="/login"
          className="ml-2 link link-hover link-primary capitalize">
          Login
        </NavLink>
      </p>
    </form>
  );
}

export default Register;
