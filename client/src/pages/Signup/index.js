import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Signup = () => {

    const [passwordType, setPasswordType] = useState('password');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: ''
      });
    
      const handleChange = (e) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:5000/api/users/register', formData);
          console.log('Registered:', response.data);
          // optionally store token or redirect user
          navigate('/login');
        } catch (error) {
          console.error('Error registering user:', error.response?.data?.message || error.message);
        }
      };
    

    const handlePasswordVisibility = () => {
        const newType = passwordType === 'password' ? 'text' : 'password';
        setPasswordType(newType);
      };
    
    return (
        <>
            <div className="container-fluid">
                <div className="signup">
                    <h2>Signup</h2>
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="first-name">Name</label>
                            <input type="text" id="first-name" name="name" onChange={handleChange} value={formData.name} required/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required/>
                        </div>
                        <div className="form-group password">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type={passwordType} id="password" name="password" onChange={handleChange} value={formData.password} required/>
                            <button type="button" className="show-password-btn" onClick={handlePasswordVisibility}>{passwordType === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="mobile-number">Mobile Number</label>
                            <input type="tel" id="mobile-number" name="mobileNumber" onChange={handleChange} value={formData.mobileNumber} required/>
                        </div>
                        <div className="form-group checkbox">
                            <input type="checkbox" id="terms-conditions" className="terms-checkbox" name="terms-conditions" required/>
                            <label className="form-label" htmlFor="terms-conditions">I agree to the <a href="/signup">Terms and Conditions</a></label>
                        </div>
                        <div className="login-link">
                            <button type="submit" className="signup-btn">Signup</button>
                            <p>Already have an account? <a href="login">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );    
}
