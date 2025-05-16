const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// @desc    Get Cart for logged-in user
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart is empty" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (product) {
      let cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }

      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: quantity,
        });
      }

      await cart.save();
      res.status(201).json(cart);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(item => item._id.toString() === req.params.id);

    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
