/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import '../assets/css/OrderSummary.css';

function OrderSummary() {
  const [orderData, setOrderData] = useState({
    items: [
      { name: 'Product 1', quantity: 2, price: 250 },
      { name: 'Product 2', quantity: 1, price: 150 },
      { name: 'Product 3', quantity: 3, price: 200 },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      houseNo: '123',
      buildingName: 'Skyline Towers',
      roadAreaColony: 'Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110001',
      phoneNumber: '9999988888',
    },
    totalAmount: 1050, // Calculation should ideally be done based on item prices
    shippingCost: 50,
    total: 1100,
  });

  const handlePlaceOrder = () => {
    // Simulating the order placement
    alert('Order placed successfully!');
  };

  return (
    <div className="order-summary-container">
         <br/> <br/> <br/>
      <h1>Order Summary</h1>

      {/* Order Items */}
      <div className="order-items">
        
        <h2>Items in Your Order</h2>
        {orderData.items.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-item-name">{item.name}</div>
            <div className="order-item-quantity">Qty: {item.quantity}</div>
            <div className="order-item-price">₹{item.price}</div>
            <div className="order-item-total">₹{item.quantity * item.price}</div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="order-shipping-address">
        <h2>Shipping Address</h2>
        <p>{orderData.shippingAddress.fullName}</p>
        <p>{orderData.shippingAddress.houseNo}, {orderData.shippingAddress.buildingName}</p>
        <p>{orderData.shippingAddress.roadAreaColony}, {orderData.shippingAddress.city}</p>
        <p>{orderData.shippingAddress.state} - {orderData.shippingAddress.pinCode}</p>
        <p>Phone: {orderData.shippingAddress.phoneNumber}</p>
      </div>

      {/* Order Totals */}
      <div className="order-totals">
        <div className="order-total-row">
          <span>Subtotal</span>
          <span>₹{orderData.totalAmount}</span>
        </div>
        <div className="order-total-row">
          <span>Shipping</span>
          <span>₹{orderData.shippingCost}</span>
        </div>
        <div className="order-total-row total">
          <span>Total</span>
          <span>₹{orderData.total}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button onClick={handlePlaceOrder} className="place-order-btn">
        <CheckCircle size={20} /> Place Order
      </button>
    </div>
  );
}

export default OrderSummary;
