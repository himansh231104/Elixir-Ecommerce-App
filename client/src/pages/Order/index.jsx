import React, { useState, useEffect } from 'react';
import './style.css';
import API from '../../utils/axiosConfig';
import {
  ShoppingBag,
  ChevronRight,
  Truck,
  CreditCard,
  Check,
  Wallet,
} from 'lucide-react';
import { PayButton } from '../../components/PayButton/PayButton';

export const Order = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRes = await API.get('/cart');
        setOrderItems(cartRes.data.items);
      } catch (error) {
        console.log('Failed to fetch cart or product details', error);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (id, change) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.productid === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return orderItems?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 9.99;
    const tax = subtotal * 0.07;
    return subtotal + shipping + tax;
  };

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const steps = [
    { id: 1, title: 'Cart Review', icon: <ShoppingBag /> },
    { id: 2, title: 'Shipping', icon: <Truck /> },
    { id: 3, title: 'Payment', icon: <CreditCard /> },
  ];

  return (
    <div className={`order-page ${isLoaded ? 'loaded' : ''}`}>
      <div className='order-page-container'>
        <h1 className='order-page-title'>Complete Your Order</h1>

        <div className='order-page-steps'>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`order-page-step ${
                activeStep === step.id ? 'active' : ''
              } ${activeStep > step.id ? 'completed' : ''}`}
              onClick={() => activeStep > step.id && setActiveStep(step.id)}
            >
              <div className='order-page-step-icon'>
                {activeStep > step.id ? <Check size={20} /> : step.icon}
              </div>
              <div className='order-page-step-title'>{step.title}</div>
              {step.id !== steps.length && (
                <ChevronRight className='order-page-step-arrow' />
              )}
            </div>
          ))}
        </div>

        <div className='order-page-content'>
          {activeStep === 1 && (
            <div className='order-page-cart animate-fade-in'>
              <h2>Your Items</h2>
              <div className='order-page-items'>
                {orderItems.map((item) => (
                  <div key={item.product._id} className='order-page-item'>
                    <img
                      src={`/assets/products/${item.product.image}.jpg`}
                      alt={item.product.name}
                      className='order-page-item-image'
                    />
                    <div className='order-page-item-details'>
                      <h3>{item.product.name}</h3>
                      <p className='order-page-item-price'>
                        ₹{item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className='order-page-item-quantity'>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product.id, -1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className='order-page-item-total'>
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className='order-page-summary'>
                <div className='order-page-summary-row'>
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className='order-page-summary-row'>
                  <span>Shipping</span>
                  <span>₹9.99</span>
                </div>
                <div className='order-page-summary-row'>
                  <span>Tax (7%)</span>
                  <span>₹{(calculateSubtotal() * 0.07).toFixed(2)}</span>
                </div>
                <div className='order-page-summary-row total'>
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className='order-page-shipping animate-fade-in'>
              <h2>Shipping Information</h2>
              <div className='order-page-form'>
                <div className='order-page-form-group'>
                  <label htmlFor='fullName'>Full Name</label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder='John Doe'
                  />
                </div>

                <div className='order-page-form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='john@example.com'
                  />
                </div>

                <div className='order-page-form-group full'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder='123 Main Street'
                  />
                </div>

                <div className='order-page-form-row'>
                  <div className='order-page-form-group'>
                    <label htmlFor='city'>City</label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder='New York'
                    />
                  </div>

                  <div className='order-page-form-group'>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                      type='text'
                      id='postalCode'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder='10001'
                    />
                  </div>
                </div>

                <div className='order-page-form-group'>
                  <label htmlFor='country'>Country</label>
                  <select
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value=''>Select Country</option>
                    <option value='IN'>India</option>
                    <option value='US'>United States</option>
                    <option value='CA'>Canada</option>
                    <option value='UK'>United Kingdom</option>
                    <option value='AU'>Australia</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className='order-page-payment animate-fade-in'>
              <h2>Payment Details</h2>

              <div className='order-page-payment-methods'>
                <h3>Select Payment Method</h3>
                <div className='order-page-payment-options'>
                  <div
                    className={`order-page-payment-option ${
                      formData.paymentMethod === 'creditCard' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: 'creditCard' })
                    }
                  >
                    <CreditCard size={24} />
                    <span>Credit Card</span>
                  </div>

                  <div
                    className={`order-page-payment-option ${
                      formData.paymentMethod === 'paypal' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: 'paypal' })
                    }
                  >
                    <Wallet size={24} />
                    <span>PayPal</span>
                  </div>

                  <div
                    className={`order-page-payment-option ${
                      formData.paymentMethod === 'razorPay' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: 'razorPay' })
                    }
                  >
                    <Wallet size={24} />
                    <span>Razor Pay</span>
                  </div>

                  <div
                    className={`order-page-payment-option ${
                      formData.paymentMethod === 'bankTransfer' ? 'active' : ''
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        paymentMethod: 'bankTransfer',
                      })
                    }
                  >
                    <Truck size={24} />
                    <span>Bank Transfer</span>
                  </div>
                </div>
              </div>

              {formData.paymentMethod === 'creditCard' && (
                <div className='order-page-form order-page-credit-card'>
                  <div className='order-page-form-group full'>
                    <label htmlFor='cardNumber'>Card Number</label>
                    <input
                      type='text'
                      id='cardNumber'
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder='1234 5678 9012 3456'
                    />
                  </div>

                  <div className='order-page-form-group full'>
                    <label htmlFor='cardName'>Name on Card</label>
                    <input
                      type='text'
                      id='cardName'
                      name='cardName'
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder='John Doe'
                    />
                  </div>

                  <div className='order-page-form-row'>
                    <div className='order-page-form-group'>
                      <label htmlFor='expiry'>Expiry Date</label>
                      <input
                        type='text'
                        id='expiry'
                        name='expiry'
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder='MM/YY'
                      />
                    </div>

                    <div className='order-page-form-group'>
                      <label htmlFor='cvv'>CVV</label>
                      <input
                        type='text'
                        id='cvv'
                        name='cvv'
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder='123'
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'paypal' && (
                <div className='order-page-payment-method-content'>
                  <div className='order-page-payment-method-info'>
                    <div className='order-page-payment-method-logo'>
                      <Wallet size={40} />
                    </div>
                    <div className='order-page-payment-method-text'>
                      <h4>Pay with PayPal</h4>
                      <p>
                        You will be redirected to PayPal to complete your
                        payment securely.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'razorPay' && (
                <div className='order-page-payment-method-content'>
                  <div className='order-page-payment-method-info'>
                    <div className='order-page-payment-method-logo'>
                      <Wallet size={40} />
                    </div>
                    <div className='order-page-payment-method-text'>
                      <h4>Pay with Razor Pay</h4>
                      <p>
                        Complete your purchase quickly and securely with Razor
                        Pay.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'bankTransfer' && (
                <div className='order-page-payment-method-content'>
                  <div className='order-page-payment-method-info'>
                    <div className='order-page-payment-method-logo'>
                      <Truck size={40} />
                    </div>
                    <div className='order-page-payment-method-text'>
                      <h4>Pay with Bank Transfer</h4>
                      <p>
                        Make a direct bank transfer to our account. Order will
                        be processed after payment confirmation.
                      </p>
                    </div>
                  </div>

                  <div className='order-page-bank-details'>
                    <div className='order-page-bank-detail'>
                      <strong>Bank Name:</strong>
                      <span>Example Bank</span>
                    </div>
                    <div className='order-page-bank-detail'>
                      <strong>Account Name:</strong>
                      <span>Your Ecommerce Store</span>
                    </div>
                    <div className='order-page-bank-detail'>
                      <strong>Account Number:</strong>
                      <span>1234567890</span>
                    </div>
                    <div className='order-page-bank-detail'>
                      <strong>Sort Code:</strong>
                      <span>12-34-56</span>
                    </div>
                    <div className='order-page-bank-detail'>
                      <strong>Reference:</strong>
                      <span>Order #{Math.floor(Math.random() * 1000000)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className='order-page-final-summary'>
                <h3>Order Summary</h3>
                <div className='order-page-summary-row'>
                  <span>
                    {orderItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}{' '}
                    Items
                  </span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className='order-page-summary-row'>
                  <span>Shipping + Tax</span>
                  <span>₹{(9.99 + calculateSubtotal() * 0.07).toFixed(2)}</span>
                </div>
                <div className='order-page-summary-row total'>
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='order-page-actions'>
          {activeStep > 1 && (
            <button className='order-page-btn secondary' onClick={prevStep}>
              Back
            </button>
          )}

          {activeStep < 3 ? (
            <button className='order-page-btn primary' onClick={nextStep}>
              Continue to {steps[activeStep].title}
            </button>
          ) : (
            <button className="order-page-btn primary" onClick={() => alert("Order submitted successfully!")}>
              Place Order
            </button>
            // Assume you have `order` and `user` data
            // <PayButton
            //   className='order-page-btn primary'
            //   amount={250}
            //   user={'6815989ec51b03b88e4724b3'}
            //   orderId={'6802dd5a2b9c8c1da8ac16ef'}
            // >
            //   Place Order
            // </PayButton>
          )}
        </div>
      </div>
    </div>
  );
};
