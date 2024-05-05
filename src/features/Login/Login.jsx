import React, { useState, useContext } from 'react';
import './login.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { login } from './api/login';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/context/Auth';

function Login() {    
  const [loginValue, setLoginValues] = useState({
      username: "testuser1",
      password: "password",
  });
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginValues({ ...loginValue, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await login(loginValue);
      authCtx.setToken(res.data)
      console.log("Login Response",res, authCtx.isAuthenticated);
      if(res.status == 200) {
        navigate("/home")
      }
    } catch(err) {
      console.error("Authentication Failed","Please check your credentials");
    }
  }

  return (
    <div className='login-parent'>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{color:'whitesmoke'}}>Login</h2>
        <div className="login-input-box">
          <input type="text" placeholder='Username'
          name="username"
          value={loginValue.username} 
          onChange={handleChange}
          required/>
          <div className='login-icon'><PersonIcon /></div>
        </div>
        <div className="login-input-box">
          <input type="password" placeholder='Password' 
          name="password"
          value={loginValue.password} 
          onChange={handleChange}
          required/>
          <div className='login-icon'><LockIcon /></div>
        </div>
        <button type='submit' className='btn'>Login</button>
        <div className="register-instead">
          <p>Not registered?<Link to="/signup"> Sign Up </Link> instead</p>
        </div>
      </form>
    </div>
  )
}


  

export default Login
