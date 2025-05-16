import React, { useState, useEffect } from 'react';
import './style.css';

export const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    
    // Show success animation
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };
  
  // Set loaded state after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className={`contact-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="animated-background">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
      
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="title">Get in Touch</h1>
          <p className="subtitle">We'd love to hear from you!</p>
        </div>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <div className="icon-wrapper">
                <i className="icon location-icon"></i>
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>123 Shopping Avenue, E-Commerce City</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <i className="icon email-icon"></i>
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>support@yourecommerce.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper">
                <i className="icon phone-icon"></i>
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="social-links">
              <div className="social-title">Follow Us</div>
              <div className="social-icons">
                <a href="/#" className="social-icon facebook" aria-label="Facebook"></a>
                <a href="/#" className="social-icon instagram" aria-label="Facebook"></a>
                <a href="/#" className="social-icon twitter" aria-label="Facebook"></a>
                <a href="/#" className="social-icon pinterest" aria-label="Facebook"></a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon"></div>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                  <span className="input-focus-effect"></span>
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="form-input"
                  />
                  <span className="input-focus-effect"></span>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="form-input"
                  />
                  <span className="input-focus-effect"></span>
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="form-input form-textarea"
                  ></textarea>
                  <span className="input-focus-effect"></span>
                </div>
                
                <button type="submit" className="submit-button">
                  <span className="button-text">Send Message</span>
                  <span className="button-icon"></span>
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="map-container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            {/* Here you would typically embed a map */}
            <div className="map-overlay">
              <div className="map-pin"></div>
            </div>
          </div>
        </div>
        
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>We offer a 30-day return policy for all unused items in original packaging.</p>
            </div>
            <div className="faq-item">
              <h3>How long does shipping take?</h3>
              <p>Standard shipping typically takes 3-5 business days within the continental US.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
