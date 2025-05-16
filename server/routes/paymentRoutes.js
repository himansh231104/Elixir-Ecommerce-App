const express = require("express");
const { createRazorpayOrder } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/razorpay", protect, createRazorpayOrder);

module.exports = router;
