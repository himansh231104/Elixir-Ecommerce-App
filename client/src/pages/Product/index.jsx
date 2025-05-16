import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import "./style.css";

export const Product = () => {
  // Mock product data (replace with actual API call)
  const [product, setProduct] = useState({
    id: 1,
    name: "Premium Leather Jacket",
    price: 249.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 124,
    description: "Premium quality leather jacket with a modern design. Features multiple pockets, adjustable cuffs, and a stylish collar. Perfect for everyday wear and special occasions.",
    features: [
      "Genuine leather material",
      "Soft inner lining for comfort",
      "Water-resistant finish",
      "Durable YKK zippers",
      "Available in multiple sizes"
    ],
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    colors: ["#000", "#472D2D", "#7B3F00"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 15
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Simulating API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate discounted price
  const discountedPrice = product.price * (1 - product.discount / 100);

  // Handle image carousel
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Add to cart function
  const addToCart = () => {
    // Animation trigger
    const button = document.querySelector(".add-to-cart-btn");
    button.classList.add("added");
    setTimeout(() => {
      button.classList.remove("added");
    }, 1500);
    
    // Here you would add the product to cart logic
    console.log("Added to cart:", {
      ...product,
      quantity,
      selectedColor: product.colors[selectedColor],
      selectedSize: product.sizes[selectedSize]
    });
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="product-page loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-page-container">
        {/* Product images section */}
        <div className="product-images">
          <div className="main-image-container">
            <button className="image-nav prev" onClick={prevImage}>
              <ChevronLeft size={24} />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="main-image"
            />
            <button className="image-nav next" onClick={nextImage}>
              <ChevronRight size={24} />
            </button>
            <button 
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={toggleWishlist}
            >
              <Heart size={24} fill={isWishlisted ? "#ff4d4d" : "none"} color={isWishlisted ? "#ff4d4d" : "#333"} />
            </button>
          </div>
          
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} - view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product details section */}
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "#FFD700" : "none"}
                  color={i < Math.floor(product.rating) ? "#FFD700" : "#ccc"}
                />
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviewCount} reviews)</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">${discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discount-badge">-{product.discount}%</span>
              </>
            )}
          </div>
          
          <div className="product-description">
            <p className={isDescriptionExpanded ? 'expanded' : ''}>
              {product.description}
            </p>
            <button 
              className="read-more" 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
          
          <div className="product-colors">
            <h3>Color:</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <div 
                  key={index}
                  className={`color-option ${selectedColor === index ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="product-sizes">
            <h3>Size:</h3>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <div 
                  key={index}
                  className={`size-option ${selectedSize === index ? 'active' : ''}`}
                  onClick={() => setSelectedSize(index)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-quantity">
            <h3>Quantity:</h3>
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
              />
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <span className="stock-info">{product.stock} items in stock</span>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={addToCart}>
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
          
          <div className="product-features">
            <h3>Product Features:</h3>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="feature-item">{feature}</li>
              ))}
            </ul>
          </div>
          
            <div className="delivery-info">
              <div className="icon">🚚</div>
              <span>Free Delivery</span>
            </div>
            <div className="delivery-info">
              <div className="icon">↩️</div>
              <span>30 Days Return</span>
            </div>
            <div className="delivery-info">
              <div className="icon">🛡️</div>
              <span>Warranty Available</span>
            </div>
          </div>
        </div>
      </div>
  );
};
