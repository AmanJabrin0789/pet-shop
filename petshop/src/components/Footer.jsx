import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,

  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import '../assets/css/Footer.css';


const Footer = () => {
  const [email, setEmail] = useState('');



  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p className="contact-info">
              We are dedicated to providing the best pet products and services to our valued customers. Our commitment to quality and customer satisfaction sets us apart.
            </p>
            <div className="social-links">
              <a href="/#" aria-label="Facebook">
                <Facebook className="social-icon" size={20} />
              </a>
              <a href="/#" aria-label="Twitter">
                <Twitter className="social-icon" size={20} />
              </a>
              <a href="/#" aria-label="Instagram">
                <Instagram className="social-icon" size={20} />
              </a>
              <a href="/#" aria-label="LinkedIn">
                <Linkedin className="social-icon" size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/#">Home</a></li>
              <li><a href="/dog">Dog</a></li>
              <li><a href="/toy">Toy</a></li>
              <li><a href="/food">Food</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" size={18} />
                <span>Petshop C.G. Road , Ahmedabad 380009</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={18} />
                <span>+91 9999999999</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={18} />
                <span>petshop00011@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Newsletter</h3>
            <p className="contact-info">Subscribe to our newsletter for updates, offers, and pet care tips.</p>
            <form  className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button" aria-label="Subscribe">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pet Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;