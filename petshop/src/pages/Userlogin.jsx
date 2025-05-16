import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import "../assets/css/Userlogin.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Userlogin() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle email input focus
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  // Handle email input blur
  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  // Validate the login form
  const validateLogin = () => {
    const { email, password } = formData;

    if (!email) {
      toast.error("Email cannot be empty!");
      return false;
    } else if (!password) {
      toast.error("Password cannot be empty!");
      return false;
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', null, {
        params: {
          email: formData.email,
          password: formData.password
        },
      });

      if (response.status === 200) {
        toast.success("Login successfully");
     
        const user = response.data;

        localStorage.setItem("isUserAuthenticated","true");
        localStorage.setItem("userId",user.id)
        localStorage.setItem("userName",user.name);
        localStorage.setItem("userEmail",user.email)



        setTimeout(() => {
          navigate('/'); 
        }, 1000);

      } else {
        toast.error("Invalid email or password")
      }

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="signup-box">
          <h2 className="title">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                placeholder=" "
              />
              <label htmlFor="email">
                <Mail size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Email Address
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                placeholder=" "
              />
              <label htmlFor="password">
                <Lock size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Password
              </label>
            </div>

            {isEmailFocused || formData.email ? (
              <p>
                Forgot Password?{' '}
                <span style={{ color: '#ff6b6b' }}>
                  <u>
                    <Link to="/forgot-password">Reset Password</Link>
                  </u>
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span style={{ color: '#ff6b6b' }}>
                  <u>
                    <Link to="/registration">Register</Link>
                  </u>
                </span>
              </p>
            )}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
          alt="Sign up illustration"
          className="illustration"
        />
      </div>

      {/* Add Toastify container to show alerts */}
      <ToastContainer />
    </div>
  );
}

export default Userlogin;