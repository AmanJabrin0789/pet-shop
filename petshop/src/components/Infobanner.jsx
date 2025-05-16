import React from 'react';
import { Truck, RotateCcw, Info, HeadphonesIcon } from 'lucide-react';
import '../assets/css/Infobanner.css';

const Infobanner = () => {
  return (
    <div className="info-banner">
      <div className="info-banner-container">
        <div className="info-item">
          <Truck className="info-icon" size={32} />
          <div className="info-content">
            <h4 className="info-title">Free Shipping</h4>
            <p className="info-description">On all orders above ₹699</p>
          </div>
        </div>

        <div className="info-item">
          <RotateCcw className="info-icon" size={32} />
          <div className="info-content">
            <h4 className="info-title">Free Returns</h4>
            <p className="info-description">Within 7 days(T&Cs Apply)</p>
          </div>
        </div>

        <div className="info-item">
          <Info className="info-icon" size={32} />
          <div className="info-content">
            <h4 className="info-title">Best Deals</h4>
            <p className="info-description">On Pet Products</p>
          </div>
        </div>

        <div className="info-item">
          <HeadphonesIcon className="info-icon" size={32} />
          <div className="info-content">
            <h4 className="info-title">We Support</h4>
            <p className="info-description">Monday-Friday,9am to 9pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infobanner;