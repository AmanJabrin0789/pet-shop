import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/OrderConfirmation.css";

function OrderConfirmation() {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/shop'); 
      };

  return (
    <div className="order-confirm-bg">
      <div className="order-confirm-card">
        {/* Animated SVG Checkmark */}
        <svg
          className="order-confirm-animated-icon"
          width="80"
          height="80"
          viewBox="0 0 52 52"
          style={{ display: "block", margin: "0 auto 18px auto" }}
        >
          <circle
            className="order-confirm-animated-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
          />
          <path
            className="order-confirm-animated-check"
            fill="none"
            stroke="#34d399"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27 l8 8 15-16"
          />
        </svg>
        <h1 className="order-confirm-title">Order Confirmed!</h1>
        <p className="order-confirm-info">
          Thank you for your purchase. We have received your order and are processing it.
        </p>
        <button
          className="order-confirm-btn"
         onClick={handleCheckout}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
