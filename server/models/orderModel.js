const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { 
      type: String, 
      required: true, 
      enum: ["COD", "Online"]
    },
    paymentStatus: { 
      type: Object,
      default: "Pending",
    },
    orderStatus: { 
      type: String, 
      required: true, 
      default: "Pending" 
    },
    totalPrice: { 
      type: Number, 
      required: true 
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
