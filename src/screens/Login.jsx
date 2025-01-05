import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login({ onLoginSuccess,switchToSignup }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const responseText = await response.text();
      const json = responseText ? JSON.parse(responseText) : {};

      if (!json.success) {
        toast.error("Enter valid credentials.", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("authToken", json.token);
        onLoginSuccess(); // Notify parent about the login success
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const onChangeHandler = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="text-center">Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <Link className="m-3 btn btn-danger" onClick={switchToSignup}>Don't have an account?</Link>

      </form>
    </div>
  );
}

export default Login;
