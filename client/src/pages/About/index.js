import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Users, Package, Award, ChevronRight } from 'lucide-react';
import './style.css';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7 } }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.7 } }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="hero-content">
          <motion.h1 variants={slideInLeft}>About <span className="highlight">Elixir</span></motion.h1>
          <motion.p variants={slideInRight}>
            Your premier destination for curated products that enhance your lifestyle
          </motion.p>
        </div>
        <div className="hero-overlay"></div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="mission-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeIn}>Our Mission & Vision</motion.h2>
          <div className="mission-content">
            <motion.div className="mission-card" variants={scaleUp}>
              <div className="mission-icon">
                <Award size={40} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide exceptional products and experiences that enhance our customers' lives, 
                while maintaining the highest standards of quality, innovation, and customer satisfaction.
              </p>
            </motion.div>
            <motion.div className="mission-card" variants={scaleUp}>
              <div className="mission-icon">
                <Users size={40} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and beloved ecommerce platform, empowering customers 
                to express themselves through thoughtfully designed products and extraordinary service.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Journey */}
      <motion.section 
        className="journey-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeIn}>Our Journey</motion.h2>
          <div className="timeline">
            <motion.div className="timeline-item" variants={slideInLeft}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2020</h3>
                <p>Founded with a vision to revolutionize online shopping</p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={slideInRight}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2021</h3>
                <p>Expanded product catalog to over 1,000 unique items</p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={slideInLeft}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2022</h3>
                <p>Launched innovative mobile app with AR features</p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={slideInRight}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2023</h3>
                <p>Received "Best Customer Experience" award</p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={slideInLeft}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2024</h3>
                <p>Expanded operations nationwide with 5 fulfillment centers</p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={slideInRight}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2025</h3>
                <p>Implementing sustainable practices across all operations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="team-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeIn}>Meet Our Team</motion.h2>
          <div className="team-grid">
            <motion.div className="team-member" variants={scaleUp}>
              <div className="member-photo">
                <div className="photo-placeholder" style={{
                  backgroundImage: `url('/assets/userProfile/profile.jpg')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  }}>
                </div>
                <div className="member-social">
                  <span className="social-icon">in</span>
                  <span className="social-icon">f</span>
                  <span className="social-icon">t</span>
                </div>
              </div>
              <h3>Himanshu Raj</h3>
              <p>Founder & CEO</p>
            </motion.div>
            <motion.div className="team-member" variants={scaleUp}>
              <div className="member-photo">
                <div className="photo-placeholder" style={{
                  backgroundImage: `url('/assets/userProfile/abhi.jpg')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  }}></div>
                <div className="member-social">
                  <span className="social-icon">in</span>
                  <span className="social-icon">f</span>
                  <span className="social-icon">t</span>
                </div>
              </div>
              <h3>Abhimanu Pandey</h3>
              <p>Creative Director</p>
            </motion.div>
            <motion.div className="team-member" variants={scaleUp}>
              <div className="member-photo">
                <div className="photo-placeholder" style={{
                  backgroundImage: `url('/assets/userProfile/hima.jpg')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  }}></div>
                <div className="member-social">
                  <span className="social-icon">in</span>
                  <span className="social-icon">f</span>
                  <span className="social-icon">t</span>
                </div>
              </div>
              <h3>Himanshu Kumar</h3>
              <p>Head of Operations</p>
            </motion.div>
            <motion.div className="team-member" variants={scaleUp}>
              <div className="member-photo">
                <div className="photo-placeholder" style={{
                  backgroundImage: `url('/assets/userProfile/aashu.jpg')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  }}></div>
                <div className="member-social">
                  <span className="social-icon">in</span>
                  <span className="social-icon">f</span>
                  <span className="social-icon">t</span>
                </div>
              </div>
              <h3>Aashutosh Kashyap</h3>
              <p>Customer Experience</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeIn}>Why Choose Elixir</motion.h2>
          <div className="features-grid">
            <motion.div className="feature-card" variants={scaleUp}>
              <div className="feature-icon">
                <Package size={32} />
              </div>
              <h3>Premium Quality</h3>
              <p>We source only the highest quality products from trusted suppliers</p>
            </motion.div>
            <motion.div className="feature-card" variants={scaleUp}>
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Fast Delivery</h3>
              <p>Enjoy quick shipping and hassle-free returns on all orders</p>
            </motion.div>
            <motion.div className="feature-card" variants={scaleUp}>
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Personalized Service</h3>
              <p>Our customer service team is always ready to assist you</p>
            </motion.div>
            <motion.div className="feature-card" variants={scaleUp}>
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3>Satisfaction Guarantee</h3>
              <p>We stand behind every product with our 100% satisfaction guarantee</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section 
        className="contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.h2 variants={fadeIn}>Get In Touch</motion.h2>
          <div className="contact-wrapper">
            <motion.div className="contact-info" variants={slideInLeft}>
              <div className="contact-card">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-details">
                  <h3>Visit Us</h3>
                  <p>Khagaul Road, Patna - 801105, Bihar</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>Crimsonx2311@gmail.com</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>011 2553 2553</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <Clock size={24} />
                </div>
                <div className="contact-details">
                  <h3>Hours</h3>
                  <p>Monday - Saturday: 9am - 7pm</p>
                </div>
              </div>
            </motion.div>
            <motion.div className="contact-form" variants={slideInRight}>
              <h3>Send Us a Message</h3>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message <ChevronRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Map location */}
      <div className="map-section">
        <div className="map-container">
          {/* This would be replaced with actual map implementation */}
          <div className="map-placeholder">
            <div className="map-pin">
              <MapPin size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <motion.section 
        className="newsletter-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email Address" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer credit */}
      <div className="footer-credit">
        <p>Designed & Developed by <span className="highlight">CrimsonX</span> | Himanshu Raj</p>
      </div>
    </div>
  );
};
