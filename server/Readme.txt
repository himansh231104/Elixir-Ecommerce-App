// User Registration

POST /api/users/register
{
  "name": "Himanshu",
  "email": "himanshu@example.com",
  "password": "123456"
}

// User Login
POST /api/users/login
{
    "email": "himanshu@example.com",
    "password": "123456"
}

// GET User Profile
GET /api/users/profile
Authorization: Bearer <your_jwt_token>

// UPDATE User Profile
PUT /api/users/profile
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "name": "Himanshu Kumar",
  "email": "himanshu.kumar@example.com",
  "password": "newpassword123"
}

// GET all users list (as admin)
GET /api/users
Authorization: Bearer <admin_user_jwt_token>
    




// Create a Product (Admin Only)

POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "name": "Cotton T-Shirt",
  "image": "/images/cotton-tshirt.jpg",
  "brand": "H&M",
  "category": "Clothing",
  "description": "Breathable cotton T-shirt for daily wear.",
  "price": 599,
  "countInStock": 20
}

// Get All Products
GET /api/products

// Get Product by ID
GET /api/products/:id

// SEARCH PRODUCTS BY NAME
GET /api/products?keyword=shirt

// PAGINATE RESULTS
GET /api/products?pageNumber=2

---> COMBINED EXAMPLE
GET /api/products?keyword=shoes&pageNumber=3


// Update Product by ID (Admin Only)
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json
{
  "name": "Updated Cotton T-Shirt",
  "image": "/images/updated.jpg",
  "brand": "Zara",
  "category": "Tops",
  "description": "Stylish updated t-shirt with premium fabric.",
  "price": 799,
  "countInStock": 15
}

// Delete Product by ID (Admin Only)

DELETE /api/products/:id
Authorization: Bearer <admin_token>




// Add to Cart:
POST /api/cart
{
  "productId": "product_id",
  "quantity": 2
}

// Get Cart:
GET /api/cart

// Update Cart Item:
PUT /api/cart/:id
{
  "quantity": 3
}

// Remove from Cart:
DELETE /api/cart/:id




// Place Order:
POST /api/orders
{
  "orderItems": [
    {
      "product": "6802dd5a2b9c8c1da8ac16ef",
      "name": "Stainless Steel Water Bottle",
      "quantity": 6,
      "price": 199
    }
  ],
  "shippingAddress": {
    "address": "25/B Gandhi Street",
    "city": "Rohtas",
    "postalCode": "674872",
    "country": "India"
  },
  "paymentMethod": "Online",
  "totalPrice": 1194
}


// Get Order by ID:
GET /api/orders/:id

// View User's Orders (User Logged In)
GET /api/orders/myorders
Authorization: Bearer <token>

// View All Orders (Admin)
GET /api/orders
Authorization: Bearer <admin_token>

// Update Order Status
PUT /api/orders/<orderId>/status
{
  "status": "Delivered"
}
Authorization: Bearer <admin_token>

// Delete Order (Optional)
DELETE /api/orders/<orderId>
Authorization: Bearer <admin_token>
