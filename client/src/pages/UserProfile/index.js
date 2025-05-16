import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, ShoppingBag, Heart, Clock, LogOut, Settings, CreditCard, ChevronRight, Edit } from 'lucide-react';

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  
  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "March 2022",
    profileImage: "profile.jpg",
    address: "123 Shopping Lane, Commerce City",
    orders: [
      { id: "#ELX8294", date: "12 Apr 2025", status: "Delivered", amount: "$120.99" },
      { id: "#ELX7631", date: "28 Mar 2025", status: "Processing", amount: "$89.50" },
      { id: "#ELX6522", date: "15 Feb 2025", status: "Delivered", amount: "$210.25" }
    ],
    wishlist: [
      { name: "Premium Smartwatch", price: "$299.99", image: "/api/placeholder/80/80" },
      { name: "Wireless Earbuds", price: "$129.99", image: "/api/placeholder/80/80" }
    ]
  };

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="profile-stats">
              <div className="stat-card">
                <ShoppingBag className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-number">{userData.orders.length}</span>
                  <span className="stat-label">Orders</span>
                </div>
              </div>
              <div className="stat-card">
                <Heart className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-number">{userData.wishlist.length}</span>
                  <span className="stat-label">Wishlist</span>
                </div>
              </div>
              <div className="stat-card">
                <Clock className="stat-icon" />
                <div className="stat-details">
                  <span className="stat-number">{userData.joined}</span>
                  <span className="stat-label">Member Since</span>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Orders</h3>
              <div className="order-list">
                {userData.orders.map((order, index) => (
                  <div className="order-item" key={index}>
                    <div className="order-basic">
                      <span className="order-id">{order.id}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                    </div>
                    <div className="order-details">
                      <span className="order-date">{order.date}</span>
                      <span className="order-amount">{order.amount}</span>
                    </div>
                    <ChevronRight className="view-details" />
                  </div>
                ))}
              </div>
            </div>

            <div className="wishlist-preview">
              <div className="section-header">
                <h3>Wishlist</h3>
                <button className="view-all">View All</button>
              </div>
              <div className="wishlist-items">
                {userData.wishlist.map((item, index) => (
                  <div className="wishlist-item" key={index}>
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <button className="add-to-cart">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="orders-content">
            <h3>Your Orders</h3>
            <div className="orders-list">
              {userData.orders.map((order, index) => (
                <div className="order-card" key={index}>
                  <div className="order-header">
                    <div>
                      <span className="order-id">{order.id}</span>
                      <span className="order-date">Placed on {order.date}</span>
                    </div>
                    <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="order-body">
                    <div className="order-product-placeholder"></div>
                    <div className="order-actions">
                      <button className="order-action">Track Order</button>
                      <button className="order-action secondary">View Details</button>
                    </div>
                  </div>
                  <div className="order-footer">
                    <span className="total-amount">Total: {order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="wishlist-content">
            <h3>Your Wishlist</h3>
            <div className="wishlist-grid">
              {userData.wishlist.concat(userData.wishlist).map((item, index) => (
                <div className="wishlist-card" key={index}>
                  <div className="image-container">
                    <img src={item.image} alt={item.name} />
                    <button className="remove-wishlist">
                      <Heart className="heart-filled" />
                    </button>
                  </div>
                  <div className="wishlist-card-details">
                    <h4>{item.name}</h4>
                    <span className="price">{item.price}</span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="settings-content">
            <h3>Account Settings</h3>
            <div className="setting-group">
              <h4>Personal Information</h4>
              <div className="setting-field">
                <label>Full Name</label>
                <div className="field-value">
                  <span>{userData.name}</span>
                  <Edit className="edit-icon" />
                </div>
              </div>
              <div className="setting-field">
                <label>Email Address</label>
                <div className="field-value">
                  <span>{userData.email}</span>
                  <Edit className="edit-icon" />
                </div>
              </div>
              <div className="setting-field">
                <label>Shipping Address</label>
                <div className="field-value">
                  <span>{userData.address}</span>
                  <Edit className="edit-icon" />
                </div>
              </div>
            </div>
            <div className="setting-group">
              <h4>Payment Methods</h4>
              <div className="payment-methods">
                <div className="payment-method">
                  <CreditCard className="payment-icon" />
                  <span>•••• 4582</span>
                  <button className="default-badge">Default</button>
                </div>
                <button className="add-payment">+ Add Payment Method</button>
              </div>
            </div>
            <div className="setting-group">
              <h4>Security</h4>
              <button className="change-password">Change Password</button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="profile-page">
      <div className={`loading-overlay ${isLoaded ? 'hidden' : ''}`}>
        <div className="loader"></div>
        <span>Loading your profile...</span>
      </div>
      
      <div className="profile-header">
        <div className="header-content">
          <h1>My Account</h1>
          <div className="breadcrumb">
            <span>Elixir</span>
            <span className="separator">›</span>
            <span className="current">Account</span>
          </div>
        </div>
      </div>

      <main className={`profile-container ${isLoaded ? 'loaded' : ''}`}>
        <aside className="profile-sidebar">
          <div className="user-profile">
            <div className="profile-image-container">
              <img src={userData.profileImage} alt="Profile" className="profile-image" />
              <div className="profile-status online"></div>
            </div>
            <div className="user-info">
              <h2 className="user-name">{userData.name}</h2>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          
          <nav className="profile-navigation">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <User className="nav-icon" />
              <span>Overview</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag className="nav-icon" />
              <span>My Orders</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart className="nav-icon" />
              <span>Wishlist</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="nav-icon" />
              <span>Settings</span>
            </button>
          </nav>
          
          <div className="logout-container">
            <button className="logout-button" onClick={handleLogout}>
              <LogOut className="logout-icon" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        
        <section className="content-area">
          <div className="content-wrapper">
            {renderTabContent()}
          </div>
        </section>
      </main>
    </div>
  );
};
