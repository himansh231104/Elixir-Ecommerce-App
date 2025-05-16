import React from 'react';
import './style.css';
import Button from '@mui/material/Button';
// import {Login} from '../Login/index';
// import {Signup} from '../Signup/index';

export const LoginSignup = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="loginSignupWrapper">
            <div className="loginSignupBox">
                <div className="loginBox">
                    <h2 className='mb-4'>Login</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"  className="password" name="password" id="password" />
                    </div>
                    <div>
                        <input type="checkbox"  className="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button className='btn'>Login</button>
                    <p className='mt-4'>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
                <div className="bar"></div>
                <div className="signupBox">
                    <h2 className='mb-4'>Signup</h2>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="signupEmail" id="signupEmail" />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="signupPassword" id="signupPassword" />
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name="agree" id="agree" />
                        <label htmlFor="agree">I accept all Terms & Conditions</label>
                    </div>
                    <Button className='btn'>Login</Button>
                    <p className='mt-4'>Already have an account? <a href="/signup">Login</a></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;