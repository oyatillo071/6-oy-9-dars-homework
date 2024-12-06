import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
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

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === formData.identifier &&
      storedUser.password === formData.password
    ) {
      alert("Login successful!");
      navigate("/products");
    } else {
      alert("Invalid credentials or no account found. Please register.");
      navigate("/register");
    }
  };
  localStorage.setItem("userLogged", false);

  const handleGuestLogin = () => {
    localStorage.setItem("userLogged", true);
    alert("Logged in as guest!");
    navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-96 p-8 bg-base-100 container mx-auto shadow-lg flex flex-col gap-y-4">
      <h4 className="text-center text-3xl font-bold">Login</h4>

      <div className="form-control">
        <label htmlFor="identifier" className="label">
          <span className="label-text capitalize">email</span>
        </label>
        <input
          type="email"
          name="identifier"
          id="identifier"
          className="input input-bordered"
          value={formData.identifier}
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
          Login
        </button>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={handleGuestLogin}>
        Guest User
      </button>

      <p className="text-center">
        Not a member yet?
        <NavLink
          to="/register"
          className="ml-2 link link-hover link-primary capitalize">
          Register
        </NavLink>
      </p>
    </form>
  );
}

export default Login;
