const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();           // Load .env file

connectDB();               // Connect to MongoDB

const app = express();

app.use(cors());           // Allow cross-origin requests
app.use(express.json());   // Middleware to parse JSON body

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes); 

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);


// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
