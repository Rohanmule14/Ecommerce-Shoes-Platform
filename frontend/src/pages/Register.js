import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const addInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      input
    );
    alert(response.data.message);
    if (response.status === 201) {
      navigate("/login");
    }
  };
  return (
    <div className="container w-100 mt-3 bg-dark rounded p-5">
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 col-4 text-center">
          <label htmlFor="name" className="form-label fs-4 text-warning">
            Name
          </label>
          <input
            type="text"
            value={input.name}
            onChange={addInput}
            name="name"
            className="form-control"
          />
        </div>
        <div className="mb-3 col-4 text-center">
          <label htmlFor="email" className="form-label fs-4 text-warning">
            Email address
          </label>
          <input
            type="text"
            value={input.email}
            name="email"
            onChange={addInput}
            className="form-control"
          />
        </div>
        <div className="mb-3 col-4 text-center">
          <label htmlFor="location" className="form-label fs-4 text-warning">
            Location
          </label>
          <input
            type="text"
            value={input.location}
            name="location"
            onChange={addInput}
            className="form-control"
          />
        </div>
        <div className="mb-3 col-4 text-center">
          <label htmlFor="password" className="form-label fs-4 text-warning">
            Password
          </label>
          <input
            type="text"
            value={input.password}
            name="password"
            onChange={addInput}
            className="form-control"
          />
        </div>
        <div className="d-flex align-items-center">
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
          <p className="m-2 text-warning">
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
