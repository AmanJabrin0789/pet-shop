/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Phone, Plus, MapPin, Building, Home, Briefcase, CheckCircle,  ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/CheckoutForm.css';
import '../assets/css/OrderSummary.css';
import '../assets/css/PaymentPage.css';

function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAlternatePhone, setShowAlternatePhone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', phoneNumber: '', alternatePhoneNumber: '',
    pinCode: '', state: '', city: '', houseNo: '', buildingName: '',
    roadAreaColony: '', addressType: 'home', saveAddress: false,
  });
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || item.unitPrice * item.quantity), 0);
  const shippingCost = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shippingCost;
 
  let amountInINR = total;
  let amountInPaise = Math.round(amountInINR * 100);

const totalAmount = total.toFixed(2);

  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/address/user/${userId}`);
        const data = await res.json();
        setSavedAddresses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setSavedAddresses([]);
      }
    };
    if (userId && currentStep === 1) fetchAddresses();
  }, [userId, currentStep]);

  const fillAddress = (address) => {
    setFormData({
      fullName: address.fullName || '', phoneNumber: address.phone || '',
      alternatePhoneNumber: address.alternatePhone || '', pinCode: address.pinCode || '',
      state: address.state || '', city: address.city || '', houseNo: address.houseNo || '',
      buildingName: address.buildingName || '', roadAreaColony: address.roadNameAreaColony || '',
      addressType: address.TypeofAddress || 'home', saveAddress: false,
    });
    setShowAlternatePhone(!!address.alternatePhone);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddressTypeChange = (type) => {
    setFormData({ ...formData, addressType: type });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateStep1 = () => {
    const requiredFields = ['fullName', 'phoneNumber', 'pinCode', 'state', 'city', 'houseNo', 'roadAreaColony'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (formData.phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    if (formData.pinCode.length !== 6) {
      toast.error("PIN code must be 6 digits");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "Online") {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }
      console.log("Total to be paid:", amountInPaise);
      const options = {
        key: 'rzp_test_bilBagOBVTi4lE',
        amount: totalAmount * 100,
        currency: "INR",
        name: "Pet Shop",
        description: "Order Payment",
        handler: function (response) {
          placeOrder(); // only on success
        },
        prefill: {
          name: formData.fullName,
          contact: formData.phoneNumber
        },
        theme: {
          color: "#0d9488"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function () {
        toast.error("Payment failed. Please try again.");
      });

    } else {
      placeOrder(); // COD
    }
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const orderRequest = {
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        alternatePhone: formData.alternatePhoneNumber,
        pinCode: formData.pinCode,
        state: formData.state,
        city: formData.city,
        houseNo: formData.houseNo,
        buildingName: formData.buildingName,
        roadNameAreaColony: formData.roadAreaColony,
        TypeofAddress: formData.addressType,
        paymentType: paymentMethod
      };

      const response = await fetch(`http://localhost:8080/api/order/saveorder?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderRequest)
      });

      const result = await response.text();
      if (result === "success") {
        toast.success("Order placed successfully!");
        navigate('/order-confirmation', {
          state: {
            orderDetails: {
              orderId: Date.now(),
              items: cartItems,
              shippingAddress: formData,
              paymentMethod,
              total: subtotal + shippingCost
            }
          }
        });
      } else {
        toast.error("Order placement failed");
      }
    } catch (error) {
      toast.error("Something went wrong while placing the order");
    } finally {
      setIsPlacingOrder(false);
    }
  };


  return (
    <div className="multistep-checkout-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Step Navigation */}
      {/* <div className="step-progress">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Delivery</p>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Order Summary</p>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Payment</p>
        </div>
      </div> */}

      {/* Step 1: Delivery Details */}
      {currentStep === 1 && (
        <div className="ch-checkout-container">
          <br/><br/><br/>
          <h1>Delivery Details</h1>
          <div className="ch-flex-wrap">
            <div className="ch-address-list">
              <h2>Saved Addresses</h2>
              {savedAddresses.length === 0 ? (
                <p>No saved addresses</p>
              ) : (
                savedAddresses.slice(0, 5).map((address, index) => (
                  <div
                    key={index}
                    className="ch-address-card"
                    onClick={() => fillAddress(address)}
                  >
                    <p><strong>{address.fullName}</strong></p>
                    <p>{address.houseNo}, {address.buildingName}</p>
                    <p>{address.roadNameAreaColony}, {address.city}</p>
                    <p>{address.state} - {address.pinCode}</p>
                    <p>{address.phone}</p>
                  </div>
                ))
              )}
            </div>


            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="ch-checkout-form">
              {/* Form fields remain the same as in your original code */}
              <div className="ch-form-group">
                <label>Full Name<span className="ch-required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="ch-form-row">
                <div className="ch-form-group">
                  <label>Phone Number<span className="ch-required">*</span></label>
                  <div className="ch-input-container">
                    <Phone size={20} className="ch-input-icon" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="ch-has-icon"
                    />
                  </div>
                </div>

                {showAlternatePhone ? (
                  <div className="ch-form-group">
                    <label>Alternate Phone</label>
                    <div className="ch-input-container">
                      <Phone size={20} className="ch-input-icon" />
                      <input
                        type="tel"
                        name="alternatePhoneNumber"
                        value={formData.alternatePhoneNumber}
                        onChange={handleInputChange}
                        className="ch-has-icon"
                      />
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => setShowAlternatePhone(true)} className="ch-add-alternate-btn">
                    <Plus size={20} /> Add Alternate
                  </button>
                )}
              </div>

              <div className="ch-form-group">
                <label>PIN Code<span className="ch-required">*</span></label>
                <div className="ch-input-container">
                  <MapPin size={20} className="ch-input-icon" />
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                    className="ch-has-icon"
                  />
                </div>
              </div>

              <div className="ch-form-row">
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
              </div>

              <div className="ch-form-group">
                <label>House No.<span className="ch-required">*</span></label>
                <input type="text" name="houseNo" value={formData.houseNo} onChange={handleInputChange} required />
              </div>

              <div className="ch-form-group">
                <label>Building Name</label>
                <div className="ch-input-container">
                  <Building size={20} className="ch-input-icon" />
                  <input
                    type="text"
                    name="buildingName"
                    value={formData.buildingName}
                    onChange={handleInputChange}
                    className="ch-has-icon"
                  />
                </div>
              </div>

              <div className="ch-form-group">
                <label>Road Name, Area, Colony<span className="ch-required">*</span></label>
                <input
                  type="text"
                  name="roadAreaColony"
                  value={formData.roadAreaColony}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="ch-address-type">
                <label>Address Type</label>
                <div className="ch-address-type-container">
                  <button type="button" className={`ch-address-type-btn ${formData.addressType === 'home' ? 'ch-selected' : ''}`} onClick={() => handleAddressTypeChange('home')}>
                    <Home size={20} /> Home
                  </button>
                  <button type="button" className={`ch-address-type-btn ${formData.addressType === 'work' ? 'ch-selected' : ''}`} onClick={() => handleAddressTypeChange('work')}>
                    <Briefcase size={20} /> Work
                  </button>
                </div>

                <div className="ch-save-address">
                  <input
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleInputChange}
                  />
                  <label>Save this address</label>
                </div>
              </div>

              <div className="step-buttons">
                <button type="button" onClick={nextStep} className="next-btn">
                  Next <ChevronRight size={20} />
                </button>
              </div>
              {/* ... */}


            </form>
          </div>
        </div>
      )}

      {/* Step 2: Order Summary */}
      {currentStep === 2 && (
        
        <div className="order-summary-container">
          <br/><br/><br/>
          <h1>Order Summary</h1>
          <div className="order-items">
            {cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} width="50" />
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-quantity">Qty: {item.quantity}</div>
                <div className="order-item-price">₹{item.unitPrice?.toFixed(2)}</div>
                <div className="order-item-total">₹{(item.totalPrice || item.unitPrice * item.quantity)?.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="order-shipping-address">
            <h2>Shipping Address</h2>
            <p>{formData.fullName}</p>
            <p>{formData.houseNo}, {formData.buildingName}</p>
            <p>{formData.roadAreaColony}, {formData.city}</p>
            <p>{formData.state} - {formData.pinCode}</p>
            <p>Phone: {formData.phoneNumber}</p>
          </div>

          <div className="order-totals">
            <div><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div><span>Shipping:</span><span>₹{shippingCost.toFixed(2)}</span></div>
            <div><strong>Total:</strong><strong>₹{total.toFixed(2)}</strong></div>
          </div>

          <div className="step-buttons">
            <button onClick={prevStep} className="prev-btn"><ChevronLeft size={20} /> Back</button>
            <button onClick={nextStep} className="next-btn">Next <ChevronRight size={20} /></button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {currentStep === 3 && (
        <div className="payment-page-container">
          <div className="payment-card">
            <h2><i className="fas fa-credit-card"></i>Choose Your Payment Method</h2>
            <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="payment-form">
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

              <div className="step-buttons">
                <button type="button" onClick={prevStep} className="prev-btn">
                  <ChevronLeft size={20} /> Back
                </button>
                <button type="submit" className="pay-btn">
                  <CheckCircle size={20} /> Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;