const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel"); // Optional: Only needed if you want to validate products

// @desc    Get wishlist by user ID
// @route   GET /api/wishlist/:userId
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("items.product");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/:userId
// @access  Private

const addToWishlist = async (req, res) => {
  const { product, name, image, price } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        items: [],
      });
    }

    const alreadyExists = wishlist.items.find(
      (item) => item.product.toString() === product
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    wishlist.items.push({
      product,
      name,
      image,
      price,
    });
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:userId/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.params.userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter(
            (item) => item.product.toString() !== req.params.productId
        );

        await wishlist.save();

        res.status(200).json({ message: "Item removed", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Clear entire wishlist
// @route   DELETE /api/wishlist/clear/:userId
// @access  Private
const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.params.userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = [];
        await wishlist.save();

        res.status(200).json({ message: "Wishlist cleared" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
};
