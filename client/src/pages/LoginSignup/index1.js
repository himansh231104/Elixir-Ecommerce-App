import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Login = () => {

    const [passwordType, setPasswordType] = useState('password');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
          const response = await axios.post('http://localhost:5000/api/users/login', formData);
          console.log('Logged in:', response.data);
          navigate('/profile');
        } catch (error) {
          console.error('Error Logging user:', error.response?.data?.message || error.message);
        }
      };
    

    const handlePasswordVisibility = () => {
        const newType = passwordType === 'password' ? 'text' : 'password';
        setPasswordType(newType);
      };
    
    return (
        <>
            <div className="container-fluid">
                <div className="login">
                    <h2>Login</h2>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" id="email" name="email"  onChange={handleChange} value={formData.email} required/>
                        </div>
                        <div className="form-group password">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type={passwordType} id="password" name="password"  onChange={handleChange} value={formData.password} required/>
                            <button type="button" className="show-password-btn" onClick={handlePasswordVisibility}>{passwordType === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
                        </div>
                        <div className="form-group checkbox">
                            <input type="checkbox" id="terms-conditions" className="terms-checkbox" name="terms-conditions" required/>
                            <label className="form-label" htmlFor="terms-conditions">I agree to the <a href="/signup">Terms and Conditions</a></label>
                        </div>
                        <div className="login-link">
                            <button type="submit" className="signup-btn">Login</button>
                            <p>Don't have an account? <a href="signup">Create an account</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );    
}
