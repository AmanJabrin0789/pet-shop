import React, { useState } from 'react';
import '../assets/css/PaymentPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      alert(`You selected: ${paymentMethod}`);
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className="payment-card">
      <h2><i className="fas fa-credit-card"></i> Choose Your Payment Method</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        
        <label className={`option-box ${paymentMethod === 'COD' ? 'selected' : ''}`}>
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === 'COD'}
            onChange={handlePaymentChange}
          />
          <i className="fas fa-money-bill-wave icon"></i>
          <span>Cash on Delivery</span>
        </label>

        <label className={`option-box ${paymentMethod === 'Online' ? 'selected' : ''}`}>
          <input
            type="radio"
            value="Online"
            checked={paymentMethod === 'Online'}
            onChange={handlePaymentChange}
          />
          <i className="fas fa-wallet icon"></i>
          <span>Online Payment</span>
        </label>

        <button type="submit" className="pay-btn">Proceed</button>
      </form>
    </div>
  );
};

export default PaymentPage;
