import React from "react";
import axios from "axios";

export const PayButton = ({ amount, user, orderId }) => {
  const loadRazorpay = async () => {
    try {
      // 1. Create Razorpay order from backend
      const { data } = await axios.post(
        "/api/payment/razorpay",
        { totalPrice: amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);

      // 2. Open Razorpay payment UI
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "My Ecommerce",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          alert("Payment Successful!");

          // 3. Optional: Update payment status in backend
          await axios.put(
            `/api/orders/${orderId}/pay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return <button onClick={loadRazorpay}>Pay ₹{amount}</button>;
};

