import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import styles from "./Navbar.module.css";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [userName, setUserName] = useState("Guest");
  const [cartValue, setcartValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleModal = (formType) => {
    setActiveForm(formType); // Set the active form (login or signup)
    setShowModal((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch("http://localhost:5000/api/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.name);
            setcartValue(data.cartValue);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer/>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 m-0 p-0" to="/">
          InCampusFood
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/yummpy">
                Yummpy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/ifc_c">
                Ifc-c
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/kathijunction">
                Kathijunction
              </Link>
            </li>
          </ul>

          {!isLoggedIn ? (
            <div className="d-flex">
              <button className="btn btn-outline-light me-2"
                onClick={() => toggleModal("signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-primary"
                onClick={() => toggleModal("login")}
              >
                Login
              </button>
            </div>
          ) : (
            <div>
              <ul className="mt-2 d-flex gap-2">
                <li className="btn btn-outline-light me-2 position-relative">
                  {userName.split(" ")[0].trim()}
                </li>
                <li className="position-relative">
                  <Link className="btn btn-outline-light me-2" to="/Mycart">
                    Cart
                  </Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartValue}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </li>
                <li className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <button className={styles.close_btn} onClick={() => setShowModal(false)}>
              ✖
            </button>
            {activeForm === "login" ? (
              <Login
                onLoginSuccess={handleLoginSuccess}
                switchToSignup={() => setActiveForm("signup")}
              />
            ) : (
              <Signup  switchToLogin={() => setActiveForm("login")}
                onSignupSuccess={() => setShowModal(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
