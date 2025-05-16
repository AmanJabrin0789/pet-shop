import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, LockKeyhole } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Userregistration.css'; 
import axios from 'axios';

function ForgotPassword() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false); 

  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
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
    const { email } = formData;

    if (!email) {
      toast.error("Email is required!");
      return false;
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const { newPassword, confirmPassword } = formData;

    if (!newPassword) {
      toast.error("New Password is required!");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password!");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const nextStep = async () => {
    if (!validateStep1()) return;

    setLoading(true);

    try{
          const response = await axios.post('http://localhost:8080/api/users/forgot-password',null,{
            params:{
              email:formData.email
            },
          });
        
          if(response.data === "please enter your registered email address!!"){
             toast.error(response.data);
          }else{
             toast.success(response.data); 
                setCurrentStep(2);     
          }
    }catch(error){
            toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };



  const handleSubmit = async () => {
    if (!validateStep2()) return;

    const otp = formData.otp.join('');
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }


  try{
     
     const response = await axios.post('http://localhost:8080/api/users/verify-otp-forgot-password',null,{
      params:{
        email:formData.email,
        otp,
        newPassword:formData.newPassword
      },
     });

     if(response.data === "Password updated successfully!"){
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 1000);

     }else{
           toast.error("Invalid OTP!"); 
     }

  }catch(error){
     
      toast.error(error.message); 
  }




  
  };

  return (
    <div className="container">
      <div className="steps">
        <span className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
          {currentStep > 1 ? 'Email ✓' : 'Step 1'}
        </span>
        <span className={`step ${currentStep === 2 ? 'active' : ''}`}>Reset Password</span>
      </div>

      <div className="signup-container">
        {currentStep === 1 ? (
          <div className="signup-box">
            <h2 className="title">Forgot Password</h2>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                <label htmlFor="email">
                  <Mail size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  Email Address
                </label>
              </div>

              <button type="submit" className="next-button" disabled={loading}>
                {loading ? "Sending OTP..." : "Next"}
              </button>
            </form>
          </div>
        ) : (
          <div className="verification-box">
            <h2 className="title">Reset Password</h2>
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

            <div className="form-group">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={(e) => handleInputChange(e, 'newPassword')}
                placeholder=" "
              />
              <label htmlFor="newPassword">
                <LockKeyhole size={18} style={{ display: 'inline', marginRight: '8px' }} />
                New Password
              </label>
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
                <LockKeyhole size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Confirm Password
              </label>
            </div>

            <button className="verify-button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;