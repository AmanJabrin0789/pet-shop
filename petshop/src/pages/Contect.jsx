import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import "../assets/css/Contect.css"

function Contect() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/contect', null, {
        params: {
          name: formData.name,
          email: formData.email,
          msg: formData.message
        }
      });
      toast.success("Message Sent Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Send Message!");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <Phone className="info-icon" />
            <h3>Phone</h3>
            <p>+91 9999999999</p>
            <p>Mon-Fri from 8am to 9pm</p>
          </div>

          <div className="info-card">
            <Mail className="info-icon" />
            <h3>Email</h3>
            <p>petshop00011@gmail.com</p>
            <p>We'll respond within 24 hours</p>
          </div>

          <div className="info-card">
            <MapPin className="info-icon" />
            <h3>Office</h3>
            <p>Petshop C.G. Road</p>
            <p>Ahmedabad , 380009</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input type="text" id="name" name='name' value={formData.name} onChange={handleInputChange} placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <input type="email" id="email" name='email' value={formData.email} onChange={handleInputChange} placeholder=" " required />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <textarea id="message" rows={5} name='message' value={formData.message} onChange={handleInputChange} placeholder=" " required></textarea>
                <label htmlFor="message">Message</label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
       <ToastContainer />
    </div>
  );
}

export default Contect;
