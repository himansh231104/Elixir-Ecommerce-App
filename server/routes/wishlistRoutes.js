const express = require("express");
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/:userId", addToWishlist);
router.delete("/:userId/:productId", removeFromWishlist);
router.delete("/clear/:userId", clearWishlist);

module.exports = router;
