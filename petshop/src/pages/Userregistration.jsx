import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, User,LockKeyhole } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Userregistration.css';

function Userregistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''],
    newsletter: false,
  });
  const [loading, setLoading] = useState(false); // Loading state

  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const { value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const otp = [...formData.otp];
    otp[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      otp,
    }));

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateStep1 = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name) {
      toast.error("Name is required!");
      return false;
    }

    if (!email) {
      toast.error("Email is required!");
      return false;
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const nextStep = async () => {
    if (!validateStep1()) return;

    setLoading(true); // Start loading
    // toast.info("Please wait..."); // Show "Please wait" message

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', null, {
        params: { // Send data as query parameters
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data === "Email already registered!") {
        toast.error(response.data); // Display error message
      } else {
        toast.success(response.data); // Display success message
        setCurrentStep(2); // Move to OTP verification step
      }

    } catch (error) {
      toast.error("Error registering user: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
    
  };

  const handleSubmit = async () => {

    const otp = formData.otp.join('');
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/verify-otp', null, {
        params: { // Send data as query parameters
          email: formData.email,
          otp,
        },
      });

      // Check the response message
      if (response.data === "OTP Verified successfully. User registered!") {
        toast.success(response.data);

        // Delay the redirection by 2 seconds
        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      } else {
        toast.error(response.data); 
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="steps">
        <span className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
          {currentStep > 1 ? 'Account ✓' : 'Step 1'}
        </span>
        <span className={`step ${currentStep === 2 ? 'active' : ''}`}>OTP 2</span>
      </div>

      <div className="signup-container">
        {currentStep === 1 ? (
          <>
            <div className="signup-box">
              <h2 className="title">Create Account</h2>
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder=" "
                  />
                  <label htmlFor="name">
                  <User size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Full Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder=" "
                  />
                  <label htmlFor="email"> <Mail size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  Email Address</label>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, 'password')}
                    placeholder=" "
                  />
                  <label htmlFor="password">
                  <LockKeyhole   size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Password</label>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange(e, 'confirmPassword')}
                    placeholder=" "
                  />
                  <label htmlFor="confirmPassword">
                  <LockKeyhole   size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Confirm Password</label>
                </div>

                <button type="submit" className="next-button" disabled={loading}>
                  {loading ? "Please wait..." : "Next"}
                </button>
              </form>
            </div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="Sign up illustration"
              className="illustration"
            />
          </>
        ) : (
          <div className="verification-box">
            <h2 className="title">Verify Your Email</h2>
            <p className="subtitle">
              We've sent a verification code to {formData.email}
            </p>

            <div className="otp-container">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="otp-input"
                  autoComplete="off"
                />
              ))}
            </div>

            <button className="verify-button" onClick={handleSubmit}>
              Verify
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Userregistration;
