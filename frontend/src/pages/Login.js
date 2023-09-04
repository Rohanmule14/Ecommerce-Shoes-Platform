import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const addInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        input
      );
      alert(response.data.message);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("authToken", response.data.authToken);
      console.log(localStorage.getItem("authToken"));
      console.log(localStorage.getItem("userEmail"));
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container w-100 mt-5 bg-dark rounded p-5">
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 col-4 text-center">
          <label htmlFor="email" className="form-label fs-4 text-warning">
            Email address
          </label>
          <input
            type="text"
            value={input.email}
            onChange={addInput}
            name="email"
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
            onChange={addInput}
            name="password"
            className="form-control"
          />
        </div>
        <div className="d-flex align-items-center">
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
          <p className="m-2 text-warning">
            New user? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
