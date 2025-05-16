import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  IconButton, 
  InputAdornment, 
  Divider,
  Paper,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  ChevronRight,
  Google,
  Facebook,
  Twitter,
  Apple
} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export const Signup = () => {
  // State variables
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setNotification({
          open: true,
          message: 'Account created successfully! Redirecting to login...',
          severity: 'success'
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false
          });
        }, 2000);
      }, 1500);
    }
  };

  // Handle sign up with Google
  const handleGoogleSignUp = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        open: true,
        message: 'Google authentication initiated...',
        severity: 'info'
      });
    }, 1000);
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Generate random bubbles for background animation
  const bubbles = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    size: Math.random() * 80 + 20,
    left: Math.random() * 100,
    animationDuration: Math.random() * 15 + 10
  }));

  return (
    <div className="signup-page">
      {/* Animated background */}
      <div className="background-animation">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDuration: `${bubble.animationDuration}s`
            }}
          />
        ))}
      </div>

      <Container maxWidth="lg" className="signup-container">
        <Grid container spacing={0} className="signup-grid">
          {/* Left side - Image and tagline */}
          <Grid item xs={12} md={6} className={`signup-showcase ${animationComplete ? 'animation-complete' : ''}`}>
            <div className="showcase-content">
              <Typography variant="h2" className="app-name">
                Elixir
              </Typography>
              
              <div className="tagline-container">
                <Typography variant="h3" className="tagline">
                  Join the shopping
                </Typography>
                <Typography variant="h3" className="tagline highlight">
                  revolution
                </Typography>
              </div>
              
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🚀</span>
                  <Typography variant="body1">Fast & Secure Checkout</Typography>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎁</span>
                  <Typography variant="body1">Exclusive Member Discounts</Typography>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <Typography variant="body1">Shop Anytime, Anywhere</Typography>
                </div>
              </div>
            </div>
            
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
            </div>
          </Grid>
          
          {/* Right side - Sign up form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={10} className={`signup-form-container ${animationComplete ? 'animation-complete' : ''}`}>
              <Box className="signup-header">
                <Typography variant="h4" className="form-title">
                  Create Your Account
                </Typography>
                <Typography variant="body1" color="textSecondary" className="form-subtitle">
                  Join thousands of shoppers today
                </Typography>
              </Box>
              
              {/* Social sign up buttons */}
              <Box className="social-signup">
                <Button 
                  variant="outlined" 
                  fullWidth 
                  className="google-button"
                  startIcon={<Google />}
                  onClick={handleGoogleSignUp}
                >
                  Continue with Google
                </Button>
                
                <Grid container spacing={2} className="mt-3">
                  <Grid item xs={4}>
                    <IconButton className="social-icon facebook-icon">
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton className="social-icon twitter-icon">
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton className="social-icon apple-icon">
                      <Apple />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              
              <div className="divider-container">
                <Divider className="divider">OR</Divider>
              </div>
              
              {/* Sign up form */}
              <form onSubmit={handleSubmit} className="signup-form">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person className="form-icon" />
                          </InputAdornment>
                        ),
                      }}
                      className="form-input"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person className="form-icon" />
                          </InputAdornment>
                        ),
                      }}
                      className="form-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className="form-icon" />
                          </InputAdornment>
                        ),
                      }}
                      className="form-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock className="form-icon" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      className="form-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock className="form-icon" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      className="form-input"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          color="primary"
                          className="terms-checkbox"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the <span className="terms-link">Terms of Service</span> and <span className="terms-link">Privacy Policy</span>
                        </Typography>
                      }
                    />
                    {errors.agreeTerms && (
                      <Typography variant="caption" color="error" className="error-text">
                        {errors.agreeTerms}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                      className="submit-button"
                      endIcon={isLoading ? null : <ChevronRight />}
                    >
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
              
              <Box className="login-link-container">
                <Typography variant="body2" className="login-text">
                  Already have an account?{' '}
                  <span className="login-link">Log In</span>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
