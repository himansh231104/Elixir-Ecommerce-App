import React, { useEffect, useState } from 'react';
import './style.css';

export const Policy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Show page with animation after initial render
    setIsLoaded(true);
    
    // Set the first section as active by default
    setTimeout(() => {
      setActiveSection('introduction');
    }, 800);

    // Intersection Observer for animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`privacy-policy-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="decorative-elements">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="dot-grid"></div>
      </div>

      <header className="policy-header">
        <div className="logo-container">
          <h1 className="logo">Elixir</h1>
          <div className="tagline">Experience the extraordinary</div>
        </div>
        <h2 className="title animate-on-scroll">Privacy Policy</h2>
        <p className="subtitle animate-on-scroll">Last Updated: May 7, 2025</p>
      </header>

      <div className="policy-content">
        <nav className="policy-nav">
          <ul>
            {[
              { id: 'introduction', label: 'Introduction' },
              { id: 'information-collection', label: 'Information Collection' },
              { id: 'information-use', label: 'Use of Information' },
              { id: 'information-sharing', label: 'Information Sharing' },
              { id: 'security', label: 'Security Measures' },
              { id: 'cookies', label: 'Cookies & Tracking' },
              { id: 'rights', label: 'Your Rights' },
              { id: 'changes', label: 'Policy Changes' },
              { id: 'contact', label: 'Contact Us' },
            ].map((section) => (
              <li 
                key={section.id} 
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => handleNavClick(section.id)}
              >
                <span>{section.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="policy-sections">
          <section id="introduction" className="policy-section animate-on-scroll">
            <h3>Introduction</h3>
            <div className="section-content">
              <p>Welcome to Elixir, your premium ecommerce destination. At Elixir, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
              <p>Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by all terms outlined in this policy.</p>
            </div>
          </section>

          <section id="information-collection" className="policy-section animate-on-scroll">
            <h3>Information Collection</h3>
            <div className="section-content">
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul>
                <li>Personal identifiers such as name, postal address, email address, telephone number</li>
                <li>Payment information such as credit card details (stored securely through our payment processors)</li>
                <li>Account information including username and password</li>
                <li>Purchase history and preferences</li>
                <li>Technical data including IP address, browser type, time spent on pages</li>
                <li>Feedback and survey responses</li>
              </ul>
            </div>
          </section>

          <section id="information-use" className="policy-section animate-on-scroll">
            <h3>Use of Information</h3>
            <div className="section-content">
              <p>We use your information for various purposes, including:</p>
              <ul>
                <li>Processing and fulfilling your orders</li>
                <li>Managing your account and providing customer support</li>
                <li>Sending transactional emails and order updates</li>
                <li>Personalizing your shopping experience</li>
                <li>Improving our website and product offerings</li>
                <li>Marketing and promotional communications (with your consent)</li>
                <li>Fraud prevention and security measures</li>
              </ul>
            </div>
          </section>

          <section id="information-sharing" className="policy-section animate-on-scroll">
            <h3>Information Sharing</h3>
            <div className="section-content">
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers who help us operate our business</li>
                <li>Payment processors to complete transactions</li>
                <li>Shipping and logistics partners to deliver your orders</li>
                <li>Marketing partners (with your explicit consent)</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p>We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.</p>
            </div>
          </section>

          <section id="security" className="policy-section animate-on-scroll">
            <h3>Security Measures</h3>
            <div className="section-content">
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, or destruction. These measures include:</p>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure storage of personal information</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
                <li>Access controls and authentication processes</li>
              </ul>
              <p>While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure.</p>
            </div>
          </section>

          <section id="cookies" className="policy-section animate-on-scroll">
            <h3>Cookies & Tracking</h3>
            <div className="section-content">
              <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Types of cookies we use include:</p>
              <ul>
                <li>Essential cookies for website functionality</li>
                <li>Analytical cookies to understand user behavior</li>
                <li>Preference cookies to remember your settings</li>
                <li>Marketing cookies for targeted advertising</li>
              </ul>
              <p>You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.</p>
            </div>
          </section>

          <section id="rights" className="policy-section animate-on-scroll">
            <h3>Your Rights</h3>
            <div className="section-content">
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              <ul>
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p>To exercise these rights, please contact us using the information provided in the Contact Us section.</p>
            </div>
          </section>

          <section id="changes" className="policy-section animate-on-scroll">
            <h3>Policy Changes</h3>
            <div className="section-content">
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.</p>
              <p>We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your information.</p>
            </div>
          </section>

          <section id="contact" className="policy-section animate-on-scroll">
            <h3>Contact Us</h3>
            <div className="section-content">
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
              <div className="contact-info">
                <p><strong>Elixir Customer Support</strong></p>
                <p>Email: privacy@elixir.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Commerce Street, Digital City, DC 10101</p>
              </div>
              <p>We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
