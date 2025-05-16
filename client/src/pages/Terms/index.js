import React, { useEffect, useState } from 'react';
import './style.css';

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animateHeaders, setAnimateHeaders] = useState(false);

  useEffect(() => {
    // Trigger initial animations after component mounts
    setTimeout(() => {
      setAnimateHeaders(true);
    }, 300);

    // Show/hide scroll to top button based on scroll position
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Check which section is in view
      const sections = document.querySelectorAll('.terms-page .section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.terms-page .section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    {
      title: "Introduction",
      content: "Welcome to Elixir, an ecommerce platform owned and operated by CrimsonX. These Terms of Service govern your use of our website, mobile application, and services. By accessing or using Elixir, you agree to be bound by these terms. Please read them carefully before proceeding with your purchase or registration."
    },
    {
      title: "Account Registration",
      content: "To access certain features of Elixir, you may need to register for an account. You agree to provide accurate and complete information during registration and to update such information to keep it accurate and current. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Elixir reserves the right to suspend or terminate accounts that violate these Terms of Service."
    },
    {
      title: "Products & Services",
      content: "Elixir offers a variety of products for sale through our platform. We strive to accurately display product colors, images, and descriptions, but we cannot guarantee that your computer or mobile device will display colors accurately. Prices are subject to change without notice. We reserve the right to limit quantities of products available for purchase. Products are subject to availability and we reserve the right to discontinue any product at any time."
    },
    {
      title: "Payments & Billing",
      content: "By providing a credit card or other payment method, you confirm that you are authorized to use the designated payment method. You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts. If your order is subject to recurring charges, you consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge."
    },
    {
      title: "Shipping & Delivery",
      content: "Shipping and delivery dates are estimates only and cannot be guaranteed. We are not liable for any delays in shipments. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments. Shipping fees are non-refundable unless otherwise specified in our Return Policy."
    },
    {
      title: "Returns & Refunds",
      content: "If you are not satisfied with your purchase, you may return it within 30 days of receipt for a full refund of the purchase price, excluding shipping and handling fees. Items must be returned in their original packaging and in new, unused condition. Certain products may be exempt from our standard return policy, which will be clearly indicated on the product page. Refunds will be credited to the original form of payment used for purchase."
    },
    {
      title: "Intellectual Property",
      content: "All content on the Elixir platform, including text, graphics, logos, images, and software, is the property of Elixir or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of Elixir. You may not reproduce, duplicate, copy, sell, resell, or otherwise exploit any portion of the Elixir platform without express written consent from us."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms of Service, explains how we collect, use, and protect your personal information. By using Elixir, you consent to the data practices described in our Privacy Policy."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall Elixir, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any (i) errors, mistakes, or inaccuracies of content; (ii) personal injury or property damage related to your use of the service; (iii) unauthorized access to our servers and/or any personal information stored therein; (iv) interruption or cessation of transmission to or from our service; (v) bugs, viruses, or the like; and/or (vi) any loss or damage of any kind incurred as a result of your use of our service."
    },
    {
      title: "Changes to Terms",
      content: "Elixir reserves the right to modify these Terms of Service at any time. We will notify registered users of significant changes by email and post a notice on our website. Your continued use of Elixir after any changes indicates your acceptance of the new Terms. If you do not agree to the changes, you should discontinue using our services and terminate your account."
    },
    {
      title: "Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at support@elixir.com or through the Contact Us form on our website. Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM EST."
    }
  ];

  return (
    <div className="terms-page">
      <div className="hero-section">
        <div className={`hero-content ${animateHeaders ? 'animate' : ''}`}>
          <h1>Terms of Service</h1>
          <p>Last Updated: May 7, 2025</p>
          <div className="hero-underline"></div>
        </div>
      </div>

      <div className="container">
        <div className="sidebar">
          <div className="sidebar-inner">
            <div className="toc-heading">Table of Contents</div>
            <ul className="toc-list">
              {sections.map((section, index) => (
                <li 
                  key={index}
                  className={activeSection === index ? 'active' : ''}
                  onClick={() => scrollToSection(index)}
                >
                  <span className="toc-number">{index + 1}</span>
                  <span className="toc-text">{section.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="content">
          {sections.map((section, index) => (
            <div className="section" key={index} id={`section-${index}`}>
              <h2>
                <span className="section-number">{index + 1}.</span>
                {section.title}
              </h2>
              <div className="section-underline"></div>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <button 
        className={`scroll-top-btn ${showScrollTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
};
