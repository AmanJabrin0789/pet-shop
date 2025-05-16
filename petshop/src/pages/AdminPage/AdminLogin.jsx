import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import "../../assets/css/Userlogin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminLogin() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
     
    try{

      const response = await axios.post('http://localhost:8080/api/admin/adminlogin',null,{
        params:{
          adminEmail:formData.email,
          password:formData.password
        },
      });

      if(response.status === 200){
 
        const admin = response.data;

          toast.success("Admin Login successfully...")
 
           localStorage.setItem("isAdminAuthenticated","true");
           localStorage.setItem("adminName",admin.adminName);
           localStorage.setItem("adminEmail", admin.adminEmail)

          setTimeout(() => {
            navigate('/admin'); 
          }, 1000);
      }else{
              toast.error("Invalid email or password")
      }

    }catch(error){
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }


  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="signup-box">
          <h2 className="title">ADMIN LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
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

export default AdminLogin;