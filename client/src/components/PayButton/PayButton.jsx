import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PayButton.css";
import API from "../../utils/axiosConfig";

export const PayButton = ({ amount, user, orderId }) => {
  const navigate = useNavigate();
  const loadRazorpay = async () => {
    try {
      // 1. Create Razorpay order from backend
      const { data } = await API.post(
        "/payment/razorpay",
        { totalPrice: amount },
      );
      console.log(data);

      // 2. Open Razorpay payment UI
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Elixir — Magic Mart",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          alert("Payment Successful!");

          // 3. Optional: Update payment status in backend
          await API.put(
            `/orders/${orderId}/pay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
        redirect: false, // This enables redirect after payment
        // callback_url: "https://elixir-ecommerce-app.vercel.app/success", 
        handler: function (response) {
          // Show success message, or navigate to your profile page
          navigate("/profile");
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return <button onClick={loadRazorpay} className="order-page-btn primary">Pay ₹{amount}</button>;
};

