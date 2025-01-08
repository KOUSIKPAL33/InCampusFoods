import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./signup.module.css"

function Signup({onSignupSuccess,switchToLogin}) {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "",cpassword: "", mobileno: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(credentials.name.trim().length == 0){
                toast.error("Name cannot be left blank. ",{
                    theme:"light",
                    position:"top-center"
                });
                return;
            }
            else if(credentials.password !== credentials.cpassword){
                toast.error("Password do not match",{
                    theme:"light",
                    position:"top-center"
                });
                return;
            }else if(credentials.password.length < 8){
                toast.error("Password must be of length 8.",{
                    theme:"light",
                    position:"top-center"
               })
                return;
            }else if(!/^[6-9]\d{9}$/.test(credentials.mobileno)) {
               
               toast.error("Enter a valid 10-digit mobile number.",{
                    theme:"light",
                    position:"top-center"
               })
                return;
            }
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
                toast.info("Enter valid Credentials.",{
                    theme:"light",
                    position:"top-center"
                })
            }else{
                toast.success("Registration Successfull",{
                    position:"top-center",
                    theme:"colored"
                })
                setcredentials({
                    name:"",
                    email:"",
                    password:"",
                    mobileno:"",
                });
                navigate("/");
                onSignupSuccess()
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An error occurred while submitting the form.");
        }
    };
    const errormessage="";
    const onChangeHandler = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
        
    }
    return (
        <>
            <div className='container'>
                <h1 className='text-center'>Signup Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChangeHandler} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="text" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChangeHandler} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile No.</label>
                    <input type="number" className={`${styles.mobile} form-control`} name='mobileno' value={credentials.mobileno} onChange={onChangeHandler} required
                    
                    />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link className="m-3 btn btn-primary" onClick={switchToLogin}>Already a user?</Link>
            </form>
        </div>
        </>
        
    )
}

export default Signup
