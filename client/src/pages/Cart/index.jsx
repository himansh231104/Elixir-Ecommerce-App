import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import './style.css';
import API from '../../utils/axiosConfig';

export const Cart = () => {
 
  const [checkoutStage, setCheckoutStage] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [cartData, setCartData] = useState({});

  useEffect(()=>{
    const fetchCartData = async () => {
      try {
        const cartRes = await API.get('/cart');
        setCartData(cartRes.data);
      } catch (error) {
        console.log('Failed to fetch cart or product details', error);
      }
    }
    fetchCartData();
  }, [])


  // Calculate cart totals
  const subtotal = cartData?.items?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

// ✅ Update quantity by matching item._id
const updateQuantity = (itemId, change) => {
  setCartData(prevCart => {
    const updatedItems = prevCart.items.map(item => {
      if (item._id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);

        // ✅ Make API call with updated quantity
        API.put(`/cart/${itemId}`, { quantity: newQuantity })
          .catch(error => console.log('Failed to update cart quantity', error));

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    return {
      ...prevCart,
      items: updatedItems,
    };
  });
};

// ✅ Remove item by matching item._id
const removeItem = (itemId) => {
  setCartData(prevCart => ({
    ...prevCart,
    items: prevCart.items.filter(item => item._id !== itemId),
  }));

  API.delete(`/cart/${itemId}`)
    .catch(error => console.log('Failed to remove item from cart', error));
};



  // Animation effect when component mounts
  useEffect(() => {
    const cartElement = document.querySelector('.cart-page');
    cartElement.classList.add('cart-page-visible');
  }, []);

  // Animation for checkout progress
  const nextCheckoutStage = () => {
    if (checkoutStage < 2) {
      setCheckoutStage(prev => prev + 1);
    } else {
      // Submit order - in real app this would connect to your backend
      setIsCartVisible(false);
    }
  };

  return (
    <div className="cart-page">
      {isCartVisible ? (
        <>
          <div className="cart-header">
            <h1><ShoppingBag className="icon" /> Your Shopping Cart</h1>
            <p className="cart-count">{cartData?.items?.length} {cartData?.items?.length === 1 ? 'item' : 'items'}</p>
          </div>

          <div className="cart-container">
            <div className="cart-items-container">
              {cartData?.items?.map((item, index) => (
                <div 
                  className="cart-item" 
                  key={item.product._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="item-image">
                    <img src={`/assets/products/${item.product.image}.jpg`} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-price">₹{item.product?.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item._id, -1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item._id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>₹{(item.product.price * item.quantity)?.toFixed(2)}</p>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeItem(item._id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal?.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{tax?.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total?.toFixed(2)}</span>
              </div>
              
              <div className="checkout-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(checkoutStage + 1) * 33.33}%` }}
                  ></div>
                </div>
                <div className="progress-steps">
                  <div className={`progress-step ${checkoutStage >= 0 ? 'active' : ''}`}>Cart</div>
                  <div className={`progress-step ${checkoutStage >= 1 ? 'active' : ''}`}>Shipping</div>
                  <div className={`progress-step ${checkoutStage >= 2 ? 'active' : ''}`}>Payment</div>
                </div>
              </div>
              
              {checkoutStage === 0 && (
                <div className="checkout-section cart-section">
                  <button className="continue-btn" onClick={nextCheckoutStage}>
                    Continue to Shipping <ArrowRight className="icon" />
                  </button>
                </div>
              )}
              
              {checkoutStage === 1 && (
                <div className="checkout-section shipping-section">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter your address" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input type="text" placeholder="Zip Code" />
                    </div>
                  </div>
                  <button className="continue-btn" onClick={nextCheckoutStage}>
                    Continue to Payment <ArrowRight className="icon" />
                  </button>
                </div>
              )}
              
              {checkoutStage === 2 && (
                <div className="checkout-section payment-section">
                  <div className="credit-card-input">
                    <CreditCard className="card-icon" />
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <button className="place-order-btn" onClick={nextCheckoutStage}>
                    Place Order (₹{total?.toFixed(2)})
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="order-confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Thank You for Your Order!</h2>
          <p>Your order has been placed successfully.</p>
          <p className="order-number">Order #: {Math.floor(Math.random() * 10000000)}</p>
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};
