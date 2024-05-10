import React, { useState } from 'react'
import './login.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { signup } from './api/login';
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
  const [userDetails, setUserDetails] = useState({
    username:"",
    password: "",
    re_password: ""
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });  
}
  
  const registerUser = async (e) => {
    e.preventDefault();
    if(userDetails.username == "" && userDetails.password == "" && userDetails.re_password == "") {
      return;
    }
    if(userDetails.password !== userDetails.re_password){
      alert("Passwords do not match");
      return;
    }
    try {
      let response = await signup({
        'username': userDetails.username,
        'password': userDetails.password})
      alert(response.data);
      setUserDetails({
        username:"",
        password: "",
        re_password: ""
      });
      navigate("/login")
    } catch(err) {
      console.error("Unable to register user | ", err);
      alert("Something went wrong. Please try again later");
    }

  }

  return (
    <div className='login-parent'>
      <form className="login-form" onSubmit={registerUser}>
        <h2 style={{color:'whitesmoke'}}>Sign-up</h2>
        <div className="login-input-box">
          <input type="text" placeholder='Username' required value={userDetails.username} onChange={handleChange} name="username"/>
          <div className='login-icon'><PersonIcon /></div>
        </div>
        <div className="login-input-box">
          <input type="password" placeholder='Password' required value={userDetails.password} onChange={handleChange} name="password"/>
          <div className='login-icon'><LockIcon /></div>
        </div>
        <div className="login-input-box">
          <input type="password" placeholder='Re-Enter Password' required value={userDetails.re_password} onChange={handleChange} name="re_password"/>
          <div className='login-icon'><LockIcon /></div>
        </div>
        <button type='submit' className='btn'>Register</button>
        <div className="register-instead">
          <p>Registered already?<Link to="/login"> Login </Link> instead</p>
        </div>
      </form>
    </div>
  )
}

export default Signup
