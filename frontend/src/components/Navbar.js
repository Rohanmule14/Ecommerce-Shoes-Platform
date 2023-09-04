import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="data:image/png;base64,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"
              alt="Logo"
              style={{ height: "40px", borderRadius: "10px" }}
            ></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 text-warning"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link className="btn bg-white text-black mx-1" to="/register">
                    Register
                  </Link>

                  <Link className="btn bg-white text-black mx-1" to="/login">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="d-flex">
                  <Modal />
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
