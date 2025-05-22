import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaShoppingBag, FaHeart, FaEdit, FaSignOutAlt, FaHistory, FaStar, FaTrophy, FaMedal } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [userData, setUserData] = useState({});

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const profileRes = await axios.get('http://localhost:5000/api/users/profile', { headers })

        setUserData(profileRes.data);
        const userId = profileRes.data._id;
        const [ordersRes, wishlistRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/orders/myorders`, { headers }),
          axios.get(`http://localhost:5000/api/wishlist/${userId}`, { headers })
        ]);
        setOrders(ordersRes.data);
        setWishlist(wishlistRes.data);
      } catch (error) {
        console.error('Error fetching user or cart data:', error);
      }
    };

    fetchAllData();
  }, []);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would make an API call to update the user data
    console.log('Updated user data:', userData);
    setIsEditing(false);
  };
  
  const handleImageChange = (e) => {
    // Handle image upload functionality
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate join date in readable format
  const joinDate = userData?.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';
  
  return (
    
    <div className="profile-page">
      <div className="profile-header">
        <motion.div 
          className="profile-avatar-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={`/assets/userProfile/${userData.profileImage}`} alt="Profile" className="profile-avatar" />
          {activeTab === 'profile' && (
            <div className="profile-avatar-overlay">
              <label htmlFor="profile-image-upload" className="edit-avatar-btn">
                <FaEdit />
              </label>
              <input 
                type="file" 
                id="profile-image-upload" 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: 'none' }}
              />
            </div>
          )}
        </motion.div>
        <motion.h1 
          className="profile-name"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {userData?.name}
        </motion.h1>
        <motion.p 
          className="profile-joined"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Member since {joinDate}
        </motion.p>
      </div>
      
      <div className="profile-content">
        <motion.div 
          className="profile-navigation"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            <FaShoppingBag /> Orders
            {orders && orders.length > 0 && (
              <span className="notification-badge">{orders.length}</span>
            )}
          </button>
          <button 
            className={`nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleTabChange('wishlist')}
          >
            <FaHeart /> Wishlist
            {wishlist && wishlist.items && wishlist.items.length > 0 && (
              <span className="notification-badge">{wishlist.items.length}</span>
            )}
          </button>
          <button className="nav-btn logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </motion.div>
        
        <div className="profile-details">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                className="profile-info"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={fadeIn}
              >
                <div className="info-header">
                  <h2>Personal Information</h2>
                  <button 
                    className="edit-toggle-btn"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {isEditing ? (
                  <motion.form 
                    onSubmit={handleSubmit}
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input 
                        type="tel"
                        name="mobileNumber"
                        value={userData.mobileNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        rows="3"
                      />
                    </div>
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="info-details"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="info-item">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{userData.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email Address:</span>
                      <span className="info-value">{userData.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Mobile Number:</span>
                      <span className="info-value">{userData.mobileNumber}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Address:</span>
                      <span className="info-value">{userData.address || 'No address provided'}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                className="orders-list"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={fadeIn}
              >
                <h2>Your Orders</h2>
                {orders && orders.length > 0 ? (
                  <div className="orders-container">
                    {orders.map((order, index) => (
                      <motion.div 
                        key={order._id || index}
                        className="order-item"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="order-header">
                          <div className="order-id">
                            <span className="label">Order ID:</span>
                            <span className="value">#{order._id?.substring(0, 8) || `TEMP-${index}`}</span>
                          </div>
                          <div className="order-date">
                            <span className="label">Date:</span>
                            <span className="value">
                              {new Date(order.createdAt).toLocaleDateString('en-US')}
                            </span>
                          </div>
                          <div className={`order-status ${order.orderStatus.toLowerCase()}`}>
                            {order.orderStatus}
                          </div>
                        </div>
                        
                        <div className="order-details">
                          <div className="order-items">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="order-product">
                                <img
                                  src={item.product?.image?.startsWith("http") 
                                    ? item.product.image 
                                    : `/assets/products/${item.product.image}.jpg`} 
                                  alt={item.product?.name || "Product"} 
                                  className="product-thumbnail" 
                                />
                                <div className="product-info">
                                  <h4>{item.product?.name || "Product"}</h4>
                                  <p>Qty: {item.quantity} × ${item.product.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="order-summary">
                            <div className="total-price">
                              <span className="label">Total:</span>
                              <span className="value">${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="payment-method">
                              <span className="label">Payment:</span>
                              <span className="value">{order.paymentMethod}</span>
                            </div>
                            <button className="view-details-btn">
                              <FaHistory /> Track Order
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <img src="/empty-orders.svg" alt="No orders" />
                    <p>You haven't placed any orders yet.</p>
                    <button className="shop-now-btn">Shop Now</button>
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'wishlist' && (
              <motion.div 
                key="wishlist"
                className="wishlist-items"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={fadeIn}
              >
                <h2>Your Wishlist</h2>
                {wishlist && wishlist.items && wishlist.items.length > 0 ? (
                  <div className="wishlist-grid">
                    {wishlist.items.map((item, index) => (
                      <motion.div 
                        key={item.product._id || index}
                        className="wishlist-product"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="wishlist-product-image">
                          <img
                            src={`/assets/products/${item.product.image}.jpg`}
                            alt={item.product.name}
                          />
                          <button className="remove-btn">×</button>
                        </div>
                        <div className="wishlist-product-info">
                          <h3>{item.product.name}</h3>
                          <p className="price">${item.product.price.toFixed(2)}</p>
                          <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <img src="/empty-wishlist.svg" alt="Empty wishlist" />
                    <p>Your wishlist is empty.</p>
                    <button className="shop-now-btn">Discover Products</button>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
