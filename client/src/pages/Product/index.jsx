import React, { useState, useEffect } from 'react';
import './style.css';
import API from '../../utils/axiosConfig';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileRes = await API.get('/users/profile')
        setUser(profileRes.data);
      } catch (error) {
        console.error('Error fetching userdata:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async () => {
    // Add to cart logic here
      try {
        const items = [{ product: product._id, quantity }];
        const res = await API.post(`/cart`, { items, user });
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log(`Buying ${quantity} ${product.name}(s) now`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="product-page loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-content">
          {/* Product Images Section */}
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={`/assets/products/${product.image}.jpg`} 
                alt={product.name}
                className="main-image"
              />
              <div className="image-overlay">
                <button className="zoom-btn">🔍</button>
                <button 
                  className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                  onClick={() => setIsInWishlist(!isInWishlist)}
                >
                  ❤️
                </button>
              </div>
            </div>
            <div className="thumbnail-container">
              {/* {product.image.map((img, index) => ( */}
                <img
                  // key={index}
                  src={`/assets/products/${product.image}.jpg`}
                  alt={`${product.name}`}
                  className={`thumbnail`}
                  
                />
              {/* ))} */}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info">
            <div className="product-header">
              <div className="brand-badge">{product.brand}</div>
              <h1 className="product-title">{product.name}</h1>
              <div className="rating-section">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.numReviews} reviews)
                </span>
              </div>
            </div>

            <div className="price-section">
              <span className="current-price">₹{product.price}</span>
              <span className="original-price">₹399.99</span>
              <span className="discount-badge">25% OFF</span>
            </div>

            <div className="stock-info">
              <span className={`stock-status ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.countInStock > 0 ? `✓ In Stock (${product.countInStock} available)` : '✗ Out of Stock'}
              </span>
            </div>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                <span>🛒</span> Add to Cart
              </button>
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={product.countInStock === 0}
              >
                <span>⚡</span> Buy Now
              </button>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Free shipping on orders over ₹100</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.numReviews})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <div className="description-features">
                  <h4>Key Features:</h4>
                  <ul>
                    <li>Active Noise Cancellation Technology</li>
                    <li>30-hour battery life with quick charge</li>
                    <li>Premium comfort padding</li>
                    <li>Bluetooth 5.0 connectivity</li>
                    <li>Touch controls for easy operation</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Brand:</span>
                    <span className="spec-value">{product.brand}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Category:</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Connectivity:</span>
                    <span className="spec-value">Bluetooth 5.0, USB-C</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Battery Life:</span>
                    <span className="spec-value">30 hours</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Weight:</span>
                    <span className="spec-value">250g</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Warranty:</span>
                    <span className="spec-value">2 years</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <h3>Customer Reviews</h3>
                  <div className="review-summary">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span>Based on {product.numReviews} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="reviews-list">
                  {product.reviews.map((review) => (
                    <div key={review._id} className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">{review.name}</span>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
