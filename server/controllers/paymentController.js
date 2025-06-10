const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// @desc   Create Razorpay order
// @route  POST /api/payment/razorpay
// @access Private
const createRazorpayOrder = async (req, res) => {
  const { totalPrice } = req.body;

  const options = {
    amount: totalPrice * 100, // Amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

module.exports = { createRazorpayOrder };
