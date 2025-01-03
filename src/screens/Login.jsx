import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "", })
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      // Parse JSON if the response text is not empty
      const json = responseText ? JSON.parse(responseText) : {};
      console.log("Parsed JSON:", json);

      if (!json.success) {
        toast.error("Enter valid Credentials.",{
          position:"top-center",
          theme:"colored",
        })
        
      } else {
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('authToken', json.token);
        navigate("/");
        
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  const onChangeHandler = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className='container mt-5'>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChangeHandler} req="true"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChangeHandler} req="true"/>
        </div>


        <button type="submit" className="btn btn-success">Submit</button>
        <Link to={"/signup"} className='m-3 btn btn-danger' >Don't have account</Link>
      </form>
    </div>
  )
}

export default Login
