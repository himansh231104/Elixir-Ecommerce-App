const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.route("/").get(protect, getCart).post(protect, addToCart);
router.route("/:id").put(protect, updateCartItem).delete(protect, removeFromCart);

module.exports = router;
