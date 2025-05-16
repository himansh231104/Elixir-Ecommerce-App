const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
  
    const category = req.query.category
      ? { category: { $regex: req.query.category, $options: "i" } }
      : {};
  
    const brand = req.query.brand
      ? { brand: { $regex: req.query.brand, $options: "i" } }
      : {};
  
    const filter = { ...keyword, ...category, ...brand };
  
    try {
      const count = await Product.countDocuments(filter);
      const products = await Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
  
      res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  };
  
  
// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = new Product({
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (product) {
        await Product.deleteOne({ _id: product._id }); // ✅ Fixed here
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error while deleting product" });
    }
  };
  
// @desc    Create new product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        return res.status(400).json({ message: "Product already reviewed" });
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
  
      product.rating =
        product.reviews.reduce((acc, r) => r.rating + acc, 0) /
        product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
  

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
