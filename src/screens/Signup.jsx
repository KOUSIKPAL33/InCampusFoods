import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";


function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", mobileno: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    mobileno: credentials.mobileno,
                }),
            });

            const responseText = await response.text();
            const json = responseText ? JSON.parse(responseText) : {};

            if (!json.success) {
                alert("Enter valid Credentials.");
            }else{
                alert("Registration Successfull");
                setcredentials({
                    name:"",
                    email:"",
                    password:"",
                    mobileno:"",
                });
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChangeHandler} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile No.</label>
                    <input type="text" className="form-control" name='mobileno' value={credentials.mobileno} onChange={onChangeHandler} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link to={"/login"} className='m-3 btn btn-danger' >Already a user</Link>
            </form>
        </div>
    )
}

export default Signup
