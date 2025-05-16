import React, { useEffect, useState } from 'react';
import './Footer.css';

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  // Sections of the footer
  const sections = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", link: "/new-arrivals" },
        { name: "Best Sellers", link: "/best-sellers" },
        { name: "Sale", link: "/sale" },
        { name: "Collections", link: "/collections" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Track Order", link: "/track-order" },
        { name: "Returns & Exchanges", link: "/returns" },
        { name: "Shipping Info", link: "/shipping" },
        { name: "FAQ", link: "/faq" }
      ]
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", link: "/about" },
        { name: "Blog", link: "/blog" },
        { name: "Careers", link: "/careers" },
        { name: "Contact Us", link: "/contact" }
      ]
    }
  ];

  // Check if user has scrolled down enough to show "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 600);
      
      // Also set the footer to visible when scrolled near the bottom
      const bottomOfPage = window.scrollY + window.innerHeight >= document.body.offsetHeight - 300;
      if (bottomOfPage && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial animation immediately
    setIsVisible(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const handleMouseEnter = (index) => {
    setHoveredLink(index);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('Crimsonx2311@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {showScrollUp && (
        <div className="footer-scroll-up" onClick={scrollToTop}>
          <div className="footer-scroll-up-icon">↑</div>
          <span>Back to top</span>
        </div>
      )}
      
      <div className={`footer-wave-container ${isVisible ? 'footer-visible' : ''}`}>
        <div className="footer-wave"></div>
        <div className="footer-wave footer-wave2"></div>
        <div className="footer-wave footer-wave3"></div>
      </div>

      <div className={`footer-content ${isVisible ? 'footer-visible' : ''}`}>
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-text">Elixir</span>
            <div className="footer-logo-tagline">Style Redefined</div>
          </div>
          <p className="footer-description">
            Discover curated fashion that combines elegance with modern aesthetics. 
            From everyday essentials to statement pieces, find your style with Elixir.
          </p>
          <div className="footer-social">
            <a href="/#" className="footer-social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/#" className="footer-social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/#" className="footer-social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/#" className="footer-social-icon" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        <div className="footer-links-wrapper">
          <div className="footer-links-section">
            <h3 className="footer-links-title">Shop</h3>
            <ul className="footer-links">
              {sections[0].links.map((link, linkIndex) => {
                const globalIndex = `0-${linkIndex}`;
                return (
                  <li 
                    key={linkIndex} 
                    className={`footer-link-item ${hoveredLink === globalIndex ? 'footer-link-hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter(globalIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a href={link.link} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-links-section">
            <h3 className="footer-links-title">Customer Service</h3>
            <ul className="footer-links">
              {sections[1].links.map((link, linkIndex) => {
                const globalIndex = `1-${linkIndex}`;
                return (
                  <li 
                    key={linkIndex} 
                    className={`footer-link-item ${hoveredLink === globalIndex ? 'footer-link-hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter(globalIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a href={link.link} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-links-section">
            <h3 className="footer-links-title">About Us</h3>
            <ul className="footer-links">
              {sections[2].links.map((link, linkIndex) => {
                const globalIndex = `2-${linkIndex}`;
                return (
                  <li 
                    key={linkIndex} 
                    className={`footer-link-item ${hoveredLink === globalIndex ? 'footer-link-hovered' : ''}`}
                    onMouseEnter={() => handleMouseEnter(globalIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a href={link.link} className="footer-link">
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer-contact">
          <h3 className="footer-contact-title">Get In Touch</h3>
          
          <div className="footer-contact-item">
            <i className="fas fa-map-marker-alt footer-contact-icon"></i>
            <span>Khagaul Road, Patna - 801105, Bihar</span>
          </div>
          
          <div className="footer-contact-item">
            <i className="fas fa-phone-alt footer-contact-icon"></i>
            <span>011 2553 2553</span>
          </div>
          
          <div className="footer-contact-item footer-email" onClick={copyEmail}>
            <i className="fas fa-envelope footer-contact-icon"></i>
            <span>Crimsonx2311@gmail.com</span>
            <div className={`footer-email-tooltip ${emailCopied ? 'footer-show-tooltip' : ''}`}>
              Email copied!
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-newsletter-title">Subscribe to our newsletter</h4>
            <div className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="footer-newsletter-input" 
              />
              <button className="footer-newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`footer-bottom ${isVisible ? 'footer-visible' : ''}`}>
        <div className="footer-bottom-content">
          <div className="footer-copyright">
            © {currentYear} Elixir. All rights reserved. Designed by CrimsonX
          </div>
          <div className="footer-bottom-links">
            <a href="/privacy-policy" className="footer-bottom-link">Privacy Policy</a>
            <a href="/terms-of-service" className="footer-bottom-link">Terms of Service</a>
            <a href="/sitemap" className="footer-bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
