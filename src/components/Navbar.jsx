import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
  const [userName, setUserName] = useState("Guest");
  const [cartValue, setcartValue] = useState(0);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    
    navigate("/");
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("authToken"); // Get token from localStorage
          const response = await fetch("http://localhost:5000/api/user", {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.name); // Set the username
            setcartValue(data.cartValue); // Set the cartvalue
          }else {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1 fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 m-0 p-0" to="/">InCampusFood</Link>

        {/* Toggler for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ><span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {/* mx-auto centers the links */}
            <li className="nav-item"><Link className="nav-link active fs-5" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link fs-5" to="/yummpy">Yummpy</Link></li>
            <li className="nav-item"><Link className="nav-link fs-5" to="/ifc_c">Ifc-c</Link></li>
            <li className="nav-item"><Link className="nav-link fs-5" to="/kathijunction">Kathijunction</Link></li>
          </ul>

          {/* Buttons for Login and Sign Up */}
          {!isLoggedIn ? (
            <div className="d-flex">
              <Link to="/signup" className="btn btn-outline-light me-2">Sign Up</Link>
              <Link to="/login" className="btn btn-primary" >Login</Link>
            </div>
          ) : (
            <div>
              <ul className="mt-2 d-flex gap-2">
                <li className="btn btn-outline-light me-2 position-relative">{userName.split(" ")[0].trim()}</li>
                <li  className="position-relative"><Link className="btn btn-outline-light me-2 " to="/Mycart">Cart</Link>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartValue}<span className="visually-hidden">unread messages</span>
                  </span>
                </li>
                <li className="btn btn-danger" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;