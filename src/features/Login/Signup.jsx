import React from 'react'
import './login.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function Signup() {
    
  return (
    <div className='login-parent'>
      <form className="login-form">
        <h2 style={{color:'whitesmoke'}}>Sign-up</h2>
        <div className="login-input-box">
          <input type="text" placeholder='Username' required/>
          <div className='login-icon'><PersonIcon /></div>
        </div>
        <div className="login-input-box">
          <input type="password" placeholder='Password' required/>
          <div className='login-icon'><LockIcon /></div>
        </div>
        <div className="login-input-box">
          <input type="password" placeholder='Re-Enter Password' required/>
          <div className='login-icon'><LockIcon /></div>
        </div>
        <button type='submit' className='btn'>Register</button>
        <div className="register-instead">
          <p>Registered already?<a href="#"> Login </a> instead</p>
        </div>
      </form>
    </div>
  )
}

export default Signup
