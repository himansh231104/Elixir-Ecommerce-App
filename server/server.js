const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();           // Load .env file

connectDB();               // Connect to MongoDB

const app = express();

app.use(cors());           // Allow cross-origin requests
app.use(express.json());   // Middleware to parse JSON body

app.use(express.static(path.join(__dirname, "public")));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes); 

const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/api/wishlist", wishlistRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);



