const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/:userId/:productId", removeFromWishlist);
router.delete("/clear/:userId", clearWishlist);

module.exports = router;
